/* =========================================================
   نظام تعدد اللغات — قابل للتوسعة لأي لغة مستقبلاً
   أضف لغة جديدة بإضافة كائن جديد داخل DICT (مثال: "fr": {...})
   ========================================================= */

const DICT = {
  ar: {
    nav_home: "الرئيسية",
    nav_about: "من نحن",
    nav_services: "خدماتنا",
    nav_visa: "التأشيرات",
    nav_umrah: "العمرة والحج",
    nav_flights: "حجز الطيران",
    nav_hotels: "حجز الفنادق",
    nav_offers: "العروض السياحية",
    nav_blog: "المدونة",
    nav_faq: "الأسئلة الشائعة",
    nav_contact: "تواصل معنا",
    nav_track: "تتبع طلبك",
    cta_apply: "قدّم طلب التأشيرة",
    cta_explore: "استكشف خدماتنا",

    hero_eyebrow: "وكالة سفر وسياحة مرخّصة",
    hero_title: "رحلتك تبدأ بختم ثقة، لا بمجرد تذكرة",
    hero_desc: "نرافقك من لحظة اختيار الوجهة حتى استلام تأشيرتك — تأشيرات، عمرة وحج، حجوزات طيران وفنادق، وخدمة عملاء تتابع طلبك خطوة بخطوة.",
    bp_from: "من",
    bp_from_val: "دمشق",
    bp_to: "إلى",
    bp_to_val: "أي وجهة تختارها",
    bp_class: "الدرجة",
    bp_class_val: "خدمة VIP",
    bp_seat: "الحالة",
    bp_seat_val: "طلبك قيد المتابعة",
    stamp_text: "ختم الثقة",
    stat_clients: "عميل تمت خدمته",
    stat_visas: "تأشيرة صادرة",
    stat_countries: "وجهة حول العالم",
    stat_years: "سنة خبرة",

    services_eyebrow: "خدماتنا",
    services_title: "كل ما تحتاجه لسفرة بلا تعقيد",
    services_desc: "من أول استشارة حتى عودتك من الرحلة، نغطي كل تفصيل بدقة واحترافية.",
    s1_title: "التأشيرات",
    s1_desc: "تجهيز ومتابعة طلبات التأشيرة لمعظم دول العالم بإشراف مختصين.",
    s2_title: "العمرة والحج",
    s2_desc: "باقات متكاملة تشمل التأشيرة والسكن والنقل وفق أعلى معايير الراحة.",
    s3_title: "حجز الطيران",
    s3_desc: "أفضل أسعار تذاكر الطيران على كافة الخطوط العالمية والمحلية.",
    s4_title: "حجز الفنادق",
    s4_desc: "شبكة واسعة من الفنادق المختارة بعناية في أهم الوجهات السياحية.",

    track_eyebrow: "تابع طلبك",
    track_title: "اعرف حالة معاملتك خلال ثوانٍ",
    track_desc: "أدخل رقم الطلب الذي استلمته بعد التقديم لمتابعة كل مرحلة من مراحل معالجة تأشيرتك، دون الحاجة للاتصال بنا.",
    track_placeholder: "أدخل رقم الطلب مثال: TRV-2026-00123",
    track_btn: "تحقق من الحالة",

    footer_about_title: "الشركة",
    footer_links_title: "روابط سريعة",
    footer_services_title: "الخدمات",
    footer_contact_title: "تواصل معنا",
    footer_rights: "جميع الحقوق محفوظة",
    footer_about_desc: "وكالة سياحة وسفر متخصصة في التأشيرات، العمرة والحج، وحجوزات الطيران والفنادق — نضع ثقتكم أولويتنا.",
  },
  en: {
    nav_home: "Home",
    nav_about: "About Us",
    nav_services: "Services",
    nav_visa: "Visas",
    nav_umrah: "Umrah & Hajj",
    nav_flights: "Flight Booking",
    nav_hotels: "Hotel Booking",
    nav_offers: "Tour Offers",
    nav_blog: "Blog",
    nav_faq: "FAQ",
    nav_contact: "Contact Us",
    nav_track: "Track Request",
    cta_apply: "Apply for a Visa",
    cta_explore: "Explore Our Services",

    hero_eyebrow: "Licensed Travel & Tourism Agency",
    hero_title: "Your journey begins with a stamp of trust, not just a ticket",
    hero_desc: "We're with you from choosing a destination to receiving your visa — visas, Umrah & Hajj, flight and hotel bookings, with a team tracking your request every step of the way.",
    bp_from: "From",
    bp_from_val: "Damascus",
    bp_to: "To",
    bp_to_val: "Any destination you choose",
    bp_class: "Class",
    bp_class_val: "VIP Service",
    bp_seat: "Status",
    bp_seat_val: "Your request is in progress",
    stamp_text: "Trust Seal",
    stat_clients: "Clients Served",
    stat_visas: "Visas Issued",
    stat_countries: "Destinations Worldwide",
    stat_years: "Years of Experience",

    services_eyebrow: "Our Services",
    services_title: "Everything you need for a seamless trip",
    services_desc: "From the first consultation to your return, we handle every detail with precision.",
    s1_title: "Visas",
    s1_desc: "Preparation and follow-up of visa applications for most countries, overseen by specialists.",
    s2_title: "Umrah & Hajj",
    s2_desc: "Complete packages including visa, accommodation, and transport at the highest comfort standards.",
    s3_title: "Flight Booking",
    s3_desc: "Best fares across all international and local airlines.",
    s4_title: "Hotel Booking",
    s4_desc: "A wide network of carefully selected hotels in top tourist destinations.",

    track_eyebrow: "Track Your Request",
    track_title: "Know your application status in seconds",
    track_desc: "Enter the tracking number you received after applying to follow every stage of your visa processing — no need to call us.",
    track_placeholder: "Enter request number e.g. TRV-2026-00123",
    track_btn: "Check Status",

    footer_about_title: "Company",
    footer_links_title: "Quick Links",
    footer_services_title: "Services",
    footer_contact_title: "Contact Us",
    footer_rights: "All rights reserved",
    footer_about_desc: "A travel and tourism agency specialized in visas, Umrah & Hajj, and flight and hotel bookings — your trust is our priority.",
  }
};

function applyLanguage(lang){
  const dict = DICT[lang] || DICT.ar;
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');

  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(dict[key] !== undefined) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const key = el.getAttribute('data-i18n-placeholder');
    if(dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
  });

  const toggleBtn = document.querySelector('.lang-toggle');
  if(toggleBtn) toggleBtn.textContent = lang === 'ar' ? 'English' : 'العربية';

  window.__currentLang = lang;
}

document.addEventListener('DOMContentLoaded', ()=>{
  applyLanguage('ar'); // اللغة الافتراضية
  const toggleBtn = document.querySelector('.lang-toggle');
  if(toggleBtn){
    toggleBtn.addEventListener('click', ()=>{
      const next = window.__currentLang === 'ar' ? 'en' : 'ar';
      applyLanguage(next);
    });
  }
});
