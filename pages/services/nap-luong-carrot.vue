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
        <CarrotBuyForm @submit="(value) => $refs.table.showItemModal(value)" />
      </template>

      <template #table>
        <CarotTable :cards="carrotOptions" class="mb-6" />
        <!-- histories -->
        <BaseTableSearch
          v-if="isLogin"
          table-title="Lịch sử nạp Lượng, Carot của"
          table-icon="history"
          table-content="Xem lại các Giao dịch gần nhất."
          is-table-modal
          title-modal="Chi tiết Giao dịch"
          module="client/carrots"
          ref="table"
        >
          <template #table-modal="{ row }">
            <tr v-if="row.status === 'pending'">
              <td class="mua-nick text-left instruction" colspan="2">
                <div class="pd-5px text-white">
                  <img src="/icon/icon-next-right.gif" /> Sau 30s-5p Admin sẽ
                  nạp Lượng, Carot cho bạn.
                  <br />
                  <img src="/icon/icon-next-right.gif" /> Sau 5p khi bạn đã
                  Thanh toán thành công nhưng vẫn chưa được xử lý thì hãy liên
                  hệ cho Admin để được hỗ trợ:
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
import HomePage from "@/components/pages/home/HomePage";
import CarrotBuyForm from "@/components/pages/carrot/CarrotBuyForm";
import CarotTable from "@/components/pages/services/CarotTable";
import GroupBtnInbox from "@/components/common/client/button/GroupBtnInbox";
import { mapFields } from "vuex-map-fields";
import { carrotOptions } from "@/utils/carrotOptions";

export default {
  layout: "clientLayout",
  components: {
    HomePage,
    CarrotBuyForm,
    CarotTable,
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
      title: "Nạp Lượng, Carot",
      carrotOptions,
    };
  },
  computed: {
    ...mapFields("global", { ready: "ready" }),
  },
  mounted() {
    this.reload();
  },
  methods: {
    reload() {
      this.ready = false;
      setTimeout(() => {
        this.ready = true;
      }, 500);
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
