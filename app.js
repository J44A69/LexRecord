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
