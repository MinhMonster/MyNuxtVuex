
<template>
  <div>
    <ModalPayload
      ref="modal"
      :title="`XÁC NHẬN MUA TÀI KHOẢN`"
      :text-close="`Hủy`"
      size="md"
      @hide="close()"
    >
      <template #content>
        <div class="page-body">
          <v-tabs v-model="tab" align-tabs="center">
            <v-tab :value="1">Thanh Toán</v-tab>
            <v-tab :value="2">Tài Khoản</v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item :value="0">
              <TablePayAccount :account="account" :game="game" />
            </v-window-item>
            <v-window-item :value="1">
              <slot name="account-info"></slot>
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
              label="Thanh toán bằng Atm - Momo"
            ></v-radio>
          </v-radio-group>

          <v-row v-if="isBuy == 'atm-momo'">
            <v-col cols="12" sm="12" md="12">
              <AccountNumbeAdmin />
            </v-col>

            <v-col cols="12" sm="12" md="12">
              <BuyAccountInstructions :account="account" :account-type="game" />
            </v-col>
          </v-row>
        </div>
      </template>
      <template #footer-content>
        <div v-if="!user" class="color-main mgb-10px">
          Bạn chưa Đăng nhập. Hãy Đăng nhập để mua.
        </div>
        <div v-else-if="Number(user.cash) < price" class="color-main mgb-10px">
          Số dư không đủ. Hãy nạp thêm tiền để mua.
        </div>
      </template>
      <template #footer-button>
        <v-btn v-if="!user" size="sm" color="success" to="/login"
          ><span>Đăng nhập</span></v-btn
        >
        <v-btn
          v-else-if="Number(user.cash) < price"
          color="success"
          to="/account/wallet/deposit/vnd"
          ><span>Nap tiền</span></v-btn
        >

        <v-btn v-else color="success" class="btn-buy" @click="buyNow()">
          <Loading v-if="isLoading" button></Loading>
          <span v-else> Thanh Toán </span>
        </v-btn>
      </template>
    </ModalPayload>
  </div>
</template>
  
<script>
import { mapActions, mapState } from "vuex";
import Loading from "@/components/global/molecules/common/Loading";
import ModalPayload from "@/components/common/ModalPayload";
import AccountNumbeAdmin from "@/components/common/AccountNumbeAdmin";
import BuyAccountInstructions from "@/components/common/BuyAccountInstructions";
import TablePayAccount from "@/components/pages/client/game/TablePayAccount";

export default {
  components: {
    Loading,
    ModalPayload,
    AccountNumbeAdmin,
    BuyAccountInstructions,
    TablePayAccount,
  },
  props: {
    account: {
      type: Object,
      default: () => {},
    },
    game: {
      type: String,
      default: "Ninja School Online",
    },
  },
  data() {
    return {
      tab: null,
      isBuy: "wallet",
      isLoading: false,
    };
  },
  async mounted() {},
  computed: {
    ...mapState("home/users", ["token", "user"]),
    price() {
      return this.account.giatien || this.account.price;
    },
  },
  methods: {
    ...mapActions("home/users", ["buyAccount"]),

    async buyNow() {
      this.isLoading = true;

      const res = await this.buyAccount({
        id: this.account.ID,
        game: this.game,
      });
      if (res.historyId) {
        this.$router.push(`/account/history/${res.historyId}`);
      }
      this.isLoading = false;
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
  
  <style lang="scss" scoped>
th.info-nick {
  width: 50%;
  padding: 7px;
  color: #ffcf9c;
  border: 1px solid #663019;
  background: #e28637;
}
.btn-buy-account,
.mua-nick {
  cursor: pointer;
  padding: 5px;
  color: #663019;
  border: 1px solid #663019;
  background: #ffcf9c;
}

.btn-buy-account-hover {
  color: #ffcf9c;
  border: 1px solid #663019;
  background: #e28637;
}
.btn-buy-account,
.btn-buy-account-hover,
.mua-nick {
  padding: 6.5px;
  border-radius: 3px !important;
  text-align: center;
}
.table td {
  padding: 5px;
  vertical-align: top;
  border: 1px solid #e28637;
}
.mua-nick span {
  font-size: 14px;
  font-weight: 400;
  color: #663019;
}
::v-deep {
  .tab-content {
    padding: 5px;
  }
  .form-group {
    padding: 5px;
    margin-bottom: 0px;
  }

  .custom-control-label::before {
    top: 0;
  }
  .custom-control-label::after {
    top: 0;
  }
}
.row {
  padding: 0;
  margin: 0px;
  .col-md-12 {
    margin: 0px;
    padding: 0px;
    .info-atm-momo {
      border: 1px solid #663019;
      background: #ffcf9c;
      margin: 5px;
      padding: 5px;
      line-height: 25px;
      font-size: 14px;
    }
  }
}
</style>
