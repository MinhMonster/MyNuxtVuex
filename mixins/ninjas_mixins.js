import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";

export default {

  data() {
    return {
      // isLoadingSearch: false,
    };
  },
  computed: {
    ...mapFields("global", {
      ready: "ready",
      isLoadingSearch: "isLoadingSearch"
    }),
    ...mapFields("home/game/ninjas", {
      query: "query",
      class: "query.q.class",
      server: "query.q.server",
      level: "query.q.level",
      cash: "query.q.cash",
      id: "query.q.id",
    }),
    queryId() {
      return Number(this.$route.query.id) || null;
    },
    queryClass() {
      const getClass = Number(this.$route.query.class)
      return (getClass && getClass <= 6) ? getClass : null;
    },
    queryServer() {
      const getServer = Number(this.$route.query.server)

      return (getServer && getServer <= 9) ? getServer : null;
    },
    queryLevel() {
      const levelMin = Number(this.$route.query.levelMin)
      const levelMax = Number(this.$route.query.levelMax)

      if ((levelMin <= 130) && (levelMax <= 130)) {
        return {
          min: levelMin,
          max: levelMax,
        };
      } else if (levelMin <= 130) {
        return {
          min: levelMin,
        };
      } else {
        return null;
      }
    },
    queryCash() {
      const cashMin = Number(this.$route.query.cashMin)
      const cashMax = Number(this.$route.query.cashMax)
      if (cashMin && cashMax) {
        return {
          min: cashMin,
          max: cashMax,
        };
      } else if (cashMin) {
        return {
          min: cashMin,
        };
      } else {
        return null;
      }
    },
    setQueryClass() {
      return this.queryClass ? "class=" + this.queryClass : "";
    },
    setQueryId() {
      return this.queryId ? "&id=" + this.queryId : "";
    },
    setQueryServer() {
      return this.queryServer ? "&server=" + this.queryServer : "";
    },
    setQueryLevel() {
      return this.queryLevel
        ? "&levelMin=" +
        this.queryLevel.min +

        (this.queryLevel.max ? "&levelMax=" + this.queryLevel.max : '')
        : "";
    },
    setQueryCash() {
      return this.queryCash
        ? "&cashMin=" +
        this.queryCash.min +
        (this.queryCash.max
          ? "&cashMax=" + this.queryCash.max
          : "")
        : "";
    },
  },

  methods: {
    ...mapActions("home/game/ninjas", [
      "resetQuery",
      "setQuery",
      "resetAccountNinjas",
      "fetchAccountNinjas",
    ]),
    async searchNinjas() {
      this.isLoadingSearch = true;
      await this.resetAccountNinjas();
      await this.fetchAccountNinjas();
      setTimeout(() => {
        this.isLoadingSearch = false;
      }, 300);
    },
    async reloadNinja(type) {
      this.ready = false;
      await this.resetQueryNinja(type);
      await this.resetAccountNinjas();
      await this.fetchAccountNinjas();
      this.ready = true;
    },
    async getAccountNinjas(type) {
      this.ready = false;
      await this.setQueryNinja(type);
      await this.resetAccountNinjas();
      await this.fetchAccountNinjas();
      this.ready = true;
    },
    async setQueryNinja(type) {
      await this.resetQuery(type);
      this.class = this.queryClass || null;
      this.server = this.queryServer || null;
      this.level = this.queryLevel || null;
      this.cash = this.queryCash || null;
      this.id = this.queryId || null;
      this.$router.push(
        `${this.path +
        "?" +
        this.setQueryClass +
        this.setQueryServer +
        this.setQueryLevel +
        this.setQueryCash +
        this.setQueryId
        }`
      );
    },
    async resetQueryNinja(type) {
      await this.resetQuery(type);
      this.$router.push(
        `${this.path}`
      );
    },
  },
};
