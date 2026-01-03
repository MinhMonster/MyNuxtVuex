
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
            <v-tab :value="2">Thông Tin</v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item :value="0">
              <AccountInfoTable :account="account" :items="gameInfos" />
            </v-window-item>
            <v-window-item :value="1">
              <AccountInfoTable :account="account" :items="accountInfos" />
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
import AccountInfoTable from "@/components/common/client/table/AccountInfoTable.vue";

export default {
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
    gameName() {
      switch (this.accountType) {
        case "ninja":
          return "Ninja School Online";
        case "avatar":
          return "Avatar";
        case "ngocrong":
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
    accountInfos() {
      switch (this.accountType) {
        case "ninja":
          return [
            {
              label: "Lớp",
              value: this.classNinja(this.account.class),
            },
            {
              label: "Cấp độ",
              value: this.account.level,
            },

            {
              label: "Máy chủ",
              value: this.serverNinja(this.account.server),
            },
            {
              label: "Gia tộc",
              value: this.account.is_family || false ? "Có" : "Không",
            },
            {
              label: "Mô tả",
              value: this.account.description,
              html: true,
            },
          ];
        case "avatar":
          return [
            {
              label: "Giới tính",
              value:
                this.account.sex === 1
                  ? "Nam"
                  : this.account.sex === 2
                  ? "Nữ"
                  : "Gay",
            },
            {
              label: "Đất",
              value: this.account.land,
            },

            {
              label: "Gà",
              value: this.account.pets,
            },
            {
              label: "Cá",
              value: this.account.fish,
            },
            {
              label: "Mô tả",
              value: this.account.description,
              html: true,
            },
          ];
        case "ngocrong":
          return [
            {
              label: "Sức mạnh",
              value: tthis.account.power,
            },
            {
              label: "Đệ tử",
              value: this.account.practitioners,
            },

            {
              label: "Máy chủ",
              value: this.account.server,
            },
            {
              label: "Hành tinh",
              value: this.planet,
            },
            {
              label: "Mô tả",
              value: this.account.description,
              html: true,
            },
          ];
        default:
          return [];
      }
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
