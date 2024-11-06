<template>
  <div :class="{ active: folderActive && folderActive.id == folder.id }">
    <div class="folder-name flex-row-space-between">
      <div
        class="body-folder"
        @click="$emit('setPath', { folder: folder, isFolderPath: folderPath })"
      >
        <v-icon
          v-if="
            folderPath
              ? folderPath == folder.path
              : folderActive.id == folder.id
          "
          color="blue"
        >
          mdi-folder-multiple
        </v-icon>
        <v-icon v-else color="blue">mdi-folder</v-icon> {{ folder.name }}
        <slot name="btn-up-down"></slot>
      </div>
      <div>
        <v-icon class="dots-vertical" @click="$emit('editFolder', folder)">
          mdi-dots-vertical
        </v-icon>
      </div>
    </div>
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
    folderPath: {
      type: [String, null],
      default: () => null,
    },
  },
};
</script>

<style lang="scss" scoped>
.body-folder {
  width: 90%;
}
.dots-vertical {
  float: right;
  padding: 5px 0;
  right: 0px !important;
}
</style>
