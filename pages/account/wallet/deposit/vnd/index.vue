<template>
  <client-only>
    <HomePage
      :title="title"
      :loading="!ready"
      goBack
      reload
      @reload="reload()"
      table
    >
      <template v-if="ready" #body>
        <form class="form">
          <div class="content-main text-center">
            Hãy tạo giao dịch nạp tiền sau đó làm theo hướng dẫn
            <br />
            Thời gian duyệt 30s - 5 Phút <br />
          </div>
          <v-row>
            <v-col cols="12" sm="6" class="middle custom-field-input mb-2">
              <div class="field">
                <form-validator name="amount">
                  <!-- <label for="amount" class="form-label"
                    >Số tiền nạp
                    <small>(<span style="color: red">*</span>)</small></label
                  > -->
                  <BaseInputCash
                    v-model="money.amount"
                    placeholder="Nhập số tiền cần nạp..."
                    @change="setMoneyOut"
                    class="v-input form-input"
                  />
                </form-validator></div
            ></v-col>
            <!-- <v-col cols="12" sm="6" class="middle custom-field-input mb-2">
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
            </v-col> -->
            <v-col cols="12" sm="6">
              <div class="field submit mt-2">
                <v-btn size="sm" class="btn-login" @click="submit()">
                  <Loading v-if="isLoading" button></Loading>
                  <span v-else> Tạo giao dịch nạp tiền </span>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </form>
      </template>
      <template #table>
        <HistoryDepositVndTable
          :histories="histories"
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
      money: {
        amount: "",
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
table th {
  width: auto !important
}
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
}

.form-input:focus {
  border-color: blue;
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
