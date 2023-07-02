import { getField, updateField } from "vuex-map-fields";

const SET_STATE = "SET_STATE";
const SET_QUERY = "SET_QUERY";

export default {
  namespaced: true,
  state: () => ({
    avatars: [],
    sumPriceAvatars: "",
    countAvatars: "",
    avatar: {},
  }),

  getters: {
    getField,
  },

  mutations: {
    updateField,
    SET_QUERY(state, payload) {
      state.query = {
        ...state.query,
        ..._.cloneDeep(payload),
      };
    },
    SET_STATE(state, payload) {
      _.each(payload, (value, key) => {
        state[key] = value;
      });
    },
    SET_AVATARS(state, payload) {
      state.avatars = payload.avatars
      state.sumPriceAvatars = payload.sumPrice
      state.countAvatars = payload.count

    },

    SET_AVATAR(state, payload) {
      state.avatar = payload
    },

  },

  actions: {
    newAccountAvatar({ commit }) {
      commit(SET_STATE, { avatar: newAccountAvatar });
    },
    async fetchAccountAvatars({ commit, state }) {
      try {
        const res = await this.$repositories.adminGameAvatars.fetchAccountAvatars()
        commit('SET_AVATARS', res.data)
      } catch (error) { }
    },
    async fetchAccountAvatar({ commit }, payload) {
      try {
        const res = await this.$repositories.adminGameAvatars.fetchAccountAvatar(payload)
        commit('SET_AVATAR', res.data.acountAvatar)
      } catch (error) { }
    },
    async createAccountAvatar({ commit, state }) {
      const payload = _.omit(state.avatar, "ID");

      try {
        const res = await this.$repositories.adminGameAvatars.createAccountAvatar({
          input: payload
        });
        // commit('SET_AVATAR', res.data.accountAvatar)
        return res
      } catch (error) { }
    },
    async updateAccountAvatar({ commit, state }, id) {
      try {
        const res = await this.$repositories.adminGameAvatars.updateAccountAvatar({
          id,
          input: state.avatar
        });
        if (res.data.accountAvatar) {
          commit('SET_AVATAR', res.data.accountAvatar)
        }
        return res
      } catch (error) { }
    },

    setAccountAvatar({ commit }, payload) {
      commit('SET_AVATAR', payload);
    },

  },
}

export const newAccountAvatar = {
  ID: "",
  username: "",
  dat: "",
  ga: "",
  ca: "",
  mcs: "",
  thongtin: "",
  giatien: "",
  gianhap: "",
  sim: "",
  hinhanh: [],
};
