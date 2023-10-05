import { defaultPagy } from '@/utils/admin/default'
import { enableResetStore } from '@/utils/admin/common'

import { getField, updateField } from "vuex-map-fields";

const SET_STATE = "SET_STATE";

const queryNinjas = _.cloneDeep({
  response: {
    meta: defaultPagy,
    data: []
  },
  page: {
    type: "text",
    show: false,
    value: 1
  },
  perPage: {
    type: "text",
    show: false,
    value: 15
  },
  id: {
    // title: "ID",
    placeholder: "ID",
    type: "text",
    show: true,
    value: ''
  },
  taikhoan: {
    // title: "Tài Khoản",
    placeholder: "Tài Khoản",
    type: "text",
    show: true,
    value: ''
  },
  ingame: {
    // title: "Tài Khoản",
    placeholder: "Nhân Vật",
    type: "text",
    show: true,
    value: ''
  },
  status: {
    // title: "Tài Khoản",
    placeholder: "Trạng Thái",
    type: "select-options",
    show: true,
    value: "yes",
    options: [
      {
        text: "Tất cả",
        value: null,
      },
      {
        text: "Đang bán",
        value: "yes",
      },
      {
        text: "Đã bán",
        value: "no",
      },
    ],
  },
});

export default enableResetStore({
  namespaced: true,
  state() {
    return {
      stateDefault: {
        queryNinjas: queryNinjas,
      },
      queryNinjas: queryNinjas,
      sumPriceNinjas: "",
      countNinjas: "",
      ninja: null,
    }

  },

  getters: {
    getField,

  },
  mutations: {
    updateField,
  },

  actions: {
    async fetchAccountNinjas({ commit, state, dispatch }) {
      try {
        const { dataSearch, dataOrigin, dataRoute } = await dispatch('convertDataSend', 'queryNinjas')
        const result = await this.$repositories.adminGameNinjas.fetchAccountNinjas({ input: dataSearch })

        dataOrigin.response.data = result.data.ninjas
        dataOrigin.response.meta = result.data.pagy

        commit(SET_STATE, {
          stateName: "sumPriceNinjas", data: result.data.sumPrice
        })
        commit(SET_STATE, {
          stateName: "countNinjas", data: result.data.count
        })
        commit(SET_STATE, {
          stateName: "queryNinjas", data: dataOrigin,
          query: dataRoute
        })

      } catch (error) { }
    },
    async fetchAccountNinja({ commit, dispatch }, payload) {
      try {
        const res = await this.$repositories.adminGameNinjas.fetchAccountNinja(payload)
        dispatch('setAccountNinja', res.data.acountNinja)
      } catch (error) { }
    },
    async createAccountNinja({ commit, state }) {
      const payload = _.omit(state.ninja, "ID");

      try {
        const res = await this.$repositories.adminGameNinjas.createAccountNinja({
          input: payload
        });
        return res
      } catch (error) { }
    },
    async updateAccountNinja({ commit, state, dispatch }, id) {
      try {
        const res = await this.$repositories.adminGameNinjas.updateAccountNinja({
          id,
          input: state.ninja
        });
        if (res.data.accountNinja) {
          dispatch('setAccountNinja', res.data.accountNinja)
        }
        return res
      } catch (error) { }
    },

    setAccountNinja({ commit }, payload) {
      commit(SET_STATE, {
        stateName: "ninja", data: payload
      });
    },
    newAccountNinja({ commit, dispatch }) {
      dispatch("setAccountNinja", {
        ID: "",
        taikhoan: "",
        ingame: "",
        level: "",
        vukhi: "",
        mcs: "",
        thongtin: "",
        loainick: 1,
        class: 1,
        server: 1,
        giatien: "",
        gianhap: "",
        sim: "",
        hinhanh: [],
        do: "",

        tl1: "",
        tl2: "",
        tl3: "",
        tl4: "",
        tl5: "",
        tl6: "",
        tl7: "",
        tl8: "",
        tl9: "",
        tl10: "",
        tl11: "",
        eye: "",
        clone: "",
        mounts: "",
        yen: "",
        book: "",
        cake: "",
        disguise: "",
      }
      );
    },
  },
});
