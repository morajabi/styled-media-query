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
  const styled = (...args) => css(...args);

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

// TODO: comments
export class GenerateMediaChained extends Function {
  constructor(breakpoints = defaultBreakpoints) {
    super('...args', 'return this.__self__.__call__(...args)');
    const self = this.bind(this);
    this.__self__ =  self;
    self.callees = []
    self.media = generateMedia(breakpoints)
    return self;
  }

  lessThan (breakpoint) {
    if (this.callees.length > 1) this.callees = []
    this.callees.push(this.media.lessThan(breakpoint))
    return this;
  }

  greaterThan (breakpoint) {
    if (this.callees.length > 1) this.callees = []
    this.callees.push(this.media.greaterThan(breakpoint))
    return this;
  }

  between (firstBreakpoint, secondBreakpoint) {
    if (typeof firstBreakpoint === "string") this.css(firstBreakpoint)
    if (this.callees.length > 1) this.callees = []
    this.callees.push(this.media.between(firstBreakpoint, secondBreakpoint))
    return this;
  }

  css (...args) {
    return this.callees[0](...args)
  }

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
