document.addEventListener('DOMContentLoaded', () => {
  // تسجيل زيارة الصفحة لأغراض الإحصائيات بلوحة تحكم الإدارة
  const API_BASE = window.location.origin.includes('4000') ? '' : https://backend-1-gysi.onrender.com;
  fetch(`${API_BASE}/api/track-visit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path: window.location.pathname })
  }).catch(() => {}); // تجاهل الخطأ إذا الباك اند غير مشغّل بعد

  // تأثير الهيدر عند التمرير
  const header = document.querySelector('.site-header');
  if(header){
    window.addEventListener('scroll', ()=>{
      header.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // قائمة الجوال
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if(navToggle && navLinks){
    navToggle.addEventListener('click', ()=>{
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', ()=> navLinks.classList.remove('open'));
    });
  }

  // ظهور العناصر عند التمرير
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el=> io.observe(el));
  } else {
    revealEls.forEach(el=> el.classList.add('in'));
  }

  // عداد الأرقام في شريط الإحصائيات
  document.querySelectorAll('[data-count]').forEach(el=>{
    const target = parseInt(el.getAttribute('data-count'), 10);
    let started = false;
    const run = ()=>{
      if(started) return;
      started = true;
      let cur = 0;
      const step = Math.max(1, Math.round(target / 60));
      const timer = setInterval(()=>{
        cur += step;
        if(cur >= target){ cur = target; clearInterval(timer); }
        el.textContent = cur.toLocaleString();
      }, 20);
    };
    if('IntersectionObserver' in window){
      const io2 = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{ if(e.isIntersecting) run(); });
      }, { threshold:0.4 });
      io2.observe(el);
    } else { run(); }
  });
});
