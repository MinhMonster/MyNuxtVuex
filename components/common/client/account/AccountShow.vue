<template>
  <client-only>
    <HomePage goBack reload @reload="reload()" table>
      <template #body>
        <AccountDetail
          :module="module"
          ref="detail"
          :title="title"
          :account="account"
        >
          <template #image="slotProps">
            <component
              v-if="imageComponent"
              :is="imageComponent"
              v-bind="slotProps"
            />
          </template>
        </AccountDetail>
      </template>
      <template #table>
        <div class="page-body">
          <div class="">
            <div class="title text-center mb-4">
              <center class="neon-title">
                <h3>Danh Sách Nick Gợi Ý</h3>
              </center>
            </div>
          </div>
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
import AccountDetail from "@/components/common/client/account/AccountDetail";
import AccountList from "@/components/common/client/account/AccountList";
import clientCrud from "@/mixins/clientCrud";

import mixins from "@/mixins/index";

export default {
  mixins: [mixins, clientCrud],
  layout: "clientLayout",
  components: {
    HomePage,
    AccountDetail,
    AccountList,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    imageComponent: {
      type: [Object, Function],
      default: null,
    },
  },
  computed: {
    accountCode() {
      return this.$route.params.code;
    },
    account() {
      return this.stateQueryItem;
    },
  },
  async created() {
    await this.fetchData();
    await this.resetQueryItems();
    await this.storeDispatch("clearResponse", this.storeQueryItems);
  },
  methods: {
    async reload() {
      await this.fetchData();
      await this.resetQueryItems();
      await this.storeDispatch("clearResponse", this.storeQueryItems);
      this.$refs.table.fetchDataIndex();
    },
  },
};
</script>
