import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";
import cookie from "cookie";

export default ({ store, req }) => {
  createPersistedState({
    key: "MinhMonster",
    paths: [
      "admin.auth.token",
      "admin.auth.authenticated",
      "admin.deverlopers.deverlopers",
      "admin.deverlopers.deverloper"

      // "console.global.sidebarActive",
      // "console.global.token",
      // "console.global.agencyToken",
      // "console.pages.account_setting.basic_info.account",
      // "console.global.authenticated",
      // "console.global.localeTimestamp",
      // "shop.global.token",
      // "agency.global.sidebarActive",
      // "agency.global.token",
      // "agency.global.authenticated",
    ],
    storage: {
      getItem: (key) => {
        // See https://nuxtjs.org/guide/plugins/#using-process-flags
        if (process.server) {
          const parsedCookies = cookie.parse(req.headers.cookie);
          return parsedCookies[key];
        } else {
          return Cookies.get(key);
        }
      },
      // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
      setItem: (key, value) =>
        Cookies.set(key, value, { expires: 365, secure: false }),
      removeItem: (key) => Cookies.remove(key),
    },
  })(store);
};