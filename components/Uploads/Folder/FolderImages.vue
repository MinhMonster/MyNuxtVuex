<template>
  <div class="pointer main-folder" :class="{ active: folderActive == null }">
    <div @click="$emit('setPath', {folder: null, isSetPath: true})">
      <v-icon color="blue">mdi-folder-multiple</v-icon>
      Images
    </div>
  </div>
</template>
<script>
export default {
  props: {
    folderActive: {
      type: [Object, null],
      default: () => null,
    },
  },
};
</script>

<style lang="scss" scoped>
.main-folder {
  position: relative;
  padding: 10px;

  .btn-show {
    position: absolute;
    right: 0px;
    top: 12px;
  }
}

.main-folder.active {
  margin-left: 0px;
  padding-left: 10px;
  border: 2px solid #2196f3 !important;
}
</style>
