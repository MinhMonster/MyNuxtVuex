<template>
  <client-only>
    <HomePage
      :title="title"
      content="Xem lại biến động Số dư của bạn tại đây."
      full-screen
      :loading="!ready"
      goBack
      reload
      @reload="onPageChange(queryPage)"
    >
      <template v-if="token && user && ready && histories" #body>
        <BaseTable
          :columns="columns"
          :data="histories"
          :meta="historyMeta"
          :empty="`Bạn chưa có giao dịch nào!`"
          responsive
          class="table table-striped table-border"
          @onChange="onPageChange"
        >
          <template #amount="props">
            <div
              v-if="props.row.direction === 'decrease'"
              class="text-danger .white-space-nowrap"
            >
              - {{ format_number(props.row.amount) }}
            </div>
            <div v-else class="text-success flex">
              + {{ format_number(props.row.amount) }}
            </div>
          </template>
          <template #description="props">
            <div
              v-if="props.row.type === 'purchase'"
              @click="$router.push(`/account/history/${props.row.meta?.id}`)"
            >
              {{ props.row.description}}
              <!-- <base-svg name="open-in-new-window"/> -->
            </div>
            <div v-else>
              {{ props.row.description }}
            </div>
          </template>
        </BaseTable>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import Loading from "@/components/global/molecules/common/Loading";
import HomePage from "@/components/pages/home/HomePage";
import Pagination from "@/components/global/molecules/common/Pagination";
import BaseTable from "@/components/base/BaseTable";

import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");

export default {
  middleware: ["authentication"],
  layout: "clientLayout",

  components: { Loading, Pagination, HomePage, BaseTable },
  computed: {
    ...mapFields("global", { ready: "ready" }),
    ...mapFields("home/users", {
      histories: "historyChangeMoneys",
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
    ...mapActions(["historyChangeMoneys", "setQuery", "resetQuery"]),
    nextTop() {
      const element = document.getElementById("history");
      element.scrollIntoView();
    },
    async onPageChange(page) {
      this.ready = false;
      await this.setQuery({ page });
      await this.historyChangeMoneys();
      await this.$router.push(`/account/transactions?page=${page}`);
      this.ready = true;
    },
    increaseMoney(history) {
      return history.direction === "increase";
    },
  },
  data() {
    return {
      title: "Biến Động Số Dư",
      columns: [
        {
          key: "id",
          label: "ID",
          type: "number",
          class: "min-w-60px text-center",
          attributes: {
            align: "center",
          },
        },
        {
          key: "description",
          label: "Mô tả",
          class: "min-w-150px",
          attributes: {
            minWidth: "120",
          },
        },
        {
          key: "balance_before",
          label: "Trước",
          type: "number",
          attributes: {},
        },
        {
          key: "amount",
          label: "Số tiền",
          type: "number",
          class: "min-w-120px",
          attributes: {},
        },
        {
          key: "balance_after",
          label: "Sau",
          type: "number",
          attributes: {},
        },
        {
          key: "created_at",
          label: "Thời gian",
          class: "w-180px min-w-180px text-center",
          attributes: {},
        },
      ],
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
  max-width: 1350px;
}
</style>
