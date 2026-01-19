<template>
  <client-only>
    <HomePage
      :title="title"
      content="Xem lại biến động Số dư của bạn tại đây."
      full-screen
      :loading="!ready"
      goBack
      reload
      @reload="fetchDataIndex(queryPage)"
    >
      <template v-if="ready" #body>
        <BaseTable
          :columns="columns"
          :data="histories"
          :meta="historyMeta"
          empty="Bạn chưa có giao dịch nào!"
          responsive
          class="table table-striped table-border"
          @onChange="onPageChange"
        >
          <!-- Amount -->
          <template #amount="{ row }">
            <div :class="amountClass(row)" class="white-space-nowrap">
              {{ amountPrefix(row) }} {{ format_number(row.amount) }}
            </div>
          </template>
          <template #description="{ row }">
            <div v-if="row.type === 'purchase'" class="pointer">
              {{ row.description }}
            </div>
            <div v-else>
              {{ row.description }}
            </div>
          </template>
        </BaseTable>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";
import BaseTable from "@/components/base/BaseTable";
import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";

const { mapActions } = createNamespacedHelpers("home/users");

export default {
  middleware: ["authentication"],
  layout: "clientLayout",

  components: { HomePage, BaseTable },
  data() {
    return {
      title: "Biến Động Số Dư",
      columns: [
        {
          key: "id",
          label: "ID",
          type: "number",
          class: "min-w-60px text-center",
        },
        {
          key: "description",
          label: "Mô tả",
          class: "min-w-150px",
        },
        {
          key: "balance_before",
          label: "Trước",
          type: "number",
        },
        {
          key: "amount",
          label: "Số tiền",
          type: "number",
          class: "min-w-120px",
        },
        {
          key: "balance_after",
          label: "Sau",
          type: "number",
        },
        {
          key: "created_at",
          label: "Thời gian",
          class: "w-180px min-w-180px text-center",
        },
      ],
    };
  },

  computed: {
    ...mapFields("global", { ready: "ready" }),
    ...mapFields("home/users", {
      histories: "walletTransactions",
      historyMeta: "historyMeta",
    }),

    queryPage() {
      return Number(this.$route.query.page || 1);
    },
  },

  async mounted() {
    await this.resetQuery();
    await this.fetchDataIndex(this.queryPage);
  },

  methods: {
    ...mapActions(["fetchWalletTransactions", "setQuery", "resetQuery"]),
    async fetchDataIndex(page) {
      this.ready = false;
      await this.setQuery({ page });
      await this.fetchWalletTransactions();
      await this.goToPage(page);
      this.ready = true;
    },

    async onPageChange(page) {
      if (page === this.queryPage) return;

      await this.fetchDataIndex(page);
    },

    goToPage(page) {
      const query = page > 1 ? { page } : {};
      this.$router.push({
        path: this.path,
        query,
      });
    },

    amountClass(row) {
      return row.direction === "out" ? "text-danger" : "text-success";
    },

    amountPrefix(row) {
      return row.direction === "out" ? "-" : "+";
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
  max-width: 1000px !important;
}
</style>
