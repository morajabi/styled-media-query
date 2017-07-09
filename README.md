# 💅💍 styled-media-query
Beautiful media queries better than CSS @media for [styled-components](https://github.com/styled-components/styled-components) with ability to specify custom breakpoints.

Features:
- Custom breakpoints
- Custom size units (px, em, rem)
- Awesome syntax for min-width and max-width for each breakpoint
- Familiar syntax as it uses Tagged Template Literals just like styled-components does

# Start
- [Installation](#installation)
- [Usage](#usage)
- [Tagged Template Literals explained](https://www.styled-components.com/docs/advanced#tagged-template-literals)

# 🌱 Installation
You can install it like every other library with awesome **yarn**:
```
yarn add styled-media-query 
```
or with **npm** (as npm@5 you don't need `--save`):
```
npm install --save styled-media-query 
```

*Note: If you didn't install `styled-components` yet, install it as well `yarn add styled-components`*

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

## Use with default breakpoints:
The simplest way to use `styled-media-query` is as follow (We'll explain below):
```javascript
import styled from 'styled-components'; // You need this as well
import media from 'styled-media-query';

// for example call it `Box`
const Box = styled.div`
  ${media.to.medium`
    font-size: 10px;
  `}

  font-size: 15px;

  ${media.from.large`
    font-size: 20px;
  `}
`;
```
In the above example we are using the default breakpoints. We have three possibilities here:
1. screen width is **between `medium` to `large`** which in this situation `font-size` is `10px`.

2.  screen width is **0 to `medium`** which in this situation `font-size` is `15px`. 

3.  screen width is **from‍ `large` to `∞`** which in this situation `font-size` is `20px`. 


## Use with custom breakpoints:
Our breakpoints may not fit your app, so we export another function called `generateMedia` to generate a `media` object with your custom breakpoints:
```javascript
import styled from 'styled-components'; // You need this as well
import { generateMedia } from 'styled-media-query';

const customMedia = generateMedia({
  desktop: '78em',
  tablet: '60em',
  mobile: '46em',
});

// for example call it `Box`
const Box = styled.div`
  font-size: 20px;

  ${media.to.tablet`
    font-size: 15px;
  `}

  ${media.to.mobile`
    font-size: 10px;
  `}
`;
```

In the case you needed the default breakpoints object, you can import it as follow:
```javascript
import { defaultBreakpoints } from 'styled-media-query';
```

## 🐿 Contributions
I'd love to contribute in open source projects, and love to see people contribute. So **any kind** of contributions (bug reports, suggestions, PRs, issues, etc) are super welcome. 

## 🍿 TODO
- Add `between.[breakpoint].and.[breakpoint]` method
- Add convertors for `em` and `rem` to `px` and vice-versa.
- ... *You say?*


# License
Licensed under the MIT License, Copyright © 2017 [Mohammad Rajabifard](https://github.com/morajabi).

See [LICENSE](https://github.com/morajabi/styled-media-query/blob/master/LICENSE) for more information.

