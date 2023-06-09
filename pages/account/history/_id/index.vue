<template>
  <client-only>
    <div id="home-page">
      <div v-if="!ready" class="center mgt--50px mgb--50px">
        <Loading></Loading>
      </div>
      <div v-if="user && ready && history" class="page-body full-screen">
        <div  class="page-info">
          <!-- <div style="border: 1px solid #; border-radius: 10px"> -->
          <div class="go-back" @click="goBack()">
            <v-btn icon>
              <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>
            </v-btn>
          </div>
          <div class="reload" @click="fetchHistory()">
            <v-btn icon>
              <v-icon>mdi-reload</v-icon>
            </v-btn>
          </div>
          <div  id="next-top" class="title text-center">Thông tin Tài Khoản</div>
          <small id="fileHelp" class="form-text text-muted text-center"
            >Các thông tin nick sẽ được cập nhật tại đây.</small
          >
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
                <tr>
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
                    <span
                      >Chờ Admin cập nhật cú pháp Chuyển sim <br />
                      Lưu ý: Đổi MK ngay sau khi cập nhật. <br />
                      MK: sẽ tự động cập nhật sau 1-5 phút <br />
                      Sau 5p chưa cập nhật thì lh Admin: <br />
                      Sđt, Zalo: Đỗ Minh - 0961.646.828</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="next-bottom"></div>

          <!-- </div> -->
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import Loading from "@/components/global/molecules/common/Loading";

import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");
import mixins from "@/mixins/index";

export default {
  layout: "clientLayout",
  mixins: [mixins],

  components: { Loading },
  data() {
    return {
      ready: false,
    };
  },
  computed: {
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
        console.log("historyId", this.historyId);
        await this.historyBuyAccount(this.historyId);
      }
      this.ready = true;
    },
    goBack(){
      this.$router.push(`/account/history?page=${this.pageSave}`)
    }
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