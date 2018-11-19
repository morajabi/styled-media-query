// Type definitions for styled-media-query 2.0.2

type GeneratorFunction<Theme> = <P>(
  strings: TemplateStringsArray,
  ...interpolations: (any)[]
) => any

// --

export interface MediaGenerator<Breakpoints, Theme> {
  lessThan: (breakpoint: keyof Breakpoints) => GeneratorFunction<Theme>
  greaterThan: (breakpoint: keyof Breakpoints) => GeneratorFunction<Theme>
  between: (
    fist: keyof Breakpoints,
    second: keyof Breakpoints
  ) => GeneratorFunction<Theme>
}

// --

export interface DefaultBreakpoints {
  huge: string
  large: string
  medium: string
  small: string
}

export const defaultBreakpoints: DefaultBreakpoints

// --

export function generateMedia<Breakpoints = DefaultBreakpoints, Theme = any>(
  breakpoints?: Breakpoints
): MediaGenerator<Breakpoints, Theme>

// --

declare const media: MediaGenerator<DefaultBreakpoints, any>

export default media
