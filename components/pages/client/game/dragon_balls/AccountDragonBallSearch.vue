<template>
  <b-row class="account-search">
    <b-col cols="6" sm="4" md="2" lg="2">
      <b-form-select
        v-model="queryForm.q.cash"
        :options="cashOptions"
        @change="setQueryForm()"
        size="sm"
      ></b-form-select>
    </b-col>
    <b-col cols="6" sm="4" md="2" lg="2">
      <b-form-select
        v-model="queryForm.q.class"
        :options="classOptions"
        @change="setQueryForm()"
        size="sm"
      ></b-form-select>
    </b-col>
    <b-col cols="6" sm="4" md="2" lg="2">
      <b-form-select
        v-model="queryForm.q.server"
        :options="serverOptions"
        @change="setQueryForm()"
        size="sm"
      ></b-form-select>
    </b-col>
    <b-col cols="6" sm="4" md="2" lg="2">
      <b-form-input
        v-model="queryForm.q.id"
        type="number"
        placeholder="Nhập ID nick..."
        @change="setQueryForm()"
        @keyup.enter="search()"
      ></b-form-input>
    </b-col>
    <b-col cols="6" sm="4" md="2" lg="2">
      <b-button
        type="submit"
        name="timkiem"
        class="btn btn-info btn-search text-white"
        @click="search()"
      >
        <i class="fa fa-search"></i> Tìm kiếm
      </b-button>
    </b-col>
    <b-col cols="6" sm="4" md="2" lg="2">
      <b-button
        type=""
        name=""
        class="btn btn-success btn-search text-white"
        @click="reset()"
        ><i class="fa fa-list"></i> Tất cả</b-button
      >
    </b-col>
  </b-row>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      classOptions: [
        {
          text: "Chọn Hành Tinh",
          value: null,
        },
        {
          text: "Trái Đất",
          value: 1,
        },
        {
          text: "xay Da",
          value: 2,
        },
        {
          text: "Na Mếc",
          value: 3,
        },
      ],
      serverOptions: [
        {
          text: "Chọn Server",
          value: null,
        },
        {
          text: "1 Sao",
          value: 1,
        },
        {
          text: "2 Sao",
          value: 2,
        },
        {
          text: "3 Sao",
          value: 3,
        },
        {
          text: "4 Sao",
          value: 4,
        },
        {
          text: "5 Sao",
          value: 5,
        },
        {
          text: "6 Sao",
          value: 6,
        },
        {
          text: "7 Sao",
          value: 7,
        },
        {
          text: "8 Sao",
          value: 8,
        },
        {
          text: "9 Sao",
          value: 9,
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
            min: 0,
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
    };
  },
  created() {},

  computed: {
    ...mapFields("home/game/dragon_balls", {
      query: "query",
    }),
    queryForm() {
      return _.cloneDeep(this.query);
    },
  },
  methods: {
    ...mapActions("home/game/dragon_balls", ["resetQuery", "setQuery"]),
    search() {
      this.setQueryForm();
      this.$emit("search");
    },
    async reset() {
      this.resetQuery();
      this.search();
    },
    setQueryForm() {
      this.queryForm.page = 1;
      this.setQuery(this.queryForm);
    },
  },
};
</script>

<style lang="scss" scoped>
.account-search {
  margin-bottom: 20px;
  margin: -3px -3px 15px -3px;
  border: 1px solid #663019;
  background: #ffefa3;
  border-radius: 5px;
  padding: 3px;
  .col-6,
  .col-3,
  .col-2,
  .col-1 {
    padding: 3px;
    border-radius: 3px;
    width: 100%;
  }
  .form-control {
    height: 30px !important;
    padding: 3px 6px;
    font-size: 15px;
    font-weight: 400;
    /* line-height: 1.5; */
    border: 1px solid #ced4da;
  }
}
.btn-search {
  width: 100%;
  height: 30px;
  padding: 3px !important;
  border-radius: 5px;
}
</style>
