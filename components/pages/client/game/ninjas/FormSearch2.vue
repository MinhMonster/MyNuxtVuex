<template>
  <div class="form-search">
    <!-- <div class="title center">Tìm Kiếm Nick</div> -->
    <!-- <div class="close">Đóng</div> -->
    <div class="page-body">
      <form class="form">
        <b-row>
          <b-col cols="12" sm="3" md="2">
            <div class="field">
              <!-- <form-validator name="level"> -->
              <b-form-select
                v-model="level"
                :options="levelOptions"
                size="sm"
              ></b-form-select>
              <!-- </form-validator> -->
            </div>
          </b-col>
          <b-col cols="12" sm="3" md="2">
            <div class="field">
              <!-- <form-validator name="cash"> -->
              <b-form-select
                v-model="cash"
                :options="cashOptions"
                size="sm"
              ></b-form-select>
              <!-- </form-validator> -->
            </div>
          </b-col>
          <b-col cols="12" sm="3" md="2">
            <div class="field">
              <!-- <form-validator name="class"> -->
              <b-form-select
                v-model="classNinjas"
                :options="classOptions"
                size="sm"
              ></b-form-select>
              <!-- </form-validator> -->
            </div>
          </b-col>
          <b-col cols="12" sm="3" md="2">
            <div class="field">
              <!-- <form-validator name="server"> -->
              <b-form-select
                v-model="server"
                :options="serverOptions"
                size="sm"
              ></b-form-select>
              <!-- </form-validator> -->
            </div>
          </b-col>
          <b-col cols="12" sm="3" md="2">
            <div class="field">
              <!-- <form-validator name="id"> -->
              <b-form-input
                v-model="id"
                placeholder="Nhập ID nick..."
                @keyup.enter="search()"
                class="v-input form-input"
              ></b-form-input>
              <!-- </form-validator> -->
            </div>
          </b-col>
          <b-col cols="6" sm="3" md="1">
            <b-button
              type="submit"
              name="timkiem"
              variant="info"
              class="search-btn text-white"
              @click="search()"
            >
              <i class="fa fa-search"></i> Tìm kiếm
            </b-button>
          </b-col>
          <b-col cols="6" sm="3" md="1">
            <b-button
              type=""
              name=""
              class="btn btn-success btn-search text-white w-100"
              @click="reset()"
              ><i class="fa fa-list"></i> Xóa tìm kiếm</b-button
            >
          </b-col>
        </b-row>
      </form>
    </div>
  </div>
</template>
<script>
import mixins from "@/mixins/index";

import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import FormValidator from "@/components/pages/admin/Shared/form/FormValidator";

export default {
  mixins: [mixins],

  layout: "clientLayout",
  components: { FormValidator },
  props: {
    type: {
      type: String,
      default: null,
    },
    isReset: Boolean,
  },
  // watch: {
  //   isReset: {
  //     handler(newValue, oldValue) {
  //       console.log(newValue, oldValue);
  //       if (oldValue) {
  //         this.reset();
  //       }
  //     },
  //   },
  // },
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
    path() {
      const path = this.$route.path;
      return path;
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
<style lang="scss" scoped>
.form-search {
  background: #ffcf9c;
  margin: -6px;
  @media (max-width: 600px) {
    .page-body {
      padding: 6px;
      .col-12, .col-6 {
        padding: 3px;
      }
    }
  }
}

form {
  background: #ffefa3;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;

  .field {
    width: 100%;
    position: relative;
    &.submit {
      margin-top: 0px;
    }
    input {
      height: 100%;
      width: 100%;
      outline: none;
      font-size: 17px;
      padding-left: 5px;
      border: 1px solid lightgrey;
      border-radius: 4px;
      transition: all 0.3s ease;
      background: #fff;
      &.v-input {
        z-index: 999999999;
        height: 35px;
        border: 1px solid #e28637;
        color: #663019 !important;
        &.text-danger {
          color: red !important;
          font-size: 15px;
        }
      }
    }
    select {
      height: 100%;
      width: 100%;
      outline: none;
      font-size: 17px;
      padding-left: 5px;
      border: 1px solid #e28637 !important;
      border-radius: 4px;
      transition: all 0.3s ease;
      // background: #fff;
      .custom-select {
        z-index: 999999999;
        height: 35px;
        border: 1px solid #e28637 !important;
        color: #663019 !important;
      }
    }
    input[type="submit"],
    .btn-login {
      width: 100%;
      border-radius: 20px;
      color: #ffcf9c !important;
      border: none;
      padding-left: 0;
      // font-size: 20px;
      font-weight: 500;
      cursor: pointer;
      background: linear-gradient(-135deg, #e28637, #561d00);
      transition: all 0.3s ease;
      span {
        color: #ffcf9c !important;
      }
    }
  }
}

form {
  padding: 10px;
}

.form-input {
  border: 1px solid #333;
  width: 100%;
  height: 50px;
  padding: 0 0px;
  transform: 0.25s ease;
}

.form-input:focus {
  border-color: blue;
}
</style>