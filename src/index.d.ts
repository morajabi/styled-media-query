// Type definitions for styled-media-query 2.1.1
// Project: https://github.com/morajabi/styled-media-query
// Definitions by: François Best <https://github.com/franky47>
// Requires @types/styled-components definitions ^4.1
// TypeScript version: 3.3.3

import {
  ThemedStyledProps,
  InterpolationValue,
  FlattenInterpolation
} from 'styled-components'

type InterpolationFunction<Props, Theme> = (
  props: ThemedStyledProps<Props, Theme>
) => InterpolationValue | FlattenInterpolation<ThemedStyledProps<Props, Theme>>

type GeneratorFunction<Props, Theme> = (
  strings: TemplateStringsArray,
  ...interpolations: (
    | InterpolationValue
    | InterpolationFunction<Props, Theme>
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

// Convertors --

export function pxToEm<B>(breakpoints: B, ratio?: number): B
export function pxToRem<B>(breakpoints: B, ratio?: number): B
