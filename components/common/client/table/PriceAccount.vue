<template>
  <tr>
    <th class="info-nick">
      <div style="margin: 10px"></div>
      Giá Bán
      <template v-if="hasDiscount">
        <br />
        <p class="text-danger">(Giảm giá: {{ account.active_discount }}%)</p>
      </template>
    </th>
    <td class="mua-nick">
      <span :class="{ 'text-line-middel text-danger text-bold': hasDiscount }">
        {{ format_number(account.selling_price) }} Vnđ
      </span>
      <template v-if="hasDiscount">
        <div class="divider"></div>
        <span class="text-bold">{{ format_number(account.price) }} Vnđ</span>
      </template>
    </td>
  </tr>
</template>
<script>
export default {
  props: {
    account: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {
    hasDiscount() {
      return this.account?.active_discount > 0;
    },
  },
};
</script>
<style lang="scss" scoped>
th.info-nick {
  width: 50%;
}
</style>
