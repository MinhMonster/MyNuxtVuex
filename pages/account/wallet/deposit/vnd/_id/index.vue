<template>
  <client-only>
    <HomePage
      title="Thông tin Nạp tiền"
      content="Chi tiết giao dịch nạp tiền qua ATM-MOMO"
      full-screen
      :loading="!ready"
      goBack
      :path-go-back="`/account/wallet/deposit/vnd?page=${this.pageSave}`"
      reload
      @reload="fetchHistory()"
    >
      <template v-if="token && user && ready && history" #body>
        <div class="table-responsive">
          <table class="table">
            <tbody>
              <tr>
                <th class="info-nick" style="width: 30%">Mã giao dịch</th>
                <td class="mua-nick">
                  <span>{{ format_number(history.ID) }}</span>
                </td>
              </tr>
              <tr>
                <th class="info-nick" style="width: 30%">Hình thức nạp</th>
                <td class="mua-nick">
                  <span>{{ history.walletType }}</span>
                </td>
              </tr>
              <tr>
                <th class="info-nick" style="width: 30%">Số tiền nạp</th>
                <td class="mua-nick break-all">
                  <span>{{ format_number(history.moneyAmount) }} đ </span>
                </td>
              </tr>
              <tr>
                <th class="info-nick" style="width: 30%">Tiền nhận trên Web</th>
                <td class="mua-nick">
                  <span>{{ format_number(history.moneyReceived) }} đ </span>
                </td>
              </tr>
              <tr>
                <th class="info-nick" style="width: 30%">Tên người chuyển</th>
                <td class="mua-nick">
                  <span>{{ history.bankAccountName }}</span>
                </td>
              </tr>

              <tr>
                <th class="info-nick" style="">Số tài khoản chuyển</th>
                <td class="mua-nick">
                  <span>{{ history.bankAccountNumber }}</span>
                </td>
              </tr>

              <tr>
                <th class="info-nick" style="">Ngày thực hiện</th>
                <td class="mua-nick">
                  <span> {{ history.depositAt }}</span>
                </td>
              </tr>

              <tr>
                <th class="info-nick" style="">Trạng Thái</th>
                <td class="mua-nick">
                  <b-badge
                    :variant="class_status(history.depositState)"
                    class="text-white pd-5px"
                    >{{ history.depositState }}</b-badge
                  >
                </td>
              </tr>

              <tr>
                <td class="mua-nick text-left" colspan="2">
                  <div id="next-top" class="title text-center">
                    Hướng dẫn nạp tiền qua {{ history.walletType }}
                  </div>
                  <small id="fileHelp" class="form-text text-muted"
                    >Hãy chuyển tiền cho Admin để
                    <b-badge variant="success" class="text-white pd-5px"
                      >Hoàn thành</b-badge
                    >
                    giao dịch nạp tiền này.</small
                  >
                  <div v-if="token && user" class="info-atm-momo">
                    <img src="/icon/icon-next-right.gif" /> Bạn Chuyển tiền cho
                    Admin:<br />
                    <img src="/icon/icon-next-right.gif" />
                    {{ history.walletType }}:
                    <span class="sms"
                      >{{ numberWalletAdmin(history.walletType) }}
                      <ButtonCoppy
                        :content="numberWalletAdmin(history.walletType)"
                      ></ButtonCoppy> </span
                    ><br />
                    <img src="/icon/icon-next-right.gif" /> Người nhận:
                    <span class="sms">Đỗ Công Minh</span> <br />
                    <img src="/icon/icon-next-right.gif" /> Nội dung:
                    <span class="sms"
                      >NAP MBN {{ user.id }}
                      <ButtonCoppy
                        :content="`NAP MBN ${user.id}`"
                      ></ButtonCoppy> </span
                    ><br />
                    <img src="/icon/icon-next-right.gif" /> Sau 5-30p khi bạn đã
                    chuyển tiền cho Admin thành công nhưng vẫn chưa được cộng
                    tiền trên Web thì hãy liên hệ cho Admin để xử lý:
                    <br />

                    <img src="/icon/icon-next-right.gif" />
                    <img src="/icon/icon-next-right.gif" />
                    <img src="/icon/icon-next-right.gif" />
                    <a href="https://zalo.me/0961646828">
                      Sđt, Zalo: Đỗ Minh - 0961.646.828</a
                    >
                    <br />
                  </div>
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
import HomePage from "@/components/pages/home/HomePage";

import ButtonCoppy from "@/components/common/ButtonCoppy";

import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");
import mixins from "@/mixins/index";

export default {
  layout: "clientLayout",
  mixins: [mixins],

  components: {
    HomePage,
    ButtonCoppy,
  },
  data() {
    return {
      ready: false,
    };
  },
  computed: {
    ...mapFields("home/users", {
      history: "historyWalletDepositVnd",
      pageSave: "pageSave",
    }),
    ...mapFields("home/game/ninjas", {}),
    ...mapState(["token", "user"]),
    historyId() {
      return _.cloneDeep(this.$route.params.id);
    },
  },
  mounted() {
    if (!this.token) {
      this.$router.push("/login");
    } else {
      this.fetchHistory();
    }
  },
  methods: {
    ...mapActions(["fetchHistoryWalletDepositVnd", "setQuery", "resetQuery"]),
    async fetchHistory() {
      this.ready = false;
      if (!this.token) {
        this.$router.push("/login");
      } else {
        await this.fetchHistoryWalletDepositVnd(this.historyId);
      }
      this.ready = true;
    },
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
