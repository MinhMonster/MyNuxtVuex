
<template>
  <div>
    <ModalPayload
      ref="modal"
      title="Chi tiết Giao dịch"
      size="md"
      hiddenFooter
      @hide="close"
    >
      <template #content>
        <div class="page-body">
          <div v-if="history">
            <table class="table">
              <tbody>
                <tr>
                  <th class="info-nick" style="width: 30%">Mã giao dịch</th>
                  <td class="mua-nick">
                    <span>{{ format_number(history.ID) }}</span>
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="width: 30%">Số tiền nạp</th>
                  <td class="mua-nick break-all">
                    <span>{{ format_number(history.moneyAmount) }} đ </span>
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="width: 30%">
                    Tiền nhận trên Web
                  </th>
                  <td class="mua-nick">
                    <span>{{ format_number(history.moneyReceived) }} đ </span>
                  </td>
                </tr>

                <tr>
                  <th class="info-nick" style="">Ngày thực hiện</th>
                  <td class="mua-nick">
                    <span> {{ history.depositAt }}</span>
                  </td>
                </tr>

                <tr>
                  <th class="info-nick" style="">Trạng Thái</th>
                  <td class="mua-nick">
                    <v-btn
                      :color="class_status(history.depositState)"
                      class="btn-sm pd-5px"
                      :class="history.depositState === 'Thất Bại' ? 'text-white' : 'text-black'"
                    >
                      {{ history.depositState }}
                    </v-btn>
                  </td>
                </tr>

                <tr v-if="history.depositState === 'Chờ Duyệt'">
                  <td class="mua-nick text-left instruction" colspan="2">
                    <HistoryInstructionBankByQR :history="history" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </ModalPayload>
  </div>
</template>

<script>
import ModalPayload from "@/components/common/ModalPayload";
import HistoryInstructionBankByQR from "@/components/pages/client/account/wallet/HistoryInstructionBankByQR";

export default {
  components: {
    ModalPayload,
    HistoryInstructionBankByQR,
  },
  props: {
    history: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    show() {
      this.$refs.modal.show();
    },
    close() {
      this.$refs.modal.dialog = false;
      this.$emit("hide");
    },
  },
};
</script>

<style lang="scss" scoped>
.table {
  margin-bottom: 0px !important;
  .instruction {
    padding: 0 !important;
    padding-top: 5px !important;
  }
}
</style>
