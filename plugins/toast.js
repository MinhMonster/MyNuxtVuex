import Vue from 'vue'
import Toasted from '@nuxtjs/toast'

Vue.use(Toasted)


  globals.forEach(global => {
    Vue.toasted.register(global.name, global.message, global.options)
  })

export default function (ctx, inject) {
  inject('toast', Vue.toasted)
}