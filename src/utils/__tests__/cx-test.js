jest.autoMockOff();

var cx = require('../cx');

describe('cx', () => {
  it('should construct the string accordingly', () => {
    var str = cx({ciro: true, costa: false});

    expect(str).toEqual('ciro');
  });

  it('return empty string if only falsy fields', () => {
    var str = cx({ciro: false, costa: false});

    expect(str).toEqual('');
  });
});
