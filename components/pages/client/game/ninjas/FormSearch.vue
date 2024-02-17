<template>
  <div class="form-search scroll-y">
    <div class="title center">Tìm Kiếm Nick</div>
    <!-- <div class="close">Đóng</div> -->
    <div class="page-body">
      <b-row>
        <b-col cols="12">
          <!-- <div class="field">
            <form-validator name="level"> -->
          <b-form-select
            v-model="queryForm.q.level"
            :options="levelOptions"
            @change="setQueryForm()"
            size="sm"
          ></b-form-select>
          <!-- </form-validator>
          </div> -->
        </b-col>
        <b-col cols="12">
          <!-- <div class="field">
            <form-validator name="cash"> -->
          <b-form-select
            v-model="queryForm.q.cash"
            :options="cashOptions"
            @change="setQueryForm()"
            size="sm"
          ></b-form-select>
          <!-- </form-validator>
          </div> -->
        </b-col>
        <b-col cols="12">
          <!-- <div class="field">
            <form-validator name="class"> -->
          <b-form-select
            v-model="queryForm.q.class"
            :options="classOptions"
            @change="setQueryForm()"
            size="sm"
          ></b-form-select>
          <!-- </form-validator>
          </div> -->
        </b-col>
        <b-col cols="12">
          <!-- <div class="field">
            <form-validator name="server"> -->
          <b-form-select
            v-model="queryForm.q.server"
            :options="serverOptions"
            @change="setQueryForm()"
            size="sm"
          ></b-form-select>
          <!-- </form-validator>
          </div> -->
        </b-col>
        <b-col cols="12">
          <!-- <div class="field">
            <form-validator name="id"> -->
          <b-form-input
            v-model="queryForm.q.id"
            placeholder="Nhập ID nick..."
            @change="setQueryForm()"
            @keyup.enter="search()"
          ></b-form-input>
          <!-- </form-validator>
          </div> -->
        </b-col>
        <b-col cols="6">
          <b-button
            type="submit"
            name="timkiem"
            class="btn search-btn"
            @click="search()"
          >
            <i class="fa fa-search"></i> Tìm kiếm
          </b-button>
        </b-col>
        <b-col cols="6">
          <b-button
            type=""
            name=""
            class="btn btn-success btn-search text-white w-100"
            @click="reset()"
            ><i class="fa fa-list"></i> Làm mới</b-button
          >
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import mixins from "@/mixins/index";

import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import FormValidator from "@/components/global/form/FormValidator";

export default {
  mixins: [mixins],

  layout: "clientLayout",
  components: { FormValidator },
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
      this.resetQuery(this.type);
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
.form-search {
  position: relative;
  height: calc(100% - 55px);
  border: 2px solid #561d00;
  background: #ffcf9c;
  padding: 10px;
  .modal-info {
    border-radius: 4px;
    position: relative;
    padding: 5px;
    color: #663019;
    // border: 1px solid #663019;
    // background: #ffefa3;
  }
}
.rightbar-content {
  margin-top: 0px;
}
.rightbar-content .user-info-wrap {
  top: 0px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 200px;
  border: 2px solid #561d00;
  background: #e28637;
  background-size: 100% 100%;

  .user-info {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button.v-btn .v-btn__content i.v-icon,
    .v-btn--icon.v-size--default {
      height: 70px;
      width: 70px;
      font-size: 70px;
    }
    img {
      height: 80px;
      width: 80px;
      border-radius: 50%;
    }
  }
}
.rightbar-content .user-info-wrap .user-info .member {
  font-size: 20px;
  // font-weight: 700;
  color: #fff;
  text-align: center;
}

.rightbar-content .member-nav {
  padding: 0 0.36rem;
}
.rightbar-content .member-nav .h-line {
  width: 100%;
  height: 1px;
  background-color: #561d00;
}
.rightbar-content .member-nav .member-nav-list {
  padding-top: 0.2rem;
}
.rightbar-content .member-nav .member-nav-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding-left: 0.08rem;
}
.rightbar-content .member-nav .member-nav-name {
  margin-left: 0.2rem;
  font-size: 15px;
  color: #fff;
}
.sign-out {
  display: flex;
  justify-content: center;
  padding: 20px;
  .bg-danger {
    color: #ffffff;
    background: #a21d0a !important;
  }
}
.register-btn {
  box-shadow: 0 0.05rem 0.2rem 0 rgb(0 0 0 / 49%);
  border: 1px solid #ffeb00;
  font-weight: 700;
  color: #000;
  /* background-image: linear-gradient(180deg,#fdffdb,#d9e254); */
  background-image: linear-gradient(180deg, #fdffdb, #ffcf9c);
}
.register-btn {
  position: relative;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.235rem;
  border-radius: 0.32rem;
  font-size: 12px;
}
</style>