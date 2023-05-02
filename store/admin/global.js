import moment from "moment";
import { getField, updateField } from "vuex-map-fields";
// import * as authQL from "@/graphql/console/auth/index";

const AUTH_SUCCESS = "AUTH_SUCCESS";
const AGENCY_AUTH_SUCCESS = "AGENCY_AUTH_SUCCESS";
const AUTH_ERROR = "AUTH_ERROR";
const AUTH_LOGOUT = "AUTH_LOGOUT";
const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
const TOGGLE_CUSTOMER_DETAILS = "TOGGLE_CUSTOMER_DETAILS";
const FETCH_LOCALES_MASTER_DATA = "FETCH_LOCALES_MASTER_DATA";
const UPDATE_BREADCRUMB = "UPDATE_BREADCRUMB";
const SET_VALIDATION_ERRORS = "SET_VALIDATION_ERRORS";
const SET_PREFECTURES = "SET_PREFECTURES";
const SET_ORDER_COMPLETED_STATES = "SET_ORDER_COMPLETED_STATES";
const SET_PARTIAL_ERRORS = "SET_PARTIAL_ERRORS";
const SET_LOCALE = "SET_LOCALE";
const SET_ACCOUNT_NAME = "SET_ACCOUNT_NAME";
const SET_INIT_STATE = "SET_INIT_STATE";
const INIT_GUIDE_PROGRESS = "console/guide/INIT_GUIDE_PROGRESS";
const SET_ACCOUNT = "SET_ACCOUNT";
const SET_ACCOUNT_USER = "SET_ACCOUNT_USER";
const SET_LOCALE_TIMESTAMP = "SET_LOCALE_TIMESTAMP";
const SET_CUSTOMER_TAG = "SET_CUSTOMER_TAG";
const SET_ACCOUNT_TAG = "SET_ACCOUNT_TAG";
const SET_ACCOUNT_NOTIFICATIONS = "SET_ACCOUNT_NOTIFICATIONS";
const SET_INIT_STEP = "console/pages/init/SET_STEP";
const SET_LOADING_BUTTON = "SET_LOADING_BUTTON";

export default {
  namespaced: true,
  state: () => ({
    sidebarActive: true,
    customerDetailsActive: true,
    token: null,
    localesMaster: null,
    authErrorMessage: null,
    authErrorKey: null,
    authenticated: false,
    breadcrumb: {},
    validationErrors: {},
    prefectures: [],
    locale: null,
    localeTimestamp: null,
    accountName: null,
    orderCompletedStates: [],
    initState: null,
    agencyToken: null,
    account: {},
    accountUser: {},
    customerTags: [],
    accountTags: [],
    notifications: [],
    noticationUnreads: 0,
    isLoadingButton: false,
    notificaitonPage: 0,
    notificaitonPages: 1,
    maxSizeSelectVideo: 200,
  }),
  getters: {
    getField,
    getErrors: (state) => (name) => {
      console.log(name);
      // const er = [{ "taikhoan": ["okok"] }, { "giatien": ["okok"] }];
      console.log(_.get(state.validationErrors, name, []));
      return _.get(state.validationErrors, name, []);
    },

    hasErrors: (state) => (name) => {
      const errors = _.get(state.validationErrors, name, []);
      return !!(errors && (errors.length || Object.keys(errors).length));
    },

    hasActionTrackable(state) {
      return _.includes(
        _.get(state.account, "options.additional_features", []),
        "trackable"
      );
    },
    hasPagePopup(state) {
      return _.includes(
        _.get(state.account, "options.additional_features", []),
        "page_popup"
      );
    },
    usedStorageGb: (state) => {
      // byte to gigabyte
      return _.ceil(_.get(state.account, "usedStorage", 0) / 1048576000, 2);
    },
    maxStorageGb: (state) => {
      // byte to gigabyte
      return _.ceil(_.get(state.account, "maxStorage", 0) / 1048576000, 2);
    },
    accountRegion: (state) => () => {
      return _.get(state, "account.region", "ja");
    },
    getTimezoneNameConsole: (state) => () => {
      return state.account.timezoneName;
    },
    getTimeZoneAccount(state) {
      return _.get(state, "account.timezoneName");
    },
    getBlockActions: (state) => (permission, type = "read") => {
      const listBlockPermissions = _.get(state.accountUser, "blockActions", []);
      return _.some(listBlockPermissions, function (menu) {
        return menu.screenName === permission && menu.name === type;
      });
    },
  },
  actions: {
    // register({ commit }, account) {
    //   commit(SET_VALIDATION_ERRORS, []);
    //   return this.$api.post("/graphql", {
    //     query: authQL.registerAccountUser,
    //     variables: {
    //       input: account,
    //     },
    //   });
    // },
    async authRequest({ commit }, payload) {
      try {
        const resp = await this.$repositories.globalAuth.signIn(payload);
        const data = resp.data.data.loginAccountUser;
        if (!data.use2fa) {
          commit(AUTH_SUCCESS, data);
          commit(SET_INIT_STATE, data.initState);
          commit(
            INIT_GUIDE_PROGRESS,
            _.get(data.accountUser, "data.guide_progress", {}),
            { root: true }
          );
        }
        return data.use2fa;
      } catch (err) {
        commit(AUTH_ERROR, err[0]);
      }
    },
    async authenticateOtp({ commit }, payload) {
      try {
        const resp = await this.$repositories.globalAuth.authenticateOtp(
          payload
        );
        const data = resp.data.data.accountUserAuthenticateOtp;
        commit(AUTH_SUCCESS, data);
        commit(SET_INIT_STATE, data.initState);
        commit(
          INIT_GUIDE_PROGRESS,
          _.get(data.accountUser, "data.guide_progress", {}),
          { root: true }
        );
      } catch (err) {
        commit(AUTH_ERROR, err[0]);
      }
    },
    async resendOtp({ commit }, payload) {
      try {
        await this.$repositories.globalAuth.resendOtp(payload);
      } catch { }
    },
    async loginByToken({ commit }, loginToken) {
      try {
        const resp = await this.$repositories.globalAuth.loginByToken({
          loginToken,
        });
        const token = resp.data.data.loginAccountUserByToken.token;
        commit(AGENCY_AUTH_SUCCESS, token);
      } catch { }
    },
    async getAccountHostByName({ commit }, accountName) {
      try {
        const resp = await this.$repositories.globalAuth.fetchAccountByName({
          accountName,
        });
        return _.get(resp, "data.data.getAccountByName.accountHost");
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    async fetchAccountInitState({ commit }) {
      const response = await this.$repositories.consoleAccount.fetchAccountInitState();
      const data = response.data.data.consoleAccount;
      commit(SET_INIT_STATE, data.initState);
      commit(SET_INIT_STEP, data.initState, { root: true });
    },
    async fetchCustomerTag({ commit }) {
      const response = await this.$repositories.consoleAccount.fetchCustomerTag();
      const data = response.data.data.consoleAccountCustomerTag.data;
      commit(SET_CUSTOMER_TAG, data);
    },
    async fetchAccountTag({ commit }, tagType) {
      const response = await this.$repositories.consoleAccount.fetchAccountTag(
        tagType
      );
      const data = response.data.data.consoleAccountTags.data;
      commit(SET_ACCOUNT_TAG, data);
    },
    async deactiveAccount({ commit }) {
      try {
        await this.$repositories.consoleAccountUser.deactiveAccount();
      } catch { }
    },
    async fetchAccountNotifications({ commit }, payload) {
      try {
        const response = await this.$repositories.consoleAccountNotification.fetchNotifications(
          { input: payload }
        );
        const data = response.data.data.consoleAccountNotificationsIndex;
        commit(SET_ACCOUNT_NOTIFICATIONS, data);
      } catch { }
    },
    async readNotification({ commit }, payload) {
      await this.$repositories.consoleAccountNotification.readNotification(
        payload
      );
    },
    setAccountNotifications({ commit }, payload) {
      commit(SET_ACCOUNT_NOTIFICATIONS, payload);
    },
    fileUpload({ state, commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        const config = {
          header: {
            "Content-Type": "multiple/form-data",
          },
          timeout: 300000,
        };

        this.$api({
          method: "post",
          url: payload.path,
          baseURL: process.env.uploadHost,
          data: payload.data,
          ...config,
        })
          .then((res) => {
            const namespace = payload.namespace || "console";
            if (state.token && namespace === "console") {
              dispatch("fetchAccountUserInfo");
            }
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async csvDownload({ commit }, payload) {
      return await this.$api.get(payload.path, payload.config);
    },
    logout({ commit }) {
      commit(AUTH_LOGOUT);
    },
    toggleSidebar({ commit }, payload) {
      commit(TOGGLE_SIDEBAR, payload);
    },
    toggleCustomerDetails({ commit }, payload) {
      commit(TOGGLE_CUSTOMER_DETAILS, payload);
    },
    fetchLocalesMasterData({ commit }, payload) {
      commit(FETCH_LOCALES_MASTER_DATA, payload);
    },
    updateBreadcrumb({ commit }, payload) {
      commit(UPDATE_BREADCRUMB, payload);
    },
    setValidationErrors({ commit }, payload) {
      commit(SET_VALIDATION_ERRORS, payload);
    },
    setPartialErrors({ commit }, payload) {
      commit(SET_PARTIAL_ERRORS, payload);
    },
    setLocale({ commit }, payload) {
      commit(SET_LOCALE, payload);
    },
    setAccountName({ commit }, payload) {
      commit(SET_ACCOUNT_NAME, payload);
    },
    async fetchJpPrefectures({ commit }) {
      const response = await this.$repositories.common.fetchJpPrefectures();

      commit(SET_PREFECTURES, response.data.data.jpPrefectures);
    },
    async fetchOrderCompletedStates({ commit }) {
      const response = await this.$repositories.common.fetchOrderCompletedStates();

      commit(
        SET_ORDER_COMPLETED_STATES,
        response.data.data.orderCompletedStates
      );
    },
    async fetchAccountUserInfo({ commit }) {
      const response = await this.$repositories.consoleAccountUser.getAccountUser();
      const data = response.data.data.consoleAccountUser;
      commit(SET_ACCOUNT_USER, data);
      commit(SET_ACCOUNT, data.account);
      commit(SET_INIT_STATE, data.account.initState);
      commit(INIT_GUIDE_PROGRESS, _.get(data, "data.guide_progress", {}), {
        root: true,
      });
    },
    async fetchSubscription() {
      const response = await this.$repositories.consoleAccount.fetchSubscription();

      return response.data.data.consoleAccountSubscription;
    },
    async updateAccountUser({ commit }, input) {
      const response = await this.$repositories.consoleAccountUser.updateAccountUser(
        { input }
      );
      commit(
        SET_ACCOUNT_USER,
        response.data.data.consoleAccountUsersUpdate.accountUser
      );
      return response.data.data.consoleAccountUsersUpdate.passwordChanged;
    },
    setLocaleTimestamp({ commit }, payload) {
      commit(SET_LOCALE_TIMESTAMP, payload);
    },
    checkPayjpStatus({ state }) {
      const status = state.account.payjpStatus;
      const warnedAt = _.get(state.account, "options.payjp_warned_at");

      if (["passed", "in_review"].includes(status)) {
        return { passed: true };
      }

      if (
        warnedAt &&
        moment(warnedAt).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
      ) {
        return { passed: true };
      }

      return {
        passed: false,
        message: "misc.console.page.payment_methods.tenant.not_applied",
      };
    },
    updateAccount({ state }) {
      return this.$repositories.consoleAccount.updateAccount(
        {
          payjpWarnedAt: state.account.options.payjp_warned_at,
        },
        false
      );
    },
    // checkNewAccount(_, accountName) {
    //   return this.$api.post("/graphql", {
    //     query: authQL.checkNewAccount,
    //     variables: {
    //       accountName,
    //     },
    //   });
    // },
    setLoadingButton({ commit }, payload) {
      commit(SET_LOADING_BUTTON, payload);
    },
  },
  mutations: {
    updateField,
    AUTH_SUCCESS(state, account) {
      state.token = account.token;
      state.authenticated = true;
      state.authErrorMessage = null;
      state.authErrorKey = null;
      state.account = _.cloneDeep(account);
    },
    AGENCY_AUTH_SUCCESS(state, token) {
      state.agencyToken = token;
      state.authenticated = true;
      state.initState = "completed";
      state.authErrorMessage = null;
      state.authErrorKey = null;
    },
    AUTH_ERROR(state, payload) {
      state.token = null;
      state.authErrorMessage = payload.message;
      state.authErrorKey = payload.error_messages;
    },
    AUTH_LOGOUT(state) {
      if (state.agencyToken && state.token) {
        state.agencyToken = null;
      } else {
        state.authenticated = false;
        state.agencyToken = null;
        state.token = null;
      }
      state.initState = null;
      state.account = null;
    },
    TOGGLE_SIDEBAR(state) {
      state.sidebarActive = !state.sidebarActive;
    },
    TOGGLE_CUSTOMER_DETAILS(state) {
      state.customerDetailsActive = !state.customerDetailsActive;
    },
    FETCH_LOCALES_MASTER_DATA(state, payload) {
      state.localesMaster = payload;
    },
    UPDATE_BREADCRUMB(state, payload) {
      state.breadcrumb = payload;
    },
    SET_VALIDATION_ERRORS(state, payload) {
      state.validationErrors = _.cloneDeep(payload);
    },
    SET_PREFECTURES(state, payload) {
      state.prefectures = payload;
    },
    SET_ORDER_COMPLETED_STATES(state, payload) {
      state.orderCompletedStates = payload;
    },
    SET_PARTIAL_ERRORS(state, { path, errors }) {
      const clone = _.cloneDeep(state.validationErrors);
      _.set(clone, path, errors);
      state.validationErrors = _.cloneDeep(clone);
    },
    SET_LOCALE(state, payload) {
      state.locale = payload;
    },
    SET_ACCOUNT_NAME(state, payload) {
      state.accountName = payload;
    },
    SET_ACCOUNT_HOST(state, payload) {
      state.accountHost = payload;
    },
    SET_INIT_STATE(state, payload) {
      if (state.agencyToken) {
        state.initState = "completed";
      } else {
        state.initState = payload;
      }
    },
    SET_ACCOUNT(state, payload) {
      state.account = payload;
    },
    SET_ACCOUNT_USER(state, payload) {
      state.accountUser = payload;
    },
    SET_LOCALE_TIMESTAMP(state, payload) {
      state.localeTimestamp = payload;
    },
    SET_CUSTOMER_TAG(state, payload) {
      state.customerTags = _.cloneDeep(payload);
    },
    SET_ACCOUNT_TAG(state, payload) {
      state.accountTags = _.cloneDeep(payload);
    },
    SET_ACCOUNT_NOTIFICATIONS(state, payload) {
      state.notifications = state.notifications.concat(payload.data);
      state.notificaitonPages = payload.pagy.pages;
      state.noticationUnreads = payload.unread;
    },
    SET_LOADING_BUTTON(state, payload) {
      state.isLoadingButton = payload;
    },
  },
};
