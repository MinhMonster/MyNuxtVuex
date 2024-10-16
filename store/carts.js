import { getField, updateField } from "vuex-map-fields";

const SET_STATE = "SET_STATE";
const SET_QUERY = "SET_QUERY";
const SET_CART = "SET_CART";


export default {
  namespaced: true,
  state: () => ({
    carts: [],
    isSkeleton: true,
    pageSave: 1,
    query: {
      page: 1,
      perPage: 10
    }
  }),

  mutations: {
    updateField,
    SET_CART(state, { index, value }) {
        const carts = _.cloneDeep(state.carts);
        carts[index] = _.cloneDeep(value);
        state.carts = carts;
    },
    SET_STATE(state, payload) {
      _.each(payload, (value, key) => {
        state[key] = value;
      });
    },
    SET_QUERY(state, payload) {
      state.query = {
        ...state.query,
        ..._.cloneDeep(payload),
      };
    },
    ADD_TO_CART(state, product) {
      const cart = state.carts.filter((cart, index) => {
        return product.link == cart.link;
      });
      if (_.isEmpty(cart)) {
        product.total = 1;
        state.carts.push(product);
      }
      console.log("cart", cart, state.carts);

    },
    INCREASE_CART(state, index) {
      console.log("ok");
      if (state.carts[index].total < state.carts[index].quantity) {
        state.carts[index].total++;
      }
    },
    REDUCE_CART(state, index) {
      if (state.carts[index].total > 1) {
        state.carts[index].total--;
      }
    },
    DELETE_CART(state, index) {
      console.log("in", index);
      state.carts.splice(index, 1);
    },
  },
  getters: {
    getField,
    getCart: (state) => (index) => {
      return (state.carts[index]);
    },
    getTotal:(state) => (index) => {
      return (state.carts[index].total);
    },
  },
  actions: {
    setCart({ dispatch, commit }, payload) {
      console.log(payload);
      commit(SET_CART, payload);
      // sumCashRevenues
    },
    async addToCart({ commit, state }, product) {
      commit('ADD_TO_CART', product);
    },
    increaseCart({ commit }, index) {
      commit('INCREASE_CART', index);
    },
    reduceCart({ commit }, index) {
      commit('REDUCE_CART', index);
    },
    deleteCart({ commit }, index) {
      commit('DELETE_CART', index);
    },
    setCarts({ commit }, carts) {
      console.log("carts", carts);
      commit('SET_STATE', { carts: carts })
    },
    setSkeleton({ commit, state }, payload) {
      commit(SET_STATE, { isSkeleton: payload });
    },
    setQuery({ commit, state }, payload) {
      commit(SET_QUERY, payload);
      commit(SET_STATE, { pageSave: state.query.page });
    },
    resetQuery({ commit }) {
      commit(SET_QUERY, {
        page: 1,
        perPage: 24,
        q: {},
      });
    },

  }
}

