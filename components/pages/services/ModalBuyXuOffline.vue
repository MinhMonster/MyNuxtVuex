
<template>
  <div>
    <ModalPayload
      ref="modal"
      title="Mua Xu Ninja Offline"
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
                  <th class="info-nick" style="">Tên nhân vật</th>
                  <td class="mua-nick">
                    <span> {{ history.character_name }}</span>
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
                    <span>x{{ format_number(price) }} </span>
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="">Xu nhận</th>
                  <td class="mua-nick">
                    <span>{{ format_number(price * history.amount) }} xu </span>
                  </td>
                </tr>
                <tr>
                  <td class="mua-nick text-left instruction" colspan="2">
                    <BuyXuNinjaByQR :history="history" :selected="selected" />
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
import BuyXuNinjaByQR from "@/components/pages/services/BuyXuNinjaByQR";
export default {
  components: {
    ModalPayload,
    BuyXuNinjaByQR,
  },
  props: {
    history: {
      type: Object,
      default: () => {},
    },
    selected: {
      type: Object,
      default: () => {},
    },
    price: {
      type: [String, Number],
      default: 0,
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
