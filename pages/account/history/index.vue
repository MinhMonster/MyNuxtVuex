<template>
  <client-only>
    <HomePage
      title="Lịch Sử Mua Nick của Bạn"
      content="Xem lại các Giao dịch gần nhất."
      full-screen
      :loading="!ready"
      goBack
      reload
      @reload="onPageChange(queryPage)"
    >
      <template v-if="token && user && ready && histories" #body>
        <div class="table-responsive">
          <table
            style="font-size: 14px"
            class="table table-striped table-border"
          >
            <thead>
              <tr>
                <th class="trading-code">Mã GD</th>
                <th class="info-history">Mô Tả</th>
                <th class="holder-action">Chi tiết</th>
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
                  <b-button
                    size="sx"
                    class="btn btn-success text-white bdrs-5px"
                    :to="`/account/history/${history.ID}`"
                    >Xem</b-button
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!histories.length" class="text-center">
          <span>Bạn chưa có giao dịch nào!</span>
        </div>
        <Pagination
          v-if="historyMeta && historyMeta.pages > 1"
          :meta="historyMeta"
          @change="onPageChange"
        ></Pagination>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";

import Pagination from "@/components/global/molecules/common/Pagination";

import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");
import mixins from "@/mixins/index";

export default {
  layout: "clientLayout",
  mixins: [mixins],

  components: { Pagination, HomePage },
  data() {
    return {
      ready: false,
    };
  },
  computed: {
    ...mapFields("home/users", {
      histories: "historyBuyAccounts",
      historyMeta: "historyMeta",
    }),
    ...mapFields("home/game/ninjas", {}),
    ...mapState(["token", "user"]),
    queryPage() {
      return _.cloneDeep(this.$route.query.page) || 1;
    },
  },
  async mounted() {
    if (!this.token) {
      this.$router.push("/login");
    } else {
      await this.resetQuery();
      await this.setQuery({ page: this.queryPage });
      this.onPageChange(this.queryPage);
    }
  },
  methods: {
    ...mapActions(["historyBuyAccounts", "setQuery", "resetQuery"]),
    nextTop() {
      const element = document.getElementById("history");
      element.scrollIntoView();
    },
    async onPageChange(page) {
      this.ready = false;
      await this.setQuery({ page });
      await this.historyBuyAccounts();
      page == 1 || !page
        ? await this.$router.push(`/account/history`)
        : await this.$router.push(`/account/history?page=${page}`);
      this.ready = true;
    },
  },
};
</script>
<style lang="scss" scoped>
#home-page {
  max-width: 1024px;
}
</style>