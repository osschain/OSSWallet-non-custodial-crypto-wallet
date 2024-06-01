const { getDefaultConfig } = require('expo/metro-config');
const nodeLibs = require('node-libs-react-native');

// eslint-disable-next-line no-undef
const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.extraNodeModules = {
    ...defaultConfig.resolver.extraNodeModules,
    ...nodeLibs
};

module.exports = defaultConfig;
