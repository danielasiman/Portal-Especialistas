/* =====================================================================
   gu-backend.js — capa de datos del Portal de Especialistas Comerciales

   Reemplaza localStorage por Supabase sin reescribir la app:
   · carga todo antes de montar el portal (GU.cache)
   · save(clave, valor) compara contra la última copia conocida y
     escribe SOLO lo que cambió
   · la sesión la maneja Supabase Auth

   Configuración: llená CONFIG con los datos de tu proyecto.
   La clave "anon" es pública por diseño — la seguridad real está en
   las políticas RLS de la base de datos, no en esconder esta clave.
   ===================================================================== */
(function () {
  "use strict";

  var CONFIG = {
    url: "https://ygtnqzkvecmijzzvgsdf.supabase.co",       // https://xxxxxxxx.supabase.co
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndG5xemt2ZWNtaWp6enZnc2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgyOTQxMjMsImV4cCI6MjEwMzg3MDEyM30.N9Q23NyivTDXICzunR6xEfSMphQ0EePhxsktY33Eirw"
  };

  // Solo el runtime. El bundle del design system va dentro de <helmet>
  // y lo inyecta el propio runtime al renderizar.
  var RUNTIME_SCRIPTS = [
    "assets/e81e00ac-8251-44f6-a871-2cdfe628e345.js"
  ];

  var KEY = {
    SESSION: "gu_fac_session",
    USERS:   "gu_fac_users_v1",
    VISITS:  "gu_fac_visits_v1",
    PLANS:   "gu_fac_plans_v1",
    ASSIGN:  "gu_fac_assign_v1",
    RESETS:  "gu_fac_resets_v1"
  };

  var sb = null;
  var snapshot = { users: {}, visits: [], plans: {}, assign: {}, resets: [] };

  var GU = {
    cache: { session: null, users: {}, visits: [], plans: {}, assign: {}, resets: [] },
    ready: false
  };
  window.GU = GU;

  /* ---------------------------------------------------------------
     Avisos en pantalla
     --------------------------------------------------------------- */
  function banner(msg, kind) {
    var id = "gu-banner";
    var el = document.getElementById(id);
    if (!el) {
      el = document.createElement("div");
      el.id = id;
      el.style.cssText =
        "position:fixed;z-index:99999;left:50%;transform:translateX(-50%);top:14px;" +
        "max-width:min(680px,92vw);padding:12px 18px;border-radius:12px;" +
        "font:600 14px/1.45 system-ui,-apple-system,Segoe UI,sans-serif;" +
        "box-shadow:0 8px 28px rgba(0,0,0,.18);cursor:pointer";
      el.addEventListener("click", function () { el.remove(); });
      document.body.appendChild(el);
    }
    var ok    = kind === "ok";
    var info  = kind === "info";
    el.style.background = ok ? "#ECFDF3" : info ? "#EFF4FF" : "#FEF3F2";
    el.style.color      = ok ? "#05603A" : info ? "#0A2296" : "#912018";
    el.style.border     = "1px solid " + (ok ? "#ABEFC6" : info ? "#B2C5FF" : "#FECDC9");
    el.textContent = msg;
    if (kind !== "hold") setTimeout(function () { if (el) el.remove(); }, kind === "ok" ? 4500 : 9000);
  }
  GU.banner = banner;

  function fatal(msg) {
    document.body.innerHTML =
      '<div style="min-height:100vh;display:grid;place-items:center;padding:24px;' +
      'font:400 15px/1.6 system-ui,-apple-system,Segoe UI,sans-serif;color:#344054;text-align:center">' +
      '<div style="max-width:520px"><div style="font-weight:800;font-size:19px;color:#912018;margin-bottom:10px">' +
      "No se pudo iniciar el portal</div><div>" + msg + "</div></div></div>";
  }

  /* ---------------------------------------------------------------
     Conversión entre la fila de la base y el objeto que usa la app
     --------------------------------------------------------------- */
  function rowToVisit(r) {
    return {
      id: r.id,
      userId: r.user_email,
      espec: r.espec,
      country: r.country,
      store: r.store,
      date: r.visit_date,
      horaLlegada: r.hora_llegada || "—",
      horaSalida: r.hora_salida || "—",
      agendaAprobada: r.agenda_aprobada,
      cierreHecho: r.cierre_hecho,
      acuerdoCumplido: r.acuerdo_cumplido,
      escala: r.escala,
      brechaVisita: r.brecha_visita,
      vozCats: r.voz_cats || [],
      vendedores: r.vendedores || [],
      full: r.full_data || {}
    };
  }

  function visitToRow(v) {
    return {
      id: v.id,
      user_email: v.userId,
      espec: v.espec,
      country: v.country,
      store: v.store,
      visit_date: v.date,
      hora_llegada: v.horaLlegada,
      hora_salida: v.horaSalida,
      agenda_aprobada: v.agendaAprobada,
      cierre_hecho: v.cierreHecho,
      acuerdo_cumplido: v.acuerdoCumplido,
      escala: v.escala,
      brecha_visita: v.brechaVisita,
      voz_cats: v.vozCats || [],
      vendedores: v.vendedores || [],
      full_data: v.full || {}
    };
  }

  /* ---------------------------------------------------------------
     Carga inicial
     --------------------------------------------------------------- */
  async function loadAll(profile) {
    var r = await Promise.all([
      sb.from("profiles").select("email,name,role,country"),
      sb.from("visits").select("*").order("visit_date", { ascending: false }).limit(5000),
      sb.from("plans").select("email,week_start,meta"),
      sb.from("assignments").select("email,country,stores"),
      sb.from("password_resets").select("*").order("requested_on", { ascending: false })
    ]);
    for (var i = 0; i < r.length; i++) {
      if (r[i].error) throw new Error(r[i].error.message);
    }

    var users = {};
    r[0].data.forEach(function (p) {
      users[p.email] = { name: p.name, role: p.role, country: p.country };
    });

    var visits = r[1].data.map(rowToVisit);

    var plans = {};
    r[2].data.forEach(function (p) {
      (plans[p.email] = plans[p.email] || {})[p.week_start] = String(p.meta);
    });

    var assign = {};
    r[3].data.forEach(function (a) {
      assign[a.email] = { country: a.country, stores: a.stores || [] };
    });

    var resets = r[4].data.map(function (x) {
      return { id: x.id, email: x.email, name: x.name, date: x.requested_on, status: x.status };
    });

    GU.cache = {
      session: {
        email: profile.email, name: profile.name,
        role: profile.role, country: profile.country
      },
      users: users, visits: visits, plans: plans, assign: assign, resets: resets
    };
    snapshot = JSON.parse(JSON.stringify({
      users: users, visits: visits, plans: plans, assign: assign, resets: resets
    }));
  }

  /* ---------------------------------------------------------------
     Autenticación
     --------------------------------------------------------------- */
  GU.signIn = async function (email, password) {
    var res = await sb.auth.signInWithPassword({ email: email, password: password });
    if (res.error) {
      var m = res.error.message || "";
      if (/Invalid login credentials/i.test(m)) return "Correo o contraseña incorrectos.";
      if (/Email not confirmed/i.test(m))       return "La cuenta aún no está confirmada.";
      return m;
    }
    location.reload();
    return null;
  };

  GU.signOut = async function () {
    try { await sb.auth.signOut(); } catch (e) {}
    location.reload();
  };

  GU.requestReset = async function (email) {
    var res = await fn("request_reset", { email: email }, false);
    if (res.error) return res.error;
    return null;
  };

  /* ---------------------------------------------------------------
     Llamadas a la Edge Function
     --------------------------------------------------------------- */
  async function fn(action, payload, needAuth) {
    // La clave anon va siempre como token de entrada. Con "Verify JWT"
    // activado (el valor por defecto de Supabase), la puerta de enlace exige
    // un JWT válido antes de dejar pasar la llamada; la clave anon lo es.
    // Eso NO da permisos: la función revisa por su cuenta quién llama y
    // rechaza con 403 a quien no sea administrador.
    var headers = {
      "Content-Type": "application/json",
      "apikey": CONFIG.anonKey,
      "Authorization": "Bearer " + CONFIG.anonKey
    };
    if (needAuth !== false) {
      var s = (await sb.auth.getSession()).data.session;
      if (!s) return { error: "Tu sesión expiró. Volvé a entrar." };
      headers.Authorization = "Bearer " + s.access_token;  // sesión real
    }
    var body = Object.assign({ action: action }, payload);
    try {
      var r = await fetch(CONFIG.url + "/functions/v1/admin", {
        method: "POST", headers: headers, body: JSON.stringify(body)
      });
      var j = await r.json().catch(function () { return {}; });
      if (!r.ok) return { error: j.error || ("Error " + r.status) };
      return j;
    } catch (e) {
      return { error: "No se pudo contactar el servidor." };
    }
  }
  GU.fn = fn;

  /* ---------------------------------------------------------------
     save() — sincronización por diferencias
     La app sigue llamando save(clave, coleccionCompleta); aquí se
     calcula qué cambió y se escribe solo eso.
     --------------------------------------------------------------- */
  GU.save = function (key, val) {
    sync(key, val).catch(function (e) {
      console.error("[GU]", key, e);
      banner("No se pudo guardar: " + (e.message || e), "error");
    });
  };

  async function sync(key, val) {
    if (key === KEY.SESSION) return;                 // la sesión la maneja Auth

    if (key === KEY.VISITS) {
      var known = {};
      snapshot.visits.forEach(function (v) { known[v.id] = 1; });
      var nuevas = (val || []).filter(function (v) { return !known[v.id]; });
      if (!nuevas.length) return;
      var res = await sb.from("visits").insert(nuevas.map(visitToRow));
      if (res.error) throw new Error(res.error.message);
      snapshot.visits = JSON.parse(JSON.stringify(val));
      banner("Visita guardada.", "ok");
      return;
    }

    if (key === KEY.PLANS) {
      var ups = [];
      Object.keys(val || {}).forEach(function (em) {
        Object.keys(val[em] || {}).forEach(function (wk) {
          var nuevo = val[em][wk];
          var viejo = (snapshot.plans[em] || {})[wk];
          if (String(nuevo) !== String(viejo == null ? "" : viejo) && nuevo !== "") {
            ups.push({ email: em, week_start: wk, meta: parseInt(nuevo, 10) || 0 });
          }
        });
      });
      if (!ups.length) return;
      var rp = await sb.from("plans").upsert(ups, { onConflict: "email,week_start" });
      if (rp.error) throw new Error(rp.error.message);
      snapshot.plans = JSON.parse(JSON.stringify(val));
      return;
    }

    if (key === KEY.ASSIGN) {
      var upa = [];
      Object.keys(val || {}).forEach(function (em) {
        var a = val[em] || {};
        var b = snapshot.assign[em];
        if (!b || b.country !== a.country ||
            JSON.stringify(b.stores || []) !== JSON.stringify(a.stores || [])) {
          upa.push({ email: em, country: a.country, stores: a.stores || [] });
        }
      });
      var quitados = Object.keys(snapshot.assign).filter(function (em) { return !(em in (val || {})); });
      if (upa.length) {
        var ra = await sb.from("assignments").upsert(upa, { onConflict: "email" });
        if (ra.error) throw new Error(ra.error.message);
      }
      if (quitados.length) await sb.from("assignments").delete().in("email", quitados);
      snapshot.assign = JSON.parse(JSON.stringify(val));
      return;
    }

    if (key === KEY.USERS) {
      var prev = snapshot.users, next = val || {};
      var errores = [];

      // altas
      for (var em in next) {
        if (prev[em]) continue;
        var u = next[em];
        var r1 = await fn("create_user", {
          email: em, name: u.name, role: u.role,
          country: u.country, password: u.pwd || ""
        });
        if (r1.error) errores.push(em + ": " + r1.error);
        else {
          banner("Cuenta creada para " + em + ". Contraseña temporal: " + r1.password, "hold");
          delete next[em].pwd;
        }
      }
      // bajas
      for (var em2 in prev) {
        if (next[em2]) continue;
        var r2 = await fn("delete_user", { email: em2 });
        if (r2.error) errores.push(em2 + ": " + r2.error);
      }
      // cambios de rol
      for (var em3 in next) {
        if (!prev[em3]) continue;
        if (prev[em3].role !== next[em3].role) {
          var r3 = await fn("set_role", { email: em3, role: next[em3].role });
          if (r3.error) errores.push(em3 + ": " + r3.error);
        }
      }
      snapshot.users = JSON.parse(JSON.stringify(next));
      if (errores.length) throw new Error(errores.join(" · "));
      return;
    }

    if (key === KEY.RESETS) {
      var antes = {};
      snapshot.resets.forEach(function (r) { antes[r.id] = r.status; });
      for (var i = 0; i < (val || []).length; i++) {
        var rq = val[i];
        var st = antes[rq.id];
        if (st === rq.status) continue;
        if (rq.status === "Aprobada") {
          var ra2 = await fn("approve_reset", { id: rq.id });
          if (ra2.error) throw new Error(ra2.error);
          banner("Contraseña nueva de " + ra2.email + ": " + ra2.password +
                 "  (se muestra una sola vez — compartila y cerrá este aviso)", "hold");
        } else if (rq.status === "Rechazada") {
          var rr = await fn("reject_reset", { id: rq.id });
          if (rr.error) throw new Error(rr.error);
        }
      }
      snapshot.resets = JSON.parse(JSON.stringify(val));
      return;
    }
  }

  /* ---------------------------------------------------------------
     Arranque
     --------------------------------------------------------------- */
  function bootApp() {
    GU.ready = true;
    RUNTIME_SCRIPTS.forEach(function (src) {
      var s = document.createElement("script");
      s.src = src;
      s.async = false;               // respeta el orden
      document.head.appendChild(s);
    });
  }

  async function init() {
    if (!window.supabase || !window.supabase.createClient) {
      return fatal("No cargó la librería de Supabase. Revisá tu conexión a internet.");
    }
    if (/PEGA_AQUI/.test(CONFIG.url) || /PEGA_AQUI/.test(CONFIG.anonKey)) {
      return fatal("Falta configurar el proyecto: abrí <code>assets/gu-backend.js</code> " +
                   "y pegá la URL y la clave anon de Supabase.");
    }

    sb = window.supabase.createClient(CONFIG.url, CONFIG.anonKey, {
      auth: { persistSession: true, autoRefreshToken: true }
    });
    GU.sb = sb;

    var sess = (await sb.auth.getSession()).data.session;
    if (!sess) { bootApp(); return; }               // muestra el login

    var p = await sb.from("profiles")
      .select("email,name,role,country").eq("id", sess.user.id).maybeSingle();

    if (p.error || !p.data) {
      await sb.auth.signOut();
      bootApp();
      banner("Tu cuenta no tiene perfil asignado. Contactá al administrador.", "error");
      return;
    }

    try {
      await loadAll(p.data);
    } catch (e) {
      console.error(e);
      banner("No se pudieron cargar los datos: " + e.message, "error");
    }
    bootApp();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
