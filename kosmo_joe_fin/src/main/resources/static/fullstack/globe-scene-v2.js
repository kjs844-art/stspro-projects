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
    rotationSpeed: 13,
    showLabels: true,
    showWhirl: true,
    showGraticule: true,
    fillCountries: true,
    showLogos: true,
  });

  // ---------- CITIES with INDICES ----------
  const CITIES = [
    { id: 'NYC', name: 'NEW YORK',   lat: 40.71,  lon: -74.00, c: '#6ad8ff',
      indices: ['S&P 500', 'NASDAQ', 'DOW 30'] },
    { id: 'TYO', name: 'TOKYO',      lat: 35.68,  lon: 139.69, c: '#ff4d6d',
      indices: ['NIKKEI 225'] },
    { id: 'SEL', name: 'SEOUL',      lat: 37.5229, lon: 126.9249, c: '#ff4dff',
      indices: ['KOSPI'] },
    { id: 'SHA', name: 'SHANGHAI',   lat: 31.23,  lon: 121.47, c: '#ff7d4d',
      indices: ['SSE COMP'] },
    { id: 'SZX', name: 'SHENZHEN',   lat: 22.54,  lon: 114.06, c: '#ffb84d',
      indices: ['CSI 300'] },
    { id: 'HKG', name: 'HONG KONG',  lat: 22.32,  lon: 114.17, c: '#ffd84d',
      indices: ['HSI'] },
    { id: 'TPE', name: 'TAIPEI',     lat: 25.03,  lon: 121.56, c: '#4dffae',
      indices: ['TWSE'] },
    { id: 'SYD', name: 'SYDNEY',     lat: -33.87, lon: 151.21, c: '#2ee6a0',
      indices: ['ASX 200'] },
    { id: 'LON', name: 'LONDON',     lat: 51.50,  lon: -0.13,  c: '#cfdcff',
      indices: ['FTSE 100'] },
    { id: 'FRA', name: 'FRANKFURT',  lat: 50.11,  lon: 8.68,   c: '#ff9e4d',
      indices: ['DAX'] },
    { id: 'PAR', name: 'PARIS',      lat: 48.85,  lon: 2.35,   c: '#9d7cff',
      indices: ['CAC 40'] },
    { id: 'BOM', name: 'MUMBAI',     lat: 19.08,  lon: 72.88,  c: '#a4ff4d',
      indices: ['SENSEX'] },
    { id: 'SGP', name: 'SINGAPORE',  lat: 1.35,   lon: 103.81, c: '#ff5d6d',
      indices: ['STI'] },
    { id: 'TOR', name: 'TORONTO',    lat: 43.65,  lon: -79.38, c: '#ff7d7d',
      indices: ['TSX'] },
    { id: 'SAO', name: 'SAO PAULO',  lat: -23.55, lon: -46.63, c: '#ffd84d',
      indices: ['BOVESPA'] },
  ];

  const LABEL_OFFSETS = [
    { x: 50, y: -26 },
    { x: 62, y: -2 },
    { x: 46, y: 22 },
    { x: 28, y: 44 },
  ];

  const MARKET_SPOTS = CITIES.flatMap(city => {
    const mid = (city.indices.length - 1) / 2;
    return city.indices.map((indexName, index) => {
      const offset = LABEL_OFFSETS[index] || {
        x: 48,
        y: (index - mid) * 24,
      };
      return {
        ...city,
        id: `${city.id}-${indexName.replace(/[^A-Z0-9]+/gi, '-')}`,
        marketId: city.id,
        indexName,
        labelDx: offset.x,
        labelDy: offset.y,
      };
    });
  });

  const MARKET_REGION_LABEL = {
    NYC: 'US MARKET',
    TYO: 'JP MARKET',
    SEL: 'KR MARKET',
    SHA: 'CN MARKET',
    SZX: 'CN MARKET',
    HKG: 'HK MARKET',
    TPE: 'TW MARKET',
    SYD: 'AU MARKET',
    LON: 'UK MARKET',
    FRA: 'DE MARKET',
    PAR: 'FR MARKET',
    BOM: 'IN MARKET',
    SGP: 'SG MARKET',
    TOR: 'CA MARKET',
    SAO: 'BR MARKET',
  };

  const INDEX_FALLBACK_VALUE = {
    'FTSE 100': 8458.10,
    DAX: 19238.42,
    'CAC 40': 7541.30,
    SENSEX: 81421.30,
    STI: 3624.50,
    TSX: 25104.50,
    BOVESPA: 132484,
    TWSE: 22918.50,
  };

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

  // Globe paths use a 350 viewBox, while the marker overlay uses 540.
  // Scale projected lon/lat points so dots stay pinned to the same country surface.
  const MARKER_SCALE = 540 / 350;
  const GLOBE_CENTER = [270, 270];
  const GLOBE_R = 160 * MARKER_SCALE;

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
    .data(MARKET_SPOTS, d => d.id)
    .join('g')
    .attr('class', 'city')
    .style('--c', d => d.c);

  cityG.append('circle').attr('class', 'mk-pulse').attr('r', 3);
  cityG.append('circle').attr('class', 'mk-dot').attr('r', 3);
  cityG.append('line').attr('class', 'mk-beam');
  cityG.append('rect').attr('class', 'mk-tag-bg').attr('rx', 3);
  cityG.append('text').attr('class', 'mk-city');
  cityG.append('text').attr('class', 'mk-indices');
  cityG.append('title').text(d => `${d.name} · ${d.indexName}`);

  function projectCity(d) {
    const p3d = projection([d.lon, d.lat]);
    if (!p3d) return null;
    return [p3d[0] * MARKER_SCALE, p3d[1] * MARKER_SCALE];
  }

  function cityVisibility(d) {
    const r = projection.rotate();
    const center = [-r[0], -r[1]];
    const distance = d3.geoDistance([d.lon, d.lat], center);
    if (distance > Math.PI / 2) return 0;
    const edgeFade = (Math.PI / 2 - distance) / 0.18;
    return Math.max(0, Math.min(1, edgeFade));
  }

  function updateMarkers() {
    cityG.each(function (d) {
      const node = d3.select(this);
      const p = projectCity(d);
      const visible = cityVisibility(d);
      if (!p || visible <= 0) {
        node.style('opacity', 0).style('pointer-events', 'none');
        return;
      }
      const dx = p[0] - GLOBE_CENTER[0];
      const dy = p[1] - GLOBE_CENTER[1];
      const r = Math.hypot(dx, dy);
      const vis = Math.max(0, Math.min(1, (GLOBE_R - r) / 22 + 0.4));
      node.style('opacity', Math.min(vis, visible)).style('pointer-events', 'auto');

      node.select('.mk-dot').attr('cx', p[0]).attr('cy', p[1]);
      node.select('.mk-pulse').attr('cx', p[0]).attr('cy', p[1]);

      // Beam outward
      const outwardX = dx >= 0 ? 1 : -1;
      const out = [p[0] + outwardX * d.labelDx, p[1] + d.labelDy];
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
      const live = liveIndexMap.get(d.indexName);
      const fallback = WATCH.find(w => w.sym === d.indexName);
      const price = live && live.value ? Number(live.value) : fallback ? fallback.base : INDEX_FALLBACK_VALUE[d.indexName];
      const priceText = price.toLocaleString('en-US', { maximumFractionDigits: 2 });

      lbl.style('display', null)
        .text(`${MARKET_REGION_LABEL[d.marketId] || 'GLOBAL MARKET'} - ${d.name}`)
        .attr('text-anchor', anchor)
        .attr('x', anchorX)
        .attr('y', out[1] - 2);

      idxText.style('display', null)
        .text(`${d.indexName}  ${priceText}`)
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
    { sym: 'USD / JPY', base: 156.42,   c: '#6ad8ff' },
    { sym: 'USD / KRW', base: 1382.10,  c: '#ff4dff' },
    { sym: 'USD / CNY', base: 7.243,    c: '#ffb84d' },
    { sym: 'USD / HKD', base: 7.810,    c: '#ffd84d' },
    { sym: 'USD / TWD', base: 32.04,    c: '#4dffae' },
    { sym: 'USD / AUD', base: 1.534,    c: '#2ee6a0' },
    { sym: 'USD / EUR', base: 0.923,    c: '#cfdcff' },
    { sym: 'USD / GBP', base: 0.789,    c: '#a07cff' },
    { sym: 'USD / INR', base: 84.10,    c: '#a4ff4d' },
    { sym: 'USD / SGD', base: 1.342,    c: '#ff5d6d' },
    { sym: 'USD / CAD', base: 1.384,    c: '#ff7d7d' },
    { sym: 'USD / CHF', base: 0.882,    c: '#cfdcff' },
    { sym: 'BTC / USD', base: 102450,   c: '#ffd84d' },
    { sym: 'ETH / USD', base: 3892.40,  c: '#9d7cff' },
  ];
  const COMMODITIES = {
    ENERGY: [
      { sym: 'WTI CRUDE',   base: 73.42,   c: '#ff7d4d' },
      { sym: 'BRENT CRUDE', base: 76.15,   c: '#ff9e4d' },
      { sym: 'NAT GAS',     base: 2.84,    c: '#4dffae' },
      { sym: 'GASOLINE',    base: 2.18,    c: '#ffd84d' },
      { sym: 'HEATING OIL', base: 2.42,    c: '#ff5d6d' },
    ],
    METALS: [
      { sym: 'GOLD',        base: 2640.15, c: '#ffd84d' },
      { sym: 'SILVER',      base: 30.42,   c: '#c8c8c8' },
      { sym: 'COPPER',      base: 4.18,    c: '#ff7d4d' },
      { sym: 'PLATINUM',    base: 978.30,  c: '#e0e4ff' },
      { sym: 'PALLADIUM',   base: 1024.50, c: '#a07cff' },
    ],
    SOFT: [
      { sym: 'COFFEE',       base: 218.40,  c: '#c8813a' },
      { sym: 'ORANGE JUICE', base: 312.18,  c: '#ff8c00' },
      { sym: 'SUGAR',        base: 21.84,   c: '#e9efff' },
      { sym: 'COCOA',        base: 9840,    c: '#8b5e3c' },
      { sym: 'WHEAT',        base: 548.20,  c: '#ffd84d' },
      { sym: 'CORN',         base: 428.75,  c: '#ffce00' },
      { sym: 'SOYBEANS',     base: 1024.50, c: '#a4ff4d' },
      { sym: 'COTTON',       base: 68.42,   c: '#d0d8ff' },
    ],
  };

  function pct() { return (Math.random() * 2 - 0.6); }

  let currentFxCat = 'FX';
  let currentRegion = 'ALL';
  let currentChartRegion = null; // null = global movers; 'US'/'JP'/etc = filtered
  let currentChartContext = { title: 'NIKKEI 225', base: 38461.55, color: '#ff4d6d', region: 'JP' };
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
  function fxRow(w) {
    const c   = (Math.random() * 1.2 - 0.5);
    const cls = c >= 0 ? 'up' : 'down';
    const arrow = c >= 0 ? '▲' : '▼';
    const cur = (w.base * (1 + c / 100)).toLocaleString('en-US', { maximumFractionDigits: w.base < 10 ? 4 : 2 });
    const dot = w.c || 'var(--accent)';
    return `<div class="ticker-row ${cls}" data-sym="${w.sym}" data-base="${w.base}" data-color="${dot}">
      <span class="name"><span class="sw" style="background:${dot};box-shadow:0 0 5px ${dot}80"></span>${w.sym}</span>
      <span class="val">${cur}</span>
      <span class="chg">${arrow} ${Math.abs(c).toFixed(2)}%</span>
    </div>`;
  }

  function renderFx() {
    const el = document.getElementById('fx-list');
    if (!el) return;
    if (currentFxCat === 'FX') {
      el.innerHTML = FX.map(fxRow).join('');
    } else {
      const items = COMMODITIES[currentFxCat] || [];
      el.innerHTML = items.map(fxRow).join('');
    }
  }

  // ---------- LOGO MARQUEE ----------
  // Real logos via Google's favicon service (works for any domain). Monogram fallback if a logo fails.
  const COMPANIES = [
    // ---- US ----
    { t: 'AAPL',   n: 'Apple',            d: 'apple.com',             bg: '#000',    fg: '#fff',     g: 'A',  r: 'US' },
    { t: 'MSFT',   n: 'Microsoft',        d: 'microsoft.com',         bg: '#0078d4', fg: '#fff',     g: '⊞', r: 'US' },
    { t: 'NVDA',   n: 'Nvidia',           d: 'nvidia.com',            bg: '#76b900', fg: '#0b0b0b',  g: 'N',  r: 'US' },
    { t: 'GOOGL',  n: 'Alphabet',         d: 'abc.xyz',               bg: '#4285f4', fg: '#fff',     g: 'G',  r: 'US' },
    { t: 'AMZN',   n: 'Amazon',           d: 'amazon.com',            bg: '#ff9900', fg: '#0b0b0b',  g: 'a',  r: 'US' },
    { t: 'META',   n: 'Meta',             d: 'about.meta.com',        bg: '#0866ff', fg: '#fff',     g: '∞', r: 'US' },
    { t: 'TSLA',   n: 'Tesla',            d: 'tesla.com',             bg: '#cc0000', fg: '#fff',     g: 'T',  r: 'US' },
    { t: 'NFLX',   n: 'Netflix',          d: 'netflix.com',           bg: '#e50914', fg: '#fff',     g: 'N',  r: 'US' },
    { t: 'AVGO',   n: 'Broadcom',         d: 'broadcom.com',          bg: '#cc092f', fg: '#fff',     g: 'B',  r: 'US' },
    { t: 'JPM',    n: 'JPMorgan',         d: 'jpmorganchase.com',     bg: '#1f3a5c', fg: '#fff',     g: 'J',  r: 'US' },
    { t: 'BRK.B',  n: 'Berkshire',        d: 'berkshirehathaway.com', bg: '#a30101', fg: '#fff',     g: 'B',  r: 'US' },
    { t: 'V',      n: 'Visa',             d: 'visa.com',              bg: '#1a1f71', fg: '#fff',     g: 'V',  r: 'US' },
    { t: 'MA',     n: 'Mastercard',       d: 'mastercard.com',        bg: '#cc0000', fg: '#fff',     g: 'M',  r: 'US' },
    { t: 'WMT',    n: 'Walmart',          d: 'walmart.com',           bg: '#0071ce', fg: '#ffce00',  g: '✦', r: 'US' },
    { t: 'AMD',    n: 'AMD',              d: 'amd.com',               bg: '#ed1c24', fg: '#fff',     g: 'A',  r: 'US' },
    { t: 'INTC',   n: 'Intel',            d: 'intel.com',             bg: '#0071c5', fg: '#fff',     g: 'i',  r: 'US' },
    { t: 'ARM',    n: 'Arm',              d: 'arm.com',               bg: '#0091bd', fg: '#fff',     g: 'a',  r: 'US' },
    { t: 'ORCL',   n: 'Oracle',           d: 'oracle.com',            bg: '#c74634', fg: '#fff',     g: 'O',  r: 'US' },
    { t: 'CRM',    n: 'Salesforce',       d: 'salesforce.com',        bg: '#00a1e0', fg: '#fff',     g: '☁', r: 'US' },
    { t: 'PLTR',   n: 'Palantir',         d: 'palantir.com',          bg: '#0b0b0b', fg: '#fff',     g: 'P',  r: 'US' },
    { t: 'ADBE',   n: 'Adobe',            d: 'adobe.com',             bg: '#fa0f00', fg: '#fff',     g: 'A',  r: 'US' },
    { t: 'COIN',   n: 'Coinbase',         d: 'coinbase.com',          bg: '#0052ff', fg: '#fff',     g: 'C',  r: 'US' },
    // ---- JP ----
    { t: '7203',   n: 'Toyota',           d: 'toyota.com',            bg: '#eb0a1e', fg: '#fff',     g: 'T',  r: 'JP' },
    { t: '6758',   n: 'Sony',             d: 'sony.com',              bg: '#000',    fg: '#fff',     g: 'S',  r: 'JP' },
    { t: '6861',   n: 'Keyence',          d: 'keyence.com',           bg: '#003a70', fg: '#fff',     g: 'K',  r: 'JP' },
    { t: '8035',   n: 'Tokyo Electron',   d: 'tel.com',               bg: '#0067b3', fg: '#fff',     g: 'T',  r: 'JP' },
    { t: '9984',   n: 'SoftBank',         d: 'softbank.jp',           bg: '#b5b5b5', fg: '#0b0b0b',  g: 'S',  r: 'JP' },
    { t: '7974',   n: 'Nintendo',         d: 'nintendo.com',          bg: '#e60012', fg: '#fff',     g: 'N',  r: 'JP' },
    { t: '6098',   n: 'Recruit',          d: 'recruit-holdings.com',  bg: '#ff9000', fg: '#fff',     g: 'R',  r: 'JP' },
    { t: '8306',   n: 'MUFG',             d: 'mufg.jp',               bg: '#c11920', fg: '#fff',     g: 'M',  r: 'JP' },
    { t: '7267',   n: 'Honda',            d: 'honda.com',             bg: '#cc0000', fg: '#fff',     g: 'H',  r: 'JP' },
    { t: '6501',   n: 'Hitachi',          d: 'hitachi.com',           bg: '#e60026', fg: '#fff',     g: 'H',  r: 'JP' },
    { t: '6367',   n: 'Daikin',           d: 'daikin.com',            bg: '#0066b3', fg: '#fff',     g: 'D',  r: 'JP' },
    { t: '9432',   n: 'NTT',              d: 'ntt.com',               bg: '#003087', fg: '#fff',     g: 'N',  r: 'JP' },
    { t: '9433',   n: 'KDDI',             d: 'kddi.com',              bg: '#009ae0', fg: '#fff',     g: 'K',  r: 'JP' },
    { t: '7751',   n: 'Canon',            d: 'canon.com',             bg: '#cc0000', fg: '#fff',     g: 'C',  r: 'JP' },
    { t: '4063',   n: 'Shin-Etsu',        d: 'shinetsu.co.jp',        bg: '#003087', fg: '#fff',     g: 'S',  r: 'JP' },
    { t: '6954',   n: 'Fanuc',            d: 'fanuc.com',             bg: '#ffd700', fg: '#0b0b0b',  g: 'F',  r: 'JP' },
    { t: '4502',   n: 'Takeda',           d: 'takeda.com',            bg: '#c00000', fg: '#fff',     g: 'T',  r: 'JP' },
    { t: '8316',   n: 'Sumitomo Mitsui',  d: 'smfg.co.jp',            bg: '#009a44', fg: '#fff',     g: 'S',  r: 'JP' },
    // ---- KR ----
    { t: '005930', n: 'Samsung',          d: 'samsung.com',           bg: '#1428a0', fg: '#fff',     g: 'S',  r: 'KR' },
    { t: '000660', n: 'SK Hynix',         d: 'skhynix.com',           bg: '#e60012', fg: '#fff',     g: 'H',  r: 'KR' },
    { t: '035420', n: 'NAVER',            d: 'navercorp.com',         bg: '#03c75a', fg: '#fff',     g: 'N',  r: 'KR' },
    { t: '035720', n: 'Kakao',            d: 'kakaocorp.com',         bg: '#fee500', fg: '#3c1e1e',  g: 'K',  r: 'KR' },
    { t: '005380', n: 'Hyundai Motor',    d: 'hyundai.com',           bg: '#002c5f', fg: '#fff',     g: 'H',  r: 'KR' },
    { t: '000270', n: 'Kia',              d: 'kia.com',               bg: '#05141f', fg: '#fff',     g: 'K',  r: 'KR' },
    { t: '066570', n: 'LG Electronics',   d: 'lge.com',               bg: '#a50034', fg: '#fff',     g: 'L',  r: 'KR' },
    { t: '017670', n: 'SK Telecom',       d: 'sktelecom.com',         bg: '#e60026', fg: '#fff',     g: 'S',  r: 'KR' },
    { t: '105560', n: 'KB Financial',     d: 'kbfg.com',              bg: '#ffbc00', fg: '#0b0b0b',  g: 'K',  r: 'KR' },
    { t: '055550', n: 'Shinhan',          d: 'shinhangroup.com',      bg: '#0062ae', fg: '#fff',     g: 'S',  r: 'KR' },
    { t: '068270', n: 'Celltrion',        d: 'celltrion.com',         bg: '#003087', fg: '#fff',     g: 'C',  r: 'KR' },
    { t: '051910', n: 'LG Chem',          d: 'lgchem.com',            bg: '#a50034', fg: '#fff',     g: 'L',  r: 'KR' },
    { t: '207940', n: 'Samsung Biologics',d: 'samsungbiologics.com',  bg: '#1428a0', fg: '#fff',     g: 'S',  r: 'KR' },
    { t: '086520', n: 'Ecopro BM',        d: 'ecoprobm.co.kr',        bg: '#00703c', fg: '#fff',     g: 'E',  r: 'KR' },
    // ---- TW (global only) ----
    { t: 'TSM',    n: 'TSMC',             d: 'tsmc.com',              bg: '#cc0000', fg: '#fff',     g: 'T',  r: 'TW' },
    { t: '2330',   n: 'TSMC TW',          d: 'tsmc.com',              bg: '#a40000', fg: '#fff',     g: 't',  r: 'TW' },
    { t: '2317',   n: 'Hon Hai',          d: 'honhai.com',            bg: '#003595', fg: '#fff',     g: 'H',  r: 'TW' },
    // ---- CN ----
    { t: 'BABA',   n: 'Alibaba',          d: 'alibabagroup.com',      bg: '#ff6a00', fg: '#fff',     g: 'A',  r: 'CN' },
    { t: 'PDD',    n: 'PDD',              d: 'pddglobal.com',         bg: '#e02020', fg: '#fff',     g: 'P',  r: 'CN' },
    { t: 'BIDU',   n: 'Baidu',            d: 'baidu.com',             bg: '#2932e1', fg: '#fff',     g: 'B',  r: 'CN' },
    { t: 'JD',     n: 'JD.com',           d: 'jd.com',                bg: '#e1251b', fg: '#fff',     g: 'J',  r: 'CN' },
    { t: '600519', n: 'Moutai',           d: 'moutaichina.com',       bg: '#a30101', fg: '#ffce00',  g: 'M',  r: 'CN' },
    { t: '601318', n: 'Ping An',          d: 'pingan.com',            bg: '#e60012', fg: '#fff',     g: 'P',  r: 'CN' },
    { t: 'NTES',   n: 'NetEase',          d: 'netease.com',           bg: '#c00000', fg: '#fff',     g: 'N',  r: 'CN' },
    { t: 'NIO',    n: 'NIO',              d: 'nio.com',               bg: '#00bfa5', fg: '#fff',     g: 'N',  r: 'CN' },
    { t: 'LI',     n: 'Li Auto',          d: 'lixiang.com',           bg: '#0054a6', fg: '#fff',     g: 'L',  r: 'CN' },
    { t: 'XPEV',   n: 'XPeng',            d: 'xiaopeng.com',          bg: '#00a0e9', fg: '#fff',     g: 'X',  r: 'CN' },
    { t: '601988', n: 'Bank of China',    d: 'boc.cn',                bg: '#cc0000', fg: '#ffce00',  g: 'B',  r: 'CN' },
    { t: '000858', n: 'Wuliangye',        d: 'wuliangye.com.cn',      bg: '#8b0000', fg: '#ffce00',  g: 'W',  r: 'CN' },
    { t: '601166', n: 'Industrial Bank',  d: 'cib.com.cn',            bg: '#c00000', fg: '#fff',     g: 'I',  r: 'CN' },
    // ---- HK ----
    { t: '0700',   n: 'Tencent',          d: 'tencent.com',           bg: '#1a8b6e', fg: '#fff',     g: 'T',  r: 'HK' },
    { t: '1398',   n: 'ICBC',             d: 'icbc-ltd.com',          bg: '#a30101', fg: '#fff',     g: 'I',  r: 'HK' },
    { t: '9988',   n: 'Alibaba HK',       d: 'alibabagroup.com',      bg: '#ff6a00', fg: '#fff',     g: 'A',  r: 'HK' },
    { t: '1810',   n: 'Xiaomi',           d: 'mi.com',                bg: '#ff6900', fg: '#fff',     g: 'X',  r: 'HK' },
    { t: '3690',   n: 'Meituan',          d: 'meituan.com',           bg: '#ffd100', fg: '#0b0b0b',  g: 'M',  r: 'HK' },
    { t: '9618',   n: 'JD-SW',            d: 'jd.com',                bg: '#e1251b', fg: '#fff',     g: 'J',  r: 'HK' },
    { t: '0941',   n: 'China Mobile',     d: 'chinamobileltd.com',    bg: '#009fdb', fg: '#fff',     g: 'C',  r: 'HK' },
    { t: '2020',   n: 'ANTA Sports',      d: 'antagroup.com',         bg: '#cc0000', fg: '#fff',     g: 'A',  r: 'HK' },
    { t: '6862',   n: 'Haidilao',         d: 'haidilao.com',          bg: '#e60012', fg: '#fff',     g: 'H',  r: 'HK' },
    { t: '2388',   n: 'BOC Hong Kong',    d: 'bochk.com',             bg: '#cc0000', fg: '#ffce00',  g: 'B',  r: 'HK' },
    { t: '1177',   n: 'Sino Biopharm',    d: 'sinobiopharm.com',      bg: '#005baa', fg: '#fff',     g: 'S',  r: 'HK' },
    { t: '2318',   n: 'Ping An H',        d: 'pingan.com',            bg: '#e60012', fg: '#fff',     g: 'P',  r: 'HK' },
    // ---- UK ----
    { t: 'SHEL',   n: 'Shell',            d: 'shell.com',             bg: '#fbce07', fg: '#0b0b0b',  g: 'S',  r: 'UK' },
    { t: 'BP',     n: 'BP',               d: 'bp.com',                bg: '#009a44', fg: '#ffffe0',  g: 'B',  r: 'UK' },
    { t: 'HSBC',   n: 'HSBC',             d: 'hsbc.com',              bg: '#db0011', fg: '#fff',     g: 'H',  r: 'UK' },
    { t: 'AZN',    n: 'AstraZeneca',      d: 'astrazeneca.com',       bg: '#003680', fg: '#fff',     g: 'A',  r: 'UK' },
    { t: 'GSK',    n: 'GSK',              d: 'gsk.com',               bg: '#f36633', fg: '#fff',     g: 'G',  r: 'UK' },
    { t: 'ULVR',   n: 'Unilever',         d: 'unilever.com',          bg: '#1a4284', fg: '#fff',     g: 'U',  r: 'UK' },
    { t: 'DGE',    n: 'Diageo',           d: 'diageo.com',            bg: '#0b2d6e', fg: '#fff',     g: 'D',  r: 'UK' },
    { t: 'BATS',   n: 'BAT',              d: 'bat.com',               bg: '#1f3a5c', fg: '#fff',     g: 'B',  r: 'UK' },
    { t: 'LLOY',   n: 'Lloyds',           d: 'lloydsbank.com',        bg: '#024731', fg: '#fff',     g: 'L',  r: 'UK' },
    { t: 'BARC',   n: 'Barclays',         d: 'barclays.com',          bg: '#00aeef', fg: '#fff',     g: 'B',  r: 'UK' },
    { t: 'VOD',    n: 'Vodafone',         d: 'vodafone.com',          bg: '#e60000', fg: '#fff',     g: 'V',  r: 'UK' },
    { t: 'NWG',    n: 'NatWest',          d: 'natwest.com',           bg: '#500074', fg: '#fff',     g: 'N',  r: 'UK' },
    { t: 'LSEG',   n: 'London Stock Ex',  d: 'lseg.com',              bg: '#003087', fg: '#fff',     g: 'L',  r: 'UK' },
    // ---- DE ----
    { t: 'SAP',    n: 'SAP',              d: 'sap.com',               bg: '#0faaff', fg: '#0b0b0b',  g: 'S',  r: 'DE' },
    { t: 'BMW',    n: 'BMW',              d: 'bmwgroup.com',           bg: '#1c69d4', fg: '#fff',     g: 'B',  r: 'DE' },
    { t: 'SIE',    n: 'Siemens',          d: 'siemens.com',           bg: '#009999', fg: '#fff',     g: 'S',  r: 'DE' },
    { t: 'BAYN',   n: 'Bayer',            d: 'bayer.com',             bg: '#00bcff', fg: '#fff',     g: 'B',  r: 'DE' },
    { t: 'ASML',   n: 'ASML',             d: 'asml.com',              bg: '#1d4ed8', fg: '#fff',     g: 'A',  r: 'DE' },
    { t: 'MC',     n: 'LVMH',             d: 'lvmh.com',              bg: '#0b0b0b', fg: '#c9a96e',  g: 'L',  r: 'DE' },
    { t: 'OR',     n: 'LOreal',           d: 'loreal.com',            bg: '#cc0a14', fg: '#fff',     g: 'L',  r: 'DE' },
    { t: 'NESN',   n: 'Nestle',           d: 'nestle.com',            bg: '#1c2e58', fg: '#fff',     g: 'N',  r: 'DE' },
    { t: 'MBG',    n: 'Mercedes-Benz',    d: 'mercedes-benz.com',     bg: '#222',    fg: '#c0c0c0',  g: 'M',  r: 'DE' },
    { t: 'VOW3',   n: 'Volkswagen',       d: 'volkswagen.com',        bg: '#001e50', fg: '#fff',     g: 'V',  r: 'DE' },
    { t: 'ALV',    n: 'Allianz',          d: 'allianz.com',           bg: '#003781', fg: '#fff',     g: 'A',  r: 'DE' },
    { t: 'DTE',    n: 'Deutsche Telekom', d: 'telekom.com',           bg: '#e20074', fg: '#fff',     g: 'T',  r: 'DE' },
    { t: 'ADS',    n: 'Adidas',           d: 'adidas.com',            bg: '#000',    fg: '#fff',     g: 'A',  r: 'DE' },
    { t: 'TTE',    n: 'TotalEnergies',    d: 'totalenergies.com',     bg: '#ef3340', fg: '#fff',     g: 'T',  r: 'DE' },
    { t: 'ROG',    n: 'Roche',            d: 'roche.com',             bg: '#0066cc', fg: '#fff',     g: 'R',  r: 'DE' },
    { t: 'NOVN',   n: 'Novartis',         d: 'novartis.com',          bg: '#0460a9', fg: '#fff',     g: 'N',  r: 'DE' },
    // ---- AU ----
    { t: 'BHP',    n: 'BHP',              d: 'bhp.com',               bg: '#e35205', fg: '#fff',     g: 'B',  r: 'AU' },
    { t: 'CBA',    n: 'Commonwealth',     d: 'commbank.com.au',       bg: '#ffcc00', fg: '#0b0b0b',  g: 'C',  r: 'AU' },
    { t: 'RIO',    n: 'Rio Tinto',        d: 'riotinto.com',          bg: '#00a3e0', fg: '#fff',     g: 'R',  r: 'AU' },
    { t: 'CSL',    n: 'CSL Limited',      d: 'csl.com',               bg: '#1c3f7e', fg: '#fff',     g: 'C',  r: 'AU' },
    { t: 'WBC',    n: 'Westpac',          d: 'westpac.com.au',        bg: '#da1710', fg: '#fff',     g: 'W',  r: 'AU' },
    { t: 'MQG',    n: 'Macquarie',        d: 'macquarie.com',         bg: '#003d6e', fg: '#fff',     g: 'M',  r: 'AU' },
    { t: 'ANZ',    n: 'ANZ Bank',         d: 'anz.com',               bg: '#007bc2', fg: '#fff',     g: 'A',  r: 'AU' },
    { t: 'NAB',    n: 'NAB',              d: 'nab.com.au',            bg: '#cc0000', fg: '#fff',     g: 'N',  r: 'AU' },
    { t: 'WES',    n: 'Wesfarmers',       d: 'wesfarmers.com.au',     bg: '#1a3c6e', fg: '#fff',     g: 'W',  r: 'AU' },
    { t: 'WOW',    n: 'Woolworths',       d: 'woolworths.com.au',     bg: '#00914e', fg: '#fff',     g: 'W',  r: 'AU' },
    { t: 'FMG',    n: 'Fortescue',        d: 'fmgl.com.au',           bg: '#e87722', fg: '#fff',     g: 'F',  r: 'AU' },
    { t: 'GMG',    n: 'Goodman Group',    d: 'goodmangroup.com',      bg: '#e11f26', fg: '#fff',     g: 'G',  r: 'AU' },
    // ---- IN ----
    { t: 'RELI',   n: 'Reliance',         d: 'ril.com',               bg: '#0066b3', fg: '#fff',     g: 'R',  r: 'IN' },
    { t: 'TCS',    n: 'Tata Consultancy', d: 'tcs.com',               bg: '#7d3c98', fg: '#fff',     g: 'T',  r: 'IN' },
    { t: 'INFY',   n: 'Infosys',          d: 'infosys.com',           bg: '#007cc3', fg: '#fff',     g: 'I',  r: 'IN' },
    { t: 'HDB',    n: 'HDFC Bank',        d: 'hdfcbank.com',          bg: '#004b8d', fg: '#fff',     g: 'H',  r: 'IN' },
    { t: 'WIPRO',  n: 'Wipro',            d: 'wipro.com',             bg: '#341f5a', fg: '#fff',     g: 'W',  r: 'IN' },
    { t: 'IBN',    n: 'ICICI Bank',       d: 'icicibank.com',         bg: '#f57f20', fg: '#fff',     g: 'I',  r: 'IN' },
    { t: 'AXSB',   n: 'Axis Bank',        d: 'axisbank.com',          bg: '#800000', fg: '#fff',     g: 'A',  r: 'IN' },
    { t: 'BAJF',   n: 'Bajaj Finance',    d: 'bajajfinserv.in',       bg: '#003087', fg: '#fff',     g: 'B',  r: 'IN' },
    { t: 'HUL',    n: 'HUL',              d: 'hul.co.in',             bg: '#1a4284', fg: '#fff',     g: 'H',  r: 'IN' },
    { t: 'MARUTI', n: 'Maruti Suzuki',    d: 'marutisuzuki.com',      bg: '#003087', fg: '#fff',     g: 'M',  r: 'IN' },
    { t: 'SUNP',   n: 'Sun Pharma',       d: 'sunpharma.com',         bg: '#ef6c00', fg: '#fff',     g: 'S',  r: 'IN' },
    { t: 'LTIM',   n: 'LTIMindtree',      d: 'ltimindtree.com',       bg: '#007733', fg: '#fff',     g: 'L',  r: 'IN' },
    // ---- SG ----
    { t: 'D05',    n: 'DBS Bank',         d: 'dbs.com',               bg: '#da291c', fg: '#fff',     g: 'D',  r: 'SG' },
    { t: 'Z74',    n: 'Singtel',          d: 'singtel.com',           bg: '#ed1c24', fg: '#fff',     g: 'S',  r: 'SG' },
    { t: 'U11',    n: 'UOB',              d: 'uobgroup.com',          bg: '#003b6f', fg: '#fff',     g: 'U',  r: 'SG' },
    { t: 'GRAB',   n: 'Grab',             d: 'grab.com',              bg: '#00b14f', fg: '#fff',     g: 'G',  r: 'SG' },
    { t: 'O39',    n: 'OCBC Bank',        d: 'ocbc.com',              bg: '#e30000', fg: '#fff',     g: 'O',  r: 'SG' },
    { t: 'SE',     n: 'Sea Limited',      d: 'sea.com',               bg: '#ee2e24', fg: '#fff',     g: 'S',  r: 'SG' },
    { t: 'C09',    n: 'CapitaLand',       d: 'capitaland.com',        bg: '#007b5e', fg: '#fff',     g: 'C',  r: 'SG' },
    { t: 'BN4',    n: 'Keppel Corp',      d: 'kepcorp.com',           bg: '#003087', fg: '#fff',     g: 'K',  r: 'SG' },
    // ---- CA ----
    { t: 'SHOP',   n: 'Shopify',          d: 'shopify.com',           bg: '#96bf48', fg: '#fff',     g: 'S',  r: 'CA' },
    { t: 'RY',     n: 'Royal Bank',       d: 'rbc.com',               bg: '#003168', fg: '#ffd700',  g: 'R',  r: 'CA' },
    { t: 'TD',     n: 'TD Bank',          d: 'td.com',                bg: '#34a853', fg: '#fff',     g: 'T',  r: 'CA' },
    { t: 'CNR',    n: 'CN Rail',          d: 'cn.ca',                 bg: '#e31837', fg: '#fff',     g: 'C',  r: 'CA' },
    { t: 'BMO',    n: 'Bank of Montreal', d: 'bmo.com',               bg: '#1a3767', fg: '#fff',     g: 'B',  r: 'CA' },
    { t: 'BNS',    n: 'Scotiabank',       d: 'scotiabank.com',        bg: '#c00000', fg: '#fff',     g: 'S',  r: 'CA' },
    { t: 'ENB',    n: 'Enbridge',         d: 'enbridge.com',          bg: '#e31837', fg: '#fff',     g: 'E',  r: 'CA' },
    { t: 'SU',     n: 'Suncor',           d: 'suncor.com',            bg: '#e4a000', fg: '#0b0b0b',  g: 'S',  r: 'CA' },
    { t: 'MFC',    n: 'Manulife',         d: 'manulife.com',          bg: '#008145', fg: '#fff',     g: 'M',  r: 'CA' },
    { t: 'CP',     n: 'CP Railway',       d: 'cpr.ca',                bg: '#8b0000', fg: '#fff',     g: 'C',  r: 'CA' },
    // ---- BR ----
    { t: 'VALE3',  n: 'Vale',             d: 'vale.com',              bg: '#007e5e', fg: '#fff',     g: 'V',  r: 'BR' },
    { t: 'PETR4',  n: 'Petrobras',        d: 'petrobras.com.br',      bg: '#006400', fg: '#ffd700',  g: 'P',  r: 'BR' },
    { t: 'ITUB4',  n: 'Itau Unibanco',    d: 'itau.com.br',           bg: '#ec7000', fg: '#fff',     g: 'I',  r: 'BR' },
    { t: 'B3SA3',  n: 'B3 Exchange',      d: 'b3.com.br',             bg: '#f36900', fg: '#fff',     g: 'B',  r: 'BR' },
    { t: 'ABEV3',  n: 'AmBev',            d: 'ambev.com.br',          bg: '#ffc200', fg: '#0b0b0b',  g: 'A',  r: 'BR' },
    { t: 'BBDC4',  n: 'Bradesco',         d: 'bradesco.com.br',       bg: '#cc0000', fg: '#fff',     g: 'B',  r: 'BR' },
    { t: 'WEGE3',  n: 'WEG',              d: 'weg.net',               bg: '#0066b3', fg: '#fff',     g: 'W',  r: 'BR' },
    { t: 'RENT3',  n: 'Localiza',         d: 'localiza.com',          bg: '#00a651', fg: '#fff',     g: 'L',  r: 'BR' },
  ];

  function renderLogos(regionFilter) {
    const rows = [
      document.getElementById('logos'),
      document.getElementById('logos-row-2'),
      document.getElementById('logos-row-3'),
    ].filter(Boolean);
    if (!rows.length) return;

    const pool = regionFilter
      ? COMPANIES.filter(c => c.r === regionFilter)
      : COMPANIES;
    const src = pool.length >= 2 ? pool : COMPANIES;

    const chip = c => {
      const change = (Math.random() * 4 - 1.4);
      const cls = change >= 0 ? 'up' : 'down';
      const arrow = change >= 0 ? '▲' : '▼';
      const monogram = c.g || c.n[0];
      const imgSrc = `https://www.google.com/s2/favicons?domain=${c.d}&sz=64`;
      const onerr = "this.style.display='none';this.nextElementSibling.style.display='grid';";
      return `<div class="logo-chip" data-ticker="${c.t}" data-name="${c.n}" data-bg="${c.bg}">
        <span class="logo" style="--mono-bg:${c.bg};--mono-fg:${c.fg}">
          <img src="${imgSrc}" alt="${c.n}" onerror="${onerr}"/>
          <span class="mono" style="display:none;">${monogram}</span>
        </span>
        <span class="ticker">${c.t}</span>
        <span class="name">${c.n}</span>
        <span class="pp ${cls}">${arrow}${Math.abs(change).toFixed(2)}%</span>
      </div>`;
    };

    rows.forEach((row, index) => {
      if (regionFilter) {
        row.innerHTML = src.concat(src).map(chip).join('');
      } else {
        const offset = index * 7;
        const rotated = src.slice(offset).concat(src.slice(0, offset));
        row.innerHTML = rotated.concat(rotated).map(chip).join('');
      }
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

  const INDEX_PROFILE = {
    'NASDAQ': { market: 'US MARKET · NEW YORK', summary: '미국 기술주와 성장주 흐름을 가장 빠르게 보여주는 대표 지수입니다. AI, 반도체, 플랫폼 기업 비중이 커서 글로벌 성장주 분위기를 읽기 좋습니다.', tickers: ['NVDA', 'AAPL', 'MSFT', 'META', 'AMZN', 'GOOGL', 'AVGO', 'NFLX', 'TSLA', 'AMD', 'INTC', 'ADBE'], heat: 'NASDAQ' },
    'S&P 500': { market: 'US MARKET · NEW YORK', summary: '미국 대형주 500개를 묶은 가장 표준적인 미국 증시 대표 지수입니다. 기술, 금융, 헬스케어, 소비재 등 전체 시장 체력을 볼 때 씁니다.', tickers: ['AAPL', 'MSFT', 'NVDA', 'AMZN', 'META', 'GOOGL', 'BRK.B', 'JPM', 'V', 'MA', 'WMT', 'AVGO'], heat: 'S&P 500' },
    'DOW 30': { market: 'US MARKET · NEW YORK', summary: '미국을 대표하는 우량 대기업 30개 중심의 지수입니다. 오래된 산업 대표주와 대형 가치주의 분위기를 확인할 때 좋습니다.', tickers: ['AAPL', 'MSFT', 'JPM', 'V', 'WMT', 'AMZN', 'CRM', 'INTC', 'ORCL', 'IBM', 'MCD', 'DIS'], heat: 'DOW 30' },
    'NYSE': { market: 'US MARKET · NEW YORK', summary: '뉴욕증권거래소 상장 종목들의 흐름을 보는 시장 지표입니다. 전통 대형주, 금융, 산업재 비중이 커서 나스닥과 다른 색깔을 보여줍니다.', tickers: ['JPM', 'BRK.B', 'V', 'MA', 'WMT', 'ORCL', 'CRM', 'BHP', 'RIO', 'SHEL', 'BP', 'HSBC'], heat: 'NYSE' },
    'RUSSELL 3K': { market: 'US MARKET · SEATTLE', summary: '미국 상장 기업 대부분을 넓게 담는 광범위 지수입니다. 대형주뿐 아니라 중소형주까지 포함해 미국 전체 주식시장의 폭을 봅니다.', tickers: ['NVDA', 'AAPL', 'MSFT', 'AMZN', 'META', 'TSLA', 'COIN', 'PLTR', 'AMD', 'CRM', 'ADBE', 'ORCL'], heat: 'RUSSELL 3000' },
    'RUSSELL 2K': { market: 'US MARKET · SEATTLE', summary: '미국 중소형주 중심 지수입니다. 금리, 경기민감도, 내수 심리에 더 예민하게 움직여 대형주와 비교해서 봅니다.', tickers: ['COIN', 'PLTR', 'AMD', 'CRM', 'ADBE', 'INTC', 'ARM', 'ORCL'], heat: 'RUSSELL 2000' },
    'NIKKEI 225': { market: 'JP MARKET · TOKYO', summary: '도쿄증권거래소 대표 대형주 225개로 일본 경기와 수출기업 흐름을 빠르게 보는 핵심 지수입니다.', tickers: ['7203', '6758', '6861', '8035', '9984', '7974', '6098', '8306'], heat: 'NIKKEI 225' },
    'TOPIX': { market: 'JP MARKET · TOKYO', summary: '도쿄증권거래소 프라임 시장 전반을 반영하는 지수입니다. 니케이보다 일본 시장 전체의 폭을 보기 좋습니다.', tickers: ['7203', '6758', '6861', '8035', '9984', '7974', '6098', '8306'], heat: 'TOPIX' },
    'JASDAQ': { market: 'JP MARKET · TOKYO', summary: '일본 신흥·중소형 성장주 흐름을 보는 지수 성격입니다. 대형 수출주보다 변동성이 커서 시장 온도계처럼 볼 수 있습니다.', tickers: ['7974', '6098', '9984', '6758', '6861', '8035'], heat: 'JASDAQ' },
    'KOSPI': { market: 'KR MARKET · YEOUIDO', summary: '한국 유가증권시장 대표 지수입니다. 반도체, 자동차, 인터넷, 2차전지 등 한국 대형주의 흐름을 한 번에 봅니다.', tickers: ['005930', '000660', '005380', '035420', '051910', '035720'], heat: 'KOSPI' },
    'KOSDAQ': { market: 'KR MARKET · YEOUIDO', summary: '한국 성장주와 중소형주 중심 지수입니다. 바이오, 게임, IT 부품처럼 변동성이 큰 업종 분위기를 볼 때 좋습니다.', tickers: ['035720', '035420', '000660', '051910', '005930', '005380'], heat: 'KOSDAQ' },
    'KOSPI 200': { market: 'KR MARKET · YEOUIDO', summary: '한국 대표 대형주 200개를 묶은 파생상품 기준 지수입니다. 선물, 옵션, ETF 흐름과 함께 자주 봅니다.', tickers: ['005930', '000660', '005380', '035420', '051910', '035720'], heat: 'KOSPI 200' },
    'SSE COMP': { market: 'CN MARKET · SHANGHAI', summary: '상하이증권거래소 전체 흐름을 보는 중국 본토 대표 지수입니다. 금융, 소비, 국유기업 흐름이 크게 반영됩니다.', tickers: ['600519', '601318', '1398', 'BABA', 'BIDU', 'PDD', 'JD'], heat: 'SSE COMP' },
    'STAR 50': { market: 'CN MARKET · SHANGHAI', summary: '중국 과학기술혁신판 핵심 50개 종목 흐름입니다. 반도체, 첨단 제조, 신성장 산업을 볼 때 씁니다.', tickers: ['600519', 'BIDU', 'PDD', 'JD', 'BABA', '601318'], heat: 'STAR 50' },
    'SZSE COMP': { market: 'CN MARKET · SHENZHEN', summary: '선전증권거래소 상장 종목 전반을 보는 지수입니다. 성장주와 제조업, 기술주 민감도가 상대적으로 큽니다.', tickers: ['PDD', 'BIDU', 'JD', 'BABA', '600519', '601318'], heat: 'SZSE COMP' },
    'CHINEXT': { market: 'CN MARKET · SHENZHEN', summary: '중국판 성장주 시장으로 볼 수 있는 창업판 지수입니다. 고성장 기업과 신산업 기대감에 민감합니다.', tickers: ['PDD', 'BIDU', 'JD', 'BABA', '600519'], heat: 'CHINEXT' },
    'CSI 300': { market: 'CN MARKET · SHANGHAI/SHENZHEN', summary: '상하이와 선전의 대형주 300개를 묶은 중국 본토 대표 벤치마크입니다. 중국 대형주 전반의 체력을 봅니다.', tickers: ['600519', '601318', '1398', 'BABA', 'PDD', 'BIDU', 'JD'], heat: 'CSI 300' },
    'HSI': { market: 'HK MARKET · HONG KONG', summary: '홍콩 대표 대형주 지수입니다. 중국 플랫폼 기업, 금융주, 부동산·소비 흐름을 함께 볼 수 있습니다.', tickers: ['0700', '9988', '1810', '3690', '9618', '2318', 'HSBC'], heat: 'HSI' },
    'HSCEI': { market: 'HK MARKET · HONG KONG', summary: '홍콩에 상장된 중국 본토 기업 중심 지수입니다. 중국 대형 국유·민영 기업의 해외 투자 심리를 봅니다.', tickers: ['0700', '9988', '2318', '3690', '9618', '1398'], heat: 'HSCEI' },
    'HSTECH': { market: 'HK MARKET · HONG KONG', summary: '홍콩 상장 기술주 중심 지수입니다. 텐센트, 알리바바, 메이투안 등 플랫폼·테크 흐름에 민감합니다.', tickers: ['0700', '9988', '1810', '3690', '9618', 'BIDU', 'JD'], heat: 'HSTECH' },
    'ASX 200': { market: 'AU MARKET · SYDNEY', summary: '호주 대표 대형주 200개 지수입니다. 원자재, 은행, 헬스케어 비중이 커서 경기와 자원 가격 영향을 함께 봅니다.', tickers: ['BHP', 'CBA', 'RIO', 'CSL', 'WBC', 'MQG'], heat: 'ASX 200' },
    'ALL ORDS': { market: 'AU MARKET · SYDNEY', summary: '호주 시장을 더 넓게 보는 종합 지수입니다. ASX 200보다 시장 폭을 확인할 때 사용합니다.', tickers: ['BHP', 'CBA', 'RIO', 'CSL', 'WBC', 'MQG'], heat: 'ALL ORDS' },
    'S&P/ASX 50': { market: 'AU MARKET · SYDNEY', summary: '호주 최상위 대형주 50개 지수입니다. 은행, 광산, 방어주 중심의 대형주 분위기를 빠르게 보여줍니다.', tickers: ['BHP', 'CBA', 'RIO', 'CSL', 'WBC', 'MQG'], heat: 'S&P/ASX 50' },
  };

  const FALLBACK_COMPANIES_BY_REGION = {
    US: ['AAPL', 'MSFT', 'NVDA', 'AMZN', 'META', 'GOOGL', 'JPM', 'V', 'MA', 'WMT', 'AMD', 'ORCL'],
    JP: ['7203', '6758', '6861', '8035', '9984', '7974', '6098', '8306'],
    KR: ['005930', '000660', '035420', '035720', '005380', '051910'],
    CN: ['600519', '601318', '1398', 'BABA', 'PDD', 'BIDU', 'JD'],
    HK: ['0700', '9988', '1810', '3690', '9618', '2318', 'HSBC'],
    AU: ['BHP', 'CBA', 'RIO', 'CSL', 'WBC', 'MQG'],
  };

  function findCompany(symbol) {
    const fromMover = MOVERS.find(m => m.sym === symbol);
    const fromCompany = COMPANIES.find(c => c.t === symbol);
    return {
      sym: symbol,
      name: fromMover?.name || fromCompany?.n || symbol,
      base: fromMover?.base || 100,
    };
  }

  function renderIndexDetail({ title, base, color, region }) {
    const profile = INDEX_PROFILE[title] || {};
    const live = liveIndexMap.get(title);
    const tickers = profile.tickers || FALLBACK_COMPANIES_BY_REGION[region] || MOVERS.slice(0, 12).map(m => m.sym);
    const displayBase = live && live.value ? Number(live.value) : base;
    const summary = profile.summary || `${title} 지수의 흐름과 대표 구성 기업을 함께 보는 상세 화면입니다.`;
    const market = profile.market || `${region || 'GLOBAL'} MARKET`;

    const regionEl = document.getElementById('index-region');
    const nameEl = document.getElementById('index-name');
    const summaryEl = document.getElementById('index-summary');
    const valueEl = document.getElementById('index-live-value');
    const heatLabel = document.getElementById('heat-index-label');
    if (regionEl) regionEl.textContent = market;
    if (nameEl) {
      nameEl.textContent = title;
      if (color) nameEl.style.color = color;
    }
    if (summaryEl) summaryEl.textContent = summary;
    if (valueEl) valueEl.textContent = Number(displayBase || 0).toLocaleString('en-US', { maximumFractionDigits: 2 });
    if (heatLabel) heatLabel.textContent = profile.heat || title;

    const list = document.getElementById('index-company-list');
    if (!list) return;
    list.innerHTML = tickers.map(symbol => {
      const company = findCompany(symbol);
      const c = (Math.random() * 4.6 - 1.7);
      const cls = c >= 0 ? 'up' : 'down';
      const arrow = c >= 0 ? '▲' : '▼';
      return `<div class="index-company ${cls}">
        <span class="ticker">${escapeHtml(company.sym)}</span>
        <span class="company-name">${escapeHtml(company.name)}</span>
        <span class="company-change">${arrow}${Math.abs(c).toFixed(2)}%</span>
      </div>`;
    }).join('');
  }

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
    if (!el) return;
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
    currentChartContext = { title, base, color, region };
    currentChartRegion = region || null;
    renderMovers();
    renderIndexDetail({ title, base, color, region });
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
    // update header indicator & close flyout
    const ind = document.getElementById('gi-region-indicator');
    if (ind) ind.textContent = region;
    const flyout = document.getElementById('region-chips');
    if (flyout) flyout.hidden = true;
    const giBtn = document.getElementById('gi-btn');
    if (giBtn) giBtn.classList.remove('open');
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
  document.getElementById('heat')?.addEventListener('click', (e) => {
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
    setMode('chart');
    document.querySelectorAll('#watchlist .ticker-row').forEach(r => r.classList.toggle('active', r.dataset.sym === sym));
  });

  // ---- city tags on globe ----
  // attached after markers are built in the marker section
  function wireCityClicks() {
    d3.selectAll('g.city').on('click', function (event, d) {
      event.stopPropagation();
      window.location.href = `/market?id=${encodeURIComponent(d.marketId)}&index=${encodeURIComponent(d.indexName)}`;
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
    'Establishing handshake · ASX 200 · NIKKEI 225 · KOSPI',
    'Decrypting order book · NASDAQ · S&P 500 · DOW 30',
    'Mapping Chinese A-shares · SSE COMP · CSI 300 · HSI',
    'Calibrating volatility surface · FTSE 100 · DAX · CAC 40 · SENSEX',
    'Streaming tick data · 26 exchanges · 11 timezones',
    'Reconciling FX · USD · JPY · KRW · CNY · AUD · EUR',
  ];
  function fmtClock(d) {
    const pad = n => String(n).padStart(2, '0');
    return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`;
  }

  // ---------- MARKET TIME ZONES ----------
  const MARKET_ZONES = [
    { id: 'US', city: 'NEW YORK',   tz: 'America/New_York',  pre: '04:00', open: '09:30', close: '16:00', after: '20:00', c: '#6ad8ff' },
    { id: 'KR', city: 'SEOUL',      tz: 'Asia/Seoul',         pre: '08:00', open: '09:00', close: '15:30', after: '18:00', c: '#ff4dff' },
    { id: 'JP', city: 'TOKYO',      tz: 'Asia/Tokyo',         pre: '08:00', open: '09:00', close: '15:30', after: '16:30', c: '#ff4d6d' },
    { id: 'CN', city: 'SHANGHAI',   tz: 'Asia/Shanghai',      pre: '09:15', open: '09:30', close: '15:00', after: '15:30', c: '#ffb84d' },
    { id: 'HK', city: 'HONG KONG',  tz: 'Asia/Hong_Kong',     pre: '09:00', open: '09:30', close: '16:00', after: '16:30', c: '#ffd84d' },
    { id: 'AU', city: 'SYDNEY',     tz: 'Australia/Sydney',   pre: '07:00', open: '10:00', close: '16:00', after: '17:00', c: '#2ee6a0' },
    { id: 'UK', city: 'LONDON',     tz: 'Europe/London',      pre: '07:00', open: '08:00', close: '16:30', after: '17:00', c: '#cfdcff' },
    { id: 'DE', city: 'FRANKFURT',  tz: 'Europe/Berlin',      pre: '08:00', open: '09:00', close: '17:30', after: '22:00', c: '#ff9e4d' },
    { id: 'IN', city: 'MUMBAI',     tz: 'Asia/Kolkata',       pre: '09:00', open: '09:15', close: '15:30', after: '16:00', c: '#a4ff4d' },
    { id: 'SG', city: 'SINGAPORE',  tz: 'Asia/Singapore',     pre: '08:30', open: '09:00', close: '17:00', after: '17:30', c: '#ff5d6d' },
    { id: 'CA', city: 'TORONTO',    tz: 'America/Toronto',    pre: '07:00', open: '09:30', close: '16:00', after: '17:00', c: '#ff7d7d' },
    { id: 'BR', city: 'SAO PAULO',  tz: 'America/Sao_Paulo',  pre: '09:45', open: '10:00', close: '18:00', after: '18:30', c: '#ffd84d' },
  ];

  const CHART_TYPES = [
    {
      id: 'candlestick', nameKr: '캔들스틱 차트', nameEn: 'Candlestick Chart',
      icon: '<svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="35" stroke="#5b6886" stroke-width="1"/><rect x="9" y="12" width="6" height="16" fill="#2ee6a0"/><line x1="24" y1="8" x2="24" y2="32" stroke="#5b6886" stroke-width="1"/><rect x="21" y="18" width="6" height="10" fill="#ff4d6d"/><line x1="36" y1="6" x2="36" y2="34" stroke="#5b6886" stroke-width="1"/><rect x="33" y="10" width="6" height="18" fill="#2ee6a0"/><line x1="48" y1="10" x2="48" y2="36" stroke="#5b6886" stroke-width="1"/><rect x="45" y="22" width="6" height="10" fill="#ff4d6d"/></svg>',
      levels: [
        { diff: 'begin', label: '입문', tagline: '초록이면 오른 것, 빨강이면 내린 것',
          desc: '하나의 봉(캔들)이 4가지 가격 정보를 담고 있습니다. 봉의 시작이 시가(Open), 끝이 종가(Close)이고, 위아래로 뻗은 얇은 선(꼬리)이 그 시간 안에서 가장 높거나 낮았던 가격을 나타냅니다. 초록 봉은 가격이 올랐고, 빨간 봉은 내렸다는 뜻입니다. 주식 앱에서 흔히 볼 수 있는 바로 그 차트입니다.',
          features: ['초록 봉 = 끝 가격이 시작보다 높음 (상승)', '빨간 봉 = 끝 가격이 시작보다 낮음 (하락)', '위 꼬리 = 한때 저기까지 올랐다가 내려왔다', '아래 꼬리 = 한때 저기까지 내렸다가 올라왔다'] },
        { diff: 'mid', label: '중급', tagline: '꼬리와 몸통 비율로 매수·매도 심리를 읽는다',
          desc: '캔들 몸통의 크기는 매수/매도 세력 중 누가 더 강했는지를 보여줍니다. 긴 위꼬리는 고가 부근에서 매도 압력이 강했음을, 긴 아래꼬리는 저가 부근에서 매수 방어가 이루어졌음을 뜻합니다. 도지(몸통 거의 없음), 해머(긴 아래꼬리+작은 몸통), 인걸핑(전 봉 완전 포함) 같은 패턴으로 단기 반전 신호를 읽을 수 있습니다.',
          features: ['도지(Doji): 시가≈종가 → 매수·매도 균형, 추세 전환 경고', '해머: 저점 긴 아래꼬리 → 매수 방어 강함, 반등 신호', '슈팅스타: 고점 긴 위꼬리 → 매도 압력, 하락 신호', '이브닝/모닝스타: 3봉 복합 패턴 → 강한 추세 전환'] },
        { diff: 'adv', label: '고급', tagline: '공방 강도 정량화 · 복합 패턴 · 컨텍스트 결합',
          desc: 'Body/Shadow 비율과 ATR(Average True Range) 대비 봉 크기로 세력 공방 강도를 정량화할 수 있습니다. Three White Soldiers / Three Black Crows, Morning/Evening Star, Dark Cloud Cover, Piercing Line 등 복합 패턴은 지지·저항 레벨, 거래량 급증, 갭(Gap)과 결합했을 때 신뢰도가 높아집니다. 일중 트레이딩에서는 오픈 갭 이후 첫 30분 캔들의 고·저 돌파가 방향성 판단의 핵심 기준입니다.',
          features: ['ATR 대비 봉 크기로 세력 공방 강도 정량화', 'Three White Soldiers / Three Black Crows — 추세 지속 패턴', 'Engulfing + 거래량 급증 = 고신뢰 반전 신호', '지지·저항 레벨 위에서의 패턴이 이격지보다 유효', '오픈 갭 + 첫 30분 고·저 = 일중 방향성 판단 기준'] },
      ],
    },
    {
      id: 'line', nameKr: '라인 차트', nameEn: 'Line Chart',
      icon: '<svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="4,32 14,24 22,27 30,16 38,20 46,10 56,14 56,38 4,38" fill="rgba(106,216,255,0.08)"/><polyline points="4,32 14,24 22,27 30,16 38,20 46,10 56,14" stroke="#6ad8ff" stroke-width="1.5" fill="none"/></svg>',
      levels: [
        { diff: 'begin', label: '입문', tagline: '가장 단순한 선 하나로 전체 흐름 파악',
          desc: '각 시간대의 마지막 가격(종가)만 점으로 찍고, 그 점들을 선으로 이은 가장 단순한 차트입니다. "이 주식이 오르는 추세인가, 내리는 추세인가?"를 한눈에 파악할 때 가장 좋습니다. 복잡하게 오르내리는 세부 움직임보다 전체적인 방향을 보고 싶을 때 사용합니다.',
          features: ['하루의 마지막 가격(종가)만 사용', '위로 올라가는 선 = 상승 추세', '아래로 내려가는 선 = 하락 추세', '보기 가장 쉽고 단순한 차트'] },
        { diff: 'mid', label: '중급', tagline: '종가 기반 노이즈 제거로 추세와 비교 분석에 최적',
          desc: '종가만 사용하므로 장중 변동성 노이즈가 제거되어 중장기 추세 파악이 쉽습니다. 여러 종목을 하나의 차트에 겹쳐서 상대 성과를 비교하는 데 자주 활용됩니다. 지지·저항선을 그을 때 캔들스틱보다 레벨이 더 명확하게 드러나는 경우도 있습니다.',
          features: ['장기 추세(월봉·주봉) 파악에 최적화', '복수 종목 비교 시 가독성 우수', '지지·저항 레벨이 캔들보다 명확하게 보임', '추세선·채널 작도가 깔끔함'] },
        { diff: 'adv', label: '고급', tagline: 'Closing Price Action · 패턴 식별 · 허위 돌파 필터링',
          desc: '종가 기반 데이터는 Closing Price Action 분석의 기초입니다. 종가가 지지·저항을 돌파했는지 확인하는 데 사용하며, 장중 돌파보다 허위 돌파(fakeout) 필터 효과가 있습니다. 주봉·월봉 라인차트에서 Head & Shoulders, 삼각형, 웨지, 채널 등 대형 패턴을 식별하는 데 유리하며, 200일 이동평균과 결합하면 장기 추세 판단 도구로 활용됩니다.',
          features: ['종가 기반 돌파 = 허위 돌파(fakeout) 필터 효과', '대형 주봉·월봉에서 H&S, 웨지, 채널 패턴 식별에 유리', '200일 MA와 결합해 장기 추세 판단', '여러 자산 간 상대강도(Relative Strength) 비교', '알고리즘 신호 트리거로도 활용'] },
      ],
    },
    {
      id: 'bar', nameKr: 'OHLC 바 차트', nameEn: 'OHLC Bar Chart',
      icon: '<svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="6" x2="12" y2="34" stroke="#2ee6a0" stroke-width="1.5"/><line x1="9" y1="14" x2="12" y2="14" stroke="#2ee6a0" stroke-width="1.5"/><line x1="12" y1="28" x2="15" y2="28" stroke="#2ee6a0" stroke-width="1.5"/><line x1="28" y1="10" x2="28" y2="32" stroke="#ff4d6d" stroke-width="1.5"/><line x1="25" y1="16" x2="28" y2="16" stroke="#ff4d6d" stroke-width="1.5"/><line x1="28" y1="26" x2="31" y2="26" stroke="#ff4d6d" stroke-width="1.5"/><line x1="44" y1="8" x2="44" y2="30" stroke="#2ee6a0" stroke-width="1.5"/><line x1="41" y1="18" x2="44" y2="18" stroke="#2ee6a0" stroke-width="1.5"/><line x1="44" y1="24" x2="47" y2="24" stroke="#2ee6a0" stroke-width="1.5"/></svg>',
      levels: [
        { diff: 'begin', label: '입문', tagline: '막대와 작은 가로선으로 OHLC를 표시',
          desc: '캔들스틱과 같은 정보를 다른 방식으로 그린 차트입니다. 수직 막대가 그 시간의 최고·최저 가격 범위를 나타내고, 왼쪽 작은 가로선이 시작 가격(시가), 오른쪽 작은 가로선이 끝 가격(종가)입니다. 캔들보다 익숙하지 않을 수 있지만, 담고 있는 정보는 완전히 동일합니다.',
          features: ['세로선 = 그 시간의 최고~최저 가격 범위', '왼쪽 작은 선 = 시작 가격(시가)', '오른쪽 작은 선 = 끝 가격(종가)', '캔들과 같은 정보, 다른 표현 방식'] },
        { diff: 'mid', label: '중급', tagline: '고밀도 데이터에 강한 서양식 전통 차트',
          desc: '캔들스틱보다 각 봉의 폭이 좁아, 같은 화면에 더 많은 데이터를 표시할 수 있습니다. 미국과 유럽의 전통적인 차트 분석 방법으로, 많은 기술적 분석 서적이 이 형식을 기준으로 쓰여 있습니다. Outside Bar(현재 봉이 전 봉 범위를 완전히 포함)와 Inside Bar(현재 봉이 전 봉 안에 완전히 포함)는 변동성의 확장과 수축을 나타내는 중요한 신호입니다.',
          features: ['Outside Bar(전 봉 포함) → 변동성 확장, 방향 확인 필요', 'Inside Bar(전 봉 내 포함) → 변동성 수축, 돌파 대기', '좁은 화면에 고밀도 데이터 표시 가능', '서양식 기술적 분석의 전통적 표준'] },
        { diff: 'adv', label: '고급', tagline: 'NR7 · Outside/Inside Bar · 변동성 사이클 분석',
          desc: 'NR7(Narrow Range 7)은 최근 7봉 중 가장 좁은 고·저 범위를 가진 봉으로, 저변동성 수축 후 폭발적 가격 이동의 전조 신호입니다. Outside Bar는 이전 봉의 고·저를 완전히 포함하여 변동성 확장을 나타내며, 추세 방향 확인과 함께 사용합니다. Volatility Contraction Pattern(VCP)에서 OHLC 바의 범위 추이를 관찰하면 주도주 진입 타이밍을 파악하는 데 활용됩니다.',
          features: ['NR7 패턴: 7봉 중 최소 레인지 → 폭발적 움직임 전조', 'Outside Bar + 추세 확인 = 강력한 방향성 신호', 'VCP(변동성 수축 패턴) 분석의 핵심 도구', '일중 레인지 추이로 세력 축적/분산 탐지', 'ATR 대비 레인지 비율로 진입 시점 정량화'] },
      ],
    },
    {
      id: 'heikin-ashi', nameKr: '하이킨-아시 차트', nameEn: 'Heikin-Ashi Chart',
      icon: '<svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="10" y1="20" x2="10" y2="30" stroke="#5b6886" stroke-width="1"/><rect x="7" y="22" width="6" height="7" fill="#2ee6a0"/><line x1="20" y1="15" x2="20" y2="28" stroke="#5b6886" stroke-width="1"/><rect x="17" y="17" width="6" height="9" fill="#2ee6a0"/><line x1="30" y1="10" x2="30" y2="22" stroke="#5b6886" stroke-width="1"/><rect x="27" y="12" width="6" height="8" fill="#2ee6a0"/><line x1="40" y1="6" x2="40" y2="18" stroke="#5b6886" stroke-width="1"/><rect x="37" y="8" width="6" height="8" fill="#2ee6a0"/><line x1="50" y1="8" x2="50" y2="20" stroke="#5b6886" stroke-width="1"/><rect x="47" y="10" width="6" height="7" fill="#ff4d6d"/></svg>',
      levels: [
        { diff: 'begin', label: '입문', tagline: '일반 캔들을 평균 내서 더 부드럽게',
          desc: '하이킨-아시는 일반 캔들의 값을 전날과 오늘의 평균으로 다시 계산한 차트입니다. 덕분에 오르고 내리는 잦은 변동이 줄어들고, 추세가 훨씬 부드럽고 명확하게 보입니다. 초록 봉이 여러 개 연속으로 나오면 상승 흐름이 강하다는 뜻이고, 빨간 봉이 연속이면 하락 흐름이 강하다는 뜻입니다.',
          features: ['일반 캔들보다 훨씬 부드럽고 읽기 쉬움', '초록 봉 연속 = 강한 상승 중', '빨간 봉 연속 = 강한 하락 중', '추세가 바뀔 때 봉 색이 바뀜'] },
        { diff: 'mid', label: '중급', tagline: '연속 봉의 색과 꼬리로 추세 강도를 판단',
          desc: '하이킨-아시 봉의 OHLC는 전 봉과 현재 봉의 평균으로 재계산됩니다. 아래꼬리가 없는 양봉은 강한 상승 추세, 위꼬리가 없는 음봉은 강한 하락 추세를 의미합니다. 봉의 색이 바뀌기 시작할 때(빨강→초록 또는 초록→빨강)를 추세 전환 신호로 활용합니다. 단, 실제 가격이 아니므로 정확한 지지·저항 레벨 파악에는 캔들스틱을 병행해야 합니다.',
          features: ['아래꼬리 없는 양봉 = 매우 강한 상승 추세', '위꼬리 없는 음봉 = 매우 강한 하락 추세', '색 전환(초록↔빨강) = 추세 전환 신호', '실제 가격과 다름 → 지지·저항은 캔들 병행 필수'] },
        { diff: 'adv', label: '고급', tagline: '추세 추종 시스템의 노이즈 필터 · 진입 타이밍 정밀화',
          desc: '하이킨-아시는 추세 추종(Trend Following) 전략에서 진입·청산 타이밍의 노이즈 필터로 활용됩니다. HA 가격은 실제 시장 가격이 아니므로 스톱로스나 타겟 설정은 반드시 실제 캔들 기반으로 해야 합니다. EMA, 볼린저 밴드 같은 오버레이 지표와 결합하여 HA 봉 색 전환 + 지표 교차를 동시에 확인하면 이중 확인(dual confirmation)으로 신뢰도를 높일 수 있습니다.',
          features: ['추세 추종 전략의 진입·유지·청산 노이즈 필터', 'HA 가격은 실제가 아님 → SL/TP는 실제 캔들 기준', 'EMA 교차 + HA 색 전환 = 이중 확인(dual confirmation)', '스윙 트레이딩에서 포지션 유지 판단 도구', 'HA Smoothed(2중 평균)로 더 긴 추세 추종 가능'] },
      ],
    },
    {
      id: 'bollinger', nameKr: '볼린저 밴드', nameEn: 'Bollinger Bands',
      icon: '<svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4,6 Q15,4 20,10 Q30,18 40,12 Q50,8 56,10 Q50,8 56,30 Q50,32 40,28 Q30,22 20,30 Q15,36 4,32Z" fill="rgba(106,216,255,0.07)"/><path d="M4,6 Q15,4 20,10 Q30,18 40,12 Q50,8 56,10" stroke="rgba(106,216,255,0.4)" stroke-width="1" fill="none"/><path d="M4,32 Q15,36 20,30 Q30,22 40,28 Q50,32 56,30" stroke="rgba(106,216,255,0.4)" stroke-width="1" fill="none"/><path d="M4,18 Q20,20 30,20 Q40,20 56,20" stroke="#6ad8ff" stroke-width="1.5" fill="none"/><circle cx="20" cy="30" r="2" fill="#ff4d6d"/><circle cx="40" cy="12" r="2" fill="#2ee6a0"/></svg>',
      levels: [
        { diff: 'begin', label: '입문', tagline: '가격이 주로 이 두 선 사이를 오간다',
          desc: '볼린저 밴드는 가운데 선(평균선)을 중심으로 위아래로 두 개의 선(밴드)을 그립니다. 가격은 대부분의 시간 동안 이 두 선 사이에서 움직입니다. 가격이 위 선에 닿으면 "요즘 많이 오른 것 같다"는 신호이고, 아래 선에 닿으면 "많이 내린 것 같다"는 신호입니다. 두 선이 좁아지면 곧 큰 움직임이 올 수 있습니다.',
          features: ['가운데 선 = 20일 평균 가격', '위 선에 닿음 = 단기 과매수 가능성', '아래 선에 닿음 = 단기 과매도 가능성', '두 선이 좁아짐 = 큰 변동 예고'] },
        { diff: 'mid', label: '중급', tagline: '표준편차로 과열·냉각 구간과 변동성 수축 포착',
          desc: '볼린저 밴드는 중간 밴드(20일 SMA), 상단(MA+2σ), 하단(MA-2σ)으로 구성됩니다. 가격이 상단 밴드에 붙어 이동하면(Band Walking) 강한 추세를, 밴드 안으로 들어오면 추세 약화를 의미합니다. Bollinger Squeeze(밴드 폭이 최근 6개월 중 가장 좁을 때)는 큰 변동성 폭발 전조로, 돌파 방향에 따라 매수/매도 진입 기회가 됩니다.',
          features: ['상단/하단: MA ± 2 표준편차 (약 95% 가격 포함)', 'Band Walking(밴드 타고 이동) = 강한 추세 지속', 'Bollinger Squeeze = 변동성 폭발 전조', 'W-바닥·M-천장 패턴으로 반전 신호 포착', '밴드 안으로 복귀 = 추세 약화 신호'] },
        { diff: 'adv', label: '고급', tagline: '%B · BandWidth · 켈트너 채널 결합 시스템',
          desc: '%B는 현재 가격이 밴드 내 어디에 위치하는지를 0~1로 정규화한 값으로, 과매수(>1)/과매도(<0) 구간을 수치로 파악할 수 있습니다. BandWidth(상·하단 밴드 폭 / 중간 밴드)는 변동성의 역사적 위치를 비교하는 데 사용합니다. 켈트너 채널(ATR 기반)과 결합해 볼린저 밴드가 켈트너 채널 밖으로 나가는 Squeeze 해제 시점을 포착하면 높은 확률의 방향성 트레이드가 가능합니다.',
          features: ['%B = (종가 - 하단) / (상단 - 하단) → 위치 정량화', 'BandWidth로 변동성 역사적 비교 가능', '켈트너 채널 Squeeze 해제 = 고확률 돌파 신호', 'RSI와 결합: 상단밴드+RSI 70 이상 = 확실한 과매수', '주봉 밴드 + 일봉 패턴 = 멀티 타임프레임 전략'] },
      ],
    },
    {
      id: 'ma', nameKr: '이동평균선', nameEn: 'Moving Average (MA)',
      icon: '<svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="4,30 14,22 22,25 30,14 38,18 46,8 56,12" stroke="rgba(46,230,160,0.25)" stroke-width="1" fill="none"/><polyline points="4,28 12,24 22,22 30,18 38,16 46,12 56,10" stroke="#ffd84d" stroke-width="1.5" fill="none"/><polyline points="4,26 12,25 22,23 30,21 38,19 46,16 56,14" stroke="#6ad8ff" stroke-width="1.5" fill="none"/></svg>',
      levels: [
        { diff: 'begin', label: '입문', tagline: '최근 N일 가격을 평균 내어 선으로 연결',
          desc: '이동평균선은 최근 일정 기간의 가격을 평균 내어 선으로 이어 그린 것입니다. 가격이 이 선 위에 있으면 상승 흐름, 아래에 있으면 하락 흐름이라고 볼 수 있습니다. 단기선(예: 5일선)이 장기선(예: 20일선)을 아래에서 위로 뚫으면 골든크로스라고 하여 상승 신호로 봅니다.',
          features: ['선 위에 있으면 상승 흐름, 아래면 하락 흐름', '단기선이 장기선 위로 = 골든크로스 (매수 신호)', '단기선이 장기선 아래로 = 데드크로스 (매도 신호)', '숫자가 클수록 더 긴 기간의 평균'] },
        { diff: 'mid', label: '중급', tagline: 'SMA·EMA 차이 + 주요 기간(20·60·120·200) 활용',
          desc: 'SMA(단순이동평균)는 모든 날에 동일한 가중치를, EMA(지수이동평균)는 최근 날에 더 큰 가중치를 부여하여 가격 변화에 더 빠르게 반응합니다. 국내 시장에서는 5·10·20·60·120·240일이, 미국 시장에서는 50·200일이 핵심 참고선입니다. MA가 수렴하다가 벌어지는 시점(확산)이 추세 강화, 다시 수렴하는 시점이 추세 약화를 나타냅니다.',
          features: ['SMA: 균일 가중치 / EMA: 최근 가중치 높음', '국내: 5·20·60·120일 / 미국: 50·200일 핵심', 'MA 수렴 후 확산 = 추세 강화 신호', 'MA 배열(단기>장기 순서) = 정배열(상승 추세 확인)', '200일선이 장기 추세의 경계선 역할'] },
        { diff: 'adv', label: '고급', tagline: 'MA 다중 시스템 · VWAP · 동적 지지·저항 레벨',
          desc: '시장에서 기관 투자자들이 주로 참고하는 선은 50일/200일 SMA(미국), 120일/240일(국내)이며, 이 선들이 실제 지지·저항으로 작동하는 것은 셀프-풀필링(self-fulfilling) 특성 때문입니다. VWAP(거래량 가중 평균가격)는 일중 기관 기준선으로, 가격이 VWAP 위이면 기관 평균보다 비싸게 산 사람이 많다는 의미입니다. Ribbon 전략(7~15개의 짧은 기간 MA를 동시에 표시)으로 추세 전환 조기 신호를 포착하고, Death/Golden Cross를 보조 지표와 결합해 신뢰도를 높입니다.',
          features: ['기관이 참고하는 선이 실제 지지·저항으로 작동 (자기실현)', 'VWAP: 일중 기관 기준선, 일중 트레이딩의 핵심', 'MA Ribbon: 추세 전환 조기 신호 포착', '200일 MA 하향 돌파 = 약세장 전환 중요 경계', 'MA + 거래량 급증 = 진짜 돌파 vs 가짜 돌파 구분'] },
      ],
    },
    {
      id: 'macd', nameKr: 'MACD', nameEn: 'Moving Average Convergence Divergence',
      icon: '<svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="4" y1="20" x2="56" y2="20" stroke="rgba(91,104,134,0.4)" stroke-width="1"/><rect x="8" y="16" width="4" height="4" fill="#2ee6a0"/><rect x="14" y="13" width="4" height="7" fill="#2ee6a0"/><rect x="20" y="17" width="4" height="3" fill="#2ee6a0"/><rect x="26" y="20" width="4" height="4" fill="#ff4d6d"/><rect x="32" y="20" width="4" height="6" fill="#ff4d6d"/><rect x="38" y="20" width="4" height="3" fill="#ff4d6d"/><rect x="44" y="18" width="4" height="2" fill="#2ee6a0"/><polyline points="4,17 14,15 20,18 30,22 38,23 50,19" stroke="#6ad8ff" stroke-width="1.5" fill="none"/><polyline points="4,18 14,17 20,19 30,21 38,22 50,20" stroke="#ffd84d" stroke-width="1" fill="none"/></svg>',
      levels: [
        { diff: 'begin', label: '입문', tagline: '두 선이 교차할 때 사고팔라는 신호',
          desc: 'MACD는 차트 아래쪽에 별도로 표시되는 보조 지표입니다. 파란선(MACD선)과 노란선(시그널선), 두 선의 차이를 막대(히스토그램)로 표현합니다. 파란선이 노란선을 아래에서 위로 뚫으면 매수 신호, 위에서 아래로 뚫으면 매도 신호로 봅니다. 아직 자세히 몰라도 이 두 선의 교차만 확인해도 기본 활용이 됩니다.',
          features: ['파란선(MACD)이 노란선(시그널)을 위로 뚫음 = 매수 신호', '파란선이 노란선을 아래로 뚫음 = 매도 신호', '막대(히스토그램)가 커질수록 신호가 강해짐', '가격 차트 아래 별도 창에 표시'] },
        { diff: 'mid', label: '중급', tagline: 'EMA 차이·시그널·히스토그램으로 모멘텀 파악',
          desc: 'MACD선 = 12일 EMA - 26일 EMA, 시그널선 = MACD의 9일 EMA, 히스토그램 = MACD - 시그널입니다. MACD선이 0선 위에 있으면 단기 모멘텀이 장기보다 강한 상승 국면, 아래에 있으면 하락 국면입니다. 다이버전스(가격은 신고점인데 MACD는 더 낮은 고점을 만듦)는 상승 모멘텀 약화의 경고 신호입니다.',
          features: ['MACD선 = 12일 EMA - 26일 EMA', '시그널선 = MACD의 9일 EMA (완만한 평균)', '0선 위 = 상승 모멘텀, 0선 아래 = 하락 모멘텀', '다이버전스: 가격 신고점 + MACD 낮은 고점 = 모멘텀 약화'] },
        { diff: 'adv', label: '고급', tagline: '다이버전스 · 제로선 교차 · 멀티타임프레임 확인',
          desc: '히스토그램의 방향 전환(0 이하에서 위로 향하기 시작)은 MACD 교차보다 먼저 오는 조기 신호입니다. Hidden Divergence(가격은 더 높은 저점인데 MACD는 더 낮은 저점 → 추세 지속 신호)와 Regular Divergence(추세 전환 신호)를 구분하는 것이 핵심입니다. 주봉 MACD가 0선 위에서 골든크로스할 때 일봉에서 진입하는 멀티타임프레임 전략은 신뢰도가 가장 높은 MACD 활용법 중 하나입니다.',
          features: ['히스토그램 방향 전환 = MACD 교차보다 앞선 조기 신호', 'Hidden Divergence = 추세 지속 신호 (반전 X)', 'Regular Divergence = 추세 반전 경고', '주봉 교차 + 일봉 진입 = 멀티타임프레임 고신뢰 전략', '설정값(12/26/9)보다 시그널 컨텍스트가 더 중요'] },
      ],
    },
    {
      id: 'rsi', nameKr: 'RSI', nameEn: 'Relative Strength Index',
      icon: '<svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="4" y1="10" x2="56" y2="10" stroke="rgba(255,77,109,0.35)" stroke-width="1" stroke-dasharray="2,2"/><line x1="4" y1="30" x2="56" y2="30" stroke="rgba(46,230,160,0.35)" stroke-width="1" stroke-dasharray="2,2"/><polyline points="4,20 10,18 16,8 22,12 28,22 34,28 40,32 46,24 52,18 56,16" stroke="#a07cff" stroke-width="1.5" fill="none"/></svg>',
      levels: [
        { diff: 'begin', label: '입문', tagline: '너무 오른 것 같으면 70, 너무 내린 것 같으면 30',
          desc: 'RSI는 0에서 100 사이의 숫자로 표시되는 지표입니다. 70 이상이면 "최근에 너무 많이 올라서 조정이 올 수도 있다"는 과매수 신호이고, 30 이하면 "너무 많이 내려서 반등이 올 수도 있다"는 과매도 신호로 봅니다. 단, 이것만으로 매매하면 위험하고, 다른 지표와 함께 보는 것이 좋습니다.',
          features: ['0~100 사이 숫자로 표시', 'RSI 70 이상 = 과매수, 하락 주의', 'RSI 30 이하 = 과매도, 반등 기대', '가격 아래 별도 창에 선으로 표시'] },
        { diff: 'mid', label: '중급', tagline: '다이버전스와 50선으로 추세 방향까지 확인',
          desc: 'RSI = 14일 평균 상승폭 / (평균 상승폭 + 평균 하락폭) × 100으로 계산됩니다. 50선 위에 있으면 전체적으로 상승 쪽이 강한 상태, 아래면 하락 쪽이 강한 상태입니다. 다이버전스(가격은 신고점인데 RSI는 더 낮은 고점)는 상승 모멘텀이 약해지고 있다는 중요한 경고 신호입니다.',
          features: ['RSI 50선 위 = 상승 모멘텀 우세', 'RSI 50선 아래 = 하락 모멘텀 우세', '다이버전스: 가격↑ + RSI↓ → 모멘텀 약화 경고', 'RSI 70/30은 강한 추세 중 유효하지 않을 수 있음', '강한 추세에서 80·20 기준 사용 권장'] },
        { diff: 'adv', label: '고급', tagline: '다이버전스 유형 · 실패 스윙 · 추세 범위 필터',
          desc: 'Failure Swing(RSI가 오버바운드 구간에서 나오면서 직전 저점을 하향 돌파)은 캔들 패턴보다 앞서는 조기 반전 신호입니다. 강한 상승 추세에서는 RSI가 40~90 범위에서 움직이고, 강한 하락 추세에서는 10~60 범위에서 움직입니다. 추세 방향에 따른 RSI 범위(강세 존: 40~90 / 약세 존: 10~60)를 먼저 확인하고 매매 방향을 결정하는 것이 핵심 활용법입니다. Hidden Divergence와 Positive/Negative Reversal은 추세 지속 신호로도 활용됩니다.',
          features: ['Failure Swing = 캔들보다 앞서는 조기 반전 신호', '강세 구간: RSI 40~90 범위, 약세 구간: 10~60 범위', 'Hidden Divergence = 추세 지속 확인 신호', '추세 방향 먼저 확인 후 과매도/과매수 판단', 'RSI 기울기로 모멘텀 가속/감속 탐지'] },
      ],
    },
    {
      id: 'ichimoku', nameKr: '이치모쿠 구름', nameEn: 'Ichimoku Cloud',
      icon: '<svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4,28 Q20,22 30,18 Q40,14 56,16 L56,22 Q40,20 30,24 Q20,28 4,32Z" fill="rgba(160,124,255,0.15)"/><path d="M4,28 Q20,22 30,18 Q40,14 56,16" stroke="#ff4dff" stroke-width="1" fill="none"/><path d="M4,32 Q20,28 30,24 Q40,20 56,22" stroke="#6ad8ff" stroke-width="1" fill="none"/><polyline points="4,24 14,20 22,22 30,14 38,16 46,12 56,14" stroke="#ffd84d" stroke-width="1.5" fill="none"/></svg>',
      levels: [
        { diff: 'begin', label: '입문', tagline: '구름 위이면 상승, 구름 아래이면 하락 추세',
          desc: '이치모쿠는 "구름"처럼 보이는 색칠된 영역이 핵심입니다. 가격이 구름 위에 있으면 상승 추세, 구름 아래에 있으면 하락 추세라고 간단히 판단할 수 있습니다. 구름이 두꺼울수록 그 구간이 강한 지지선 또는 저항선 역할을 한다는 뜻입니다. 처음에는 구름의 위치와 두께만 봐도 충분합니다.',
          features: ['가격 > 구름 = 상승 추세', '가격 < 구름 = 하락 추세', '가격이 구름 안 = 추세 불분명', '구름 두꺼울수록 강한 지지/저항'] },
        { diff: 'mid', label: '중급', tagline: '5가지 선으로 추세·지지저항·모멘텀을 동시에',
          desc: '전환선(9일 고·저 평균)이 기준선(26일 고·저 평균)을 상향 돌파하면 단기 매수 신호입니다. 선행스팬A(전환선+기준선 평균)와 선행스팬B(52일 고·저 평균)가 26일 앞에 표시되어 미래 지지·저항 영역을 미리 보여줍니다. 녹색 구름(스팬A > 스팬B)은 강세, 빨간 구름(스팬A < 스팬B)은 약세를 나타냅니다.',
          features: ['전환선 > 기준선 = 단기 강세, 교차 시 신호', '구름 색: 녹색 = 강세 / 빨간색 = 약세', '선행스팬으로 26일 앞 지지·저항 미리 확인', '후행스팬이 가격 위 = 추세 강도 확인'] },
        { diff: 'adv', label: '고급', tagline: '다중 신호 정렬(Kumo Breakout) · TK 교차 · 클라우드 비틀기',
          desc: '이치모쿠 최고 신뢰도 신호는 TK 교차(전환선이 기준선 상향 돌파) + 가격이 구름 위 + 후행스팬이 가격 위 + 녹색 구름의 4가지 조건이 동시에 충족될 때입니다. Kumo Breakout(가격이 구름을 상향 돌파)에서 구름 두께가 얇을수록 돌파 확률이 높습니다. 선행스팬A/B의 교차(Kumo Twist)는 미래 추세 전환 예고로, 26일 앞에서 미리 확인할 수 있는 이치모쿠 고유의 예측 기능입니다.',
          features: ['4중 정렬(TK+가격+후행스팬+구름 색) = 최고 신뢰 신호', 'Kumo Breakout: 얇은 구름 돌파가 성공률 높음', 'Kumo Twist(스팬A·B 교차) = 26일 앞 추세 전환 예고', '후행스팬이 구름을 돌파 = 강력한 추세 확인', '기준선 수평 구간 = 강한 지지·저항 레벨'] },
      ],
    },
    {
      id: 'fibonacci', nameKr: '피보나치 되돌림', nameEn: 'Fibonacci Retracement',
      icon: '<svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="4" y1="4" x2="56" y2="36" stroke="rgba(91,104,134,0.4)" stroke-width="1" stroke-dasharray="3,2"/><line x1="4" y1="15" x2="52" y2="15" stroke="#ffd84d" stroke-width="1" stroke-dasharray="2,2"/><line x1="4" y1="21" x2="52" y2="21" stroke="#2ee6a0" stroke-width="1.5" stroke-dasharray="2,2"/><line x1="4" y1="28" x2="52" y2="28" stroke="#6ad8ff" stroke-width="1" stroke-dasharray="2,2"/><text x="43" y="13" fill="#ffd84d" font-size="5" font-family="monospace">38.2</text><text x="43" y="19" fill="#2ee6a0" font-size="5" font-family="monospace">61.8</text></svg>',
      levels: [
        { diff: 'begin', label: '입문', tagline: '많이 오른 뒤 얼마나 빠질지 예측하는 선들',
          desc: '주가가 크게 오른 뒤 잠시 빠질 때, 어느 가격까지 빠질지 미리 예상할 수 있는 방법입니다. 23.6%, 38.2%, 50%, 61.8% 네 가지 비율을 오른 폭에 적용해 수평선을 그립니다. 이 선 부근에서 가격이 멈추거나 다시 오르는 경우가 많아, 매수 기회를 노리는 데 활용합니다.',
          features: ['23.6% — 조금만 빠진 것 (추세 매우 강함)', '38.2% — 적당히 빠진 것', '61.8% — 꽤 많이 빠진 것 (황금 비율)', '이 선 부근에서 반등하는 경우가 많음'] },
        { diff: 'mid', label: '중급', tagline: '고점·저점 설정과 되돌림 레벨에서 진입 전략',
          desc: '피보나치 되돌림은 최근 큰 상승의 저점→고점에 도구를 설정하여 각 비율에 수평선을 그립니다. 61.8%("황금비")와 38.2%가 가장 중요한 되돌림 레벨로, 이 구간에서 거래량이 줄어들다가 다시 늘어나면 강한 반등 신호입니다. 이전 고점/저점, 이동평균선, 갭 등과 겹치는 레벨이 단순 피보나치선보다 훨씬 강한 지지·저항으로 작동합니다.',
          features: ['저점→고점 설정 후 비율로 되돌림 레벨 계산', '61.8% = 황금비, 가장 강한 지지 레벨', '38.2% + MA 겹침 = 더 강한 지지·저항', '거래량 감소 후 반등 봉 확인 필수', '파동 고점에서의 되돌림이 중간보다 신뢰도 높음'] },
        { diff: 'adv', label: '고급', tagline: 'Confluence Zone · 확장 레벨 · 하모닉 패턴 기초',
          desc: '피보나치 레벨이 다중 시간프레임(주봉+일봉), 이동평균선, 이전 고·저점, 볼린저 밴드, VWAP와 겹치는 Confluence Zone에서 반응 확률이 크게 높아집니다. 피보나치 확장(Extension: 127.2%, 161.8%, 261.8%)은 되돌림 이후 목표가 설정에 사용됩니다. 하모닉 패턴(Gartley, Bat, Crab, Butterfly)은 피보나치 비율을 기반으로 반전 구간을 사전에 정의하는 고급 패턴 분석법입니다.',
          features: ['Confluence Zone: 다중 레벨 겹침 = 고신뢰 지지·저항', '확장 레벨(161.8%, 261.8%) = 다음 목표가 설정', '하모닉 패턴(Gartley, Bat 등) = 피보나치 기반 반전 예측', '멀티타임프레임 피보나치 겹침 레벨이 가장 강력', '트레이딩뷰의 Auto Fib 도구로 자동 설정 가능'] },
      ],
    },
    {
      id: 'renko', nameKr: '렌코 차트', nameEn: 'Renko Chart',
      icon: '<svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="28" width="8" height="8" fill="#2ee6a0" stroke="#3a4564" stroke-width="0.5"/><rect x="14" y="20" width="8" height="8" fill="#2ee6a0" stroke="#3a4564" stroke-width="0.5"/><rect x="22" y="12" width="8" height="8" fill="#2ee6a0" stroke="#3a4564" stroke-width="0.5"/><rect x="30" y="4" width="8" height="8" fill="#2ee6a0" stroke="#3a4564" stroke-width="0.5"/><rect x="38" y="12" width="8" height="8" fill="#ff4d6d" stroke="#3a4564" stroke-width="0.5"/><rect x="46" y="20" width="8" height="8" fill="#ff4d6d" stroke="#3a4564" stroke-width="0.5"/></svg>',
      levels: [
        { diff: 'begin', label: '입문', tagline: '시간 없이 가격 움직임만 벽돌로 쌓는 차트',
          desc: '렌코 차트는 시간(날짜)에 관계없이 가격이 일정 폭(벽돌 크기) 이상 움직일 때만 새 벽돌이 추가됩니다. 그래서 가격이 거의 안 움직인 날은 차트에 아무것도 추가되지 않습니다. 초록 벽돌이 계속 쌓이면 상승 추세, 빨간 벽돌이 계속 쌓이면 하락 추세입니다. 잔잔한 등락 노이즈 없이 큰 흐름만 보고 싶을 때 좋습니다.',
          features: ['시간과 무관 — 가격 변화만 표시', '초록 벽돌 연속 = 상승 추세', '빨간 벽돌 연속 = 하락 추세', '잡음 없이 큰 흐름만 볼 때 유용'] },
        { diff: 'mid', label: '중급', tagline: 'Brick Size 설정과 추세 전환 신호 포착',
          desc: '벽돌 크기(Brick Size)가 너무 크면 너무 느리게 반응하고, 너무 작으면 노이즈가 많아집니다. ATR(평균 진폭) 기반의 동적 벽돌 크기가 가장 안정적입니다. 추세 전환은 반대 방향 벽돌이 2개 이상 연속으로 나타날 때 확인합니다. 명확한 지지·저항 구간이 벽돌이 여러 번 멈추는 가격대로 자연스럽게 드러납니다.',
          features: ['벽돌 크기 = ATR 기반이 가장 안정적', '반대 방향 벽돌 2개 = 추세 전환 확인', '단순 지지·저항 레벨 파악에 탁월', '일반 캔들보다 추세 신호가 늦지만 신뢰도 높음', '트레이딩뷰에서 Renko 차트 유형으로 전환 가능'] },
        { diff: 'adv', label: '고급', tagline: 'ATR 동적 Brick · 전통적 지지·저항 매핑 · 시스템 트레이딩',
          desc: 'Traditional Renko는 고정 벽돌 크기를, ATR Renko는 동적 크기를 사용하며 시장 변동성에 자동으로 적응합니다. Renko 차트의 지지·저항은 일반 차트보다 허위 돌파 노이즈가 적어 알고리즘 트레이딩에서 지지·저항 기반 전략에 자주 활용됩니다. MA나 볼린저 밴드 같은 지표를 Renko에 적용하면 일반 차트보다 교차 신호가 명확하고 허위 신호가 적습니다. 단, 백테스팅 시 시간 정보가 없으므로 슬리피지와 오더북 깊이를 별도로 모델링해야 합니다.',
          features: ['ATR Renko: 변동성 변화에 자동 적응하는 동적 벽돌', 'Traditional Renko보다 ATR Renko가 매개변수 최적화 필요 없음', 'Renko + MA: 일반 차트보다 교차 신호 명확, 허위 신호 감소', '알고리즘 지지·저항 매핑 전략에 적합', '백테스팅 시 시간 정보 부재 → 슬리피지 별도 고려'] },
      ],
    },
    {
      id: 'volume-profile', nameKr: '볼륨 프로파일', nameEn: 'Volume Profile',
      icon: '<svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="4" width="22" height="4" fill="rgba(106,216,255,0.4)"/><rect x="30" y="10" width="16" height="4" fill="rgba(106,216,255,0.3)"/><rect x="30" y="16" width="26" height="4" fill="#6ad8ff"/><rect x="30" y="22" width="18" height="4" fill="rgba(106,216,255,0.3)"/><rect x="30" y="28" width="10" height="4" fill="rgba(106,216,255,0.2)"/><polyline points="4,6 10,8 16,20 22,24 28,18" stroke="rgba(46,230,160,0.6)" stroke-width="1.5" fill="none"/><line x1="30" y1="18" x2="56" y2="18" stroke="#ffd84d" stroke-width="1" stroke-dasharray="2,2"/></svg>',
      levels: [
        { diff: 'begin', label: '입문', tagline: '어느 가격대에서 사람들이 가장 많이 거래했나',
          desc: '볼륨 프로파일은 차트 오른쪽에 가로 막대로 표시되는데, 막대가 길수록 그 가격대에서 거래가 많이 이루어졌다는 뜻입니다. 가장 긴 막대(POC)가 있는 가격대는 많은 사람이 그 가격을 "적당하다"고 생각하는 곳입니다. 가격이 그 부근으로 내려오면 다시 매수세가 몰릴 가능성이 높습니다.',
          features: ['막대가 길수록 그 가격대에서 거래 많음', 'POC(가장 긴 막대) = 가장 강한 지지·저항', '거래 많은 구간 → 가격이 오래 머무는 경향', '거래 적은 구간 → 가격이 빠르게 통과'] },
        { diff: 'mid', label: '중급', tagline: 'POC·VAH·VAL로 가격 매력 구간 파악',
          desc: 'POC(Point of Control)는 거래량 최대 가격대, VAH(Value Area High)와 VAL(Value Area Low)은 전체 거래량의 70%가 일어난 범위의 상단·하단입니다. 가격이 Value Area를 벗어나면 유의미한 가격 발견(Price Discovery) 구간으로 빠르게 움직일 가능성이 있습니다. VPSV(Fixed Range)는 특정 기간, VPVR(Visible Range)은 화면에 보이는 구간을 분석할 때 사용합니다.',
          features: ['POC = 최대 거래량 가격대, 핵심 지지·저항', 'VAH/VAL: 전체 거래량 70% 범위 (가격 발견 핵심 구간)', 'Value Area 밖 = 빠른 가격 이동 경향', 'HVN(High Volume Node) = 강한 지지·저항 레벨', 'LVN(Low Volume Node) = 약한 지지·저항, 빠른 통과'] },
        { diff: 'adv', label: '고급', tagline: 'VPOC 마이그레이션 · 가격 발견 단계 · 오더플로우',
          desc: 'VPOC(Volume Point of Control) 마이그레이션은 POC가 시간이 지나면서 이동하는 방향으로 시장의 가격 발견 방향을 파악할 수 있습니다. 오더플로우(Order Flow) 분석과 결합하면 각 가격대에서 공격적 매수자와 매도자의 불균형을 정량화할 수 있습니다. 멀티 타임프레임 볼륨 프로파일(월간+주간+일간 VPOC 정렬)은 세력이 주목하는 가격대를 입체적으로 확인하는 고급 기법입니다.',
          features: ['VPOC 마이그레이션 방향 = 시장 가격 발견 방향', '오더플로우 + 볼륨프로파일 = 공격적 매수/매도 불균형 정량화', '멀티 TF VPOC 정렬 = 기관이 주목하는 가격대 식별', 'Gap Zone(LVN) 통과 시 슬리피지 유의 (유동성 부족)', 'Composite Profile로 여러 날의 프로파일 합산 분석'] },
      ],
    },
  ];

  function mzLocalTime(tz) {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    }).format(new Date());
  }

  /* Returns 'open' | 'pre' | 'after' | 'closed' */
  function mzStatus(zone) {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: zone.tz, hour: '2-digit', minute: '2-digit', hour12: false, weekday: 'short'
    }).formatToParts(new Date());
    const p = {};
    parts.forEach(x => { p[x.type] = x.value; });
    if (p.weekday === 'Sat' || p.weekday === 'Sun') return 'closed';
    const toM = s => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
    const now = parseInt(p.hour) * 60 + parseInt(p.minute);
    if (now >= toM(zone.open) && now < toM(zone.close)) return 'open';
    if (zone.pre  && now >= toM(zone.pre)  && now < toM(zone.open))  return 'pre';
    if (zone.after && now >= toM(zone.close) && now < toM(zone.after)) return 'after';
    return 'closed';
  }

  let activeMarketZone = null;

  function renderMarketZoneButtons() {
    const container = document.getElementById('market-zones');
    const pop = document.getElementById('mz-popover');
    if (!container || !pop) return;
    container.querySelectorAll('.mz-btn, .mz-divider').forEach(el => el.remove());
    MARKET_ZONES.forEach((zone, i) => {
      if (i > 0 && i % 6 === 0) {
        const div = document.createElement('span');
        div.className = 'mz-divider';
        container.insertBefore(div, pop);
      }
      const st  = mzStatus(zone);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mz-btn is-' + st + (activeMarketZone === zone.id ? ' selected' : '');
      btn.dataset.zone = zone.id;
      btn.textContent = zone.id;
      if (activeMarketZone === zone.id) btn.style.color = zone.c;
      container.insertBefore(btn, pop);
    });
  }

  const MZ_FEED = {
    open:   { text: 'LIVE',  color: 'var(--up)'   },
    pre:    { text: 'PRE',   color: 'var(--gold)'  },
    after:  { text: 'AFTER', color: 'var(--gold)'  },
    closed: { text: 'OFF',   color: 'var(--down)'  },
  };
  const MZ_STATUS_LABEL = {
    open:   { text: '● OPEN',      cls: 'live'  },
    pre:    { text: '◐ PRE-MKT',   cls: 'pre'   },
    after:  { text: '◐ AFTER-MKT', cls: 'after' },
    closed: { text: '○ CLOSED',    cls: 'off'   },
  };

  function tickMarketZone() {
    if (!activeMarketZone) return;
    const zone = MARKET_ZONES.find(z => z.id === activeMarketZone);
    if (!zone) return;
    const st = mzStatus(zone);
    const timeEl = document.getElementById('mz-pop-time');
    if (timeEl) timeEl.textContent = mzLocalTime(zone.tz);
    const statusEl = document.getElementById('mz-pop-status');
    if (statusEl) {
      statusEl.textContent = MZ_STATUS_LABEL[st].text;
      statusEl.className   = 'mz-pop-status ' + MZ_STATUS_LABEL[st].cls;
    }
    const feedEl = document.getElementById('feed-status');
    if (feedEl) {
      feedEl.textContent   = MZ_FEED[st].text;
      feedEl.style.color   = MZ_FEED[st].color;
    }
  }

  // Market zone button click handler
  document.getElementById('market-zones').addEventListener('click', e => {
    const btn = e.target.closest('.mz-btn');
    if (!btn) return;
    const zoneId = btn.dataset.zone;
    const zone   = MARKET_ZONES.find(z => z.id === zoneId);
    if (!zone) return;
    const pop = document.getElementById('mz-popover');

    // toggle off if same zone clicked while open
    if (activeMarketZone === zoneId && !pop.hidden) {
      pop.hidden = true;
      activeMarketZone = null;
      renderMarketZoneButtons();
      renderLogos();
      const feedEl = document.getElementById('feed-status');
      if (feedEl) { feedEl.textContent = 'LIVE'; feedEl.style.color = 'var(--up)'; }
      return;
    }

    activeMarketZone = zoneId;
    renderMarketZoneButtons();
    renderLogos(zoneId);

    // position popover centered under the clicked button
    pop.style.left = (btn.offsetLeft + btn.offsetWidth / 2) + 'px';

    // populate & show
    document.getElementById('mz-pop-city').textContent  = zone.city;
    document.getElementById('mz-pop-hours').textContent = zone.open + ' – ' + zone.close + ' LOCAL';
    tickMarketZone();
    pop.hidden = false;
  });

  // close popover when clicking outside the market-zones area
  document.addEventListener('click', e => {
    const mzEl = document.getElementById('market-zones');
    if (mzEl && !mzEl.contains(e.target)) {
      const pop = document.getElementById('mz-popover');
      if (pop && !pop.hidden) {
        pop.hidden = true;
        activeMarketZone = null;
        renderMarketZoneButtons();
        renderLogos();
        const feedEl = document.getElementById('feed-status');
        if (feedEl) { feedEl.textContent = 'LIVE'; feedEl.style.color = 'var(--up)'; }
      }
    }
  });

  renderMarketZoneButtons();

  // ---------- RESPONSIVE GLOBE STAGE ----------
  // .globe-stage starts large, then mouse wheel over the globe zooms it in/out.
  const stageEl = document.querySelector('.globe-stage');
  const areaEl = document.querySelector('.globe-area');
  let globeZoom = 1;
  function applyGlobeZoom() {
    if (!stageEl) return;
    stageEl.style.transform = `scale(${globeZoom})`;
  }
  function sizeStage() {
    if (!stageEl || !areaEl) return;
    const w = areaEl.clientWidth;
    const h = areaEl.clientHeight;
    if (w === 0 || h === 0) return;
    const s = Math.max(420, Math.min(w * 1.04, h * 1.22, 860));
    stageEl.style.width = s + 'px';
    stageEl.style.height = s + 'px';
    applyGlobeZoom();
  }
  if (areaEl) {
    areaEl.addEventListener('wheel', e => {
      e.preventDefault();
      globeZoom = Math.max(0.72, Math.min(1.58, globeZoom - e.deltaY * 0.00135));
      applyGlobeZoom();
    }, { passive: false });

    let dragState = null;
    areaEl.addEventListener('pointerdown', e => {
      if (e.button !== 0 || e.target.closest('button, a, input, textarea, select, g.city')) return;
      e.preventDefault();
      areaEl.setPointerCapture?.(e.pointerId);
      areaEl.classList.add('dragging');
      dragState = {
        x: e.clientX,
        y: e.clientY,
        rotate: projection.rotate().slice(),
      };
    });
    areaEl.addEventListener('pointermove', e => {
      if (!dragState) return;
      e.preventDefault();
      const dx = e.clientX - dragState.x;
      const dy = e.clientY - dragState.y;
      const nextLat = Math.max(-65, Math.min(65, dragState.rotate[1] - dy * 0.18));
      projection.rotate([dragState.rotate[0] + dx * 0.18, nextLat, dragState.rotate[2]]);
      if (countries) d3.select('#countries').selectAll('path').attr('d', path);
      d3.select('#graticule').attr('d', path(graticule));
      updateMarkers();
    });
    function endDrag(e) {
      if (!dragState) return;
      dragState = null;
      areaEl.classList.remove('dragging');
      if (e && areaEl.hasPointerCapture?.(e.pointerId)) {
        areaEl.releasePointerCapture(e.pointerId);
      }
    }
    areaEl.addEventListener('pointerup', endDrag);
    areaEl.addEventListener('pointercancel', endDrag);
    areaEl.addEventListener('lostpointercapture', endDrag);
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

  // ---- logo chip click → open chart for that company ----
  (function () {
    const moverIdx = new Map(MOVERS.map(m => [m.sym, m]));
    document.querySelectorAll('.logos-stack').forEach(stack => {
      stack.addEventListener('click', e => {
        const chip = e.target.closest('[data-ticker]');
        if (!chip) return;
        const ticker = chip.dataset.ticker;
        const name   = chip.dataset.name;
        const color  = chip.dataset.bg || '#6ad8ff';
        const mover  = moverIdx.get(ticker);
        const base   = mover ? mover.base : 1000;
        const region = mover ? mover.region : null;
        setChartContext({ title: ticker, subtitle: name + ' · 1m', base, color, region });
        setMode('chart');
      });
    });
  })();

  renderMovers();
  renderIndexDetail({ title: 'NIKKEI 225', base: 38461.55, color: '#ff4d6d', region: 'JP' });

  // ---- FX flyout category select ----
  document.getElementById('fx-flyout').addEventListener('click', e => {
    const btn = e.target.closest('[data-fxcat]');
    if (!btn) return;
    currentFxCat = btn.dataset.fxcat;
    document.querySelectorAll('#fx-flyout [data-fxcat]').forEach(b =>
      b.classList.toggle('active', b.dataset.fxcat === currentFxCat)
    );
    const ind = document.getElementById('fx-cat-indicator');
    if (ind) ind.textContent = currentFxCat;
    document.getElementById('fx-flyout').hidden = true;
    document.getElementById('fx-btn').classList.remove('open');
    renderFx();
    showToast('CATEGORY · ' + currentFxCat);
  });

  // ---- FX / Commodity row click → open chart ----
  document.getElementById('fx-list').addEventListener('click', e => {
    const row = e.target.closest('.ticker-row[data-sym]');
    if (!row) return;
    const sym   = row.dataset.sym;
    const base  = parseFloat(row.dataset.base) || 100;
    const color = row.dataset.color || '#6ad8ff';
    setChartContext({ title: sym, subtitle: currentFxCat + ' · 1m', base, color, region: null });
    setMode('chart');
    document.querySelectorAll('#fx-list .ticker-row').forEach(r =>
      r.classList.toggle('active', r.dataset.sym === sym)
    );
  });

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

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  async function renderRailNews() {
    const el = document.getElementById('rail-news-list');
    const status = document.getElementById('rail-news-status');
    if (!el) return;
    if (status) status.textContent = 'UPDATING';
    let rows = [];
    try {
      const response = await fetch('/api/news/live?category=market', { cache: 'no-store' });
      if (response.ok) {
        const payload = await response.json();
        rows = payload.items || [];
      }
    } catch (error) {
      rows = [];
    }
    if (!rows.length) {
      rows = NEWS.market.map(([title, body]) => ({
        title,
        source: 'KOSMO',
        summary: body,
        link: '',
        publishedAt: '',
      }));
    }
    el.innerHTML = rows.slice(0, 7).map((item, index) => {
      const source = item.source || 'NEWS';
      const thumb = source.slice(0, 3).toUpperCase();
      const link = item.link || '';
      return `<article class="rail-news-card" data-link="${escapeHtml(link)}">
        <div class="rail-thumb">${escapeHtml(thumb)}</div>
        <div>
          <div class="rail-news-title">${escapeHtml(item.title || '뉴스 제목 없음')}</div>
          <div class="rail-news-meta">${escapeHtml(source)} · ${escapeHtml(item.publishedAt || 'LIVE')}</div>
          <div class="rail-news-summary">${escapeHtml(item.summary || '')}</div>
        </div>
      </article>`;
    }).join('');
    if (status) status.textContent = 'LIVE';
  }

  document.getElementById('rail-news-list')?.addEventListener('click', event => {
    const card = event.target.closest('.rail-news-card');
    const link = card?.dataset.link;
    if (link) window.open(link, '_blank', 'noopener');
  });
  renderRailNews();
  setInterval(renderRailNews, 90000);

  function setMode(mode) {
    const next = mode === 'chart' || mode === 'news' || mode === 'login' || mode === 'chartlib' ? mode : 'globe';
    document.body.classList.toggle('chart-open',   next === 'chart');
    document.body.classList.toggle('news-open',    next === 'news');
    document.body.classList.toggle('login-open',   next === 'login');
    document.body.classList.toggle('chartlib-open', next === 'chartlib');
    document.getElementById('chart-overlay')?.setAttribute('aria-hidden',   next === 'chart'    ? 'false' : 'true');
    document.getElementById('news-view')?.setAttribute('aria-hidden',       next === 'news'     ? 'false' : 'true');
    document.getElementById('login-view')?.setAttribute('aria-hidden',      next === 'login'    ? 'false' : 'true');
    document.getElementById('chartlib-overlay')?.setAttribute('aria-hidden', next === 'chartlib' ? 'false' : 'true');
    if (next === 'news') renderNews(document.querySelector('.news-tab.active')?.dataset.news || 'current');
    if (next === 'chartlib') renderChartLib(CHART_TYPES[0].id, _clDiff);
  }

  let _clDiff = 'begin';

  function renderChartLib(chartId, diff) {
    const overlay = document.getElementById('chartlib-overlay');
    if (!overlay) return;
    const active = CHART_TYPES.find(t => t.id === chartId) || CHART_TYPES[0];
    if (diff) _clDiff = diff;
    const level = active.levels.find(l => l.diff === _clDiff) || active.levels[0];

    const grid = overlay.querySelector('#cl-grid');
    if (grid) {
      grid.innerHTML = CHART_TYPES.map(t => `
        <button type="button" class="cl-card${t.id === active.id ? ' active' : ''}" data-ct="${t.id}">
          <div class="cl-icon">${t.icon}</div>
          <div class="cl-card-name-kr">${t.nameKr}</div>
          <div class="cl-card-name-en">${t.nameEn}</div>
        </button>
      `).join('');
      grid.querySelectorAll('.cl-card').forEach(card => {
        card.addEventListener('click', () => renderChartLib(card.dataset.ct, _clDiff));
      });
    }

    const detail = overlay.querySelector('#cl-detail');
    if (detail) {
      const bigIcon = active.icon
        .replace('viewBox="0 0 60 40"', 'viewBox="0 0 60 40" width="150" height="100"');
      const diffColors = { begin: 'var(--up)', mid: 'var(--gold)', adv: 'var(--down)' };
      detail.innerHTML = `
        <div class="cl-detail-head">
          <div>
            <div class="cl-detail-title">${active.nameKr}</div>
            <div class="cl-detail-sub">${active.nameEn}</div>
          </div>
        </div>
        <div class="cl-diff-tabs">
          ${active.levels.map(l => `
            <button type="button" class="cl-diff-tab ${l.diff}${l.diff === _clDiff ? ' active' : ''}" data-diff="${l.diff}" data-ct="${active.id}">${l.label}</button>
          `).join('')}
        </div>
        <div class="cl-detail-tagline" style="color:${diffColors[_clDiff]}">${level.tagline}</div>
        <div class="cl-detail-icon">${bigIcon}</div>
        <p class="cl-detail-desc">${level.desc}</p>
        <div class="cl-detail-features">
          <div class="cl-features-label">핵심 포인트</div>
          ${level.features.map(f => `<div class="cl-feature-item">▸ ${f}</div>`).join('')}
        </div>
      `;
      detail.querySelectorAll('.cl-diff-tab').forEach(btn => {
        btn.addEventListener('click', () => renderChartLib(btn.dataset.ct, btn.dataset.diff));
      });
    }
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
      const sessEl = document.getElementById('sess'); if (sessEl) sessEl.textContent = t;
      const wlt = document.getElementById('wl-time'); if (wlt) wlt.textContent = t.slice(0, 8);
      document.getElementById('latency').textContent = `${10 + Math.floor(Math.random() * 12)} MS`;
      tickMarketZone();
      // refresh status dot on all market zone buttons every cycle
      document.querySelectorAll('.mz-btn').forEach(btn => {
        const z = MARKET_ZONES.find(x => x.id === btn.dataset.zone);
        if (!z) return;
        const st = mzStatus(z);
        btn.classList.remove('is-open', 'is-pre', 'is-after', 'is-closed');
        btn.classList.add('is-' + st);
      });
    }

    if (now - lastHeatTick > 2400) {
      lastHeatTick = now;
      renderHeat();
      renderIndexDetail(currentChartContext);
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

