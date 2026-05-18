
export const BOOKING_CONFIG = {
  /** Цагийн тариф (₮/цаг) */
  RATE_PER_HOUR: 2000,
  /** Loyalty оноо ашиглах тогтмол хөнгөлөлт (₮) */
  LOYALTY_DISCOUNT: 200,
};


export const HOUR_OPTIONS = [
  { label: '1 цаг',  hours: 1 },
  { label: '2 цаг',  hours: 2, default: true },
  { label: '3 цаг',  hours: 3 },
  { label: '4 цаг',  hours: 4 },
  { label: '6 цаг',  hours: 6 },
  { label: '8 цаг',  hours: 8 },
  { label: 'Өдрийн', hours: 10, span2: true },
];


export const PAYMENT_METHODS = [
  { id: 'qpay',    name: 'QPay',        sub: 'Цахим хэтэвч',   default: true },
  { id: 'social',  name: 'Social Pay',  sub: 'Голомт банк' },
  { id: 'toki',    name: 'Toki Pay',    sub: 'Цахим хэтэвч' },
  { id: 'card',    name: 'Банкны карт', sub: 'Visa / Mastercard' },
];
