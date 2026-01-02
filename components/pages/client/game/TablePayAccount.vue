<template>
  <table class="table">
    <tbody class="panel">
      <tr>
        <th class="info-nick w-50">Mã Số:</th>
        <td class="mua-nick w-50">
          <span>{{ format_number(account.code || account.id) }}</span>
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

      <!-- <tr>
        <th class="info-nick">Giá tiền:</th>
        <td class="mua-nick">
          <span>{{ format_number(price) }} Card</span>
        </td>
      </tr> -->
      <PriceAccount :account="account" />
    </tbody>
  </table>
</template>

<script>
import PriceAccount from "@/components/common/client/table/PriceAccount";

export default {
  components: {
    PriceAccount,
  },
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
</style>
