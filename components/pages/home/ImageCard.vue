<template>
  <client-only>
    <div v-if="game" class="image-card">
      <img
        v-if="game.image"
        eager
        :src="game.image"
        :alt="game.title"
        class="image-banner"
      />
    </div>
  </client-only>
</template>
<script>
export default {
  name: "ImageCard",
  components: {},
  props: {
    game: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
.image-card {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  // height: 220px;

  overflow: hidden;
  // border-radius: 5px;

  img {
    width: 100%;
    height: auto;
    aspect-ratio: 1006/750 !important;
  }
}
</style>
