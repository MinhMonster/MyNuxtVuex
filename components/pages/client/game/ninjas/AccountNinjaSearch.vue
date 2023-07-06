<template>
  <b-row class="account-search">
    <b-col cols="6" sm="4" md="2" lg="2">
      <div class="field">
        <form-validator name="level">
          <b-form-select
            v-model="queryForm.q.level"
            :options="levelOptions"
            @change="setQueryForm()"
            size="sm"
          ></b-form-select>
        </form-validator>
      </div>
    </b-col>
    <b-col cols="6" sm="4" md="2" lg="2">
      <div class="field">
        <form-validator name="cash">
          <b-form-select
            v-model="queryForm.q.cash"
            :options="cashOptions"
            @change="setQueryForm()"
            size="sm"
          ></b-form-select>
        </form-validator>
      </div>
    </b-col>
    <b-col cols="6" sm="4" md="2" lg="2">
      <div class="field">
        <form-validator name="class">
          <b-form-select
            v-model="queryForm.q.class"
            :options="classOptions"
            @change="setQueryForm()"
            size="sm"
          ></b-form-select>
        </form-validator>
      </div>
    </b-col>
    <b-col cols="6" sm="4" md="2" lg="2">
      <div class="field">
        <form-validator name="server">
          <b-form-select
            v-model="queryForm.q.server"
            :options="serverOptions"
            @change="setQueryForm()"
            size="sm"
          ></b-form-select>
        </form-validator>
      </div>
    </b-col>
    <b-col cols="6" sm="4" md="2" lg="2">
      <div class="field">
        <form-validator name="id">
          <b-form-input
            v-model="queryForm.q.id"
            placeholder="Nhập ID nick..."
            @change="setQueryForm()"
            @keyup.enter="search()"
          ></b-form-input>
        </form-validator>
      </div>
    </b-col>
    <b-col cols="3" sm="2" md="1" lg="1">
      <b-button
        type="submit"
        name="timkiem"
        class="btn btn-info btn-search text-white"
        @click="search()"
      >
        <i class="fa fa-search"></i> Tìm kiếm
      </b-button>
    </b-col>
    <b-col cols="3" sm="2" md="1" lg="1">
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
import FormValidator from "@/components/pages/admin/Shared/form/FormValidator";
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
export default {
  components: { FormValidator },
  data() {
    return {
      // query: {
      //   q: {
      //     id: null,
      //     level: null,
      //     cash: null,
      //     class: null,
      //     server: null,
      //   },
      // },
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
      classOptions: [
        {
          text: "Chọn Phái",
          value: null,
        },
        {
          text: "Chưa vào lớp",
          value: 0,
        },
        {
          text: "Đao",
          value: 1,
        },
        {
          text: "Kiếm",
          value: 2,
        },
        {
          text: "Tiêu",
          value: 3,
        },
        {
          text: "Cung",
          value: 4,
        },
        {
          text: "Quạt",
          value: 5,
        },
        {
          text: "Kuani",
          value: 6,
        },
      ],
      serverOptions: [
        {
          text: "Chọn Server",
          value: null,
        },
        {
          text: "Sv1 - Bokken",
          value: 1,
        },
        {
          text: "Sv2+3 - Shuriken + Tessen",
          value: 2,
        },
        {
          text: "Sv4 - Kunai",
          value: 4,
        },
        {
          text: "Sv5 - Katana",
          value: 5,
        },
        {
          text: "Sv6+7 - Tone + Sanzu",
          value: 6,
        },
        {
          text: "Sv8 - Sensha",
          value: 8,
        },
        {
          text: "Sv9 - Fukiya",
          value: 9,
        },
      ],
    };
  },
  created() {},

  computed: {
    ...mapFields("home/game/ninjas", {
      query: "query",
    }),
    queryForm() {
      return _.cloneDeep(this.query);
    },
  },
  methods: {
    ...mapActions("home/game/ninjas", ["resetQuery", "setQuery"]),
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
.form-group {
  margin-bottom: 0;
}
</style>
