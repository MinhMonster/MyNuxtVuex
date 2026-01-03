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
<style lang="scss" scoped>
th.info-nick {
  width: 50%;
  // min-width: 120px;
  padding: 7px;
  color: #ffcf9c;
  border: 1px solid #663019;
  background: #e28637;

  &.detail {
    vertical-align: middle;
  }
}

.btn-buy-account,
.mua-nick {
  cursor: pointer;
  padding: 6.5px;
  color: #663019;
  border: 1px solid #663019;
  background: #ffcf9c;
  border-radius: 3px !important;
  text-align: center;
}

.btn-buy-account-hover {
  color: #ffcf9c;
  background: #e28637;
  border: 1px solid #663019;
}

.table td {
  padding: 5px;
  vertical-align: top;
  border: 1px solid #e28637;
}

.mua-nick span {
  font-size: 14px;
  font-weight: 400;
  color: #663019;
  ::v-deep {
    p {
      margin-bottom: 8px;
    }
  }
}
</style>
