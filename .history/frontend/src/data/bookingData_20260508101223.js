/* =========================================================
   PARKIIIN — js/data/bookingData.js
   Багийн гишүүн: Захиалгын статик JSON өгөгдөл
   ES6 export ашиглан бусад модулиудад нийтэлж байна.
   ========================================================= */

/**
 * Захиалгын үнийн тохиргоо.
 * booking.js-д import хийж ашиглана.
 */
export const BOOKING_CONFIG = {
  /** Цагийн тариф (₮/цаг) */
  RATE_PER_HOUR: 2000,
  /** Loyalty оноо ашиглах тогтмол хөнгөлөлт (₮) */
  LOYALTY_DISCOUNT: 200,
};

/**
 * Цагийн сонголтуудын жагсаалт.
 * Booking хуудасны "Хугацаа сонгох" хэсэгт ашиглагдана.
 * @type {Array.<{label: string, hours: number, span2?: boolean}>}
 */
export const HOUR_OPTIONS = [
  { label: '1 цаг',  hours: 1 },
  { label: '2 цаг',  hours: 2, default: true },
  { label: '3 цаг',  hours: 3 },
  { label: '4 цаг',  hours: 4 },
  { label: '6 цаг',  hours: 6 },
  { label: '8 цаг',  hours: 8 },
  { label: 'Өдрийн', hours: 10, span2: true },
];

/**
 * Төлбөрийн хэрэгслүүдийн жагсаалт.
 * @type {Array.<{id: string, name: string, sub: string, default?: boolean}>}
 */
export const PAYMENT_METHODS = [
  { id: 'qpay',    name: 'QPay',        sub: 'Цахим хэтэвч',   default: true },
  { id: 'social',  name: 'Social Pay',  sub: 'Голомт банк' },
  { id: 'toki',    name: 'Toki Pay',    sub: 'Цахим хэтэвч' },
  { id: 'card',    name: 'Банкны карт', sub: 'Visa / Mastercard' },
];
