<template>
  <v-row class="py-2 action-group-container">
    <v-col cols="6" class="pa-1">
      <div class="btn-gaming-unified primary-glow" @click="showBank()">
        <BaseSvg content="Thanh Toán QR" name="next-right" />
      </div>
    </v-col>
    <v-col cols="6" class="pa-1">
      <div class="btn-gaming-unified" @click="showModal()">
        <BaseSvg content="Thanh Toán" name="next-right" />
      </div>
    </v-col>

    <v-col cols="6" class="pa-1">
      <a href="https://zalo.me/0961646828" target="_blank" class="no-underline">
        <div class="btn-gaming-unified">
          <BaseSvg content="Inbox Zalo" name="next-right" />
        </div>
      </a>
    </v-col>
    <v-col cols="6" class="pa-1">
      <a
        href="https://messenger.com/t/minh.docong.7"
        target="_blank"
        class="no-underline"
      >
        <div class="btn-gaming-unified">
          <BaseSvg content="Messenger" name="next-right" />
        </div>
      </a>
    </v-col>

    <ModalBuyAccount
      ref="modal"
      :account="account"
      :accountInfos="accountInfos"
    />
    <ModalBuyAccountVietQR ref="ModalBuyAccountVietQR" :account="account" />
  </v-row>
</template>

<script>
import ModalBuyAccount from "@/components/pages/client/game/ModalBuyAccount";
import ModalBuyAccountVietQR from "@/components/pages/client/game/ModalBuyAccountVietQR";

export default {
  name: "GroupBtnBuyAccount",
  components: {
    ModalBuyAccount,
    ModalBuyAccountVietQR,
  },
  props: {
    account: {
      type: Object,
      default: () => {},
    },
    accountInfos: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    showModal() {
      this.$refs.modal.show();
    },
    showBank() {
      this.$refs.ModalBuyAccountVietQR.show();
    },
  },
};
</script>
<style lang="scss" scoped>
.action-group-container {
  padding: 0 8px;
  padding-top: 16px !important;
}

.no-underline {
  text-decoration: none !important;
}

/* Riêng nút Thanh Toán QR có thể để Gradient để người dùng dễ nhận diện nhất */
.primary-glow {
  background: linear-gradient(135deg, #bd00ff 0%, #4a0063 100%) !important;
  border-color: #bd00ff !important;
  box-shadow: 0 0 15px rgba(189, 0, 255, 0.2);

  &:hover {
    filter: brightness(1.2);
    box-shadow: 0 0 20px rgba(189, 0, 255, 0.5);
  }
}
</style>
