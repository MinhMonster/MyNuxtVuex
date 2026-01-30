<template>
  <client-only>
    <HomePage
      :title="title"
      content="Xem lại biến động Số dư của bạn tại đây."
      :loading="!ready"
      goBack
      reload
      @reload="$refs.table.onChangePage(1)"
    >
      <template v-if="ready" #body>
        <BaseTableSearch module="client/walletTransactions" ref="table" notBorder>
          <template #amount="{ row }">
            <div :class="amountClass(row)" class="white-space-nowrap">
              {{ amountPrefix(row) }} {{ format_number(row.amount) }}
            </div>
          </template>
        </BaseTableSearch>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";
import { mapFields } from "vuex-map-fields";

export default {
  middleware: ["authentication"],
  layout: "clientLayout",

  components: { HomePage },
  data() {
    return {
      title: "Biến Động Số Dư",
    };
  },

  computed: {
    ...mapFields("global", { ready: "ready" }),
  },

  mounted() {
    this.reload();
  },

  methods: {
    async reload() {
      this.ready = false;
      setTimeout(() => {
        this.ready = true;
      }, 500);
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
