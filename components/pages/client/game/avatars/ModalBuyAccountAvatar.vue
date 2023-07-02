
<template>
  <div>
    <ModalPayload
      :title="`XÁC NHẬN MUA TÀI KHOẢN`"
      :text-close="`Hủy`"
      @hide="close()"
    >
      <template #content>
        <div class="page-body">
          <b-tabs>
            <b-tab title="Thanh Toán">
              <table class="table">
                <tbody class="panel">
                  <tr>
                    <th class="info-nick">Mã Số:</th>
                    <td class="mua-nick">
                      <span>{{ format_number(accountAvatar.ID) }}</span>
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
                      <span>Avatar</span>
                    </td>
                  </tr>
                  <tr>
                    <th class="info-nick">Giá tiền:</th>
                    <td class="mua-nick">
                      <span>{{ format_number(accountAvatar.price) }} đ</span>
                    </td>
                  </tr>
                  <tr>
                    <th class="info-nick">ATM-MOMO:</th>
                    <td class="mua-nick">
                      <span> {{ cash_atm(accountAvatar.price) }} đ</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-tab>
            <b-tab title="Tài Khoản">
              <table class="table">
                <tbody class="panel">
                  <tr>
                    <th class="info-nick">Mã Số</th>
                    <td class="mua-nick">
                      <span>{{ format_number(accountAvatar.ID) }}</span>
                    </td>
                  </tr>
                  <tr>
                    <th class="info-nick">Đất</th>
                    <td class="mua-nick">
                      <span>{{ accountAvatar.dat }}</span>
                    </td>
                  </tr>
                  <tr>
                    <th class="info-nick">Gà</th>
                    <td class="mua-nick">
                      <span>{{ accountAvatar.ga }}</span>
                    </td>
                  </tr>
                  <tr>
                    <th class="info-nick">Cá</th>
                    <td class="mua-nick">
                      <span>{{ accountAvatar.ca }}</span>
                    </td>
                  </tr>
                  <tr>
                    <th class="info-nick">Chi tiết</th>
                    <td class="mua-nick">
                      <span> {{ accountAvatar.thongtin }} </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-tab>
          </b-tabs>
          <!-- </div>
      <div class="modal-info mgt-10px"> -->
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio
              v-model="isBuy"
              :aria-describedby="ariaDescribedby"
              name="some-radios"
              value="wallet"
              >Thanh toán bằng số dư</b-form-radio
            >
            <b-form-radio
              v-model="isBuy"
              :aria-describedby="ariaDescribedby"
              name="some-radios"
              value="atm-momo"
              >Thanh toán bằng Atm - Momo</b-form-radio
            >
          </b-form-group>
          <b-row v-if="isBuy == 'atm-momo'">
            <b-col sm="12" md="6">
              <AccountNumbeAdmin />
            </b-col>

            <b-col sm="12" md="6">
              <BuyAccountInstructions
                :account="accountAvatar"
                account-type="Avatar"
              />
            </b-col>
          </b-row>
        </div>
      </template>
      <template #footer-content>
        <div v-if="!user" class="color-main mgb-10px">
          Bạn chưa Đăng nhập. Hãy Đăng nhập để mua.
        </div>
        <div
          v-else-if="Number(user.cash) < accountAvatar.price"
          class="color-main mgb-10px"
        >
          Số dư không đủ. Hãy nạp thêm tiền để mua.
        </div>
      </template>
      <template #footer-button>
        <b-button v-if="!user" size="sm" variant="success" to="/login"
          ><span>Đăng nhập</span></b-button
        >
        <b-button
          v-else-if="Number(user.cash) < accountAvatar.price"
          variant="success"
          to="/account/wallet/deposit/vnd"
          ><span>Nap tiền</span></b-button
        >

        <b-button
          v-else
          size="sm"
          variant="success"
          class="btn-buy"
          @click="buyNow()"
        >
          <Loading v-if="isLoading" button></Loading>
          <span v-else> Thanh Toán </span>
        </b-button>
      </template>
    </ModalPayload>
  </div>
</template>
  
<script>
import { mapActions, mapState } from "vuex";
import mixins from "@/mixins/index";
import Loading from "@/components/global/molecules/common/Loading";
import ModalPayload from "@/components/common/ModalPayload";
import AccountNumbeAdmin from "@/components/common/AccountNumbeAdmin";
import BuyAccountInstructions from "@/components/common/BuyAccountInstructions";

export default {
  name: "accountAvatarList",
  mixins: [mixins],

  components: {
    Loading,
    ModalPayload,
    AccountNumbeAdmin,
    BuyAccountInstructions,
  },
  props: {
    accountAvatar: {
      type: Object,
      default: () => {},
    },
    showModal: Boolean,
  },
  data() {
    return {
      isBuy: "wallet",
      isLoading: false,
    };
  },
  async mounted() {
    // if(this.showModal){
    // }
  },
  computed: {
    ...mapState("home/users", ["token", "user"]),
  },
  methods: {
    ...mapActions("home/users", ["buyAccountAvatar"]),

    async buyNow() {
      this.isLoading = true;
      const res = await this.buyAccountAvatar(this.accountAvatar.ID);
      if (res.historyId) {
        this.$router.push(`/account/history/${res.historyId}`);
      }

      this.isLoading = false;
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
  .nav-tabs {
    .nav-item {
      width: 50%;
      .nav-link {
        border: none;
        color: #663019;
        text-align: center;

        &.active {
          font-weight: bold;
          border: none;
          border-bottom: 1px solid #663019;
          background-color: #ffefa3;
        }
      }
    }
  }

  .custom-control-input:checked ~ .custom-control-label::before {
    color: #fff;
    border-color: #663019;
    background-color: #663019;
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
  .col-md-6 {
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
