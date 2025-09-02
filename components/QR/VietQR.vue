<template>
  <div>
    <div class="vietqr text-center">
      <h3>Quét mã để chuyển khoản</h3>
      <img
        class="qr"
        :src="vietQRUrl"
        :alt="`QR chuyển tiền ${bankId}`"
        width="250"
        height="250"
      />
    </div>
    <slot name="info">
      <p><strong>Ngân hàng:</strong> {{ bankId }}</p>
      <p><strong>Số tài khoản:</strong> {{ accountNo }}</p>
      <p><strong>Số tiền:</strong> {{ amount.toLocaleString() }} VND</p>
      <p><strong>Nội dung:</strong> {{ addInfo }}</p>
    </slot>
  </div>
</template>

<script>
export default {
  name: "VietQR",
  props: {
    bankId: { type: String, required: true },
    accountNo: { type: String, required: true },
    amount: { type: Number, default: 0 },
    addInfo: { type: String, default: "" },
  },
  computed: {
    vietQRUrl() {
      return `https://img.vietqr.io/image/${this.bankId}-${
        this.accountNo
      }-compact2.png?amount=${this.amount}&addInfo=${encodeURIComponent(
        this.addInfo
      )}`;
    },
  },
};
</script>

<style scoped>
.vietqr {
  margin: 20px auto;
}
.vietqr .qr {
  border: 2px solid #eee;
  border-radius: 12px;
  padding: 8px;
  background: #fff;
}
</style>
