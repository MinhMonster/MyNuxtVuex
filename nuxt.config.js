import colors from 'vuetify/es5/util/colors'
import webpack from "webpack";


export default {
  // target: 'static', // default is 'server'
  // mode: 'universal',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - MinhMonster',
    title: 'MinhMonster',
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
    "@/assets/styles/common.scss",
    "@/assets/styles/home/_ckeditor.scss",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "@/plugins/vuex-persistedstate", ssr: false },
    "@/plugins/axios",
    // "@/plugins/vue-sweetalert",

    '~/plugins/repositories.js',
    { src: "@/plugins/vue-infinite-scroll", ssr: false },
    { src: "@/plugins/vue-codemirror", ssr: false },

    // "~/plugins/axios",
    // "~/plugins/vee-validate",  
    // { src: "@/plugins/vee-validate", ssr: false },
    // "~/apis/modules/admin",


  ],
  axios: {
    baseURL: process.env.API_BASE_URL || 'https://quanlychiphidst.com'
  },
  env: {
    // nodeEnv: process.env.NODE_ENV || "development",
    apiUrl:
      process.env.API_BASE_URL ,
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/axios',
    "lodash",
    "@nuxt/content",

  ],
  content: {
    liveEdit: false,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "bootstrap-vue/nuxt",
    'cookie-universal-nuxt',
    // With options
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
    
    // 'vuex-persistedstate'
    '@nuxtjs/dotenv',
    "vue2-editor/nuxt",
    // "nuxt-sweetalert2",
    "@nuxtjs/toast",
    "vue-sweetalert2/nuxt"
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
  // toast: {
  //   position: 'top-center',
  //   register: [ // Register custom toasts
  //     {
  //       name: 'my-error',
  //       message: 'Oops...Something went wrong',
  //       options: {
  //         type: 'error'
  //       }
  //     }
  //   ]
  // },

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
    postcss: null,
    // transpile: ["vee-validate/dist/rules"],
    loaders: {
      vue: {
        prettify: false,
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        _: "lodash",
      }),
    ],
    // extend(config, ctx) {},

  },
  loading: "@/components/Loading.vue",

}
