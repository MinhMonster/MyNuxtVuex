<template>
  <client-only>
    <HomePage
      :title="title"
      content="Các thông tin Giao dịch sẽ được cập nhật tại đây."
      full-screen
      :loading="!ready"
      goBack
      queryGoBack
      :path-go-back="`/account/purchases`"
      reload
      @reload="fetchHistory()"
    >
      <template v-if="ready && history && account" #body>
        <div class="table-responsive">
          <AccountInfoTable :account="account" :account-infos="accountInfos">
            <template>
              <tr
                v-if="
                  history.status === 'installment_first' ||
                  history.status === 'deposit'
                "
              >
                <th class="info-nick">
                  <Status
                    :value="
                      history.status === 'deposit'
                        ? 'cancel_deposit'
                        : 'cancel_installments'
                    "
                    @click="handleCancel()"
                  />
                </th>
                <td class="mua-nick">
                  <Status value="pay_remaining" @click="handleAccept()" />
                </td>
              </tr>
              <tr>
                <td class="mua-nick text-left" colspan="2">
                  <span>
                    <template
                      v-if="
                        !transferPin && history.account_type === 'dragon_ball'
                      "
                    >
                      <p
                        v-if="history.account_type === 'dragon_ball'"
                        class="sms"
                      >
                        Nick Ngọc Rồng trên Web đều là đăng ký ảo. Các bạn chỉ
                        cần đổi mật khẩu là xong.
                      </p>
                    </template>
                    <template
                      v-else-if="history.status !== 'completed'"
                    ></template>
                    <template v-else-if="!transferPin">
                      <p class="sms">Chờ Admin cập nhật cú pháp Chuyển sim</p>
                    </template>
                    <template v-else>
                      <div class="bold">Hướng dẫn chuyển sim đăng ký:</div>
                      Dùng Sim Đăng Ký Mới soạn:<br />

                      <span class="sms"
                        >GO SIMMOI {{ account?.username }}
                        {{ transferPin }}</span
                      >
                      <ButtonCoppy
                        :content="`${
                          'GO SIMMOI ' + account?.username + ' ' + transferPin
                        }`"
                      >
                      </ButtonCoppy>
                      gửi <span class="sms">+6020</span><br /><br />
                    </template>
                    <template
                      v-if="
                        history.status === 'completed' ||
                        history.status === 'installment_first'
                      "
                    >
                      Lưu ý: Đổi MK ngay sau khi cập nhật. <br />
                      MK: sẽ tự động cập nhật sau 1-5 phút <br />
                      Sau 5p chưa cập nhật thì lh Admin:
                      <AdminInbox />
                    </template>
                  </span>
                </td>
              </tr>
            </template>
          </AccountInfoTable>
          <ModalConfirmAccount
            v-if="
              history.status === 'installment_first' ||
              history.status === 'deposit'
            "
            ref="modalConfirmAccount"
            :history="history"
            :account-infos="accountInfos"
            @payment-success="fetchHistory()"
          />
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import mixins from "@/mixins/index";
import HomePage from "@/components/pages/home/HomePage";
import ButtonCoppy from "@/components/common/ButtonCoppy";
import AdminInbox from "@/components/common/client/AdminInbox";
import AccountInfoTable from "@/components/common/client/table/AccountInfoTable.vue";
import Status from "@/components/global/molecules/common/Status";
import ModalConfirmAccount from "@/components/pages/client/game/ModalConfirmAccount";

import { mapFields } from "vuex-map-fields";

export default {
  middleware: ["authentication"],
  layout: "clientLayout",
  mixins: [mixins],
  components: {
    HomePage,
    ButtonCoppy,
    AdminInbox,
    AccountInfoTable,
    Status,
    ModalConfirmAccount,
  },
  data() {
    return {
      history: null,
      title: "Thông tin Giao dịch",
    };
  },
  computed: {
    ...mapFields("global", { ready: "ready" }),
    historyId() {
      return _.cloneDeep(this.$route.params.id);
    },
    account() {
      return this.history?.account || null;
    },
    transferPin() {
      return this.account?.transfer_pin || null;
    },
    accountInfos() {
      return [
        {
          label: "Game",
          value: this.game_name(this.history.account_type),
        },
        {
          label: "Mã Số",
          value: this.format_number(this.history.account_code),
        },
        {
          label: "Tài Khoản",
          value: this.account?.username || "Đang cập nhật",
          copy: true,
        },
        {
          label: "Mật khẩu",
          value: this.account?.password || "Đang cập nhật",
          hidden:
            this.history.status === "deposit" ||
            this.history.status === "cancelled",
        },
        {
          label: "Mã chuyển sim",
          value: this.transferPin || "Đang cập nhật",
          hidden:
            this.history.status !== "completed" ||
            this.history.account_type === "dragon_ball",
        },
        {
          label: "Giá Bán",
          value: `${this.format_number(this.history.selling_price)} Vnđ`,
        },
        {
          label: "Đã thanh toán",
          value: `${this.format_number(this.history?.first_paid_amount)} Vnđ`,
          hidden:
            this.history.type === "normal" ||
            this.history.status === "completed",
          class: "text-success",
        },
        {
          label: "Cần thanh toán",
          value: `${this.format_number(this.history?.second_paid_amount)} Vnđ`,
          hidden:
            this.history.type === "normal" ||
            this.history.status === "completed",
          class: "text-warning",
        },
        {
          label: "Hoàn tiền khi huỷ",
          value: `${this.format_number(
            this.history.type === "deposit"
              ? this.history?.first_paid_amount * 0.2
              : this.history?.first_paid_amount * 0.5
          )} Vnđ`,
          hidden:
            this.history.type === "normal" ||
            this.history.status === "completed",
        },
        {
          label: "Hạn thanh toán",
          value: this.history?.deadline_at || "Chưa xác định",
          hidden:
            this.history.type === "normal" ||
            this.history.status === "completed",
          class: "text-warning",
        },
        {
          label: "Trạng Thái",
          value: this.history.status,
          type: "status",
          class: "flex flex-center",
        },
        {
          label: "Ngày thực hiện",
          value: this.history.purchased_at,
        },
        {
          label: "Ngày huỷ giao dịch",
          value: this.history?.cancelled_at,
          hidden:
            this.history.type === "normal" ||
            this.history?.cancelled_at === null,
        },
        {
          label: "Ngày hoàn thành",
          value: this.history?.completed_at,
          class: "text-success",
          hidden: this.history?.completed_at === null,
        },
      ];
    },
  },
  mounted() {
    this.fetchHistory();
  },
  methods: {
    async fetchHistory() {
      try {
        this.ready = false;
        const res = await this.$repositories.clientAccountPurchases.show(
          this.historyId
        );
        this.history = res.data.response;
      } catch {
      } finally {
        setTimeout(() => {
          this.ready = true;
        }, 400);
      }
    },
    async handleCancel() {
      const result = await this.showSwal({
        title:
          this.history.status === "deposit" ? "Huỷ đặt cọc" : "Huỷ trả góp",
        icon: "question",
        showDenyButton: true,
        showCancelButton: false,
        html:
          "Bạn sẽ được hoàn: <span class='text-success text-20-700'>" +
          (this.history.status === "deposit"
            ? this.format_number(this.history.first_paid_amount * 0.2)
            : this.format_number(this.history.first_paid_amount * 0.5)) +
          " Vnđ </span> <br/><br/>" +
          (this.history.status === "installment_first"
            ? " Sau khi Admin kiểm tra và xác nhận tình trạng nick. "
            : "") +
          "Bạn có chắc chắn muốn huỷ?",
        denyButtonText: "Bỏ qua",
        confirmButtonText: "Xác nhận huỷ",
      });

      if (result?.isConfirmed) {
        const res = await this.$repositories.clientAccountPurchases.cancel(
          this.historyId
        );
        this.showSwal({
          icon: "success",
          title: res?.data?.message || "Huỷ giao dịch thành công!",
        });
        this.fetchHistory();
      }
    },
    async handleAccept() {
      this.$refs.modalConfirmAccount.show();
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
#home-page {
  max-width: 800px;
}

.mua-nick {
  font-weight: 400;
  text-align: center;
  background: none;
}

.table {
  font-size: 15px;
}

.title {
  color: #561d00;
}

// .text-muted{
//    color: #663019 !important;
// }
.table th,
.table td {
  padding: 7px;
  vertical-align: middle;
}

.page-body {
  position: relative;
}

.go-back,
.reload {
  position: absolute;
  top: 12px;
  height: 20px !important;
  width: 20px !important;
  z-index: 999;

  .v-btn--icon.v-size--default {
    height: 20px;
    width: 20px;
    background: radial-gradient(
      circle at 50% 100%,
      #e28637,
      #9f5424 58%,
      #561d00 127%
    );
  }
}

.go-back {
  left: 10px;
}

.reload {
  right: 10px;

  .v-btn--icon.v-size--default .v-icon,
  .v-btn--fab.v-size--default .v-icon {
    height: 18px;
    font-size: 18px;
    width: 18px;
  }
}
</style>
