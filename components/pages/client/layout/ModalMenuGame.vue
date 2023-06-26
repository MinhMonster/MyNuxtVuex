
<template>
  <div>
    <ModalPayload :title="`Menu Nick Game`" @hide="close()">
      <template #content>
        <div class="page-body">
          
        </div>
      </template>
    </ModalPayload>
  </div>
</template>
  
<script>
import mixins from "@/mixins/index";
import ModalPayload from "@/components/common/ModalPayload";

export default {
  name: "ModalBuyAccountDragonBall",
  mixins: [mixins],

  components: {
    ModalPayload,
  },
  props: {},
  data() {
    return {};
  },
  async mounted() {},
  computed: {},
  methods: {
    close() {
      this.$emit("hide");
    },
  },
};
</script>
  
  <style lang="scss" scoped>
</style>
