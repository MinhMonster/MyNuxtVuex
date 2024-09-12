<template>
  <div class="form-search">
    <!-- <div class="title center">Tìm Kiếm Nick</div> -->
    <!-- <div class="close">Đóng</div> -->
    <div>
      <form class="form">
        <v-row>
          <v-col cols="12" sm="3" md="2">
            <div class="field">
              <!-- <form-validator name="id"> -->
              <v-text-field
                v-model="Ffname"
                density="compact"
                placeholder="Enter Name"
                variant="outlined"
                @change="setQueryForm()"
              ></v-text-field>
              <!-- </form-validator> -->
            </div>
          </v-col>
          <v-col cols="12" sm="3" md="2">
            <div class="field">
              <!-- <form-validator name="id"> -->
              <v-text-field
                v-model="id"
                density="compact"
                placeholder="Enter ID"
                variant="outlined"
                @change="setQueryForm()"
              ></v-text-field>
              <!-- </form-validator> -->
            </div>
          </v-col>
          <v-col cols="12" sm="3" md="2">
            <div class="field">
              <!-- <form-validator name="id"> -->
              <v-text-field
                v-model="username"
                placeholder="Enter UserName..."
                variant="outlined"
                @change="setQueryForm()"
              ></v-text-field>
              <!-- </form-validator> -->
            </div>
          </v-col>
          <v-col cols="12" sm="3" md="2">
            <div class="field">
              <!-- <form-validator name="id"> -->
              <v-text-field
                v-model="uid"
                placeholder="Enter UID..."
                variant="outlined"
                @change="setQueryForm()"
              ></v-text-field>
              <!-- </form-validator> -->
            </div>
          </v-col>
          <v-col cols="6" sm="3" md="1">
            <v-btn name="timkiem" class="btn search-btn" @click="search()">
              <i class="fa fa-search"></i> Search
            </v-btn>
          </v-col>
          <v-col cols="6" sm="3" md="1">
            <v-btn
              class="btn btn-success btn-search text-white w-100"
              @click="reset()"
              ><i class="fa fa-list"></i> Reset</v-btn
            >
          </v-col>
        </v-row>
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
      statusOptions: [
        {
          text: "All",
          value: null,
        },
        {
          text: "Còn",
          value: "yes",
        },
        {
          text: "Bán",
          value: "no",
        },
      ],
    };
  },
  computed: {
    ...mapFields("admin/users", {
      query: "query",
      Ffname:"query.q.Ffname",
      username: "query.q.username",
      uid: "query.q.uid",
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
    ...mapActions("admin/users", ["resetQuery", "setQuery"]),
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
  // background: #ffcf9c;
  // margin: -6px;
}
.v-text-field {
  padding-top: 0px;
  margin-top: 0px;
  ::v-deep {
    .v-text-field__slot input::placeholder {
      color: #a4a4a4;
    }
    .v-text-field__details {
      display: none;
    }
    .v-input__slot {
      margin-bottom: 0;
    }
  }
}

form {
  // background: #ffefa3;
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
        // border: 1px solid #e28637;
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
      // border: 1px solid #e28637 !important;
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

::-ms-input-placeholder {
  /* Edge 12-18 */
  color: red;
}
</style>