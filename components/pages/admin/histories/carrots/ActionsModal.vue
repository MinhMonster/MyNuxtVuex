<template>
  <ModalPayload
    ref="modal"
    :title="item?.taikhoan"
    :text-close="`Hủy`"
    :is-icon-close="false"
    width="300px"
    size="md"
    classContent="bg-white"
    @hide="close()"
  >
    <template #content>
      <div class="pointer text-black" @click="updateStatus()">
        <v-icon color="blue">mdi-lead-pencil</v-icon>
        Update Status
      </div>
      <hr />
      <div class="pointer text-black" @click="onDelete()">
        <v-icon color="red">mdi-delete</v-icon>
        Delete
      </div>
    </template>
  </ModalPayload>
</template>
<script>
import ModalPayload from "@/components/common/ModalPayload";

export default {
  components: { ModalPayload },

  props: {
    label: {
      type: String,
      default: "Title Modal",
    },
    item: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      name: "",
    };
  },

  methods: {
    updateStatus() {
      this.$emit("updateStatus", this.item);
      this.close();
    },
    onDelete() {
      this.$emit("onDelete", this.item);
      this.close();
    },
    change() {
      this.$emit("change", this.name);
      this.$emit("closeModal");
    },
    show() {
      this.$refs.modal.show();
    },
    close() {
      this.$refs.modal.close();
    },
  },
};
</script>
<style lang="scss" scoped>
// .v-card__title {
//   padding: 10px;
//   display: flex;
//   justify-content: center;
//   // color: rgba(0, 0, 0, 0.6) !important;
// }
// .v-divider {
//   padding: 0;
//   margin: 0;
// }
</style>
