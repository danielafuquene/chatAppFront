const path = require('path');
const reactNativeCssBabel = require('react-native-css/babel');

const createReactNativeCssPreset =
  reactNativeCssBabel.default ?? reactNativeCssBabel;
const importPlugin = createReactNativeCssPreset().plugins[0];

const reactNativeWebSegment = `${path.sep}react-native-web${path.sep}`;

function isReactNativeWebFile(filename) {
  return (
    typeof filename === 'string' && filename.includes(reactNativeWebSegment)
  );
}

// NativeWind rewrites imports inside react-native-web and that package then
// imports itself again. Leave those internal files untouched.
function skipReactNativeWebInternals(plugin) {
  return function nativewindImportPlugin(api) {
    const instance = plugin(api);
    const visitImport = instance.visitor.ImportDeclaration;
    const visitVariable = instance.visitor.VariableDeclaration;

    instance.visitor.ImportDeclaration = function (nodePath, state) {
      if (isReactNativeWebFile(state.filename)) {
        return;
      }
      return visitImport.call(this, nodePath, state);
    };

    instance.visitor.VariableDeclaration = function (nodePath, state) {
      if (isReactNativeWebFile(state.filename)) {
        return;
      }
      return visitVariable.call(this, nodePath, state);
    };

    return instance;
  };
}

module.exports = function nativewindPreset() {
  return {
    plugins: [skipReactNativeWebInternals(importPlugin)],
  };
};
