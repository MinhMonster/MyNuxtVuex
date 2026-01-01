<template>
  <div class="base-tale">
    <div v-if="!noTotal" class="d-flex" align="center">
      <div>
        <v-card-title class="mgl--15px nowrap"
          >Record: {{ format_number(count) }}
        </v-card-title>
      </div>
      <v-spacer />
      <div class="mgr--5px mgt--10px right middle">
        <v-card-title class="right nowrap">
          <v-row>
            <v-col
              v-if="sum_value"
              cols="12"
              md="4"
              class="text-right text-20-500"
            >
              Total: {{ format_number(sum_value) }} Đ
            </v-col>
            <v-col
              v-if="cost_value"
              cols="12"
              md="4"
              class="text-right text-20-500"
            >
              Cost: {{ format_number(cost_value) }} Đ
            </v-col>
            <v-col
              v-if="profit_value"
              cols="12"
              md="4"
              class="text-right text-20-500"
            >
              Profit: {{ format_number(profit_value) }} Đ
            </v-col>
          </v-row>
        </v-card-title>
      </div>
    </div>
    <FormSearchAdmin
      v-if="haveStore"
      :module="module"
      :store-module="storeModule"
      :store-state="storeState"
      :state-query="stateQuery"
      @search="fetchData"
    />
    <BaseTable
      :columns="stateColumns"
      :data="dataSource"
      :meta="meta"
      @onChange="fetchData"
    >
      <template
        v-for="(column, index) in stateColumns"
        #[column.key]="{ row, value }"
      >
        <slot :name="column.key" :row="row" :value="value">
          <span v-html="columnsValue(column.type, value)" v-bind:key="index">
          </span>
          <ButtonCoppy
            v-if="column?.copy"
            :content="getValue(row, column)"
          ></ButtonCoppy>
        </slot>
      </template>
    </BaseTable>
  </div>
</template>
<script>
import FormSearchAdmin from "@/components/pages/admin/Shared/form/FormSearchAdmin";
import BaseTable from "@/components/base/BaseTable";
import ButtonCoppy from "@/components/common/ButtonCoppy";
import { mapState } from "vuex";

export default {
  components: {
    FormSearchAdmin,
    BaseTable,
    ButtonCoppy,
  },
  props: {
    store: {
      type: Object,
      default: () => {
        return {};
      },
      required: false,
    },
    module: {
      type: String,
      default: "",
      require: false,
    },
    defaultParams: {
      type: Object,
      default: () => {
        return {};
      },
      require: false,
    },
    repository: {
      type: String,
      default: "",
      require: false,
    },
    repositories: {
      type: String,
      default: "repositories",
      require: false,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    noTotal: Boolean,
    params: {
      type: Array,
      default: () => [],
      require: false,
    },
  },
  data() {
    return {
      response: {},
    };
  },
  computed: {
    repo() {
      return this.convertToCamelCase(this.module);
    },
    storeModule() {
      return this.convertToDot(this.module);
    },
    storeState() {
      return this.store?.state;
    },
    ...mapState({
      stateModule(state) {
        return _.get(state, this.storeModule);
      },
      repositoryKey(state) {
        return this[`$${this.stateModule.repositories || this.repositories}`];
      },
      stateQuery(state) {
        return this.stateModule[this.storeState] || {};
      },
      stateParamDefault(state) {
        return this.params.length > 0
          ? this.stateModule.paramDefaults || {}
          : {};
      },
      haveStore() {
        return !_.isEmpty(this.store);
      },
      meta() {
        if (this.haveStore) {
          return this.$store.getters[this.module + "/metaFilter"](
            this.storeState
          );
        }
        return get(this.response, "meta", defaultPagy);
      },
      dataSource() {
        if (this.haveStore) {
          return this.$store.getters[this.module + "/dataFilter"](
            this.storeState
          );
        }
        return get(this.response, "data", []);
      },
      count(state) {
        if (this.haveStore) {
          return this.stateQuery?.response?.count || 0;
        }
        return get(this.response, "count", 0);
      },
      sum_value(state) {
        if (this.haveStore) {
          return this.stateQuery?.response?.sum_value || 0;
        }
        return get(this.response, "sum_value", 0);
      },
      stateColumns(state) {
        return this.stateModule.columns || this.columns;
      },
      cost_value(state) {
        if (this.haveStore) {
          // const data
          return _.get(
            state,
            this.stateModule + "." + this.storeState + ".response.cost_value",
            0
          );
        }
        return get(this.response, "cost_value", 0);
      },
      profit_value(state) {
        if (this.haveStore) {
          // const data
          return _.get(
            state,
            this.stateModule +
              "." +
              this.storeState +
              ".response.profit_value",
            0
          );
        }
        return get(this.response, "profit_value", 0);
      },
      //   computed: {
      // ...mapFields("admin/histories/game_account_sold", {
      //   count: "queryGameAccountSolds.response.count",
      //   sum_value: "queryGameAccountSolds.response.sum_value",
      // }),
      // },
    }),
  },
  mounted() {},
  methods: {
    getValue(row, column) {
      const key = column.key;
      const value = _.get(
        row,
        `${column.key_main ? column.key_main + "." : ""}${key}`,
        null
      );
      return value;
    },
    valueCustom(row, column) {
      const value = this.getValue(row, column);
      return this.columnsValue(column.type, value);
    },
    onChange(page) {
      this.$emit("onChange", page);
    },
    async fetchData(page) {
      if (this.haveStore) {
        await this.$store.dispatch(this.module + "/setQueryPage", {
          stateName: this.storeState,
          data: page || this.stateQuery?.page?.value || 1,
        });
        this.fetchActions();
      } else {
      }
    },
    async fetchActions() {
      try {
        this.params.forEach((param, index) => {
          this.$store.dispatch(this.module + "/setParamDefault", {
            query: param.query,
            data: param.value,
          });
        });

        const { dataSearch, dataOrigin, dataRoute } =
          await this.$store.dispatch(
            this.module + "/convertDataSend",
            this.storeState
          );
        // console.log("stateParamDefault", this.stateParamDefault);
        const result = await this.repositoryKey[this.repo][this.store.action]({
          input: Object.assign(dataSearch, this.stateParamDefault),
        });

        dataOrigin.response = result.data.response;
        this.$store.dispatch(this.module + "/setState", {
          stateName: this.storeState,
          data: dataOrigin,
          query: dataRoute,
        });
      } catch (error) {
      }
    },
  },
  async created() {
    if (this.haveStore) {
      await this.$store.dispatch(this.module + "/passDataFromQuery", {
        stateName: this.storeState,
        query: this.$route.query,
      });
      this.fetchActions();
    }
  },
};
</script>
<style lang="scss" scoped>
#admin td ul li {
  padding: 10px 0;
}

.list-group-item,
.handle-items,
.handle-li {
  cursor: move;
}

/* .v-data-table > .v-data-table__wrapper > table > tbody > tr > td{
  padding: 0px;
} */

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td.padding-none,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th.padding-none {
  padding: 0px !important;
}

.hidden-border {
  border: none !important;
}

.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td.padding-none
  tr
  td:last-child {
  border-right: none !important;
}

.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td.padding-none
  tr
  td:first-child {
  border-left: none !important;
}

.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td.padding-none
  tr:last-child
  td {
  border-bottom: none !important;
}

.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td.padding-none
  tr:first-child
  td {
  border-top: none !important;
}

#admin
  .v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:nth-child(even)
  td {
  background: white !important;
}

#admin .v-data-table > .v-data-table__wrapper > table > tbody > tr td {
  border: none !important;
}

.theme--dark.v-data-table {
  background: white;
}

/* tr.table-main {
  border-bottom: 2px solid #333;
} */

/* tr.table-main > td {
  border: 2px solid #333 !important;
} */

/* .sub-table tr td:first-child{
  border-right: 2px solid #333 !important;;
} */

element.style {
}

/* #admin .table td {
  border: 1px solid var(--admin-table-border);
} */
#admin td.bg-dark {
  color: #333 !important;
  font-weight: 800;
  text-align: center;
}

.table.text-center tr,
.table.text-center th,
.table.text-center td {
  text-align: center !important;
  // min-width: 100px;
}

.table th {
  // min-width: 100px;
}

#admin .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 25px;
  font-size: 13.5px;
}

#admin .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  padding: 0 4px;
}
</style>
