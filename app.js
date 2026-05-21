/* ════════════════════════════════════════
   DATA
════════════════════════════════════════ */
let records = [
  { id:'LEX-001', cliente:'Ana Belkis Núñez',  cedula:'001-1234567-1', tipo:'Derecho Civil',         abogado:'Dra. M. Rodríguez', fecha:'2025-04-12', estado:'Activo',    prioridad:'Alta',  desc:'Demanda por incumplimiento de contrato de arrendamiento comercial.' },
  { id:'LEX-002', cliente:'Roberto Almonte',    cedula:'002-9876543-2', tipo:'Derecho Laboral',       abogado:'Lic. A. Fernández', fecha:'2025-04-08', estado:'Urgente',   prioridad:'Alta',  desc:'Despido injustificado con reclamación de prestaciones laborales.' },
  { id:'LEX-003', cliente:'Empresas CORE SRL',  cedula:'1-30-12345-7',  tipo:'Derecho Comercial',    abogado:'Dr. J. Castro',     fecha:'2025-03-30', estado:'Pendiente', prioridad:'Media', desc:'Fusión societaria y registro de nueva razón social.' },
  { id:'LEX-004', cliente:'Ingrid Martínez',    cedula:'003-4561230-5', tipo:'Derecho Familiar',      abogado:'Dra. M. Rodríguez', fecha:'2025-03-22', estado:'Activo',    prioridad:'Media', desc:'Proceso de divorcio consensual con partición de bienes.' },
  { id:'LEX-005', cliente:'Carlos Tejeda',      cedula:'004-7890123-8', tipo:'Derecho Penal',         abogado:'Lic. S. Peralta',   fecha:'2025-03-15', estado:'Cerrado',   prioridad:'Baja',  desc:'Defensa en caso de robo. Sentencia absolutoria obtenida.' },
  { id:'LEX-006', cliente:'TechRD Solutions',   cedula:'1-31-98765-4',  tipo:'Propiedad Intelectual', abogado:'Dr. J. Castro',     fecha:'2025-04-20', estado:'Activo',    prioridad:'Alta',  desc:'Registro de marca y patente de software fintech.' },
];

let filtered      = [...records];
let sortDir       = {};
let currentFilter = 'todos';
let currentSearch = '';
let currentPage   = 1;
const PAGE_SIZE   = 4;
let editingIndex  = null;

/* ════════════════════════════════════════
   NAV — switch views
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
  });
});

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
      <td>
        <div class="actions">
          <button class="action-btn view" title="Ver detalle" onclick="openPanel(${fi})">◎</button>
          <button class="action-btn edit" title="Editar"      onclick="editRecord(${fi})">✎</button>
          <button class="action-btn del"  title="Eliminar"    onclick="deleteRecord(${fi})">✕</button>
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
  prev.className = 'page-btn';
  prev.textContent = '‹';
  prev.disabled = currentPage === 1;
  prev.onclick = () => { currentPage--; renderTable(); };
  container.appendChild(prev);

  let start = Math.max(1, currentPage - 2);
  let end   = Math.min(totalPages, start + 4);
  start     = Math.max(1, end - 4);
  for (let p = start; p <= end; p++) {
    const btn = document.createElement('button');
    btn.className = 'page-btn' + (p === currentPage ? ' active' : '');
    btn.textContent = p;
    btn.onclick = () => { currentPage = p; renderTable(); };
    container.appendChild(btn);
  }

  const next = document.createElement('button');
  next.className = 'page-btn';
  next.textContent = '›';
  next.disabled = currentPage === totalPages;
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

function searchTable(val) {
  currentSearch = val.toLowerCase();
  applyFilters();
}

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
   MODAL
════════════════════════════════════════ */
function openModal(prefill) {
  document.getElementById('modal-title').textContent =
    prefill ? 'Editar Expediente' : 'Nuevo Expediente';
  document.getElementById('f-cliente').value   = prefill?.cliente   || '';
  document.getElementById('f-cedula').value    = prefill?.cedula    || '';
  document.getElementById('f-tipo').value      = prefill?.tipo      || 'Derecho Civil';
  document.getElementById('f-abogado').value   = prefill?.abogado   || 'Dra. M. Rodríguez';
  document.getElementById('f-estado').value    = prefill?.estado    || 'Activo';
  document.getElementById('f-prioridad').value = prefill?.prioridad || 'Alta';
  document.getElementById('f-desc').value      = prefill?.desc      || '';
  document.getElementById('modal').classList.add('open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  editingIndex = null;
}

function addRecord() {
  const cliente   = document.getElementById('f-cliente').value.trim();
  const cedula    = document.getElementById('f-cedula').value.trim();
  const tipo      = document.getElementById('f-tipo').value;
  const abogado   = document.getElementById('f-abogado').value;
  const estado    = document.getElementById('f-estado').value;
  const prioridad = document.getElementById('f-prioridad').value;
  const desc      = document.getElementById('f-desc').value.trim();

  if (!cliente) { showToast('⚠ Ingrese el nombre del cliente'); return; }

  if (editingIndex !== null) {
    const id = filtered[editingIndex].id;
    const ri = records.findIndex(r => r.id === id);
    if (ri > -1) records[ri] = { ...records[ri], cliente, cedula, tipo, abogado, estado, prioridad, desc };
    showToast('✓ Expediente actualizado');
  } else {
    const today = new Date().toISOString().split('T')[0];
    const newId = 'LEX-' + String(records.length + 1).padStart(3, '0');
    records.push({ id:newId, cliente, cedula, tipo, abogado, fecha:today, estado, prioridad, desc });
    showToast('✓ Expediente registrado');
  }

  closeModal();
  applyFilters();
}

function editRecord(idx) {
  editingIndex = idx;
  openModal(filtered[idx]);
}

function deleteRecord(idx) {
  const r = filtered[idx];
  if (!confirm(`¿Eliminar expediente ${r.id} — ${r.cliente}?`)) return;
  records = records.filter(rec => rec.id !== r.id);
  applyFilters();
  showToast('✕ Expediente eliminado');
}

/* ════════════════════════════════════════
   DETAIL PANEL
════════════════════════════════════════ */
function openPanel(idx) {
  const r = filtered[idx];
  document.getElementById('panel-title').textContent = r.id + ' · ' + r.cliente;
  document.getElementById('panel-badge').innerHTML =
    `<span class="badge ${badgeClass(r.estado)}">${r.estado}</span>`;
  document.getElementById('panel-body').innerHTML = `
    <div class="detail-row"><span class="detail-key">Cédula/RNC</span><span class="detail-val">${r.cedula}</span></div>
    <div class="detail-row"><span class="detail-key">Tipo</span><span class="detail-val">${r.tipo}</span></div>
    <div class="detail-row"><span class="detail-key">Abogado</span><span class="detail-val">${r.abogado}</span></div>
    <div class="detail-row"><span class="detail-key">Fecha apertura</span><span class="detail-val">${r.fecha}</span></div>
    <div class="detail-row"><span class="detail-key">Prioridad</span>
      <span class="detail-val"><div class="priority" style="justify-content:flex-end">${priorityDots(r.prioridad)}</div></span></div>
    <div class="detail-row"><span class="detail-key">Descripción</span>
      <span class="detail-val" style="font-size:12px;color:var(--muted)">${r.desc || '—'}</span></div>
    <div class="timeline">
      <div class="timeline-title">Historial</div>
      <div class="timeline-item">
        <div class="tl-dot"></div>
        <div class="tl-content"><div class="tl-text">Expediente aperturado</div><div class="tl-time">${r.fecha}</div></div>
      </div>
      <div class="timeline-item">
        <div class="tl-dot"></div>
        <div class="tl-content"><div class="tl-text">Documentación recibida</div><div class="tl-time">${r.fecha}</div></div>
      </div>
      <div class="timeline-item">
        <div class="tl-dot"></div>
        <div class="tl-content"><div class="tl-text">Asignado a ${r.abogado}</div><div class="tl-time">${r.fecha}</div></div>
      </div>
    </div>
    <div style="margin-top:20px;display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn btn-success" style="flex:1" onclick="changeStatus(${idx},'Activo')">Activar</button>
      <button class="btn btn-danger"  style="flex:1" onclick="changeStatus(${idx},'Cerrado')">Cerrar</button>
    </div>`;
  document.getElementById('detail-panel').classList.add('open');
}

function closePanel() {
  document.getElementById('detail-panel').classList.remove('open');
}

function changeStatus(idx, status) {
  const r  = filtered[idx];
  const ri = records.findIndex(x => x.id === r.id);
  if (ri > -1) {
    records[ri].estado = status;
    applyFilters();
    showToast(`✓ Estado → ${status}`);
    closePanel();
  }
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
  const rows = [['ID','Cliente','Cédula','Tipo','Abogado','Fecha','Estado','Prioridad']];
  records.forEach(r => rows.push([r.id, r.cliente, r.cedula, r.tipo, r.abogado, r.fecha, r.estado, r.prioridad]));
  const csv = rows.map(r => r.join(',')).join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = 'expedientes.csv';
  a.click();
  showToast('↑ Exportación completada');
}

/* ════════════════════════════════════════
   CLOSE MODAL ON OVERLAY CLICK
════════════════════════════════════════ */
document.getElementById('modal').addEventListener('click', e => {
  if (e.target === document.getElementById('modal')) closeModal();
});

/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
applyFilters();

/* ════════════════════════════════════════
   CLIENTES
════════════════════════════════════════ */
let clientes = [
  { id:'CLI-001', nombre:'Ana Belkis Núñez',  cedula:'001-1234567-1', tipo:'Persona Natural', telefono:'809-555-0101', email:'ana.nunez@email.com',    direccion:'Av. 27 de Febrero #45, Santo Domingo', notas:'' },
  { id:'CLI-002', nombre:'Roberto Almonte',    cedula:'002-9876543-2', tipo:'Persona Natural', telefono:'809-555-0202', email:'r.almonte@email.com',     direccion:'Calle El Conde #12, Santo Domingo',    notas:'' },
  { id:'CLI-003', nombre:'Empresas CORE SRL',  cedula:'1-30-12345-7',  tipo:'Empresa',         telefono:'809-555-0303', email:'legal@coresrl.com',       direccion:'Av. Winston Churchill, Torre Core, P3', notas:'Contacto principal: Ing. Luis Pérez' },
  { id:'CLI-004', nombre:'Ingrid Martínez',    cedula:'003-4561230-5', tipo:'Persona Natural', telefono:'809-555-0404', email:'ingrid.m@email.com',      direccion:'Los Prados, C/ Las Flores #8',         notas:'' },
  { id:'CLI-005', nombre:'Carlos Tejeda',      cedula:'004-7890123-8', tipo:'Persona Natural', telefono:'809-555-0505', email:'carlos.tejeda@email.com', direccion:'Villa Consuelo, C/ 5 #22',             notas:'Caso cerrado' },
  { id:'CLI-006', nombre:'TechRD Solutions',   cedula:'1-31-98765-4',  tipo:'Empresa',         telefono:'809-555-0606', email:'info@techrd.com',         direccion:'Zona Franca Las Américas, Local 14',   notas:'Facturación mensual' },
];

let clientesFiltrados    = [...clientes];
let clienteFilter        = 'todos';
let clienteSearch        = '';
let editingClienteIndex  = null;

function renderClientes() {
  const tbody = document.getElementById('clientes-body');
  const empty = document.getElementById('clientes-empty');
  tbody.innerHTML = '';

  if (!clientesFiltrados.length) { empty.style.display='block'; return; }
  empty.style.display = 'none';

  clientesFiltrados.forEach((c, i) => {
    const expCount = records.filter(r => r.cedula === c.cedula).length;
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
  el.classList.add('active');
  applyClienteFilters();
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

function closeClienteModal() {
  document.getElementById('modal-cliente').classList.remove('open');
  editingClienteIndex = null;
}

function saveCliente() {
  const nombre = document.getElementById('fc-nombre').value.trim();
  if (!nombre) { showToast('⚠ Ingrese el nombre del cliente'); return; }
  const obj = {
    nombre,
    cedula:    document.getElementById('fc-cedula').value.trim(),
    tipo:      document.getElementById('fc-tipo').value,
    telefono:  document.getElementById('fc-telefono').value.trim(),
    email:     document.getElementById('fc-email').value.trim(),
    direccion: document.getElementById('fc-direccion').value.trim(),
    notas:     document.getElementById('fc-notas').value.trim(),
  };
  if (editingClienteIndex !== null) {
    obj.id = clientesFiltrados[editingClienteIndex].id;
    const ri = clientes.findIndex(c => c.id === obj.id);
    if (ri > -1) clientes[ri] = obj;
    showToast('✓ Cliente actualizado');
  } else {
    obj.id = 'CLI-' + String(clientes.length + 1).padStart(3,'0');
    clientes.push(obj);
    showToast('✓ Cliente registrado');
  }
  closeClienteModal();
  applyClienteFilters();
}

function editCliente(i) { editingClienteIndex = i; openClienteModal(clientesFiltrados[i]); }

function deleteCliente(i) {
  const c = clientesFiltrados[i];
  if (!confirm(`¿Eliminar cliente ${c.nombre}?`)) return;
  clientes = clientes.filter(x => x.id !== c.id);
  applyClienteFilters();
  showToast('✕ Cliente eliminado');
}

document.getElementById('modal-cliente').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-cliente')) closeClienteModal();
});

/* ════════════════════════════════════════
   AUDIENCIAS
════════════════════════════════════════ */
let audiencias = [
  { id:'AUD-001', expedienteId:'LEX-001', cliente:'Ana Belkis Núñez',  tipo:'Audiencia Preliminar',     fecha:'2025-05-10', hora:'09:00', tribunal:'Juzgado Civil y Comercial, Sala 2',  estado:'Completada', notas:'' },
  { id:'AUD-002', expedienteId:'LEX-002', cliente:'Roberto Almonte',   tipo:'Audiencia de Fondo',       fecha:'2025-05-20', hora:'10:30', tribunal:'Tribunal Laboral, 1er Distrito',     estado:'Programada', notas:'Llevar contrato original' },
  { id:'AUD-003', expedienteId:'LEX-004', cliente:'Ingrid Martínez',   tipo:'Audiencia de Conciliación',fecha:'2025-05-18', hora:'14:00', tribunal:'Juzgado de Familia, Sala 1',         estado:'Programada', notas:'' },
  { id:'AUD-004', expedienteId:'LEX-006', cliente:'TechRD Solutions',  tipo:'Vista de Causa',           fecha:'2025-04-30', hora:'11:00', tribunal:'Oficina Nacional de PI',             estado:'Completada', notas:'' },
  { id:'AUD-005', expedienteId:'LEX-003', cliente:'Empresas CORE SRL', tipo:'Audiencia de Sentencia',   fecha:'2025-06-05', hora:'09:30', tribunal:'Cámara Comercial, Santo Domingo',    estado:'Programada', notas:'Confirmar asistencia del representante legal' },
  { id:'AUD-006', expedienteId:'LEX-005', cliente:'Carlos Tejeda',     tipo:'Audiencia de Fondo',       fecha:'2025-03-20', hora:'08:00', tribunal:'Juzgado Penal Colegiado, Sala 4',    estado:'Cancelada',  notas:'Reprogramada por el tribunal' },
];

let audienciasFiltradas   = [...audiencias];
let audienciaFilter       = 'todos';
let audienciaSearch       = '';
let editingAudienciaIndex = null;

function audBadge(e) {
  return { Programada:'badge-pending', Completada:'badge-active', Cancelada:'badge-closed' }[e] || '';
}

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
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="td-id">${a.expedienteId}</td>
      <td>${a.cliente}</td>
      <td class="td-muted">${a.tipo}</td>
      <td style="font-family:var(--font-num);${isHoy?'color:var(--success);font-weight:600':''}">${a.fecha}${isHoy?' <span style="font-size:10px;background:rgba(74,222,128,.12);color:var(--success);padding:1px 6px;border-radius:3px;font-weight:700">HOY</span>':''}</td>
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
  renderAudiencias();
}

function filterAudiencias(val, el) {
  audienciaFilter = val;
  document.querySelectorAll('#view-audiencias .filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  applyAudienciaFilters();
}

function searchAudiencias(val) { audienciaSearch = val.toLowerCase(); applyAudienciaFilters(); }

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

function closeAudienciaModal() {
  document.getElementById('modal-audiencia').classList.remove('open');
  editingAudienciaIndex = null;
}

function saveAudiencia() {
  const expId = document.getElementById('fa-expediente').value;
  const exp   = records.find(r => r.id === expId);
  const obj = {
    expedienteId: expId,
    cliente:      exp?.cliente || '',
    tipo:         document.getElementById('fa-tipo').value,
    fecha:        document.getElementById('fa-fecha').value,
    hora:         document.getElementById('fa-hora').value,
    tribunal:     document.getElementById('fa-tribunal').value.trim(),
    estado:       document.getElementById('fa-estado').value,
    notas:        document.getElementById('fa-notas').value.trim(),
  };
  if (!obj.fecha) { showToast('⚠ Seleccione una fecha'); return; }
  if (editingAudienciaIndex !== null) {
    obj.id = audienciasFiltradas[editingAudienciaIndex].id;
    const ri = audiencias.findIndex(a => a.id === obj.id);
    if (ri > -1) audiencias[ri] = obj;
    showToast('✓ Audiencia actualizada');
  } else {
    obj.id = 'AUD-' + String(audiencias.length + 1).padStart(3,'0');
    audiencias.push(obj);
    showToast('✓ Audiencia registrada');
  }
  closeAudienciaModal();
  applyAudienciaFilters();
}

function editAudiencia(i)   { editingAudienciaIndex = i; openAudienciaModal(audienciasFiltradas[i]); }

function deleteAudiencia(i) {
  const a = audienciasFiltradas[i];
  if (!confirm(`¿Eliminar audiencia ${a.id}?`)) return;
  audiencias = audiencias.filter(x => x.id !== a.id);
  applyAudienciaFilters();
  showToast('✕ Audiencia eliminada');
}

document.getElementById('modal-audiencia').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-audiencia')) closeAudienciaModal();
});

/* ════════════════════════════════════════
   DOCUMENTOS
════════════════════════════════════════ */
let documentos = [
  { id:'DOC-001', nombre:'Contrato de Arrendamiento Comercial', expedienteId:'LEX-001', tipo:'Contrato',  autor:'Dra. M. Rodríguez', fecha:'2025-04-12', tamano:'245 KB', estado:'Final',   notas:'' },
  { id:'DOC-002', nombre:'Demanda Laboral - Almonte vs Empresa', expedienteId:'LEX-002', tipo:'Demanda',   autor:'Lic. A. Fernández', fecha:'2025-04-08', tamano:'512 KB', estado:'Firmado', notas:'' },
  { id:'DOC-003', nombre:'Acta de Fusión Empresas CORE',         expedienteId:'LEX-003', tipo:'Contrato',  autor:'Dr. J. Castro',     fecha:'2025-03-30', tamano:'1.2 MB', estado:'Borrador',notas:'Pendiente revisión notarial' },
  { id:'DOC-004', nombre:'Poder Especial - Ingrid Martínez',     expedienteId:'LEX-004', tipo:'Poder',     autor:'Dra. M. Rodríguez', fecha:'2025-03-22', tamano:'98 KB',  estado:'Firmado', notas:'' },
  { id:'DOC-005', nombre:'Sentencia Absolutoria - Tejeda',       expedienteId:'LEX-005', tipo:'Sentencia', autor:'Lic. S. Peralta',   fecha:'2025-03-15', tamano:'330 KB', estado:'Final',   notas:'Archivado' },
  { id:'DOC-006', nombre:'Solicitud Registro de Marca TechRD',   expedienteId:'LEX-006', tipo:'Otro',      autor:'Dr. J. Castro',     fecha:'2025-04-20', tamano:'780 KB', estado:'Final',   notas:'' },
];

let documentosFiltrados   = [...documentos];
let documentoFilter       = 'todos';
let documentoSearch       = '';
let editingDocumentoIndex = null;

function docBadge(e) {
  return { Final:'badge-active', Firmado:'badge-urgent', Borrador:'badge-pending' }[e] || '';
}

function docIcono(tipo) {
  const m = { Contrato:'📄', Demanda:'⚖', Poder:'🔏', Sentencia:'🏛', Otro:'📎' };
  return m[tipo] || '📄';
}

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
  el.classList.add('active');
  applyDocumentoFilters();
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

function closeDocumentoModal() {
  document.getElementById('modal-documento').classList.remove('open');
  editingDocumentoIndex = null;
}

function saveDocumento() {
  const nombre = document.getElementById('fd-nombre').value.trim();
  if (!nombre) { showToast('⚠ Ingrese el nombre del documento'); return; }
  const obj = {
    nombre,
    expedienteId: document.getElementById('fd-expediente').value,
    tipo:         document.getElementById('fd-tipo').value,
    estado:       document.getElementById('fd-estado').value,
    autor:        document.getElementById('fd-autor').value,
    notas:        document.getElementById('fd-notas').value.trim(),
    fecha:        new Date().toISOString().split('T')[0],
    tamano:       '—',
  };
  if (editingDocumentoIndex !== null) {
    obj.id     = documentosFiltrados[editingDocumentoIndex].id;
    obj.tamano = documentosFiltrados[editingDocumentoIndex].tamano;
    const ri = documentos.findIndex(d => d.id === obj.id);
    if (ri > -1) documentos[ri] = obj;
    showToast('✓ Documento actualizado');
  } else {
    obj.id = 'DOC-' + String(documentos.length + 1).padStart(3,'0');
    documentos.push(obj);
    showToast('✓ Documento registrado');
  }
  closeDocumentoModal();
  applyDocumentoFilters();
}

function editDocumento(i)   { editingDocumentoIndex = i; openDocumentoModal(documentosFiltrados[i]); }

function deleteDocumento(i) {
  const d = documentosFiltrados[i];
  if (!confirm(`¿Eliminar "${d.nombre}"?`)) return;
  documentos = documentos.filter(x => x.id !== d.id);
  applyDocumentoFilters();
  showToast('✕ Documento eliminado');
}

document.getElementById('modal-documento').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-documento')) closeDocumentoModal();
});

/* ── Init de los nuevos módulos ── */
applyClienteFilters();
applyAudienciaFilters();
applyDocumentoFilters();
