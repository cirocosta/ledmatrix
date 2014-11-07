/**
 * A somewhat enhance form of keyMirror. Given
 * an object with falsy or truthy key values,
 * assigns a 'NAMESPACE_KEY' value to a given
 * key if falsy.
 *
 * Eg: keyMirror({A:false}, 'HEY') --> {A: KEY_A}
 */

module.exports = (obj, namespace) => {
  var ret = {};

  for (var key in obj) {
    if (!obj.hasOwnProperty(key))
      continue;

    ret[key] = !obj[key] ?
      namespace + '_' + key :
      obj[key];
  }

  return ret;
};
