<template>
  <client-only>
    <HomePage :title="title" goBack reload @reload="reset()" notBoder>
      <template #body>
        <div class="mt-4">
          <slot name="content"></slot>
          <BaseFormSearch :module="module" @search="reload" ref="search" />
          <AccountList :module="module" ref="table">
            <template #image="slotProps">
              <component
                v-if="imageComponent"
                :is="imageComponent"
                v-bind="slotProps"
              />
            </template>
          </AccountList>
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";
import AccountList from "@/components/common/client/account/AccountList";
import clientCrud from "@/mixins/clientCrud";

export default {
  mixins: [clientCrud],
  layout: "clientLayout",

  components: {
    HomePage,
    AccountList,
  },
  props: {
    title: {
      type: String,
      default: "Title",
    },
    imageComponent: {
      type: [Object, Function],
      default: null,
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
