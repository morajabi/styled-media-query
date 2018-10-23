/**
 * Converts breakpoint units in px to rem or em
 * @param {Object} breakpoints - an object containing breakpoint names as keys and the width as value
 * @param {number} ratio [16] - size of 1 rem in px. What is your main font-size in px?
 * @param {'rem' | 'em'} unit
 */
function pxToEmOrRem(breakpoints, ratio = 16, unit) {
  const newBreakpoints = {};

  for (let key in breakpoints) {
    const point = breakpoints[key];

    if (String(point).includes('px')) {
      newBreakpoints[key] = +(parseInt(point) / ratio) + unit;
      continue;
    }

    newBreakpoints[key] = point;
  }

  return newBreakpoints;
}

/**
 * Converts breakpoint units in px to em 
 * @param {Object} breakpoints - an object containing breakpoint names as keys and the width as value
 * @param {number} ratio [16] - size of 1em in px. What is your main font-size in px?
 */
export function pxToEm(breakpoints, ratio = 16) {
  return pxToEmOrRem(breakpoints, ratio, 'em');
}

/**
 * Converts breakpoint units in px to rem 
 * @param {Object} breakpoints - an object containing breakpoint names as keys and the width as value
 * @param {number} ratio [16] - size of 1rem in px. What is your main font-size in px?
 */
export function pxToRem(breakpoints, ratio = 16) {
  return pxToEmOrRem(breakpoints, ratio, 'rem');
}
