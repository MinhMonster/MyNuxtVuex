<template>
  <div class="form-search">
    <div class="page-body">
      <form @submit.prevent="search()">
        <v-row>
          <v-col cols="6" sm="3" md="2">
            <div class="field v-input form-input">
              <select v-model="level" class="">
                <option
                  v-for="(option, index) in levelOptions"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </div>
          </v-col>
          <v-col cols="6" sm="3" md="2">
            <div class="field v-input form-input">
              <select v-model="cash" class="">
                <option
                  v-for="(option, index) in cashOptions"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </div>
          </v-col>
          <v-col cols="6" sm="3" md="2">
            <div class="field v-input form-input">
              <select v-model="classNinjas" class="">
                <option
                  v-for="(option, index) in classOptions"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </div>
          </v-col>
          <v-col cols="6" sm="3" md="2">
            <div class="field v-input form-input">
              <!-- <base-select v-model="server" :options="serverOptions" /> -->
              <select v-model="server" class="">
                <option
                  v-for="(server, sv) in serverOptions"
                  :key="sv"
                  :value="server.value"
                >
                  {{ server.text }}
                </option>
              </select>
            </div>
          </v-col>
          <v-col cols="6" sm="3" md="2">
            <div class="field">
              <input
                v-model="id"
                type="number"
                placeholder="Nhập mã số nick..."
                class="v-input form-input"
              />
            </div>
          </v-col>
          <GroupBtnSearch @search="search" @reset="reset" />
        </v-row>
      </form>
    </div>
  </div>
</template>
<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import Loading from "@/components/global/molecules/common/Loading";
import GroupBtnSearch from "@/components/common/client/button/GroupBtnSearch";

export default {
  components: { Loading, GroupBtnSearch },
  props: {
    type: {
      type: String,
      default: null,
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
          text: "Dưới 50k",
          value: {
            min: 10000,
            max: 49000,
          },
        },
        {
          text: "Giá 50k đến 100k",
          value: {
            min: 50000,
            max: 100000,
          },
        },
        {
          text: "Giá 100k đến 200k",
          value: {
            min: 100000,
            max: 200000,
          },
        },
        {
          text: "Giá 200k đến 300k",
          value: {
            min: 200000,
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
          text: "Giá 500k đến 700k",
          value: {
            min: 500000,
            max: 700000,
          },
        },
        {
          text: "Giá 700k đến 1 Triệu",
          value: {
            min: 700000,
            max: 1000000,
          },
        },
        {
          text: "Giá 1Tr đến 1,5 Triệu",
          value: {
            min: 1000000,
            max: 1500000,
          },
        },
        {
          text: "Giá 1,5Tr đến 3 Triệu",
          value: {
            min: 1500000,
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
          value: " 2",
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
          text: "Sv6+7 - Tone + Sanzu",
          value: "6",
        },
        {
          text: "Sv8 - Sensha",
          value: "8",
        },
        {
          text: "Sv9 - Fukiya",
          value: "9",
        },
      ],
    };
  },
  computed: {
    ...mapFields("home/game/ninjas", {
      query: "query",
      classNinjas: "query.q.class",
      server: "query.q.server",
      level: "query.q.level",
      cash: "query.q.cash",
      id: "query.q.id",
    }),
    ...mapFields("global", {
      isLoadingSearch: "isLoadingSearch",
    }),
    queryForm() {
      return _.cloneDeep(this.query);
    },
    whereId() {
      const Id = Number(this.id);
      return Id ? "id=" + Id : "";
    },
    whereClass() {
      return this.classNinjas ? "class=" + this.classNinjas : "";
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
    whereCash() {
      return this.cash
        ? "&cashMin=" +
            this.cash.min +
            (this.cash.max ? "&cashMax=" + this.cash.max : "")
        : "";
    },
  },
  methods: {
    ...mapActions("home/game/ninjas", ["resetQuery", "setQuery"]),
    async search() {
      await this.setQueryForm();
      this.$emit("search");
    },
    async reset() {
      await this.resetQuery(this.type);
      await this.search();
    },
    setQueryForm() {
      this.queryForm.page = 1;
      // this.setQuery(this.queryForm);
      this.$router.push(
        `${
          this.path +
          "?" +
          this.whereClass +
          this.whereServer +
          this.whereLevel +
          this.whereCash +
          this.whereId
        }`
      );
    },
  },
};
</script>