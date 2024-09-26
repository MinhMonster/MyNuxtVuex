import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";

export default {
  computed: {
    ...mapFields("global", {
      ready: "ready",
      isLoadingSearch: "isLoadingSearch"
    }),
    ...mapFields("home/game/avatars", {
      accountAvatars: "accountAvatars",
      accountAvatar: "accountAvatar",
      metaAvatars: "metaAvatars",
      pages: "metaAvatars.pages",
      query: "query",
      cash: "query.q.cash",
      id: "query.q.id",
      username: "query.q.username",
      sex: "query.q.sex",
      farm: "query.q.farm",
      page: "query.page",
    }),
    isQuery() {
      return (this.queryName || this.queryId || this.queryCash || this.querySex || this.queryFarm);
    },
    queryId() {
      return Number(this.$route.query.id) || null;
    },
    queryName() {
      return this.$route.query.username || null;
    },
    querySex() {
      return this.$route.query.sex || null;
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
    queryFarm() {
      const farmMin = Number(this.$route.query.farmMin)
      const farmMax = Number(this.$route.query.farmMax)
      if (farmMin && farmMax) {
        return {
          min: farmMin,
          max: farmMax,
        };
      } else if (farmMin) {
        return {
          min: farmMin,
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
    whereName() {
      return this.username ? "&username=" + this.username : "";
    },
    whereSex() {
      return this.sex ? "&sex=" + this.sex : "";
    },
    whereCash() {
      return this.cash
        ? "&cashMin=" +
        this.cash.min +
        (this.cash.max ? "&cashMax=" + this.cash.max : "")
        : "";
    },
    whereFarm() {
      return this.farm
        ? "&farmMin=" +
        this.farm.min +
        (this.farm.max ? "&farmMax=" + this.farm.max : "")
        : "";
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
      setTimeout(() => {
        this.isLoadingSearch = false;
      }, 300);
      await this.nextPathAvatar();
    },
    async onChange(page) {
      this.isLoadingSearch = true;
      await this.setQuery({ page: page });
      await this.fetchAccountAvatars();
      this.isLoadingSearch = false;
      await this.nextPathAvatar();
      if (page > 1) {
        const element = document.getElementById("list-avatar");
        if (element) {
          await element.scrollIntoView();
        }
      }
    },
    async reset() {
      this.resetQuery();
      this.search();
    },
    async setQueryAvatar() {
      await this.resetQuery();
      await this.setQuery(
        {
          page: this.queryPage || null,
          q: {
            id: this.queryId || null,
            cash: this.queryCash || null,
            username: this.queryName || null,
            sex: this.querySex || null,
            farm: this.queryFarm || null
          }
        });
      this.nextPathAvatar();
    },
    nextPathAvatar() {
      this.$router.push(
        `${this.path +
        "?" +
        this.wherePage +
        this.whereCash +
        this.whereId +
        this.whereName +
        this.whereSex +
        this.whereFarm

        }`
      );
    },
    async nextAvatarId() {
      if (this.accountAvatar && this.accountAvatar.ID) {
        const element = document.getElementById(this.accountAvatar.ID);
        if (element) {
          await element.scrollIntoView();
          this.accountAvatar = null;
        }
      }
    },
  },
  data() {
    return {
      cashOptions: [
        {
          text: "Chọn Giá Tiền",
          value: null,
        },
        {
          text: "Dưới 100k",
          value: {
            min: 10000,
            max: 120000,
          },
        },
        {
          text: "Giá 100k đến 300k",
          value: {
            min: 120000,
            max: 350000,
          },
        },
        {
          text: "Giá 300k đến 600k",
          value: {
            min: 350000,
            max: 700000,
          },
        },
        {
          text: "Giá 600k đến 1 Triệu",
          value: {
            min: 700000,
            max: 1200000,
          },
        },
        {
          text: "Giá 1Tr đến 3 Triệu",
          value: {
            min: 1200000,
            max: 3600000,
          },
        },
        {
          text: "Giá trên 3 Triệu",
          value: {
            min: 3600000,
          },
        },
      ],
      sexOptions: [
        {
          text: "Chọn Giới tính",
          value: null,
        },
        {
          text: "Nam",
          value: "male",
        },
        {
          text: "Nữ",
          value: "female",
        },
        {
          text: "Bê Đê",
          value: "gay",
        },
      ],
      farmOptions: [
        {
          text: "Chọn Farm",
          value: null,
        },
        {
          text: "Dưới 48 ô đất",
          value: {
            min: 6,
            max: 48,
          },
        },
        {
          text: "49 đến 95 ô đất",
          value: {
            min: 49,
            max: 95,
          },
        },
        {
          text: "96 ô đất (Max)",
          value: {
            min: 96,
          },
        },
      ],
    };
  },
};
