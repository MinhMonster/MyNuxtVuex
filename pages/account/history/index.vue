<template>
  <client-only>
    <div v-if="user" id="home-page">
      <div class="page-body">
        <!-- <div class="title">Thông tin Cá nhân</div> -->
        <div class="account-body">
          <div style="border: 1px solid #; border-radius: 10px">
            <label for=""
              ><i class="mdi mdi-history"></i> Lịch Sử Mua Nick của
              <font color="red">Admin</font></label
            ><br />
            <small id="fileHelp" class="form-text text-muted"
              >Xem lại các Giao dịch gần nhất.</small
            ><br /><br />
            <div class="table-responsive">
              <table
                style="font-size: 14px"
                class="table table-striped table-border"
              >
                <thead>
                  <tr>
                    <th class="trading-code">
                      <font color="white">Mã GD</font>
                    </th>
                    <th class="info-history">
                      <font color="white">Mô Tả</font>
                    </th>
                    <th class="holder-action">
                      <font color="white">Thao tác</font>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(history, index) in histories" :key="index">
                    <td class="text-middle">{{ history.ID }}</td>

                    <td class="text-middle text-left">
                      <b-row>
                        <b-col :cols="12" :sm="6" :md="3" :lg="3">
                          Game: {{ history.accountType }}
                        </b-col>
                        <b-col :cols="12" :sm="6" :md="2" :lg="3">
                          Mã số: {{ format_number(history.accountId) }}
                        </b-col>
                        <b-col :cols="12" :sm="6" :md="3" :lg="3">
                          Giá: {{ format_number(history.accountCash) }} VNĐ
                        </b-col>
                        <b-col :cols="12" :sm="6" :md="4" :lg="3">
                          Time: {{ history.buyAt }}
                        </b-col>
                      </b-row>
                    </td>

                    <td class="text-middle">
                      <b-button class="btn btn-success bdrs-5px"
                        >CHI TIẾT</b-button
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div id="next-bottom"></div>
    </div>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");
import mixins from "@/mixins/index";

export default {
  layout: "clientLayout",
  mixins: [mixins],

  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapFields("home/users", { histories: "historyBuyAccounts" }),
    ...mapFields("home/game/ninjas", {}),
    ...mapState(["token", "user"]),
  },
  async mounted() {
    if (!this.token) {
      this.$router.push("/login");
    }
    this.historyBuyAccounts();
  },
  methods: {
    ...mapActions(["historyBuyAccounts"]),
  },
};
</script>
<style lang="scss" scoped>
</style>