<template>
  <VietQR
    bankId="MB"
    accountNo="MuaBanNick"
    :amount="amount"
    :addInfo="addInfo"
  >
    <template #info>
      <slot name="info"></slot>
    </template>
  </VietQR>
</template>

<script>
import VietQR from "~/components/QR/VietQR.vue";
export default {
  name: "VietQRMB",
  props: {
    amount: { type: Number, default: 0 },
    addInfo: { type: String, default: "" },
  },
  components: {
    VietQR,
  },
};
</script>

<style scoped>
</style>
