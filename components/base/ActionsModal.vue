<template>
  <ModalPayload
    ref="modal"
    title="Actions"
    text-close="Hủy"
    :is-icon-close="false"
    width="300px"
    size="md"
    classContent="bg-white"
    @hide="close"
  >
    <template #content>
      <div
        v-for="(action, index) in actions"
        :key="index"
        class="action-item pointer text-black"
        @click="emitAction(action)"
      >
        <v-icon :color="action.color">{{ action.icon }}</v-icon>
        {{ action.label }}
        <hr />
      </div>
    </template>
  </ModalPayload>
</template>

<script>
import ModalPayload from "@/components/common/ModalPayload";

export default {
  components: { ModalPayload },

  props: {
    value: Object,
    actions: {
      type: Array,
      required: true,
    },
  },
  watch: {
    value(val) {
      val ? this.$refs.modal.show() : this.$refs.modal.close();
    },
  },

  methods: {
    close() {
      this.$emit("input", null);
    },

    emitAction(action) {
      this.$emit("action", {
        action: action,
        item: this.value,
      });

      this.close();
    },
  },
};
</script>

<style scoped>
.action-item {
  padding: 8px 0;
}
</style>
