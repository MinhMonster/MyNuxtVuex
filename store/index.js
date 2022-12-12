
import AdminAuth from "./admin/auth"


export default {
  state() {
    return {
      requests: [],
      test:""
    };
  },
  mutations: {
    setTest(state, value){
      state.test = value
    }
  },
  actions: {
    setTest({commit}, value){
      commit('setTest', value)
    }
  },

  modules: {
    ADAU: AdminAuth,
  },
  
};
