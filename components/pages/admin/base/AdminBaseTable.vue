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
              v-if="sums['selling_price'] || null"
              cols="12"
              md="4"
              class="text-right text-20-500"
            >
              Total: {{ format_number(sums["selling_price"]) }} Đ
            </v-col>
            <v-col
              v-if="sums['purchase_price'] || null"
              cols="12"
              md="4"
              class="text-right text-20-500"
            >
              Cost: {{ format_number(sums["purchase_price"]) }} Đ
            </v-col>
            <v-col
              v-if="
                (sums['selling_price'] || null) &&
                (sums['purchase_price'] || null)
              "
              cols="12"
              md="4"
              class="text-right text-20-500"
            >
              Profit:
              {{
                format_number(sums["selling_price"] - sums["purchase_price"])
              }}
              Đ
            </v-col>
          </v-row>
        </v-card-title>
      </div>
    </div>
    <FormSearchAdmin
      :module="module"
      :store-module="storeModule"
      :store-state="storeQueryItems"
      :state-query="stateQueryItems"
      @search="onChangePage"
    />
    <BaseTable
      :columns="stateColumns"
      :data="dataSource"
      :meta="meta"
      @onChange="onChangePage"
    >
      <template
        v-for="(column, index) in stateColumns"
        #[column.key]="{ row, value }"
      >
        <slot :name="column.key" :row="row" :value="value">
          <OptionDisplay
            v-if="column.type === 'option-display'"
            :value="getValue(row, column)"
            :options="column.options"
          />
          <v-icon
            v-else-if="
              column.type === 'is-lengthy' &&
              (getValue(row, column) || []).length > 0
            "
            color="blue"
            small
          >
            mdi-check-circle
          </v-icon>
          <BaseCheckBox
            v-else-if="column.type === 'checkbox'"
            :value="getValue(row, column)"
            @change="$emit('changeCheckbox', { row, column, value: $event })"
          />
          <template v-else>
            <span
              v-html="columnsValue(column.type, value)"
              v-bind:key="index"
            ></span>
            <ButtonCoppy
              v-if="column?.copy"
              :content="getValue(row, column)"
            ></ButtonCoppy>
          </template>
        </slot>
      </template>
    </BaseTable>
  </div>
</template>
<script>
import FormSearchAdmin from "@/components/pages/admin/Shared/form/FormSearchAdmin";
import BaseTable from "@/components/base/BaseTable";
import ButtonCoppy from "@/components/common/ButtonCoppy";
import OptionDisplay from "@/components/common/client/button/OptionDisplay.vue";
import BaseCheckBox from "@/components/pages/admin/base/form/BaseCheckBox";
import adminCrud from "@/mixins/adminCrud";

export default {
  mixins: [adminCrud],
  components: {
    FormSearchAdmin,
    BaseTable,
    ButtonCoppy,
    OptionDisplay,
    BaseCheckBox,
  },
  props: {
    noTotal: Boolean,
    params: {
      type: Array,
      default: () => [],
      require: false,
    },
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
  },
  async created() {
    await this.storeDispatch("passDataFromQuery", {
      stateName: this.storeQueryItems,
      query: this.$route.query,
    });
    this.fetchDataIndex();
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
