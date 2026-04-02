
<template>
  <div>
    <ModalPayload
      ref="modal"
      title="XÁC NHẬN THANH TOÁN"
      :text-close="`Hủy`"
      :disabled-close="isLoading"
      size="md"
      @hide="close()"
    >
      <template #content>
        <div class="page-body">
          <AccountInfoTable
            :accountInfos="accountInfos"
            :purchaseType="purchaseType"
            :hiddenPrice="true"
          />

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
              <SettlementHistoryQRInstructions :history="history" />
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
import SettlementHistoryQRInstructions from "@/components/common/SettlementHistoryQRInstructions";
import AccountInfoTable from "@/components/common/client/table/AccountInfoTable.vue";
import DepositRegulations from "@/components/pages/client/game/DepositRegulations";
import InstallmentsRegulations from "@/components/pages/client/game/InstallmentsRegulations";

export default {
  name: "ModalBuyAccount",
  components: {
    Loading,
    ModalPayload,
    SettlementHistoryQRInstructions,
    AccountInfoTable,
    DepositRegulations,
    InstallmentsRegulations,
  },
  props: {
    history: {
      type: Object,
      default: () => {},
    },
    accountInfos: {
      type: Array,
      default: () => [],
    },
    purchaseType: {
      type: String,
      default: "normal", // normal | installments | deposit
    },
  },
  data() {
    return {
      isBuy: "wallet",
      isLoading: false,
    };
  },
  computed: {
    price() {
      return this.history?.second_paid_amount || 0;
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
        const historyId = this.history.id;
        const res =
          await this.$repositories.clientAccountPurchases.payRemaining(
            historyId
          );
        this.showSwal({
          icon: "success",
          title: res?.data?.message || "Giao dịch thành công!",
          html: "Cảm ơn bạn đã sử dụng dịch vụ!",
        });
        await this.$refs.modal.close();
        this.$emit("payment-success");
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
