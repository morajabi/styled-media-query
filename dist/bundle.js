(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('styled-components')) :
	typeof define === 'function' && define.amd ? define(['exports', 'styled-components'], factory) :
	(factory((global.StyledMediaQuery = {}),global.styledComponents));
}(this, (function (exports,styledComponents) { 'use strict';

/**
 * Converts breakpoint units in px to rem or em
 * @param {Object} breakpoints - an object containing breakpoint names as keys and the width as value
 * @param {number} [16] ratio - size of 1 rem in px. What is your main font-size in px? 
 * @param {'rem' | 'em'} unit
 */
function pxToEmOrRem(breakpoints) {
  var ratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
  var unit = arguments[2];

  var newBreakpoints = {};

  for (var key in breakpoints) {
    var point = breakpoints[key];

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
 * @param {number} [16] ratio - size of 1em in px. What is your main font-size in px? 
 */
function pxToEm(breakpoints) {
  var ratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;

  return pxToEmOrRem(breakpoints, ratio, 'em');
}

/**
 * Converts breakpoint units in px to rem 
 * @param {Object} breakpoints - an object containing breakpoint names as keys and the width as value
 * @param {number} [16] ratio - size of 1rem in px. What is your main font-size in px? 
 */
function pxToRem(breakpoints) {
  var ratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;

  return pxToEmOrRem(breakpoints, ratio, 'rem');
}

var _templateObject = _taggedTemplateLiteralLoose(['\n        @media (max-width: ', ') {\n          ', '\n        }\n      '], ['\n        @media (max-width: ', ') {\n          ', '\n        }\n      ']);
var _templateObject2 = _taggedTemplateLiteralLoose(['\n        @media (min-width: ', ') {\n          ', '\n        }\n      '], ['\n        @media (min-width: ', ') {\n          ', '\n        }\n      ']);

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

/**
 * Default media breakpoints
 * @type {Object}
 */
var defaultBreakpoints = {
  huge: '1440px',
  large: '1170px',
  medium: '768px',
  small: '450px'

  /**
   * Media query generator 
   * @param {Object} [defaultBreakpoints] breakpoints - Map labels to breakpoint sizes
   * @return {Object} - Media generators for each breakpoint
   */
};function generateMedia() {
  var breakpoints = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultBreakpoints;

  return Object.keys(breakpoints).reduce(function (acc, label) {
    var size = breakpoints[label];

    acc.to[label] = function () {
      return styledComponents.css(_templateObject, size, styledComponents.css.apply(undefined, arguments));
    };

    acc.from[label] = function () {
      return styledComponents.css(_templateObject2, size, styledComponents.css.apply(undefined, arguments));
    };

    return acc;
  }, { to: {}, from: {} });
}

/**
 * Media object with default breakpoints
 * @return {object} - Media generators for each size
 */

var media = generateMedia();

/**
 * Usage: styled.div` ${media.from.medium`background: #000;`} `;
 * With this code, background for small and medium sizes will be `default` and for more than medium, will be `#000`
 */

exports.pxToEm = pxToEm;
exports.pxToRem = pxToRem;
exports.defaultBreakpoints = defaultBreakpoints;
exports.generateMedia = generateMedia;
exports.media = media;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bundle.js.map
