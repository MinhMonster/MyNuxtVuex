<template>
  <div class="base-tale">
    <div class="d-flex" align="center">
      <div>
        <v-card-title class="mgl--15px"
          >Record: {{ format_number(count) }}
        </v-card-title>
      </div>
      <v-spacer />
      <div class="mgr--15px right middle">
        <v-card-title>Total: {{ format_number(sum_value) }} Đ </v-card-title>
      </div>
    </div>
    <FormSearchAdmin
      v-if="haveStore"
      :store="store"
      :module="module"
      @search="fetchData"
    />
    <BaseTable
      :columns="columns"
      :data="dataSource"
      :meta="pagy"
      @onChange="fetchData"
    >
      <template v-for="column in columns" #[column.key]="{ row, value }">
        <slot :name="column.key" :row="row" :value="value">{{
          columnsValue(column.type, value)
        }}</slot>
      </template></BaseTable
    >
  </div>
</template>
<script>
import FormSearchAdmin from "@/components/pages/admin/Shared/form/FormSearchAdmin";
import BaseTable from "@/components/base/BaseTable";
import { mapState } from "vuex";

export default {
  components: {
    FormSearchAdmin,
    BaseTable,
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
    meta: {
      type: Object,
      default: () => {},
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      response: {},
    };
  },
  computed: {
    ...mapState({
      stateQuery(state) {
        return _.get(state, this.store.module + "." + this.store.state, {});
      },
      haveStore() {
        return !_.isEmpty(this.store);
      },
      // dataSource(state) {
      //   if (this.haveStore) {
      //     // const data
      //     return _.get(
      //       state,
      //       this.store.module + "." + this.store.state + ".response.data",
      //       []
      //     );
      //   }
      //   return get(this.response, "data", []);
      // },
      // pagy(state) {
      //   if (this.haveStore) {
      //     return _.get(
      //       state,
      //       this.store.module + "." + this.store.state + ".response.meta",
      //       []
      //     );
      //   }
      //   return get(this.response, "meta", defaultPagy);
      // },
      pagy() {
        if (this.haveStore) {
          return this.$store.getters[this.module + "/metaFilter"](
            this.store.state
          );
        }
        return get(this.response, "meta", defaultPagy);
      },
      dataSource() {
        if (this.haveStore) {
          return this.$store.getters[this.module + "/dataFilter"](
            this.store.state
          );
        }
        return get(this.response, "data", []);
      },
      count(state) {
        if (this.haveStore) {
          // const data
          return _.get(
            state,
            this.store.module + "." + this.store.state + ".response.count",
            0
          );
        }
        return get(this.response, "count", 0);
      },
      sum_value(state) {
        if (this.haveStore) {
          // const data
          return _.get(
            state,
            this.store.module + "." + this.store.state + ".response.sum_value",
            0
          );
        }
        return get(this.response, "sum_value", 0);
      },
      //   computed: {
      // ...mapFields("admin/histories/game_account_sold", {
      //   count: "queryGameAccountSolds.response.count",
      //   sum_value: "queryGameAccountSolds.response.sum_value",
      // }),
      // },
    }),

    // dataSource() {
    //   if (this.haveStore) {
    //     _.get(state, this.store.module + "." + this.store.query + ".response.data", [])
    //   }
    //   return get(this.response, "data", []);
    // },
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
          stateName: this.store.state,
          data: page || this.stateQuery.page.value || 1,
        });

        this.fetchActions();
      } else {
        // try {
        //   console.log(params, 'params')
        //   this.loading = true
        //   const api = getRepository(this.module, this.paramsRepository)
        //   params = { ...params, ...this.defaultParams }
        //   if (this.type == 'main') {
        //     this.fullResponse = await api.all(params)
        //     this.response = get(this.fullResponse, pluralize(this.module, 2), {})
        //   } else {
        //     const { id, relation } = this.relation
        //     const relationCustom = pluralize(relation, 2)
        //     const relationQuery = this.relation.notQuery ? '' : relationCustom
        //     this.fullResponse = await api.findModuleRelation(id, relationQuery, params)
        //     this.response = get(this.fullResponse, pluralize(relationCustom, 2), {})
        //   }
        //   this.updateParams()
        //   this.$emit('fullResponse', this.fullResponse)
        //   this.$emit('response', this.response)
        // } catch (e) {
        //   console.log(e)
        // }
        // this.loading = false
      }
    },
    async fetchActions() {
      try {
        // await this.$store.dispatch(this.module + "/resetData", this.store.state);
        const { dataSearch, dataOrigin, dataRoute } =
          await this.$store.dispatch(
            this.module + "/convertDataSend",
            this.store.state
          );
        const result = await this.$repositories[this.repository][
          this.store.action
        ]({
          input: dataSearch,
        });

        dataOrigin.response = result.data.response;
        this.$store.dispatch(this.module + "/setState", {
          stateName: this.store.state,
          data: dataOrigin,
          query: dataRoute,
        });
      } catch (error) {
        // console.log("error", error);
      }
    },
  },
  async created() {
    // if (!this.notImmediateFetch && !this.haveStore) {
    //   this.fetchData(this.stateQuery.page.value);
    // }
    if (this.haveStore) {
      await this.$store.dispatch(this.module + "/passDataFromQuery", {
        stateName: this.store.state,
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
  min-width: 100px;
}

.table th {
  min-width: 100px;
}

#admin .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 25px;
  font-size: 13.5px;
}

#admin .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  padding: 0 4px;
}
</style>
