<template>
  <v-btn :icon="!button" :color="color" v-bind="$attrs" @click="$emit('click')">
    <div
      class="base-svg"
      v-html="require(`@/assets/images/svg/${name}.svg?raw`)"
    />
    <template v-if="content">{{ content }}</template>
  </v-btn>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    name: { type: String, default: "home" },
    color: { type: String, default: null },
    content: { type: String, default: null },
    button: Boolean,
  },
};
</script>
