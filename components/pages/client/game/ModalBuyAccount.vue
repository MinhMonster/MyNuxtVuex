
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
            <v-tab :value="1">Thanh Toán</v-tab>
            <v-tab :value="2">Tài Khoản</v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item :value="0">
              <TablePayAccount :account="account" :account-type="accountType" />
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
              label="Thanh toán bằng chuyển khoản"
            ></v-radio>
          </v-radio-group>

          <v-row v-if="isBuy == 'atm-momo'">
            <v-col cols="12" sm="12" md="12">
              <BuyAccountQRInstructions
                :account="account"
                :account-type="accountType"
              />
            </v-col>
          </v-row>
        </div>
      </template>
      <template #footer-content>
        <div v-if="!user" class="color-main mgb-10px">
          Bạn chưa Đăng nhập. Hãy Đăng nhập để mua.
        </div>
        <div v-else-if="Number(user.cash) < price" class="color-main mgb-10px">
          Số dư không đủ. Bạn còn thiếu:
          <span class="text-danger text-bold"
            >{{ format_number(price - Number(user.cash)) }} </span
          >Vnđ
        </div>
      </template>
      <template #footer-button>
        <v-btn
          v-if="!user"
          size="sm"
          color="success"
          class="btn-sm"
          @click="openModalLogin()"
          ><span>Đăng nhập</span></v-btn
        >
        <v-btn
          v-else-if="Number(user.cash) < price"
          size="sm"
          color="success"
          class="btn-sm text-black"
          @click="$router.push('/account/wallet/deposit/vnd')"
          ><span>Nap tiền</span></v-btn
        >

        <v-btn
          v-else
          color="success"
          :disabled="isLoading"
          class="btn-buy btn-sm"
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
import { mapActions, mapState } from "vuex";
import Loading from "@/components/global/molecules/common/Loading";
import ModalPayload from "@/components/common/ModalPayload";
import BuyAccountQRInstructions from "@/components/common/BuyAccountQRInstructions";
import TablePayAccount from "@/components/pages/client/game/TablePayAccount";

export default {
  components: {
    Loading,
    ModalPayload,
    BuyAccountQRInstructions,
    TablePayAccount,
  },
  props: {
    account: {
      type: Object,
      default: () => {},
    },
    accountType: {
      type: String,
      default: "ninja",
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
    ...mapState("home/users", ["token", "user"]),
    price() {
      return this.account.price;
    },
  },
  methods: {
    ...mapActions("home/users", ["buyAccount"]),
    openModalLogin() {
      this.$refs.modal.close();
      setTimeout(() => {
        this.showModalLoginRegister("login");
      }, 200);
    },

    async buyNow() {
      this.isLoading = true;

      const res = await this.buyAccount({
        account_code: this.account.code,
        account_type: this.accountType,
      });
      if (res?.data?.id) {
        this.$router.push(`/account/history/${res?.data?.id}`);
        this.showSwal({
          icon: "success",
          title: res?.data?.message || "Mua thành công!",
          html: "Vui lòng chờ vài phút <br/> Để Admin cập nhật thông tin <br/> Cảm ơn bạn đã sử dụng dịch vụ!",
        });
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
