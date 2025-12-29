
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
                  <th class="info-nick w-50" style="">Mã GD</th>
                  <td class="mua-nick w-50">
                    <span>{{ format_number(history.ID) }}</span>
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="">Tên nhân vật</th>
                  <td class="mua-nick">
                    <span> {{ history.ingame }}</span>
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="">Server</th>
                  <td class="mua-nick">
                    <span> {{ history.server }}</span>
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="">Số tiền</th>
                  <td class="mua-nick break-all">
                    <span>{{ format_number(history.amount) }} đ </span>
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="">Giá</th>
                  <td class="mua-nick">
                    <span>x{{ format_number(history.price) }} </span>
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="">Xu nhận</th>
                  <td class="mua-nick">
                    <span>{{ format_number(history.xu) }} xu </span>
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="">Ngày thực hiện</th>
                  <td class="mua-nick">
                    <span> {{ history.created_at }}</span>
                  </td>
                </tr>

                <tr>
                  <th class="info-nick" style="">Trạng Thái</th>
                  <td class="mua-nick">
                    <v-btn
                      :color="history.status.value"
                      class="btn-sm pd-5px"
                      :class="
                        history.status.text === 'danger'
                          ? 'text-white'
                          : 'text-black'
                      "
                    >
                      {{ history.status.text }}
                    </v-btn>
                  </td>
                </tr>

                <tr v-if="history.status.value === 'warning'">
                  <td class="mua-nick text-left instruction" colspan="2">
                    <div class="pd-5px">
                      <img src="/icon/icon-next-right.gif" /> Bạn vui lòng liên
                      hệ Admin kèm Mã GD:
                      <span class="text-danger">#{{ history.ID }}</span> để nhận
                      xu nhé!
                      <GroupBtnInbox />
                    </div>
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
import GroupBtnInbox from "@/components/common/client/button/GroupBtnInbox";

export default {
  components: {
    ModalPayload,
    GroupBtnInbox,
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
