import colors from 'vuetify/es5/util/colors'
import webpack from "webpack";


export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - DST',
    title: 'DST',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "@/plugins/vuex-persistedstate", ssr: false },
    "@/plugins/axios",

    // "~/plugins/axios",
    // "~/plugins/vee-validate",  
    // { src: "@/plugins/vee-validate", ssr: false },
    // "~/apis/modules/admin",


  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/axios',

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'cookie-universal-nuxt',
    // With options
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
    
    // 'vuex-persistedstate'
    '@nuxtjs/dotenv',
    "vue2-editor/nuxt",
    "nuxt-sweetalert2",
    "@nuxtjs/toast",
    // 'nuxt-validate'
     
  ],

  nuxtValidate: {
    lang: 'es',
    nuxti18n: {
      locale: {
        'zh-CN': 'zh_CN'
      }
    }
  },
  // @nuxtjs/toast configurations
  toast: {
    position: "top-right",
    duration: 3000, // ms
    theme: "bubble",
    iconPack: "material",
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // transpile: ["vee-validate/dist/rules"],
    
    plugins: [
      new webpack.ProvidePlugin({
        _: "lodash",
      }),
    ],
    // extend(config, ctx) {},

  }
}
