// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('cjs');
// /** @type {import('expo/metro-config').MetroConfig} */

module.exports = config;
