import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import { queryFieldConfig } from "@/utils/queryNinjaConfigs";
import { getQueryObject, buildQueryString } from "@/utils/queryHelpers";

export default {
  computed: {
    ...mapFields("global", {
      ready: "ready",
      isLoadingSearch: "isLoadingSearch"
    }),
    ...mapFields("home/game/ninjas", {
      query: "query",
      page: "query.page",
      classNinjas: "query.q.class",
      server: "query.q.server",
      level: "query.q.level",
      cash: "query.q.cash",
      id: "query.q.id",
      ingame: "query.q.ingame",
      family: "query.q.family"
    }),
    queryFieldConfig() {
      return queryFieldConfig(this);
    },
    queryObject() {
      return getQueryObject(this.queryFieldConfig, this.$route);
    },
    query() {
      return buildQueryString(this.queryFieldConfig);
    }

  },

  methods: {
    ...mapActions("home/game/ninjas", [
      "resetQuery",
      "setQuery",
      "resetAccountNinjas",
      "fetchAccountNinjas"
    ]),
    async reload(type) {
      this.ready = false;
      await this.setQueryNinja(type);
      await this.resetAccountNinjas();
      await this.fetchAccountNinjas();
      this.ready = true;
    },
    async search() {
      await this.setQuery({ page: 1 });
      this.isLoadingSearch = true;
      await this.resetAccountNinjas();
      await this.fetchAccountNinjas();
      setTimeout(() => {
        this.isLoadingSearch = false;
      }, 300);
      await this.syncQueryToUrl();
    },
    async reset(type) {
      await this.resetQuery(type);
      this.search();
    },
    async setQueryNinja(type) {
      await this.resetQuery(type);
      await this.setQuery({
        page: this.queryObject.page || null,
        q: {
          ...this.queryObject,
          type: type || null
        }
      });
      this.syncQueryToUrl();
    },
    syncQueryToUrl() {
      this.$router.push(`${this.path}?${this.query}`);
    },
  },

};
