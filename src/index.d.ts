// Type definitions for styled-media-query 2.0.2
// Project: https://github.com/morajabi/styled-media-query
// Definitions by: François Best <https://github.com/franky47>
// TypeScript version: 3.1.6

import { ThemedStyledProps, FlattenInterpolation } from 'styled-components'

type GeneratorFunction<Props, Theme> = (
  strings: TemplateStringsArray,
  ...interpolations: (
    | ((
        props: ThemedStyledProps<Props, Theme>
      ) => string | FlattenInterpolation<ThemedStyledProps<Props, Theme>>)
    | FlattenInterpolation<ThemedStyledProps<Props, Theme>>)[]
) => any

// --

export interface MediaGenerator<Breakpoints, Theme> {
  lessThan: <Props>(
    breakpoint: keyof Breakpoints
  ) => GeneratorFunction<Props, Theme>
  greaterThan: <Props>(
    breakpoint: keyof Breakpoints
  ) => GeneratorFunction<Props, Theme>
  between: <Props>(
    fist: keyof Breakpoints,
    second: keyof Breakpoints
  ) => GeneratorFunction<Props, Theme>
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
