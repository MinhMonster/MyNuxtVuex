<template>
  <div v-if="visible" class="loading-template" :class="{ hidden: hidden }">
    <div class="svg">
      <Loading />
    </div>
  </div>
</template>

<script>
import Loading from "@/components/pages/admin/layout/Loading.vue";

export default {
  components: {
    Loading,
  },
  data: () => ({
    visible: false,
    hidden: true,
  }),
  computed: {
    requests() {
      return this.$store.state.requests;
    },
  },
  mouted() {},
  watch: {
    "requests.length"(value) {
      if (value > 0) {
        this.begin();
      } else {
        this.stop();
      }
    },
  },
  methods: {
    begin() {
      this.hidden = false;
      this.visible = true;
      document.body.classList.add("overflow-hidden");
    },
    stop() {
      this.hidden = true;
      setTimeout(() => {
        this.visible = false;
        document.body.classList.remove("overflow-hidden");
      }, 500);
    },
  },
};
</script>
<style>
.loading-template {
  z-index: 100000;
  position: fixed;
  background-color: #333;
  opacity: 0.8;
  height: 100vh;
  width: 100%;

}

.loading-template .svg {
  z-index: 100000;
  position: fixed;
  background-color: #333;
  right: calc(50% - 30px);
  top: calc(50% - 30px);
  height: 100px;
}

</style>