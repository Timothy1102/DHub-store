const {
  CracoAppLessPlugin,
  CracoCompatibility,
  CracoSilence,
} = require('@sentre/craco-plugins')

module.exports = {
  plugins: [
    {
      plugin: CracoAppLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: CracoCompatibility,
    },
    {
      plugin: CracoSilence,
    },
  ],
  webpack: {
    configure: webpackConfig => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
      );

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      return webpackConfig;
    }
  }
}
