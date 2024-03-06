<template>
  <div class="form-search">
    <div class="page-body">
      <form class="form" @submit.prevent="search()">
        <v-row>
          <v-col cols="12" sm="3" md="2">
            <div class="field">
              <!-- <form-validator name="level"> -->
              <select v-model="level" class="v-input form-input">
                <option
                  v-for="(option, index) in levelOptions"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
              <!-- <v-select
                v-model="level"
                :items="levelOptions"
                size="sm"
              ></v-select> -->
              <!-- </form-validator> -->
            </div>
          </v-col>
          <v-col cols="12" sm="3" md="2">
            <div class="field">
              <!-- <form-validator name="cash"> -->
              <select v-model="cash" class="v-input form-input">
                <option
                  v-for="(option, index) in cashOptions"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
              <!-- <v-select
                v-model="cash"
                :items="cashOptions"
                size="sm"
              ></v-select> -->
              <!-- </form-validator> -->
            </div>
          </v-col>
          <v-col cols="12" sm="3" md="2">
            <div class="field">
              <!-- <form-validator name="class"> -->
              <select v-model="classNinjas" class="v-input form-input">
                <option
                  v-for="(option, index) in classOptions"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
              <!-- <v-select
                v-model="classNinjas"
                :items="classOptions"
                size="sm"
              ></v-select> -->
              <!-- </form-validator> -->
            </div>
          </v-col>
          <v-col cols="12" sm="3" md="2">
            <div class="field">
              <!-- <base-select v-model="server" :options="serverOptions" /> -->
              <select v-model="server" class="v-input form-input">
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
                placeholder="Nhập mã số nick..."
                class="v-input form-input"
              />
            </div>
          </v-col>
          <v-col cols="3" sm="3" md="1">
            <v-btn
              type="submit"
              color="primary"
              class="search-btn text-white text-not-shadow w-100"
            >
              <i class="fa fa-search"></i> Tìm
            </v-btn>
          </v-col>
          <v-col cols="3" sm="3" md="1">
            <v-btn
              color="error"
              class="btn btn-danger btn-search text-not-shadow text-white w-100"
              @click="reset()"
            >
              <i class="fa fa-list"></i> Xóa
            </v-btn>
          </v-col>
        </v-row>
      </form>
    </div>
  </div>
</template>
<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import FormValidator from "@/components/global/form/FormValidator";

export default {
  components: { FormValidator },
  props: {
    type: {
      type: String,
      default: null,
    },
    isReset: Boolean,
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
  async mounted() {},
  methods: {
    ...mapActions("home/game/ninjas", ["resetQuery", "setQuery"]),
    search() {
      this.setQueryForm();
      this.$emit("search");
    },
    async reset() {
      this.resetQuery(this.type);
      this.search();
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