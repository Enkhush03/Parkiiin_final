/* =========================================================
   PARKIIIN — js/data/parkingData.js
   Багийн гишүүн: Зогсоолын статик JSON өгөгдөл
   ES6 export ашиглан бусад модулиудад нийтэлж байна.
   ========================================================= */

/**
 * Газрын зургийн marker-уудын дэлгэрэнгүй мэдээлэл.
 * parking.js дотор import хийж ашиглана.
 * Дэлгэцэнд шууд харуулах форматтай.
 * @type {Object.<string, {emoji: string, name: string, loc: string, price: string, slots: string, rating: string}>}
 */
export const MARKER_DATA = {
  central: {
    emoji: '🏢',
    name: 'Central Tower Parking',
    loc: 'Сүхбаатар дүүрэг, УБ',
    price: '2,000₮',
    slots: '12 зогсоол',
    rating: '4.8',
  },
  shangri: {
    emoji: '🏬',
    name: 'Shangri-La Зогсоол',
    loc: 'Сүхбаатар дүүрэг, 1-р хороо',
    price: '5,000₮',
    slots: 'Нээлттэй',
    rating: '4.9',
  },
  cleanmax: {
    emoji: '🚿',
    name: 'CleanMax Auto Wash',
    loc: 'Сүхбаатар дүүрэг, 1.2км',
    price: '25,000₮',
    slots: 'Үйлчилгээ',
    rating: '4.8',
  },
  autodoc: {
    emoji: '🔧',
    name: 'Auto Doc Repair',
    loc: 'Баянзүрх дүүрэг, 1.2км',
    price: 'Тохиролцоно',
    slots: 'Засвар',
    rating: '4.9',
  },
  bluesky: {
    emoji: '🅿️',
    name: 'Blue Sky Граж',
    loc: 'Сүхбаатар дүүрэг, Энхтайваны өргөн чөлөө',
    price: '4,000₮',
    slots: '8 зогсоол',
    rating: '4.7',
  },
  ubdel: {
    emoji: '🏪',
    name: 'Улаанбаатар Их Дэлгүүр',
    loc: 'Чингэлтэй дүүрэг, 4-р хороо',
    price: '2,500₮',
    slots: '0 зогсоол',
    rating: '4.5',
  },
};

/**
 * Зогсоолын карт жагсаалтын өгөгдөл.
 * Хайлт, эрэмбэлэлтэд ашиглагдана.
 * @type {Array.<{id: string, name: string, loc: string, price: number, slots: number, dist: number, rating: number, cssClass: string, badge: string}>}
 */
export const PARKING_SPOTS = [
  {
    id: 'central',
    name: 'Central Tower Parking',
    loc: 'Сүхбаатар дүүрэг, 9-р хороо',
    price: 2000,
    slots: 12,
    dist: 0.3,
    rating: 4.8,
    cssClass: 'c1',
    badge: '12 зогсоол',
  },
  {
    id: 'shangri',
    name: 'Shangri-La Зогсоол',
    loc: 'Сүхбаатар дүүрэг, 1-р хороо',
    price: 5000,
    slots: 25,
    dist: 0.8,
    rating: 4.9,
    cssClass: 'c2',
    badge: 'Нээлттэй',
  },
  {
    id: 'bluesky',
    name: 'Blue Sky Граж',
    loc: 'Сүхбаатар дүүрэг, Энхтайваны өргөн чөлөө',
    price: 4000,
    slots: 8,
    dist: 1.2,
    rating: 4.7,
    cssClass: 'c3',
    badge: null,
  },
  {
    id: 'ubdel',
    name: 'Улаанбаатар Их Дэлгүүр',
    loc: 'Чингэлтэй дүүрэг, 4-р хороо',
    price: 2500,
    slots: 0,
    dist: 1.8,
    rating: 4.5,
    cssClass: 'c4',
    badge: null,
  },
];
