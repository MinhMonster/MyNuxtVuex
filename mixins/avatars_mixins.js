import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import { queryAvatarConfigs } from "@/utils/queryAvatarConfigs";
import { getQueryObject, buildQueryString } from "@/utils/queryHelpers";

export default {
  computed: {
    ...mapFields("global", {
      ready: "ready",
      isLoadingSearch: "isLoadingSearch"
    }),
    ...mapFields("home/game/avatars", {
      accounts: "accounts",
      account: "account",
      meta: "meta",
      pages: "meta.pages",
      query: "query",
      cash: "query.q.cash",
      id: "query.q.id",
      username: "query.q.username",
      sex: "query.q.sex",
      farm: "query.q.farm",
      page: "query.page",
    }),
    isQuery() {
      const query = this.$route.query;
      return !_.isEmpty(query);
    },

    queryFieldConfig() {
      return queryAvatarConfigs(this);
    },

    queryObject() {
      return getQueryObject(this.queryFieldConfig, this.$route);
    },

    query() {
      return buildQueryString(this.queryFieldConfig);
    },
  },

  methods: {
    ...mapActions("home/game/avatars", [
      "resetQuery",
      "setQuery",
      "fetchAccountAvatars"
    ]),
    async reload() {
      this.ready = false;
      await this.setQueryAvatar();
      await this.fetchAccountAvatars();
      this.ready = true;
    },
    async search() {
      await this.setQuery({ page: 1 });
      this.isLoadingSearch = true;
      await this.fetchAccountAvatars();
      setTimeout(() => (this.isLoadingSearch = false), 300);
      this.syncQueryToUrl();
    },
    async onChange(page) {
      this.isLoadingSearch = true;
      await this.setQuery({ page: page });
      await this.fetchAccountAvatars();
      this.isLoadingSearch = false;
      this.syncQueryToUrl();
      if (page > 1) {
        document.getElementById("list-avatar")?.scrollIntoView();
      }
    },
    async reset() {
      await this.resetQuery();
      this.search();
    },
    async setQueryAvatar() {
      await this.resetQuery();

      const { page, perPage, ...q } = this.queryObject;

      await this.setQuery({
        page: page || null,
        q,
      });

      this.syncQueryToUrl();
    },
    syncQueryToUrl() {
      this.$router.push(`${this.path}?${this.query}`);
    },
    async nextAvatarId() {
      if (this.account?.ID) {
        document.getElementById(this.account.ID)?.scrollIntoView();
        this.account = null;
      }
    },
  },
};
