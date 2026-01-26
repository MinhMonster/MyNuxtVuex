import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import { queryDragonBallConfigs } from "@/utils/queryDragonBallConfigs";
import { getQueryObject, buildQueryString } from "@/utils/queryHelpers";

export default {
  computed: {
    ...mapFields("global", {
      ready: "ready",
      isLoadingSearch: "isLoadingSearch"
    }),
    ...mapFields("home/game/dragon_balls", {
      accounts: "accounts",
      account: "account",
      meta: "meta",
      pages: "meta.pages",
      query: "query",
      cash: "query.q.cash",
      code: "query.q.code",
      server: "query.q.server",
      accountClass: "query.q.class",
      cash: "query.q.cash",
      username: "query.q.username",
      page: "query.page",
    }),
    isQuery() {
      const query = this.$route.query;
      return !_.isEmpty(query);
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

    query() {
      return buildQueryString(this.queryFieldConfig);
    },
  },

  methods: {
    ...mapActions("home/game/dragon_balls", [
      "resetQuery",
      "setQuery",
      "fetchAccountDragonBall",
      "resetAccountDragonBalls",
      "fetchAccountDragonBalls"
    ]),
    async reload() {
      this.ready = false;
      await this.setQueryAccount();
      await this.resetAccountDragonBalls();
      await this.fetchAccountDragonBalls();
      this.ready = true;
    },
    async search() {
      await this.setQuery({ page: 1 });
      this.isLoadingSearch = true;
      await this.resetAccountDragonBalls();
      await this.fetchAccountDragonBalls();
      setTimeout(() => (this.isLoadingSearch = false), 300);
      this.syncQueryToUrl();
    },
    async onChange() {
      this.isLoadingSearch = true;
      await this.setQuery({ page: this.page + 1 });
      await this.fetchAccountDragonBalls();
      this.isLoadingSearch = false;
      this.syncQueryToUrl();
    },
    async reset() {
      await this.resetQuery();
      this.search();
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
      this.$router.push(`${this.path}?${this.query}`);
    },
  },
};
