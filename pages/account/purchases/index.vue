<template>
  <client-only>
    <HomePage
      :title="title"
      content="Xem lại các Giao dịch gần nhất."
      full-screen
      :loading="!ready"
      goBack
      reload
      @reload="onPageChange(queryPage)"
    >
      <template v-if="isLogin && ready && histories" #body>
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
                <td class="text-middle">{{ history.id }}</td>

                <td class="text-middle text-left">
                  <v-row>
                    <v-col :cols="12" :sm="6" :md="3" :lg="3">
                      Game: {{ game_name(history.account_type) }}
                    </v-col>
                    <v-col :cols="12" :sm="6" :md="2" :lg="3">
                      Mã số: {{ format_number(history.account_code) }}
                    </v-col>
                    <v-col :cols="12" :sm="6" :md="3" :lg="3">
                      Giá: {{ format_number(history.selling_price) }} VNĐ
                    </v-col>
                    <v-col :cols="12" :sm="6" :md="4" :lg="3">
                      Time: {{ history.purchased_at }}
                    </v-col>
                  </v-row>
                </td>

                <td class="text-middle">
                  <v-btn
                    size="sx"
                    color="success"
                    class="btn btn-success btn-sm text-white bdrs-5px"
                    :to="`/account/purchases/${history.id}`"
                    >Xem
                  </v-btn>
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
import mixins from "@/mixins/index";
import HomePage from "@/components/pages/home/HomePage";
import Pagination from "@/components/global/molecules/common/Pagination";
import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");

export default {
  mixins: [mixins],
  middleware: ["authentication"],
  layout: "clientLayout",
  components: { Pagination, HomePage },
  computed: {
    ...mapFields("global", { ready: "ready" }),
    ...mapFields("home/users", {
      histories: "historyBuyAccounts",
      historyMeta: "historyMeta",
    }),
    ...mapFields("home/game/ninjas", {}),
    ...mapState(["token", "user"]),
  },
  async mounted() {
    await this.resetQuery();
    await this.setQuery({ page: this.queryPage });
    this.onPageChange(this.queryPage);
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
        ? await this.$router.push(`/account/purchases`)
        : await this.$router.push(`/account/purchases?page=${page}`);
      this.ready = true;
    },
  },
  data() {
    return {
      title: "Lịch Sử Mua Nick Của Bạn",
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
  max-width: 1024px;
}
</style>
