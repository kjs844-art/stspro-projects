<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>KOSMO JOE FIN Terminal</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />

<style>
  :root {
    --bg-0: #03060d;
    --bg-1: #070b18;
    --bg-2: #0d1428;
    --ink-0: #e9efff;
    --ink-1: #9aa7c7;
    --ink-2: #5b6886;
    --ink-3: #3a4564;
    --grid: rgba(120, 160, 255, 0.06);
    --line: rgba(120, 160, 255, 0.15);
    --up: #2ee6a0;
    --down: #ff4d6d;
    --accent: #6ad8ff;
    --magenta: #ff4dff;
    --gold: #ffd84d;
    --violet: #a07cff;
  }

  * { box-sizing: border-box; }
  html, body {
    margin: 0;
    height: 100%;
    background: radial-gradient(ellipse at 50% 35%, #0d1530 0%, #060912 55%, #03050a 100%);
    color: var(--ink-0);
    font-family: 'Space Grotesk', system-ui, sans-serif;
    overflow: auto;
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(var(--grid) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%);
    pointer-events: none;
  }
  body::after {
    content: "";
    position: fixed;
    inset: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.6 0 0 0 0 0.7 0 0 0 0 1 0 0 0 0.045 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
    pointer-events: none;
    mix-blend-mode: screen;
  }

  /* ---------- LAYOUT ---------- */
  .stage {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 260px minmax(620px, 1fr) 320px;
    grid-template-rows: 48px minmax(0, 1fr) 32px;
    gap: 12px;
    padding: 12px;
  }

  .chrome { grid-column: 1 / -1; grid-row: 1; }
  .left   { grid-column: 1; grid-row: 2; }
  .center { grid-column: 2; grid-row: 2; }
  .right  { grid-column: 3; grid-row: 2; }
  .footer { grid-column: 1 / -1; grid-row: 3; }

  .left, .right {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 0;
  }
  .left { position: relative; }
  .right { display: flex; }
  body.chart-open .stage {
    grid-template-columns: 260px minmax(620px, 1fr) 320px;
  }
  body.chart-open .right {
    display: flex;
  }
  .center {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-rows: minmax(0, 1fr) 132px;
    gap: 8px;
    min-height: 0;
  }

  .chrome {
    position: relative;
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    color: var(--ink-2);
    text-transform: uppercase;
  }
  .chrome .brand { display: flex; align-items: center; gap: 10px; color: var(--ink-1); }
  .brand .dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--up);
    box-shadow: 0 0 12px var(--up);
    animation: blink 1.4s infinite;
  }
  @keyframes blink { 50% { opacity: 0.25; } }
  .chrome .right-cluster { display: flex; gap: 18px; }
  .chrome b { color: var(--ink-0); font-weight: 500; }
  .terminal-action {
    border: 1px solid rgba(106, 216, 255, 0.35);
    background: rgba(106, 216, 255, 0.1);
    color: var(--ink-0);
    border-radius: 4px;
    padding: 5px 9px;
    font: inherit;
    letter-spacing: 0.08em;
    cursor: pointer;
  }
  .terminal-action:hover {
    background: rgba(106, 216, 255, 0.2);
  }
  .menu-toggle {
    width: 34px;
    height: 34px;
    display: inline-grid;
    place-items: center;
    gap: 4px;
    border: 1px solid rgba(106, 216, 255, 0.38);
    border-radius: 6px;
    background: rgba(6, 12, 26, 0.72);
    color: var(--ink-0);
    cursor: pointer;
    box-shadow: 0 0 0 1px rgba(106, 216, 255, 0.08), 0 0 22px rgba(106, 216, 255, 0.08);
  }
  .menu-toggle span {
    width: 15px;
    height: 2px;
    border-radius: 99px;
    background: var(--accent);
    box-shadow: 0 0 8px rgba(106, 216, 255, 0.7);
  }
  .menu-toggle:hover,
  .menu-toggle:focus-visible {
    background: rgba(106, 216, 255, 0.15);
    outline: none;
  }
  .app-drawer-backdrop {
    position: fixed;
    inset: 0;
    z-index: 80;
    background: rgba(0, 0, 0, 0.34);
    opacity: 0;
    pointer-events: none;
    transition: opacity 160ms ease;
  }
  .app-drawer {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 90;
    width: min(320px, calc(100vw - 28px));
    padding: 18px;
    background:
      linear-gradient(180deg, rgba(13, 20, 40, 0.98), rgba(4, 7, 15, 0.98)),
      radial-gradient(circle at 20% 10%, rgba(106, 216, 255, 0.16), transparent 34%);
    border-right: 1px solid rgba(106, 216, 255, 0.28);
    box-shadow: 24px 0 70px rgba(0, 0, 0, 0.48);
    transform: translateX(-104%);
    transition: transform 180ms ease;
  }
  body.drawer-open .app-drawer {
    transform: translateX(0);
  }
  body.drawer-open .app-drawer-backdrop {
    opacity: 1;
    pointer-events: auto;
  }
  .drawer-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 18px;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  .drawer-head strong {
    font-size: 12px;
    color: var(--ink-0);
  }
  .drawer-close {
    width: 30px;
    height: 30px;
    border: 1px solid rgba(120, 160, 255, 0.24);
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.04);
    color: var(--ink-0);
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
  }
  .drawer-close:hover,
  .drawer-close:focus-visible {
    border-color: rgba(106, 216, 255, 0.55);
    outline: none;
  }
  .drawer-links {
    display: grid;
    gap: 9px;
  }
  .drawer-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 42px;
    padding: 10px 12px;
    border: 1px solid rgba(120, 160, 255, 0.16);
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.035);
    color: var(--ink-0);
    text-decoration: none;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.08em;
  }
  .drawer-link::after {
    content: ">";
    color: var(--accent);
  }
  .drawer-link:hover,
  .drawer-link:focus-visible {
    background: rgba(106, 216, 255, 0.12);
    border-color: rgba(106, 216, 255, 0.38);
    outline: none;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    color: var(--ink-2);
    text-transform: uppercase;
  }

  /* ---------- PANELS ---------- */
  .panel {
    background: linear-gradient(180deg, rgba(20, 28, 50, 0.55), rgba(8, 12, 24, 0.55));
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 10px 12px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    position: relative;
    min-height: 0;
  }
  .panel::before {
    content: "";
    position: absolute;
    top: -1px; left: 14px;
    width: 28px; height: 1px;
    background: var(--accent);
    box-shadow: 0 0 8px var(--accent);
  }
  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-2);
    margin-bottom: 6px;
  }
  .panel-header b { color: var(--ink-0); font-weight: 500; }

  /* watchlist rows */
  .ticker-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: 4px 0;
    border-bottom: 1px dashed rgba(120, 160, 255, 0.08);
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    cursor: pointer;
    transition: background .12s, padding .12s;
    padding-left: 4px;
    padding-right: 4px;
    border-radius: 3px;
  }
  .ticker-row:hover {
    background: rgba(106, 216, 255, 0.08);
  }
  .ticker-row.active {
    background: rgba(106, 216, 255, 0.18);
    box-shadow: inset 2px 0 0 var(--accent);
  }
  .ticker-row:last-child { border-bottom: 0; }
  .ticker-row .name { color: var(--ink-0); letter-spacing: 0.04em; }
  .ticker-row .val { color: var(--ink-1); font-variant-numeric: tabular-nums; }
  .ticker-row .chg { font-weight: 600; font-variant-numeric: tabular-nums; min-width: 64px; text-align: right; }
  .ticker-row.up .chg { color: var(--up); }
  .ticker-row.down .chg { color: var(--down); }
  .ticker-row .sw {
    display: inline-block;
    width: 6px; height: 6px;
    border-radius: 50%;
    margin-right: 7px;
    vertical-align: middle;
  }

  .left .panel, .right .panel {
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .scroll {
    overflow-y: auto;
    flex: 1 1 auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(120, 160, 255, 0.2) transparent;
  }
  .scroll::-webkit-scrollbar { width: 4px; }
  .scroll::-webkit-scrollbar-thumb { background: rgba(120, 160, 255, 0.2); }

  /* ---------- GLOBE AREA ---------- */
  .globe-area {
    position: relative;
    display: grid;
    place-items: center;
    min-height: 0;
    min-width: 0;
    overflow: visible;
    cursor: grab;
    touch-action: none;
    user-select: none;
  }
  .globe-area.dragging {
    cursor: grabbing;
  }
  .globe-stage {
    position: relative;
    z-index: 1;
    margin-left: -58px;
    /* sized in JS to fit the available area (square) */
    width: 760px;
    height: 760px;
    max-width: 100%;
    max-height: 100%;
    transform-origin: center center;
    transition: transform 160ms ease-out;
    display: grid;
    place-items: center;
  }
  .globe-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
    position: relative;
    z-index: 2;
    filter: drop-shadow(0 0 40px rgba(106, 216, 255, 0.24));
  }
  .whirl, .market-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .market-layer { z-index: 3; }

  .caption {
    position: absolute;
    bottom: 2%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.22em;
    color: var(--ink-1);
    text-transform: uppercase;
    width: 100%;
    pointer-events: none;
  }
  .caption .big {
    display: block;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    letter-spacing: 0.04em;
    font-size: 15px;
    color: var(--ink-0);
    margin-bottom: 6px;
    text-transform: none;
  }
  .progress {
    margin: 8px auto 0;
    width: 320px;
    height: 2px;
    background: rgba(120, 160, 255, 0.12);
    border-radius: 2px;
    overflow: hidden;
    position: relative;
  }
  .progress::after {
    content: "";
    position: absolute;
    left: -40%;
    top: 0; height: 100%; width: 40%;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    animation: sweep 2.2s linear infinite;
  }
  @keyframes sweep { to { left: 110%; } }

  /* ---------- LOGOS STRIP ---------- */
  .logos-panel {
    overflow: hidden;
    padding: 6px 0;
    display: block;
  }
  .logos-panel::before { display: none; }
  .logos-stack {
    height: 100%;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    gap: 5px;
    overflow: hidden;
  }
  .logos-marquee {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 12px;
    width: max-content;
    animation: marquee 138s linear infinite;
  }
  .logos-marquee.row-2 {
    animation-duration: 162s;
    animation-direction: reverse;
  }
  .logos-marquee.row-3 {
    animation-duration: 184s;
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .logo-chip {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 3px 9px 3px 3px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(120, 160, 255, 0.1);
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: var(--ink-1);
    white-space: nowrap;
    flex-shrink: 0;
  }
  .logo-chip .logo {
    width: 22px; height: 22px;
    border-radius: 6px;
    display: inline-grid; place-items: center;
    font-weight: 700;
    font-size: 11px;
    letter-spacing: -0.02em;
    flex-shrink: 0;
    overflow: hidden;
    background: #fff;
    position: relative;
  }
  .logo-chip .logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 3px;
    background: #fff;
    display: block;
  }
  .logo-chip .logo .mono {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    color: var(--mono-fg, #fff);
    background: var(--mono-bg, #1a8b6e);
  }
  .logo-chip .ticker { color: var(--ink-0); font-weight: 600; }
  .logo-chip .name { color: var(--ink-2); }
  .logo-chip .pp { font-variant-numeric: tabular-nums; }
  .logo-chip .pp.up { color: var(--up); }
  .logo-chip .pp.down { color: var(--down); }
  /* commodity category separator in fx-list */
  .cat-sep {
    font: 600 8px 'JetBrains Mono', monospace;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--ink-2);
    padding: 7px 4px 2px;
    border-top: 1px solid rgba(120, 160, 255, 0.1);
    margin-top: 2px;
  }

  /* clickable logo chips */
  .logo-chip {
    cursor: pointer;
    transition: background .12s, border-color .12s, transform .12s, box-shadow .12s;
    position: relative;
  }
  .logo-chip:hover {
    background: rgba(106, 216, 255, 0.14);
    border-color: rgba(106, 216, 255, 0.45);
    transform: scale(1.06) translateY(-2px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.4), 0 0 10px rgba(106,216,255,0.15);
    z-index: 5;
  }
  .logo-chip:active { transform: scale(1.02) translateY(0); }
  /* pause marquee scroll on hover so the chip can be clicked */
  .logos-marquee:hover { animation-play-state: paused; }

  /* ---------- COMBINED CHART FRAME ---------- */
  .chart-overlay {
    position: fixed;
    inset: 64px 300px 52px;
    z-index: 30;
    display: none;
    background: rgba(2, 6, 16, 0.72);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(106, 216, 255, 0.18);
    border-radius: 10px;
    padding: 12px;
    box-shadow: 0 28px 90px rgba(0, 0, 0, 0.45);
  }
  body.chart-open .chart-overlay {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 260px;
    gap: 12px;
  }
  .chart-side {
    display: flex;
    flex-direction: column;
    min-height: 0;
    gap: 10px;
  }
  .chart-side .panel {
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .view-overlay {
    position: fixed;
    inset: 64px 300px 52px;
    z-index: 32;
    display: none;
    background: rgba(2, 6, 16, 0.86);
    border: 1px solid rgba(106, 216, 255, 0.18);
    border-radius: 10px;
    padding: 16px;
    box-shadow: 0 28px 90px rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  body.news-open .news-view,
  body.login-open .login-view {
    display: block;
  }

  /* ---------- CHART ACADEMY OVERLAY ---------- */
  .chartlib-overlay {
    position: fixed;
    inset: 64px 300px 52px;
    z-index: 32;
    display: none;
    background: rgba(2, 6, 16, 0.93);
    border: 1px solid rgba(106, 216, 255, 0.18);
    border-radius: 10px;
    box-shadow: 0 28px 90px rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    overflow: hidden;
    flex-direction: column;
  }
  body.chartlib-open .chartlib-overlay { display: flex; }
  .cl-header {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    height: 40px;
    border-bottom: 1px solid var(--line);
  }
  .cl-header-title { font-size: 11px; letter-spacing: 0.08em; color: var(--ink-1); font-weight: 600; }
  .cl-header-title b { color: var(--accent); }
  .cl-body {
    flex: 1;
    display: grid;
    grid-template-columns: 300px minmax(0, 1fr);
    overflow: hidden;
  }
  .cl-grid {
    overflow-y: auto;
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 7px;
    align-content: start;
    border-right: 1px solid var(--line);
  }
  .cl-card {
    background: rgba(13, 20, 40, 0.7);
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 8px;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;
    color: inherit;
    font-family: inherit;
  }
  .cl-card:hover { border-color: rgba(106, 216, 255, 0.35); background: rgba(20, 30, 60, 0.8); }
  .cl-card.active { border-color: var(--accent); background: rgba(10, 25, 55, 0.95); box-shadow: 0 0 12px rgba(106,216,255,0.12); }
  .cl-icon { line-height: 0; }
  .cl-icon svg { width: 100%; height: auto; max-height: 34px; }
  .cl-card-name-kr { font-size: 10px; font-weight: 600; color: var(--ink-0); line-height: 1.3; }
  .cl-card-name-en { font-size: 8px; color: var(--ink-2); letter-spacing: 0.06em; line-height: 1.2; }
  .cl-badge { font-size: 7px; padding: 1px 5px; border-radius: 3px; align-self: flex-start; letter-spacing: 0.05em; font-weight: 600; }
  .cl-badge.easy   { background: rgba(46,230,160,0.12); color: var(--up);   border: 1px solid rgba(46,230,160,0.28); }
  .cl-badge.medium { background: rgba(255,216,77,0.12);  color: var(--gold); border: 1px solid rgba(255,216,77,0.28); }
  .cl-badge.hard   { background: rgba(255,77,109,0.12);  color: var(--down); border: 1px solid rgba(255,77,109,0.28); }
  .cl-detail {
    overflow-y: auto;
    padding: 20px 22px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .cl-detail-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
  .cl-detail-title { font-size: 20px; font-weight: 700; color: var(--ink-0); letter-spacing: -0.01em; }
  .cl-detail-sub { font-size: 10px; color: var(--accent); letter-spacing: 0.1em; margin-top: 4px; }
  .cl-detail-tagline {
    font-size: 12px; color: var(--ink-1); font-style: italic;
    padding-bottom: 12px; border-bottom: 1px solid var(--line);
  }
  .cl-detail-icon { display: flex; justify-content: center; padding: 4px 0; }
  .cl-detail-icon svg { width: 150px; height: 100px; }
  .cl-detail-desc { font-size: 12.5px; color: var(--ink-1); line-height: 1.75; margin: 0; }
  .cl-detail-features { display: flex; flex-direction: column; gap: 5px; }
  .cl-features-label {
    font-size: 9px; letter-spacing: 0.12em; color: var(--ink-2);
    font-weight: 600; margin-bottom: 4px; text-transform: uppercase;
  }
  .cl-feature-item { font-size: 11px; color: var(--ink-0); line-height: 1.6; padding-left: 2px; }
  .terminal-action.ta-candle { color: var(--up); border-color: rgba(46,230,160,0.3); }
  .cl-diff-tabs { display: flex; gap: 6px; }
  .cl-diff-tab {
    padding: 5px 14px; border-radius: 5px; font-size: 10px; font-weight: 700;
    border: 1px solid var(--line); background: transparent; color: var(--ink-2);
    cursor: pointer; font-family: inherit; letter-spacing: 0.07em;
    transition: all 0.15s;
  }
  .cl-diff-tab:hover { border-color: var(--accent); color: var(--accent); }
  .cl-diff-tab.active.begin { border-color: var(--up);   color: var(--up);   background: rgba(46,230,160,0.09); }
  .cl-diff-tab.active.mid   { border-color: var(--gold); color: var(--gold); background: rgba(255,216,77,0.09); }
  .cl-diff-tab.active.adv   { border-color: var(--down); color: var(--down); background: rgba(255,77,109,0.09); }
  .cl-detail-divider { height: 1px; background: var(--line); flex-shrink: 0; }
  .view-grid {
    height: calc(100% - 34px);
    display: grid;
    grid-template-columns: 160px minmax(0, 1fr);
    gap: 12px;
    margin-top: 12px;
  }
  .news-tabs {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .news-tab {
    border: 1px solid rgba(120, 160, 255, 0.16);
    background: rgba(255, 255, 255, 0.04);
    color: var(--ink-1);
    border-radius: 5px;
    padding: 9px 10px;
    font-family: 'JetBrains Mono', monospace;
    text-align: left;
    cursor: pointer;
  }
  .news-tab.active {
    color: var(--ink-0);
    border-color: rgba(106, 216, 255, 0.55);
    background: rgba(106, 216, 255, 0.14);
  }
  .news-content {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    align-content: start;
    overflow: auto;
  }
  .news-card {
    border: 1px solid rgba(120, 160, 255, 0.12);
    border-radius: 7px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.045);
  }
  .news-card b {
    display: block;
    color: var(--ink-0);
    margin-bottom: 7px;
  }
  .news-card p {
    margin: 0;
    color: var(--ink-1);
    font-size: 12px;
    line-height: 1.5;
  }
  .news-rail {
    flex: 1 1 auto;
    min-height: 0;
  }
  .news-rail-list {
    display: flex;
    flex-direction: column;
    gap: 9px;
    overflow-y: auto;
    min-height: 0;
    padding-right: 3px;
  }
  .rail-news-card {
    display: grid;
    grid-template-columns: 58px minmax(0, 1fr);
    gap: 10px;
    align-items: start;
    border: 1px solid rgba(120, 160, 255, 0.13);
    border-radius: 7px;
    padding: 8px;
    background: rgba(255, 255, 255, 0.04);
    cursor: pointer;
  }
  .rail-news-card:hover {
    border-color: rgba(106, 216, 255, 0.4);
    background: rgba(106, 216, 255, 0.08);
  }
  .rail-thumb {
    width: 58px;
    aspect-ratio: 1 / 1;
    border-radius: 6px;
    display: grid;
    place-items: center;
    color: var(--ink-0);
    font: 700 10px 'JetBrains Mono', monospace;
    letter-spacing: 0.08em;
    background:
      linear-gradient(135deg, rgba(106,216,255,0.65), rgba(255,77,255,0.24)),
      radial-gradient(circle at 70% 20%, rgba(255,216,77,0.5), transparent 42%);
    border: 1px solid rgba(255,255,255,0.14);
  }
  .rail-news-title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: var(--ink-0);
    font-size: 11px;
    line-height: 1.35;
  }
  .rail-news-meta {
    margin-top: 5px;
    color: var(--ink-2);
    font: 9px 'JetBrains Mono', monospace;
    letter-spacing: 0.06em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .rail-news-summary {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: 5px;
    color: var(--ink-1);
    font-size: 10px;
    line-height: 1.35;
  }
  .login-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 14px;
    margin-top: 12px;
  }
  .form-card {
    border: 1px solid rgba(120, 160, 255, 0.14);
    border-radius: 7px;
    padding: 14px;
    background: rgba(255, 255, 255, 0.045);
  }
  .form-card label {
    display: block;
    color: var(--ink-2);
    font-size: 10px;
    letter-spacing: 0.12em;
    margin: 10px 0 4px;
  }
  .form-card input {
    width: 100%;
    border: 1px solid rgba(120, 160, 255, 0.18);
    border-radius: 5px;
    background: rgba(2, 6, 16, 0.8);
    color: var(--ink-0);
    padding: 9px 10px;
  }
  .candles-svg, .mini-svg, .heat-svg { display: block; width: 100%; height: 100%; }
  .combined-frame {
    width: 100%;
    height: 100%;
    justify-self: center;
    padding: 12px 14px 10px;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .combined-frame .panel-header {
    gap: 10px;
    margin-bottom: 3px;
    font-size: 10px;
    letter-spacing: 0.1em;
    overflow: hidden;
  }
  .combined-frame .panel-header span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .index-detail {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 150px;
    gap: 10px;
    align-items: stretch;
    border: 1px solid rgba(106, 216, 255, 0.14);
    border-radius: 7px;
    padding: 9px 10px;
    margin-bottom: 8px;
    background: linear-gradient(135deg, rgba(106, 216, 255, 0.075), rgba(160, 124, 255, 0.04));
  }
  .index-kicker {
    display: block;
    color: var(--accent);
    font: 700 9px 'JetBrains Mono', monospace;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 3px;
  }
  .index-detail h2 {
    margin: 0 0 5px;
    color: var(--ink-0);
    font: 800 18px 'JetBrains Mono', monospace;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .index-detail p {
    margin: 0;
    color: var(--ink-1);
    font-size: 11px;
    line-height: 1.45;
  }
  .index-stat {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-left: 1px solid rgba(120, 160, 255, 0.14);
    padding-left: 10px;
    font-family: 'JetBrains Mono', monospace;
    min-width: 0;
  }
  .index-stat span {
    color: var(--ink-2);
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  .index-stat b {
    color: var(--ink-0);
    font-size: 16px;
    margin-top: 4px;
    font-variant-numeric: tabular-nums;
  }
  .index-companies {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 6px;
    max-height: 102px;
    overflow: auto;
    padding-right: 3px;
    margin-bottom: 8px;
  }
  .index-company {
    display: grid;
    grid-template-columns: 42px minmax(0, 1fr) 54px;
    gap: 7px;
    align-items: center;
    min-width: 0;
    border: 1px solid rgba(120, 160, 255, 0.12);
    border-radius: 5px;
    padding: 5px 7px;
    background: rgba(255, 255, 255, 0.035);
    font-family: 'JetBrains Mono', monospace;
  }
  .index-company .ticker {
    color: var(--ink-0);
    font-size: 10px;
    font-weight: 800;
  }
  .index-company .company-name {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--ink-1);
    font-size: 9px;
  }
  .index-company .company-change {
    text-align: right;
    font-size: 10px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .index-company.up .company-change { color: var(--up); }
  .index-company.down .company-change { color: var(--down); }
  .combo-body {
    flex: 1;
    display: grid;
    grid-template-rows: 3fr 1fr 1fr;
    gap: 6px;
    min-height: 0;
  }
  .combo-cell {
    display: flex;
    flex-direction: column;
    min-height: 0;
    border-top: 1px dashed rgba(120, 160, 255, 0.1);
    padding-top: 2px;
  }
  .combo-cell.main { border-top: 0; padding-top: 0; }
  .combo-cell svg { flex: 1; min-height: 0; width: 100%; }
  .mini-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-2);
    display: flex;
    justify-content: space-between;
    margin-bottom: 1px;
  }
  .mini-label b { color: var(--ink-0); font-weight: 500; }
  .mini-label .swatches { display: inline-flex; gap: 8px; }
  .mini-label .swatches em {
    font-style: normal;
    color: var(--ink-2);
    display: inline-flex; align-items: center; gap: 4px;
  }
  .mini-label .swatches em::before {
    content: "";
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--sw, var(--accent));
  }

  /* ---------- HEATMAP ---------- */
  .heat-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3px;
    flex: 1;
    min-height: 0;
  }
  .heat-cell {
    border-radius: 4px;
    padding: 6px 7px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: 'JetBrains Mono', monospace;
    color: rgba(255,255,255,0.92);
    min-height: 0;
    position: relative;
    overflow: hidden;
  }
  .heat-cell::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.06), transparent 60%);
    pointer-events: none;
  }
  .heat-cell .sym { font-size: 10px; font-weight: 700; letter-spacing: 0.05em; }
  .heat-cell .pct { font-size: 10px; opacity: 0.88; }

  /* ---------- GLOBAL INDICES TOGGLE + FLYOUT ---------- */
  .gi-toggle-btn {
    appearance: none;
    background: transparent;
    border: 1px solid rgba(106, 216, 255, 0.22);
    color: var(--ink-0);
    font: 600 10px 'JetBrains Mono', monospace;
    letter-spacing: 0.16em;
    padding: 2px 8px;
    border-radius: 4px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    text-transform: uppercase;
    transition: background .15s, border-color .15s;
  }
  .gi-toggle-btn:hover { background: rgba(106, 216, 255, 0.1); border-color: rgba(106, 216, 255, 0.45); }
  .gi-toggle-btn.open  { background: rgba(106, 216, 255, 0.14); border-color: rgba(106, 216, 255, 0.55); }
  .gi-region-indicator {
    color: var(--accent);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.12em;
    padding-left: 6px;
    border-left: 1px solid rgba(106, 216, 255, 0.28);
  }
  .gi-flyout {
    position: absolute;
    left: calc(100% + 10px);
    top: 0;
    z-index: 60;
    background: linear-gradient(160deg, rgba(10,16,34,0.97) 0%, rgba(5,8,18,0.97) 100%);
    border: 1px solid rgba(106, 216, 255, 0.28);
    border-radius: 8px;
    padding: 10px 8px;
    min-width: 72px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    box-shadow: 0 12px 36px rgba(0,0,0,0.65), 0 0 18px rgba(106,216,255,0.07);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    animation: flyout-in .14s ease-out;
  }
  .gi-flyout[hidden] { display: none; }
  .gi-flyout-title {
    font: 500 8px 'JetBrains Mono', monospace;
    letter-spacing: 0.2em;
    color: var(--ink-2);
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 3px;
  }
  .gi-flyout .rg-chip { text-align: center; width: 100%; padding: 5px 6px; }
  @keyframes flyout-in {
    from { opacity: 0; transform: translateX(-5px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  /* ---------- MARKET TIME ZONE SELECTOR (header center) ---------- */
  .market-zones {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1px;
    position: relative;
  }
  .mz-btn {
    appearance: none;
    background: transparent;
    border: 1px solid transparent;
    color: var(--ink-2);
    font: 600 9px 'JetBrains Mono', monospace;
    letter-spacing: 0.1em;
    padding: 4px 8px;
    border-radius: 3px;
    cursor: pointer;
    transition: background .12s, color .12s, border-color .12s;
    text-transform: uppercase;
  }
  .mz-btn:hover { background: rgba(120,160,255,0.1); color: var(--ink-1); border-color: rgba(120,160,255,0.18); }
  .mz-btn.selected { background: rgba(106,216,255,0.1); border-color: rgba(106,216,255,0.38); color: var(--ink-0); }
  .mz-btn.is-open::before,
  .mz-btn.is-pre::before,
  .mz-btn.is-after::before,
  .mz-btn.is-closed::before {
    content: '';
    display: inline-block;
    width: 5px; height: 5px;
    border-radius: 50%;
    margin-right: 4px;
    vertical-align: middle;
    flex-shrink: 0;
  }
  .mz-btn.is-open::before   { background: var(--up);   box-shadow: 0 0 6px var(--up); }
  .mz-btn.is-pre::before    { background: var(--gold);  box-shadow: 0 0 5px var(--gold); }
  .mz-btn.is-after::before  { background: var(--gold);  box-shadow: 0 0 5px var(--gold); }
  .mz-btn.is-closed::before { background: var(--down);  opacity: 0.55; }
  .mz-btn.selected.is-open   { border-color: rgba(46,230,160,0.45); }
  .mz-btn.selected.is-pre    { border-color: rgba(255,216,77,0.45); }
  .mz-btn.selected.is-after  { border-color: rgba(255,216,77,0.45); }
  .mz-btn.selected.is-closed { border-color: rgba(255,77,109,0.45); }
  .mz-divider { width: 1px; height: 12px; background: rgba(120,160,255,0.15); margin: 0 3px; flex-shrink: 0; }
  .mz-popover {
    position: absolute;
    top: calc(100% + 10px);
    transform: translateX(-50%);
    z-index: 200;
    background: linear-gradient(160deg, rgba(10,16,34,0.97), rgba(5,8,18,0.97));
    border: 1px solid rgba(106,216,255,0.28);
    border-radius: 8px;
    padding: 12px 16px;
    min-width: 158px;
    text-align: center;
    box-shadow: 0 8px 32px rgba(0,0,0,0.65), 0 0 20px rgba(106,216,255,0.07);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    animation: mz-drop .16s ease-out;
    pointer-events: none;
  }
  .mz-popover[hidden] { display: none; }
  @keyframes mz-drop {
    from { opacity: 0; transform: translateX(-50%) translateY(-4px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  .mz-pop-city  { font: 600 8px 'JetBrains Mono',monospace; letter-spacing:.22em; color:var(--ink-2); margin-bottom:5px; }
  .mz-pop-time  { font: 700 20px 'JetBrains Mono',monospace; color:var(--ink-0); letter-spacing:.04em; font-variant-numeric:tabular-nums; margin:2px 0 3px; }
  .mz-pop-hours { font: 500 8px 'JetBrains Mono',monospace; color:var(--ink-3); letter-spacing:.12em; margin-bottom:8px; }
  .mz-pop-status { font: 700 9px 'JetBrains Mono',monospace; letter-spacing:.2em; padding:3px 10px; border-radius:4px; display:inline-block; text-transform:uppercase; }
  .mz-pop-status.live  { color:var(--up);   background:rgba(46,230,160,0.1);  border:1px solid rgba(46,230,160,0.28); }
  .mz-pop-status.off   { color:var(--down); background:rgba(255,77,109,0.1);  border:1px solid rgba(255,77,109,0.28); }
  .mz-pop-status.pre   { color:var(--gold); background:rgba(255,216,77,0.1);  border:1px solid rgba(255,216,77,0.28); }
  .mz-pop-status.after { color:var(--gold); background:rgba(255,216,77,0.1);  border:1px solid rgba(255,216,77,0.28); }

  /* clickable text & cells */
  .region-chips { display: inline-flex; gap: 4px; margin-left: 6px; }
  .rg-chip {
    appearance: none;
    background: rgba(120, 160, 255, 0.08);
    border: 1px solid rgba(120, 160, 255, 0.15);
    color: var(--ink-1);
    font: 600 10px 'JetBrains Mono', monospace;
    letter-spacing: 0.14em;
    padding: 2px 6px;
    border-radius: 3px;
    cursor: pointer;
    transition: background .15s, color .15s, border-color .15s;
  }
  .rg-chip:hover { background: rgba(120, 160, 255, 0.2); color: var(--ink-0); }
  .rg-chip.active {
    background: var(--accent);
    color: #03050a;
    border-color: var(--accent);
    box-shadow: 0 0 10px rgba(106, 216, 255, 0.45);
  }
  .heat-cell { cursor: pointer; transition: transform .12s, filter .12s; }
  .heat-cell:hover { transform: scale(1.03); filter: brightness(1.2); }
  .heat-cell.active {
    outline: 1.5px solid #fff;
    outline-offset: -2px;
    filter: brightness(1.4);
  }

  /* clickable globe city tags */
  .city .mk-tag-bg,
  .city .mk-city,
  .city .mk-indices { cursor: pointer; transition: filter .12s; }
  .city:hover .mk-tag-bg { filter: brightness(1.4); }
  .city:hover .mk-city { filter: brightness(1.4); }
  .city.active .mk-tag-bg {
    fill: rgba(106, 216, 255, 0.25);
    stroke-width: 1.4;
  }
  .city.active .mk-dot { r: 4; }

  /* a small toast under the chart header to confirm clicks */
  .toast {
    position: fixed;
    left: 50%;
    bottom: 60px;
    transform: translateX(-50%);
    background: rgba(8, 14, 30, 0.95);
    border: 1px solid var(--accent);
    color: var(--ink-0);
    padding: 6px 12px;
    border-radius: 6px;
    font: 11px 'JetBrains Mono', monospace;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    pointer-events: none;
    opacity: 0;
    transition: opacity .25s;
    z-index: 100;
  }
  .toast.show { opacity: 1; }
  .sphere {
    fill: url(#oceanGrad);
    stroke: rgba(106, 216, 255, 0.45);
    stroke-width: 0.6;
  }
  .graticule {
    fill: none;
    stroke: rgba(106, 216, 255, 0.18);
    stroke-width: 0.4;
  }
  .country {
    fill: rgba(60, 90, 160, 0.18);
    stroke: rgba(140, 200, 255, 0.55);
    stroke-width: 0.45;
    stroke-linejoin: round;
  }
  .country.hi {
    fill: rgba(106, 216, 255, 0.30);
    stroke: rgba(180, 230, 255, 0.95);
    stroke-width: 0.7;
    filter: drop-shadow(0 0 4px rgba(106, 216, 255, 0.65));
    cursor: pointer;
    transition: fill .15s, filter .15s;
  }
  .country.hi:hover {
    fill: rgba(106, 216, 255, 0.55);
    filter: drop-shadow(0 0 10px rgba(106, 216, 255, 1));
  }
  .country.hi.active {
    fill: rgba(255, 216, 77, 0.65);
    stroke: #ffd84d;
    filter: drop-shadow(0 0 12px rgba(255, 216, 77, 0.9));
  }

  /* ---------- MARKET MARKERS ---------- */
  .mk-pulse {
    fill: none;
    stroke: var(--c, var(--accent));
    stroke-width: 1;
  }
  .mk-dot {
    fill: var(--c, var(--accent));
    filter: drop-shadow(0 0 5px var(--c, var(--accent)));
  }
  .mk-beam {
    stroke: var(--c, var(--accent));
    stroke-width: 1;
    stroke-linecap: round;
  }
  .mk-city {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.14em;
    fill: var(--c, var(--accent));
    paint-order: stroke;
    stroke: rgba(5, 7, 13, 0.9);
    stroke-width: 3;
    stroke-linejoin: round;
  }
  .mk-indices {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8.5px;
    font-weight: 600;
    letter-spacing: 0.04em;
    fill: var(--ink-0);
    paint-order: stroke;
    stroke: rgba(5, 7, 13, 0.9);
    stroke-width: 3;
    stroke-linejoin: round;
  }
  .mk-tag-bg {
    fill: rgba(8, 14, 30, 0.78);
    stroke: var(--c, var(--accent));
    stroke-width: 0.6;
  }
  g.city {
    cursor: pointer;
  }
  g.city:hover .mk-dot {
    filter: drop-shadow(0 0 10px var(--c, var(--accent)));
  }
  g.city:hover .mk-tag-bg {
    fill: rgba(20, 32, 58, 0.94);
    stroke-width: 1;
  }
</style>
</head>

<body data-screen-label="KOSMO JOE FIN · full terminal">

  <template id="__bundler_thumbnail" data-bg-color="#05070d">
    <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stop-color="#0d1530"/>
          <stop offset="100%" stop-color="#03050a"/>
        </radialGradient>
        <radialGradient id="og" cx="35%" cy="35%" r="75%">
          <stop offset="0%" stop-color="#1c2c52"/>
          <stop offset="100%" stop-color="#03060f"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#bgg)"/>
      <g transform="translate(600 400)">
        <circle r="320" fill="none" stroke="#6ad8ff" stroke-opacity="0.6" stroke-width="3" stroke-dasharray="4 22"/>
        <circle r="290" fill="none" stroke="#ffd84d" stroke-opacity="0.5" stroke-width="3" stroke-dasharray="50 200 30 220"/>
        <circle r="260" fill="none" stroke="#ff4dff" stroke-opacity="0.5" stroke-width="2" stroke-dasharray="2 22"/>
        <circle r="220" fill="url(#og)" stroke="#6ad8ff" stroke-opacity="0.7" stroke-width="2"/>
        <g fill="rgba(106,216,255,0.35)" stroke="rgba(180,230,255,0.9)" stroke-width="1.2">
          <path d="M -180 -40 Q -120 -90 -60 -50 Q -20 0 -90 30 Q -160 20 -180 -40 Z"/>
          <path d="M -10 -70 Q 60 -100 130 -40 Q 170 30 80 50 Q -10 30 -10 -70 Z"/>
          <path d="M 60 80 Q 130 60 170 110 Q 150 160 80 150 Z"/>
        </g>
        <g font-family="monospace" font-size="22" fill="#6ad8ff" text-anchor="middle">
          <text y="-260">NIKKEI · NASDAQ · KOSPI · ASX · HSI · CSI 300</text>
          <text y="280" fill="#e9efff" font-size="28">SYNCING GLOBAL MARKETS</text>
        </g>
      </g>
    </svg>
  </template>

  <div class="stage">

    <!-- ========== CHROME ========== -->
    <div class="chrome">
      <div class="brand">
        <button type="button" class="menu-toggle" id="app-menu-toggle" aria-label="Open project menu" aria-controls="app-drawer" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <span class="dot"></span>
        <span>ATLAS · GLOBAL MARKETS TERMINAL · v2</span>
      </div>

      <!-- ■ Market Time Zone Selector (center) -->
      <div class="market-zones" id="market-zones">
        <!-- buttons injected by JS -->
        <div id="mz-popover" class="mz-popover" hidden>
          <div class="mz-pop-city"  id="mz-pop-city">NEW YORK</div>
          <div class="mz-pop-time"  id="mz-pop-time">00:00:00</div>
          <div class="mz-pop-hours" id="mz-pop-hours">09:30 – 16:00 LOCAL</div>
          <div id="mz-pop-status"   class="mz-pop-status live">● OPEN</div>
        </div>
      </div>

      <div class="right-cluster">
        <span>FEED <b id="feed-status" style="color:var(--up)">LIVE</b></span>
        <button type="button" class="terminal-action" data-mode="chartlib">CHART</button>
        <button type="button" class="terminal-action ta-candle" data-mode="chart">CANDLE</button>
        <button type="button" class="terminal-action" data-mode="news">NEWS</button>
        <button type="button" class="terminal-action" data-mode="login">LOGIN</button>
        <span>EXCHANGES <b>26 / 26</b></span>
        <span>NODES <b>34 / 34</b></span>
        <span>LATENCY <b id="latency">14 MS</b></span>
      </div>
    </div>

    <!-- ========== LEFT COLUMN ========== -->
    <div class="left">
      <!-- Region flyout (positioned outside panel to avoid overflow:hidden clip) -->
      <div id="region-chips" class="gi-flyout" hidden>
        <div class="gi-flyout-title">REGION</div>
        <button type="button" class="rg-chip active" data-region="ALL">ALL</button>
        <button type="button" class="rg-chip" data-region="US">US</button>
        <button type="button" class="rg-chip" data-region="JP">JP</button>
        <button type="button" class="rg-chip" data-region="KR">KR</button>
        <button type="button" class="rg-chip" data-region="CN">CN</button>
        <button type="button" class="rg-chip" data-region="HK">HK</button>
        <button type="button" class="rg-chip" data-region="AU">AU</button>
      </div>

      <div class="panel" style="flex: 2.2; min-height: 0;">
        <div class="panel-header">
          <button type="button" id="gi-btn" class="gi-toggle-btn">
            <b>GLOBAL INDICES</b>
            <span id="gi-region-indicator" class="gi-region-indicator">ALL</span>
          </button>
          <span id="indices-status" style="font-size:8px;color:var(--ink-2)">CONNECTING</span>
        </div>
        <div class="scroll" id="watchlist"></div>
      </div>
      <!-- FX & Commodities flyout (positioned by JS) -->
      <div id="fx-flyout" class="gi-flyout" hidden>
        <div class="gi-flyout-title">CATEGORY</div>
        <button type="button" class="rg-chip active" data-fxcat="FX">FX</button>
        <button type="button" class="rg-chip" data-fxcat="ENERGY">ENERGY</button>
        <button type="button" class="rg-chip" data-fxcat="METALS">METALS</button>
        <button type="button" class="rg-chip" data-fxcat="SOFT">SOFT</button>
      </div>

      <div class="panel" style="flex: 1; min-height: 0;">
        <div class="panel-header">
          <button type="button" id="fx-btn" class="gi-toggle-btn">
            <b>FX &amp; COMMOD</b>
            <span id="fx-cat-indicator" class="gi-region-indicator">FX</span>
          </button>
          <span id="usd-index" style="color:var(--gold);font-size:9px">USD IDX 104.32</span>
        </div>
        <div class="scroll" id="fx-list"></div>
      </div>
    </div>

    <!-- ========== CENTER ========== -->
    <div class="center">
      <!-- Globe -->
      <div class="globe-area">
        <div class="globe-stage" data-screen-label="Globe · 350×350">
          <!-- Whirl -->
          <svg class="whirl" viewBox="0 0 540 540">
            <defs>
              <linearGradient id="whirlGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#6ad8ff" stop-opacity="0.9"/>
                <stop offset="50%" stop-color="#a07cff" stop-opacity="0.5"/>
                <stop offset="100%" stop-color="#ff4dff" stop-opacity="0"/>
              </linearGradient>
              <linearGradient id="whirlGrad2" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#ffd84d" stop-opacity="0.8"/>
                <stop offset="100%" stop-color="#2ee6a0" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <circle cx="270" cy="270" r="266" fill="none" stroke="rgba(106,216,255,0.045)" stroke-width="14"/>

            <g id="ring1">
              <circle cx="270" cy="270" r="266" fill="none"
                      stroke="url(#whirlGrad)" stroke-width="1.6"
                      stroke-dasharray="2 11" stroke-linecap="round"/>
            </g>
            <g id="ring2">
              <circle cx="270" cy="270" r="258" fill="none"
                      stroke="url(#whirlGrad2)" stroke-width="2.2"
                      stroke-dasharray="80 320 40 360" stroke-linecap="round" opacity="0.85"/>
            </g>
            <g id="ring3">
              <circle cx="270" cy="270" r="250" fill="none"
                      stroke="rgba(255,77,255,0.65)" stroke-width="1"
                      stroke-dasharray="1 18"/>
            </g>
            <g id="ring4">
              <circle cx="270" cy="270" r="240" fill="none"
                      stroke="rgba(46,230,160,0.4)" stroke-width="3"
                      stroke-dasharray="1 44"/>
            </g>
            <g id="ring5">
              <circle cx="270" cy="270" r="230" fill="none"
                      stroke="rgba(255,216,77,0.5)" stroke-width="1"
                      stroke-dasharray="22 10 4 10"/>
            </g>

            <!-- corner brackets -->
            <g stroke="rgba(106,216,255,0.45)" stroke-width="1.2" fill="none">
              <path d="M 30 80 L 30 30 L 80 30"/>
              <path d="M 460 30 L 510 30 L 510 80"/>
              <path d="M 510 460 L 510 510 L 460 510"/>
              <path d="M 80 510 L 30 510 L 30 460"/>
            </g>

            <!-- ticks -->
            <g id="ticks"></g>
          </svg>

          <!-- Globe SVG -->
          <svg class="globe-svg" id="globe" viewBox="0 0 350 350">
            <defs>
              <radialGradient id="oceanGrad" cx="35%" cy="35%" r="75%">
                <stop offset="0%" stop-color="#1c2c52" stop-opacity="0.55"/>
                <stop offset="60%" stop-color="#0b1428" stop-opacity="0.55"/>
                <stop offset="100%" stop-color="#03060f" stop-opacity="0.7"/>
              </radialGradient>
              <radialGradient id="atm" cx="50%" cy="50%" r="50%">
                <stop offset="85%" stop-color="rgba(106,216,255,0)" stop-opacity="0"/>
                <stop offset="100%" stop-color="rgba(106,216,255,0.45)" stop-opacity="1"/>
              </radialGradient>
              <clipPath id="globeClip">
                <circle cx="175" cy="175" r="160"/>
              </clipPath>
            </defs>
            <circle cx="175" cy="175" r="170" fill="url(#atm)"/>
            <g clip-path="url(#globeClip)">
              <circle class="sphere" cx="175" cy="175" r="160"/>
              <path class="graticule" id="graticule"/>
              <g id="countries"></g>
            </g>
            <circle cx="175" cy="175" r="160" fill="none" stroke="rgba(106,216,255,0.55)" stroke-width="0.8"/>
            <ellipse cx="130" cy="130" rx="55" ry="38" fill="rgba(255,255,255,0.06)"/>
          </svg>

          <!-- Markers overlay -->
          <svg class="market-layer" id="markets" viewBox="0 0 540 540"></svg>

          <!-- Caption -->
          <div class="caption">
            <span class="big">Syncing global markets…</span>
            <span id="phase">Establishing handshake · 26 exchanges · 11 timezones</span>
            <div class="progress"></div>
          </div>
        </div>
      </div>

      <!-- Logos marquee -->
      <div class="panel logos-panel">
        <div class="logos-stack">
          <div class="logos-marquee row-1" id="logos"></div>
          <div class="logos-marquee row-2" id="logos-row-2"></div>
          <div class="logos-marquee row-3" id="logos-row-3"></div>
        </div>
      </div>

      <!-- Combined chart + indicators frame -->
      <div class="chart-overlay" id="chart-overlay" aria-hidden="true">
      <div class="panel combined-frame">
        <div class="panel-header">
          <span id="chart-title"><b>NIKKEI 225</b> · TYO · 1m · CANDLES · BBANDS · VOLUME</span>
          <span id="ohlc-readout">O 38,412.18  H 38,488.02  L 38,355.40  C 38,461.55</span>
          <button type="button" class="terminal-action" data-mode="globe">GLOBE</button>
        </div>
        <div class="index-detail">
          <div>
            <span class="index-kicker" id="index-region">JP MARKET · TOKYO</span>
            <h2 id="index-name">NIKKEI 225</h2>
            <p id="index-summary">Tokyo Stock Exchange 대표 대형주 225개로 일본 경기와 수출기업 흐름을 빠르게 보는 핵심 지수입니다.</p>
          </div>
          <div class="index-stat">
            <span>LIVE VALUE</span>
            <b id="index-live-value">38,461.55</b>
          </div>
        </div>
        <div class="index-companies" id="index-company-list"></div>
        <div class="combo-body">
          <div class="combo-cell main">
            <svg id="candles" viewBox="0 0 700 140" preserveAspectRatio="none"></svg>
          </div>
          <div class="combo-cell">
            <div class="mini-label">
              <span>RSI · 14 <span class="swatches"><em style="--sw:#a07cff">RSI</em></span></span>
              <b id="rsi-val">61.4</b>
            </div>
            <svg id="rsi" viewBox="0 0 700 30" preserveAspectRatio="none"></svg>
          </div>
          <div class="combo-cell">
            <div class="mini-label">
              <span>MACD · 12 / 26 / 9 <span class="swatches"><em style="--sw:#6ad8ff">MACD</em><em style="--sw:#ffd84d">SIG</em></span></span>
              <b id="macd-val">+12.4</b>
            </div>
            <svg id="macd" viewBox="0 0 700 30" preserveAspectRatio="none"></svg>
          </div>
        </div>
      </div>
      <div class="chart-side">
        <div class="panel" style="flex: 1.15;">
          <div class="panel-header">
            <span><b>TOP MOVERS</b> · <span id="movers-region">GLOBAL</span></span>
            <span style="color:var(--up)">LIVE</span>
          </div>
          <div class="scroll" id="movers"></div>
        </div>
        <div class="panel" style="flex: 0.85;">
          <div class="panel-header">
            <span><b>SECTOR HEATMAP</b> · <span id="heat-index-label">S&amp;P 500</span></span>
            <span>CLICK</span>
          </div>
          <div class="heat-grid" id="heat"></div>
        </div>
      </div>
      </div>

      <div class="view-overlay news-view" id="news-view" aria-hidden="true">
        <div class="panel-header">
          <span><b>NEWS INTELLIGENCE</b> · 시사 / 경제 / 정치 / AI</span>
          <button type="button" class="terminal-action" data-mode="globe">GLOBE</button>
        </div>
        <div class="view-grid">
          <div class="news-tabs" id="news-tabs">
            <button type="button" class="news-tab active" data-news="current">시사상식</button>
            <button type="button" class="news-tab" data-news="economy">경제</button>
            <button type="button" class="news-tab" data-news="politics">정치</button>
            <button type="button" class="news-tab" data-news="tech">IT/AI</button>
            <button type="button" class="news-tab" data-news="market">증시</button>
          </div>
          <div class="news-content" id="news-content"></div>
        </div>
      </div>

      <div class="view-overlay login-view" id="login-view" aria-hidden="true">
        <div class="panel-header">
          <span><b>MEMBER CENTER</b> · 로그인 / 회원관리 MVP</span>
          <button type="button" class="terminal-action" data-mode="globe">GLOBE</button>
        </div>
        <div class="login-grid">
          <div class="form-card">
            <div class="panel-header"><span><b>LOGIN</b></span><span>SESSION</span></div>
            <label for="login-email">EMAIL</label>
            <input id="login-email" type="email" placeholder="member@kosmo.fin">
            <label for="login-password">PASSWORD</label>
            <input id="login-password" type="password" placeholder="password">
            <button type="button" class="terminal-action" id="login-submit" style="margin-top:12px;width:100%">LOGIN</button>
            <p id="member-status" style="color:var(--ink-1);font-size:12px;line-height:1.5;margin:10px 0 0">로그인 대기중</p>
          </div>
          <div class="form-card">
            <div class="panel-header"><span><b>MEMBER OPS</b></span><span>ADMIN READY</span></div>
            <p style="color:var(--ink-1);font-size:12px;line-height:1.6;margin:0">
              회원가입, 등급 관리, 관심종목 저장, 프리미엄 기능 제한을 붙일 자리입니다.
              다음 단계에서는 Spring Controller + H2 테이블 + 세션 로그인으로 연결합니다.
            </p>
            <label for="register-name">DISPLAY NAME</label>
            <input id="register-name" type="text" placeholder="홍길동">
            <button type="button" class="terminal-action" id="register-submit" style="margin-top:12px">회원가입</button>
            <button type="button" class="terminal-action" id="members-refresh" style="margin-top:12px">회원 목록 새로고침</button>
            <div id="member-list" style="margin-top:12px;color:var(--ink-1);font-size:12px;line-height:1.6"></div>
          </div>
        </div>
      </div>

      <!-- Chart Academy overlay -->
      <div class="chartlib-overlay" id="chartlib-overlay" aria-hidden="true">
        <div class="cl-header">
          <span class="cl-header-title"><b>CHART ACADEMY</b> · 차트 유형 학습 가이드 · 12 TYPES</span>
          <button type="button" class="terminal-action" data-mode="globe">GLOBE</button>
        </div>
        <div class="cl-body">
          <div class="cl-grid" id="cl-grid"></div>
          <div class="cl-detail" id="cl-detail"></div>
        </div>
      </div>
    </div>

    <!-- ========== RIGHT COLUMN ========== -->
    <div class="right">
      <div class="panel news-rail">
        <div class="panel-header">
          <span><b>LIVE MARKET NEWS</b></span>
          <span id="rail-news-status" style="color:var(--up)">RSS</span>
        </div>
        <div class="news-rail-list" id="rail-news-list"></div>
      </div>
    </div>

    <!-- ========== FOOTER ========== -->
    <div class="footer">
      <span>BUILD 26.05 · ATLAS-CORE</span>
      <span>26 EXCHANGES · 11 TIMEZONES · STREAMING TICK DATA</span>
      <span>© ATLAS TERMINAL</span>
    </div>

  </div>

  <div class="app-drawer-backdrop" id="app-drawer-backdrop"></div>
  <aside class="app-drawer" id="app-drawer" aria-hidden="true">
    <div class="drawer-head">
      <strong>Project Menu</strong>
      <button type="button" class="drawer-close" id="app-drawer-close" aria-label="Close project menu">&times;</button>
    </div>
    <nav class="drawer-links" aria-label="Project menu">
      <a class="drawer-link" href="/terminal">글로벌 터미널</a>
      <a class="drawer-link" href="/stocks">주식 검색</a>
      <a class="drawer-link" href="/etfs">ETF 검색</a>
      <a class="drawer-link" href="/members/plans">회원 권한</a>
      <a class="drawer-link" href="/watchlist">관심종목</a>
      <a class="drawer-link" href="/news?symbol=NVDA">뉴스 메모</a>
      <a class="drawer-link" href="/shadow-risk">지하경제 리스크</a>
      <a class="drawer-link" href="/h2-console">H2 콘솔</a>
    </nav>
  </aside>

  <div id="toast" class="toast"></div>
  <div id="tweaks-mount"></div>

  <script>
    (function () {
      const body = document.body;
      const openBtn = document.getElementById('app-menu-toggle');
      const closeBtn = document.getElementById('app-drawer-close');
      const backdrop = document.getElementById('app-drawer-backdrop');
      const drawer = document.getElementById('app-drawer');

      function setDrawer(open) {
        body.classList.toggle('drawer-open', open);
        openBtn.setAttribute('aria-expanded', String(open));
        drawer.setAttribute('aria-hidden', String(!open));
      }

      openBtn.addEventListener('click', function () {
        setDrawer(!body.classList.contains('drawer-open'));
      });
      closeBtn.addEventListener('click', function () {
        setDrawer(false);
      });
      backdrop.addEventListener('click', function () {
        setDrawer(false);
      });
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          setDrawer(false);
        }
      });
      drawer.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          setDrawer(false);
        });
      });
    })();
  </script>

  <!-- Flyout toggles (GLOBAL INDICES + FX & COMMODITIES) -->
  <script>
    (function () {
      // ── GLOBAL INDICES flyout ──
      const giBtn  = document.getElementById('gi-btn');
      const giFly  = document.getElementById('region-chips');
      giBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const opening = giFly.hidden;
        giFly.hidden = !opening;
        giBtn.classList.toggle('open', opening);
      });

      // ── FX & COMMODITIES flyout (dynamic top from button position) ──
      const fxBtn  = document.getElementById('fx-btn');
      const fxFly  = document.getElementById('fx-flyout');
      const leftCol = document.querySelector('.left');
      fxBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (fxFly.hidden) {
          const bRect = fxBtn.getBoundingClientRect();
          const lRect = leftCol.getBoundingClientRect();
          fxFly.style.top  = (bRect.top - lRect.top) + 'px';
          fxFly.style.bottom = 'auto';
        }
        fxFly.hidden = !fxFly.hidden;
        fxBtn.classList.toggle('open', !fxFly.hidden);
      });

      // ── close both on outside click ──
      document.addEventListener('click', function (e) {
        if (!giFly.hidden && !giFly.contains(e.target) && e.target !== giBtn) {
          giFly.hidden = true;
          giBtn.classList.remove('open');
        }
        if (!fxFly.hidden && !fxFly.contains(e.target) && e.target !== fxBtn) {
          fxFly.hidden = true;
          fxBtn.classList.remove('open');
        }
      });
    })();
  </script>

  <!-- libs -->
  <script src="https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/dist/topojson-client.min.js"></script>

  <!-- React (for Tweaks panel only) -->
  <script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>

  <script src="/fullstack/globe-scene-v2.js?v=2026052113"></script>
  <script type="text/babel" src="/fullstack/tweaks-panel.jsx?v=2026052102"></script>
  <script type="text/babel" src="/fullstack/tweaks-ui-v2.jsx?v=2026052102"></script>
</body>
</html>
