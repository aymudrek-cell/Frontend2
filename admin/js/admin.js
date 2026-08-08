const API_BASE = window.location.origin.includes('4000') ? 'http://localhost:4000' : 'https://backend-1-gysi.onrender.com';
const token = sessionStorage.getItem('adminToken');

if (!token) {
  window.location.href = 'login.html';
}

document.getElementById('adminName').textContent = sessionStorage.getItem('adminUsername') || 'الأدمن';

document.getElementById('logoutBtn').addEventListener('click', (e) => {
  e.preventDefault();
  sessionStorage.removeItem('adminToken');
  sessionStorage.removeItem('adminUsername');
  window.location.href = 'login.html';
});

const STATUS_LABELS = { new: 'جديد', review: 'قيد الدراسة', waiting: 'بانتظار العميل', done: 'مكتمل', rejected: 'مرفوض' };
const STATUS_CLASS = { new: 'status-new', review: 'status-review', waiting: 'status-waiting', done: 'status-done', rejected: 'status-rejected' };

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { ...(options.headers || {}), Authorization: `Bearer ${token}` }
  });
  if (res.status === 401) {
    sessionStorage.removeItem('adminToken');
    window.location.href = 'login.html';
    throw new Error('انتهت الجلسة');
  }
  return res;
}

async function loadStats() {
  try {
    const res = await apiFetch('/api/admin/stats');
    const data = await res.json();
    document.getElementById('statTotal').textContent = data.totalRequests;
    document.getElementById('statVisits').textContent = data.totalVisits;
    const newCount = (data.byStatus.find(s => s.status === 'new') || {}).c || 0;
    const doneCount = (data.byStatus.find(s => s.status === 'done') || {}).c || 0;
    document.getElementById('statNew').textContent = newCount;
    document.getElementById('statDone').textContent = doneCount;
  } catch (e) { console.error(e); }
}

async function loadRequests() {
  const search = document.getElementById('searchInput').value;
  const status = document.getElementById('statusFilter').value;
  const tbody = document.getElementById('requestsBody');
  tbody.innerHTML = `<tr><td colspan="6" class="empty-state">جارٍ التحميل...</td></tr>`;

  try {
    const params = new URLSearchParams({ search, status, limit: 50 });
    const res = await apiFetch(`/api/admin/visa-requests?${params}`);
    const data = await res.json();

    if (!data.rows.length) {
      tbody.innerHTML = `<tr><td colspan="6" class="empty-state">لا توجد طلبات مطابقة</td></tr>`;
      return;
    }

    tbody.innerHTML = data.rows.map(r => `
      <tr class="clickable" data-id="${r.id}">
        <td>${r.tracking_number}</td>
        <td>${r.full_name}</td>
        <td>${r.destination_country}</td>
        <td>${r.visa_type}</td>
        <td>${new Date(r.created_at).toLocaleDateString('ar')}</td>
        <td><span class="status-badge ${STATUS_CLASS[r.status]}">${STATUS_LABELS[r.status]}</span></td>
      </tr>
    `).join('');

    tbody.querySelectorAll('tr[data-id]').forEach(tr => {
      tr.addEventListener('click', () => openDetail(tr.dataset.id));
    });
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="6" class="empty-state">تعذّر تحميل البيانات — تأكد أن الباك اند يعمل.</td></tr>`;
  }
}

async function openDetail(id) {
  const res = await apiFetch(`/api/admin/visa-requests/${id}`);
  const r = await res.json();

  const rows = [
    ['رقم الطلب', r.tracking_number],
    ['الاسم الكامل', r.full_name],
    ['الهاتف', r.phone],
    ['البريد', r.email],
    ['الجنسية', r.nationality],
    ['الدولة المطلوبة', r.destination_country],
    ['نوع الفيزا', r.visa_type],
    ['تاريخ السفر', r.travel_date],
    ['عدد المسافرين', r.travelers_count],
    ['اسم المحوّل', r.transfer_sender_name],
    ['رقم التحويل', r.transfer_id],
    ['ملاحظات العميل', r.notes || '—'],
  ];

  document.getElementById('modalBody').innerHTML = `
    ${rows.map(([k, v]) => `<div class="detail-row"><span class="k">${k}</span><span>${v}</span></div>`).join('')}

    <div class="file-links">
      <a href="${API_BASE}/api/admin/visa-requests/${r.id}/file/passport_image?token=${token}" target="_blank">📄 صورة الجواز</a>
      <a href="${API_BASE}/api/admin/visa-requests/${r.id}/file/personal_photo?token=${token}" target="_blank">🖼 الصورة الشخصية</a>
      <a href="${API_BASE}/api/admin/visa-requests/${r.id}/file/transfer_proof?token=${token}" target="_blank">💳 إثبات التحويل</a>
    </div>

    <div class="form-field" style="margin-top:22px;">
      <label>تغيير الحالة</label>
      <select id="statusSelect">
        ${Object.entries(STATUS_LABELS).map(([val, label]) =>
          `<option value="${val}" ${r.status === val ? 'selected' : ''}>${label}</option>`).join('')}
      </select>
    </div>
    <div class="form-field">
      <label>ملاحظة للعميل (اختياري — تُرسل بالبريد عند الحفظ)</label>
      <textarea id="adminNoteInput" rows="2">${r.admin_note || ''}</textarea>
    </div>
    <button class="btn btn-gold" id="saveStatusBtn" style="width:100%; justify-content:center;">حفظ التحديث</button>
  `;

  document.getElementById('saveStatusBtn').addEventListener('click', async () => {
    const status = document.getElementById('statusSelect').value;
    const adminNote = document.getElementById('adminNoteInput').value;
    await apiFetch(`/api/admin/visa-requests/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, adminNote })
    });
    closeModal();
    loadRequests();
    loadStats();
  });

  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target.id === 'modalOverlay') closeModal();
});

document.getElementById('searchInput').addEventListener('input', debounce(loadRequests, 350));
document.getElementById('statusFilter').addEventListener('change', loadRequests);

// ============ تغيير بيانات الدخول ============
const settingsOverlay = document.getElementById('settingsOverlay');
document.getElementById('settingsBtn').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('settingsForm').reset();
  document.getElementById('settingsErr').style.display = 'none';
  document.getElementById('settingsSuccess').style.display = 'none';
  settingsOverlay.classList.add('open');
});
document.getElementById('settingsClose').addEventListener('click', () => settingsOverlay.classList.remove('open'));
settingsOverlay.addEventListener('click', (e) => { if (e.target.id === 'settingsOverlay') settingsOverlay.classList.remove('open'); });

document.getElementById('settingsForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const errBox = document.getElementById('settingsErr');
  const successBox = document.getElementById('settingsSuccess');
  errBox.style.display = 'none';
  successBox.style.display = 'none';

  const currentPassword = document.getElementById('currentPassword').value;
  const newUsername = document.getElementById('newUsername').value;
  const newPassword = document.getElementById('newPassword').value;

  try {
    const res = await apiFetch('/api/admin/account', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newUsername, newPassword })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'تعذّر حفظ التغييرات');

    sessionStorage.setItem('adminUsername', data.username);
    document.getElementById('adminName').textContent = data.username;
    successBox.textContent = 'تم تحديث بيانات الدخول بنجاح ✅ — استخدمها بالمرة القادمة.';
    successBox.style.display = 'block';
    document.getElementById('settingsForm').reset();
  } catch (err) {
    errBox.textContent = err.message;
    errBox.style.display = 'block';
  }
});

document.getElementById('exportExcel').addEventListener('click', (e) => {
  e.preventDefault();
  window.open(`${API_BASE}/api/admin/visa-requests-export/excel?token=${token}`, '_blank');
});
document.getElementById('exportPdf').addEventListener('click', (e) => {
  e.preventDefault();
  window.open(`${API_BASE}/api/admin/visa-requests-export/pdf?token=${token}`, '_blank');
});

function debounce(fn, delay) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}

loadStats();
loadRequests();
