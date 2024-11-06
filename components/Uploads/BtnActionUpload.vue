<template>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn
      color="red"
      variant="danger"
      class="text-white"
      @click="$emit('removeAll')"
    >
      Clear
    </v-btn>
    <v-btn
      color="primary"
      variant="primary"
      class="text-white"
      @click="$emit('uploadFiles')"
    >
      Upload
    </v-btn>
  </v-card-actions>
</template>

<script>
export default {
  props: {},
};
</script>

<style lang="scss" scoped>
</style>
