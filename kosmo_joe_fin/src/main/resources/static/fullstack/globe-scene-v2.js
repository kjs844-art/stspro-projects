/* Global Markets Loader v2 — full terminal version.
   - 350x350 globe in 540x540 stage
   - cities cluster multiple indices (KOSPI, KOSDAQ, Russell 3000, JASDAQ, SSE, SZSE, CSI 300, etc.)
   - more indicators (RSI, MACD, Stoch, ATR, ADX) + sector heatmap
   - company logos marquee
*/

(function () {
  'use strict';

  // ---------- TWEAKS ----------
  const TWEAKS = (window.__TWEAKS = window.__TWEAKS || {
    rotationSpeed: 9,
    showLabels: true,
    showWhirl: true,
    showGraticule: true,
    fillCountries: true,
    showLogos: true,
  });

  // ---------- CITIES with INDICES ----------
  const CITIES = [
    { id: 'NYC', name: 'NEW YORK',   lat: 40.71,  lon: -74.00, c: '#6ad8ff',
      indices: ['NASDAQ', 'S&P 500', 'DOW 30', 'NYSE'] },
    { id: 'SEA', name: 'SEATTLE',    lat: 47.61,  lon: -122.33, c: '#a07cff',
      indices: ['RUSSELL 3000', 'RUSSELL 2000'] },
    { id: 'TYO', name: 'TOKYO',      lat: 35.68,  lon: 139.69, c: '#ff4d6d',
      indices: ['NIKKEI 225', 'TOPIX', 'JASDAQ'] },
    { id: 'SEL', name: 'SEOUL',      lat: 37.57,  lon: 126.98, c: '#ff4dff',
      indices: ['KOSPI', 'KOSDAQ'] },
    { id: 'SHA', name: 'SHANGHAI',   lat: 31.23,  lon: 121.47, c: '#ff7d4d',
      indices: ['SSE COMP', 'STAR 50'] },
    { id: 'SZX', name: 'SHENZHEN',   lat: 22.54,  lon: 114.06, c: '#ffb84d',
      indices: ['SZSE COMP', 'CHINEXT', 'CSI 300'] },
    { id: 'HKG', name: 'HONG KONG',  lat: 22.32,  lon: 114.17, c: '#ffd84d',
      indices: ['HSI', 'HSCEI'] },
    { id: 'TPE', name: 'TAIPEI',     lat: 25.03,  lon: 121.56, c: '#4dffae',
      indices: ['TWSE', 'TPEX'] },
    { id: 'SYD', name: 'SYDNEY',     lat: -33.87, lon: 151.21, c: '#2ee6a0',
      indices: ['ASX 200', 'ALL ORDS'] },
    { id: 'LON', name: 'LONDON',     lat: 51.50,  lon: -0.13,  c: '#cfdcff',
      indices: ['FTSE 100', 'FTSE 250'] },
    { id: 'FRA', name: 'FRANKFURT',  lat: 50.11,  lon: 8.68,   c: '#ff9e4d',
      indices: ['DAX', 'MDAX'] },
    { id: 'PAR', name: 'PARIS',      lat: 48.85,  lon: 2.35,   c: '#9d7cff',
      indices: ['CAC 40'] },
    { id: 'BOM', name: 'MUMBAI',     lat: 19.08,  lon: 72.88,  c: '#a4ff4d',
      indices: ['SENSEX', 'NIFTY 50'] },
    { id: 'SGP', name: 'SINGAPORE',  lat: 1.35,   lon: 103.81, c: '#ff5d6d',
      indices: ['STI'] },
    { id: 'TOR', name: 'TORONTO',    lat: 43.65,  lon: -79.38, c: '#ff7d7d',
      indices: ['TSX'] },
    { id: 'SAO', name: 'SAO PAULO',  lat: -23.55, lon: -46.63, c: '#ffd84d',
      indices: ['BOVESPA'] },
  ];

  // Country IDs to highlight (host of any market in CITIES)
  const HIGHLIGHT_IDS = new Set([
    '840', // USA
    '392', // Japan
    '410', // South Korea
    '156', // China
    '344', // Hong Kong
    '158', // Taiwan
    '036', // Australia
    '826', // UK
    '276', // Germany
    '250', // France
    '356', // India
    '702', // Singapore
    '124', // Canada
    '076', // Brazil
  ]);

  // ---------- GLOBE ----------
  const projection = d3.geoOrthographic()
    .scale(160)
    .translate([175, 175])
    .clipAngle(90)
    .rotate([0, -12, 0]);
  const path = d3.geoPath(projection);
  const graticule = d3.geoGraticule10();

  // Marker coordinate transform: globe svg viewBox is 350x350 with center (175,175).
  // Markers svg viewBox is 540x540 with globe center at (270,270).
  // So marker_xy = projection_xy + (95, 95).
  const GLOBE_OFFSET = [95, 95];
  const GLOBE_CENTER = [270, 270];
  const GLOBE_R = 160;

  // ---------- WHIRL TICKS ----------
  (function buildTicks() {
    const g = document.getElementById('ticks');
    const cx = 270, cy = 270, r = 178;
    let svg = '';
    for (let i = 0; i < 72; i++) {
      const a = (i / 72) * Math.PI * 2;
      const long = (i % 6 === 0);
      const r1 = r;
      const r2 = r - (long ? 8 : 3);
      const x1 = cx + Math.cos(a) * r1;
      const y1 = cy + Math.sin(a) * r1;
      const x2 = cx + Math.cos(a) * r2;
      const y2 = cy + Math.sin(a) * r2;
      svg += `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="rgba(106,216,255,${long ? 0.55 : 0.22})" stroke-width="${long ? 1.2 : 0.7}"/>`;
    }
    g.innerHTML = svg;
  })();

  // ---------- LOAD WORLD ATLAS ----------
  const WORLD_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
  let countries = null;
  fetch(WORLD_URL)
    .then(r => r.json())
    .then(topo => {
      const fc = topojson.feature(topo, topo.objects.countries);
      countries = fc.features;
      drawCountries();
    })
    .catch(err => console.warn('World atlas failed:', err));

  // id -> { title, base, region, color } for each highlighted country
  const COUNTRY_INDEX = {
    '840': { title: 'S&P 500',    base: 6014.55,  region: 'US', color: '#6ad8ff' },
    '392': { title: 'NIKKEI 225', base: 38461.55, region: 'JP', color: '#ff4d6d' },
    '410': { title: 'KOSPI',      base: 2654.18,  region: 'KR', color: '#ff4dff' },
    '156': { title: 'CSI 300',    base: 3902.04,  region: 'CN', color: '#ffb84d' },
    '344': { title: 'HSI',        base: 19872.41, region: 'HK', color: '#ffd84d' },
    '158': { title: 'TWSE',       base: 22918.50, region: null, color: '#4dffae' },
    '036': { title: 'ASX 200',    base: 7892.10,  region: 'AU', color: '#2ee6a0' },
    '826': { title: 'FTSE 100',   base: 8458.10,  region: null, color: '#cfdcff' },
    '276': { title: 'DAX',        base: 19238.42, region: null, color: '#ff9e4d' },
    '250': { title: 'CAC 40',     base: 7541.30,  region: null, color: '#9d7cff' },
    '356': { title: 'SENSEX',     base: 81421.30, region: null, color: '#a4ff4d' },
    '702': { title: 'STI',        base: 3624.50,  region: null, color: '#ff5d6d' },
    '124': { title: 'TSX',        base: 25104.50, region: null, color: '#ff7d7d' },
    '076': { title: 'BOVESPA',    base: 132484,   region: null, color: '#ffd84d' },
  };
  const COUNTRY_NAME = {
    '840': 'USA', '392': 'JAPAN', '410': 'SOUTH KOREA', '156': 'CHINA',
    '344': 'HONG KONG', '158': 'TAIWAN', '036': 'AUSTRALIA', '826': 'UK',
    '276': 'GERMANY', '250': 'FRANCE', '356': 'INDIA', '702': 'SINGAPORE',
    '124': 'CANADA', '076': 'BRAZIL',
  };

  function drawCountries() {
    const g = d3.select('#countries');
    g.selectAll('path')
      .data(countries, d => d.id)
      .join('path')
      .attr('class', d => 'country' + (HIGHLIGHT_IDS.has(String(d.id).padStart(3, '0')) ? ' hi' : ''))
      .attr('d', path)
      .on('click', function (event, d) {
        const id = String(d.id).padStart(3, '0');
        const info = COUNTRY_INDEX[id];
        if (!info) return;
        event.stopPropagation();
        // visual: mark active
        g.selectAll('path').classed('active', false);
        d3.select(this).classed('active', true);
        // also highlight matching city marker
        d3.selectAll('g.city').classed('active', false);
        setChartContext({
          title: info.title,
          subtitle: (COUNTRY_NAME[id] || '') + ' · 1m',
          base: info.base,
          color: info.color,
          region: info.region,
        });
      });
  }

  // ---------- MARKERS ----------
  const mkSvg = d3.select('#markets');

  const cityG = mkSvg.selectAll('g.city')
    .data(CITIES, d => d.id)
    .join('g')
    .attr('class', 'city')
    .style('--c', d => d.c);

  cityG.append('circle').attr('class', 'mk-pulse').attr('r', 3);
  cityG.append('circle').attr('class', 'mk-dot').attr('r', 3);
  cityG.append('line').attr('class', 'mk-beam');
  cityG.append('rect').attr('class', 'mk-tag-bg').attr('rx', 3);
  cityG.append('text').attr('class', 'mk-city');
  cityG.append('text').attr('class', 'mk-indices');

  function projectCity(d) {
    const p3d = projection([d.lon, d.lat]);
    if (!p3d) return null;
    return [p3d[0] + GLOBE_OFFSET[0], p3d[1] + GLOBE_OFFSET[1]];
  }

  function updateMarkers() {
    cityG.each(function (d) {
      const node = d3.select(this);
      const p = projectCity(d);
      if (!p) { node.style('opacity', 0); return; }
      const dx = p[0] - GLOBE_CENTER[0];
      const dy = p[1] - GLOBE_CENTER[1];
      const r = Math.hypot(dx, dy);
      const vis = Math.max(0, Math.min(1, (GLOBE_R - r) / 22 + 0.4));
      node.style('opacity', vis);

      node.select('.mk-dot').attr('cx', p[0]).attr('cy', p[1]);
      node.select('.mk-pulse').attr('cx', p[0]).attr('cy', p[1]);

      // Beam outward
      const angle = Math.atan2(dy, dx);
      const beamLen = 28 + Math.min(28, d.indices.length * 6);
      const out = [p[0] + Math.cos(angle) * beamLen, p[1] + Math.sin(angle) * beamLen];
      node.select('.mk-beam')
        .attr('x1', p[0]).attr('y1', p[1])
        .attr('x2', out[0]).attr('y2', out[1])
        .attr('stroke-width', 1);

      const lbl = node.select('.mk-city');
      const idxText = node.select('.mk-indices');
      const bg = node.select('.mk-tag-bg');

      if (!TWEAKS.showLabels) {
        lbl.style('display', 'none');
        idxText.style('display', 'none');
        bg.style('display', 'none');
        return;
      }

      const rightSide = dx >= 0;
      const anchorX = rightSide ? out[0] + 4 : out[0] - 4;
      const anchor = rightSide ? 'start' : 'end';

      lbl.style('display', null)
        .text(d.name)
        .attr('text-anchor', anchor)
        .attr('x', anchorX)
        .attr('y', out[1] - 2);

      idxText.style('display', null)
        .text(d.indices.join(' · '))
        .attr('text-anchor', anchor)
        .attr('x', anchorX)
        .attr('y', out[1] + 9);

      // Tag bg surrounds both lines
      const b1 = lbl.node().getBBox();
      const b2 = idxText.node().getBBox();
      const minX = Math.min(b1.x, b2.x) - 4;
      const minY = Math.min(b1.y, b2.y) - 2;
      const w = Math.max(b1.x + b1.width, b2.x + b2.width) - minX + 4;
      const h = Math.max(b1.y + b1.height, b2.y + b2.height) - minY + 3;
      bg.style('display', null)
        .attr('x', minX)
        .attr('y', minY)
        .attr('width', w)
        .attr('height', h)
        .style('stroke', d.c);
    });
  }

  // ---------- CANDLES ----------
  const N_CANDLES = 70;
  let candles = [];
  let lastClose = 38400;
  function genCandle(prev) {
    const drift = (Math.random() - 0.48) * 80;
    const open = prev;
    const close = Math.max(100, prev + drift);
    const hi = Math.max(open, close) + Math.random() * 45;
    const lo = Math.min(open, close) - Math.random() * 45;
    return { o: open, h: hi, l: lo, c: close, v: 0.4 + Math.random() * 0.6 };
  }
  for (let i = 0; i < N_CANDLES; i++) {
    const c = genCandle(lastClose);
    candles.push(c);
    lastClose = c.c;
  }

  const cSvg = d3.select('#candles');
  const cW = 700, cH = 140;
  const cGrid = cSvg.append('g');
  const cVolLayer = cSvg.append('g').attr('class', 'vol-layer');
  const cBBLayer = cSvg.append('g').attr('class', 'bb-layer');
  const cMa = cSvg.append('g');
  const cBody = cSvg.append('g');

  for (let i = 1; i < 5; i++) {
    cGrid.append('line')
      .attr('x1', 0).attr('x2', cW)
      .attr('y1', (i / 5) * cH).attr('y2', (i / 5) * cH)
      .attr('stroke', 'rgba(120,160,255,0.06)').attr('stroke-dasharray', '2 3');
  }
  cGrid.append('text').attr('x', 6).attr('y', 12)
    .attr('fill', 'rgba(120,160,255,0.55)')
    .attr('font-family', 'JetBrains Mono, monospace')
    .attr('font-size', 9)
    .text('38,600');
  cGrid.append('text').attr('x', 6).attr('y', cH - 4)
    .attr('fill', 'rgba(120,160,255,0.55)')
    .attr('font-family', 'JetBrains Mono, monospace')
    .attr('font-size', 9)
    .text('38,200');

  function drawCandles() {
    const min = d3.min(candles, d => d.l);
    const max = d3.max(candles, d => d.h);
    // pad min/max so BB doesn't get clipped
    const pad = (max - min) * 0.08;
    const y = d3.scaleLinear().domain([min - pad, max + pad]).range([cH - 8, 14]);
    const x = d3.scaleLinear().domain([0, N_CANDLES - 1]).range([10, cW - 10]);
    const w = (cW - 20) / N_CANDLES * 0.72;
    const closes = candles.map(c => c.c);

    // ===== VOLUME LAYER (bottom 30% of chart, semi-transparent) =====
    const volH = (cH - 22) * 0.32;
    const volBase = cH - 8;
    const volTop = volBase - volH;
    const maxVol = d3.max(candles, d => d.v) || 1;
    cVolLayer.selectAll('rect').data(candles, (_, i) => i)
      .join('rect')
      .attr('x', (_, i) => x(i) - w / 2)
      .attr('y', d => volBase - (d.v / maxVol) * volH)
      .attr('width', w)
      .attr('height', d => (d.v / maxVol) * volH)
      .attr('fill', d => d.c >= d.o ? '#2ee6a0' : '#ff4d6d')
      .attr('opacity', 0.20);

    // ===== BOLLINGER LAYER =====
    const bb = computeBB(closes);
    const lineBB = d3.line().x((_, i) => x(i)).y(d => y(d)).curve(d3.curveMonotoneX);
    const areaBB = d3.area().x((_, i) => x(i))
      .y0((_, i) => y(bb.lower[i]))
      .y1((_, i) => y(bb.upper[i]))
      .curve(d3.curveMonotoneX);
    cBBLayer.selectAll('*').remove();
    cBBLayer.append('path').attr('d', areaBB(bb.upper))
      .attr('fill', 'rgba(106,216,255,0.10)');
    cBBLayer.append('path').attr('d', lineBB(bb.upper))
      .attr('fill', 'none').attr('stroke', '#6ad8ff')
      .attr('stroke-width', 0.7).attr('opacity', 0.55)
      .attr('stroke-dasharray', '3 3');
    cBBLayer.append('path').attr('d', lineBB(bb.lower))
      .attr('fill', 'none').attr('stroke', '#6ad8ff')
      .attr('stroke-width', 0.7).attr('opacity', 0.55)
      .attr('stroke-dasharray', '3 3');

    // ===== MA20 + MA50 LINES =====
    const ma = candles.map((_, i) => {
      const s = Math.max(0, i - 19);
      const slice = candles.slice(s, i + 1);
      return slice.reduce((a, b) => a + b.c, 0) / slice.length;
    });
    const ma50 = candles.map((_, i) => {
      const s = Math.max(0, i - 49);
      const slice = candles.slice(s, i + 1);
      return slice.reduce((a, b) => a + b.c, 0) / slice.length;
    });
    const line20 = d3.line().x((_, i) => x(i)).y(d => y(d)).curve(d3.curveMonotoneX);
    cMa.selectAll('path').data([
      { d: ma, color: '#ffd84d', op: 0.85, w: 1.1 },
      { d: ma50, color: '#ff9e4d', op: 0.6, w: 1 },
    ])
      .join('path')
      .attr('d', d => line20(d.d))
      .attr('fill', 'none')
      .attr('stroke', d => d.color)
      .attr('stroke-width', d => d.w)
      .attr('opacity', d => d.op);

    // ===== CANDLES =====
    const grp = cBody.selectAll('g.cd').data(candles, (_, i) => i)
      .join(enter => {
        const g = enter.append('g').attr('class', 'cd');
        g.append('line').attr('class', 'wick');
        g.append('rect').attr('class', 'body');
        return g;
      });
    grp.each(function (d, i) {
      const g = d3.select(this);
      const up = d.c >= d.o;
      const color = up ? '#2ee6a0' : '#ff4d6d';
      g.select('.wick')
        .attr('x1', x(i)).attr('x2', x(i))
        .attr('y1', y(d.h)).attr('y2', y(d.l))
        .attr('stroke', color).attr('stroke-width', 1);
      const top = y(Math.max(d.o, d.c));
      const bot = y(Math.min(d.o, d.c));
      g.select('.body')
        .attr('x', x(i) - w / 2)
        .attr('y', top)
        .attr('width', w)
        .attr('height', Math.max(1, bot - top))
        .attr('fill', color)
        .attr('stroke', color).attr('stroke-width', 0.5);
    });

    // ===== READOUT =====
    const last = candles[candles.length - 1];
    const prev = candles[candles.length - 2];
    const lastSd = (bb.upper[bb.upper.length - 1] - bb.ma[bb.ma.length - 1]) / 2;
    const totalVol = candles.slice(-30).reduce((a, c) => a + c.v, 0) * 1.2;
    document.getElementById('ohlc-readout').innerHTML =
      `O <b>${fmt(last.o)}</b>  H <b>${fmt(last.h)}</b>  L <b>${fmt(last.l)}</b>  C <span style="color:${last.c >= prev.c ? 'var(--up)' : 'var(--down)'}">${fmt(last.c)}</span>  ·  VOL <b>${totalVol.toFixed(1)}M</b>  ·  σ <b>${lastSd.toFixed(1)}</b>`;
  }
  function fmt(n) { return n.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }); }

  // ---------- INDICATORS ----------
  function ema(arr, period) {
    const out = [];
    const k = 2 / (period + 1);
    let prev = arr[0];
    out.push(prev);
    for (let i = 1; i < arr.length; i++) {
      const v = arr[i] * k + prev * (1 - k);
      out.push(v); prev = v;
    }
    return out;
  }
  function computeRSI(closes, period = 14) {
    const out = [];
    let g = 0, l = 0;
    for (let i = 1; i < closes.length; i++) {
      const ch = closes[i] - closes[i - 1];
      const gain = Math.max(0, ch);
      const loss = Math.max(0, -ch);
      if (i <= period) {
        g += gain; l += loss;
        if (i === period) {
          const rs = g / Math.max(1e-9, l);
          out.push(100 - 100 / (1 + rs));
        } else out.push(50);
      } else {
        g = (g * (period - 1) + gain) / period;
        l = (l * (period - 1) + loss) / period;
        const rs = g / Math.max(1e-9, l);
        out.push(100 - 100 / (1 + rs));
      }
    }
    return out;
  }
  function computeStoch(candles, period = 14, dPeriod = 3) {
    const k = [];
    for (let i = 0; i < candles.length; i++) {
      const s = Math.max(0, i - period + 1);
      const slice = candles.slice(s, i + 1);
      const hh = Math.max(...slice.map(c => c.h));
      const ll = Math.min(...slice.map(c => c.l));
      const v = ((candles[i].c - ll) / Math.max(1e-9, hh - ll)) * 100;
      k.push(v);
    }
    const d = k.map((_, i) => {
      const s = Math.max(0, i - dPeriod + 1);
      const slice = k.slice(s, i + 1);
      return slice.reduce((a, b) => a + b, 0) / slice.length;
    });
    return { k, d };
  }
  function computeATR(candles, period = 14) {
    const tr = [];
    for (let i = 0; i < candles.length; i++) {
      const c = candles[i];
      const prevC = i > 0 ? candles[i - 1].c : c.c;
      tr.push(Math.max(c.h - c.l, Math.abs(c.h - prevC), Math.abs(c.l - prevC)));
    }
    const out = [];
    let prev = tr[0];
    for (let i = 0; i < tr.length; i++) {
      if (i === 0) { out.push(tr[0]); continue; }
      prev = (prev * (period - 1) + tr[i]) / period;
      out.push(prev);
    }
    return out;
  }
  function computeADX(candles, period = 14) {
    // Simple proxy: smoothed |%change|
    const out = [];
    let prev = 25;
    for (let i = 0; i < candles.length; i++) {
      const change = i > 0 ? Math.abs(candles[i].c - candles[i - 1].c) / candles[i - 1].c * 100 : 0;
      const v = (prev * (period - 1) + change * 60) / period;
      out.push(Math.min(60, v));
      prev = v;
    }
    return out;
  }
  function computeBB(closes, period = 20, mult = 2) {
    const ma = [];
    const upper = [];
    const lower = [];
    for (let i = 0; i < closes.length; i++) {
      const s = Math.max(0, i - period + 1);
      const slice = closes.slice(s, i + 1);
      const m = slice.reduce((a, b) => a + b, 0) / slice.length;
      const v = slice.reduce((a, b) => a + (b - m) ** 2, 0) / slice.length;
      const sd = Math.sqrt(v);
      ma.push(m); upper.push(m + mult * sd); lower.push(m - mult * sd);
    }
    return { ma, upper, lower };
  }

  // generic mini line plotter
  function plotLine(svg, vbW, vbH, data, opts) {
    svg.selectAll('*').remove();
    const min = opts.min ?? d3.min(data);
    const max = opts.max ?? d3.max(data);
    const x = d3.scaleLinear().domain([0, data.length - 1]).range([2, vbW - 2]);
    const y = d3.scaleLinear().domain([min, max]).range([vbH - 2, 4]);
    if (opts.bands) {
      opts.bands.forEach(b => {
        svg.append('line').attr('x1', 0).attr('x2', vbW)
          .attr('y1', y(b.v)).attr('y2', y(b.v))
          .attr('stroke', b.color || 'rgba(120,160,255,0.2)')
          .attr('stroke-dasharray', '2 3');
      });
    }
    const line = d3.line().x((_, i) => x(i)).y(d => y(Math.max(min, Math.min(max, d)))).curve(d3.curveMonotoneX);
    svg.append('path').attr('d', line(data)).attr('fill', 'none')
      .attr('stroke', opts.color).attr('stroke-width', opts.width || 1.2);
    return { x, y };
  }

  function drawIndicators() {
    const closes = candles.map(c => c.c);

    // RSI
    const rsi = computeRSI(closes);
    plotLine(d3.select('#rsi'), 700, 30, rsi, {
      color: '#a07cff', width: 1.4, min: 20, max: 80,
      bands: [{ v: 70, color: 'rgba(255,77,109,0.35)' }, { v: 30, color: 'rgba(46,230,160,0.35)' }],
    });
    const rsiEl = document.getElementById('rsi-val');
    if (rsiEl) rsiEl.textContent = rsi[rsi.length - 1].toFixed(1);

    // MACD
    const ema12 = ema(closes, 12);
    const ema26 = ema(closes, 26);
    const macd = ema12.map((v, i) => v - ema26[i]);
    const signal = ema(macd, 9);
    const hist = macd.map((v, i) => v - signal[i]);
    const macdSvg = d3.select('#macd');
    macdSvg.selectAll('*').remove();
    const vbW = 700, vbH = 30;
    const xM = d3.scaleLinear().domain([0, hist.length - 1]).range([2, vbW - 2]);
    const ext = Math.max(d3.max(hist.map(Math.abs)), d3.max(macd.map(Math.abs))) || 1;
    const yM = d3.scaleLinear().domain([-ext, ext]).range([vbH - 2, 2]);
    const zero = yM(0);
    macdSvg.append('line').attr('x1', 0).attr('x2', vbW).attr('y1', zero).attr('y2', zero)
      .attr('stroke', 'rgba(120,160,255,0.25)');
    const bw = Math.max(1, (vbW - 8) / hist.length * 0.8);
    macdSvg.selectAll('rect').data(hist).join('rect')
      .attr('x', (_, i) => xM(i) - bw / 2)
      .attr('y', d => d >= 0 ? yM(d) : zero)
      .attr('width', bw)
      .attr('height', d => Math.abs(yM(d) - zero))
      .attr('fill', d => d >= 0 ? '#2ee6a0' : '#ff4d6d').attr('opacity', 0.85);
    const macdLine = d3.line().x((_, i) => xM(i)).y(d => yM(d)).curve(d3.curveMonotoneX);
    macdSvg.append('path').attr('d', macdLine(macd)).attr('fill', 'none').attr('stroke', '#6ad8ff').attr('stroke-width', 1);
    macdSvg.append('path').attr('d', macdLine(signal)).attr('fill', 'none').attr('stroke', '#ffd84d').attr('stroke-width', 1).attr('opacity', 0.85);
    const macdEl = document.getElementById('macd-val');
    if (macdEl) macdEl.textContent = (macd[macd.length - 1] >= 0 ? '+' : '') + macd[macd.length - 1].toFixed(1);
  }

  // ---------- WATCHLIST + FX ----------
  // Curated to the six markets the user asked for:
  // United States, Japan, South Korea, China, Hong Kong, Australia
  const WATCH = [
    // United States
    { sym: 'NASDAQ',     base: 19433.18, c: '#6ad8ff', flag: 'US' },
    { sym: 'S&P 500',    base: 6014.55,  c: '#6ad8ff', flag: 'US' },
    { sym: 'DOW 30',     base: 44918.20, c: '#6ad8ff', flag: 'US' },
    { sym: 'NYSE',       base: 18021.74, c: '#6ad8ff', flag: 'US' },
    { sym: 'RUSSELL 3K', base: 3458.92,  c: '#a07cff', flag: 'US' },
    { sym: 'RUSSELL 2K', base: 2384.10,  c: '#a07cff', flag: 'US' },
    // Japan
    { sym: 'NIKKEI 225', base: 38461.55, c: '#ff4d6d', flag: 'JP' },
    { sym: 'TOPIX',      base: 2710.42,  c: '#ff4d6d', flag: 'JP' },
    { sym: 'JASDAQ',     base: 175.32,   c: '#ff4d6d', flag: 'JP' },
    // South Korea
    { sym: 'KOSPI',      base: 2654.18,  c: '#ff4dff', flag: 'KR' },
    { sym: 'KOSDAQ',     base: 854.22,   c: '#ff4dff', flag: 'KR' },
    { sym: 'KOSPI 200',  base: 354.81,   c: '#ff4dff', flag: 'KR' },
    // China
    { sym: 'SSE COMP',   base: 3284.66,  c: '#ff7d4d', flag: 'CN' },
    { sym: 'STAR 50',    base: 824.05,   c: '#ff7d4d', flag: 'CN' },
    { sym: 'SZSE COMP',  base: 1986.31,  c: '#ffb84d', flag: 'CN' },
    { sym: 'CHINEXT',    base: 2104.78,  c: '#ffb84d', flag: 'CN' },
    { sym: 'CSI 300',    base: 3902.04,  c: '#ffb84d', flag: 'CN' },
    // Hong Kong
    { sym: 'HSI',        base: 19872.41, c: '#ffd84d', flag: 'HK' },
    { sym: 'HSCEI',      base: 7034.92,  c: '#ffd84d', flag: 'HK' },
    { sym: 'HSTECH',     base: 4218.30,  c: '#ffd84d', flag: 'HK' },
    // Australia
    { sym: 'ASX 200',    base: 7892.10,  c: '#2ee6a0', flag: 'AU' },
    { sym: 'ALL ORDS',   base: 8156.42,  c: '#2ee6a0', flag: 'AU' },
    { sym: 'S&P/ASX 50', base: 7438.65,  c: '#2ee6a0', flag: 'AU' },
  ];

    const FX = [
    { sym: 'USD / JPY', base: 156.42 },
    { sym: 'USD / KRW', base: 1382.10 },
    { sym: 'USD / CNY', base: 7.243 },
    { sym: 'USD / HKD', base: 7.810 },
    { sym: 'USD / TWD', base: 32.04 },
    { sym: 'USD / AUD', base: 1.534 },
    { sym: 'USD / EUR', base: 0.923 },
    { sym: 'USD / GBP', base: 0.789 },
    { sym: 'USD / INR', base: 84.10 },
    { sym: 'GOLD',      base: 2640.15 },
    { sym: 'OIL · WTI', base: 73.42 },
    { sym: 'BTC / USD', base: 102450 },
    { sym: 'ETH / USD', base: 3892.40 },
  ];

  function pct() { return (Math.random() * 2 - 0.6); }

  let currentRegion = 'ALL';
  let currentChartRegion = null; // null = global movers; 'US'/'JP'/etc = filtered
  function renderWatchlist() {
    const el = document.getElementById('watchlist');
    const items = currentRegion === 'ALL' ? WATCH : WATCH.filter(w => w.flag === currentRegion);
    el.innerHTML = items.map(w => {
      const live = liveIndexMap.get(w.sym);
      const c = live ? Number(live.changePercent || 0) : pct();
      const cls = c >= 0 ? 'up' : 'down';
      const arrow = c >= 0 ? '▲' : '▼';
      const price = live && live.value ? Number(live.value) : (w.base * (1 + c / 100));
      const source = live ? (live.source || 'LIVE') : 'SIM';
      const cur = price.toLocaleString('en-US', { maximumFractionDigits: 2 });
      return `<div class="ticker-row ${cls}" data-sym="${w.sym}">
        <span class="name"><span class="sw" style="background:${w.c}"></span>${w.sym} <span style="color:var(--ink-2);font-size:9px">${w.flag} · ${source}</span></span>
        <span class="val">${cur}</span>
        <span class="chg">${arrow} ${Math.abs(c).toFixed(2)}%</span>
      </div>`;
    }).join('');
  }

  const liveIndexMap = new Map();
  async function refreshLiveIndices() {
    const status = document.getElementById('indices-status');
    try {
      if (status) status.textContent = 'UPDATING';
      const response = await fetch('/api/market/indices', { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      (payload.indices || []).forEach(item => liveIndexMap.set(item.sym, item));
      if (status) status.textContent = payload.source === 'fallback' ? 'FALLBACK' : 'LIVE API';
      renderWatchlist();
    } catch (error) {
      if (status) status.textContent = 'SIM MODE';
    }
  }
  function renderFx() {
    const el = document.getElementById('fx-list');
    el.innerHTML = FX.map(w => {
      const c = (Math.random() * 1.2 - 0.5);
      const cls = c >= 0 ? 'up' : 'down';
      const arrow = c >= 0 ? '▲' : '▼';
      const cur = (w.base * (1 + c / 100)).toLocaleString('en-US', { maximumFractionDigits: w.base < 10 ? 4 : 2 });
      return `<div class="ticker-row ${cls}">
        <span class="name">${w.sym}</span>
        <span class="val">${cur}</span>
        <span class="chg">${arrow} ${Math.abs(c).toFixed(2)}%</span>
      </div>`;
    }).join('');
  }

  // ---------- LOGO MARQUEE ----------
  // Real logos via Google's favicon service (works for any domain). Monogram fallback if a logo fails.
  const COMPANIES = [
    { t: 'AAPL',   n: 'Apple',            d: 'apple.com',             bg: '#000',    fg: '#fff',     g: 'A' },
    { t: 'MSFT',   n: 'Microsoft',        d: 'microsoft.com',         bg: '#0078d4', fg: '#fff',     g: '⊞' },
    { t: 'NVDA',   n: 'Nvidia',           d: 'nvidia.com',            bg: '#76b900', fg: '#0b0b0b',  g: 'N' },
    { t: 'GOOGL',  n: 'Alphabet',         d: 'abc.xyz',               bg: '#4285f4', fg: '#fff',     g: 'G' },
    { t: 'AMZN',   n: 'Amazon',           d: 'amazon.com',            bg: '#ff9900', fg: '#0b0b0b',  g: 'a' },
    { t: 'META',   n: 'Meta',             d: 'about.meta.com',        bg: '#0866ff', fg: '#fff',     g: '∞' },
    { t: 'TSLA',   n: 'Tesla',            d: 'tesla.com',             bg: '#cc0000', fg: '#fff',     g: 'T' },
    { t: 'NFLX',   n: 'Netflix',          d: 'netflix.com',           bg: '#e50914', fg: '#fff',     g: 'N' },
    { t: 'AVGO',   n: 'Broadcom',         d: 'broadcom.com',          bg: '#cc092f', fg: '#fff',     g: 'B' },
    { t: 'JPM',    n: 'JPMorgan',         d: 'jpmorganchase.com',     bg: '#1f3a5c', fg: '#fff',     g: 'J' },
    { t: 'BRK.B',  n: 'Berkshire',        d: 'berkshirehathaway.com', bg: '#a30101', fg: '#fff',     g: 'B' },
    { t: 'V',      n: 'Visa',             d: 'visa.com',              bg: '#1a1f71', fg: '#fff',     g: 'V' },
    { t: 'MA',     n: 'Mastercard',       d: 'mastercard.com',        bg: '#cc0000', fg: '#fff',     g: 'M' },
    { t: 'WMT',    n: 'Walmart',          d: 'walmart.com',           bg: '#0071ce', fg: '#ffce00',  g: '✦' },
    { t: 'AMD',    n: 'AMD',              d: 'amd.com',               bg: '#ed1c24', fg: '#fff',     g: 'A' },
    { t: 'INTC',   n: 'Intel',            d: 'intel.com',             bg: '#0071c5', fg: '#fff',     g: 'i' },
    { t: 'ARM',    n: 'Arm',              d: 'arm.com',               bg: '#0091bd', fg: '#fff',     g: 'a' },
    { t: 'ORCL',   n: 'Oracle',           d: 'oracle.com',            bg: '#c74634', fg: '#fff',     g: 'O' },
    { t: 'CRM',    n: 'Salesforce',       d: 'salesforce.com',        bg: '#00a1e0', fg: '#fff',     g: '☁' },
    { t: 'PLTR',   n: 'Palantir',         d: 'palantir.com',          bg: '#0b0b0b', fg: '#fff',     g: 'P' },
    { t: 'ADBE',   n: 'Adobe',            d: 'adobe.com',             bg: '#fa0f00', fg: '#fff',     g: 'A' },
    { t: 'COIN',   n: 'Coinbase',         d: 'coinbase.com',          bg: '#0052ff', fg: '#fff',     g: 'C' },
    { t: '7203',   n: 'Toyota',           d: 'toyota.com',            bg: '#eb0a1e', fg: '#fff',     g: 'T' },
    { t: '6758',   n: 'Sony',             d: 'sony.com',              bg: '#000',    fg: '#fff',     g: 'S' },
    { t: '6861',   n: 'Keyence',          d: 'keyence.com',           bg: '#003a70', fg: '#fff',     g: 'K' },
    { t: '8035',   n: 'Tokyo Electron',   d: 'tel.com',               bg: '#0067b3', fg: '#fff',     g: 'T' },
    { t: '9984',   n: 'SoftBank',         d: 'softbank.jp',           bg: '#b5b5b5', fg: '#0b0b0b',  g: 'S' },
    { t: '7974',   n: 'Nintendo',         d: 'nintendo.com',          bg: '#e60012', fg: '#fff',     g: 'N' },
    { t: '6098',   n: 'Recruit',          d: 'recruit-holdings.com',  bg: '#ff9000', fg: '#fff',     g: 'R' },
    { t: '8306',   n: 'MUFG',             d: 'mufg.jp',               bg: '#c11920', fg: '#fff',     g: 'M' },
    { t: '005930', n: 'Samsung',          d: 'samsung.com',           bg: '#1428a0', fg: '#fff',     g: 'S' },
    { t: '000660', n: 'SK Hynix',         d: 'skhynix.com',           bg: '#e60012', fg: '#fff',     g: 'H' },
    { t: '035420', n: 'NAVER',            d: 'navercorp.com',         bg: '#03c75a', fg: '#fff',     g: 'N' },
    { t: '035720', n: 'Kakao',            d: 'kakaocorp.com',         bg: '#fee500', fg: '#3c1e1e',  g: 'K' },
    { t: 'TSM',    n: 'TSMC',             d: 'tsmc.com',              bg: '#cc0000', fg: '#fff',     g: 'T' },
    { t: '2330',   n: 'TSMC TW',          d: 'tsmc.com',              bg: '#a40000', fg: '#fff',     g: 't' },
    { t: '2317',   n: 'Hon Hai',          d: 'honhai.com',            bg: '#003595', fg: '#fff',     g: 'H' },
    { t: 'BABA',   n: 'Alibaba',          d: 'alibabagroup.com',      bg: '#ff6a00', fg: '#fff',     g: 'A' },
    { t: '0700',   n: 'Tencent',          d: 'tencent.com',           bg: '#1a8b6e', fg: '#fff',     g: '腾' },
    { t: '1398',   n: 'ICBC',             d: 'icbc-ltd.com',          bg: '#a30101', fg: '#fff',     g: '工' },
    { t: '601318', n: 'Ping An',          d: 'pingan.com',            bg: '#e60012', fg: '#fff',     g: '平' },
    { t: 'PDD',    n: 'PDD',              d: 'pddglobal.com',         bg: '#e02020', fg: '#fff',     g: 'P' },
    { t: 'BIDU',   n: 'Baidu',            d: 'baidu.com',             bg: '#2932e1', fg: '#fff',     g: 'B' },
    { t: 'JD',     n: 'JD.com',           d: 'jd.com',                bg: '#e1251b', fg: '#fff',     g: 'J' },
    { t: '600519', n: 'Moutai',           d: 'moutaichina.com',       bg: '#a30101', fg: '#ffce00',  g: 'M' },
    { t: 'ASML',   n: 'ASML',             d: 'asml.com',              bg: '#1d4ed8', fg: '#fff',     g: 'A' },
    { t: 'NESN',   n: 'Nestlé',          d: 'nestle.com',            bg: '#1c2e58', fg: '#fff',     g: 'N' },
    { t: 'ROG',    n: 'Roche',            d: 'roche.com',             bg: '#0066cc', fg: '#fff',     g: 'R' },
    { t: 'NOVN',   n: 'Novartis',         d: 'novartis.com',          bg: '#0460a9', fg: '#fff',     g: 'N' },
    { t: 'MC',     n: 'LVMH',             d: 'lvmh.com',              bg: '#0b0b0b', fg: '#c9a96e',  g: 'L' },
    { t: 'OR',     n: 'L’Oréal',         d: 'loreal.com',            bg: '#cc0a14', fg: '#fff',     g: 'L' },
    { t: 'SAP',    n: 'SAP',              d: 'sap.com',               bg: '#0faaff', fg: '#0b0b0b',  g: 'S' },
    { t: 'SHEL',   n: 'Shell',            d: 'shell.com',             bg: '#fbce07', fg: '#0b0b0b',  g: 'S' },
    { t: 'BP',     n: 'BP',               d: 'bp.com',                bg: '#009a44', fg: '#ffffe0',  g: 'B' },
    { t: 'HSBC',   n: 'HSBC',             d: 'hsbc.com',              bg: '#db0011', fg: '#fff',     g: 'H' },
    { t: 'BHP',    n: 'BHP',              d: 'bhp.com',               bg: '#e35205', fg: '#fff',     g: 'B' },
    { t: 'CBA',    n: 'Commonwealth',     d: 'commbank.com.au',       bg: '#ffcc00', fg: '#0b0b0b',  g: 'C' },
    { t: 'RIO',    n: 'Rio Tinto',        d: 'riotinto.com',          bg: '#00a3e0', fg: '#fff',     g: 'R' },
    { t: 'RELI',   n: 'Reliance',         d: 'ril.com',               bg: '#0066b3', fg: '#fff',     g: 'R' },
    { t: 'TCS',    n: 'Tata Consultancy', d: 'tcs.com',               bg: '#7d3c98', fg: '#fff',     g: 'T' },
    { t: 'INFY',   n: 'Infosys',          d: 'infosys.com',           bg: '#007cc3', fg: '#fff',     g: 'I' },
    { t: 'HDB',    n: 'HDFC Bank',        d: 'hdfcbank.com',          bg: '#004b8d', fg: '#fff',     g: 'H' },
  ];

  function renderLogos() {
    const rows = [
      document.getElementById('logos'),
      document.getElementById('logos-row-2'),
      document.getElementById('logos-row-3'),
    ].filter(Boolean);
    if (!rows.length) return;

    const chip = c => {
      const change = (Math.random() * 4 - 1.4);
      const cls = change >= 0 ? 'up' : 'down';
      const arrow = change >= 0 ? '▲' : '▼';
      const monogram = c.g || c.n[0];
      const src = `https://www.google.com/s2/favicons?domain=${c.d}&sz=64`;
      // img sits on white tile; on error, hide it and reveal a colored monogram.
      const onerr = "this.style.display='none';this.nextElementSibling.style.display='grid';";
      return `<div class="logo-chip">
        <span class="logo" style="--mono-bg:${c.bg};--mono-fg:${c.fg}">
          <img src="${src}" alt="${c.n}" onerror="${onerr}"/>
          <span class="mono" style="display:none;">${monogram}</span>
        </span>
        <span class="ticker">${c.t}</span>
        <span class="name">${c.n}</span>
        <span class="pp ${cls}">${arrow}${Math.abs(change).toFixed(2)}%</span>
      </div>`;
    };

    rows.forEach((row, index) => {
      const offset = index * 7;
      const rotated = COMPANIES.slice(offset).concat(COMPANIES.slice(0, offset));
      row.innerHTML = rotated.concat(rotated).map(chip).join('');
    });
  }

  // ---------- TOP MOVERS ----------
  const MOVERS = [
    // US
    { sym: 'NVDA',   name: 'Nvidia',       base: 142.06, region: 'US' },
    { sym: 'AAPL',   name: 'Apple',        base: 232.10, region: 'US' },
    { sym: 'MSFT',   name: 'Microsoft',    base: 421.55, region: 'US' },
    { sym: 'META',   name: 'Meta',         base: 558.40, region: 'US' },
    { sym: 'TSLA',   name: 'Tesla',        base: 342.18, region: 'US' },
    { sym: 'AMZN',   name: 'Amazon',       base: 224.20, region: 'US' },
    { sym: 'GOOGL',  name: 'Alphabet',     base: 195.40, region: 'US' },
    { sym: 'AVGO',   name: 'Broadcom',     base: 224.80, region: 'US' },
    { sym: 'NFLX',   name: 'Netflix',      base: 894.50, region: 'US' },
    { sym: 'COIN',   name: 'Coinbase',     base: 312.18, region: 'US' },
    { sym: 'AMD',    name: 'AMD',          base: 138.40, region: 'US' },
    { sym: 'PLTR',   name: 'Palantir',     base: 78.20,  region: 'US' },
    // Japan
    { sym: '7203',   name: 'Toyota',       base: 2918.50, region: 'JP' },
    { sym: '6758',   name: 'Sony',         base: 3120.00, region: 'JP' },
    { sym: '6861',   name: 'Keyence',      base: 64200, region: 'JP' },
    { sym: '8035',   name: 'Tokyo Electron', base: 23410, region: 'JP' },
    { sym: '9984',   name: 'SoftBank',     base: 9842, region: 'JP' },
    { sym: '7974',   name: 'Nintendo',     base: 8612, region: 'JP' },
    { sym: '6098',   name: 'Recruit',      base: 9210, region: 'JP' },
    { sym: '8306',   name: 'MUFG',         base: 1842.50, region: 'JP' },
    // Korea
    { sym: '005930', name: 'Samsung',      base: 56400, region: 'KR' },
    { sym: '000660', name: 'SK Hynix',     base: 218000, region: 'KR' },
    { sym: '035420', name: 'NAVER',        base: 178500, region: 'KR' },
    { sym: '035720', name: 'Kakao',        base: 38450, region: 'KR' },
    { sym: '005380', name: 'Hyundai Motor', base: 248500, region: 'KR' },
    { sym: '051910', name: 'LG Chem',      base: 412000, region: 'KR' },
    // China (A-shares + ADRs)
    { sym: 'BABA',   name: 'Alibaba',      base: 82.41, region: 'CN' },
    { sym: 'BIDU',   name: 'Baidu',        base: 88.20, region: 'CN' },
    { sym: 'JD',     name: 'JD.com',       base: 36.45, region: 'CN' },
    { sym: 'PDD',    name: 'PDD',          base: 102.40, region: 'CN' },
    { sym: '600519', name: 'Kweichow Moutai', base: 1482, region: 'CN' },
    { sym: '601318', name: 'Ping An',      base: 48.20, region: 'CN' },
    { sym: '1398',   name: 'ICBC',         base: 5.84, region: 'CN' },
    // Hong Kong
    { sym: '0700',   name: 'Tencent',      base: 412.40, region: 'HK' },
    { sym: '9988',   name: 'Alibaba HK',   base: 82.40, region: 'HK' },
    { sym: '1810',   name: 'Xiaomi',       base: 28.60, region: 'HK' },
    { sym: '3690',   name: 'Meituan',      base: 158.20, region: 'HK' },
    { sym: '9618',   name: 'JD-SW',        base: 142.50, region: 'HK' },
    { sym: '2318',   name: 'Ping An H',    base: 42.80, region: 'HK' },
    // Australia
    { sym: 'BHP',    name: 'BHP Group',    base: 38.42, region: 'AU' },
    { sym: 'CBA',    name: 'Commonwealth Bank', base: 142.50, region: 'AU' },
    { sym: 'RIO',    name: 'Rio Tinto',    base: 118.20, region: 'AU' },
    { sym: 'CSL',    name: 'CSL Limited',  base: 248.50, region: 'AU' },
    { sym: 'WBC',    name: 'Westpac',      base: 31.80, region: 'AU' },
    { sym: 'MQG',    name: 'Macquarie',    base: 218.40, region: 'AU' },
  ];

  function renderMovers() {
    const el = document.getElementById('movers');
    if (!el) return;
    const items = currentChartRegion
      ? MOVERS.filter(m => m.region === currentChartRegion)
      : MOVERS;
    const lbl = document.getElementById('movers-region');
    if (lbl) lbl.textContent = currentChartRegion || 'GLOBAL';
    el.innerHTML = items.map(m => {
      const c = (Math.random() * 6 - 2.0);
      const cls = c >= 0 ? 'up' : 'down';
      const arrow = c >= 0 ? '▲' : '▼';
      const cur = (m.base * (1 + c / 100)).toLocaleString('en-US', { maximumFractionDigits: 2 });
      return `<div class="ticker-row ${cls}">
        <span class="name">${m.sym} <span style="color:var(--ink-2)">· ${m.name}</span></span>
        <span class="val">${cur}</span>
        <span class="chg">${arrow} ${Math.abs(c).toFixed(2)}%</span>
      </div>`;
    }).join('');
  }

  // ---------- SECTOR HEATMAP ----------
  const SECTORS = [
    'TECH', 'FIN', 'HLTH', 'CONS',
    'ENGY', 'IND', 'MAT', 'UTIL',
    'COMM', 'STPL', 'RE', 'AI',
  ];

  let activeSector = null;
  function renderHeat() {
    const el = document.getElementById('heat');
    el.innerHTML = SECTORS.map(s => {
      const p = (Math.random() * 4 - 1.5);
      const t = Math.max(-2, Math.min(2, p)) / 2;
      const r = t >= 0 ? 46 : 255;
      const g = t >= 0 ? 230 : 77;
      const b = t >= 0 ? 160 : 109;
      const alpha = 0.25 + Math.abs(t) * 0.55;
      const cls = activeSector === s ? 'heat-cell active' : 'heat-cell';
      return `<div class="${cls}" data-sector="${s}" style="background:rgba(${r},${g},${b},${alpha})">
        <span class="sym">${s}</span>
        <span class="pct">${p >= 0 ? '+' : ''}${p.toFixed(2)}%</span>
      </div>`;
    }).join('');
  }

  
  // ============================================================
  // INTERACTIONS — clickable region chips, heatmap cells, city tags
  // ============================================================

  // Sector base prices, so clicking a heatmap cell rebases the candle stream
  const SECTOR_BASES = {
    TECH: 4220.5, FIN: 720.4, HLTH: 1820.6, CONS: 985.2,
    ENGY: 612.0, IND: 1124.8, MAT: 528.4, UTIL: 358.9,
    COMM: 296.5, STPL: 884.2, RE: 248.1, AI: 1342.7,
  };
  // City -> exchange code map for the header label
  const CITY_EXCHANGE = {
    NYC: 'NYSE', SEA: 'NASDAQ', TYO: 'TYO', SEL: 'KRX', SHA: 'SSE',
    SZX: 'SZSE', HKG: 'HKEX', TPE: 'TWSE', SYD: 'ASX', LON: 'LSE',
    FRA: 'XETRA', PAR: 'EURONEXT', BOM: 'BSE', SGP: 'SGX',
    TOR: 'TSX', SAO: 'B3',
  };

  function showToast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => el.classList.remove('show'), 1600);
  }

  // Rebase candle stream around a new price + update header.
  function setChartContext({ title, subtitle, base, color, region }) {
    currentChartRegion = region || null;
    renderMovers();
    // header label
    const hdr = document.getElementById('chart-title');
    if (hdr) {
      hdr.innerHTML = `<b style="${color ? 'color:' + color : ''}">${title}</b> · ${subtitle} · CANDLES · BBANDS · VOLUME`;
    }
    // reseed candles around new base — preserve length
    let p = base;
    const newCandles = [];
    const scale = Math.max(8, base * 0.0018); // step size proportional to price
    for (let i = 0; i < N_CANDLES; i++) {
      const drift = (Math.random() - 0.48) * scale * 2.5;
      const open = p;
      const close = Math.max(base * 0.5, p + drift);
      const hi = Math.max(open, close) + Math.random() * scale * 1.4;
      const lo = Math.min(open, close) - Math.random() * scale * 1.4;
      newCandles.push({ o: open, h: hi, l: lo, c: close, v: 0.4 + Math.random() * 0.6 });
      p = close;
    }
    candles.length = 0;
    for (const c of newCandles) candles.push(c);
    // also reset the lastClose used by genCandle for ongoing stream
    lastClose = candles[candles.length - 1].c;
    drawCandles();
    drawIndicators();
    showToast('SWITCHED · ' + title);
  }
  // expose lastClose by lifting the genCandle scope — we declared lastClose earlier with let.

  // ---- region chips ----
  document.getElementById('region-chips').addEventListener('click', (e) => {
    const btn = e.target.closest('.rg-chip');
    if (!btn) return;
    const region = btn.dataset.region;
    currentRegion = region;
    document.querySelectorAll('#region-chips .rg-chip').forEach(b => {
      b.classList.toggle('active', b.dataset.region === region);
    });
    renderWatchlist();
    showToast('FILTER · ' + region);
    // If picking a region, also rebase chart to that region's flagship index.
    const flagship = {
      US: { sym: 'S&P 500',    base: 6014.55, color: '#6ad8ff' },
      JP: { sym: 'NIKKEI 225', base: 38461.55, color: '#ff4d6d' },
      KR: { sym: 'KOSPI',      base: 2654.18, color: '#ff4dff' },
      CN: { sym: 'CSI 300',    base: 3902.04, color: '#ffb84d' },
      HK: { sym: 'HSI',        base: 19872.41, color: '#ffd84d' },
      AU: { sym: 'ASX 200',    base: 7892.10, color: '#2ee6a0' },
    }[region];
    if (flagship) {
      setChartContext({ title: flagship.sym, subtitle: region + ' · 1m', base: flagship.base, color: flagship.color, region });
    } else if (region === 'ALL') {
      setChartContext({ title: 'NIKKEI 225', subtitle: 'TYO · 1m', base: 38461.55, color: '#ff4d6d', region: null });
    }
  });

  // ---- sector heatmap ----
  document.getElementById('heat').addEventListener('click', (e) => {
    const cell = e.target.closest('.heat-cell');
    if (!cell) return;
    const sector = cell.dataset.sector;
    activeSector = sector;
    renderHeat();
    const base = SECTOR_BASES[sector] || 1000;
    setChartContext({ title: sector + ' SECTOR', subtitle: 'S&P 500 · 1m', base, color: '#a07cff', region: 'US' });
  });

  // ---- watchlist row click ----
  document.getElementById('watchlist').addEventListener('click', (e) => {
    const row = e.target.closest('.ticker-row');
    if (!row) return;
    const sym = row.dataset.sym;
    const w = WATCH.find(x => x.sym === sym);
    if (!w) return;
    setChartContext({ title: sym, subtitle: w.flag + ' · 1m', base: w.base, color: w.c, region: w.flag });
    document.querySelectorAll('#watchlist .ticker-row').forEach(r => r.classList.toggle('active', r.dataset.sym === sym));
  });

  // ---- city tags on globe ----
  // attached after markers are built in the marker section
  function wireCityClicks() {
    d3.selectAll('g.city').on('click', function (event, d) {
      // pick the city's primary index
      const idx = (d.indices && d.indices[0]) || d.name;
      const baseGuess = ({
        'NIKKEI 225': 38461.55, 'KOSPI': 2654.18, 'KOSDAQ': 854.22,
        'NASDAQ': 19433.18, 'S&P 500': 6014.55, 'RUSSELL 3000': 3458.92,
        'SSE COMP': 3284.66, 'SZSE COMP': 1986.31, 'HSI': 19872.41,
        'TWSE': 22918.50, 'ASX 200': 7892.10, 'FTSE 100': 8458.10,
        'DAX': 19238.42, 'CAC 40': 7541.30, 'SENSEX': 81421.30,
        'STI': 3624.50, 'TSX': 25104.50, 'BOVESPA': 132484,
      })[idx] || 1000;
      d3.selectAll('g.city').classed('active', false);
      d3.select(this).classed('active', true);
      const cityRegion = ({
        NYC: 'US', SEA: 'US', TYO: 'JP', SEL: 'KR', SHA: 'CN',
        SZX: 'CN', HKG: 'HK', TPE: null, SYD: 'AU',
      })[d.id] || null;
      setChartContext({
        title: idx,
        subtitle: d.name + ' · ' + (CITY_EXCHANGE[d.id] || ''),
        base: baseGuess,
        color: d.c,
        region: cityRegion,
      });
    }).style('cursor', 'pointer');
  }
  // Wire after the first marker pass — markers are created up-front in this script
  wireCityClicks();


  // ---------- WHIRL ANIMATION ----------
  const rings = ['ring1', 'ring2', 'ring3', 'ring4', 'ring5'].map(id => document.getElementById(id));
  function updateWhirl(t) {
    if (!TWEAKS.showWhirl) {
      rings.forEach(r => r.style.opacity = 0);
      return;
    }
    rings.forEach(r => r.style.opacity = 1);
    rings[0].setAttribute('transform', `rotate(${t * 28}, 270, 270)`);
    rings[1].setAttribute('transform', `rotate(${-t * 14}, 270, 270)`);
    rings[2].setAttribute('transform', `rotate(${t * 60}, 270, 270)`);
    rings[3].setAttribute('transform', `rotate(${-t * 8}, 270, 270)`);
    rings[4].setAttribute('transform', `rotate(${t * 22}, 270, 270)`);
  }

  function updateMarkerPulse(t) {
    const phase = (t * 1.4) % 1;
    const r = 3 + phase * 14;
    const op = (1 - phase) * 0.7;
    cityG.select('.mk-pulse').attr('r', r).style('opacity', op);
  }

  // ---------- PHASES ----------
  const PHASES = [
    'Establishing handshake · ASX · NIKKEI 225 · KOSDAQ · KOSPI · JASDAQ',
    'Decrypting order book · NASDAQ · S&P 500 · DOW · RUSSELL 3000',
    'Mapping Chinese A-shares · SSE · SZSE · CSI 300 · STAR 50 · CHINEXT',
    'Calibrating volatility surface · LSE · DAX · CAC 40 · SENSEX',
    'Streaming tick data · 26 exchanges · 11 timezones',
    'Reconciling FX · USD · JPY · KRW · CNY · AUD · EUR',
  ];
  function fmtClock(d) {
    const pad = n => String(n).padStart(2, '0');
    return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`;
  }

  // ---------- RESPONSIVE GLOBE STAGE ----------
  // .globe-stage is a square that fills the available area (min of area width/height, capped at 540).
  const stageEl = document.querySelector('.globe-stage');
  const areaEl = document.querySelector('.globe-area');
  function sizeStage() {
    if (!stageEl || !areaEl) return;
    const w = areaEl.clientWidth;
    const h = areaEl.clientHeight;
    if (w === 0 || h === 0) return;
    const s = Math.max(260, Math.min(w * 1.35, h * 2.05, 1180));
    stageEl.style.width = s + 'px';
    stageEl.style.height = s + 'px';
  }
  if (window.ResizeObserver) {
    new ResizeObserver(sizeStage).observe(areaEl);
  } else {
    window.addEventListener('resize', sizeStage);
  }
  sizeStage();

  // ---------- INIT + LOOP ----------
  drawCandles();
  drawIndicators();
  renderWatchlist();
  refreshLiveIndices();
  setInterval(refreshLiveIndices, 60000);
  renderFx();
  renderLogos();
  renderMovers();
  renderHeat();

  const NEWS = {
    current: [
      ['시사상식 브리핑', '오늘 주요 이슈를 3줄 요약으로 모으는 공간입니다. 나중에 실제 뉴스 API를 붙이면 최신 기사로 교체됩니다.'],
      ['키워드 감지', '환율, 금리, 선거, 규제, 전쟁, 공급망 같은 키워드를 묶어 시장 영향도를 표시할 예정입니다.'],
      ['면접/상식 대비', '기사 제목만 보는 게 아니라 배경지식, 원인, 결과, 찬반 쟁점까지 같이 정리하는 화면입니다.']
    ],
    economy: [
      ['금리와 환율', '미국 금리, 달러 인덱스, 원/달러 환율이 주식과 ETF에 주는 영향을 정리합니다.'],
      ['물가와 고용', 'CPI, PPI, 실업률, 고용지표처럼 시장을 움직이는 경제지표를 추적합니다.'],
      ['기업 실적', '매출, 영업이익, EPS, 가이던스를 뉴스 카드로 연결할 수 있습니다.']
    ],
    politics: [
      ['정책 뉴스', '세금, 규제, 보조금, 산업 정책이 섹터별 주가에 미치는 흐름을 봅니다.'],
      ['국제 관계', '미중 관계, 무역 규제, 지정학 리스크를 시장 이벤트와 함께 연결합니다.'],
      ['선거 이슈', '선거 결과와 정책 변화 가능성을 투자/경제 관점으로 정리합니다.']
    ],
    tech: [
      ['AI 인프라', 'GPU, 데이터센터, 클라우드, 반도체 공급망 뉴스를 묶습니다.'],
      ['플랫폼 기업', 'Apple, Microsoft, Google, Amazon, Meta 관련 뉴스를 기업 카드와 연결합니다.'],
      ['신기술', 'LLM, 로봇, 자율주행, 바이오 AI 같은 테마를 따로 분류합니다.']
    ],
    market: [
      ['증시 마감', '미국, 한국, 일본, 중국, 홍콩, 호주 지수의 등락과 이유를 정리합니다.'],
      ['Top Movers', '급등/급락 종목의 원인을 뉴스와 연결해 보여주는 화면입니다.'],
      ['섹터 흐름', 'Sector Heatmap과 뉴스 이벤트를 묶어서 어떤 업종이 강한지 봅니다.']
    ]
  };

  async function renderNews(category = 'current') {
    const el = document.getElementById('news-content');
    if (!el) return;
    el.innerHTML = '<article class="news-card"><b>뉴스 불러오는 중</b><p>실시간 RSS API를 요청하고 있습니다.</p></article>';
    let rows = (NEWS[category] || NEWS.current).map(([title, body]) => ({ title, source: 'KOSMO', summary: body, link: '' }));
    try {
      const response = await fetch(`/api/news/live?category=${encodeURIComponent(category)}`, { cache: 'no-store' });
      if (response.ok) {
        const payload = await response.json();
        rows = payload.items || rows;
      }
    } catch (error) {
      rows = rows;
    }
    el.innerHTML = rows.map(item => `<article class="news-card">
      <b>${item.title || '뉴스 제목 없음'}</b>
      <p>${item.summary || ''}</p>
      <p style="margin-top:8px;color:var(--ink-2)">${item.source || 'NEWS'} · ${item.publishedAt || ''}</p>
    </article>`).join('');
    document.querySelectorAll('.news-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.news === category);
    });
  }

  function setMode(mode) {
    const next = mode === 'chart' || mode === 'news' || mode === 'login' ? mode : 'globe';
    document.body.classList.toggle('chart-open', next === 'chart');
    document.body.classList.toggle('news-open', next === 'news');
    document.body.classList.toggle('login-open', next === 'login');
    document.getElementById('chart-overlay')?.setAttribute('aria-hidden', next === 'chart' ? 'false' : 'true');
    document.getElementById('news-view')?.setAttribute('aria-hidden', next === 'news' ? 'false' : 'true');
    document.getElementById('login-view')?.setAttribute('aria-hidden', next === 'login' ? 'false' : 'true');
    if (next === 'news') renderNews(document.querySelector('.news-tab.active')?.dataset.news || 'current');
  }

  renderNews();
  window.setTerminalMode = setMode;
  window.renderTerminalNews = renderNews;
  document.querySelectorAll('[data-mode]').forEach(button => {
    button.addEventListener('click', () => setMode(button.dataset.mode));
  });
  document.querySelectorAll('[data-news]').forEach(button => {
    button.addEventListener('click', () => renderNews(button.dataset.news));
  });
  async function postJson(url, body) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message || `HTTP ${response.status}`);
    return payload;
  }

  async function refreshMembers() {
    const el = document.getElementById('member-list');
    if (!el) return;
    try {
      const response = await fetch('/api/members', { cache: 'no-store' });
      const payload = await response.json();
      el.innerHTML = (payload.members || []).map(member =>
        `<div>${member.memberId}. ${member.displayName} · ${member.email} · ${member.membershipType}</div>`
      ).join('') || '회원 없음';
    } catch (error) {
      el.textContent = '회원 목록을 불러오지 못했습니다.';
    }
  }

  document.getElementById('login-submit')?.addEventListener('click', async () => {
    const status = document.getElementById('member-status');
    try {
      const payload = await postJson('/api/members/login', {
        email: document.getElementById('login-email').value,
        password: document.getElementById('login-password').value,
      });
      status.textContent = `${payload.member.displayName} 로그인 완료 · ${payload.member.membershipType}`;
    } catch (error) {
      status.textContent = error.message;
    }
  });

  document.getElementById('register-submit')?.addEventListener('click', async () => {
    const status = document.getElementById('member-status');
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const displayName = document.getElementById('register-name').value || 'KOSMO MEMBER';
    try {
      const payload = await postJson('/api/members/register', { email, password, displayName });
      status.textContent = `${payload.member.displayName} 회원가입 및 로그인 완료`;
      refreshMembers();
    } catch (error) {
      status.textContent = error.message;
    }
  });

  document.getElementById('members-refresh')?.addEventListener('click', refreshMembers);
  refreshMembers();
  document.addEventListener('click', event => {
    const modeButton = event.target.closest('[data-mode]');
    if (modeButton) {
      setMode(modeButton.dataset.mode);
      return;
    }
    const newsButton = event.target.closest('[data-news]');
    if (newsButton) renderNews(newsButton.dataset.news);
  });

  let lastT = performance.now();
  let elapsed = 0;
  let lastCandleTick = 0;
  let lastTickerTick = 0;
  let lastHeatTick = 0;
  let lastPhase = 0;

  function loop(now) {
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;
    elapsed += dt;

    const r = projection.rotate();
    projection.rotate([r[0] + dt * TWEAKS.rotationSpeed, r[1], r[2]]);

    if (countries) d3.select('#countries').selectAll('path').attr('d', path);
    if (TWEAKS.showGraticule) {
      d3.select('#graticule').attr('d', path(graticule)).style('display', null);
    } else {
      d3.select('#graticule').style('display', 'none');
    }
    if (!TWEAKS.fillCountries) {
      d3.select('#countries').selectAll('path').style('fill', 'transparent');
    } else {
      d3.select('#countries').selectAll('path').style('fill', null);
    }

    // Logos visibility
    document.querySelectorAll('.logos-marquee').forEach(row => {
      row.style.display = TWEAKS.showLogos ? '' : 'none';
    });

    updateMarkers();
    updateMarkerPulse(elapsed);
    updateWhirl(elapsed);

    if (now - lastCandleTick > 700) {
      lastCandleTick = now;
      const nc = genCandle(candles[candles.length - 1].c);
      candles.push(nc);
      if (candles.length > N_CANDLES) candles.shift();
      drawCandles();
      drawIndicators();
    }

    if (now - lastTickerTick > 1100) {
      lastTickerTick = now;
      if (!liveIndexMap.size) renderWatchlist();
      renderFx();
      renderMovers();
      const d = new Date();
      const t = fmtClock(d);
      document.getElementById('sess').textContent = t;
      const wlt = document.getElementById('wl-time'); if (wlt) wlt.textContent = t.slice(0, 8);
      document.getElementById('latency').textContent = `${10 + Math.floor(Math.random() * 12)} MS`;
    }

    if (now - lastHeatTick > 2400) {
      lastHeatTick = now;
      renderHeat();
    }

    if (elapsed - lastPhase > 3.2) {
      lastPhase = elapsed;
      const next = PHASES[(Math.floor(elapsed / 3.2)) % PHASES.length];
      document.getElementById('phase').textContent = next;
    }

    // screen label per second
    const sec = Math.floor(elapsed);
    const stageEl = document.querySelector('.globe-stage');
    if (stageEl && stageEl.dataset.screenLabel !== `Globe · ${sec}s`) {
      stageEl.dataset.screenLabel = `Globe · ${sec}s`;
    }

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(t => { lastT = t; requestAnimationFrame(loop); });
})();
