<template>
  <client-only>
    <HomePage
      title="Nạp Thẻ Tự Động"
      :loading="!ready"
      goBack
      reload
      @reload="reload()"
      :col-left="8"
      :col-right="4"
      table
    >
      <template v-if="token && user && ready" #body>
        <form class="form">
          <b-row>
            <b-col cols="12" sm="6" class="middle">
              <div class="field">
                <form-validator name="telco">
                  <label for="telco" class="form-label"
                    >Chọn loại thẻ
                    <small>(<span style="color: red">*</span>)</small></label
                  >
                  <b-form-select
                    v-model="card.telco"
                    :options="walletOptions"
                    size="sm"
                  ></b-form-select>
                </form-validator>
              </div>
            </b-col>
            <b-col cols="12" sm="6" class="middle">
              <div class="field">
                <form-validator name="amount">
                  <label for="amount" class="form-label"
                    >Chọn Mệnh giá
                    <small>(<span style="color: red">*</span>)</small></label
                  >
                  <b-form-select
                    v-model="card.amount"
                    :options="amountOptions"
                    size="sm"
                  ></b-form-select>
                </form-validator>
              </div>
            </b-col>
            <b-col cols="12" sm="6" class="middle">
              <div class="field">
                <form-validator name="code">
                  <label class="form-label"
                    >Mã thẻ cào
                    <small>(<span style="color: red">*</span>)</small></label
                  >
                  <input
                    v-model="card.code"
                    type="text"
                    placeholder=" "
                    class="v-input form-input"
                    @keyup.enter="submit()"
                  />
                </form-validator>
              </div>
            </b-col>
            <b-col cols="12" sm="6" class="middle">
              <div class="field">
                <form-validator name="serial">
                  <label class="form-label"
                    >Số Serial thẻ cào
                    <small>(<span style="color: red">*</span>)</small></label
                  >
                  <input
                    v-model="card.serial"
                    type="text"
                    placeholder=" "
                    class="v-input form-input"
                    @keyup.enter="submit()"
                  />
                </form-validator>
              </div>
            </b-col>  

            <b-col cols="12">
              <div class="field submit mt-6">
                <b-button size="sm" class="btn-login" @click="submit()">
                  <Loading v-if="isLoading" button></Loading>
                  <span v-else>Nạp Thẻ </span>
                </b-button>
              </div>
            </b-col>
          </b-row>
        </form>
        <ModalPayload ref="modal" size="md" title="HD Nạp Tiền = ATM - MOMO">
          <template #content>
            <b-row>
              <b-col cols="12" class="size">
                <div class="page-body">
                  <AccountNumbeAdmin />
                </div>
              </b-col>
              <b-col cols="12" class="mt--2">
                <div class="page-body">
                  <RechargeInstructions :user="user" />
                </div>
              </b-col>
            </b-row>
          </template>
        </ModalPayload>
        <!-- <div class="wrapper"> -->
        <!-- </div> -->
      </template>
      <template #col-right>
        <b-row>
          <b-col cols="12" sm="12" md="12" lg="12" class="size">
            <div class="page-body">
              <DepositCardInstructions />
            </div>
          </b-col>
        </b-row>
      </template>
      <template #table>
        <HistoryDepositCardTable :histories="histories" :user="user" />
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
import FormValidator from "@/components/pages/admin/Shared/form/FormValidator";
import ButtonCoppy from "@/components/common/ButtonCoppy";
import mixins from "@/mixins/index";
import DepositCardInstructions from "@/components/common/DepositCardInstructions";
import ModalPayload from "@/components/common/ModalPayload";
import HistoryDepositCardTable from "@/components/pages/client/account/wallet/HistoryDepositCardTable";
import Pagination from "@/components/global/molecules/common/Pagination";
import HomePage from "@/components/pages/home/HomePage";

import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");
const global = createNamespacedHelpers("global");

export default {
  mixins: [mixins],
  layout: "clientLayout",
  data() {
    return {
      ready: false,
      isLoading: false,
      isCheck: false,
      walletOptions: [
        {
          text: "Chọn loại thẻ",
          value: null,
        },
        {
          text: "Viettel",
          value: "VIETTEL",
        },
        {
          text: "Vinaphone",
          value: "VINAPHONE",
        },
        {
          text: "Mobifone",
          value: "MOBIFONE",
        },
        {
          text: "Vietnammobi",
          value: "VNMOBI",
        },
        {
          text: "Zing",
          value: "ZING",
        },
        {
          text: "Gate",
          value: "GATE",
        },
        {
          text: "Vcoin",
          value: "VCOIN",
        },
      ],
      amountOptions: [
        {
          text: "Chọn mệnh giá",
          value: null,
        },
        {
          text: "10.000 đ",
          value: 10000,
        },
        {
          text: "20.000 đ",
          value: 20000,
        },
        {
          text: "30.000 đ",
          value: 30000,
        },
        {
          text: "50.000 đ",
          value: 50000,
        },
        {
          text: "100.000 đ",
          value: 100000,
        },
        {
          text: "200.000 đ",
          value: 200000,
        },
        {
          text: "300.000 đ",
          value: 300000,
        },
        {
          text: "500.000 đ",
          value: 500000,
        },
        {
          text: "1.000.000 đ",
          value: 1000000,
        },
      ],
      card: {
        telco: null,
        code: "",
        serial: "",
        amount: null,
      },
      moneyReceived: 0,
      isFailed: false,
    };
  },
  components: {
    HomePage,
    Loading,
    FormValidator,
    ButtonCoppy,
    DepositCardInstructions,
    ModalPayload,
    HistoryDepositCardTable,
    Pagination,
  },
  computed: {
    ...mapFields("home/users", {
      histories: "historyWalletDepositCards",
      historyMeta: "historyMeta",
      pageSave: "pageSave",
    }),
    // ...mapFields("home/users", {
    //   histories: "historyWalletDepositVnds",
    //   historyMeta: "historyMeta",
    //   pageSave: "pageSave",
    // }),
    ...mapFields("home/game/ninjas", {}),
    ...mapState(["token", "user"]),
    queryPage() {
      return this.$route.query.page || 1;
    },
  },
  mounted() {
    if (!this.token) {
      this.$router.push("/login");
    } else {
      this.onPageChange(this.queryPage);
    }
  },
  methods: {
    ...mapActions([
      "depositCard",
      "fetchHistoryWalletDepositCards",
      "setQuery",
      "resetQuery",
    ]),
    ...global.mapActions(["nextOldPath"]),

    async submit() {
      this.isLoading = true;
      const res = await this.depositCard({
        input: this.card,
      });
      this.isLoading = false;
      const depositCardId = res.data.depositCardId;

      if (depositCardId) {
        await this.resetInput();
        await this.setQuery({ page: 1 });
        this.fetchHistoryWalletDepositCards();
        this.$router.push(`/account/wallet/deposit/card/${depositCardId}`);
      }
    },
    setMoneyOut() {
      if (this.card.amount < 10000) {
        this.isFailed = true;
        this.moneyReceived = "Ít nhất 10.000đ";
      } else if (this.card.amount > 10000000) {
        this.isFailed = true;
        this.moneyReceived = "Tối đa 10 Triệu";
      } else {
        this.isFailed = false;
        this.moneyReceived = this.format_number(this.card.amount * 1.2) + " đ";
      }
    },
    async onPageChange(page) {
      this.ready = false;
      await this.setQuery({ page });
      await this.fetchHistoryWalletDepositCards();
      page == 1 || !page
        ? this.$router.push(`/account/wallet/deposit/card`)
        : this.$router.push(`/account/wallet/deposit/card?page=${page}`);
      this.ready = true;
    },
    increaseMoney(history) {
      return history.moneyFirst < history.moneyLast;
    },
    resetInput() {
      this.card = {
        telco: null,
        code: "",
        serial: "",
        amount: null,
      };
      this.moneyReceived = 0;
    },
    goBack() {
      // this.$router.push(`/`);
      // this.nextOldPath();
    },
    reload() {
      this.onPageChange(this.pageSave);
    },
    showModal() {
      this.$refs.modal.show();
    },
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