
<template>
  <div>
    <ModalPayload
      ref="modal"
      :title="`XÁC NHẬN MUA TÀI KHOẢN`"
      :text-close="`Hủy`"
      :disabled-close="isLoading"
      size="md"
      @hide="close()"
    >
      <template #content>
        <div class="page-body">
          <v-tabs v-model="tab" align-tabs="center">
            <v-tab :value="0">Thanh Toán</v-tab>
            <v-tab :value="1">Thông Tin</v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item :value="0">
              <AccountInfoTable :account="account" :accountInfos="gameInfos" />
            </v-window-item>
            <v-window-item :value="1">
              <AccountInfoTable
                :account="account"
                :account-infos="accountInfos"
              />
            </v-window-item>
          </v-window>
          <v-radio-group v-model="isBuy">
            <v-radio
              name="some-radios"
              value="wallet"
              label="Thanh toán bằng số dư"
            ></v-radio>
            <v-radio
              name="some-radios"
              value="atm-momo"
              label="Thanh toán bằng chuyển khoản"
            ></v-radio>
          </v-radio-group>

          <v-row v-if="isBuy == 'atm-momo'">
            <v-col cols="12" sm="12" md="12">
              <BuyAccountQRInstructions :account="account" />
            </v-col>
          </v-row>
        </div>
      </template>
      <template #footer-content>
        <div v-if="!isLogin" class="color-main mgb-10px">
          Bạn chưa Đăng nhập. Hãy Đăng nhập để mua.
        </div>
        <div
          v-else-if="Number(userInfo.cash) < price"
          class="color-main mgb-10px"
        >
          Số dư không đủ. Bạn còn thiếu:
          <span class="text-danger text-bold"
            >{{ format_number(price - Number(userInfo.cash)) }} </span
          >Vnđ
        </div>
      </template>
      <template #footer-button>
        <v-btn v-if="!isLogin" class="btn-neon-purple" @click="openModalLogin()"
          ><span>Đăng nhập</span></v-btn
        >
        <v-btn
          v-else-if="Number(userInfo.cash) < price"
          color="success"
          class="text-black"
          @click="$router.push('/account/wallet/deposit/bank')"
          ><span>Nap tiền</span></v-btn
        >

        <v-btn
          v-else
          class="btn-neon-purple"
          :disabled="isLoading"
          @click="buyNow()"
        >
          <Loading v-if="isLoading" button></Loading>
          <span v-else> Thanh Toán </span>
        </v-btn>
      </template>
    </ModalPayload>
  </div>
</template>

<script>
import Loading from "@/components/global/molecules/common/Loading";
import ModalPayload from "@/components/common/ModalPayload";
import BuyAccountQRInstructions from "@/components/common/BuyAccountQRInstructions";
import AccountInfoTable from "@/components/common/client/table/AccountInfoTable.vue";

export default {
  name: "ModalBuyAccount",
  components: {
    Loading,
    ModalPayload,
    BuyAccountQRInstructions,
    AccountInfoTable,
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
  data() {
    return {
      tab: null,
      isBuy: "wallet",
      isLoading: false,
    };
  },
  computed: {
    price() {
      return this.account.price;
    },
    gameName() {
      switch (this.account.account_type) {
        case "ninja":
          return "Ninja School Online";
        case "avatar":
          return "Avatar DK";
        case "dragon_ball":
          return "Ngọc Rồng Online";
        default:
          return "";
      }
    },
    gameInfos() {
      return [
        {
          label: "Mã Số",
          value: this.format_number(this.account.code || this.account.id),
        },
        {
          label: "Tên game",
          value: this.gameName,
        },
        {
          label: "Nhà phát hành",
          value: "TeaMobi",
        },
      ];
    },
  },
  methods: {
    openModalLogin() {
      this.$refs.modal.close();
      setTimeout(() => {
        this.showModalLoginRegister("login");
      }, 200);
    },

    async buyNow() {
      try {
        this.isLoading = true;
        const res =
          await await this.$repositories.clientAccountPurchases.purchase({
            account_code: this.account.code,
            account_type: this.account.account_type,
          });
        const accountId = res?.data.data?.id;
        if (accountId) {
          this.$router.push(`/account/purchases/${accountId}`);
          this.showSwal({
            icon: "success",
            title: res?.data?.message || "Mua thành công!",
            html: "Vui lòng chờ vài phút <br/> Để Admin cập nhật thông tin <br/> Cảm ơn bạn đã sử dụng dịch vụ!",
          });
        }
      } finally {
        this.isLoading = false;
      }
    },
    show() {
      this.$refs.modal.show();
    },
    close() {
      this.$emit("hide");
    },
  },
};
</script>
