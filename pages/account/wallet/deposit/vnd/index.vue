<template>
  <client-only>
    <HomePage
      :title="title"
      :loading="!ready"
      goBack
      reload
      @reload="reload()"
      :col-left="8"
      :col-right="4"
      table
    >
      <template v-if="ready" #body>
        <form class="form">
          <div class="content-main">
            Chuyển tiền cho Admin xong bạn vào đây để tạo thông báo nạp tiền
            <br />
            100k ATM-MOMO = 120k <br />
            Shop Thời gian duyệt 30s - 5 Phút <br />
            SĐT hỗ trợ của Admin: Đỗ Minh - 0961.646.828 <br />
            Nội dung:
            <span class="sms">
              NAP MBN {{ user.id }}
              <ButtonCoppy :content="`NAP MBN ${user.id}`"></ButtonCoppy> </span
            ><br />
            <div class="btn-show-more">
              <v-btn @click="showModal()" color="primary">
                Xem Hướng Dẫn Nạp Tiền Từ ATM,MOMO
              </v-btn>
            </div>
          </div>
          <v-row>
            <v-col cols="12" sm="6" class="middle mb-2">
              <div class="field">
                <form-validator name="wallet">
                  <label for="wallet" class="form-label"
                    >Hình thức nạp
                    <small>(<span style="color: red">*</span>)</small></label
                  >
                  <v-select
                    v-model="money.walletType"
                    :items="walletOptions"
                    size="sm"
                  ></v-select>
                </form-validator>
              </div>
            </v-col>

            <v-col cols="12" sm="3" class="middle mb-2">
              <div class="field">
                <form-validator name="amount">
                  <label for="amount" class="form-label"
                    >Tiền chuyển
                    <small>(<span style="color: red">*</span>)</small></label
                  >
                  <BaseInputCash
                    v-model="money.amount"
                    @change="setMoneyOut"
                    class="v-input form-input"
                  />
                </form-validator></div
            ></v-col>
            <v-col cols="12" sm="3" class="middle mb-2">
              <div class="field">
                <form-validator name="out">
                  <label for="out" class="form-label">Thực nhận +20%</label>
                  <input
                    :value="moneyReceived"
                    disabled
                    type="text"
                    placeholder=" "
                    class="v-input form-input"
                    :class="{ 'text-danger': isFailed }"
                  />
                </form-validator>
              </div>
            </v-col>
            <v-col cols="12" sm="6" class="middle">
              <div class="field">
                <form-validator name="bank_account_name">
                  <label class="form-label"
                    >Chủ tài khoản Chuyển tiền
                    <small>(<span style="color: red">*</span>)</small></label
                  >
                  <input
                    v-model="money.bankAccountName"
                    type="text"
                    placeholder=" "
                    class="v-input form-input"
                    @keyup.enter="submit()"
                  />
                </form-validator>
              </div>
            </v-col>
            <v-col cols="12" sm="6" class="middle">
              <div class="field">
                <form-validator name="bank_account_number">
                  <label class="form-label"
                    >Số tài khoản Người chuyển
                    <small>(<span style="color: red">*</span>)</small></label
                  >
                  <input
                    v-model="money.bankAccountNumber"
                    type="text"
                    placeholder=" "
                    class="v-input form-input"
                    @keyup.enter="submit()"
                  />
                </form-validator>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="field submit mt-8">
                <v-btn size="sm" class="btn-login" @click="submit()">
                  <Loading v-if="isLoading" button></Loading>
                  <span v-else> Tạo giao dịch nạp tiền </span>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </form>
        <ModalPayload
          ref="modal"
          size="md"
          title="HD Nạp Tiền = ATM - MOMO"
          hiddenFooter
        >
          <template #content>
            <v-row>
              <v-col cols="12" class="size">
                <div class="page-body">
                  <AccountNumbeAdmin />
                </div>
              </v-col>
              <v-col cols="12" class="mt--2">
                <div class="page-body">
                  <RechargeInstructions :user="user" />
                </div>
              </v-col>
            </v-row>
          </template>
        </ModalPayload>
        <!-- <div class="wrapper"> -->
        <!-- </div> -->
      </template>
      <template #col-right>
        <v-row>
          <v-col cols="12" sm="6" md="6" lg="12" class="size">
            <div class="page-body">
              <AccountNumbeAdmin />
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="12">
            <div class="page-body">
              <RechargeInstructions :user="user" />
            </div>
          </v-col>
        </v-row>
      </template>
      <template #table>
        <HistoryDepositVndTable
          :histories="histories"
          :user="user"
          @show="showModalDetail"
        />
        <ModalDetaiVnd ref="modalDetail" :history="history" />
        <Pagination
          v-if="historyMeta && historyMeta.pages > 1"
          :meta="historyMeta"
          @change="onPageChange"
        ></Pagination>
      </template>
    </HomePage>
  </client-only>
</template>


<script>
import Loading from "@/components/global/molecules/common/Loading";
import FormValidator from "@/components/global/form/FormValidator";
import ButtonCoppy from "@/components/common/ButtonCoppy";
import AccountNumbeAdmin from "@/components/common/AccountNumbeAdmin";
import RechargeInstructions from "@/components/common/RechargeInstructions";
import ModalPayload from "@/components/common/ModalPayload";
import HistoryDepositVndTable from "@/components/pages/client/account/wallet/HistoryDepositVndTable";
import Pagination from "@/components/global/molecules/common/Pagination";
import HomePage from "@/components/pages/home/HomePage";
import BaseInputCash from "@/components/base/BaseInputCash";
import ModalDetaiVnd from "@/components/pages/client/account/wallet/ModalDetaiVnd";

import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");
const global = createNamespacedHelpers("global");
import mixins from "@/mixins/index";

export default {
  middleware: ["authentication"],
  mixins: [mixins],
  layout: "clientLayout",
  components: {
    HomePage,
    Loading,
    FormValidator,
    ButtonCoppy,
    AccountNumbeAdmin,
    RechargeInstructions,
    ModalPayload,
    HistoryDepositVndTable,
    Pagination,
    BaseInputCash,
    ModalDetaiVnd,
  },
  data() {
    return {
      history: null,
      isLoading: false,
      walletOptions: [
        {
          text: "Chọn hình thức nạp tiền",
          value: null,
        },
        {
          text: "Ví MOMO",
          value: "Ví MOMO",
        },
        {
          text: "MB Bank",
          value: "MB Bank",
        },
        {
          text: "VietcomBank",
          value: "VietcomBank",
        },
        {
          text: "VietinBank",
          value: "VietinBank",
        },
      ],
      money: {
        walletType: null,
        amount: "",
        bankAccountName: "",
        bankAccountNumber: "",
      },
      moneyReceived: "",
      isFailed: false,
      title: "NẠP VĐT ATM-MOMO",
    };
  },

  computed: {
    ...mapFields("global", { ready: "ready" }),
    ...mapFields("home/users", {
      histories: "historyWalletDepositVnds",
      historyMeta: "historyMeta",
      pageSave: "pageSave",
    }),
    ...mapFields("home/game/ninjas", {}),
    ...mapState(["token", "user"]),
    queryPage() {
      return this.$route.query.page || 1;
    },
  },
  mounted() {
    this.onPageChange(this.queryPage);
  },
  methods: {
    ...mapActions([
      "depositVnd",
      "historyWalletDepositVnds",
      "setQuery",
      "resetQuery",
    ]),
    ...global.mapActions(["nextOldPath"]),

    async submit() {
      this.isLoading = true;
      const res = await this.depositVnd({
        input: this.money,
      });
      this.isLoading = false;
      const history = res.data.depositVnd;

      if (history) {
        await this.showModalDetail(history);
        await this.resetInput();
        await this.setQuery({ page: 1 });
        this.historyWalletDepositVnds();
      }
    },
    setMoneyOut(name, value) {
      this.money.amount = value;
      if (value < 10000) {
        this.isFailed = true;
        this.moneyReceived = "Ít nhất 10.000đ";
      } else if (value > 10000000) {
        this.isFailed = true;
        this.moneyReceived = "Tối đa 10 Triệu";
      } else {
        this.isFailed = false;
        this.moneyReceived = this.format_number(value * 1.2) + " đ";
      }
    },
    async onPageChange(page) {
      this.ready = false;
      await this.setQuery({ page });
      await this.historyWalletDepositVnds();
      page == 1 || !page
        ? this.$router.push(`/account/wallet/deposit/vnd`)
        : this.$router.push(`/account/wallet/deposit/vnd?page=${page}`);
      this.ready = true;
    },
    increaseMoney(history) {
      return history.moneyFirst < history.moneyLast;
    },
    resetInput() {
      this.money = {
        walletType: null,
        amount: "",
        bankAccountName: "",
        bankAccountNumber: "",
      };
      this.moneyReceived = 0;
    },
    reload() {
      this.onPageChange(this.pageSave);
    },
    showModal() {
      this.$refs.modal.show();
    },
    showModalDetail(history) {
      this.history = history;
      setTimeout(() => {
        this.$refs.modalDetail.show();
      }, 200);
    },
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.title },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.title },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
::v-depp {
  .has-error .validation {
    margin-top: 15px !important;
  }
  .page-body {
    color: #000000;
    border: 1px solid #663019;
    background: #ffefa3;
    padding: 9px;
    border-radius: 4px;
  }
}
.account-box {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0px;
}
// .wrapper {
//   border-radius: 15px;
//   box-shadow: 0px 15px 20px rgb(0 0 0 / 10%);
//   user-select: none;
//   .title {
//     font-size: 30px;
//     font-weight: 600;
//     text-align: center;
//     line-height: 40px;
//     color: #ffcf9c;
//     user-select: none;
//     border-radius: 15px 15px 0 0;
//     background: linear-gradient(-135deg, #e28637, #561d00);
//   }
form {
  // padding: 10px 30px 30px;
  background: #ffefa3;
  // border: 1px solid #663019;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;

  .field {
    height: 40px;
    width: 100%;
    margin-top: 15px;
    position: relative;
    &.submit {
      margin-top: 0px;
    }
    // input:valid ~ label {
    //   top: 0%;
    //   font-size: 16px;
    //   color: #4158d0;
    //   background: none;
    //   transform: translateY(-50%);
    // }
    input {
      height: 100%;
      width: 100%;
      outline: none;
      font-size: 17px;
      padding-left: 5px;
      border: 1px solid lightgrey;
      border-radius: 4px;
      transition: all 0.3s ease;
      background: #fff;
      &.v-input {
        z-index: 999999999;
        height: 35px;
        border: 1px solid #e28637;
        color: #663019 !important;
        &.text-danger {
          color: red !important;
          font-size: 15px;
        }
      }
    }
    select {
      height: 100%;
      width: 100%;
      outline: none;
      font-size: 17px;
      padding-left: 5px;
      border: 1px solid #e28637 !important;
      border-radius: 4px;
      transition: all 0.3s ease;
      // background: #fff;
      .custom-select {
        z-index: 999999999;
        height: 35px;
        border: 1px solid #e28637 !important;
        color: #663019 !important;
      }
    }
    // label {
    //   position: absolute;
    //   top: 50%;
    //   left: 20px;
    //   color: #999999;
    //   font-weight: 400;
    //   font-size: 17px;
    //   pointer-events: none;
    //   transform: translateY(-50%);
    //   transition: all 0.3s ease;
    // }
    input[type="submit"],
    .btn-login {
      width: 100%;
      border-radius: 20px;
      color: #ffcf9c !important;
      border: none;
      padding-left: 0;
      // font-size: 20px;
      font-weight: 500;
      cursor: pointer;
      background: linear-gradient(-135deg, #e28637, #561d00);
      transition: all 0.3s ease;
      span {
        color: #ffcf9c !important;
      }
    }
  }
  .signin {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    color: #663019;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    font-size: 16px;
    align-items: center;
    justify-content: space-around;
    input {
      width: 15px;
      height: 15px;
      background: red;
    }
    span {
      white-space: nowrap;
      color: #4158d0 !important;
      cursor: pointer;
    }
  }
}
// }
.checkbox {
  position: relative;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
  float: left;
  // width: 100% !important;
  user-select: none;
  white-space: nowrap;
  padding-top: 10px;
  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    z-index: -1;
    margin: 0;
  }
  label {
    display: inline-block;
    color: #e28637;
    font-size: 16px;
    max-width: 100%;
    position: relative;
    padding-left: 35px;
    height: 2em;
    min-height: 20px;
    padding-left: 20px;
    margin-bottom: 0;
    font-weight: 400;
    cursor: pointer;
  }

  label:before,
  label:after {
    top: 2px;
    width: 17px !important;
    height: 17px !important;
  }
}
.checkbox input[type="checkbox"] + label::before {
  content: " ";
  position: absolute;
  border: 1px solid #e28637;
  top: 2px;
  left: 0;
  width: 17px !important;
  height: 17px !important;
  border-radius: 2px;
}
.checkbox input[type="checkbox"]:checked + label::before {
  content: " ";
  background: linear-gradient(#e28637, #663019);
}
input[type="checkbox"]:checked + label::after {
  content: "\2714";
  top: -0.5px;
  left: 0;
  position: absolute;
  z-index: 2;
  transition: 0.25s all ease;

  width: 17px !important;
  height: 17px !important;

  line-height: 1.5;
  text-align: center;
  color: #fff;
}

form {
  padding: 10px;
  // border: 1px solid #333;
  // background: #ffffff;
}

// .form-field {
//  margin: 20px;
// }

.form-input {
  border: 1px solid #333;
  width: 100%;
  height: 50px;
  padding: 0 0px;
  transform: 0.25s ease;
}

.form-input:focus {
  border-color: blue;
}

// .form-field {
//  position: relative;
// }

.form-label {
  // color: #a4a4a4;
  // position: absolute;
  // top: 20px;
  // //  top: 35%;
  // font-size: 14px;
  // transform: translateY(-50%);
  // left: 21px;
  // user-select: none;
  // pointer-events: none;
  // transition: 0.25s ease;
  // z-index: 1;
  // background: #000;
}

.form-input:not(:placeholder-shown) + .form-label,
.form-input:focus + .form-label {
  // top: -9px;
  // left: 11px;
  // padding: 0 10px;
  // display: inline-block;
  // background: none !important;
  // color: #663019;
  // z-index: 9999;
}

@media (min-width: 450px) {
  .account-box {
    margin: 7% auto;
  }
}
@media (max-width: 599px) {
  .account-box {
    max-width: 390px;
    .wrapper form .field {
      height: auto;
      margin-top: 0px;
    }
  }
}
@media (max-width: 380px) {
  .account-box {
    padding: 0px;
  }
}
#home-page {
  max-width: 1263px;
}
@media (max-width: 1263px) {
  #home-page {
    max-width: 1024px;
  }
}

.info-atm-momo {
  min-height: 195px;
  .title {
    font-size: 15px !important;
  }
}
</style>