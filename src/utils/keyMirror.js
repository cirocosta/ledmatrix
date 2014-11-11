/**
 * A somewhat enhance form of keyMirror. Given
 * an object with falsy or truthy key values,
 * assigns a 'NAMESPACE_KEY' value to a given
 * key if falsy.
 *
 * Eg: keyMirror({A:false}, 'HEY') --> {A: KEY_A}
 */

module.exports = (namespace, obj) => {
  var ret = {};
  var useNamespace = toString.call(namespace) === '[object String]' ?
    true :
    (obj = namespace, false);

  for (var key in obj) {
    if (!obj.hasOwnProperty(key))
      continue;

    if (useNamespace)
      ret[key] = !obj[key] ? namespace + '_' + key : obj[key];
    else
      ret[key] = !obj[key] ? key : obj[key];
  }

  return ret;
};
