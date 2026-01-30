<template>
  <client-only>
    <HomePage
      :title="title"
      :loading="!ready"
      goBack
      reload
      table
      @reload="reload"
    >
      <!-- BODY -->
      <template v-if="ready" #body>
        <form class="form" @submit.prevent="submit">
          <div class="content-main text-center">
            Hãy tạo giao dịch nạp tiền sau đó làm theo hướng dẫn
            <br />
            Thời gian duyệt 30s - 5 Phút
          </div>

          <v-row class="mt-2">
            <v-col cols="12" sm="6" class="middle custom-field-input mb-2">
              <div class="field">
                <form-validator name="amount">
                  <BaseInputCash
                    v-model="amount"
                    placeholder="Nhập số tiền cần nạp..."
                    class="v-input form-input"
                  />
                </form-validator>
              </div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="field submit mt-2">
                <v-btn
                  size="sm"
                  class="btn-neon-purple w-100"
                  type="submit"
                  :disabled="isLoading"
                >
                  <Loading v-if="isLoading" button />
                  <span v-else>Tạo giao dịch nạp tiền</span>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </form>
      </template>
      <!-- TABLE -->
      <template #table>
        <BaseTableSearch
          ref="table"
          module="client/topUpBank"
          table-title="Lịch sử nạp tiền của bạn"
          table-icon="history"
          table-content="Xem lại các giao dịch gần nhất."
          is-table-modal
          title-modal="Chi tiết giao dịch"
        >
          <template #table-modal="{ row }">
            <tr v-if="row.status === 'pending'">
              <td class="mua-nick text-left instruction" colspan="2">
                <HistoryInstructionBankByQR :history="row" />
              </td>
            </tr>
          </template>
        </BaseTableSearch>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import mixins from "@/mixins/index";

import HomePage from "@/components/pages/home/HomePage";
import Loading from "@/components/global/molecules/common/Loading";
import FormValidator from "@/components/global/form/FormValidator";
import BaseInputCash from "@/components/base/BaseInputCash";
import HistoryInstructionBankByQR from "@/components/pages/client/account/wallet/HistoryInstructionBankByQR";

export default {
  middleware: ["authentication"],
  layout: "clientLayout",
  mixins: [mixins],

  components: {
    HomePage,
    Loading,
    FormValidator,
    BaseInputCash,
    HistoryInstructionBankByQR,
  },

  data() {
    return {
      title: "NẠP VĐT ATM-MOMO",
      amount: "",
      isLoading: false,
    };
  },

  computed: {
    ...mapFields("global", {
      ready: "ready",
    }),
  },

  mounted() {
    this.reload();
  },

  methods: {
    async submit() {
      this.isLoading = true;
      try {
        const res = await this.$repositories.clientTopUpBank.create({
          amount: this.amount,
        });
        this.isLoading = false;

        const history = res?.data?.response;
        if (!history) return;

        await this.$refs.table.showItemModal(history);
        this.resetInput();
      } catch (error) {
      } finally {
        this.isLoading = false;
      }
    },

    resetInput() {
      this.amount = "";
    },

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
