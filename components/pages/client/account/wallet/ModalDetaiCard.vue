
<template>
  <div>
    <ModalPayload
      ref="modal"
      title="Chi tiết Thẻ nạp"
      size="md"
      hiddenFooter
      @hide="close"
    >
      <template #content>
        <div class="page-body">
          <div v-if="history" class="table-responsive">
            <table class="table">
              <tbody>
                <tr>
                  <th class="info-nick" style="width: 30%">Mã giao dịch</th>
                  <td class="mua-nick">
                    <span>{{ format_number(history.ID) }}</span>
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="width: 30%">Loại thẻ</th>
                  <td class="mua-nick">
                    <span>{{ history.telco }}</span>
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="width: 30%">Mệnh giá</th>
                  <td class="mua-nick break-all">
                    <span>{{ format_number(history.amount) }} đ </span>
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="width: 30%">
                    Tiền nhận trên Web
                  </th>
                  <td class="mua-nick">
                    <span>{{ format_number(history.amount) }} đ </span>
                  </td>
                </tr>

                <tr>
                  <th class="info-nick" style="">Ngày thực hiện</th>
                  <td class="mua-nick">
                    <span> {{ history.createAt }}</span>
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="width: 30%">Hình thức</th>
                  <td class="mua-nick">
                    <span>Nạp thẻ tự động</span>
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="">Trạng Thái</th>
                  <td class="mua-nick">
                    <v-btn
                      :color="history.status.value"
                      class="text-white pd-5px"
                    >
                      {{ history.status.text }}
                    </v-btn>
                    <div v-if="history.status.value === 'warning'" class="mt-1">
                      Thẻ sẽ duyệt tự động sau 3s-1p
                    </div>
                  </td>
                </tr>

                <tr>
                  <td class="mua-nick text-left instruction" colspan="2">
                    <DepositCardInstructions />
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
import DepositCardInstructions from "@/components/common/DepositCardInstructions";

export default {
  components: {
    ModalPayload,
    DepositCardInstructions,
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
