const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

const config = withNativewind(getDefaultConfig(__dirname), { inlineRem: 16 });
const nativewindResolveRequest = config.resolver.resolveRequest;
const reactNativeWebSegment = `${path.sep}react-native-web${path.sep}`;
const expoAssetSegment = `${path.sep}expo-asset${path.sep}`;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  const origin = context.originModulePath;
  if (typeof origin === "string" && origin.includes(reactNativeWebSegment)) {
    return context.resolveRequest(context, moduleName, platform);
  }

  if (
    moduleName === "react-native" &&
    typeof origin === "string" &&
    origin.includes(expoAssetSegment)
  ) {
    return context.resolveRequest(context, moduleName, platform);
  }

  return nativewindResolveRequest(context, moduleName, platform);
};

module.exports = config;
