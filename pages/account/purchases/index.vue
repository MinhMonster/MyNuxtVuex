<template>
  <client-only>
    <HomePage
      :title="title"
      content="Xem lại các Giao dịch gần nhất."
      full-screen
      goBack
      reload
      @reload="$refs.table.onChangePage(1)"
    >
      <template #body>
        <BaseTableSearch module="client/accountPurchases" ref="table" notBorder>
          <template #actions="{ row }">
            <v-btn
              size="sx"
              color="info"
              class="btn btn-info btn-sm text-white bdrs-5px"
              :to="`/account/purchases/${row.id}`"
              >Xem
            </v-btn>
          </template>
        </BaseTableSearch>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";

export default {
  middleware: ["authentication"],
  layout: "clientLayout",
  components: { HomePage },
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
