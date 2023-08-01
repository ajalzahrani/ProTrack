import {describe, expect, test} from '@jest/globals';

import {generateNums} from 'src/components/screen/settings/SettingsScreen';

// write test for generateNums
describe('generateNums', () => {
  test('should generate array of numbers', () => {
    const min = 0;
    const max = 10;
    const adder = 1;
    const expected = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const actual = generateNums(min, max, adder);
    expect(actual).toEqual(expected);
  });
  test('should generate array of numbers with adder', () => {
    const min = 0;
    const max = 10;
    const adder = 2;
    const expected = ['0', '2', '4', '6', '8', '10'];
    const actual = generateNums(min, max, adder);
    expect(actual).toEqual(expected);
  });
  test('should generate array of numbers with adder', () => {
    const min = 0;
    const max = 10;
    const adder = 3;
    const expected = ['0', '3', '6', '9'];
    const actual = generateNums(min, max, adder);
    expect(actual).toEqual(expected);
  });
  test('should generate array of numbers with adder', () => {
    const min = 0;
    const max = 10;
    const adder = 4;
    const expected = ['0', '4', '8'];
    const actual = generateNums(min, max, adder);
    expect(actual).toEqual(expected);
  });
  test('should generate array of numbers with adder', () => {
    const min = 0;
    const max = 10;
    const adder = 5;
    const expected = ['0', '5', '10'];
    const actual = generateNums(min, max, adder);
    expect(actual).toEqual(expected);
  });
  test('should generate array of numbers with adder', () => {
    const min = 0;
    const max = 10;
    const adder = 6;
    const expected = ['0', '6'];
    const actual = generateNums(min, max, adder);
    expect(actual).toEqual(expected);
  });
  test('should generate array of numbers with adder', () => {
    const min = 0;
    const max = 10;
    const adder = 1;
  });
});
