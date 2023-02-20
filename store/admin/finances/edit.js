import { getField, updateField } from "vuex-map-fields";

const SET_FINANCE = "SET_FINANCE";
const SET_FINANCE_MONTH = "SET_FINANCE_MONTH";


const ADD_ACTION = "ADD_ACTION";
const REMOVE_ACTION = "REMOVE_ACTION";
const UPDATE_ACTION = "UPDATE_ACTION";
const ADD_ACTION_INDEX = "ADD_ACTION_INDEX";


const UPDATE_REVENUES = "UPDATE_REVENUES";
const UPDATE_EXPENSES = "UPDATE_EXPENSES";

const UPDATE_SUM_CASH_REVENUES = "UPDATE_SUM_CASH_REVENUES";
const UPDATE_SUM_CASH_EXPENSES = "UPDATE_SUM_CASH_EXPENSES";
const UPDATE_INCOME = "UPDATE_INCOME";


export default {
  namespaced: true,
  state: () => ({
    finances_scroll: [],
    datas: [],
    finances: [],
    finance: {},
    financeMonth: [],
    finance_view: {},
    finance_edit: null,
    options: {},
    actions: [],
    expenses: [],
    revenues: [],
    sumCashRevenues: 0,
    sumCashExpenses: 0,
    income: 0,
    // listday:[],
    preDay: null,
    nextDay: null,
    preMonth: null,
    nexMonth: null,
  }),

  getters: {
    getField,

    getAction: (state) => ({ index, type }) => {
      if (type == 'revenue') {
        return (
          state.revenues[index]
        );
      } else if (type == 'expense') {
        return (
          state.expenses[index]
        );
      }
    },
  },

  mutations: {
    updateField,

    SET_FINANCE(state, payload) {
      state.finance = _.cloneDeep(payload);
    },
    SET_FINANCE_MONTH(state, financeMonth) {
      state.financeMonth = _.cloneDeep(financeMonth);
    },

    SET_finances_scroll(state, finances_scroll) {
      state.finances.push(finances_scroll)
    },

    SET_finances(state, finances) {
      state.finances = finances
    },

    SET_finance(state, finance) {
      state.finance = finance
    },
    // SET_finance_month(state, payload) {
    //   state.finance_month = payload
    // },

    SET_finance_view(state, finance_view) {
      state.finance_view = finance_view
      if (finance_view.code) {
        state.actions = finance_view.code
      } else {
        state.actions = []
      }
    },

    SET_finance_edit(state, finance_edit) {
      state.finance_edit = finance_edit
      if (finance_edit.code) {
        state.actions = finance_edit.code
      } else {
        state.actions = []
      }
    },

    ADD_ACTION(state, type) {
      switch (type) {
        case "revenue":
          state.revenues.push({
            id: Math.random().toString(36).substr(2, 8),
            type: "revenue",
            type_cash: "",
            name: "",
            cash: "",
          });
          break;
        case "expense":
          state.expenses.push({
            id: Math.random().toString(36).substr(2, 8),
            type: "expense",
            type_cash: "",
            name: "",
            cash: "",
          });
          break;
      }
    },

    REMOVE_ACTION(state, { index, type }) {
      if (type == 'revenue') {
        state.revenues = state.revenues.filter((item, i) => i !== index);
      } else {
        state.expenses = state.expenses.filter((item, i) => i !== index);
      }
    },

    UPDATE_ACTION(state, { index, type, value }) {
      if (type === 'revenue') {
        const revenues = _.cloneDeep(state.revenues);
        revenues[index] = _.cloneDeep(value);
        state.revenues = revenues;
      } else if (type === 'expense') {
        const expenses = _.cloneDeep(state.expenses);
        expenses[index] = _.cloneDeep(value);
        state.expenses = expenses;
      }
    },

    UPDATE_REVENUES(state, payload) {
      state.revenues = payload;
    },

    UPDATE_EXPENSES(state, payload) {
      state.expenses = payload;
    },

    UPDATE_SUM_CASH_REVENUES(state, sumCashRevenues) {
      state.sumCashRevenues = sumCashRevenues;
    },

    UPDATE_SUM_CASH_EXPENSES(state, sumCashExpenses) {
      state.sumCashExpenses = sumCashExpenses;
    },

    UPDATE_INCOME(state, payload) {
      state.income = Number(payload.sumCashRevenues - payload.sumCashExpenses);
    },
    // UPDATE_LIST_DAY(state, payload) {
    //   state.listday = payload || [];
    // },
    UPDATE_PRE_DAY(state, payload) {
      state.preDay = payload || null
    },
    UPDATE_NEXT_DAY(state, payload) {
      state.nextDay = payload || null
    },
    UPDATE_PRE_MONTH(state, payload) {
      state.preMonth = payload || null
    },
    UPDATE_NEXT_MONTH(state, payload) {
      state.nextMonth = payload || null
    },
  },

  actions: {
    newFinance({ commit }, payload) {
      commit(SET_FINANCE, newFinance);
      commit(UPDATE_REVENUES, []);
      commit(UPDATE_EXPENSES, []);
      commit(UPDATE_SUM_CASH_REVENUES, 0);
      commit(UPDATE_SUM_CASH_EXPENSES, 0);
      commit(UPDATE_INCOME, {sumCashRevenues: 0, sumCashExpenses: 0});
    },
    async createFinance({ state }) {
      const data = _.cloneDeep(state.finance);
      data.expenses = JSON.stringify(state.expenses);
      data.revenues = JSON.stringify(state.revenues);
      data.sumCashRevenues = state.sumCashRevenues;
      data.sumCashExpenses = state.sumCashExpenses;
      data.income = state.income;
      try {
        return await this.$repositories.adminFinances.new_day(data)
      } catch (error) { }
    },
    async updateFinance({ state }){
      const data = _.cloneDeep(state.finance);
      data.expenses = JSON.stringify(state.expenses);
      data.revenues = JSON.stringify(state.revenues);
      data.sumCashRevenues = state.sumCashRevenues;
      data.sumCashExpenses = state.sumCashExpenses;
      data.income = state.income;

      try {
        return await this.$repositories.adminFinances.update_day(data)
      } catch (error) { }
    },
    setFinance({ commit }, payload) {
      commit(SET_FINANCE, payload);
    },
    setAction({ dispatch, commit }, payload) {
      commit(UPDATE_ACTION, payload);
      // sumCashRevenues
      dispatch("updateSumCash")
    },

    updateSumCash({ commit, state }) {
      let sumCashRevenues = 0;
      for (let i = 0; i < state.revenues.length; i++) {
        sumCashRevenues += Number(state.revenues[i].cash);
      }
      commit(UPDATE_SUM_CASH_REVENUES, sumCashRevenues);

      // sumCashExpenses
      let sumCashExpenses = 0;
      for (let i = 0; i < state.expenses.length; i++) {
        sumCashExpenses += Number(state.expenses[i].cash);
      }
      commit(UPDATE_SUM_CASH_EXPENSES, sumCashExpenses);
      commit(UPDATE_INCOME, { sumCashRevenues, sumCashExpenses });
    },

    async get_finances_scroll({ commit }, payload) {
      try {
        const res = await this.$repositories.adminFinances.scroll(payload)
        commit('SET_finances_scroll', res.data.finances_scroll)
      } catch (error) { }
    },

    async get_finances({ commit }) {
      try {
        const res = await this.$repositories.adminFinances.all()
        commit('SET_finances', res.data.finances)
      } catch (error) { }
    },

    async get_finance({ commit }, id) {
      try {
        const res = await this.$repositories.adminFinances.show(id)
        commit('SET_finance', res.data.finance)
      } catch (error) { }
    },

    async get_finance_view({ commit }, id) {
      try {
        const res = await this.$repositories.adminFinances.view(id)
        commit('SET_finance_view', res.data.finance_view)
        commit('SET_finance', res.data.finance)
      } catch (error) {

      }
    },
    async get_finance_day({ commit }, params) {
      try {
        const res = await this.$repositories.adminFinances.show_day(params)
        const finance = res.data.finance_day
        commit('SET_finance', res.data.finance_day || {})
        
        // commit('UPDATE_LIST_DAY', res.data.list || {})
        commit(UPDATE_REVENUES, res.data.finance_day.revenues || [])
        commit(UPDATE_EXPENSES, res.data.finance_day.expenses || [])
        commit(UPDATE_SUM_CASH_REVENUES, res.data.finance_day.sumCashRevenues || 0);
        commit(UPDATE_SUM_CASH_EXPENSES, res.data.finance_day.sumCashRevenues || 0);
        commit(UPDATE_INCOME, { sumCashRevenues: res.data.finance_day.sumCashRevenues, sumCashExpenses: res.data.finance_day.sumCashExpenses } || {});
        commit('UPDATE_NEXT_DAY', res.data.nextDay || null);
        commit('UPDATE_PRE_DAY', res.data.preDay || null)


      } catch (error) { }
    },
    async fetFinanceMonth({ commit }, payload) {
      try {
        const res = await this.$repositories.adminFinances.show_month(payload)
        commit(SET_FINANCE_MONTH, res.data.finance_month || [])
        commit('UPDATE_NEXT_MONTH', res.data.nextMonth || null);
        commit('UPDATE_PRE_MONTH', res.data.preMonth || null)
        
        // // commit('UPDATE_LIST_DAY', res.data.list || {})
        // commit(UPDATE_REVENUES, res.data.finance_day.revenues || [])
        // commit(UPDATE_EXPENSES, res.data.finance_day.expenses || [])
        // commit(UPDATE_SUM_CASH_REVENUES, res.data.finance_day.sumCashRevenues || 0);
        // commit(UPDATE_SUM_CASH_EXPENSES, res.data.finance_day.sumCashRevenues || 0);
        // commit(UPDATE_INCOME, { sumCashRevenues: res.data.finance_day.sumCashRevenues, sumCashExpenses: res.data.finance_day.sumCashExpenses } || {});
        // commit('UPDATE_NEXT_DAY', res.data.nextDay || null);
        // commit('UPDATE_PRE_DAY', res.data.preDay || null)


      } catch (error) { }
    },

    async change_positions({ commit }, payload) {
      try {
        const res = await this.$repositories.adminFinances.change_positions(payload)
      } catch (error) { }
    },

    addAction({ commit, state }, payload) {
      commit(ADD_ACTION, payload);
    },

    addActionIndex({ commit, state }, payload) {
      commit(ADD_ACTION_INDEX, payload);
    },

    removeAction({ commit, dispatch }, payload) {
      commit(REMOVE_ACTION, payload);
      dispatch("updateSumCash")
    },

  },
}

export const newFinance = {
  title: "",
  info: "",
  year: null,
  month: null,
  day: null,
  expenses: [],
  revenues: [],
  sumCashRevenues: 0,
  sumCashExpenses: 0,
  income: 0,
};
