
import AdminAuth from "./admin/auth"
import AdminTopics from "./admin/topics"
import AdminDeverlopers from "./admin/deverlopers"




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
    ADTP: AdminTopics,
    ADDV: AdminDeverlopers
  },
  
};
