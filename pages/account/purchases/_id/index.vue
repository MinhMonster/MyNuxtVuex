<template>
  <client-only>
    <HomePage
      :title="title"
      content="Các thông tin nick sẽ được cập nhật tại đây."
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
                    Lưu ý: Đổi MK ngay sau khi cập nhật. <br />
                    MK: sẽ tự động cập nhật sau 1-5 phút <br />
                    Sau 5p chưa cập nhật thì lh Admin:
                    <AdminInbox />
                  </span>
                </td>
              </tr>
            </template>
          </AccountInfoTable>
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
  },
  data() {
    return {
      history: null,
      title: "Thông tin Tài Khoản",
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
          copy: true
        },
        {
          label: "Mật khẩu",
          value: this.account?.password || "Đang cập nhật",
        },
        {
          label: "Mã chuyển sim",
          value: this.transferPin || "Đang cập nhật",
          hidden: this.history.account_type === "dragon_ball",
        },
        {
          label: "Giá Bán",
          value: `${this.format_number(this.history.selling_price)} Vnđ`,
        },
        {
          label: "Ngày thực hiện",
          value: this.history.purchased_at,
        },
        {
          label: "Trạng Thái",
          value: "success",
          type: "status",
          class: "flex flex-center"
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
