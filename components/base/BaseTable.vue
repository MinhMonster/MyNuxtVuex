<template>
  <div class="base-tale">
    <v-simple-table v-bind="$attrs" v-on="$listeners" class="table">
      <thead>
        <tr>
          <th
            v-for="(column, indexColumn) in columns"
            :key="indexColumn"
            v-bind="column.attributes"
            class="text-left"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, indexRow) in data" :key="indexRow">
          <td v-for="(column, indexColumn) in columns" :key="indexColumn">
            <slot
              :name="column.key"
              :row="record"
              :column="column"
              :value="`${getValue(record, column)}`"
            >
              {{ valueCustom(record, column) }}
            </slot>
            <!-- <template #[column.key]="{ record }">
              <slot
                :name="column.key"
                :row="record"
                :value="`${getValue(record, column)}`"
              >
                {{ valueCustom(row, column) }}
              </slot>
            </template> -->
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <Pagination
      v-if="meta && meta.pages > 1"
      :meta="meta"
      @change="onChange"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from "@/components/global/molecules/common/Pagination";

export default {
  components: {
    Pagination,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
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
    return {};
  },
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
