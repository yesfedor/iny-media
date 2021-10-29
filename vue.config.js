process.env.VUE_APP_CONFIG = JSON.stringify({
  ...require('./app.config.json'),
  ...require('./app.config.local.json')
})

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@intlify/vue-i18n-loader')
      .end()
  }
}
