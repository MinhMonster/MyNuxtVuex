<template>
  <form class="form scroll-y">
    <div class="title text-center mb-2">NẠP THẺ TỰ ĐỘNG</div>
    <v-row>
      <v-col cols="12" sm="12">
        <div class="field">
          <FormValidator name="telco">
            <label for="telco" class="form-label"
              >Chọn loại thẻ
              <small>(<span style="color: red">*</span>)</small></label
            >
            <v-select
              v-model="card.telco"
              :items="walletOptions"
              size="sm"
              id="telco"
            ></v-select>
          </FormValidator>
        </div>
      </v-col>
      <v-col cols="12" sm="12">
        <div class="field">
          <FormValidator name="amount">
            <label for="amount" class="form-label"
              >Chọn Mệnh giá
              <small>(<span style="color: red">*</span>)</small></label
            >
            <v-select
              v-model="card.amount"
              :items="amountOptions"
              size="sm"
              id="amount"
            ></v-select>
          </FormValidator>
        </div>
      </v-col>
      <v-col cols="12" sm="12">
        <div class="field">
          <FormValidator name="code">
            <label for="code" class="form-label"
              >Mã thẻ cào
              <small>(<span style="color: red">*</span>)</small></label
            >
            <v-text-field
              v-model="card.code"
              type="text"
              placeholder="Nhập mã thẻ cào"
              id="code"
            ></v-text-field>
          </FormValidator>
        </div>
      </v-col>
      <v-col cols="12" sm="12">
        <div class="field">
          <FormValidator name="serial">
            <label for="serial" class="form-label"
              >Số Serial thẻ cào
              <small>(<span style="color: red">*</span>)</small></label
            >
            <v-text-field
              v-model="card.serial"
              type="text"
              placeholder="Nhập serial thẻ cào"
              id="serial"
            ></v-text-field>
          </FormValidator>
        </div>
      </v-col>
      <v-col v-if="!token" cols="12" sm="12">
        <div class="text-center title">
          <span>Đăng nhập để nạp thẻ</span>
        </div>
      </v-col>

      <v-col cols="12">
        <div class="field submit mt-2">
          <v-btn
            v-if="token"
            size="sm"
            class="btn-login w-100"
            @click="submit()"
          >
            <Loading v-if="isLoading" button></Loading>
            <span v-else>Nạp Thẻ </span>
          </v-btn>
          <div v-else>
            <div v-if="!user" class="flex group-btn">
              <div
                class="login-btn cursor-pointer mr-1 w-50"
                @click="showModalLoginRegister('login')"
              >
                Đăng nhập
              </div>
              <div
                class="register-btn cursor-pointer w-50"
                @click="showModalLoginRegister('register')"
              >
                Đăng ký
              </div>

              <!-- <ButtonLoginFacebook /> -->
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="12">
        <DepositCardInstructions />
      </v-col>
    </v-row>
  </form>
</template>
<script>
import Loading from "@/components/global/molecules/common/Loading";
import FormValidator from "@/components/global/form/FormValidator";
import HomePage from "@/components/pages/home/HomePage";
import DepositCardInstructions from "@/components/common/DepositCardInstructions";

import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");
const global = createNamespacedHelpers("global");

export default {
  components: {
    HomePage,
    Loading,
    FormValidator,
    DepositCardInstructions,
  },
  data() {
    return {
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
      isFailed: false,
      title: "Nạp Thẻ Tự Động",
    };
  },

  computed: {
    ...mapFields("global", { ready: "ready" }),
    ...mapFields("home/users", {
      histories: "historyWalletDepositCards",
    }),

    ...mapState(["token", "user"]),
  },
  mounted() {},
  methods: {
    ...mapActions([
      "depositCard",
      "fetchHistoryWalletDepositCards",
      "setQuery",
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

    resetInput() {
      this.card = {
        telco: null,
        code: "",
        serial: "",
        amount: null,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
form {
  &.form {
    // background: #171e28 !important;
  }
}
.group-btn {
  justify-content: space-between;
}
</style>