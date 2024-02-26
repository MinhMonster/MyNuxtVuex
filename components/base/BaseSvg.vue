<template>
  <v-btn :icon="!button" :color="color" @click="$emit('click')">
    <div
      class="base-svg"
      v-html="require(`@/assets/images/svg/${name}.svg?raw`)"
    />
    <template v-if="content">{{ content }}</template>
  </v-btn>
</template>

<script>
export default {
  props: {
    name: { type: String, default: "home" },
    color: { type: String, default: null },
    content: { type: String, default: null },
    button: Boolean,
  },
};
</script>

<style scoped lang="scss">
</style>
