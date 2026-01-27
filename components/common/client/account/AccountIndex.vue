<template>
  <client-only>
    <HomePage :title="title" goBack reload @reload="reset()" notBoder>
      <template #body>
        <div class="mt-4">
          <AccountContent :module="module"/>
          <BaseFormSearch :module="module" @search="reload" ref="search" />
          <AccountList :module="module" ref="table" />
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";
import AccountList from "@/components/common/client/account/AccountList";
import AccountContent from "@/components/common/client/account/AccountContent";

import clientCrud from "@/mixins/clientCrud";

export default {
  mixins: [clientCrud],
  layout: "clientLayout",

  components: {
    HomePage,
    AccountList,
    AccountContent,
  },
  props: {
    title: {
      type: String,
      default: "Title",
    },
  },
  methods: {
    async reload() {
      await this.$refs.table.fetchDataIndex();
    },
    reset() {
      this.$refs.search.reset();
    },
  },
};
</script>
