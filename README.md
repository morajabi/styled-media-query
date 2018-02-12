# 💅💍 styled-media-query

[![npm](https://img.shields.io/npm/v/styled-media-query.svg)]()
[![npm](https://img.shields.io/npm/l/styled-media-query.svg)]()
[![David](https://img.shields.io/david/morajabi/styled-media-query.svg)]() [![with-coffee](https://img.shields.io/badge/made%20with-%F0%9F%92%A7%20water-blue.svg)](https://github.com/morajabi/with-coffee) [![with-love](https://img.shields.io/badge/made%20with-%F0%9F%92%8C-red.svg)](https://github.com/morajabi/with-coffee)

Beautiful media queries better than CSS @media for [styled-components](https://github.com/styled-components/styled-components) with ability to specify custom breakpoints.

**Don't forget to STAR 🎊 We are working so hard to add more features/customizations to `styled-media-query`!**

**Note: This documentation is for the latest version (v2). We still support v1 syntax but it'll be removed in v3.**

Features:

* Custom breakpoints
* Custom size units (px, em, rem)
* Awesome syntax for min-width and max-width for each breakpoint
* Familiar syntax as it uses Tagged Template Literals just like styled-components
* Ability to convert `px` to `rem` or `em`

# Start

* [Installation](#-installation)
* [Usage](#-usage) _- Get Started_
* [Concepts](#-concepts)
* [API](#-api)
* [Tagged Template Literals explained](https://www.styled-components.com/docs/advanced#tagged-template-literals)

# 🌱 Installation

You can install it like every other library with awesome **yarn**:

```
yarn add styled-media-query
```

or with **npm**

```
npm install styled-media-query
```

_Note: If you didn't install `styled-components` yet, install it as well `yarn add styled-components`_

**If you use UglifyJS and it fails or you need compiled module, update to latest version please!**

# 🍃 Usage

First let me mention how our default breakpoint look like:

```javascript
{
  huge: '1440px',
  large: '1170px',
  medium: '768px',
  small: '450px',
}
```

The `media` has 3 main methods to generate media queries:

* [`lessThan(breakpoint | size)`](#lessthan)
* [`greaterThan(breakpoint | size)`](#greaterthan)
* [`between(firstBreakpoint | firstSize, lastBreakpoint | lastSize)`](#between)

## Basic Example

Probably this example will explain most of this library. You can use one of these methods to write different kinds of media queries like this:

```js
import styled from "styled-components"; // You need this as well
import media from "styled-media-query";

const Box = styled.div`
  background: black;

  ${media.lessThan("medium")`
    /* screen width is less than 768px (medium) */
    background: red;
  `}

  ${media.between("medium", "large")`
    /* screen width is between 768px (medium) and 1170px (large) */
    background: green;
  `}

  ${media.greaterThan("large")`
    /* screen width is greater than 1170px (large) */
    background: blue;
  `}
`;
```

The code above is the same as below in pure CSS:

```css
/* ↓↓↓↓↓↓↓↓↓ */

div {
  background: black;

  @media (max-width: 768px) {
    /* screen width is less than 768px (medium) */
    background: red;
  }

  @media (min-width: 768px) and (max-width: 1170px) {
    /* screen width is between 768px (medium) and 1170px (large) */
    background: green;
  }

  @media (min-width: 1170px) {
    /* screen width is greater than 1170px (large) */
    background: blue;
  }
}
```

_Note: You can use custom size instead of breakpoint names, too._

## `lessThan`

You can use this type of media query to add styles for screen sizes _less than_ given breakpoint or size.

Example with breakpoint:

```
media.lessThan('medium')`
  /* styles ... */
`
```

Example with custom size:

```
media.lessThan('768px')`
  /* styles ... */
`
```

_Note: You can use `rem` and `em` too. (Even you can convert breakpoints to use `em` or `rem` with [`pxToRem`](#pxToRem) and [`pxToEm`](#pxToEm) functions)_

## `greaterThan`

You can use it to add styles for screen sizes _greater than_ given breakpoint or size.

Example with breakpoint:

```
media.greaterThan('small')`
  /* styles ... */
`
```

Example with custom size:

```
media.greaterThan('450px')`
  /* styles ... */
`
```

## `between`

We use `between` to add styles for screen sizes _between_ the two given breakpoints or sizes.

Example with breakpoints:

```
media.between('small', 'medium')`
  /* styles ... */
`
```

Example with custom sizes:

```
media.between('450px', '768px')`
  /* styles ... */
`
```

## Use with custom breakpoints:

Our breakpoints may not fit your app, so we export another function called `generateMedia` to generate a `media` object with your own custom breakpoints:

```javascript
import styled from "styled-components"; // You need this as well
import { generateMedia } from "styled-media-query";

const customMedia = generateMedia({
  desktop: "78em",
  tablet: "60em",
  mobile: "46em"
});

// for example call it `Box`
const Box = styled.div`
  font-size: 20px;

  ${customMedia.lessThan("tablet")`
    /* for screen sizes less than 60em */
    font-size: 15px;
  `};
`;
```

In the case you needed the default breakpoints object, you can import it as follow:

```javascript
import { defaultBreakpoints } from "styled-media-query";
```

## 🐽 Concepts

There's a little to learn before you can read the API section.

### Breakpoints Object

It's an object containing each break point name as keys and the screen width as values. `styled-media-query` exports the `defaultBreakpoints` object.

### Media Generator Object

A `media generator object` is what is returned from [`generateMedia`](#generateMedia) function or the [default exported object](#default-media) from `styled-media-query`. Read API section for each method.

## 🌼 API

We have a very minimal API, probably you are familiar with 90% of it so far.

### Default `media`

A [`media generator object`](#media-generator-object) with default [`breakpoints object`](#breakpoints-object):

_Example:_

```javascript
import media from "styled-media-query";
```

### `generateMedia`

Generates custom [`media generator object`](#media-generator-object) with custom breakpoints:

```
generateMedia([breakpoints]);
```

* breakpoints: `Object` _default: `defaultBreakpoints`_ - a [`breakpoints object`](#breakpoints-object)

_Example:_

```javascript
import { generateMedia } from "styled-media-query";

const media = generateMedia({
  xs: "250px",
  sm: "450px",
  md: "768px",
  lg: "1200px"
});
```

### `pxToRem`

Converts [`breakpoints object`](#breakpoints-object)'s units from `px` to `rem` based on the `ratio` of `px` to `1rem`.

_parameters:_

* breakpoints: `Object` - a [`breakpoints object`](#breakpoints-object)
* ratio: `number` _default: `16`_ - how many `px` is equal to `1rem`? (It's your root `font-size`)

_Example:_

```javascript
import { pxToRem } from "styled-media-query";

const breakpointsInRem = pxToRem(
  {
    small: "250px",
    medium: "768px",
    large: "1200px"
  },
  10
);

/* ↓↓ returns ↓↓
{
  small: '25rem',
  medium: '76.8rem',
  large: '120rem',
}
*/
```

### `pxToEm`

Similar to [`pxToRem`](#pxToRem). Converts [`breakpoints object`](#breakpoints-object)'s units from `px` to `em` based on the `ratio` of `px` to `1em`.

_parameters:_

* breakpoints: `Object` - a **`breakpoints object`**
* ratio: `number` _default: `16`_ - how many `px` is equal to `1em`? (Probably it's your root `font-size`)

_Example:_
Similar to [`pxToRem`](#pxToRem).

## ⚙️ Troubleshoot

If you use UglifyJS and it fails or you need compiled module you need to update your module to v2 right now to fix the issue:

```
npm install styled-media-query@latest
```

## 🐿 Contributions

I'd love to contribute in open source projects, and love to see people contribute. So **any kind** of contributions (bug reports, suggestions, PRs, issues, etc) are super welcome.

## 🍿 TODO

* [x] Add convertors for `em` and `rem` to `px` and vice-versa.
* [x] Add `between()` method
* [x] Add LICENSE
* [ ] Write tests with Jest
* [ ] Ability to specify custom media attributes
* [ ] Add support for [glamorous](https://github.com/paypal/glamorous)
* [ ] ... _You say?_

# License

Licensed under the MIT License, Copyright © 2017 [Mohammad Rajabifard](https://github.com/morajabi).

See [LICENSE](https://github.com/morajabi/styled-media-query/blob/master/LICENSE) for more information.
