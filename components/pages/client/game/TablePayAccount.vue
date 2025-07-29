<template>
  <table class="table">
    <tbody class="panel">
      <tr>
        <th class="info-nick">Mã Số:</th>
        <td class="mua-nick">
          <span>{{ format_number(account.id) }}</span>
        </td>
      </tr>

      <tr>
        <th class="info-nick">Nhà phát hành:</th>
        <td class="mua-nick">
          <span>TeaMobi</span>
        </td>
      </tr>

      <tr>
        <th class="info-nick">Tên game:</th>
        <td class="mua-nick">
          <span>{{ gameName }}</span>
        </td>
      </tr>

      <tr>
        <th class="info-nick">Giá tiền:</th>
        <td class="mua-nick">
          <span>{{ format_number(price) }} Card</span>
        </td>
      </tr>

      <tr>
        <th class="info-nick">
          ATM-MOMO:
          <template v-if="hasDiscount">
            <br />
            <p class="text-danger">(Giảm giá: {{ account.active_discount }}%)</p>
          </template>
        </th>
        <td class="mua-nick">
          <span :class="hasDiscount ? 'text-line-middel text-danger' : ''">
            {{ cash_atm(price) }} ATM - MOMO
          </span>

          <template v-if="hasDiscount">
            <div class="divider"></div>
            <span>{{ cash_atm(discountedPrice) }} ATM - MOMO</span>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    account: {
      type: Object,
      default: () => ({}),
    },
    accountType: {
      type: String,
      default: "",
    },
  },
  computed: {
    price() {
      return this.account.selling_price || this.account.price || 0;
    },
    hasDiscount() {
      return this.account.active_discount > 0;
    },
    discountedPrice() {
      return this.hasDiscount
        ? this.price * (1 - this.account.active_discount / 100)
        : this.price;
    },
    gameName() {
      switch (this.accountType) {
        case "ninja":
          return "Ninja School Online";
        case "avatar":
          return "Avatar";
        case "ngocrong":
          return "Ngọc Rồng Online";
        default:
          return "";
      }
    },
  },
};
</script>

<style scoped>
.divider {
  width: 100%;
  height: 1px;
  background-color: #a4a4a4;
  margin: 5px 0;
}
</style>
