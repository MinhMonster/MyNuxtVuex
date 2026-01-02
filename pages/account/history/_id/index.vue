<template>
  <client-only>
    <HomePage
      :title="title"
      content="Các thông tin nick sẽ được cập nhật tại đây."
      full-screen
      :loading="!ready"
      goBack
      :path-go-back="`/account/history`"
      reload
      @reload="fetchHistory()"
    >
      <template v-if="ready && history" #body>
        <div class="table-responsive">
          <table class="table">
            <tbody>
              <tr>
                <th class="info-nick w-50">Game</th>
                <td class="mua-nick w-50">
                  <span>{{ game_name(history.account_type) }}</span>
                </td>
              </tr>
              <tr>
                <th class="info-nick" style="">Mã Số</th>
                <td class="mua-nick">
                  <span>{{ format_number(history.account_code) }}</span>
                </td>
              </tr>
              <tr>
                <th class="info-nick" style="">Tài Khoản</th>
                <td class="mua-nick break-all">
                  <span>{{ account?.username }} </span>
                </td>
              </tr>
              <tr>
                <th class="info-nick" style="">Mật khẩu</th>
                <td class="mua-nick">
                  <span>{{ account?.password || "Đang cập nhật" }} </span>
                </td>
              </tr>
              <tr>
                <th class="info-nick" style="">Mã chuyển sim</th>
                <td class="mua-nick">
                  <span>{{ transferPin || "Đang cập nhật" }}</span>
                </td>
              </tr>

              <tr>
                <th class="info-nick" style="">Giá Bán</th>
                <td class="mua-nick">
                  <span>{{ format_number(history.price) }} VNĐ</span>
                </td>
              </tr>

              <tr>
                <th class="info-nick" style="">Ngày thực hiện</th>
                <td class="mua-nick">
                  <span> {{ history.purchased_at }}</span>
                </td>
              </tr>

              <tr>
                <th class="info-nick" style="">Trạng Thái</th>
                <td class="mua-nick">
                  <span class="btn btn btn-success btn-xs">Thành công</span>
                </td>
              </tr>

              <tr>
                <td class="mua-nick text-left" colspan="2">
                  <span>
                    <template
                      v-if="!transferPin && history.accountt_ype === 'ngocrong'"
                    >
                      <p v-if="history.accountType === 'ngocrong'" class="sms">
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
            </tbody>
          </table>
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import mixins from "@/mixins/index";
import Loading from "@/components/global/molecules/common/Loading";
import HomePage from "@/components/pages/home/HomePage";
import ButtonCoppy from "@/components/common/ButtonCoppy";
import AdminInbox from "@/components/common/client/AdminInbox";

import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");

export default {
  middleware: ["authentication"],
  layout: "clientLayout",
  mixins: [mixins],
  components: {
    Loading,
    HomePage,
    ButtonCoppy,
    AdminInbox,
  },
  computed: {
    ...mapFields("global", { ready: "ready" }),
    ...mapFields("home/users", {
      history: "historyBuyAccount",
      pageSave: "pageSave",
    }),
    ...mapFields("home/game/ninjas", {}),
    ...mapState(["token", "user"]),
    historyId() {
      return _.cloneDeep(this.$route.params.id);
    },
    account() {
      return this.history?.account || null;
    },
    transferPin() {
      return this.account?.transfer_pin || null;
    },
  },
  mounted() {
    this.fetchHistory();
  },
  methods: {
    ...mapActions(["historyBuyAccount", "setQuery", "resetQuery"]),
    nextTop() {
      const element = document.getElementById("home-page");
      element.scrollIntoView();
    },
    async fetchHistory() {
      this.ready = false;
      await this.historyBuyAccount(this.historyId);
      this.ready = true;
    },
    goBack() {
      this.$router.push(`/account/history?page=${this.pageSave}`);
    },
  },
  data() {
    return {
      title: "Thông tin Tài Khoản",
    };
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
