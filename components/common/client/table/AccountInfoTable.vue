<template>
  <table class="table text-center">
    <tbody>
      <tr v-for="(row, index) in items" :key="'row-' + index">
        <th class="info-nick">
          {{ row.label }}
        </th>

        <td class="mua-nick">
          <span v-if="!row.html">
            {{ row.value }}
          </span>
          <span v-else v-html="row.value"></span>
        </td>
      </tr>
      <PriceAccount :account="account" />
    </tbody>
  </table>
</template>

<script>
import PriceAccount from "@/components/common/client/table/PriceAccount";

export default {
  name: "AccountInfoTable",
  components: {
    PriceAccount,
  },
  props: {
    account: {
      type: Object,
      default: () => {},
    },
    /**
     * items = [
     *   { label, value },
     *   { label, value, html: true }
     * ]
     */
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
