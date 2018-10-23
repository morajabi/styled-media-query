import { defaultBreakpoints, generateMedia } from '../src/index'
import { pxToEm, pxToRem } from '../src/convertors'

export const testBreakPoints = {
  huge: '1440',
  large: '1170',
  medium: '768',
  small: '450',
};



test('pxToEm to equal defaultBreakpoints converted to em', () => {
  expect(pxToEm(defaultBreakpoints, 16)).toEqual({
    huge: '90em',
    large: '73.125em',
    medium: '48em',
    small: '28.125em'
  });
});



test('pxToEm without ratio to equal defaultBreakpoints converted to em', () => {
  expect(pxToEm(defaultBreakpoints)).toEqual({
    huge: '90em',
    large: '73.125em',
    medium: '48em',
    small: '28.125em'
  });
});



test('pxToEm testBreakPoints to equal testBreakPoints', () => {
  expect(pxToEm(testBreakPoints, 16)).toEqual(testBreakPoints);
});



test('pxToRem to equal defaultBreakpoints converted to rem', () => {
  expect(pxToRem(defaultBreakpoints, 16)).toEqual({
    huge: '90rem',
    large: '73.125rem',
    medium: '48rem',
    small: '28.125rem'
  });
});



test('pxToRem without ratio to equal defaultBreakpoints converted to rem', () => {
  expect(pxToRem(defaultBreakpoints)).toEqual({
    huge: '90rem',
    large: '73.125rem',
    medium: '48rem',
    small: '28.125rem'
  });
});



test('pxToRem testBreakPoints to equal testBreakPoints', () => {
  expect(pxToRem(testBreakPoints, 16)).toEqual(testBreakPoints);
});



test('pxToRem {} to equal {}', () => {
  expect(pxToRem({}, 16)).toEqual({});
});



test('pxToEm with integer to match empty Object', () => {
  expect(pxToRem(16, 16)).toMatchObject({});
});