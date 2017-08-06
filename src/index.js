import { css } from 'styled-components';
import { pxToEm, pxToRem } from './convertors';

export {
  pxToEm,
  pxToRem
};

/**
 * Default media breakpoints
 * @type {Object}
 */
export const defaultBreakpoints = {
  huge: '1440px',
  large: '1170px',
  medium: '768px',
  small: '450px',
}

/**
 * Media query generator 
 * @param {Object} [defaultBreakpoints] breakpoints - Map labels to breakpoint sizes
 * @return {Object} - Media generators for each breakpoint
 */
export function generateMedia(breakpoints = defaultBreakpoints) {
  const lessThan = (breakpoint) => (...args) => css`
    @media (max-width: ${breakpoints[breakpoint]}) {
      ${css(...args)}
    }
  `;

  const greaterThan = (breakpoint) => (...args) => css`
    @media (min-width: ${breakpoints[breakpoint]}) {
      ${css(...args)}
    }
  `;

  const oldStyle = Object
    .keys(breakpoints)
    .reduce((acc, label) => {
      const size = breakpoints[label];
      
      acc.to[label] = (...args) => css`
        @media (max-width: ${size}) {
          ${css(...args)}
        }
      `;

      acc.from[label] = (...args) => css`
        @media (min-width: ${size}) {
          ${css(...args)}
        }
      `;

      return acc;
    }, 
    { to: {}, from: {} }
  );

  return Object.assign(
    {
      lessThan,
      greaterThan,
    },
    oldStyle,
  );
}

/**
 * Media object with default breakpoints
 * @return {object} - Media generators for each size
 */
export default generateMedia();

/**
 * Usage: styled.div` ${media.from.medium`background: #000;`} `;
 * With this code, background for small and medium sizes will be `default` and for more than medium, will be `#000`
 */
