import _ from "lodash";
const SET_STATE = "SET_STATE";

const cleanQuery = (query = {}) => {
  return Object.fromEntries(
    Object.entries(query).filter(([_, v]) =>
      v !== null && v !== undefined && v !== ""
    )
  );
};

export const enableResetStore = (store) => {
  return {
    ...store,
    // state: () => ({
    //   ...store.state,

    //   stateDefault: {
    //     ..._.cloneDeep(store.state)
    //   }
    // }),
    getters: {
      ...store.getters,
      dataFilter: (state) => (queryName) => {
        const stateFilter = state[queryName]
        const dataAccept = stateFilter.response
        return dataAccept ? dataAccept.data : []
      },
      metaFilter: (state) => (queryName) => {
        const stateFilter = state[queryName]
        const dataAccept = stateFilter.response
        return dataAccept ? dataAccept.meta : {}
      },
      getOptionText: () => (value, options = [], fallback = "") => {
        if (value === null || value === undefined) return fallback
        if (!Array.isArray(options)) return fallback

        const found = options.find(
          (o) => String(o.value) === String(value)
        )

        return found ? found.text : fallback
      },
      formatNumber: () => (number) => {
        if (number === null || number === undefined || number === '') return '0';

        return new Intl.NumberFormat('de-DE', {
          maximumFractionDigits: 0,
        }).format(Number(number));
      },

    },
    actions: {
      ...store.actions,
      clearResponse({ commit }, stateName) {
        commit('CLEAR_RESPONSE', stateName)
      },
      resetData({ commit }, stateName) {
        commit("RESET_STATE", stateName)
      },
      resetDataForm({ commit }, stateName) {
        commit("RESET_DATA_FORM", stateName)
      },
      resetDataPage({ commit }, stateName) {
        commit("RESET_DATA_PAGE_STATE", stateName)
      },
      setQuery({ commit, state }, params = { stateName, data }) {
        commit("SET_STATE", { stateName: params.stateName, data: params.data })
      },
      setParamQuery({ commit, state }, params = { stateName, query, data, silent }) {
        commit("SET_PARAM_QUERY", { stateName: params.stateName, query: params.query, data: params.data, silent: params.silent })
      },
      setParamDefault({ commit, state }, params = { query, data }) {
        commit("SET_PARAM_DEFAULT", { query: params.query, data: params.data })
      },

      // SET_PARAM_QUERY
      setQueryPage({ commit }, payload) {
        commit("SET_PAGE", payload);
      },
      setState({ commit, state }, params = { stateName, data, query }) {
        commit("SET_STATE", { stateName: params.stateName, data: params.data, query: params.query })
      },
      convertDataSend({ state }, stateName) {
        const dataOrigin = _.cloneDeep(state[stateName] ?? {})
        const dataDefault = _.get(state, 'stateDefault.' + stateName, {})
        const dataSearch = {}
        const dataRoute = {}

        for (const key in dataOrigin) {
          const item = dataOrigin[key]
          if (!item) continue

          const value = item.value
          const defaultValue = dataDefault?.[key]?.value

          // ===============================
          // 🔥 RANGE HANDLING
          // ===============================
          if (item.type === "range") {
            if (item.silent) continue;
            const min = value?.min ?? null
            const max = value?.max ?? null

            if (min !== null) dataSearch[`${key}_min`] = min
            if (max !== null) dataSearch[`${key}_max`] = max

            if (
              min !== defaultValue?.min ||
              max !== defaultValue?.max
            ) {
              if (min !== null) dataRoute[`${key}_min`] = min
              if (max !== null) dataRoute[`${key}_max`] = max
            }

            continue
          }

          // ===============================
          // 🔹 NORMAL FIELD
          // ===============================
          if (value !== null && value !== '' && value !== undefined) {
            dataSearch[key] = value
          }

          if (!item.silent && !_.isEqual(value, defaultValue)) {
            dataRoute[key] = value
          }
        }

        return Promise.resolve({
          dataSearch,
          dataOrigin,
          dataRoute: cleanQuery(dataRoute),
        })
      },

      passDataFromQuery({ commit, state }, params = { stateName: "", query: {} }) {
        const cloneState = _.cloneDeep(state[params.stateName])

        for (const key in cloneState) {
          const item = cloneState[key]
          if (!item) continue

          // ===============================
          // 🔥 RANGE FIELD
          // ===============================
          if (item.type === "range") {
            const min = params.query[`${key}_min`]
            const max = params.query[`${key}_max`]

            if (min != null || max != null) {
              item.value = {
                min: min != null ? Number(min) : null,
                max: max != null ? Number(max) : null,
              }

              // 🎯 tìm option khớp để auto select
              const matched = item.options?.find(opt =>
                opt.min == item.value.min &&
                opt.max == item.value.max
              )

              if (matched) {
                item.value = matched   // vì bạn đang dùng v-model="item.value"
              }
            }

            continue
          }

          // ===============================
          // 🔹 NORMAL FIELD
          // ===============================
          if (key in params.query) {
            item.value = params.query[key]
          }
        }

        commit(SET_STATE, {
          stateName: params.stateName,
          data: cloneState,
        })
      },
    },

    mutations: {
      ...store.mutations,
      SET_STATE(state, payload = { stateName: "", data: "", query: {} }) {
        state[payload.stateName] = payload.data
        if ('query' in payload && payload.query) {
          this.$router.push({ query: payload.query })
        }
      },
      RESET_STATE(state, payload) {
        // 1️⃣ Reset toàn bộ state theo stateDefault
        state[payload] = _.cloneDeep(
          _.get(state, 'stateDefault.' + payload, {})
        );

        // 2️⃣ Chuẩn hoá lại các field đặc biệt (range)
        for (const key in state[payload]) {
          const item = state[payload][key];
          if (!item) continue;

          // 🔥 RANGE FIELD (cash-range, level-range, ...)
          if (item.type && item.type.includes('range')) {
            item.selected = null;
            item.value = {
              min: null,
              max: null,
            };
          }
        }

        // 3️⃣ Clear route query (giữ behaviour cũ của bạn)
        const dataRoute = {};
        for (const key in state[payload]) {
          const item = state[payload][key];
          if (!item) continue;

          const value = item.value;
          const defaultValue = _.get(
            state,
            `stateDefault.${payload}.${key}.value`,
            null
          );

          if (
            !_.isEqual(value, defaultValue) ||
            item.defaultParam
          ) {
            dataRoute[key] = value;
          }
        }
      },
      CLEAR_RESPONSE: (state, payload) => {
        const valueDefault = _.cloneDeep(_.get(state, 'stateDefault.' + payload))
        state[payload].response = valueDefault.response;
      },
      RESET_DATA_FORM: (state, payload) => {
        state[payload] = _.cloneDeep(_.get(state, 'stateDefault.' + payload))
      },
      RESET_DATA_PAGE_STATE: (state, payload) => {
        const valueDefault = _.cloneDeep(_.get(state, 'stateDefault.' + payload))
        state[payload].page = valueDefault.page
      },
      SET_PAGE(state, params = { stateName, data }) {
        state[params.stateName].page.value = params.data
      },
      SET_PARAM_QUERY(
        state,
        params = { stateName, query, data, silent }
      ) {
        const item = state[params.stateName]?.[params.query];
        if (!item) return;

        item.value = params.data;

        // 🔥 silent chỉ áp dụng khi được truyền
        item.silent = !!params.silent;
      },
      SET_PARAM_DEFAULT(state, params = { query, data }) {
        state.paramDefaults[params.query] = params.data
      },

    },
  };
};
