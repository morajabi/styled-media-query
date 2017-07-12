'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styledComponents = require('styled-components');

/**
 * Default media breakpoints
 * @type {Object}
 */
const defaultBreakpoints = {
  huge: '1440px',
  large: '1170px',
  medium: '768px',
  small: '450px',
};

/**
 * Media query generator 
 * @param {Object} - Map labels to breakpoint sizes
 * @return {Object} - Media generators for each breakpoint
 */
function generateMedia(breakpoints = defaultBreakpoints) {
  return Object
    .keys(breakpoints)
    .reduce((acc, label) => {
      const size = breakpoints[label];
      
      acc.to[label] = (...args) => styledComponents.css`
        @media (max-width: ${size}) {
          ${styledComponents.css(...args)}
        }
      `;

      acc.from[label] = (...args) => styledComponents.css`
        @media (min-width: ${size}) {
          ${styledComponents.css(...args)}
        }
      `;

      return acc;
    }, 
    { to: {}, from: {} }
  );
}

/**
 * Media object with default breakpoints
 * @return {object} - Media generators for each size
 */
var index = generateMedia();

/**
 * Usage: styled.div` ${media.from.medium`background: #000;`} `;
 * With this code, background for small and medium sizes will be `default` and for more than medium, will be `#000`
 */

exports.defaultBreakpoints = defaultBreakpoints;
exports.generateMedia = generateMedia;
exports['default'] = index;
