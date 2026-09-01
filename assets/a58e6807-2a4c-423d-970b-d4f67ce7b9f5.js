/* @ds-bundle: {"format":4,"namespace":"DesignSystemUnicomerGroup_41def5","components":[{"name":"CoBrandVignette","sourcePath":"components/brand/CoBrandVignette.jsx"},{"name":"DestelloBackground","sourcePath":"components/brand/DestelloBackground.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"DisplayWord","sourcePath":"components/editorial/DisplayWord.jsx"},{"name":"KeyMessage","sourcePath":"components/editorial/KeyMessage.jsx"},{"name":"PhotoMask","sourcePath":"components/editorial/PhotoMask.jsx"},{"name":"SectionHeader","sourcePath":"components/editorial/SectionHeader.jsx"}],"sourceHashes":{"components/brand/CoBrandVignette.jsx":"7303236f9129","components/brand/DestelloBackground.jsx":"ef0d1f263a03","components/brand/Logo.jsx":"8ff56df45cda","components/core/Badge.jsx":"25532777b071","components/core/Button.jsx":"67a0893d46e2","components/core/Card.jsx":"fbddb8df6d8d","components/core/Tag.jsx":"634ac0083683","components/editorial/DisplayWord.jsx":"b26797839e78","components/editorial/KeyMessage.jsx":"1bd50730f072","components/editorial/PhotoMask.jsx":"5dec32de82ed","components/editorial/SectionHeader.jsx":"3ce1eb14933e","ui_kits/comunicaciones/Newsletter.jsx":"7a47a3fc9a47","ui_kits/comunicaciones/SocialPost.jsx":"283ebe39fe1d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystemUnicomerGroup_41def5 = window.DesignSystemUnicomerGroup_41def5 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/DestelloBackground.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Grupo Unicomer — Destello background
 * The signature hero: deep navy field with the sun/arch rendered as a
 * luminous cyan wireframe ("destello"). Drop any content as children; it
 * layers above the wireframe. Great for covers, section intros, hero units.
 */
function DestelloBackground({
  children,
  wireframe = "left",
  // left | right | none
  src,
  basePath = "",
  minHeight = 420,
  padding = "var(--space-8)",
  style,
  ...rest
}) {
  const img = src || `${basePath}assets/bg-destello-clean.png`;
  const showImg = wireframe !== "none";
  const flip = wireframe === "right";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      overflow: "hidden",
      background: "radial-gradient(120% 120% at 20% 0%, #12246E 0%, var(--gu-navy-900) 55%, #071049 100%)",
      color: "var(--gu-white)",
      minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight,
      borderRadius: "var(--radius-xl)",
      display: "flex",
      ...style
    }
  }, rest), showImg && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      top: 0,
      bottom: 0,
      [flip ? "right" : "left"]: 0,
      width: "62%",
      backgroundImage: `url("${img}")`,
      backgroundSize: "cover",
      backgroundPosition: flip ? "right center" : "left center",
      backgroundRepeat: "no-repeat",
      transform: flip ? "scaleX(-1)" : "none",
      opacity: 0.92,
      pointerEvents: "none",
      maskImage: flip ? "linear-gradient(to left, #000 55%, transparent 100%)" : "linear-gradient(to right, #000 55%, transparent 100%)",
      WebkitMaskImage: flip ? "linear-gradient(to left, #000 55%, transparent 100%)" : "linear-gradient(to right, #000 55%, transparent 100%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      padding,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, children));
}
Object.assign(__ds_scope, { DestelloBackground });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/DestelloBackground.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Grupo Unicomer — Logo
 * Renders the official corporate mark (wordmark "Grupo unicomer" + sun/arch
 * isotipo). Raster assets are shipped with the system.
 *
 * BRAND RULES enforced by convention:
 *  • Never separate, recolor, rotate, or add effects to the mark.
 *  • Use `white` on navy/brand/photo backgrounds; `primary` on white.
 *  • The sun isotipo may never be used on its own.
 *
 * Because consuming projects place assets in different folders, pass `src`
 * (or `basePath`) so the image resolves. Defaults assume an `assets/` folder
 * next to the page.
 */
function Logo({
  variant = "primary",
  // primary | white
  height = 44,
  src,
  basePath = "",
  alt = "Grupo Unicomer",
  style,
  ...rest
}) {
  const file = variant === "white" ? "logo-unicomer-white.png" : "logo-unicomer-primary.png";
  const finalSrc = src || `${basePath}assets/${file}`;
  return /*#__PURE__*/React.createElement("img", _extends({
    src: finalSrc,
    alt: alt,
    style: {
      height: typeof height === "number" ? `${height}px` : height,
      width: "auto",
      display: "block",
      userSelect: "none",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/CoBrandVignette.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Grupo Unicomer — Co-brand vignette (viñeta)
 * The endorsement lockup used on commercial-brand comms:
 *   "Una marca de | [Grupo unicomer]"  or
 *   "Una compañía de | [Grupo unicomer]"
 * Reserve `marca` for the Group's commercial brands, `compania`
 * for associated companies. Non-commercial use only.
 */
function CoBrandVignette({
  kind = "marca",
  // marca | compania
  variant = "dark",
  // dark (on light) | white (on dark)
  logoHeight = 30,
  logoSrc,
  style,
  ...rest
}) {
  const label = kind === "compania" ? ["Una", "compañía", "de"] : ["Una", "marca", "de"];
  const onDark = variant === "white";
  const textColor = onDark ? "var(--gu-white)" : "var(--gu-navy-648)";
  const rule = onDark ? "rgba(255,255,255,0.4)" : "var(--gu-gray-cool4)";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "12px",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "13px",
      lineHeight: 1.15,
      color: textColor,
      textAlign: "right",
      fontWeight: "var(--fw-regular)"
    }
  }, label.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      alignSelf: "stretch",
      background: rule,
      minHeight: 42
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    variant: onDark ? "white" : "primary",
    height: logoHeight,
    src: logoSrc
  }));
}
Object.assign(__ds_scope, { CoBrandVignette });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/CoBrandVignette.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Grupo Unicomer — Badge
 * Status / count indicator. The brand keeps status muted, so tones
 * are calm. Use `dot` for a leading status dot.
 */
function Badge({
  children,
  tone = "neutral",
  // neutral | info | success | warning | danger
  dot = false,
  style,
  ...rest
}) {
  const tones = {
    neutral: {
      bg: "var(--surface-muted)",
      fg: "var(--gu-navy-648)",
      dot: "var(--gu-gray-430)"
    },
    info: {
      bg: "rgba(20,180,232,0.14)",
      fg: "var(--gu-cyan-600)",
      dot: "var(--gu-cyan)"
    },
    success: {
      bg: "rgba(86,175,115,0.16)",
      fg: "#2E7D46",
      dot: "var(--gu-green)"
    },
    warning: {
      bg: "rgba(219,155,17,0.16)",
      fg: "#8A6008",
      dot: "var(--gu-amber)"
    },
    danger: {
      bg: "rgba(192,57,43,0.12)",
      fg: "#A02D22",
      dot: "var(--status-danger)"
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.45em",
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-semibold)",
      fontSize: "var(--fs-caption)",
      lineHeight: 1,
      padding: "4px 11px",
      borderRadius: "var(--radius-pill)",
      background: t.bg,
      color: t.fg,
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: t.dot,
      flex: "0 0 auto"
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Grupo Unicomer — Button
 * Pill-shaped action. Primary = brand blue (Pantone 286C). Confident,
 * calm interactions (no bounce). Use `cyan` for accents on light,
 * `onDark` for navy/hero surfaces.
 */
function Button({
  children,
  variant = "primary",
  // primary | cyan | outline | ghost | onDark
  size = "md",
  // sm | md | lg
  iconLeft = null,
  iconRight = null,
  disabled = false,
  type = "button",
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "8px 18px",
      font: "var(--fs-body-sm)"
    },
    md: {
      padding: "12px 26px",
      font: "var(--fs-body)"
    },
    lg: {
      padding: "16px 34px",
      font: "var(--fs-body-lg)"
    }
  };
  const variants = {
    primary: {
      background: "var(--action-primary)",
      color: "var(--gu-white)",
      border: "2px solid var(--action-primary)"
    },
    cyan: {
      background: "var(--action-cyan)",
      color: "var(--gu-white)",
      border: "2px solid var(--action-cyan)"
    },
    outline: {
      background: "transparent",
      color: "var(--action-primary)",
      border: "2px solid var(--action-primary)"
    },
    ghost: {
      background: "transparent",
      color: "var(--action-primary)",
      border: "2px solid transparent"
    },
    onDark: {
      background: "var(--gu-white)",
      color: "var(--gu-navy-648)",
      border: "2px solid var(--gu-white)"
    }
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  const [hover, setHover] = React.useState(false);
  const hoverBg = {
    primary: "var(--action-primary-hover)",
    cyan: "var(--action-cyan-hover)",
    outline: "rgba(0,51,161,0.06)",
    ghost: "rgba(0,51,161,0.06)",
    onDark: "var(--gu-gray-663)"
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.55em",
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-semibold)",
      fontSize: s.font,
      lineHeight: 1,
      letterSpacing: "0.01em",
      padding: s.padding,
      borderRadius: "var(--radius-pill)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      transition: "background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
      transform: hover && !disabled ? "translateY(-1px)" : "none",
      background: hover && !disabled && (variant === "primary" || variant === "cyan") ? hoverBg : hover && !disabled && (variant === "outline" || variant === "ghost") ? hoverBg : v.background,
      color: v.color,
      border: v.border,
      borderColor: hover && !disabled && variant === "primary" ? "var(--action-primary-hover)" : hover && !disabled && variant === "cyan" ? "var(--action-cyan-hover)" : v.border.split(" ").slice(2).join(" "),
      ...style
    }
  }, rest), iconLeft, /*#__PURE__*/React.createElement("span", null, children), iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Grupo Unicomer — Card
 * Soft, generously-rounded content container. `tone` sets the surface;
 * `navy`/`brand` are for impact blocks (text auto-switches to white).
 * Optional `media` renders full-bleed at the top.
 */
function Card({
  children,
  tone = "light",
  // light | subtle | navy | brand
  media = null,
  // node rendered full-bleed at top (e.g. <img>/<PhotoMask>)
  padding = "var(--space-6)",
  interactive = false,
  style,
  ...rest
}) {
  const tones = {
    light: {
      background: "var(--surface-card)",
      color: "var(--text-body)",
      border: "1px solid var(--border-subtle)",
      shadow: "var(--shadow-md)"
    },
    subtle: {
      background: "var(--surface-subtle)",
      color: "var(--text-body)",
      border: "1px solid transparent",
      shadow: "none"
    },
    navy: {
      background: "var(--surface-dark)",
      color: "var(--text-on-dark)",
      border: "1px solid transparent",
      shadow: "var(--shadow-lg)"
    },
    brand: {
      background: "var(--surface-brand)",
      color: "var(--text-on-dark)",
      border: "1px solid transparent",
      shadow: "var(--shadow-md)"
    }
  };
  const t = tones[tone] || tones.light;
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      borderRadius: "var(--radius-lg)",
      background: t.background,
      color: t.color,
      border: t.border,
      boxShadow: hover ? "var(--shadow-lg)" : t.shadow,
      overflow: "hidden",
      transition: "box-shadow var(--dur-med) var(--ease-standard), transform var(--dur-med) var(--ease-standard)",
      transform: hover ? "translateY(-3px)" : "none",
      cursor: interactive ? "pointer" : "default",
      ...style
    }
  }, rest), media && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "block",
      lineHeight: 0
    }
  }, media), /*#__PURE__*/React.createElement("div", {
    style: {
      padding
    }
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Grupo Unicomer — Tag
 * Small pill label for categories, regions, metadata.
 * (e.g. country/region chips under key visuals.)
 */
function Tag({
  children,
  variant = "soft",
  // soft | solid | cyan | outline | onDark
  size = "md",
  // sm | md
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "3px 10px",
      font: "var(--fs-overline)"
    },
    md: {
      padding: "5px 14px",
      font: "var(--fs-caption)"
    }
  };
  const variants = {
    soft: {
      background: "var(--surface-muted)",
      color: "var(--gu-navy-648)",
      border: "1px solid transparent"
    },
    solid: {
      background: "var(--gu-blue-286)",
      color: "var(--gu-white)",
      border: "1px solid var(--gu-blue-286)"
    },
    cyan: {
      background: "rgba(20,180,232,0.14)",
      color: "var(--gu-cyan-600)",
      border: "1px solid transparent"
    },
    outline: {
      background: "transparent",
      color: "var(--gu-navy-648)",
      border: "1px solid var(--border-strong)"
    },
    onDark: {
      background: "rgba(255,255,255,0.14)",
      color: "var(--gu-white)",
      border: "1px solid rgba(255,255,255,0.24)"
    }
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.soft;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4em",
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-semibold)",
      fontSize: s.font,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      lineHeight: 1,
      padding: s.padding,
      borderRadius: "var(--radius-pill)",
      whiteSpace: "nowrap",
      ...v,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/editorial/DisplayWord.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Grupo Unicomer — DisplayWord
 * The oversized editorial word (Montserrat Black) layered over photos and
 * navy blocks: "NEGOCIOS", "CASUAL", "TODO EN UNO". Can run horizontal or
 * bottom-to-top vertical, filled or outlined.
 */
function DisplayWord({
  children,
  color = "cyan",
  // cyan | white | navy
  orientation = "horizontal",
  // horizontal | vertical
  outline = false,
  size = "var(--fs-display-2xl)",
  style,
  ...rest
}) {
  const colors = {
    cyan: "var(--gu-cyan)",
    white: "var(--gu-white)",
    navy: "var(--gu-navy-900)"
  };
  const c = colors[color] || colors.cyan;
  const base = {
    fontFamily: "var(--font-display)",
    fontWeight: "var(--fw-black)",
    fontSize: size,
    lineHeight: 0.92,
    letterSpacing: "var(--ls-display)",
    textTransform: "uppercase",
    margin: 0,
    color: outline ? "transparent" : c,
    WebkitTextStroke: outline ? `2px ${c}` : "0",
    display: "inline-block"
  };
  const vertical = orientation === "vertical" ? {
    writingMode: "vertical-rl",
    transform: "rotate(180deg)"
  } : {};
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...base,
      ...vertical,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { DisplayWord });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/DisplayWord.jsx", error: String((e && e.message) || e) }); }

// components/editorial/KeyMessage.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Grupo Unicomer — KeyMessage
 * The amber "MENSAJE CLAVE" callout from the Playbook: a rounded block
 * holding the single, emotional key message. Keep copy short and about
 * wellbeing / calidad de vida — never generic ("mejores precios").
 */
function KeyMessage({
  children,
  label = "Mensaje clave",
  variant = "amber",
  // amber | navy | cyan
  align = "center",
  // left | center
  showLabel = true,
  style,
  ...rest
}) {
  const variants = {
    amber: {
      bg: "var(--gu-amber-bright)",
      fg: "var(--gu-navy-648)",
      label: "var(--gu-navy-648)"
    },
    navy: {
      bg: "var(--gu-navy-648)",
      fg: "var(--gu-white)",
      label: "var(--gu-cyan)"
    },
    cyan: {
      bg: "var(--gu-cyan)",
      fg: "var(--gu-white)",
      label: "var(--gu-white)"
    }
  };
  const v = variants[variant] || variants.amber;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      textAlign: align,
      ...style
    }
  }, rest), showLabel && /*#__PURE__*/React.createElement("div", {
    className: "gu-overline",
    style: {
      color: v.label,
      marginBottom: "var(--space-3)",
      letterSpacing: "var(--ls-overline)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block",
      background: v.bg,
      color: v.fg,
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-bold)",
      fontSize: "var(--fs-h3)",
      lineHeight: 1.25,
      letterSpacing: "var(--ls-heading)",
      padding: "18px 30px",
      borderRadius: "var(--radius-lg)",
      textTransform: "uppercase"
    }
  }, children));
}
Object.assign(__ds_scope, { KeyMessage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/KeyMessage.jsx", error: String((e && e.message) || e) }); }

// components/editorial/PhotoMask.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Grupo Unicomer — PhotoMask
 * Imagery in the brand's soft rounded "U / squircle" masks, with an optional
 * blue duotone treatment (the corporate photographic look). Pass an <img>,
 * background url via `src`, or any children.
 */
function PhotoMask({
  src,
  alt = "",
  shape = "squircle",
  // squircle | rounded | circle
  duotone = false,
  // apply the corporate blue duotone
  ratio = "4 / 3",
  children,
  style,
  ...rest
}) {
  const radii = {
    squircle: "38% 38% 38% 38% / 30% 30% 30% 30%",
    rounded: "var(--radius-lg)",
    circle: "50%"
  };
  const radius = radii[shape] || radii.squircle;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      aspectRatio: ratio,
      borderRadius: radius,
      overflow: "hidden",
      background: "var(--gu-navy-900)",
      ...style
    }
  }, rest), src && /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: duotone ? "grayscale(1) contrast(1.05) brightness(1.02)" : "none",
      display: "block"
    }
  }), children, duotone && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(150deg, var(--gu-blue-286) 0%, var(--gu-blue-2945) 60%, var(--gu-navy-900) 100%)",
      mixBlendMode: "color",
      opacity: 0.92
    }
  }), duotone && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(150deg, rgba(20,180,232,0.28) 0%, rgba(10,26,92,0.18) 100%)",
      mixBlendMode: "screen"
    }
  }));
}
Object.assign(__ds_scope, { PhotoMask });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/PhotoMask.jsx", error: String((e && e.message) || e) }); }

// components/editorial/SectionHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Grupo Unicomer — SectionHeader
 * Two grounded patterns from the brand book:
 *  • layout="stack"  → big outlined number over a solid colour bar with the
 *                      section title (the "01 · Logotipo" chapter dividers).
 *  • layout="bar"    → a full-width colour band with a "» Title" and optional
 *                      right-aligned description (the page headers).
 */
function SectionHeader({
  number,
  title,
  description,
  color = "cyan",
  // cyan | navy
  layout = "bar",
  // bar | stack
  style,
  ...rest
}) {
  const barBg = color === "navy" ? "var(--gu-navy-900)" : "var(--gu-cyan)";
  const numColor = color === "navy" ? "var(--gu-navy-800)" : "var(--gu-cyan)";
  if (layout === "stack") {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        ...style
      }
    }, rest), number && /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: "var(--fw-bold)",
        fontSize: "clamp(84px, 12vw, 168px)",
        lineHeight: 0.9,
        letterSpacing: "-0.02em",
        color: "transparent",
        WebkitTextStroke: `2px ${numColor}`,
        marginBottom: "-0.06em",
        paddingLeft: "6px"
      }
    }, number), /*#__PURE__*/React.createElement("div", {
      style: {
        background: barBg,
        color: "var(--gu-white)",
        padding: "20px 28px",
        borderRadius: "2px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: "var(--fw-bold)",
        fontSize: "var(--fs-display-lg)",
        lineHeight: 1.02,
        letterSpacing: "var(--ls-heading)"
      }
    }, title)));
  }

  // layout === "bar"
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: barBg,
      color: "var(--gu-white)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-6)",
      padding: "22px clamp(24px, 5vw, 64px)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      color: "var(--gu-white)",
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-bold)",
      fontSize: "var(--fs-h2)",
      letterSpacing: "var(--ls-heading)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.85,
      marginRight: "0.35em"
    }
  }, "\xBB"), title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: "46ch",
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-body-sm)",
      lineHeight: 1.4,
      color: "rgba(255,255,255,0.92)"
    }
  }, description));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/comunicaciones/Newsletter.jsx
try { (() => {
// Grupo Unicomer — Corporate Communications newsletter / intranet screen.
// Composes the design-system primitives. Cosmetic recreation.

const A = "assets/"; // asset base (index.html copies assets alongside, or adjust)

const PIX = {
  team: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=70",
  meeting: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=70",
  store: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1000&q=70",
  solar: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1000&q=70",
  celebrate: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=70"
};
const PILARES = [{
  key: "todo",
  tab: "Todo en Uno",
  eyebrow: "Full-Service Retail",
  word: "Todo en Uno",
  copy: "Somos un grupo de retail con un nivel de servicio integral: motos, tecnología, electrodomésticos, gaming y más."
}, {
  key: "bienestar",
  tab: "Bienestar",
  eyebrow: "Responsabilidad Social",
  word: "Bienestar",
  copy: "Brindamos soluciones para que colaboradores, clientes y comunidades alcancen el bienestar que merecen."
}, {
  key: "negocios",
  tab: "Negocios",
  eyebrow: "Unicomer Business",
  word: "Negocios",
  copy: "Seguimos innovando: adquisiciones, expansión de cadenas y nuevas experiencias para nuestros stakeholders."
}];
const NAV = ["Inicio", "Cultura", "Marcas", "Sostenibilidad", "Talento"];
function Newsletter({
  assetBase = A
}) {
  const {
    Logo,
    DestelloBackground,
    DisplayWord,
    SectionHeader,
    Card,
    Button,
    Tag,
    PhotoMask,
    KeyMessage,
    CoBrandVignette,
    Badge
  } = window.DesignSystemUnicomerGroup_41def5;
  const [pilar, setPilar] = React.useState(0);
  const [nav, setNav] = React.useState("Inicio");
  const p = PILARES[pilar];
  const wrap = {
    fontFamily: "var(--font-body)",
    color: "var(--text-body)",
    background: "var(--surface-page)",
    minHeight: "100%"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1160,
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      gap: 28,
      padding: "14px 28px"
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "primary",
    src: assetBase + "logo-unicomer-primary.png",
    height: 40
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 22,
      marginLeft: 12
    }
  }, NAV.map(n => /*#__PURE__*/React.createElement("button", {
    key: n,
    onClick: () => setNav(n),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: 14,
      color: nav === n ? "var(--gu-blue-286)" : "var(--text-muted)",
      borderBottom: nav === n ? "2px solid var(--gu-cyan)" : "2px solid transparent",
      padding: "6px 2px"
    }
  }, n))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "info",
    dot: true
  }, "3 nuevos"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "cyan"
  }, "Bolet\xEDn")))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1160,
      margin: "0 auto",
      padding: "28px 28px 0"
    }
  }, /*#__PURE__*/React.createElement(DestelloBackground, {
    wireframe: "left",
    src: assetBase + "bg-destello-clean.png",
    minHeight: 420
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "52%",
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "gu-overline",
    style: {
      color: "var(--gu-cyan)",
      margin: "0 0 10px"
    }
  }, "Comunicaci\xF3n Corporativa \xB7 ", p.eyebrow), /*#__PURE__*/React.createElement(DisplayWord, {
    color: "white",
    size: "clamp(40px,5vw,72px)"
  }, p.word), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "rgba(255,255,255,0.86)",
      fontSize: 17,
      lineHeight: 1.55,
      margin: "16px 0 24px",
      maxWidth: "42ch"
    }
  }, p.copy), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginBottom: 26
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "onDark"
  }, "Leer m\xE1s"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    style: {
      color: "#fff",
      borderColor: "rgba(255,255,255,0.4)"
    }
  }, "Compartir")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, PILARES.map((pp, i) => /*#__PURE__*/React.createElement("button", {
    key: pp.key,
    onClick: () => setPilar(i),
    style: {
      background: i === pilar ? "var(--gu-cyan)" : "rgba(255,255,255,0.12)",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: 12.5,
      padding: "8px 16px",
      borderRadius: "var(--radius-pill)"
    }
  }, pp.tab)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1160,
      margin: "0 auto",
      padding: "56px 28px 0"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "gu-overline",
    style: {
      color: "var(--gu-cyan-600)",
      margin: "0 0 6px"
    }
  }, "Pilares de comunicaci\xF3n"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 26px",
      fontSize: "var(--fs-display-lg)"
    }
  }, "Tem\xE1ticas que forman nuestros mensajes"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 22
    }
  }, [{
    n: "1",
    t: "Todo en Uno",
    d: "Nuestra amplia oferta de valor, marcas y servicios — todo en un solo lugar.",
    tone: "light"
  }, {
    n: "2",
    t: "Bienestar",
    d: "Compromiso social, ambiental y económico con nuestras comunidades.",
    tone: "brand"
  }, {
    n: "3",
    t: "Negocios Unicomer",
    d: "Innovación, adquisiciones y expansión que informamos a stakeholders.",
    tone: "navy"
  }].map(c => /*#__PURE__*/React.createElement(Card, {
    key: c.n,
    tone: c.tone,
    interactive: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: 40,
      lineHeight: 1,
      color: c.tone === "light" ? "var(--gu-cyan)" : "rgba(255,255,255,0.6)"
    }
  }, c.n), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "10px 0 8px",
      color: c.tone === "light" ? "var(--text-strong)" : "#fff"
    }
  }, c.t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14.5,
      lineHeight: 1.55,
      color: c.tone === "light" ? "var(--text-body)" : "rgba(255,255,255,0.82)"
    }
  }, c.d))))), /*#__PURE__*/React.createElement("section", {
    style: {
      margin: "56px 0 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--gu-navy-900)",
      padding: "56px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1160,
      margin: "0 auto",
      padding: "0 28px",
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: 40,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(DisplayWord, {
    color: "white",
    orientation: "vertical",
    size: "clamp(60px,9vw,120px)"
  }, "Real"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.1fr 1fr",
      gap: 20,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(PhotoMask, {
    src: PIX.solar,
    shape: "rounded",
    duotone: true,
    ratio: "4 / 3"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "gu-overline",
    style: {
      color: "var(--gu-cyan)",
      margin: "0 0 12px"
    }
  }, "Crudo & Real"), /*#__PURE__*/React.createElement(KeyMessage, {
    variant: "cyan",
    showLabel: false,
    align: "left",
    style: {
      marginBottom: 18
    }
  }, "Elevamos la calidad de vida de las personas"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "rgba(255,255,255,0.82)",
      fontSize: 15,
      lineHeight: 1.6,
      margin: 0,
      maxWidth: "40ch"
    }
  }, "Escenas aut\xE9nticas de nuestro d\xEDa a d\xEDa, cuidando encuadres limpios y una actitud servicial.")))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1160,
      margin: "0 auto",
      padding: "56px 28px 0"
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    layout: "bar",
    color: "cyan",
    title: "\xDAltimas noticias",
    description: "Novedades del Grupo, cultura y sostenibilidad.",
    style: {
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      marginBottom: 26
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 22
    }
  }, [{
    img: PIX.store,
    tag: "Marcas",
    t: "Seguimos innovando la experiencia en tienda"
  }, {
    img: PIX.celebrate,
    tag: "Cultura",
    t: "Celebramos a nuestro Talento Unicomer"
  }, {
    img: PIX.meeting,
    tag: "Sostenibilidad",
    t: "Nuevo Reporte de Sostenibilidad disponible"
  }].map((c, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    tone: "light",
    interactive: true,
    padding: "0",
    media: /*#__PURE__*/React.createElement(PhotoMask, {
      src: c.img,
      shape: "rounded",
      ratio: "16 / 10",
      style: {
        borderRadius: 0
      }
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 20px 22px"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    variant: "cyan",
    size: "sm"
  }, c.tag), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "12px 0 0",
      fontSize: 18,
      lineHeight: 1.3
    }
  }, c.t)))))), /*#__PURE__*/React.createElement("footer", {
    style: {
      marginTop: 64,
      background: "var(--gu-navy-900)",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1160,
      margin: "0 auto",
      padding: "40px 28px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "white",
    src: assetBase + "logo-unicomer-white.png",
    height: 44,
    style: {
      margin: "0 auto 14px"
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "gu-regional",
    style: {
      color: "rgba(255,255,255,0.7)",
      margin: "0 0 22px"
    }
  }, "Centro Am\xE9rica \xB7 Suram\xE9rica \xB7 Caribe \xB7 EE.UU."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 22,
      justifyContent: "center",
      flexWrap: "wrap",
      opacity: 0.9,
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: ".04em",
      color: "rgba(255,255,255,0.8)"
    }
  }, ["La Curacao", "Tropigas", "Gollo", "Courts", "RadioShack", "Artefacta"].map(m => /*#__PURE__*/React.createElement("span", {
    key: m
  }, m))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid rgba(255,255,255,0.14)",
      marginTop: 26,
      paddingTop: 22,
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(CoBrandVignette, {
    kind: "marca",
    variant: "white",
    logoSrc: assetBase + "logo-unicomer-white.png"
  })))));
}
window.Newsletter = Newsletter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/comunicaciones/Newsletter.jsx", error: String((e && e.message) || e) }); }

// ui_kits/comunicaciones/SocialPost.jsx
try { (() => {
// Grupo Unicomer — Social post preview (Instagram-style feed post).
// Mirrors the "USO CORRECTO" examples in the Playbook.

const POSTS = [{
  key: "soluciones",
  word: "Soluciones",
  eyebrow: "Nos comprometemos a crear",
  img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=70",
  caption: "En Grupo Unicomer nos comprometemos a crear soluciones a través de todas nuestras marcas, para que tú mejores tu calidad de vida.",
  bg: "var(--gu-green)"
}, {
  key: "familia",
  word: "¡Aplica ya!",
  eyebrow: "Y forma parte de nuestra gran familia",
  img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=70",
  caption: "Sabemos que todos buscamos oportunidades de crecimiento. Aplica ya y forma parte de la Familia Unicomer.",
  bg: "var(--gu-blue-286)"
}, {
  key: "bienestar",
  word: "Bienestar",
  eyebrow: "Innovamos para tu",
  img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=70",
  caption: "Continuamos brindando soluciones innovadoras para que nuestros clientes alcancen su bienestar.",
  bg: "var(--gu-navy-900)"
}];
function Heart({
  filled
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: filled ? "var(--status-danger)" : "none",
    stroke: filled ? "var(--status-danger)" : "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"
  }));
}
const Icon = ({
  d
}) => /*#__PURE__*/React.createElement("svg", {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: d
}));
function SocialPost({
  assetBase = "assets/"
}) {
  const {
    Logo,
    DisplayWord,
    PhotoMask,
    Button,
    Tag
  } = window.DesignSystemUnicomerGroup_41def5;
  const [idx, setIdx] = React.useState(0);
  const [liked, setLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(902);
  const post = POSTS[idx];
  const toggleLike = () => {
    setLiked(l => {
      setLikes(n => n + (l ? -1 : 1));
      return !l;
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 22,
      padding: "28px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, POSTS.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p.key,
    onClick: () => setIdx(i),
    style: {
      background: i === idx ? "var(--gu-blue-286)" : "var(--surface-muted)",
      color: i === idx ? "#fff" : "var(--text-muted)",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: 12.5,
      padding: "8px 16px",
      borderRadius: "var(--radius-pill)"
    }
  }, p.word))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 380,
      maxWidth: "100%",
      background: "#fff",
      borderRadius: 22,
      border: "1px solid var(--border-subtle)",
      boxShadow: "var(--shadow-lg)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "12px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: "50%",
      background: "var(--gu-navy-900)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "white",
    src: assetBase + "logo-unicomer-white.png",
    height: 13
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 14,
      color: "var(--text-strong)"
    }
  }, "grupounicomer"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      color: "var(--text-muted)"
    }
  }, "\xB7\xB7\xB7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: post.bg,
      aspectRatio: "1 / 1",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: post.img,
    alt: "",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(10,26,92,0) 40%, rgba(10,26,92,0.55) 100%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 14,
      left: 14
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "white",
    src: assetBase + "logo-unicomer-white.png",
    height: 26
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 18,
      right: 18,
      bottom: 18
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 2px",
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: 13,
      color: "#fff",
      opacity: 0.92
    }
  }, post.eyebrow), /*#__PURE__*/React.createElement(DisplayWord, {
    color: "white",
    size: "40px"
  }, post.word))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 14px 4px",
      display: "flex",
      gap: 16,
      color: "var(--text-strong)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: toggleLike,
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
      color: "inherit"
    }
  }, /*#__PURE__*/React.createElement(Heart, {
    filled: liked
  })), /*#__PURE__*/React.createElement(Icon, {
    d: "M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-4-1L3 20l1-6a8.5 8.5 0 1 1 17-2.5z"
  }), /*#__PURE__*/React.createElement(Icon, {
    d: "M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 14px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 13.5,
      color: "var(--text-strong)",
      marginBottom: 6
    }
  }, likes.toLocaleString("es"), " Me gusta"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13.5,
      lineHeight: 1.5,
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--text-strong)"
    }
  }, "grupounicomer"), " ", post.caption), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    variant: "soft",
    size: "sm"
  }, "#FamiliaUnicomer"), /*#__PURE__*/React.createElement(Tag, {
    variant: "soft",
    size: "sm"
  }, "#Bienestar")))));
}
window.SocialPost = SocialPost;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/comunicaciones/SocialPost.jsx", error: String((e && e.message) || e) }); }

__ds_ns.CoBrandVignette = __ds_scope.CoBrandVignette;

__ds_ns.DestelloBackground = __ds_scope.DestelloBackground;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.DisplayWord = __ds_scope.DisplayWord;

__ds_ns.KeyMessage = __ds_scope.KeyMessage;

__ds_ns.PhotoMask = __ds_scope.PhotoMask;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

})();
