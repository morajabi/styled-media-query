import 'jest-styled-components';
import { generateMedia, defaultBreakpoints } from '../src/index';
import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import { css } from 'styled-components';

const generatedDefaultMedia = generateMedia(defaultBreakpoints);

const Box = styled.div`
  background: black;

  ${generatedDefaultMedia.lessThan('medium')`
    background: red;
  `}

  ${generatedDefaultMedia.between('medium', 'large')`
    /* screen width is between 768px (medium) and 1170px (large) */
    background: green;
  `}

  ${generatedDefaultMedia.greaterThan('large')`
    /* screen width is greater than 1170px (large) */
    background: blue;
  `}
  
  ${generatedDefaultMedia.to.large`
    background: white;
  `}
  
  ${generatedDefaultMedia.from.small`
    background: yellow;
  `}
`;

describe(`generatedDefaultMedia()`, () => {
  it('expect <Box /> to have matching media style rules', () => {
    let tree = renderer.create(<Box/>).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('background', 'red', {
      media: '(max-width:768px)',
    });
    expect(tree).toHaveStyleRule('background', 'green', {
      media: '(min-width:768px) and (max-width:1170px)',
    });
    expect(tree).toHaveStyleRule('background', 'blue', {
      media: '(min-width:1170px)',
    });
    expect(tree).toHaveStyleRule('background', 'white', {
      media: '(max-width:1170px)',
    });
    expect(tree).toHaveStyleRule('background', 'yellow', {
      media: '(min-width:450px)',
    });
  });
});

describe(`lessThan()`, () => {
  it('expect lessThan("medium") to create Array', () => {
    let tree = renderer
        .create(
            css`
        ${generatedDefaultMedia.lessThan('medium')`
    background: red
  `}
      `
        )
        .toJSON();
    let itArray = [
      '\n    @media (max-width: ',
      '768px',
      ') {\n      ',
      '\n    background: red\n  ',
      '\n    }\n  ',
    ];
    expect(tree).toEqual(expect.arrayContaining(itArray));
  });
});

describe(`between()`, () => {
  it('expect between("medium", "large") to create Array', () => {
    let tree = renderer
        .create(
            css`
        ${generatedDefaultMedia.between('medium', 'large')`
    background: green;
  `}
      `
        )
        .toJSON();
    let itArray = [
      '\n    @media (min-width: ',
      '768px',
      ') and\n      (max-width: ',
      '1170px',
      ') {\n      ',
      '\n    background: green;\n  ',
      '\n    }\n  ',
    ];
    expect(tree).toEqual(expect.arrayContaining(itArray));
  });
});

describe(`greaterThan()`, () => {
  it('expect greaterThan("large") to create Array', () => {
    let tree = renderer
        .create(
            css`
        ${generatedDefaultMedia.greaterThan('large')`
    background: blue;
  `}
      `
        )
        .toJSON();
    let itArray = [
      '\n    @media (min-width: ',
      '1170px',
      ') {\n      ',
      '\n    background: blue;\n  ',
      '\n    }\n  ',
    ];
    expect(tree).toEqual(expect.arrayContaining(itArray));
  });

  it('expect greaterThan(320) to create Array', () => {
    let tree = renderer
        .create(
            css`
        ${generatedDefaultMedia.greaterThan('320')`
    background: blue;
  `}
      `
        )
        .toJSON();
    let itArray = [
      '\n    @media (min-width: ',
      '320',
      ') {\n      ',
      '\n    background: blue;\n  ',
      '\n    }\n  ',
    ];
    expect(tree).toEqual(expect.arrayContaining(itArray));
  });

  it('expect greaterThan() to create Array', () => {
    let tree = renderer
        .create(
            css`
        ${generatedDefaultMedia.greaterThan('')`
    background: blue;
  `}
      `
        )
        .toJSON();
    let itArray = [
      '\n    @media (min-width: ',
      '0',
      ') {\n      ',
      '\n    background: blue;\n  ',
      '\n    }\n  ',
    ];
    expect(tree).toEqual(expect.arrayContaining(itArray));
  });
});

describe(`defaultBreakpoints`, () => {
  it('expect defaultBreakpoints to equal sizes', () => {
    expect(defaultBreakpoints.small).toEqual('450px');
    expect(defaultBreakpoints.medium).toEqual('768px');
    expect(defaultBreakpoints.large).toEqual('1170px');
    expect(defaultBreakpoints.huge).toEqual('1440px');
  });
});
