<template>
  <div @click="$emit('setFolderUpload', folder)">
    <span class="folder-name">
      <v-icon v-if="folderActive.id == folder.id" color="blue">
        mdi-folder-multiple
      </v-icon>
      <v-icon v-else color="blue">mdi-folder</v-icon>{{ folder.name }}
      <v-icon class="dots-vertical" @click="$emit('editFolder', folder)"
        >mdi-dots-vertical</v-icon
      >
    </span>
  </div>
</template>
<script>
export default {
  props: {
    folder: {
      type: [Object, null],
      default: () => null,
    },
    folderActive: {
      type: [Object, null],
      default: () => null,
    },
  },
};
</script>

<style lang="scss" scoped>
.dots-vertical {
  float: right;
  padding: 5px 0;
  right: 0px !important;
  position: absolute;
}
</style>
