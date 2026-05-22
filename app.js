/* ════════════════════════════════════════
   LOCALSTORAGE PERSISTENCE
════════════════════════════════════════ */
function saveAll() {
  try {
    localStorage.setItem('lx_records',    JSON.stringify(records));
    localStorage.setItem('lx_clientes',   JSON.stringify(clientes));
    localStorage.setItem('lx_audiencias', JSON.stringify(audiencias));
    localStorage.setItem('lx_documentos', JSON.stringify(documentos));
    localStorage.setItem('lx_facturas',   JSON.stringify(facturas));
    localStorage.setItem('lx_timerLogs',  JSON.stringify(timerLogs));
    localStorage.setItem('lx_cfg',        JSON.stringify(cfgData));
  } catch(e) { /* quota exceeded or private mode */ }
}

function loadAll() {
  try {
    const r  = localStorage.getItem('lx_records');    if(r)  records    = JSON.parse(r);
    const c  = localStorage.getItem('lx_clientes');   if(c)  clientes   = JSON.parse(c);
    const a  = localStorage.getItem('lx_audiencias'); if(a)  audiencias = JSON.parse(a);
    const d  = localStorage.getItem('lx_documentos'); if(d)  documentos = JSON.parse(d);
    const f  = localStorage.getItem('lx_facturas');   if(f)  facturas   = JSON.parse(f);
    const tl = localStorage.getItem('lx_timerLogs');  if(tl) timerLogs  = JSON.parse(tl);
    const cfg= localStorage.getItem('lx_cfg');        if(cfg) cfgData   = JSON.parse(cfg);
  } catch(e) { /* ignore */ }
}

/* ════════════════════════════════════════
   DEFAULT DATA
════════════════════════════════════════ */
let records = [
  { id:'LEX-001', cliente:'Ana Belkis Núñez',  cedula:'001-1234567-1', tipo:'Derecho Civil',         abogado:'Dra. M. Rodríguez', fecha:'2025-04-12', estado:'Activo',    prioridad:'Alta',  desc:'Demanda por incumplimiento de contrato de arrendamiento comercial.', historial:[] },
  { id:'LEX-002', cliente:'Roberto Almonte',    cedula:'002-9876543-2', tipo:'Derecho Laboral',       abogado:'Lic. A. Fernández', fecha:'2025-04-08', estado:'Urgente',   prioridad:'Alta',  desc:'Despido injustificado con reclamación de prestaciones laborales.', historial:[] },
  { id:'LEX-003', cliente:'Empresas CORE SRL',  cedula:'1-30-12345-7',  tipo:'Derecho Comercial',     abogado:'Dr. J. Castro',     fecha:'2025-03-30', estado:'Pendiente', prioridad:'Media', desc:'Fusión societaria y registro de nueva razón social.', historial:[] },
  { id:'LEX-004', cliente:'Ingrid Martínez',    cedula:'003-4561230-5', tipo:'Derecho Familiar',      abogado:'Dra. M. Rodríguez', fecha:'2025-03-22', estado:'Activo',    prioridad:'Media', desc:'Proceso de divorcio consensual con partición de bienes.', historial:[] },
  { id:'LEX-005', cliente:'Carlos Tejeda',      cedula:'004-7890123-8', tipo:'Derecho Penal',         abogado:'Lic. S. Peralta',   fecha:'2025-03-15', estado:'Cerrado',   prioridad:'Baja',  desc:'Defensa en caso de robo. Sentencia absolutoria obtenida.', historial:[] },
  { id:'LEX-006', cliente:'TechRD Solutions',   cedula:'1-31-98765-4',  tipo:'Propiedad Intelectual', abogado:'Dr. J. Castro',     fecha:'2025-04-20', estado:'Activo',    prioridad:'Alta',  desc:'Registro de marca y patente de software fintech.', historial:[] },
];

let clientes = [
  { id:'CLI-001', nombre:'Ana Belkis Núñez',  cedula:'001-1234567-1', tipo:'Persona Natural', telefono:'809-555-0101', email:'ana.nunez@email.com',    direccion:'Av. 27 de Febrero #45, Santo Domingo', notas:'' },
  { id:'CLI-002', nombre:'Roberto Almonte',    cedula:'002-9876543-2', tipo:'Persona Natural', telefono:'809-555-0202', email:'r.almonte@email.com',     direccion:'Calle El Conde #12, Santo Domingo',    notas:'' },
  { id:'CLI-003', nombre:'Empresas CORE SRL',  cedula:'1-30-12345-7',  tipo:'Empresa',         telefono:'809-555-0303', email:'legal@coresrl.com',       direccion:'Av. Winston Churchill, Torre Core, P3', notas:'Contacto principal: Ing. Luis Pérez' },
  { id:'CLI-004', nombre:'Ingrid Martínez',    cedula:'003-4561230-5', tipo:'Persona Natural', telefono:'809-555-0404', email:'ingrid.m@email.com',      direccion:'Los Prados, C/ Las Flores #8',         notas:'' },
  { id:'CLI-005', nombre:'Carlos Tejeda',      cedula:'004-7890123-8', tipo:'Persona Natural', telefono:'809-555-0505', email:'carlos.tejeda@email.com', direccion:'Villa Consuelo, C/ 5 #22',             notas:'Caso cerrado' },
  { id:'CLI-006', nombre:'TechRD Solutions',   cedula:'1-31-98765-4',  tipo:'Empresa',         telefono:'809-555-0606', email:'info@techrd.com',         direccion:'Zona Franca Las Américas, Local 14',   notas:'Facturación mensual' },
];

let audiencias = [
  { id:'AUD-001', expedienteId:'LEX-001', cliente:'Ana Belkis Núñez',  tipo:'Audiencia Preliminar',     fecha:'2025-05-10', hora:'09:00', tribunal:'Juzgado Civil y Comercial, Sala 2',  estado:'Completada', notas:'' },
  { id:'AUD-002', expedienteId:'LEX-002', cliente:'Roberto Almonte',   tipo:'Audiencia de Fondo',       fecha:'2025-05-20', hora:'10:30', tribunal:'Tribunal Laboral, 1er Distrito',     estado:'Programada', notas:'Llevar contrato original' },
  { id:'AUD-003', expedienteId:'LEX-004', cliente:'Ingrid Martínez',   tipo:'Audiencia de Conciliación',fecha:'2025-05-18', hora:'14:00', tribunal:'Juzgado de Familia, Sala 1',         estado:'Programada', notas:'' },
  { id:'AUD-004', expedienteId:'LEX-006', cliente:'TechRD Solutions',  tipo:'Vista de Causa',           fecha:'2025-04-30', hora:'11:00', tribunal:'Oficina Nacional de PI',             estado:'Completada', notas:'' },
  { id:'AUD-005', expedienteId:'LEX-003', cliente:'Empresas CORE SRL', tipo:'Audiencia de Sentencia',   fecha:'2025-06-05', hora:'09:30', tribunal:'Cámara Comercial, Santo Domingo',    estado:'Programada', notas:'Confirmar asistencia del representante legal' },
  { id:'AUD-006', expedienteId:'LEX-005', cliente:'Carlos Tejeda',     tipo:'Audiencia de Fondo',       fecha:'2025-03-20', hora:'08:00', tribunal:'Juzgado Penal Colegiado, Sala 4',    estado:'Cancelada',  notas:'Reprogramada por el tribunal' },
];

let documentos = [
  { id:'DOC-001', nombre:'Contrato de Arrendamiento Comercial', expedienteId:'LEX-001', tipo:'Contrato',  autor:'Dra. M. Rodríguez', fecha:'2025-04-12', tamano:'245 KB', estado:'Final',   notas:'' },
  { id:'DOC-002', nombre:'Demanda Laboral - Almonte vs Empresa', expedienteId:'LEX-002', tipo:'Demanda',   autor:'Lic. A. Fernández', fecha:'2025-04-08', tamano:'512 KB', estado:'Firmado', notas:'' },
  { id:'DOC-003', nombre:'Acta de Fusión Empresas CORE',         expedienteId:'LEX-003', tipo:'Contrato',  autor:'Dr. J. Castro',     fecha:'2025-03-30', tamano:'1.2 MB', estado:'Borrador',notas:'Pendiente revisión notarial' },
  { id:'DOC-004', nombre:'Poder Especial - Ingrid Martínez',     expedienteId:'LEX-004', tipo:'Poder',     autor:'Dra. M. Rodríguez', fecha:'2025-03-22', tamano:'98 KB',  estado:'Firmado', notas:'' },
  { id:'DOC-005', nombre:'Sentencia Absolutoria - Tejeda',       expedienteId:'LEX-005', tipo:'Sentencia', autor:'Lic. S. Peralta',   fecha:'2025-03-15', tamano:'330 KB', estado:'Final',   notas:'Archivado' },
  { id:'DOC-006', nombre:'Solicitud Registro de Marca TechRD',   expedienteId:'LEX-006', tipo:'Otro',      autor:'Dr. J. Castro',     fecha:'2025-04-20', tamano:'780 KB', estado:'Final',   notas:'' },
];

let facturas = [
  { id:'FAC-001', cliente:'Ana Belkis Núñez',  expedienteId:'LEX-001', fecha:'2025-04-12', vencimiento:'2025-05-12', monto:15000, estado:'Pagada',   categoria:'Derecho Civil',   desc:'Honorarios - Demanda arrendamiento' },
  { id:'FAC-002', cliente:'Roberto Almonte',   expedienteId:'LEX-002', fecha:'2025-04-08', vencimiento:'2025-05-08', monto:22000, estado:'Pendiente', categoria:'Derecho Laboral', desc:'Honorarios - Caso laboral' },
  { id:'FAC-003', cliente:'Empresas CORE SRL', expedienteId:'LEX-003', fecha:'2025-03-30', vencimiento:'2025-04-29', monto:45000, estado:'Vencida',   categoria:'Derecho Comercial',desc:'Asesoría fusión societaria' },
  { id:'FAC-004', cliente:'Ingrid Martínez',   expedienteId:'LEX-004', fecha:'2025-03-22', vencimiento:'2025-04-21', monto:8500,  estado:'Pagada',    categoria:'Derecho Familiar', desc:'Honorarios - Divorcio consensual' },
  { id:'FAC-005', cliente:'TechRD Solutions',  expedienteId:'LEX-006', fecha:'2025-04-20', vencimiento:'2025-05-20', monto:35000, estado:'Pendiente', categoria:'Propiedad Intelectual', desc:'Registro marca y patente' },
];

let timerLogs = {};   // { 'LEX-001': [{start, end, duration, nota}] }
let cfgData = {
  nombre: 'LexCore — Gestión Legal', rut: '76.543.210-K',
  email: 'facturacion@lexcore.com',  tel: '+1 809 000 0000',
  dir: 'Av. Abraham Lincoln 1234, Santo Domingo',
  moneda: 'USD', venc: 30, nota: 'Gracias por su confianza. Pago vía transferencia bancaria o cheque.',
  notifs: { pagada:true, vencida:true, proxima:true, resumen:false, nuevo:true }
};

// Load persisted data
loadAll();

/* ════════════════════════════════════════
   STATE
════════════════════════════════════════ */
let filtered      = [...records];
let sortDir       = {};
let currentFilter = 'todos';
let currentSearch = '';
let currentPage   = 1;
const PAGE_SIZE   = 4;
let editingIndex  = null;

// Timer state
let activeTimer = null; // { expId, start, interval }
let currentTimerExpId = null;

/* ════════════════════════════════════════
   NAV
════════════════════════════════════════ */
const titles = {
  expedientes:  'Registro de Servicios',
  clientes:     'Clientes',
  audiencias:   'Audiencias',
  documentos:   'Documentos',
  facturacion:  'Facturación',
  informes:     'Informes',
  configuracion:'Configuración',
};

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', function () {
    const view = this.dataset.view;
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    this.classList.add('active');
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + view).classList.add('active');
    document.getElementById('topbar-title').textContent = titles[view] || view;
    if (view === 'informes')    updateInformes();
    if (view === 'audiencias')  { applyAudienciaFilters(); renderCalendar(); }
    if (view === 'facturacion') updateFacturaStats();
    if (view === 'configuracion') loadCfgUI();
  });
});

/* ════════════════════════════════════════
   KEYBOARD SHORTCUTS
════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  // Ignore when typing in input/textarea
  if (['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) return;

  switch(e.key) {
    case 'n': case 'N':
      if (!document.querySelector('.modal-overlay.open')) {
        const activeView = document.querySelector('.view.active')?.id;
        if (activeView === 'view-expedientes') openModal();
        else if (activeView === 'view-clientes') openClienteModal();
        else if (activeView === 'view-audiencias') openAudienciaModal();
        else if (activeView === 'view-documentos') openDocumentoModal();
        else if (activeView === 'view-facturacion') openFacturaModal();
      }
      break;
    case 'Escape':
      closeModal(); closeClienteModal(); closeAudienciaModal();
      closeDocumentoModal(); closeFacturaModal(); closePanel();
      closeGlobalSearch();
      break;
    case '/':
      e.preventDefault();
      document.getElementById('global-search').focus();
      break;
  }
});

/* ════════════════════════════════════════
   GLOBAL SEARCH
════════════════════════════════════════ */
function openGlobalSearch(val) {
  const q = val.toLowerCase().trim();
  const res = document.getElementById('global-search-results');
  if (!q) { res.classList.remove('open'); return; }

  const expMatches = records.filter(r =>
    r.cliente.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) ||
    r.tipo.toLowerCase().includes(q) || r.abogado.toLowerCase().includes(q)
  ).slice(0, 4);

  const cliMatches = clientes.filter(c =>
    c.nombre.toLowerCase().includes(q) || c.cedula.includes(q)
  ).slice(0, 3);

  const audMatches = audiencias.filter(a =>
    a.cliente.toLowerCase().includes(q) || a.tipo.toLowerCase().includes(q)
  ).slice(0, 2);

  let html = '';

  if (expMatches.length) {
    html += `<div class="gsr-section-title">Expedientes</div>`;
    expMatches.forEach(r => {
      html += `<div class="gsr-item" onclick="gotoExpediente('${r.id}')">
        <div class="gsr-item-id">${r.id}</div>
        <div><div class="gsr-item-name">${r.cliente}</div><div class="gsr-item-sub">${r.tipo}</div></div>
        <div class="gsr-kbd">↵</div>
      </div>`;
    });
  }
  if (cliMatches.length) {
    html += `<div class="gsr-section-title">Clientes</div>`;
    cliMatches.forEach(c => {
      html += `<div class="gsr-item" onclick="gotoCliente('${c.id}')">
        <div class="gsr-item-id">${c.id}</div>
        <div><div class="gsr-item-name">${c.nombre}</div><div class="gsr-item-sub">${c.tipo}</div></div>
        <div class="gsr-kbd">↵</div>
      </div>`;
    });
  }
  if (audMatches.length) {
    html += `<div class="gsr-section-title">Audiencias</div>`;
    audMatches.forEach(a => {
      html += `<div class="gsr-item" onclick="gotoAudiencia('${a.id}')">
        <div class="gsr-item-id">${a.id}</div>
        <div><div class="gsr-item-name">${a.cliente}</div><div class="gsr-item-sub">${a.tipo} · ${a.fecha}</div></div>
        <div class="gsr-kbd">↵</div>
      </div>`;
    });
  }

  if (!html) html = '<div class="gsr-empty">Sin resultados para "' + val + '"</div>';
  res.innerHTML = html;
  res.classList.add('open');
}

function closeGlobalSearch() {
  document.getElementById('global-search-results').classList.remove('open');
  document.getElementById('global-search').value = '';
}

function gotoExpediente(id) {
  closeGlobalSearch();
  document.querySelector('[data-view="expedientes"]').click();
  setTimeout(() => {
    const idx = filtered.findIndex(r => r.id === id);
    if (idx > -1) openPanel(idx); else { currentSearch=''; currentFilter='todos'; applyFilters(); setTimeout(()=>{ const i=filtered.findIndex(r=>r.id===id); if(i>-1)openPanel(i); },50); }
  }, 100);
}
function gotoCliente(id) { closeGlobalSearch(); document.querySelector('[data-view="clientes"]').click(); }
function gotoAudiencia(id) { closeGlobalSearch(); document.querySelector('[data-view="audiencias"]').click(); }

document.addEventListener('click', e => {
  if (!e.target.closest('.global-search-wrap')) closeGlobalSearch();
});

/* ════════════════════════════════════════
   UPCOMING AUDIENCIAS BANNER
════════════════════════════════════════ */
function checkUpcoming() {
  const today = new Date();
  const in3   = new Date(today); in3.setDate(in3.getDate() + 3);
  const todayStr = today.toISOString().split('T')[0];
  const in3Str   = in3.toISOString().split('T')[0];

  const upcoming = audiencias.filter(a =>
    a.estado === 'Programada' && a.fecha >= todayStr && a.fecha <= in3Str
  );

  const banner = document.getElementById('upcoming-banner');
  if (!upcoming.length) { banner.classList.add('hidden'); return; }

  const names = upcoming.map(a => `<strong>${a.cliente}</strong> (${a.fecha} ${a.hora})`).join(', ');
  document.getElementById('upcoming-text').innerHTML =
    `📅 ${upcoming.length} audiencia${upcoming.length>1?'s':''} próxima${upcoming.length>1?'s':''}: ${names}`;
  banner.classList.remove('hidden');
}

/* ════════════════════════════════════════
   HELPERS
════════════════════════════════════════ */
function badgeClass(estado) {
  return { Activo:'badge-active', Pendiente:'badge-pending', Cerrado:'badge-closed', Urgente:'badge-urgent' }[estado] || '';
}

function priorityDots(p) {
  const lvl  = { Alta:3, Media:2, Baja:1 }[p] || 1;
  const high = p === 'Alta';
  return [1,2,3].map(i =>
    `<div class="priority-dot ${i<=lvl?'fill':''}${i<=lvl&&high?' high':''}"></div>`
  ).join('');
}

function fmt(n) {
  return new Intl.NumberFormat('es-DO', { minimumFractionDigits:2, maximumFractionDigits:2 }).format(n);
}

function fmtSeconds(s) {
  const h = Math.floor(s/3600).toString().padStart(2,'0');
  const m = Math.floor((s%3600)/60).toString().padStart(2,'0');
  const sec = (s%60).toString().padStart(2,'0');
  return `${h}:${m}:${sec}`;
}

function totalTimerSeconds(expId) {
  return (timerLogs[expId] || []).reduce((acc, l) => acc + l.duration, 0);
}

/* ════════════════════════════════════════
   RENDER TABLE + PAGINATION
════════════════════════════════════════ */
function renderTable() {
  const tbody = document.getElementById('table-body');
  const empty = document.getElementById('empty-state');
  tbody.innerHTML = '';

  if (!filtered.length) {
    empty.style.display = 'block';
    document.getElementById('pag-info').innerHTML = 'Sin resultados';
    document.getElementById('page-btns').innerHTML = '';
    return;
  }
  empty.style.display = 'none';

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  if (currentPage > totalPages) currentPage = totalPages;
  const start = (currentPage - 1) * PAGE_SIZE;
  const page  = filtered.slice(start, start + PAGE_SIZE);

  document.getElementById('pag-info').innerHTML =
    `Mostrando <span class="pag-info-nums">${start + 1}–${start + page.length}</span> de <span class="pag-info-nums">${filtered.length}</span> registros`;

  page.forEach((r, i) => {
    const fi = start + i;
    const secs = totalTimerSeconds(r.id);
    const isRunning = activeTimer && activeTimer.expId === r.id;
    const timerHtml = secs > 0 || isRunning
      ? `<span class="timer-badge${isRunning?' running':''}"><span class="timer-dot"></span><span id="tbl-timer-${r.id}">${fmtSeconds(secs)}</span></span>`
      : `<span style="color:var(--muted);font-size:11px">—</span>`;

    const tr = document.createElement('tr');
    tr.style.animationDelay = (i * 0.05) + 's';
    tr.innerHTML = `
      <td class="td-id">${r.id}</td>
      <td>${r.cliente}<div class="td-muted">${r.cedula}</div></td>
      <td>${r.tipo}</td>
      <td class="td-muted">${r.abogado}</td>
      <td class="td-muted">${r.fecha}</td>
      <td><span class="badge ${badgeClass(r.estado)}">${r.estado}</span></td>
      <td><div class="priority">${priorityDots(r.prioridad)}</div></td>
      <td>${timerHtml}</td>
      <td>
        <div class="actions">
          <button class="action-btn view" title="Ver detalle"    onclick="openPanel(${fi})">◎</button>
          <button class="action-btn edit" title="Editar"         onclick="editRecord(${fi})">✎</button>
          <button class="action-btn"      title="Temporizador"   onclick="openTimerPanel('${r.id}')" style="font-size:11px">⏱</button>
          <button class="action-btn del"  title="Eliminar"       onclick="deleteRecord(${fi})">✕</button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });

  renderPagination(totalPages);
  updateStats();
}

function renderPagination(totalPages) {
  const container = document.getElementById('page-btns');
  container.innerHTML = '';
  const prev = document.createElement('button');
  prev.className = 'page-btn'; prev.textContent = '‹'; prev.disabled = currentPage === 1;
  prev.onclick = () => { currentPage--; renderTable(); };
  container.appendChild(prev);

  let s = Math.max(1, currentPage - 2), e = Math.min(totalPages, s + 4);
  s = Math.max(1, e - 4);
  for (let p = s; p <= e; p++) {
    const btn = document.createElement('button');
    btn.className = 'page-btn' + (p === currentPage ? ' active' : '');
    btn.textContent = p;
    btn.onclick = () => { currentPage = p; renderTable(); };
    container.appendChild(btn);
  }

  const next = document.createElement('button');
  next.className = 'page-btn'; next.textContent = '›'; next.disabled = currentPage === totalPages;
  next.onclick = () => { currentPage++; renderTable(); };
  container.appendChild(next);
}

/* ════════════════════════════════════════
   STATS
════════════════════════════════════════ */
function updateStats() {
  document.getElementById('stat-total').textContent  = records.length;
  document.getElementById('stat-active').textContent = records.filter(r => r.estado === 'Activo').length;
  document.getElementById('stat-urgent').textContent = records.filter(r => r.estado === 'Urgente').length;
  document.getElementById('nav-badge').textContent   = records.length;

  const totalH = Object.values(timerLogs).reduce((acc, logs) =>
    acc + logs.reduce((a,l) => a+l.duration, 0), 0);
  document.getElementById('stat-hours').textContent = (totalH/3600).toFixed(1) + 'h';
}

/* ════════════════════════════════════════
   FILTER / SEARCH / SORT
════════════════════════════════════════ */
function applyFilters() {
  currentPage = 1;
  filtered = records.filter(r => {
    const matchFilter = currentFilter === 'todos' || r.estado === currentFilter;
    const matchSearch = !currentSearch ||
      r.cliente.toLowerCase().includes(currentSearch) ||
      r.id.toLowerCase().includes(currentSearch) ||
      r.tipo.toLowerCase().includes(currentSearch) ||
      r.abogado.toLowerCase().includes(currentSearch);
    return matchFilter && matchSearch;
  });
  renderTable();
}

function filterTable(val, el) {
  currentFilter = val;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  applyFilters();
}

function searchTable(val) { currentSearch = val.toLowerCase(); applyFilters(); }

function sortTable(key) {
  sortDir[key] = !sortDir[key];
  filtered.sort((a, b) => {
    if (a[key] < b[key]) return sortDir[key] ? -1 : 1;
    if (a[key] > b[key]) return sortDir[key] ?  1 : -1;
    return 0;
  });
  renderTable();
}

/* ════════════════════════════════════════
   MODAL EXPEDIENTES
════════════════════════════════════════ */
function openModal(prefill) {
  document.getElementById('modal-title').textContent = prefill ? 'Editar Expediente' : 'Nuevo Expediente';
  document.getElementById('f-cliente').value   = prefill?.cliente   || '';
  document.getElementById('f-cedula').value    = prefill?.cedula    || '';
  document.getElementById('f-tipo').value      = prefill?.tipo      || 'Derecho Civil';
  document.getElementById('f-abogado').value   = prefill?.abogado   || 'Dra. M. Rodríguez';
  document.getElementById('f-estado').value    = prefill?.estado    || 'Activo';
  document.getElementById('f-prioridad').value = prefill?.prioridad || 'Alta';
  document.getElementById('f-desc').value      = prefill?.desc      || '';
  document.getElementById('modal').classList.add('open');
}

function closeModal() { document.getElementById('modal').classList.remove('open'); editingIndex = null; }

function addRecord() {
  const cliente   = document.getElementById('f-cliente').value.trim();
  const cedula    = document.getElementById('f-cedula').value.trim();
  const tipo      = document.getElementById('f-tipo').value;
  const abogado   = document.getElementById('f-abogado').value;
  const estado    = document.getElementById('f-estado').value;
  const prioridad = document.getElementById('f-prioridad').value;
  const desc      = document.getElementById('f-desc').value.trim();
  if (!cliente) { showToast('⚠ Ingrese el nombre del cliente'); return; }

  const now = new Date().toISOString();
  if (editingIndex !== null) {
    const id = filtered[editingIndex].id;
    const ri = records.findIndex(r => r.id === id);
    if (ri > -1) {
      records[ri] = { ...records[ri], cliente, cedula, tipo, abogado, estado, prioridad, desc };
      if (!records[ri].historial) records[ri].historial = [];
      records[ri].historial.push({ texto: `Expediente editado`, fecha: now.split('T')[0], hora: now.split('T')[1].slice(0,5) });
    }
    showToast('✓ Expediente actualizado');
  } else {
    const today = new Date().toISOString().split('T')[0];
    const newId = 'LEX-' + String(records.length + 1).padStart(3, '0');
    records.push({ id:newId, cliente, cedula, tipo, abogado, fecha:today, estado, prioridad, desc,
      historial:[{ texto:'Expediente aperturado', fecha:today, hora: new Date().toTimeString().slice(0,5) }]
    });
    showToast('✓ Expediente registrado');
  }
  closeModal(); applyFilters(); saveAll(); checkUpcoming();
}

function editRecord(idx) { editingIndex = idx; openModal(filtered[idx]); }

function deleteRecord(idx) {
  const r = filtered[idx];
  if (!confirm(`¿Eliminar expediente ${r.id} — ${r.cliente}?`)) return;
  records = records.filter(rec => rec.id !== r.id);
  applyFilters(); saveAll();
  showToast('✕ Expediente eliminado');
}

/* ════════════════════════════════════════
   DETAIL PANEL
════════════════════════════════════════ */
function openPanel(idx) {
  const r = filtered[idx];
  document.getElementById('panel-title').textContent = r.id + ' · ' + r.cliente;
  document.getElementById('panel-badge').innerHTML = `<span class="badge ${badgeClass(r.estado)}">${r.estado}</span>`;

  const secs = totalTimerSeconds(r.id);
  const hist  = (r.historial || []).slice(-4).reverse();
  const histHtml = hist.map(h => `
    <div class="timeline-item">
      <div class="tl-dot"></div>
      <div class="tl-content"><div class="tl-text">${h.texto}</div><div class="tl-time">${h.fecha}${h.hora?' '+h.hora:''}</div></div>
    </div>`).join('') || `
    <div class="timeline-item">
      <div class="tl-dot"></div>
      <div class="tl-content"><div class="tl-text">Expediente aperturado</div><div class="tl-time">${r.fecha}</div></div>
    </div>`;

  // Related audiencias
  const relAud = audiencias.filter(a => a.expedienteId === r.id);
  const audHtml = relAud.length ? relAud.map(a =>
    `<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--border);font-size:12px">
       <span style="color:var(--muted)">${a.tipo}</span>
       <span style="font-family:var(--font-num);font-size:11px">${a.fecha} ${a.hora}</span>
     </div>`).join('')
    : `<div style="color:var(--muted);font-size:12px;padding:6px 0">Sin audiencias registradas</div>`;

  document.getElementById('panel-body').innerHTML = `
    <div class="detail-row"><span class="detail-key">Cédula/RNC</span><span class="detail-val">${r.cedula}</span></div>
    <div class="detail-row"><span class="detail-key">Tipo</span><span class="detail-val">${r.tipo}</span></div>
    <div class="detail-row"><span class="detail-key">Abogado</span><span class="detail-val">${r.abogado}</span></div>
    <div class="detail-row"><span class="detail-key">Fecha apertura</span><span class="detail-val">${r.fecha}</span></div>
    <div class="detail-row"><span class="detail-key">Prioridad</span>
      <span class="detail-val"><div class="priority" style="justify-content:flex-end">${priorityDots(r.prioridad)}</div></span></div>
    <div class="detail-row"><span class="detail-key">Horas registradas</span>
      <span class="detail-val" style="font-family:var(--font-num);color:var(--accent2)">${(secs/3600).toFixed(2)}h</span></div>
    <div class="detail-row"><span class="detail-key">Descripción</span>
      <span class="detail-val" style="font-size:12px;color:var(--muted)">${r.desc || '—'}</span></div>

    <div class="timeline">
      <div class="timeline-title">Historial de cambios</div>
      ${histHtml}
    </div>

    <div style="margin-top:20px">
      <div class="timeline-title">Audiencias vinculadas</div>
      ${audHtml}
    </div>

    <div style="margin-top:20px;display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn btn-success" style="flex:1" onclick="changeStatus(${idx},'Activo')">Activar</button>
      <button class="btn btn-danger"  style="flex:1" onclick="changeStatus(${idx},'Cerrado')">Cerrar</button>
    </div>
    <div style="margin-top:8px">
      <button class="btn" style="width:100%" onclick="openTimerPanel('${r.id}');closePanel()">⏱ Abrir temporizador</button>
    </div>`;
  document.getElementById('detail-panel').classList.add('open');
}

function closePanel() { document.getElementById('detail-panel').classList.remove('open'); }

function changeStatus(idx, status) {
  const r  = filtered[idx];
  const ri = records.findIndex(x => x.id === r.id);
  if (ri > -1) {
    records[ri].estado = status;
    if (!records[ri].historial) records[ri].historial = [];
    records[ri].historial.push({ texto:`Estado cambiado a ${status}`, fecha:new Date().toISOString().split('T')[0], hora:new Date().toTimeString().slice(0,5) });
    applyFilters(); saveAll(); showToast(`✓ Estado → ${status}`); closePanel();
  }
}

/* ════════════════════════════════════════
   TIMER
════════════════════════════════════════ */
function openTimerPanel(expId) {
  currentTimerExpId = expId;
  const r = records.find(x => x.id === expId);
  document.getElementById('timer-exp-title').textContent = expId + ' · ' + (r?.cliente || '');

  renderTimerPanel();
  document.getElementById('modal-timer').classList.add('open');
}

function closeTimerModal() { document.getElementById('modal-timer').classList.remove('open'); }

function renderTimerPanel() {
  const expId = currentTimerExpId;
  const isRunning = activeTimer && activeTimer.expId === expId;
  const secs = totalTimerSeconds(expId);

  document.getElementById('timer-display').textContent = fmtSeconds(secs + (isRunning ? Math.floor((Date.now()-activeTimer.start)/1000) : 0));
  document.getElementById('timer-start-btn').style.display = isRunning ? 'none' : 'inline-flex';
  document.getElementById('timer-stop-btn').style.display  = isRunning ? 'inline-flex' : 'none';

  const logs = (timerLogs[expId] || []).slice().reverse();
  const logHtml = logs.map(l => `
    <div class="timer-log-item">
      <span style="color:var(--muted)">${l.fecha} ${l.hora}</span>
      <span style="font-family:var(--font-num);color:var(--accent2)">${fmtSeconds(l.duration)}</span>
      <span style="color:var(--muted);font-size:10.5px">${l.nota||''}</span>
    </div>`).join('') || '<div style="color:var(--muted);font-size:12px;text-align:center;padding:10px">Sin registros</div>';
  document.getElementById('timer-log-list').innerHTML = logHtml;
}

function startTimer() {
  if (activeTimer) { showToast('⚠ Ya hay un temporizador activo'); return; }
  activeTimer = { expId: currentTimerExpId, start: Date.now() };
  activeTimer.interval = setInterval(() => {
    const elapsed = Math.floor((Date.now()-activeTimer.start)/1000);
    const base = totalTimerSeconds(currentTimerExpId);
    if (document.getElementById('timer-display'))
      document.getElementById('timer-display').textContent = fmtSeconds(base + elapsed);
    // update table badge
    const tbl = document.getElementById('tbl-timer-' + activeTimer.expId);
    if (tbl) tbl.textContent = fmtSeconds(base + elapsed);
  }, 1000);
  document.getElementById('timer-start-btn').style.display = 'none';
  document.getElementById('timer-stop-btn').style.display  = 'inline-flex';
  showToast('⏱ Temporizador iniciado');
}

function stopTimer() {
  if (!activeTimer) return;
  clearInterval(activeTimer.interval);
  const duration = Math.floor((Date.now()-activeTimer.start)/1000);
  if (!timerLogs[activeTimer.expId]) timerLogs[activeTimer.expId] = [];
  timerLogs[activeTimer.expId].push({
    fecha: new Date().toISOString().split('T')[0],
    hora:  new Date().toTimeString().slice(0,5),
    duration, nota: document.getElementById('timer-nota').value.trim()
  });
  // Add to record historial
  const ri = records.findIndex(r => r.id === activeTimer.expId);
  if (ri>-1) {
    if (!records[ri].historial) records[ri].historial = [];
    records[ri].historial.push({ texto:`${(duration/3600).toFixed(2)}h registradas`, fecha:new Date().toISOString().split('T')[0], hora:new Date().toTimeString().slice(0,5) });
  }
  activeTimer = null;
  saveAll(); renderTimerPanel(); renderTable();
  showToast(`✓ ${fmtSeconds(duration)} registradas`);
}

/* ════════════════════════════════════════
   TOAST
════════════════════════════════════════ */
let toastTimer;
function showToast(msg) {
  clearTimeout(toastTimer);
  document.getElementById('toast-msg').textContent = msg;
  const t = document.getElementById('toast');
  t.classList.add('show');
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ════════════════════════════════════════
   EXPORT
════════════════════════════════════════ */
function exportData() {
  const rows = [['ID','Cliente','Cédula','Tipo','Abogado','Fecha','Estado','Prioridad','Horas']];
  records.forEach(r => {
    const h = (totalTimerSeconds(r.id)/3600).toFixed(2);
    rows.push([r.id, r.cliente, r.cedula, r.tipo, r.abogado, r.fecha, r.estado, r.prioridad, h]);
  });
  const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n');
  const a = document.createElement('a'); a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv); a.download = 'expedientes.csv'; a.click();
  showToast('↑ Exportación completada');
}

/* ════════════════════════════════════════
   CLIENTES
════════════════════════════════════════ */
let clientesFiltrados   = [...clientes];
let clienteFilter       = 'todos';
let clienteSearch       = '';
let editingClienteIndex = null;

function renderClientes() {
  const tbody = document.getElementById('clientes-body');
  const empty = document.getElementById('clientes-empty');
  tbody.innerHTML = '';
  if (!clientesFiltrados.length) { empty.style.display='block'; return; }
  empty.style.display = 'none';

  clientesFiltrados.forEach((c, i) => {
    const expCount = records.filter(r => r.cedula === c.cedula).length;
    const audCount = audiencias.filter(a => {
      const exp = records.find(r => r.cedula === c.cedula);
      return exp && a.expedienteId === exp.id;
    }).length;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:32px;height:32px;border-radius:8px;background:var(--accent-dim);border:1px solid rgba(139,92,246,.25);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--accent2);flex-shrink:0">
            ${c.nombre.split(' ').map(w=>w[0]).slice(0,2).join('')}
          </div>
          <div>
            <div style="font-weight:500">${c.nombre}</div>
            <div class="td-muted">${c.direccion}</div>
          </div>
        </div>
      </td>
      <td class="td-muted" style="font-family:var(--font-num)">${c.cedula}</td>
      <td><span class="badge ${c.tipo==='Empresa'?'badge-pending':'badge-active'}">${c.tipo}</span></td>
      <td class="td-muted">${c.telefono}</td>
      <td class="td-muted">${c.email}</td>
      <td style="font-family:var(--font-num);color:var(--accent2);font-weight:600">${expCount}</td>
      <td style="font-family:var(--font-num);color:var(--muted)">${audCount}</td>
      <td>
        <div class="actions">
          <button class="action-btn edit" title="Editar"    onclick="editCliente(${i})">✎</button>
          <button class="action-btn del"  title="Eliminar"  onclick="deleteCliente(${i})">✕</button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });
}

function applyClienteFilters() {
  clientesFiltrados = clientes.filter(c => {
    const mf = clienteFilter === 'todos' || c.tipo === clienteFilter;
    const ms = !clienteSearch || c.nombre.toLowerCase().includes(clienteSearch) || c.cedula.includes(clienteSearch);
    return mf && ms;
  });
  renderClientes();
}

function filterClientes(val, el) {
  clienteFilter = val;
  document.querySelectorAll('#view-clientes .filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active'); applyClienteFilters();
}
function searchClientes(val) { clienteSearch = val.toLowerCase(); applyClienteFilters(); }

function openClienteModal(prefill) {
  document.getElementById('modal-cliente-title').textContent = prefill ? 'Editar Cliente' : 'Nuevo Cliente';
  document.getElementById('fc-nombre').value    = prefill?.nombre    || '';
  document.getElementById('fc-cedula').value    = prefill?.cedula    || '';
  document.getElementById('fc-tipo').value      = prefill?.tipo      || 'Persona Natural';
  document.getElementById('fc-telefono').value  = prefill?.telefono  || '';
  document.getElementById('fc-email').value     = prefill?.email     || '';
  document.getElementById('fc-direccion').value = prefill?.direccion || '';
  document.getElementById('fc-notas').value     = prefill?.notas     || '';
  document.getElementById('modal-cliente').classList.add('open');
}
function closeClienteModal() { document.getElementById('modal-cliente').classList.remove('open'); editingClienteIndex = null; }

function saveCliente() {
  const nombre = document.getElementById('fc-nombre').value.trim();
  if (!nombre) { showToast('⚠ Ingrese el nombre del cliente'); return; }
  const obj = {
    nombre, cedula:document.getElementById('fc-cedula').value.trim(),
    tipo:document.getElementById('fc-tipo').value,
    telefono:document.getElementById('fc-telefono').value.trim(),
    email:document.getElementById('fc-email').value.trim(),
    direccion:document.getElementById('fc-direccion').value.trim(),
    notas:document.getElementById('fc-notas').value.trim(),
  };
  if (editingClienteIndex !== null) {
    obj.id = clientesFiltrados[editingClienteIndex].id;
    const ri = clientes.findIndex(c => c.id === obj.id);
    if (ri > -1) clientes[ri] = obj;
    showToast('✓ Cliente actualizado');
  } else {
    obj.id = 'CLI-' + String(clientes.length + 1).padStart(3,'0');
    clientes.push(obj); showToast('✓ Cliente registrado');
  }
  closeClienteModal(); applyClienteFilters(); saveAll();
}

function editCliente(i) { editingClienteIndex = i; openClienteModal(clientesFiltrados[i]); }

function deleteCliente(i) {
  const c = clientesFiltrados[i];
  if (!confirm(`¿Eliminar cliente ${c.nombre}?`)) return;
  clientes = clientes.filter(x => x.id !== c.id);
  applyClienteFilters(); saveAll(); showToast('✕ Cliente eliminado');
}

/* ════════════════════════════════════════
   AUDIENCIAS
════════════════════════════════════════ */
let audienciasFiltradas   = [...audiencias];
let audienciaFilter       = 'todos';
let audienciaSearch       = '';
let editingAudienciaIndex = null;
let calendarDate = new Date();

function audBadge(e) { return { Programada:'badge-pending', Completada:'badge-active', Cancelada:'badge-closed' }[e] || ''; }

function renderAudiencias() {
  const tbody = document.getElementById('audiencias-body');
  const empty = document.getElementById('audiencias-empty');
  tbody.innerHTML = '';

  document.getElementById('aud-stat-total').textContent = audiencias.length;
  document.getElementById('aud-stat-prog').textContent  = audiencias.filter(a=>a.estado==='Programada').length;
  document.getElementById('aud-stat-comp').textContent  = audiencias.filter(a=>a.estado==='Completada').length;
  document.getElementById('aud-stat-canc').textContent  = audiencias.filter(a=>a.estado==='Cancelada').length;

  if (!audienciasFiltradas.length) { empty.style.display='block'; return; }
  empty.style.display = 'none';

  audienciasFiltradas.forEach((a, i) => {
    const isHoy = a.fecha === new Date().toISOString().split('T')[0];
    const today = new Date(); const in3 = new Date(); in3.setDate(in3.getDate()+3);
    const aDate = new Date(a.fecha);
    const isUpcoming = a.estado==='Programada' && aDate>=today && aDate<=in3;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="td-id">${a.expedienteId}</td>
      <td>${a.cliente}</td>
      <td class="td-muted">${a.tipo}</td>
      <td style="font-family:var(--font-num);${isHoy?'color:var(--success);font-weight:600':isUpcoming?'color:var(--accent2)':''}">${a.fecha}${isHoy?' <span style="font-size:10px;background:rgba(74,222,128,.12);color:var(--success);padding:1px 6px;border-radius:3px;font-weight:700">HOY</span>':''}</td>
      <td style="font-family:var(--font-num)" class="td-muted">${a.hora}</td>
      <td class="td-muted">${a.tribunal}</td>
      <td><span class="badge ${audBadge(a.estado)}">${a.estado}</span></td>
      <td>
        <div class="actions">
          <button class="action-btn edit" title="Editar"   onclick="editAudiencia(${i})">✎</button>
          <button class="action-btn del"  title="Eliminar" onclick="deleteAudiencia(${i})">✕</button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });
}

function applyAudienciaFilters() {
  audienciasFiltradas = audiencias.filter(a => {
    const mf = audienciaFilter === 'todos' || a.estado === audienciaFilter;
    const ms = !audienciaSearch ||
      a.cliente.toLowerCase().includes(audienciaSearch) ||
      a.expedienteId.toLowerCase().includes(audienciaSearch) ||
      a.tipo.toLowerCase().includes(audienciaSearch);
    return mf && ms;
  });
  renderAudiencias(); renderCalendar();
}

function filterAudiencias(val, el) {
  audienciaFilter = val;
  document.querySelectorAll('#view-audiencias .filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active'); applyAudienciaFilters();
}
function searchAudiencias(val) { audienciaSearch = val.toLowerCase(); applyAudienciaFilters(); }

/* ── CALENDAR ── */
function renderCalendar() {
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  document.getElementById('cal-title').textContent = `${meses[month]} ${year}`;

  const grid = document.getElementById('cal-grid');
  grid.innerHTML = '';

  // Day names
  ['Do','Lu','Ma','Mi','Ju','Vi','Sá'].forEach(d => {
    const el = document.createElement('div'); el.className='cal-day-name'; el.textContent=d; grid.appendChild(el);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const daysInPrev  = new Date(year, month, 0).getDate();
  const todayStr = new Date().toISOString().split('T')[0];

  // Prev month padding
  for (let d = firstDay-1; d >= 0; d--) {
    const el = document.createElement('div'); el.className='cal-day other-month';
    el.innerHTML=`<div class="cal-day-num">${daysInPrev-d}</div>`; grid.appendChild(el);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const dayAuds = audiencias.filter(a => a.fecha === dateStr);
    const isToday = dateStr === todayStr;
    const el = document.createElement('div'); el.className='cal-day' + (isToday?' today':'');
    let evHtml = dayAuds.map(a => `<div class="cal-event${a.estado==='Urgente'?' urgente':''}" title="${a.cliente}: ${a.tipo}">${a.hora} ${a.cliente.split(' ')[0]}</div>`).join('');
    el.innerHTML=`<div class="cal-day-num">${d}</div>${evHtml}`; grid.appendChild(el);
  }

  // Next month padding
  const total = firstDay + daysInMonth;
  const remaining = total % 7 === 0 ? 0 : 7 - (total % 7);
  for (let d = 1; d <= remaining; d++) {
    const el = document.createElement('div'); el.className='cal-day other-month';
    el.innerHTML=`<div class="cal-day-num">${d}</div>`; grid.appendChild(el);
  }
}

function calPrev() { calendarDate.setMonth(calendarDate.getMonth()-1); renderCalendar(); }
function calNext() { calendarDate.setMonth(calendarDate.getMonth()+1); renderCalendar(); }

function populateAudienciaSelect() {
  const sel = document.getElementById('fa-expediente');
  sel.innerHTML = records.map(r => `<option value="${r.id}">${r.id} — ${r.cliente}</option>`).join('');
}

function openAudienciaModal(prefill) {
  populateAudienciaSelect();
  document.getElementById('modal-audiencia-title').textContent = prefill ? 'Editar Audiencia' : 'Nueva Audiencia';
  document.getElementById('fa-expediente').value = prefill?.expedienteId || records[0]?.id || '';
  document.getElementById('fa-tipo').value       = prefill?.tipo         || 'Audiencia Preliminar';
  document.getElementById('fa-fecha').value      = prefill?.fecha        || '';
  document.getElementById('fa-hora').value       = prefill?.hora         || '';
  document.getElementById('fa-tribunal').value   = prefill?.tribunal     || '';
  document.getElementById('fa-estado').value     = prefill?.estado       || 'Programada';
  document.getElementById('fa-notas').value      = prefill?.notas        || '';
  document.getElementById('modal-audiencia').classList.add('open');
}
function closeAudienciaModal() { document.getElementById('modal-audiencia').classList.remove('open'); editingAudienciaIndex = null; }

function saveAudiencia() {
  const expId = document.getElementById('fa-expediente').value;
  const exp   = records.find(r => r.id === expId);
  const obj = {
    expedienteId:expId, cliente:exp?.cliente||'',
    tipo:document.getElementById('fa-tipo').value,
    fecha:document.getElementById('fa-fecha').value,
    hora:document.getElementById('fa-hora').value,
    tribunal:document.getElementById('fa-tribunal').value.trim(),
    estado:document.getElementById('fa-estado').value,
    notas:document.getElementById('fa-notas').value.trim(),
  };
  if (!obj.fecha) { showToast('⚠ Seleccione una fecha'); return; }
  if (editingAudienciaIndex !== null) {
    obj.id = audienciasFiltradas[editingAudienciaIndex].id;
    const ri = audiencias.findIndex(a => a.id === obj.id);
    if (ri > -1) audiencias[ri] = obj;
    showToast('✓ Audiencia actualizada');
  } else {
    obj.id = 'AUD-' + String(audiencias.length + 1).padStart(3,'0');
    audiencias.push(obj); showToast('✓ Audiencia registrada');
  }
  closeAudienciaModal(); applyAudienciaFilters(); saveAll(); checkUpcoming();
}

function editAudiencia(i) { editingAudienciaIndex = i; openAudienciaModal(audienciasFiltradas[i]); }

function deleteAudiencia(i) {
  const a = audienciasFiltradas[i];
  if (!confirm(`¿Eliminar audiencia ${a.id}?`)) return;
  audiencias = audiencias.filter(x => x.id !== a.id);
  applyAudienciaFilters(); saveAll(); showToast('✕ Audiencia eliminada');
}

/* ════════════════════════════════════════
   DOCUMENTOS
════════════════════════════════════════ */
let documentosFiltrados   = [...documentos];
let documentoFilter       = 'todos';
let documentoSearch       = '';
let editingDocumentoIndex = null;

function docBadge(e) { return { Final:'badge-active', Firmado:'badge-urgent', Borrador:'badge-pending' }[e] || ''; }
function docIcono(tipo) { return { Contrato:'📄', Demanda:'⚖', Poder:'🔏', Sentencia:'🏛', Otro:'📎' }[tipo] || '📄'; }

function renderDocumentos() {
  const tbody = document.getElementById('documentos-body');
  const empty = document.getElementById('documentos-empty');
  tbody.innerHTML = '';
  if (!documentosFiltrados.length) { empty.style.display='block'; return; }
  empty.style.display = 'none';
  documentosFiltrados.forEach((d, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:16px">${docIcono(d.tipo)}</span>
          <div>
            <div style="font-weight:500">${d.nombre}</div>
            <div class="td-muted">${d.notas || '—'}</div>
          </div>
        </div>
      </td>
      <td class="td-id">${d.expedienteId}</td>
      <td class="td-muted">${d.tipo}</td>
      <td class="td-muted">${d.autor}</td>
      <td class="td-muted" style="font-family:var(--font-num)">${d.fecha}</td>
      <td class="td-muted" style="font-family:var(--font-num)">${d.tamano}</td>
      <td><span class="badge ${docBadge(d.estado)}">${d.estado}</span></td>
      <td>
        <div class="actions">
          <button class="action-btn view" title="Descargar" onclick="showToast('↓ Descargando ${d.nombre}…')">↓</button>
          <button class="action-btn edit" title="Editar"    onclick="editDocumento(${i})">✎</button>
          <button class="action-btn del"  title="Eliminar"  onclick="deleteDocumento(${i})">✕</button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });
}

function applyDocumentoFilters() {
  documentosFiltrados = documentos.filter(d => {
    const mf = documentoFilter === 'todos' || d.tipo === documentoFilter;
    const ms = !documentoSearch ||
      d.nombre.toLowerCase().includes(documentoSearch) ||
      d.expedienteId.toLowerCase().includes(documentoSearch) ||
      d.autor.toLowerCase().includes(documentoSearch);
    return mf && ms;
  });
  renderDocumentos();
}

function filterDocumentos(val, el) {
  documentoFilter = val;
  document.querySelectorAll('#view-documentos .filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active'); applyDocumentoFilters();
}
function searchDocumentos(val) { documentoSearch = val.toLowerCase(); applyDocumentoFilters(); }

function populateDocumentoSelect() {
  const sel = document.getElementById('fd-expediente');
  sel.innerHTML = records.map(r => `<option value="${r.id}">${r.id} — ${r.cliente}</option>`).join('');
}

function openDocumentoModal(prefill) {
  populateDocumentoSelect();
  document.getElementById('modal-documento-title').textContent = prefill ? 'Editar Documento' : 'Nuevo Documento';
  document.getElementById('fd-nombre').value      = prefill?.nombre      || '';
  document.getElementById('fd-expediente').value  = prefill?.expedienteId|| records[0]?.id || '';
  document.getElementById('fd-tipo').value        = prefill?.tipo        || 'Contrato';
  document.getElementById('fd-estado').value      = prefill?.estado      || 'Borrador';
  document.getElementById('fd-autor').value       = prefill?.autor       || 'Dra. M. Rodríguez';
  document.getElementById('fd-notas').value       = prefill?.notas       || '';
  document.getElementById('modal-documento').classList.add('open');
}
function closeDocumentoModal() { document.getElementById('modal-documento').classList.remove('open'); editingDocumentoIndex = null; }

function saveDocumento() {
  const nombre = document.getElementById('fd-nombre').value.trim();
  if (!nombre) { showToast('⚠ Ingrese el nombre del documento'); return; }
  const obj = {
    nombre, expedienteId:document.getElementById('fd-expediente').value,
    tipo:document.getElementById('fd-tipo').value,
    estado:document.getElementById('fd-estado').value,
    autor:document.getElementById('fd-autor').value,
    notas:document.getElementById('fd-notas').value.trim(),
    fecha:new Date().toISOString().split('T')[0], tamano:'—',
  };
  if (editingDocumentoIndex !== null) {
    obj.id     = documentosFiltrados[editingDocumentoIndex].id;
    obj.tamano = documentosFiltrados[editingDocumentoIndex].tamano;
    const ri = documentos.findIndex(d => d.id === obj.id);
    if (ri > -1) documentos[ri] = obj;
    showToast('✓ Documento actualizado');
  } else {
    obj.id = 'DOC-' + String(documentos.length + 1).padStart(3,'0');
    documentos.push(obj); showToast('✓ Documento registrado');
  }
  closeDocumentoModal(); applyDocumentoFilters(); saveAll();
}

function editDocumento(i) { editingDocumentoIndex = i; openDocumentoModal(documentosFiltrados[i]); }

function deleteDocumento(i) {
  const d = documentosFiltrados[i];
  if (!confirm(`¿Eliminar "${d.nombre}"?`)) return;
  documentos = documentos.filter(x => x.id !== d.id);
  applyDocumentoFilters(); saveAll(); showToast('✕ Documento eliminado');
}

/* ════════════════════════════════════════
   FACTURACIÓN — COMPLETA
════════════════════════════════════════ */
let facturasFiltradas   = [...facturas];
let facturaFilter       = 'todos';
let facturaSearch       = '';
let editingFacturaIndex = null;

function facBadge(e) {
  return { Pagada:'badge-pagada', Pendiente:'badge-pending', Cancelada:'badge-closed', Vencida:'badge-vencida' }[e] || '';
}

function updateFacturaStats() {
  const today = new Date().toISOString().split('T')[0];
  // Mark vencidas
  facturas.forEach(f => {
    if (f.estado === 'Pendiente' && f.vencimiento < today) f.estado = 'Vencida';
  });

  const pagadas   = facturas.filter(f => f.estado==='Pagada');
  const pendientes= facturas.filter(f => f.estado==='Pendiente'||f.estado==='Vencida');
  const canceladas= facturas.filter(f => f.estado==='Cancelada');
  const vencidas  = facturas.filter(f => f.estado==='Vencida');
  const thisMonth = new Date().toISOString().slice(0,7);
  const emitidas  = facturas.filter(f => f.fecha.startsWith(thisMonth));

  const cur = cfgData.moneda === 'DOP' ? 'RD$' : cfgData.moneda === 'EUR' ? '€' : '$';
  document.getElementById('fac-stat-ingresos').textContent  = cur + fmt(pagadas.reduce((a,f)=>a+f.monto,0));
  document.getElementById('fac-stat-emitidas').textContent  = emitidas.length;
  document.getElementById('fac-stat-pendientes').textContent= cur + fmt(pendientes.reduce((a,f)=>a+f.monto,0));
  document.getElementById('fac-stat-pend-count').textContent= `${pendientes.length} factura${pendientes.length!==1?'s':''}`;
  document.getElementById('fac-stat-canceladas').textContent= cur + fmt(vencidas.reduce((a,f)=>a+f.monto,0));
  document.getElementById('fac-stat-canc-count').textContent= `${vencidas.length} vencida${vencidas.length!==1?'s':''}`;
}

function renderFacturas() {
  updateFacturaStats();
  const tbody = document.getElementById('facturas-body');
  const empty = document.getElementById('facturas-empty');
  tbody.innerHTML = '';
  if (!facturasFiltradas.length) { empty.style.display='block'; return; }
  empty.style.display='none';
  const cur = cfgData.moneda === 'DOP' ? 'RD$' : cfgData.moneda === 'EUR' ? '€' : '$';
  facturasFiltradas.forEach((f, i) => {
    const isVencida = f.estado==='Vencida';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="td-id">${f.id}</td>
      <td>${f.cliente}</td>
      <td class="td-id">${f.expedienteId}</td>
      <td class="td-muted" style="font-family:var(--font-num)">${f.fecha}</td>
      <td style="font-family:var(--font-num);${isVencida?'color:var(--danger)':'color:var(--muted)'}">${f.vencimiento}</td>
      <td class="factura-monto">${cur}${fmt(f.monto)}</td>
      <td><span class="badge ${facBadge(f.estado)}">${f.estado}</span></td>
      <td>
        <div class="actions">
          <button class="action-btn view" title="Marcar pagada" onclick="markPagada(${i})">✓</button>
          <button class="action-btn edit" title="Editar"        onclick="editFactura(${i})">✎</button>
          <button class="action-btn del"  title="Cancelar"      onclick="cancelFactura(${i})">✕</button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });
}

function applyFacturaFilters() {
  facturasFiltradas = facturas.filter(f => {
    const mf = facturaFilter === 'todos' || f.estado === facturaFilter;
    const ms = !facturaSearch ||
      f.cliente.toLowerCase().includes(facturaSearch) ||
      f.id.toLowerCase().includes(facturaSearch) ||
      f.expedienteId.toLowerCase().includes(facturaSearch);
    return mf && ms;
  });
  renderFacturas();
}

function filterFacturas(val, el) {
  facturaFilter = val;
  document.querySelectorAll('#view-facturacion .filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active'); applyFacturaFilters();
}
function searchFacturas(val) { facturaSearch = val.toLowerCase(); applyFacturaFilters(); }

function populateFacturaSelect() {
  const sel = document.getElementById('ff-expediente');
  sel.innerHTML = records.map(r => `<option value="${r.id}">${r.id} — ${r.cliente}</option>`).join('');
}

function openFacturaModal(prefill) {
  populateFacturaSelect();
  document.getElementById('modal-factura-title').textContent = prefill ? 'Editar Factura' : 'Nueva Factura';
  document.getElementById('ff-cliente').value    = prefill?.cliente    || '';
  document.getElementById('ff-expediente').value = prefill?.expedienteId || records[0]?.id || '';
  document.getElementById('ff-monto').value      = prefill?.monto      || '';
  document.getElementById('ff-dias').value       = prefill?.dias       || cfgData.venc || 30;
  document.getElementById('ff-categoria').value  = prefill?.categoria  || 'Derecho Civil';
  document.getElementById('ff-estado').value     = prefill?.estado     || 'Pendiente';
  document.getElementById('ff-desc').value       = prefill?.desc       || '';
  document.getElementById('modal-factura').classList.add('open');
}
function closeFacturaModal() { document.getElementById('modal-factura').classList.remove('open'); editingFacturaIndex = null; }

function saveFactura() {
  const cliente = document.getElementById('ff-cliente').value.trim();
  const monto   = parseFloat(document.getElementById('ff-monto').value);
  if (!cliente) { showToast('⚠ Ingrese el nombre del cliente'); return; }
  if (!monto || monto <= 0) { showToast('⚠ Ingrese un monto válido'); return; }
  const today = new Date().toISOString().split('T')[0];
  const dias  = parseInt(document.getElementById('ff-dias').value) || 30;
  const vencDate = new Date(); vencDate.setDate(vencDate.getDate()+dias);
  const vencimiento = vencDate.toISOString().split('T')[0];
  const obj = {
    cliente, monto, vencimiento,
    expedienteId: document.getElementById('ff-expediente').value,
    categoria:    document.getElementById('ff-categoria').value,
    estado:       document.getElementById('ff-estado').value,
    desc:         document.getElementById('ff-desc').value.trim(),
    fecha:        today,
  };
  if (editingFacturaIndex !== null) {
    obj.id = facturasFiltradas[editingFacturaIndex].id;
    const ri = facturas.findIndex(f => f.id === obj.id);
    if (ri > -1) facturas[ri] = obj;
    showToast('✓ Factura actualizada');
  } else {
    obj.id = 'FAC-' + String(facturas.length + 1).padStart(3,'0');
    facturas.push(obj); showToast('✓ Factura creada');
  }
  closeFacturaModal(); applyFacturaFilters(); saveAll();
}

function editFactura(i) { editingFacturaIndex = i; openFacturaModal(facturasFiltradas[i]); }

function markPagada(i) {
  const f = facturasFiltradas[i];
  const ri = facturas.findIndex(x => x.id === f.id);
  if (ri > -1) { facturas[ri].estado = 'Pagada'; applyFacturaFilters(); saveAll(); showToast('✓ Factura marcada como pagada'); }
}

function cancelFactura(i) {
  const f = facturasFiltradas[i];
  if (!confirm(`¿Cancelar factura ${f.id}?`)) return;
  const ri = facturas.findIndex(x => x.id === f.id);
  if (ri > -1) { facturas[ri].estado = 'Cancelada'; applyFacturaFilters(); saveAll(); showToast('✕ Factura cancelada'); }
}

function exportFacturasCSV() {
  const rows = [['ID','Cliente','Expediente','Fecha','Vencimiento','Monto','Estado','Categoría']];
  facturas.forEach(f => rows.push([f.id,f.cliente,f.expedienteId,f.fecha,f.vencimiento,f.monto,f.estado,f.categoria]));
  const csv = rows.map(r => r.map(v=>`"${v}"`).join(',')).join('\n');
  const a = document.createElement('a'); a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv); a.download='facturas.csv'; a.click();
  showToast('↑ Facturas exportadas');
}

/* ════════════════════════════════════════
   INFORMES — COMPLETOS
════════════════════════════════════════ */
function updateInformes(periodo) {
  const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  const n = parseInt(periodo || document.getElementById('inf-periodo')?.value || '6');
  const today = new Date();
  const cur = cfgData.moneda === 'DOP' ? 'RD$' : cfgData.moneda === 'EUR' ? '€' : '$';

  // Ingresos totales (pagadas)
  const totalIng = facturas.filter(f=>f.estado==='Pagada').reduce((a,f)=>a+f.monto,0);
  const activos  = records.filter(r=>r.estado==='Activo'||r.estado==='Urgente').length;
  const ticket   = facturas.length ? totalIng / facturas.filter(f=>f.estado==='Pagada').length : 0;
  const tasa     = facturas.length ? Math.round(facturas.filter(f=>f.estado==='Pagada').length/facturas.length*100) : 0;

  document.getElementById('inf-total').textContent   = cur + fmt(totalIng);
  document.getElementById('inf-activos').textContent = activos;
  document.getElementById('inf-ticket').textContent  = cur + fmt(ticket||0);
  document.getElementById('inf-tasa').textContent    = tasa + '%';

  // Bar chart — last N months
  const monthData = [];
  for (let i = n-1; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth()-i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    const amt = facturas.filter(f=>f.estado==='Pagada'&&f.fecha.startsWith(key)).reduce((a,f)=>a+f.monto,0);
    monthData.push({ label:meses[d.getMonth()], amt });
  }
  const maxAmt = Math.max(...monthData.map(m=>m.amt), 1);
  document.getElementById('inf-bar-chart').innerHTML = monthData.map(m=>`
    <div class="inf-bar-row">
      <span class="inf-bar-month">${m.label}</span>
      <div class="inf-bar-track">
        <div class="inf-bar-fill" style="width:${Math.round(m.amt/maxAmt*100)}%"></div>
      </div>
      <span class="inf-bar-amount">${cur}${fmt(m.amt)}</span>
    </div>`).join('');

  // Por tipo de servicio
  const tipos = [...new Set(records.map(r=>r.tipo))];
  const tipoData = tipos.map(t => {
    const exps = records.filter(r=>r.tipo===t);
    const facs = facturas.filter(f=>{
      const exp = records.find(r=>r.id===f.expedienteId);
      return exp?.tipo===t && f.estado==='Pagada';
    });
    return { tipo:t, count:exps.length, total:facs.reduce((a,f)=>a+f.monto,0) };
  }).sort((a,b)=>b.total-a.total);

  const grandTotal = tipoData.reduce((a,t)=>a+t.total,0)||1;
  document.getElementById('inf-categoria-body').innerHTML = tipoData.map(t=>`
    <tr>
      <td>${t.tipo}</td>
      <td style="font-family:var(--font-num);color:var(--accent2)">${t.count}</td>
      <td style="font-family:var(--font-num);color:var(--success)">${cur}${fmt(t.total)}</td>
      <td style="font-family:var(--font-num)">${Math.round(t.total/grandTotal*100)}%</td>
      <td style="color:${t.total>0?'var(--success)':'var(--muted)'}">${t.total>0?'↑ Activo':'—'}</td>
    </tr>`).join('');

  // Por abogado
  const abogados = [...new Set(records.map(r=>r.abogado))];
  document.getElementById('inf-abogado-body').innerHTML = abogados.map(ab => {
    const exps    = records.filter(r=>r.abogado===ab);
    const activos2= exps.filter(r=>r.estado==='Activo'||r.estado==='Urgente').length;
    const cerrados= exps.filter(r=>r.estado==='Cerrado').length;
    const facAb   = facturas.filter(f=>{
      const exp=records.find(r=>r.id===f.expedienteId);
      return exp?.abogado===ab && f.estado==='Pagada';
    }).reduce((a,f)=>a+f.monto,0);
    return `<tr>
      <td style="font-weight:500">${ab}</td>
      <td style="font-family:var(--font-num);color:var(--accent2)">${exps.length}</td>
      <td style="font-family:var(--font-num);color:var(--success)">${activos2}</td>
      <td style="font-family:var(--font-num);color:var(--muted)">${cerrados}</td>
      <td style="font-family:var(--font-num);color:var(--success)">${cur}${fmt(facAb)}</td>
    </tr>`;
  }).join('');
}

/* ════════════════════════════════════════
   CONFIGURACIÓN — COMPLETA
════════════════════════════════════════ */
function loadCfgUI() {
  document.getElementById('cfg-nombre').value = cfgData.nombre;
  document.getElementById('cfg-rut').value    = cfgData.rut;
  document.getElementById('cfg-email').value  = cfgData.email;
  document.getElementById('cfg-tel').value    = cfgData.tel;
  document.getElementById('cfg-dir').value    = cfgData.dir;
  document.getElementById('cfg-venc').value   = cfgData.venc;
  document.getElementById('cfg-nota').value   = cfgData.nota;
  // Moneda select
  const monSel = document.getElementById('cfg-moneda');
  for (let o of monSel.options) { if (o.value.startsWith(cfgData.moneda)) { monSel.value = o.value; break; } }
}

function saveCfg() {
  cfgData.nombre = document.getElementById('cfg-nombre').value;
  cfgData.rut    = document.getElementById('cfg-rut').value;
  cfgData.email  = document.getElementById('cfg-email').value;
  cfgData.tel    = document.getElementById('cfg-tel').value;
  cfgData.dir    = document.getElementById('cfg-dir').value;
  cfgData.venc   = parseInt(document.getElementById('cfg-venc').value)||30;
  cfgData.nota   = document.getElementById('cfg-nota').value;
  const monVal   = document.getElementById('cfg-moneda').value;
  cfgData.moneda = monVal.split(' ')[0];
  saveAll();
  showToast('✓ Configuración guardada');
  // Update logo
  document.querySelector('.logo-mark').textContent = cfgData.nombre.split('—')[0].trim();
}

/* ════════════════════════════════════════
   OVERLAY CLOSES
════════════════════════════════════════ */
['modal','modal-cliente','modal-audiencia','modal-documento','modal-factura','modal-timer'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', e => { if (e.target === el) {
    closeModal(); closeClienteModal(); closeAudienciaModal();
    closeDocumentoModal(); closeFacturaModal(); closeTimerModal();
  }});
});

/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
applyFilters();
applyClienteFilters();
applyAudienciaFilters();
applyDocumentoFilters();
applyFacturaFilters();
checkUpcoming();
renderCalendar();
loadCfgUI();
