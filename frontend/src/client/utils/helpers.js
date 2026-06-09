// src/utils/helpers.js

/** Format Mongolian tögrög */
export const fmtMNT = (n) =>
  new Intl.NumberFormat('mn-MN').format(n) + '₮'

/** Duration in "2h 45m" format */
export const fmtDuration = (mins) => {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}
