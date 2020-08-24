import { defaultBreakpoints } from '../src/index';
import { pxToEm, pxToRem } from '../src/convertors';

export const itBreakPoints = {
  huge: '1440',
  large: '1170',
  medium: '768',
  small: '450',
};

describe(`pxToEm()`, () => {
  it('pxToEm to equal defaultBreakpoints converted to em', () => {
    expect(pxToEm(defaultBreakpoints, 16)).toEqual({
      huge: '90em',
      large: '73.125em',
      medium: '48em',
      small: '28.125em',
    });
  });

  it('pxToEm without ratio to equal defaultBreakpoints converted to em', () => {
    expect(pxToEm(defaultBreakpoints)).toEqual({
      huge: '90em',
      large: '73.125em',
      medium: '48em',
      small: '28.125em',
    });
  });

  it('pxToEm itBreakPoints to equal itBreakPoints', () => {
    expect(pxToEm(itBreakPoints, 16)).toEqual(itBreakPoints);
  });

  it('pxToEm with integer to match empty Object', () => {
    expect(pxToRem(16, 16)).toMatchObject({});
  });
});

describe(`pxToEm()`, () => {
  it('pxToRem to equal defaultBreakpoints converted to rem', () => {
    expect(pxToRem(defaultBreakpoints, 16)).toEqual({
      huge: '90rem',
      large: '73.125rem',
      medium: '48rem',
      small: '28.125rem',
    });
  });

  it('pxToRem without ratio to equal defaultBreakpoints converted to rem', () => {
    expect(pxToRem(defaultBreakpoints)).toEqual({
      huge: '90rem',
      large: '73.125rem',
      medium: '48rem',
      small: '28.125rem',
    });
  });

  it('pxToRem itBreakPoints to equal itBreakPoints', () => {
    expect(pxToRem(itBreakPoints, 16)).toEqual(itBreakPoints);
  });

  it('pxToRem {} to equal {}', () => {
    expect(pxToRem({}, 16)).toEqual({});
  });
});
