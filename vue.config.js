const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7000', // Your local API
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
})
