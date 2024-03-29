<template>
  <div v-if="visible" class="loading-template" :class="{ hidden: hidden }">
    <div class="svg">
    <Loading />
    </div>
  </div>
</template>

<script>
import Loading from "@/components/global/molecules/common/Loading";

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
      return _.cloneDeep(this.$store.state.requests);
    },
  },
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
  background-color: #333;
  height: 100px;
  width: 100%;
  margin: calc(50vh - 50px) auto;
}
</style>