
<template>
  <div>
    <ModalPayload
      ref="modal"
      title="Nạp Lượng, Carot  Offline"
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
                  <th class="info-nick w-50" style="">Game</th>
                  <td class="mua-nick w-50">
                    <span>{{ selected.game.text }}</span>
                  </td>
                </tr>
                <tr>
                  <th class="info-nick w-50" style="">Server</th>
                  <td class="mua-nick w-50">
                    <span>{{ selected.server.text }}</span>
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="">Tài khoản game</th>
                  <td class="mua-nick break-all">
                    <span>{{ history.username }}</span>
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="">Carot</th>
                  <td class="mua-nick break-all">
                    <span>{{ format_number(history.amount) }} đ </span>
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="">Số tiền</th>
                  <td class="mua-nick break-all">
                    <span>{{ format_number(selected.card.price) }} đ </span>
                  </td>
                </tr>
                <tr>
                  <td class="mua-nick text-left instruction" colspan="2">
                    <CarotBankByQR :history="history" :selected="selected" />
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
import CarotBankByQR from "@/components/pages/services/CarotBankByQR";
export default {
  components: {
    ModalPayload,
    CarotBankByQR,
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
