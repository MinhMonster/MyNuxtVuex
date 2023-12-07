import _ from "lodash";
const SET_STATE = "SET_STATE";

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
      }
    },
    actions: {
      ...store.actions,
      resetData({ commit }, stateName) {
        commit("RESET_STATE", stateName)
      },
      resetDataPage({ commit }, stateName) {
        commit("RESET_DATA_PAGE_STATE", stateName)
      },
      setQuery({ commit, state }, params = { stateName, data }) {
        commit("SET_STATE", { stateName: params.stateName, data: params.data })
      },
      setQueryPage({ commit }, payload) {
        commit("SET_PAGE", payload);
      },
      setState({ commit, state }, params = { stateName, data, query }) {
        commit("SET_STATE", { stateName: params.stateName, data: params.data, query: params.query })
      },
      convertDataSend({ state }, stateName) {
        const dataOrigin = _.cloneDeep(state[stateName] ?? [])
        const dataDefault = _.get(state, 'stateDefault.' + stateName, {})
        const dataSearch = {}
        const dataRoute = {}
        for (const dataKey in dataOrigin) {
          if (dataOrigin[dataKey]) {
            const value = dataOrigin[dataKey].value
            const valueEncode = dataOrigin[dataKey].value
            if (valueEncode) {
              dataSearch[dataKey] = valueEncode
            }
            if (!_.isEqual(value, dataDefault[dataKey].value)) {
              dataRoute[dataKey] = valueEncode
            }
          };
        }
        return Promise.resolve({ dataSearch, dataOrigin, dataRoute })
      },
      passDataFromQuery({ commit, state }, params = { stateName: "", query: [] }) {
        const cloneState = _.cloneDeep(state[params.stateName])
        for (const routeKey in params.query) {
          if (routeKey in state.stateDefault[params.stateName]) {
            cloneState[routeKey].value = _.get(params, `query.${routeKey}`)
          }
        }
        commit(SET_STATE, { stateName: params.stateName, data: cloneState })
      },
    },

    mutations: {
      ...store.mutations,
      // $reset: () => { },
      SET_STATE(state, payload = { stateName: "", data: "", query: {} }) {
        state[payload.stateName] = payload.data
        if ('query' in payload) {
          this.$router.push({ query: payload.query })
        }
      },
      RESET_STATE: (state, payload) => {
        state[payload] = _.cloneDeep(_.get(state, 'stateDefault.' + payload))

        const dataRoute = {}
        for (const dataKey in state[payload]) {
          const value = state[payload][dataKey].value
          const valueEncode = state[payload][dataKey].value
          if (!_.isEqual(value, state[payload][dataKey].value) || state[payload][dataKey].defaultParam) {
            dataRoute[dataKey] = valueEncode
          }
        }
      },
      RESET_DATA_PAGE_STATE: (state, payload) => {
        const valueDefault = _.cloneDeep(_.get(state, 'stateDefault.' + payload))
        state[payload].page = valueDefault.page
      },
      SET_PAGE(state, params = { stateName, data }) {
        state[params.stateName].page.value = params.data
      },
    },
  };
};