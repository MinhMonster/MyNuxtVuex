<template>
  <div v-if="active & isFilter">
    <!-- <div class='icon-search'>
      <FilterFilled :style="{fontSize: '20px', color: '#7A40EE', fontWeight: 'bold'}"
                    @click='show = !show'></FilterFilled>
    </div> -->
    <form @submit.prevent="handleSearch" class="form-search-admin">
      <v-row>
        <v-col
          v-for="(item, key) in stateQuery"
          cols="12"
          sm="4"
          md="3"
          lg="2"
          :key="key"
          v-show="item.show"
        >
          <div class="field">
            <!-- <form-validator name="id"> -->
            <v-text-field
              v-if="item.type === 'text'"
              v-model="item.value"
              @change="changeData"
              density="compact"
              :label="item.title"
              :placeholder="item.placeholder"
              variant="outlined"
            ></v-text-field>
            <v-select
              v-if="item.type === 'select-options'"
              v-model="item.value"
              density="compact"
              :label="item.title"
              :placeholder="item.placeholder"
              :items="item.options"
              @change="changeData"
            ></v-select>
            <!-- </form-validator> -->
          </div>
        </v-col>
        <!-- <a-form-item v-if="key != 'response' && key != 'order' " v-show='item.show' :key='key' :label='item.title'>
          <base-date v-if="item.type == 'range_date_time'" v-model:value='item.value'
                     :timezone-out="item.more_data.utc ? 'UTC' : 'current'"
                     :placeholder="item.placeholder"
                     type='range_date_time'
                     format='YYYY-MM-DD HH:mm'
                     @change='changeData'
          >
          </base-date>
          <base-select v-model:value='item.value' v-if="item.type == 'select_load_more'"
                       @change='changeData'
                       :default-value='item.value ? [item.value] : null'
                       :use-load-more='item.more_data ? item.more_data.useLoadMore : {}'
          >
          </base-select>
          <a-select v-model:value='item.value' v-if="item.type == 'select_options'" :allow-clear="item.clear">
            <a-select-option v-for="(option, index) in item.options" :value="option.value" :key="index">
              {{ option.title }}
            </a-select-option>
          </a-select>
          <a-input v-if="item.type == 'text'" v-model:value='item.value' @change='changeData'></a-input>
        </a-form-item> -->

        <!-- <a-form-item class='group-btn'>
        <a-button type='primary' html-type='submit'>Search</a-button>
        <a-button class='btn-default' @click='handleReset'>Reset filters, sorters</a-button>
        <a class='collapse' @click='show = false'>
          <UpOutlined></UpOutlined>
          Collapse
        </a>
      </a-form-item> -->
        <v-col cols="6" sm="3" md="2">
          <v-btn type="submit" class="btn search-btn" @click="handleSearch()">
            <i class="fa fa-search"></i> Search
          </v-btn>
        </v-col>
        <v-col cols="6" sm="3" md="2">
          <v-btn
            class="btn btn-success btn-search text-white w-100"
            @click="handleReset()"
            ><i class="fa fa-list"></i> Reset</v-btn
          >
        </v-col>
      </v-row>
    </form>
  </div>
</template>
<script>
// import _ from 'lodash'
// import { FilterFilled, UpOutlined } from '@ant-design/icons-vue'
import { mapState, mapActions } from "vuex";

export default {
  // components: { FilterFilled, UpOutlined },
  props: {
    store: {
      type: Object,
      default: () => {
        return {};
      },
    },
    module: {
      type: String,
      default: "",
      require: false,
    },
  },
  data() {
    return {
      show: true,
      searched: true,
    };
  },
  methods: {
    changeData() {
      this.searched = false;
    },
    ...mapActions({
      resetQuery(dispatch) {
        return dispatch(this.module + "/resetData", this.store.state);
      },
      handleSearch(dispatch) {
        console.log("handleSearch");
        this.$store.dispatch(this.module + "/setQuery", {
          stateName: this.store?.state,
          data: this.stateQuery,
        });
        dispatch(this.module + "/resetDataPage", this.store.state);
        dispatch(this.module + "/" + this.store.action);
        this.$nextTick(() => {
          this.searched = true;
        });
      },
    }),
    handleReset() {
      this.resetQuery();
      try {
        this.$nextTick(() => {
          const data = document.querySelectorAll(
            ".ant-select-item-option-active"
          );
          data.forEach((item) => {
            item.classList.remove("ant-select-item-option-active");
          });
        });
      } catch (e) {}
      this.handleSearch();
    },
  },
  unmounted() {
    if (!this.searched) {
      this.resetQuery();
    }
  },
  computed: {
    active() {
      //@ts-ignore
      return (
        Object.values(this.stateQuery).filter((item) => {
          return item.show;
        }).length != 0
      );
    },
    ...mapState({
      stateQuery(state) {
        return _.cloneDeep(
          _.get(state, this.store.module + "." + this.store.state, {})
        );
      },
      // stateQuery2: {
      //   get() {
      //     return _.cloneDeep(
      //       _.get(state, this.store.module + "." + this.store.state, {})
      //     );
      //   },
      //   set(value) {
      //     this.setQueryNinja({
      //       index: this.index,
      //       value: { ...this.action, title: _.cloneDeep(value) },
      //     });
      //   },
      // },
    }),
  },
};
</script>
<style lang='scss' scoped>
.form-search-admin {
  background: #fff;
  border-radius: 0px;
  // margin: -6px;
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
  ::v-deep {
    .v-select__slot {
      border: 1px solid #ccc;
      color: #333;
      // padding-left: 10px;
      // height: 40px;
      /* margin-top: 10px; */
      .v-select__selection {
        &.v-select__selection--comma {
          color: #000;
          padding-left: 10px;
        }
      }
      input {
        border: none !important;
        display: none !important;
      }
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
  // padding: 10px;
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
// .form-filter {
//   border: 1px solid var(--border-primary);
//   margin-bottom: 8px;
//   padding: 20px;
//   border-radius: 8px;
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 20px;

//   :deep(input),
//   :deep(.ant-select-selector),
//   :deep(.ant-picker) {
//     padding: 0 16px;
//     height: 48px;
//     border-radius: 10px;
//     background-color: var(--background-primary-2) !important;
//     border: none;
//     color: var(--text-primary-1);
//     line-height: 30px;
//   }

//   .ant-form-item {
//     display: block;
//     text-align: left;
//     border-radius: 10px;
//     margin-bottom: 0;

//     :deep(.ant-select-selection-search),
//     :deep(.ant-select-selection-item) {
//       display: flex;
//       align-items: center;
//     }

//     :deep(svg) {
//       color: white;
//     }
//   }

//   > * {
//     width: 100%;
//   }

//   :deep(.ant-form-item-label) {
//     label {
//       color: white;
//       font-size: 12px;
//     }

//     -webkit-user-select: none;
//     -moz-user-select: none;
//     user-select: none;
//   }

//   .ant-picker {
//     width: 100%;
//   }

//   :deep(.group-btn) {
//     height: 100%;
//     padding-top: 35px;

//     .ant-form-item-control-input-content {
//       display: flex;
//       gap: 20px;
//       align-items: center;

//       button {
//         height: 36px;
//         padding: 0 20px;

//         &.btn-default {
//           background: var(--background-primary-1);
//           border: 1px solid var(--primary-color);

//           span {
//             color: var(--primary-color);
//           }
//         }

//         span {
//           color: white;
//         }
//       }
//     }

//     .collapse {
//       white-space: nowrap;

//       &:hover {
//         color: var(--primary-color);
//         opacity: 0.9;
//       }

//       * {
//         color: var(--primary-color);
//       }
//     }
//   }
// }

// .icon-search {
//   margin-bottom: 8px;
//   cursor: pointer;
//   margin-left: auto;
//   margin-right: 1px;
//   width: 36px;
//   height: 36px;
//   border-radius: 6px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: var(--background-primary-1);

//   &:hover {
//     opacity: 0.9;
//   }
// }
</style>
