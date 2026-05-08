/* =========================================================
   PARKIIIN — js/data/tipsData.js
   Багийн гишүүн: Зөвлөмжийн статик JSON өгөгдөл
   ES6 export ашиглан бусад модулиудад нийтэлж байна.
   ========================================================= */

/**
 * Зөвлөмжийн нийтлэлүүдийн жагсаалт.
 * tips.js-д import хийж tips.html хуудасны карт үүсгэхэд ашиглагдана.
 * @type {Array.<{id: string, cat: string, tag: string, title: string, desc: string, gradient: string, iconPath: string}>}
 */
export const TIPS_ARTICLES = [
  {
    id: 'safety-1',
    cat: 'safety',
    tag: 'Шинэ • 5 мин унших',
    title: 'Хэрхэн аюулгүй зогсох вэ?',
    desc: 'Автомашинаа аюулгүй байршуулах үндсэн заавар болон анхаарах зүйлс.',
    gradient: 'linear-gradient(135deg,#1a2e2a,#2BBFA0)',
    iconPath: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  },
  {
    id: 'signs-1',
    cat: 'signs',
    tag: 'Тэмдэглэл • 5 мин унших',
    title: 'Зогсоолын тэмдэг тэмдэглэгээ',
    desc: 'Хотын гудамжны зогсоолын тэмдэглэгээний утга учир.',
    gradient: 'linear-gradient(135deg,#0d5e52,#2BBFA0)',
    iconPath: 'M3 3h18v13H3z M12 16v5 M8 21h8',
  },
  {
    id: 'eco-1',
    cat: 'eco',
    tag: 'Эко • 4 мин унших',
    title: 'Эко зогсоолд зогсох ёс',
    desc: 'Байгаль орчинд ээлтэй, цахилгаан тээвэр болон дугуйчдад зориулсан зогсоолын стандарт.',
    gradient: 'linear-gradient(135deg,#134040,#1e9e85)',
    iconPath: 'M2 22c1.25-.987 2.27-1.975 3.9-2.975C7.45 18.05 9.7 17.5 12 17.5c2.3 0 4.55.55 6.1 1.525C19.73 20.025 20.75 21.013 22 22 M12 17.5V2 M7 7c1.5 1 3 1.5 5 1.5S14.5 8 16 7',
  },
  {
    id: 'night-1',
    cat: 'night',
    tag: 'Шөнийн • 6 мин унших',
    title: 'Шөнийн цагаар аюулгүй байдал',
    desc: 'Шөнийн цагт зогсоолд машинаа байрлуулах, хулгайгаас хамгаалах зөвлөмжүүд.',
    gradient: 'linear-gradient(135deg,#0a1a2a,#1a3a5a)',
    iconPath: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z',
  },
];

/**
 * Видео контентийн жагсаалт.
 * tips.js-д import хийж видео хэсгийг үүсгэхэд ашиглагдана.
 * @type {Array.<{id: string, label: string, duration: string, gradient: string, featured?: boolean}>}
 */
export const TIPS_VIDEOS = [
  {
    id: 'park-1',
    label: 'Зогсоолд хэрхэн зөв байрлуулах вэ?',
    duration: '2:14',
    gradient: 'linear-gradient(135deg,#1a2e2a,#2BBFA0)',
  },
  {
    id: 'night-1',
    label: 'Шөнийн цагаар аюулгүй зүйлс',
    duration: '3:45',
    gradient: 'linear-gradient(135deg,#0d5e52,#2BBFA0)',
  },
  {
    id: 'eco-1',
    label: 'Эко зогсоолд зогсох зүйлс',
    duration: '1:58',
    gradient: 'linear-gradient(135deg,#134040,#1e9e85)',
  },
  {
    id: 'signs-1',
    label: 'Зогсоолын тэмдгүүд',
    duration: '4:02',
    gradient: 'linear-gradient(135deg,#0a2a4a,#1a5a80)',
  },
  {
    id: 'featured-1',
    label: 'Зогсоолын аюулгүй байдлын бүрэн гарын авлага',
    duration: '12:30',
    gradient: 'linear-gradient(135deg,#1a2e2a,#2BBFA0)',
    featured: true,
  },
];
