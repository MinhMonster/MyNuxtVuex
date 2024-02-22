<template>
  <div
    class="base-svg"
    v-html="require(`@/assets/images/svg/${name}.svg?raw`)"
  />
</template>

<script>
export default {
  props: {
    name: { type: String, default: "home" },
  },
};
</script>

<style scoped lang="scss">

</style>
