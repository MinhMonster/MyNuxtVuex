import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";

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
    }),
    queryId() {
      return Number(this.$route.query.id) || null;
    },
    queryInGame() {
      return this.$route.query.ingame || null;
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
    wherePage() {
      return Number(this.page) > 1 ? "page=" + this.page : "";
    },
    whereId() {
      return Number(this.id) ? "&id=" + this.id : "";
    },
    whereCash() {
      return this.cash
        ? "&cashMin=" +
        this.cash.min +
        (this.cash.max ? "&cashMax=" + this.cash.max : "")
        : "";
    },
    whereInGame() {
      const InGame = this.ingame;
      return InGame ? "&ingame=" + InGame : "";
    },
    whereClass() {
      return this.classNinjas ? "&class=" + this.classNinjas : "";
    },
    whereServer() {
      return this.server ? "&server=" + this.server : "";
    },
    whereLevel() {
      return this.level
        ? "&levelMin=" +
        this.level.min +
        (this.level.max ? "&levelMax=" + this.level.max : "")
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
      await this.nextPathNinja();
    },
    async reset(type) {
      await this.resetQuery(type);
      this.search();
    },
    async setQueryNinja(type) {
      await this.resetQuery(type);
      await this.setQuery(
        {
          page: this.queryPage || null,
          q: {
            id: this.queryId || null,
            cash: this.queryCash || null,
            level: this.queryLevel || null,
            ingame: this.queryInGame || null,
            server: this.queryServer || null,
            class: this.queryClass || null,
            type: type || null
          }
        });
      this.nextPathNinja();
    },
    nextPathNinja() {
      console.log(this.wherePage);
      this.$router.push(
        `${this.path +
        "?" +
        this.wherePage +
        this.whereCash +
        this.whereId +
        this.whereInGame +
        this.whereClass +
        this.whereServer +
        this.whereLevel
        }`
      );
    },
  },
  data() {
    return {
      levelOptions: [
        {
          text: "Chon Level",
          value: null,
        },
        {
          text: "Dưới 5x",
          value: {
            min: 0,
            max: 49,
          },
        },
        {
          text: "Level 5x",
          value: {
            min: 50,
            max: 59,
          },
        },
        {
          text: "Level 6x",
          value: {
            min: 60,
            max: 69,
          },
        },
        {
          text: "Level 7x",
          value: {
            min: 70,
            max: 79,
          },
        },
        {
          text: "Level 8x",
          value: {
            min: 80,
            max: 89,
          },
        },
        {
          text: "Level 9x",
          value: {
            min: 90,
            max: 99,
          },
        },
        {
          text: "Level 10x",
          value: {
            min: 100,
            max: 109,
          },
        },
        {
          text: "Level 11x",
          value: {
            min: 110,
            max: 119,
          },
        },
        {
          text: "Level 12x",
          value: {
            min: 120,
            max: 129,
          },
        },
        {
          text: "Level 13x",
          value: {
            min: 130,
          },
        },
      ],
      cashOptions: [
        {
          text: "Chon Giá Tiền",
          value: null,
        },
        {
          text: "Dưới 100k",
          value: {
            min: 0,
            max: 100000,
          },
        },
        {
          text: "Giá 100k đến 300k",
          value: {
            min: 100000,
            max: 300000,
          },
        },
        {
          text: "Giá 300k đến 500k",
          value: {
            min: 300000,
            max: 500000,
          },
        },
        {
          text: "Giá 500k đến 1 Triệu",
          value: {
            min: 500000,
            max: 1000000,
          },
        },
        {
          text: "Giá 1Tr đến 3 Triệu",
          value: {
            min: 1000000,
            max: 3000000,
          },
        },
        {
          text: "Giá trên 3 Triệu",
          value: {
            min: 3000000,
          },
        },
      ],
      classOptions: [
        {
          text: "Chọn Phái",
          value: null,
        },
        // {
        //   text: "Chưa vào lớp",
        //   value: 0,
        // },
        {
          text: "Đao",
          value: "1",
        },
        {
          text: "Kiếm",
          value: "2",
        },
        {
          text: "Tiêu",
          value: "3",
        },
        {
          text: "Cung",
          value: "4",
        },
        {
          text: "Quạt",
          value: " 5",
        },
        {
          text: "Kunai",
          value: "6",
        },
      ],
      serverOptions: [
        {
          text: "Chọn Server",
          value: null,
        },
        {
          text: "Sv1 - Bokken",
          value: "1",
        },
        {
          text: "Sv2+3 - Shuriken + Tessen",
          value: "2",
        },
        {
          text: "Sv4 - Kunai",
          value: "4",
        },
        {
          text: "Sv5 - Katana",
          value: "5",
        },
        {
          text: "Sv679 - Tone + Sanzu + Fukiya",
          value: "6",
        },
        {
          text: "Sv8 - Sensha",
          value: "8",
        },
      ],
    };
  },
};
