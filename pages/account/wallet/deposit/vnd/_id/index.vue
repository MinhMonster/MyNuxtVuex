<template>
  <client-only>
    <HomePage
      :title="title"
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
                  <v-btn
                    :color="class_status(history.depositState)"
                    class="text-white pd-5px"
                  >
                    {{ history.depositState }}
                  </v-btn>
                </td>
              </tr>

              <tr>
                <td class="mua-nick text-left" colspan="2">
                  <HistoryInstructionBank :history="history" :user="user" />
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
import HistoryInstructionBank from "@/components/pages/client/account/wallet/HistoryInstructionBank";

import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");
import mixins from "@/mixins/index";

export default {
  layout: "clientLayout",
  mixins: [mixins],

  components: {
    HomePage,
    HistoryInstructionBank,
  },
  computed: {
    ...mapFields("global", { ready: "ready" }),
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
  data() {
    return {
      title: "Thông tin Nạp tiền",
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
