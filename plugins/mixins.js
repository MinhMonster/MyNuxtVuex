import Vue from 'vue';
import globalMixins from '~/mixins/index.js'
import globalMixinSwal from '~/mixins/swal.js'
import utilMixin from '~/mixins/util.js'

Vue.mixin(globalMixins)
Vue.mixin(globalMixinSwal)
Vue.mixin(utilMixin)
