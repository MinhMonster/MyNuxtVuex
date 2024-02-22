import colors from 'vuetify/es5/util/colors'
import webpack from "webpack";
import axios from "axios";


export default {
  // target: 'static', // default is 'server'
  // mode: 'universal',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'keywords', content: 'nick ninja, shop nick ninja, mua nick ninja, shop acc ninja, mua acc ninja, shop nick ninja, mua bán nick ninja, shop nick ninja không chiết khấu, acc ninja, mua ních ninja, bán nick ninja, shop ninja sv4, mua nick ninja trả góp, shop nick ninja giá rẻ, xu5sv, shop nick ninja sv world, nick avatar, nick dai tay du ' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      // {
      //   src: 'https://www.googletagmanager.com/gtag/js?id=G-EYXLZ4SE11',
      // },
      // {
      //   src: 'https://www.googleadservices.com/pagead/conversion.js',
      // },
    ],
  },
  mounted() {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'AW-11265837402');
    gtag('event', 'conversion', { 'send_to': 'AW-11265837402/7E7zCI2d4YYZENqS_Psp' });
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/css/mms-style.css",
    "@/assets/css/reset.css",
    "@/assets/styles/common.scss",
    // "@/assets/styles/home/_ckeditor.scss",
    "@/assets/styles/home/account.scss",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "@/plugins/vuex-persistedstate", ssr: false },
    "@/plugins/axios",
    // "@/plugins/vue-sweetalert",
    // '@/plugins/filters.js',
    '~/plugins/repositories.js',
    { src: "@/plugins/vue-slick-carousel" },
    { src: "@/plugins/vue-clipboard2", ssr: false },
    { src: "@/plugins/mixins", ssr: false },

  ],
  axios: {
    baseURL: process.env.API_BASE_URL || 'https://muabannick.pro'
  },
  env: {
    // nodeEnv: process.env.NODE_ENV || "development",
    apiUrl:
      process.env.API_BASE_URL,
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
    '@nuxtjs/google-analytics'

  ],
  googleAnalytics: {
    id: 'G-EYXLZ4SE11'
  },
  content: {
    liveEdit: false,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // "bootstrap-vue/nuxt",
    'cookie-universal-nuxt',
    // With options
    ['cookie-universal-nuxt', { alias: 'cookiz' }],

    // 'vuex-persistedstate'
    '@nuxtjs/dotenv',
    // "vue2-editor/nuxt",
    // "nuxt-sweetalert2",
    // "@nuxtjs/toast",
    "vue-sweetalert2/nuxt",
    // 'nuxt-validate'
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    hostname: 'https://muabannick.pro',
    // routes: async () => {
    //   const { data } = await axios.get('https://muabannick.pro/apis/sitemap/index.php');
    //   return data.sitemap.map((item) => `${item.link}`)
    // },
    sitemaps: [
      {
        path: '/sitemap.xml',
      },
      {
        path: '/sitemap/topics.xml',
        routes: async () => {
          const { data } = await axios.get('https://muabannick.pro/apis/sitemap/topics.php');
          return data.sitemap_topics.map((item) => `${item.link}`)
        },
      },
    ]
  },

  nuxtValidate: {
    lang: 'es',
    nuxti18n: {
      locale: {
        'zh-CN': 'zh_CN'
      }
    }
  },
  // @nuxtjs/toast configurations
  // toast: {
  //   position: "top-right",
  //   duration: 3000, // ms
  //   theme: "bubble",
  //   iconPack: "material",
  // },
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
  // loading: "@/components/Loading.vue",

}
