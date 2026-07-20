import React, { useState } from 'react';

// ─── Conversion Data ──────────────────────────────────────────────────────────
const CATEGORIES = {
  length: {
    label: '📏 Length', group: 'everyday',
    base: 'meter',
    units: {
      meter:       { label: 'Meter (m)',           factor: 1 },
      kilometer:   { label: 'Kilometer (km)',       factor: 1000 },
      centimeter:  { label: 'Centimeter (cm)',      factor: 0.01 },
      millimeter:  { label: 'Millimeter (mm)',      factor: 0.001 },
      mile:        { label: 'Mile (mi)',            factor: 1609.344 },
      yard:        { label: 'Yard (yd)',            factor: 0.9144 },
      foot:        { label: 'Foot (ft)',            factor: 0.3048 },
      inch:        { label: 'Inch (in)',            factor: 0.0254 },
      nautical:    { label: 'Nautical Mile (nmi)',  factor: 1852 },
      light_year:  { label: 'Light Year (ly)',      factor: 9.461e15 },
      micrometer:  { label: 'Micrometer (μm)',      factor: 0.000001 },
    },
  },
  weight: {
    label: '⚖️ Weight', group: 'everyday',
    base: 'kilogram',
    units: {
      kilogram:  { label: 'Kilogram (kg)',  factor: 1 },
      gram:      { label: 'Gram (g)',       factor: 0.001 },
      milligram: { label: 'Milligram (mg)', factor: 0.000001 },
      pound:     { label: 'Pound (lb)',     factor: 0.453592 },
      ounce:     { label: 'Ounce (oz)',     factor: 0.0283495 },
      stone:     { label: 'Stone (st)',     factor: 6.35029 },
      tonne:     { label: 'Metric Ton (t)', factor: 1000 },
      us_ton:    { label: 'US Ton',         factor: 907.185 },
      microgram: { label: 'Microgram (μg)', factor: 0.000000001 },
    },
  },
  temperature: {
    label: '🌡️ Temperature', group: 'everyday',
    base: 'celsius', special: true,
    units: {
      celsius:    { label: 'Celsius (°C)' },
      fahrenheit: { label: 'Fahrenheit (°F)' },
      kelvin:     { label: 'Kelvin (K)' },
      rankine:    { label: 'Rankine (°R)' },
    },
  },
  volume: {
    label: '🧪 Volume', group: 'everyday',
    base: 'liter',
    units: {
      liter:      { label: 'Liter (L)',            factor: 1 },
      milliliter: { label: 'Milliliter (mL)',       factor: 0.001 },
      gallon_us:  { label: 'Gallon (US)',           factor: 3.78541 },
      gallon_uk:  { label: 'Gallon (UK)',           factor: 4.54609 },
      cup:        { label: 'Cup (US)',              factor: 0.236588 },
      pint_us:    { label: 'Pint (US)',             factor: 0.473176 },
      pint_uk:    { label: 'Pint (UK)',             factor: 0.568261 },
      fluid_oz:   { label: 'Fluid Ounce (US)',      factor: 0.0295735 },
      tablespoon: { label: 'Tablespoon (US)',       factor: 0.0147868 },
      teaspoon:   { label: 'Teaspoon (US)',         factor: 0.00492892 },
      cubic_m:    { label: 'Cubic Meter (m³)',      factor: 1000 },
      cubic_cm:   { label: 'Cubic Centimeter (cc)', factor: 0.001 },
    },
  },
  speed: {
    label: '🚀 Speed', group: 'everyday',
    base: 'mps',
    units: {
      mps:  { label: 'Meter/second (m/s)',    factor: 1 },
      kph:  { label: 'Kilometer/hour (km/h)', factor: 0.277778 },
      mph:  { label: 'Mile/hour (mph)',        factor: 0.44704 },
      knot: { label: 'Knot (kn)',             factor: 0.514444 },
      fps:  { label: 'Foot/second (fps)',      factor: 0.3048 },
      mach: { label: 'Mach',                  factor: 340.29 },
    },
  },
  area: {
    label: '🗺️ Area', group: 'everyday',
    base: 'sqm',
    units: {
      sqm:     { label: 'Square Meter (m²)',      factor: 1 },
      sqkm:    { label: 'Square Kilometer (km²)', factor: 1e6 },
      sqmile:  { label: 'Square Mile (mi²)',      factor: 2589988.1 },
      sqyard:  { label: 'Square Yard (yd²)',      factor: 0.836127 },
      sqfoot:  { label: 'Square Foot (ft²)',      factor: 0.092903 },
      sqinch:  { label: 'Square Inch (in²)',      factor: 0.00064516 },
      hectare: { label: 'Hectare (ha)',           factor: 10000 },
      acre:    { label: 'Acre',                  factor: 4046.86 },
    },
  },
  time: {
    label: '⏱️ Time', group: 'everyday',
    base: 'second',
    units: {
      microsecond: { label: 'Microsecond (μs)', factor: 0.000001 },
      millisecond: { label: 'Millisecond (ms)', factor: 0.001 },
      second:      { label: 'Second (s)',        factor: 1 },
      minute:      { label: 'Minute (min)',      factor: 60 },
      hour:        { label: 'Hour (hr)',         factor: 3600 },
      day:         { label: 'Day',              factor: 86400 },
      week:        { label: 'Week',             factor: 604800 },
      month:       { label: 'Month (avg)',       factor: 2628000 },
      year:        { label: 'Year',             factor: 31536000 },
      decade:      { label: 'Decade',           factor: 315360000 },
    },
  },
  cooking: {
    label: '🍳 Cooking', group: 'everyday',
    base: 'ml',
    units: {
      ml:         { label: 'Milliliter (mL)',    factor: 1 },
      liter:      { label: 'Liter (L)',          factor: 1000 },
      tsp:        { label: 'Teaspoon (tsp)',     factor: 4.92892 },
      tbsp:       { label: 'Tablespoon (tbsp)',  factor: 14.7868 },
      fl_oz:      { label: 'Fluid Ounce (fl oz)',factor: 29.5735 },
      cup_us:     { label: 'Cup (US)',           factor: 236.588 },
      cup_metric: { label: 'Cup (Metric)',       factor: 250 },
      pint:       { label: 'Pint (US)',          factor: 473.176 },
      quart:      { label: 'Quart (US)',         factor: 946.353 },
      gallon:     { label: 'Gallon (US)',        factor: 3785.41 },
    },
  },
  data: {
    label: '💾 Data Storage', group: 'tech',
    base: 'byte',
    units: {
      bit:      { label: 'Bit (b)',         factor: 0.125 },
      byte:     { label: 'Byte (B)',        factor: 1 },
      kilobyte: { label: 'Kilobyte (KB)',   factor: 1024 },
      megabyte: { label: 'Megabyte (MB)',   factor: 1048576 },
      gigabyte: { label: 'Gigabyte (GB)',   factor: 1073741824 },
      terabyte: { label: 'Terabyte (TB)',   factor: 1099511627776 },
      petabyte: { label: 'Petabyte (PB)',   factor: 1.126e15 },
      gibibyte: { label: 'Gibibyte (GiB)',  factor: 1073741824 },
    },
  },
  frequency: {
    label: '📡 Frequency', group: 'tech',
    base: 'hz',
    units: {
      hz:  { label: 'Hertz (Hz)',      factor: 1 },
      khz: { label: 'Kilohertz (kHz)', factor: 1000 },
      mhz: { label: 'Megahertz (MHz)', factor: 1000000 },
      ghz: { label: 'Gigahertz (GHz)', factor: 1e9 },
      thz: { label: 'Terahertz (THz)', factor: 1e12 },
      rpm: { label: 'RPM',            factor: 0.016667 },
    },
  },
  typography: {
    label: '🖥️ Typography', group: 'tech',
    base: 'px',
    units: {
      px:   { label: 'Pixel (px)',       factor: 1 },
      pt:   { label: 'Point (pt)',       factor: 1.333333 },
      em:   { label: 'Em (em)',          factor: 16 },
      rem:  { label: 'Rem (rem)',        factor: 16 },
      cm:   { label: 'Centimeter (cm)',  factor: 37.7953 },
      mm:   { label: 'Millimeter (mm)',  factor: 3.77953 },
      inch: { label: 'Inch (in)',        factor: 96 },
    },
  },
  numbersys: {
    label: '🔢 Number Systems', group: 'tech',
    special: true, base: 'decimal',
    units: {
      decimal: { label: 'Decimal (Base 10)' },
      binary:  { label: 'Binary (Base 2)' },
      octal:   { label: 'Octal (Base 8)' },
      hex:     { label: 'Hexadecimal (Base 16)' },
    },
  },
  energy: {
    label: '⚡ Energy', group: 'science',
    base: 'joule',
    units: {
      joule:       { label: 'Joule (J)',           factor: 1 },
      kilojoule:   { label: 'Kilojoule (kJ)',      factor: 1000 },
      calorie:     { label: 'Calorie (cal)',       factor: 4.184 },
      kilocalorie: { label: 'Kilocalorie (kcal)',  factor: 4184 },
      wh:          { label: 'Watt-hour (Wh)',      factor: 3600 },
      kwh:         { label: 'Kilowatt-hour (kWh)', factor: 3600000 },
      btu:         { label: 'BTU',                factor: 1055.06 },
      ev:          { label: 'Electronvolt (eV)',   factor: 1.602e-19 },
    },
  },
  pressure: {
    label: '🔵 Pressure', group: 'science',
    base: 'pascal',
    units: {
      pascal:     { label: 'Pascal (Pa)',        factor: 1 },
      kilopascal: { label: 'Kilopascal (kPa)',   factor: 1000 },
      megapascal: { label: 'Megapascal (MPa)',   factor: 1000000 },
      bar:        { label: 'Bar',               factor: 100000 },
      psi:        { label: 'PSI (lb/in²)',       factor: 6894.76 },
      atm:        { label: 'Atmosphere (atm)',   factor: 101325 },
      mmhg:       { label: 'mmHg (Torr)',        factor: 133.322 },
      inhg:       { label: 'inHg',              factor: 3386.39 },
    },
  },
  power: {
    label: '💡 Power', group: 'science',
    base: 'watt',
    units: {
      watt:       { label: 'Watt (W)',           factor: 1 },
      kilowatt:   { label: 'Kilowatt (kW)',      factor: 1000 },
      megawatt:   { label: 'Megawatt (MW)',      factor: 1000000 },
      horsepower: { label: 'Horsepower (hp)',    factor: 745.7 },
      hp_metric:  { label: 'Horsepower (metric)',factor: 735.499 },
      btu_hr:     { label: 'BTU/hour',          factor: 0.29307 },
    },
  },
  force: {
    label: '🏋️ Force', group: 'science',
    base: 'newton',
    units: {
      newton:     { label: 'Newton (N)',          factor: 1 },
      kilonewton: { label: 'Kilonewton (kN)',     factor: 1000 },
      dyne:       { label: 'Dyne',               factor: 0.00001 },
      pound_f:    { label: 'Pound-force (lbf)',  factor: 4.44822 },
      kgf:        { label: 'Kilogram-force (kgf)',factor: 9.80665 },
      ounce_f:    { label: 'Ounce-force (ozf)',  factor: 0.278014 },
    },
  },
  angle: {
    label: '📐 Angle', group: 'science',
    base: 'degree',
    units: {
      degree:    { label: 'Degree (°)',        factor: 1 },
      radian:    { label: 'Radian (rad)',      factor: 57.2958 },
      gradian:   { label: 'Gradian (gon)',     factor: 0.9 },
      arcminute: { label: "Arcminute (')",     factor: 0.016667 },
      arcsecond: { label: 'Arcsecond (")',     factor: 0.000278 },
      turn:      { label: 'Turn (revolution)', factor: 360 },
    },
  },
  torque: {
    label: '🔩 Torque', group: 'automotive',
    base: 'nm',
    units: {
      nm:     { label: 'Newton-meter (Nm)',  factor: 1 },
      ft_lb:  { label: 'Foot-pound (ft·lb)', factor: 1.35582 },
      in_lb:  { label: 'Inch-pound (in·lb)', factor: 0.112985 },
      kgf_m:  { label: 'kgf·m',            factor: 9.80665 },
      kgf_cm: { label: 'kgf·cm',           factor: 0.0980665 },
    },
  },
  fuel: {
    label: '⛽ Fuel Economy', group: 'automotive',
    base: 'l100km', special: true,
    units: {
      l100km: { label: 'Liters/100km (L/100km)' },
      kml:    { label: 'Kilometers/liter (km/L)' },
      mpg_us: { label: 'Miles/gallon US (mpg)' },
      mpg_uk: { label: 'Miles/gallon UK (mpg)' },
    },
  },
};

const GROUPS = {
  everyday:   { label: '🏠 Everyday',  color: '#2563eb' },
  tech:       { label: '💻 Tech',       color: '#7c3aed' },
  science:    { label: '🔬 Science',    color: '#059669' },
  automotive: { label: '🚗 Automotive', color: '#dc2626' },
};

function convert(value, from, to, catKey) {
  if (value === '' || value === null || value === undefined) return '';
  const cat = CATEGORIES[catKey];
  if (catKey === 'temperature') {
    const v = parseFloat(value); if (isNaN(v)) return '';
    let c;
    if (from === 'celsius')    c = v;
    if (from === 'fahrenheit') c = (v - 32) * 5 / 9;
    if (from === 'kelvin')     c = v - 273.15;
    if (from === 'rankine')    c = (v - 491.67) * 5 / 9;
    if (to === 'celsius')    return round(c);
    if (to === 'fahrenheit') return round(c * 9 / 5 + 32);
    if (to === 'kelvin')     return round(c + 273.15);
    if (to === 'rankine')    return round((c + 273.15) * 9 / 5);
  }
  if (catKey === 'fuel') {
    const v = parseFloat(value); if (isNaN(v) || v === 0) return '';
    let l100;
    if (from === 'l100km') l100 = v;
    if (from === 'kml')    l100 = 100 / v;
    if (from === 'mpg_us') l100 = 235.214 / v;
    if (from === 'mpg_uk') l100 = 282.481 / v;
    if (to === 'l100km')  return round(l100);
    if (to === 'kml')     return round(100 / l100);
    if (to === 'mpg_us')  return round(235.214 / l100);
    if (to === 'mpg_uk')  return round(282.481 / l100);
  }
  if (catKey === 'numbersys') {
    const str = String(value).trim(); if (!str) return '';
    try {
      let decimal;
      if (from === 'decimal') decimal = parseInt(str, 10);
      if (from === 'binary')  decimal = parseInt(str, 2);
      if (from === 'octal')   decimal = parseInt(str, 8);
      if (from === 'hex')     decimal = parseInt(str, 16);
      if (isNaN(decimal)) return 'Invalid';
      if (to === 'decimal') return decimal.toString(10);
      if (to === 'binary')  return decimal.toString(2);
      if (to === 'octal')   return decimal.toString(8);
      if (to === 'hex')     return decimal.toString(16).toUpperCase();
    } catch { return 'Invalid'; }
  }
  const v = parseFloat(value); if (isNaN(v)) return '';
  const units = cat.units;
  const base = v * units[from].factor;
  return round(base / units[to].factor);
}

function round(n) {
  if (Math.abs(n) >= 1e12 || (Math.abs(n) < 1e-6 && n !== 0)) return parseFloat(n.toExponential(6));
  const r = parseFloat(n.toPrecision(8));
  return r % 1 === 0 ? r : parseFloat(r.toFixed(8).replace(/\.?0+$/, ''));
}

const QUICK = [
  { cat: 'length',      from: 'centimeter',  to: 'inch',       label: 'cm → in' },
  { cat: 'length',      from: 'kilometer',   to: 'mile',       label: 'km → mi' },
  { cat: 'weight',      from: 'kilogram',    to: 'pound',      label: 'kg → lb' },
  { cat: 'temperature', from: 'celsius',     to: 'fahrenheit', label: '°C → °F' },
  { cat: 'temperature', from: 'fahrenheit',  to: 'celsius',    label: '°F → °C' },
  { cat: 'data',        from: 'gigabyte',    to: 'megabyte',   label: 'GB → MB' },
  { cat: 'data',        from: 'megabyte',    to: 'gigabyte',   label: 'MB → GB' },
  { cat: 'energy',      from: 'kilocalorie', to: 'kilojoule',  label: 'kcal → kJ' },
  { cat: 'pressure',    from: 'psi',         to: 'bar',        label: 'PSI → bar' },
  { cat: 'fuel',        from: 'mpg_us',      to: 'l100km',     label: 'mpg → L/100km' },
  { cat: 'cooking',     from: 'cup_us',      to: 'ml',         label: 'cup → mL' },
  { cat: 'cooking',     from: 'tbsp',        to: 'ml',         label: 'tbsp → mL' },
  { cat: 'angle',       from: 'degree',      to: 'radian',     label: 'deg → rad' },
  { cat: 'power',       from: 'kilowatt',    to: 'horsepower', label: 'kW → hp' },
  { cat: 'torque',      from: 'nm',          to: 'ft_lb',      label: 'Nm → ft·lb' },
  { cat: 'numbersys',   from: 'decimal',     to: 'binary',     label: 'Dec → Bin' },
  { cat: 'numbersys',   from: 'decimal',     to: 'hex',        label: 'Dec → Hex' },
];

export default function UnitConverter() {
  const [category, setCategory]       = useState('length');
  const [from, setFrom]               = useState('centimeter');
  const [to, setTo]                   = useState('inch');
  const [input, setInput]             = useState('');
  const [copied, setCopied]           = useState(false);
  const [activeGroup, setActiveGroup] = useState('everyday');

  const cat    = CATEGORIES[category];
  const units  = cat.units;
  const output = convert(input, from, to, category);

  const handleCategoryChange = (key) => {
    setCategory(key);
    const keys = Object.keys(CATEGORIES[key].units);
    setFrom(keys[0]); setTo(keys[1]); setInput('');
  };
  const handleSwap = () => { setFrom(to); setTo(from); setInput(output !== '' ? String(output) : ''); };
  const handleQuick = (q) => { setCategory(q.cat); setActiveGroup(CATEGORIES[q.cat].group); setFrom(q.from); setTo(q.to); setInput(''); };
  const handleCopy = () => {
    if (output === '') return;
    navigator.clipboard.writeText(String(output)).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const groupCats  = Object.entries(CATEGORIES).filter(([, v]) => v.group === activeGroup);
  const groupColor = GROUPS[activeGroup]?.color || '#2563eb';
  const font       = 'Inter, -apple-system, BlinkMacSystemFont, sans-serif';
  const isNumberSys = category === 'numbersys';

  const S = {
    page:       { minHeight: '100vh', background: '#f8fafc', fontFamily: font, padding: '0 0 80px' },
    nav:        { background: '#0f172a', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    navBrand:   { color: 'white', fontWeight: 700, fontSize: 18, textDecoration: 'none' },
    navLink:    { color: '#94a3b8', fontSize: 13, textDecoration: 'none' },
    hero:       { background: `linear-gradient(135deg, #0f172a 0%, ${groupColor} 100%)`, padding: '36px 20px 28px', textAlign: 'center', transition: 'background 0.4s' },
    heroTitle:  { color: 'white', fontSize: 28, fontWeight: 800, margin: '0 0 6px' },
    heroSub:    { color: '#bfdbfe', fontSize: 13, margin: 0 },
    wrap:       { maxWidth: 680, margin: '0 auto', padding: '0 16px' },
    groupRow:   { display: 'flex', gap: 8, padding: '18px 0 4px', overflowX: 'auto', scrollbarWidth: 'none' },
    catRow:     { display: 'flex', gap: 6, padding: '8px 0 12px', overflowX: 'auto', scrollbarWidth: 'none' },
    card:       { background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: 24, marginBottom: 20 },
    ioRow:      { display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'end', marginBottom: 16 },
    fieldLabel: { fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 6 },
    select:     { width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 14, color: '#0f172a', background: 'white', cursor: 'pointer', outline: 'none', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', paddingRight: 32 },
    inputField: { width: '100%', padding: '12px 14px', borderRadius: 10, border: `1.5px solid ${groupColor}`, fontSize: 18, fontWeight: 600, color: '#0f172a', outline: 'none', boxSizing: 'border-box', background: '#f0f9ff', marginTop: 8 },
    outputBox:  { padding: '12px 14px', borderRadius: 10, marginTop: 8, border: '1.5px solid #e2e8f0', fontSize: 18, fontWeight: 700, color: groupColor, background: '#f8fafc', minHeight: 48, display: 'flex', alignItems: 'center' },
    swapBtn:    { width: 40, height: 40, borderRadius: '50%', background: '#f1f5f9', border: '1.5px solid #e2e8f0', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, alignSelf: 'center', marginTop: 20 },
    resultRow:  { background: '#f1f5f9', borderRadius: 10, padding: '12px 16px', fontSize: 14, color: '#475569', textAlign: 'center', marginBottom: 12 },
    copyBtn:    { width: '100%', padding: '11px 0', background: output !== '' ? groupColor : '#e2e8f0', color: output !== '' ? 'white' : '#94a3b8', border: 'none', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: output !== '' ? 'pointer' : 'default' },
    sectionTitle:{ fontSize: 12, fontWeight: 700, color: '#94a3b8', marginBottom: 10, letterSpacing: 1 },
    quickGrid:  { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 },
    quickBtn:   { padding: '10px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: 'white', fontSize: 13, fontWeight: 600, color: '#334155', cursor: 'pointer', textAlign: 'left' },
    footer:     { textAlign: 'center', marginTop: 32, fontSize: 13, color: '#94a3b8' },
  };

  const groupTabStyle = (key) => ({ padding: '8px 18px', borderRadius: 20, border: 'none', background: activeGroup === key ? GROUPS[key].color : 'white', color: activeGroup === key ? 'white' : '#475569', fontWeight: 600, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', flexShrink: 0 });
  const catTabStyle   = (key) => ({ padding: '6px 14px', borderRadius: 16, border: 'none', background: category === key ? groupColor : '#f1f5f9', color: category === key ? 'white' : '#64748b', fontWeight: 600, fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 });

  return (
    <div style={S.page}>
      <nav style={S.nav}>
        <a href="https://tabutility.com" style={S.navBrand}>🔧 Tabutility</a>
        <a href="https://tabutility.com" style={S.navLink}>← All Tools</a>
      </nav>
      <div style={S.hero}>
        <h1 style={S.heroTitle}>Unit Converter</h1>
        <p style={S.heroSub}>19 categories · 150+ units · instant results · no sign-up</p>
      </div>
      <div style={S.wrap}>
        <div style={S.groupRow}>
          {Object.entries(GROUPS).map(([key, val]) => (
            <button key={key} style={groupTabStyle(key)} onClick={() => {
              setActiveGroup(key);
              const first = Object.entries(CATEGORIES).find(([, v]) => v.group === key);
              if (first) handleCategoryChange(first[0]);
            }}>{val.label}</button>
          ))}
        </div>
        <div style={S.catRow}>
          {groupCats.map(([key, val]) => (
            <button key={key} style={catTabStyle(key)} onClick={() => handleCategoryChange(key)}>{val.label}</button>
          ))}
        </div>
        <div style={S.card}>
          <div style={S.ioRow}>
            <div>
              <div style={S.fieldLabel}>FROM</div>
              <select style={S.select} value={from} onChange={e => setFrom(e.target.value)}>
                {Object.entries(units).map(([k, u]) => <option key={k} value={k}>{u.label}</option>)}
              </select>
              <input style={S.inputField} type={isNumberSys ? 'text' : 'number'} placeholder={isNumberSys ? 'Enter number' : 'Enter value'} value={input} onChange={e => setInput(e.target.value)} />
            </div>
            <button style={S.swapBtn} onClick={handleSwap}>⇄</button>
            <div>
              <div style={S.fieldLabel}>TO</div>
              <select style={S.select} value={to} onChange={e => setTo(e.target.value)}>
                {Object.entries(units).map(([k, u]) => <option key={k} value={k}>{u.label}</option>)}
              </select>
              <div style={S.outputBox}>
                {output !== '' ? String(output) : <span style={{ color: '#cbd5e1' }}>Result</span>}
              </div>
            </div>
          </div>
          {output !== '' && input !== '' && (
            <div style={S.resultRow}>
              <strong>{input} {units[from]?.label?.split(' ')[0]}</strong>
              {' = '}
              <strong style={{ color: groupColor }}>{output} {units[to]?.label?.split(' ')[0]}</strong>
            </div>
          )}
          <button style={S.copyBtn} onClick={handleCopy}>{copied ? '✓ Copied!' : 'Copy Result'}</button>
        </div>
        <div style={S.sectionTitle}>QUICK CONVERSIONS</div>
        <div style={S.quickGrid}>
          {QUICK.map((q, i) => (
            <button key={i} style={S.quickBtn} onClick={() => handleQuick(q)}>{q.label}</button>
          ))}
        </div>
        <div style={S.footer}>
          ✓ Free · No sign-up · 19 categories · 150+ units<br />
          <a href="https://tabutility.com" style={{ color: '#94a3b8' }}>tabutility.com</a>
        </div>
      </div>
    </div>
  );
}
