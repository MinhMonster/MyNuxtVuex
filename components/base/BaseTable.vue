<template>
  <div
    class="base-table table table-striped table-border"
    :class="{ 'table-responsive': responsive }"
  >
    <v-simple-table v-bind="$attrs" v-on="$listeners" class="table">
      <thead>
        <tr>
          <th
            v-for="(column, indexColumn) in columns"
            :key="indexColumn"
            v-bind="column.attributes"
            :class="getStickyClass(column)"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, indexRow) in data" :key="indexRow">
          <td
            v-for="(column, indexColumn) in columns"
            :key="indexColumn"
            v-bind="column.attributes"
            :class="getStickyClass(column)"
          >
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
    <div v-if="!data.length" class="text-center">
      <span> {{ empty }}</span>
    </div>
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
    empty: {
      type: String,
      default: "Empty",
    },
    responsive: Boolean,
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
    getStickyClass(column) {
      const fixed = column.fixed;
      const customClass = column?.class;
      if (["left", "right"].includes(fixed)) {
        return `${customClass} sticky-column-${fixed}`;
      }
      return customClass;
    },
    onChange(page) {
      this.$emit("onChange", page);
    },
  },
};
</script>

<style lang="scss" scoped>
.list-group-item,
.handle-items,
.handle-li {
  cursor: move;
}

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

.theme--dark.v-data-table {
  background: none;
}

.sticky-column-left {
  position: sticky;
  left: 0;
  z-index: 2;
}

.sticky-column-right {
  position: sticky;
  right: 0;
  z-index: 2;
}
</style>
