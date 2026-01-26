import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import { queryDragonBallConfigs } from "@/utils/queryDragonBallConfigs";
import { getQueryObject, buildQueryString } from "@/utils/queryHelpers";

export default {
  computed: {
    // global
    ...mapFields("global", {
      ready: "ready",
      isLoadingSearch: "isLoadingSearch",
    }),

    // module
    ...mapFields("home/game/dragon_balls", {
      accounts: "accounts",
      account: "account",
      meta: "meta",
      pages: "meta.pages",

      query: "query",
      code: "query.q.code",
      server: "query.q.server",
      accountClass: "query.q.class",
      cash: "query.q.cash",
      username: "query.q.username",
      page: "query.page",
    }),

    isQuery() {
      return !_.isEmpty(this.$route.query);
    },

    isShowNext() {
      return this.page < this.pages;
    },

    queryFieldConfig() {
      return queryDragonBallConfigs(this);
    },

    queryObject() {
      return getQueryObject(this.queryFieldConfig, this.$route);
    },

    queryString() {
      return buildQueryString(this.queryFieldConfig);
    },
  },

  methods: {
    ...mapActions("home/game/dragon_balls", [
      "resetQuery",
      "setQuery",
      "fetchAccountDragonBall",
      "resetAccountDragonBalls",
      "fetchAccountDragonBalls",
    ]),

    async reload() {
      this.ready = false;
      await this.setQueryAccount();
      await this.resetAccountDragonBalls();
      await this.fetchAccountDragonBalls();
      this.ready = true;
    },

    async search() {
      this.isLoadingSearch = true;

      await this.setQuery({ page: 1 });
      await this.resetAccountDragonBalls();
      await this.fetchAccountDragonBalls();

      this.isLoadingSearch = false;
      this.syncQueryToUrl();
    },

    // load more (đổi tên cho đúng nghĩa)
    async loadNextPage() {
      if (!this.isShowNext) return;

      this.isLoadingSearch = true;
      await this.setQuery({ page: this.page + 1 });
      await this.fetchAccountDragonBalls();
      this.isLoadingSearch = false;

      this.syncQueryToUrl();
    },

    async reset() {
      await this.resetQuery();
      await this.search();
    },

    async setQueryAccount() {
      await this.resetQuery();

      const { page, perPage, ...q } = this.queryObject;

      await this.setQuery({
        page: page || null,
        q,
      });

      this.syncQueryToUrl();
    },

    syncQueryToUrl() {
      this.$router.push(
        this.queryString
          ? `${this.path}?${this.queryString}`
          : this.path
      );
    },
  },
};
