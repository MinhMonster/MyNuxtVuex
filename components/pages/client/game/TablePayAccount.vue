<template>
  <table class="table">
    <tbody class="panel">
      <tr>
        <th class="info-nick w-50">Mã Số:</th>
        <td class="mua-nick w-50">
          <span>{{ format_number(account.ID) }}</span>
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
          <span>{{ game }}</span>
        </td>
      </tr>

      <!-- <tr>
        <th class="info-nick">Giá tiền:</th>
        <td class="mua-nick">
          <span>{{ format_number(price) }} Card</span>
        </td>
      </tr> -->

      <tr>
        <th class="info-nick">
          Giá tiền:
          <template v-if="hasDiscount">
            <br />
            <p class="text-danger">(Giảm giá: {{ account.saleOff }}%)</p>
          </template>
        </th>
        <td class="mua-nick">
          <span :class="hasDiscount ? 'text-line-middel text-danger' : ''">
            {{ format_number(price) }} Vnđ
          </span>

          <template v-if="hasDiscount">
            <div class="divider"></div>
            <span>{{ format_number(priceSalling) }} Vnđ</span>
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
    game: {
      type: String,
      default: "",
    },
  },
  computed: {
    price() {
      return this.account.price || this.account.giatien || 0;
    },
    priceSalling() {
      return this.account.priceSalling || this.account.giatien || 0;
    },
    hasDiscount() {
      return this.account.saleOff > 0;
    },
  },
};
</script>

<style scoped>
</style>
