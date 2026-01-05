<template>
  <v-row>
    <v-col cols="6">
      <div class="btn-buy-account" @click="showBank()">
        <BaseSvg content="Thanh Toán QR" name="next-right" />
      </div>
    </v-col>
    <v-col cols="6">
      <div class="c-font-uppercase btnCheckAccount ajax" @click="showModal()">
        <div class="btn-buy-account-hover">
          <BaseSvg content="Thanh Toán" class="text-main" name="next-right" />
        </div>
      </div>
    </v-col>

    <v-col cols="6">
      <a href="https://zalo.me/0961646828" target="_blank">
        <div class="btn-buy-account-hover">
          <BaseSvg content="Inbox Zalo" name="next-right" />
        </div>
      </a>
    </v-col>
    <v-col cols="6">
      <div class="c-font-uppercase btnCheckAccount ajax">
        <a href="https://messenger.com/t/minh.docong.7" target="_blank">
          <div class="btn-buy-account">
            <BaseSvg content="Messenger" class="text-main" name="next-right" />
          </div>
        </a>
      </div>
    </v-col>
    <ModalBuyAccount
      ref="modal"
      :account="account"
      :account-infos="accountInfos"
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
</style>
