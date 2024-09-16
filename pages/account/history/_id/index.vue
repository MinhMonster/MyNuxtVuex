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
      <template v-if="user && ready && history" #body>
        <div class="table-responsive">
          <table class="table">
            <tbody>
              <tr>
                <th class="info-nick" style="width: 30%">Game</th>
                <td class="mua-nick">
                  <span>{{ history.accountType }}</span>
                </td>
              </tr>
              <tr>
                <th class="info-nick" style="width: 30%">Mã Số</th>
                <td class="mua-nick">
                  <span>{{ format_number(history.accountId) }}</span>
                </td>
              </tr>
              <tr>
                <th class="info-nick" style="width: 30%">Tài Khoản</th>
                <td class="mua-nick break-all">
                  <span>{{ history.accountName }} </span>
                </td>
              </tr>
              <tr>
                <th class="info-nick" style="width: 30%">Mật khẩu</th>
                <td class="mua-nick">
                  <span>{{ history.accountPassword }} </span>
                </td>
              </tr>
              <tr v-if="history.accountCode">
                <th class="info-nick" style="width: 30%">Mã chuyển sim</th>
                <td class="mua-nick">
                  <span>{{ history.accountCode }}</span>
                </td>
              </tr>

              <tr>
                <th class="info-nick" style="">Giá Bán</th>
                <td class="mua-nick">
                  <span>{{ format_number(history.accountCash) }} VNĐ</span>
                </td>
              </tr>

              <tr>
                <th class="info-nick" style="">Ngày thực hiện</th>
                <td class="mua-nick">
                  <span> {{ history.buyAt }}</span>
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
                    <template v-if="!history.accountCode">
                      <p v-if="history.accountType === 'Ngọc Rồng'" class="sms">
                        Nick Ngọc Rồng trên Web đều là đăng ký ảo. Các bạn chỉ
                        cần đổi mật khẩu là xong.
                      </p>
                    </template>
                    <template
                      v-else-if="history.accountCode === 'Đang cập nhật'"
                      ><p class="sms">
                        Chờ Admin cập nhật cú pháp Chuyển sim
                      </p></template
                    >
                    <template v-else>
                      <div class="bold">Hướng dẫn chuyển sim đăng ký:</div>
                      Dùng Sim Đăng Ký Mới soạn:<br />

                      <span class="sms"
                        >GO SIMMOI {{ history.accountName }}
                        {{ history.accountCode }}</span
                      >
                      <ButtonCoppy
                        :content="`GO SIMMOI
                      ${history.accountName} ${history.accountCode}`"
                      ></ButtonCoppy
                      ><br />
                      <img src="/icon/icon-next-right.gif" />
                      <img src="/icon/icon-next-right.gif" />
                      <img src="/icon/icon-next-right.gif" />
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
import Loading from "@/components/global/molecules/common/Loading";
import HomePage from "@/components/pages/home/HomePage";
import ButtonCoppy from "@/components/common/ButtonCoppy";
import AdminInbox from "@/components/common/client/AdminInbox";

import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");
import mixins from "@/mixins/index";

export default {
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
      if (!this.token) {
        this.$router.push("/login");
      } else {
        await this.historyBuyAccount(this.historyId);
      }
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
