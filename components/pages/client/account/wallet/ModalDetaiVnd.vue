
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
                    <span>{{ format_number(history.id) }}</span>
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="width: 30%">Số tiền nạp</th>
                  <td class="mua-nick break-all">
                    <span>{{ format_number(history.amount) }} đ </span>
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="">Ngày thực hiện</th>
                  <td class="mua-nick">
                    <span> {{ history.transaction_at }}</span>
                  </td>
                </tr>

                <tr>
                  <th class="info-nick" style="">Trạng Thái</th>
                  <td class="mua-nick">
                    <Status :value="history.status"></Status>
                  </td>
                </tr>

                <tr v-if="history.status !== 'success'">
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
import Status from "@/components/global/molecules/common/Status";

export default {
  components: {
    ModalPayload,
    HistoryInstructionBankByQR,
    Status,
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
