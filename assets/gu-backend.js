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

  /* ---------------------------------------------------------------
     Pantalla de carga

     El portal no se dibuja hasta que llegan los datos. Sin esto, el
     usuario ve unos instantes la plantilla en crudo (con las llaves
     {{ }} a la vista) y parece que algo se rompió.
     --------------------------------------------------------------- */
  (function pantallaDeCarga() {
    // Se inyecta ya, antes de que el navegador dibuje el <body>: si no,
    // se alcanza a ver la plantilla en crudo con las llaves {{ }} y
    // parece que la página falló. El runtime reemplaza <x-dc> al montar,
    // así que ocultarlo no afecta al portal.
    var st = document.createElement("style");
    st.textContent = "x-dc{display:none!important}";
    (document.head || document.documentElement).appendChild(st);

    function pintar() {
      if (!document.body || document.getElementById("gu-cargando")) return;
      var d = document.createElement("div");
      d.id = "gu-cargando";
      d.style.cssText =
        "position:fixed;inset:0;z-index:99998;display:flex;align-items:center;" +
        "justify-content:center;background:#F4F6FA;color:#5A6B7C;" +
        "font:600 15px system-ui,-apple-system,Segoe UI,sans-serif";
      d.textContent = "Cargando el portal…";
      document.body.appendChild(d);
    }
    if (document.body) pintar();
    else document.addEventListener("DOMContentLoaded", pintar);
  })();

  function quitarCarga() {
    var d = document.getElementById("gu-cargando");
    if (d) d.remove();
  }

  // El portal se dibuja unos instantes después de que carga el runtime.
  // Sin esta espera se ve un parpadeo en blanco entre una cosa y la otra
  // (el que aparecía justo después de iniciar sesión).
  function esperarRender() {
    var t0 = Date.now();
    var iv = setInterval(function () {
      var r = document.getElementById("dc-root");
      if ((r && r.firstChild) || Date.now() - t0 > 8000) {
        clearInterval(iv);
        quitarCarga();
        botonCambioPwd();
      }
    }, 60);
  }

  var GU = {
    cache: { session: null, users: {}, visits: [], plans: {}, assign: {}, resets: [] },
    ready: false
  };
  window.GU = GU;

  /* ---------------------------------------------------------------
     Avisos en pantalla
     --------------------------------------------------------------- */
  // kind: "ok" | "info" | "error" | "hold"
  //   "hold" = mensaje importante: verde, no se cierra solo ni por clic
  //            accidental, y si trae copyText muestra un botón de copiar.
  function banner(msg, kind, copyText) {
    var prev = document.getElementById("gu-banner");
    if (prev) prev.remove();

    var el = document.createElement("div");
    el.id = "gu-banner";
    var esError = kind === "error";
    var esInfo  = kind === "info";
    var fondo   = esError ? "#FEF3F2" : esInfo ? "#EFF4FF" : "#ECFDF3";
    var texto   = esError ? "#912018" : esInfo ? "#0A2296" : "#05603A";
    var borde   = esError ? "#FECDC9" : esInfo ? "#B2C5FF" : "#ABEFC6";
    el.style.cssText =
      "position:fixed;z-index:99999;left:50%;transform:translateX(-50%);top:14px;" +
      "max-width:min(720px,94vw);padding:12px 14px 12px 18px;border-radius:12px;" +
      "font:600 14px/1.45 system-ui,-apple-system,Segoe UI,sans-serif;" +
      "box-shadow:0 8px 28px rgba(0,0,0,.18);display:flex;align-items:center;gap:12px;" +
      "background:" + fondo + ";color:" + texto + ";border:1px solid " + borde;

    var txt = document.createElement("span");
    txt.textContent = msg;
    txt.style.cssText = "flex:1;user-select:text";   // se puede seleccionar a mano
    el.appendChild(txt);

    if (copyText) {
      var btn = document.createElement("button");
      btn.textContent = "Copiar";
      btn.style.cssText =
        "flex:none;padding:6px 14px;border-radius:999px;border:1px solid " + texto +
        ";background:transparent;color:" + texto +
        ";font:700 12px system-ui,sans-serif;cursor:pointer";
      btn.onclick = function (e) {
        e.stopPropagation();
        var listo = function () { btn.textContent = "¡Copiada!"; };
        try {
          navigator.clipboard.writeText(copyText).then(listo, manual);
        } catch (err) { manual(); }
        function manual() {
          // Respaldo para navegadores que no dan acceso al portapapeles.
          var ta = document.createElement("textarea");
          ta.value = copyText;
          document.body.appendChild(ta); ta.select();
          try { document.execCommand("copy"); listo(); } catch (e2) {}
          ta.remove();
        }
      };
      el.appendChild(btn);
    }

    var cerrar = document.createElement("button");
    cerrar.textContent = "✕";
    cerrar.setAttribute("aria-label", "Cerrar aviso");
    cerrar.style.cssText =
      "flex:none;border:none;background:transparent;color:" + texto +
      ";font-size:16px;line-height:1;cursor:pointer;padding:4px 6px";
    cerrar.onclick = function () { el.remove(); };
    el.appendChild(cerrar);

    document.body.appendChild(el);

    // Los avisos corrientes se van solos; los "hold" esperan a que los cierres.
    if (kind !== "hold") {
      setTimeout(function () { if (el) el.remove(); }, esError ? 9000 : 4500);
    }
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
      return {
        id: x.id, email: x.email, name: x.name,
        date: x.requested_on, status: x.status,
        tempPwd: x.temp_password || "—",    // se muestra en la columna de la tabla
        resolvedAt: x.resolved_at || null   // desde acá se cuentan los 2 días
      };
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
  // Devuelve una promesa con {ok:true} o {ok:false,error}. La app la usa
  // para no cantar "guardado" antes de que el servidor conteste.
  GU.save = function (key, val) {
    return sync(key, val).then(function () { return { ok: true }; }, function (e) {
      console.error("[GU]", key, e);
      banner("No se pudo guardar: " + (e.message || e), "error");
      return { ok: false, error: e.message || String(e) };
    });
  };

  async function sync(key, val) {
    if (key === KEY.SESSION) return;                 // la sesión la maneja Auth

    if (key === KEY.VISITS) {
      // Tres casos: visitas nuevas, corregidas y borradas.
      var antes = {};
      snapshot.visits.forEach(function (v) { antes[v.id] = v; });
      var ahora = {};
      (val || []).forEach(function (v) { ahora[v.id] = v; });

      var nuevas = [], cambiadas = [], borradas = [];
      (val || []).forEach(function (v) {
        if (!antes[v.id]) nuevas.push(v);
        else if (JSON.stringify(antes[v.id]) !== JSON.stringify(v)) cambiadas.push(v);
      });
      Object.keys(antes).forEach(function (id) { if (!ahora[id]) borradas.push(id); });

      if (!nuevas.length && !cambiadas.length && !borradas.length) return;

      if (nuevas.length) {
        var ri = await sb.from("visits").insert(nuevas.map(visitToRow));
        if (ri.error) throw new Error(ri.error.message);
      }
      // OJO: cuando RLS no permite tocar una fila, Postgres no devuelve
      // error — simplemente no afecta ninguna fila. Por eso se pide de
      // vuelta lo modificado con .select() y se cuenta: si vuelve vacío,
      // el permiso falta y hay que decirlo, no fingir que se guardó.
      var FALTA_SQL = "La base no permitió el cambio. Falta correr " +
                      "04-corregir-visitas.sql en el SQL Editor de Supabase.";

      for (var i = 0; i < cambiadas.length; i++) {
        var fila = visitToRow(cambiadas[i]);
        delete fila.id;                       // el id no se toca
        var ru = await sb.from("visits").update(fila).eq("id", cambiadas[i].id).select("id");
        if (ru.error) throw new Error(ru.error.message);
        if (!ru.data || !ru.data.length) throw new Error(FALTA_SQL);
      }
      if (borradas.length) {
        var rd = await sb.from("visits").delete().in("id", borradas).select("id");
        if (rd.error) throw new Error(rd.error.message);
        if (!rd.data || rd.data.length !== borradas.length) throw new Error(FALTA_SQL);
      }

      snapshot.visits = JSON.parse(JSON.stringify(val));
      banner(borradas.length ? "Visita eliminada." :
             cambiadas.length ? "Visita corregida." : "Visita guardada.", "ok");
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
      // El snapshot solo avanza con lo que REALMENTE se guardó. Si algo falla,
      // queda pendiente y se reintenta en el próximo cambio. (Antes se marcaba
      // todo como sincronizado aunque hubiera fallado, y el reintento nunca
      // volvía a ocurrir.)
      var hecho = JSON.parse(JSON.stringify(prev));

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
          banner("Cuenta creada para " + em + " · Contraseña temporal: " + r1.password, "hold", r1.password);
          delete next[em].pwd;
          hecho[em] = { name: u.name, role: u.role, country: u.country };
        }
      }
      // bajas
      for (var em2 in prev) {
        if (next[em2]) continue;
        var r2 = await fn("delete_user", { email: em2 });
        if (r2.error) errores.push(em2 + ": " + r2.error);
        else delete hecho[em2];
      }
      // cambios de rol
      for (var em3 in next) {
        if (!prev[em3]) continue;
        if (prev[em3].role !== next[em3].role) {
          var r3 = await fn("set_role", { email: em3, role: next[em3].role });
          if (r3.error) errores.push(em3 + ": " + r3.error);
          else if (hecho[em3]) hecho[em3].role = next[em3].role;
        }
      }
      snapshot.users = hecho;
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
          // Además del aviso, queda en la columna "Contraseña temporal"
          // de la tabla, así que no se pierde si no alcanzás a copiarla.
          if (ra2.warning) {
            banner("Contraseña nueva de " + ra2.email + " · " + ra2.password +
                   " — " + ra2.warning, "hold", ra2.password);
          } else {
            banner("Contraseña nueva de " + ra2.email + " · " + ra2.password,
                   "hold", ra2.password);
          }
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
     Cambiar mi propia contraseña

     Va acá y no en la plantilla a propósito: la plantilla la genera
     Claude Design y se regenera; esto es una capa aparte que sobrevive.
     El botón queda flotando abajo a la derecha porque el encabezado lo
     dibuja React y cualquier cosa que le inyecte se borra al redibujar.
     --------------------------------------------------------------- */
  var MIN_PWD = 6;

  function campo(label, tipo) {
    var wrap = document.createElement("div");
    wrap.style.cssText = "display:flex;flex-direction:column;gap:6px";
    var l = document.createElement("label");
    l.textContent = label;
    l.style.cssText =
      "font:600 11px system-ui,sans-serif;letter-spacing:.12em;" +
      "text-transform:uppercase;color:#5D6D7E";
    var i = document.createElement("input");
    i.type = tipo;
    i.style.cssText =
      "padding:11px 14px;border:1px solid #D8DEE6;border-radius:12px;" +
      "font:400 15px system-ui,sans-serif;color:#1B2733;box-sizing:border-box;width:100%";
    wrap.appendChild(l); wrap.appendChild(i);
    return { wrap: wrap, input: i };
  }

  function abrirCambioPwd() {
    if (document.getElementById("gu-pwd-modal")) return;
    var ses = GU.cache.session;
    if (!ses) return;

    var fondo = document.createElement("div");
    fondo.id = "gu-pwd-modal";
    fondo.style.cssText =
      "position:fixed;inset:0;z-index:99997;background:rgba(15,42,74,.55);" +
      "display:flex;align-items:center;justify-content:center;padding:20px";

    var caja = document.createElement("div");
    caja.style.cssText =
      "background:#fff;border-radius:22px;padding:28px;width:min(430px,100%);" +
      "box-shadow:0 20px 60px rgba(0,0,0,.25);font-family:system-ui,-apple-system,sans-serif";

    var t = document.createElement("div");
    t.textContent = "Cambiar mi contraseña";
    t.style.cssText = "font:800 21px system-ui,sans-serif;color:#0F2A4A;margin-bottom:6px";
    var sub = document.createElement("div");
    sub.textContent = ses.email;
    sub.style.cssText = "font:400 13px system-ui,sans-serif;color:#5D6D7E;margin-bottom:20px";

    var actual = campo("Contraseña actual", "password");
    var nueva  = campo("Contraseña nueva (mín. " + MIN_PWD + " caracteres)", "password");
    var rep    = campo("Repetí la nueva", "password");
    [actual.wrap, nueva.wrap, rep.wrap].forEach(function (w) { w.style.marginBottom = "14px"; });

    var msg = document.createElement("div");
    msg.style.cssText = "font:600 13px system-ui,sans-serif;min-height:18px;margin-bottom:14px";

    var fila = document.createElement("div");
    fila.style.cssText = "display:flex;gap:10px;justify-content:flex-end";
    var cancelar = document.createElement("button");
    cancelar.textContent = "Cancelar";
    cancelar.style.cssText =
      "padding:11px 20px;border-radius:999px;border:1.5px solid #D8DEE6;background:#fff;" +
      "color:#5D6D7E;font:700 14px system-ui,sans-serif;cursor:pointer";
    var guardar = document.createElement("button");
    guardar.textContent = "Cambiar";
    guardar.style.cssText =
      "padding:11px 24px;border-radius:999px;border:none;background:#0A2296;color:#fff;" +
      "font:700 14px system-ui,sans-serif;cursor:pointer";

    function cerrar() { fondo.remove(); }
    cancelar.onclick = cerrar;
    fondo.onclick = function (e) { if (e.target === fondo) cerrar(); };

    guardar.onclick = async function () {
      msg.style.color = "#912018";
      if (!actual.input.value) { msg.textContent = "Escribí tu contraseña actual."; return; }
      if (nueva.input.value.length < MIN_PWD) {
        msg.textContent = "La nueva debe tener al menos " + MIN_PWD + " caracteres."; return;
      }
      if (nueva.input.value !== rep.input.value) {
        msg.textContent = "Las dos contraseñas nuevas no coinciden."; return;
      }
      if (nueva.input.value === actual.input.value) {
        msg.textContent = "La nueva tiene que ser distinta de la actual."; return;
      }
      guardar.disabled = true;
      guardar.textContent = "Cambiando…";
      msg.style.color = "#5D6D7E";
      msg.textContent = "";

      // Se verifica la contraseña actual antes de cambiarla: si alguien deja
      // la sesión abierta, no basta con estar sentado frente a la pantalla.
      var v = await sb.auth.signInWithPassword({
        email: ses.email, password: actual.input.value
      });
      if (v.error) {
        guardar.disabled = false; guardar.textContent = "Cambiar";
        msg.style.color = "#912018";
        msg.textContent = "La contraseña actual no es correcta.";
        return;
      }
      var u = await sb.auth.updateUser({ password: nueva.input.value });
      if (u.error) {
        guardar.disabled = false; guardar.textContent = "Cambiar";
        msg.style.color = "#912018";
        msg.textContent = u.error.message;
        return;
      }
      cerrar();
      banner("Listo, tu contraseña quedó cambiada.", "ok");
    };

    fila.appendChild(cancelar); fila.appendChild(guardar);
    caja.appendChild(t); caja.appendChild(sub);
    caja.appendChild(actual.wrap); caja.appendChild(nueva.wrap); caja.appendChild(rep.wrap);
    caja.appendChild(msg); caja.appendChild(fila);
    fondo.appendChild(caja);
    document.body.appendChild(fondo);
    actual.input.focus();
  }
  GU.abrirCambioPwd = abrirCambioPwd;

  function botonCambioPwd() {
    if (!GU.cache.session || document.getElementById("gu-pwd-btn")) return;
    var b = document.createElement("button");
    b.id = "gu-pwd-btn";
    b.textContent = "Cambiar mi contraseña";
    b.style.cssText =
      "position:fixed;right:18px;bottom:18px;z-index:99996;padding:10px 18px;" +
      "border-radius:999px;border:1.5px solid #0F2A4A;background:#fff;color:#0F2A4A;" +
      "font:700 13px system-ui,-apple-system,sans-serif;cursor:pointer;" +
      "box-shadow:0 4px 16px rgba(0,0,0,.14)";
    b.onclick = abrirCambioPwd;
    document.body.appendChild(b);
  }

  /* ---------------------------------------------------------------
     Borrado de contraseñas temporales vencidas

     Se ejecuta cuando entra una administradora corporativa. No hace
     falta una tarea programada: el portal limpia lo vencido al abrirse,
     y de todos modos nunca muestra una contraseña de más de 2 días.

     OJO: esto borra el REGISTRO, no la contraseña de la cuenta. La
     persona sigue entrando con ella hasta que pida un cambio.
     --------------------------------------------------------------- */
  var DIAS_VIGENCIA = 2;

  async function limpiarVencidas(profile) {
    if (profile.role !== "Administrador corporativo") return;
    var corte = new Date(Date.now() - DIAS_VIGENCIA * 86400000).toISOString();
    try {
      await sb.from("password_resets")
        .update({ temp_password: null })
        .not("temp_password", "is", null)
        .lt("resolved_at", corte);
    } catch (e) { console.warn("[GU] limpieza:", e); }
  }

  /* ---------------------------------------------------------------
     Arranque
     --------------------------------------------------------------- */
  function bootApp() {
    GU.ready = true;
    esperarRender();
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
      await limpiarVencidas(p.data);
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
