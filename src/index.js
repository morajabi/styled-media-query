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
};

function getSizeFromBreakpoint(breakpointValue, breakpoints = {}) {
  if (breakpoints[breakpointValue]) {
    return breakpoints[breakpointValue];
  } else if (parseInt(breakpointValue)) {
    return breakpointValue;
  } else {
    console.error('styled-media-query: No valid breakpoint or size specified for media.');
    return '0';
  }
}

/**
 * Media query generator
 * @param {Object} breakpoints - Map labels to breakpoint sizes
 * @return {Object} - Media generators for each breakpoint
 */
export function generateMedia(breakpoints = defaultBreakpoints) {
  const lessThan = (breakpoint) => (...args) => css`
    @media (max-width: ${getSizeFromBreakpoint(breakpoint, breakpoints)}) {
      ${css(...args)}
    }
  `;

  const greaterThan = (breakpoint) => (...args) => css`
    @media (min-width: ${getSizeFromBreakpoint(breakpoint, breakpoints)}) {
      ${css(...args)}
    }
  `;

  const between = (firstBreakpoint, secondBreakpoint) => (...args) => css`
    @media (min-width: ${getSizeFromBreakpoint(firstBreakpoint, breakpoints)}) and
      (max-width: ${getSizeFromBreakpoint(secondBreakpoint, breakpoints)}) {
      ${css(...args)}
    }
  `;

  const oldStyle = Object
    .keys(breakpoints)
    .reduce((acc, label) => {
      const size = breakpoints[label];

      acc.to[label] = (...args) => {
        console.warn(`styled-media-query: Use media.lessThan('${label}') instead of old media.to.${label} (Probably we'll deprecate it)`);
        return css`
          @media (max-width: ${size}) {
            ${css(...args)}
          }
        `;
      };

      acc.from[label] = (...args) => {
        console.warn(`styled-media-query: Use media.greaterThan('${label}') instead of old media.from.${label} (Probably we'll deprecate it)`);
        return css`
          @media (min-width: ${size}) {
            ${css(...args)}
          }
        `;
      };

      acc.styled[label] = (...args) => css(...args);

      return acc;
    },
    { to: {}, from: {}, styled: {} }
  );

  return Object.assign(
    {
      lessThan,
      greaterThan,
      between,
    },
    oldStyle,
  );
}

/**
 * Generate Media as a chained callable class by extending Function.
 * (Proposal for V3)
 */
export class GenerateMediaChained extends Function {
  /**
   * Constructor to chain `generateMedia()` and still bind the class to itself.
   * @param breakpoints   Object    The initial breakpoint object.
   * @return {any}
   */
  constructor(breakpoints = defaultBreakpoints) {
    // Call parent constuctor, making this a function.
    super('...args', 'return this.__self__.__call__(...args)');
    // Reestablish context by binding to this.
    const self = this.bind(this);
    this.__self__ =  self;
    // As we have to return an instance of `self` with bound this, create the
    // class variables on it. `callees` will later be a bound creator.
    self.callees = []
    self.media = generateMedia(breakpoints)
    return self;
  }

  /**
   * Wrapper around `lessThan()`.
   * At the moment we have to reset the length of `callees` as long as chaining
   * isn't discussed further.
   *
   * @param breakpoint    String|Number   Breakpoint to create Media-query from.
   * @return {GenerateMediaChained}
   */
  lessThan (breakpoint) {
    if (this.callees.length > 1) this.callees = []
    this.callees.push(this.media.lessThan(breakpoint))
    return this;
  }

  /**
   * Wrapper around `greaterThan()`
   *
   * @param breakpoint    String|Number   Breakpoint to create Media-query from.
   * @return {GenerateMediaChained}
   */
  greaterThan (breakpoint) {
    if (this.callees.length > 1) this.callees = []
    this.callees.push(this.media.greaterThan(breakpoint))
    return this;
  }

  /**
   * Wrapper around `between()`.
   *
   * @param firstBreakpoint   String|Number  Lower bound breakpoint.
   * @param secondBreakpoint  String|Number  Upper bound breakpoint.
   * @return {GenerateMediaChained}
   */
  between (firstBreakpoint, secondBreakpoint) {
    if (typeof firstBreakpoint === "string") this.css(firstBreakpoint)
    if (this.callees.length > 1) this.callees = []
    this.callees.push(this.media.between(firstBreakpoint, secondBreakpoint))
    return this;
  }

  /**
   * Finalizing function (like jQuerys' `end()`).
   * Tried to replicate the highlighting for styled-components with this, but
   * sadly doesn't work.
   *
   * @param args    String    The css to give to the functions in `callees`.
   * @return {*}
   */
  css (...args) {
    return this.callees[0](...args)
  }

  /**
   * Same as `css()`. But now our class is a callable.
   *
   * @param args    String    The css to give to the functions in `callees`.
   * @return {*}
   * @private
   */
  __call__ (...args) {
    return this.css(...args)
  }
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
