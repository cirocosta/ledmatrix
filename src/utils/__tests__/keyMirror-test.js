jest.autoMockOff();

var keyMirror = require('../keyMirror');

describe('keyMirror', () => {
  it('use namespace and also mirror if false and namespace passed', () => {
    var obj = keyMirror('NAMESPACE', {CIRO: false});

    expect(obj).toEqual({CIRO: 'NAMESPACE_CIRO'});
  });

  it('use the field if not a falsy value passed', () => {
    var obj = keyMirror('NAMESPACE', {CIRO: 'HUE'});

    expect(obj).toEqual({CIRO: 'HUE'});
  });

  it('should mirror perfectly if no namespace', () => {
    var obj = keyMirror({CIRO: false});

    expect(obj).toEqual({CIRO: 'CIRO'});
  });
});
