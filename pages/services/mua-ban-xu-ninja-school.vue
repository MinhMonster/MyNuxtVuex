<template>
  <client-only>
    <HomePage
      :title="title"
      :loading="!ready"
      goBack
      reload
      @reload="reload()"
      table
    >
      <template v-if="ready" #body>
        <NinjaCoinBuyForm
          @submit="(value) => $refs.table.showItemModal(value)"
        />
      </template>

      <template #table>
        <XuPriceTable :cards="ninjaCoinPrices" class="mb-6" />
        <!-- histories -->
        <BaseTableSearch
          v-if="isLogin"
          table-title="Lịch sử mua xu của bạn"
          table-icon="history"
          table-content="Xem lại các Giao dịch gần nhất."
          is-table-modal
          title-modal="Chi tiết Giao dịch"
          module="client/ninjaCoins"
          ref="table"
        >
          <template #table-modal="{ row }">
            <tr v-if="row.status === 'pending'">
              <td class="mua-nick text-left instruction" colspan="2">
                <div class="pd-5px text-white">
                  <img src="/icon/icon-next-right.gif" /> Bạn vui lòng liên hệ
                  Admin kèm Mã GD:
                  <span class="text-danger">#{{ row.id }}</span> để nhận xu nhé!
                  <GroupBtnInbox />
                </div>
              </td>
            </tr>
          </template>
        </BaseTableSearch>
      </template>
    </HomePage>
  </client-only>
</template>


<script>
import XuPriceTable from "@/components/pages/services/XuPriceTable";
import HomePage from "@/components/pages/home/HomePage";
import NinjaCoinBuyForm from "@/components/pages/ninjaCoin/NinjaCoinBuyForm";
import GroupBtnInbox from "@/components/common/client/button/GroupBtnInbox";
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";

export default {
  layout: "clientLayout",
  components: {
    HomePage,
    NinjaCoinBuyForm,
    XuPriceTable,
    GroupBtnInbox,
  },
  watch: {
    isLogin: {
      async handler(newValue, oldValue) {
        this.reload();
      },
    },
  },
  data() {
    return {
      title: "Mua Bán Xu Ninja School",
    };
  },
  computed: {
    ...mapFields("global", { ready: "ready" }),
    ...mapFields("client/ninjaCoins", {
      ninjaCoinPrices: "ninjaCoinPrices",
    }),
  },
  mounted() {
    this.reload();
  },
  methods: {
    ...mapActions("client/ninjaCoins", ["fetchXuNinjaPrices"]),
    async reload() {
      this.ready = false;
      await this.fetchXuNinjaPrices();
      setTimeout(() => {
        this.ready = true;
      }, 400);
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
