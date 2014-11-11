jest.autoMockOff();

var {builder} = require('../ledNumbers');

describe('keyMirror', () => {
  it('receive at least one arg, at most 2', () => {
    expect(() => {builder();}).toThrow();
    expect(() => {builder('1'); }).not.toThrow();
    expect(() => {builder('1', '2'); }).not.toThrow();
  });

  it('should throw if concat of both not in range [-9, 99]', () => {
    expect(() => {builder('3123');}).toThrow();
    expect(() => {builder('-11');}).toThrow();
    expect(() => {builder('0', '10');}).toThrow();
    expect(() => {builder('9', '0');}).not.toThrow();
  });

  it('should replicate same number', () => {
    var actual = builder('1', '1');
    var expected = [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,1,0,0,0,0,1,0,0],
      [0,0,1,0,0,0,0,1,0,0],
      [0,0,1,0,0,0,0,1,0,0],
      [0,0,1,0,0,0,0,1,0,0],
      [0,0,1,0,0,0,0,1,0,0],
      [0,0,1,0,0,0,0,1,0,0],
      [0,0,1,0,0,0,0,1,0,0],
      [0,0,1,0,0,0,0,1,0,0],
      [0,0,0,0,0,0,0,0,0,0],
    ];

    expect(actual).toEqual(expected);
  });

  it('should concat different number', () => {
    var actual = builder('1', '2');
    var expected = [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,1,0,0,0,1,1,1,0],
      [0,0,1,0,0,0,0,0,1,0],
      [0,0,1,0,0,0,0,0,1,0],
      [0,0,1,0,0,0,0,1,1,0],
      [0,0,1,0,0,0,1,1,0,0],
      [0,0,1,0,0,0,1,0,0,0],
      [0,0,1,0,0,0,1,0,0,0],
      [0,0,1,0,0,0,1,1,1,0],
      [0,0,0,0,0,0,0,0,0,0],
    ];

    expect(actual).toEqual(expected);
  });
});
