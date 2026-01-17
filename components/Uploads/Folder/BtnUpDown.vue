<template>
  <v-icon
    class="icon-up"
    v-if="
      folderShowList &&
      folderShowList.id == folder.id &&
      folder.sub_folders?.length
    "
  >
    mdi-menu-up
  </v-icon>
  <v-icon class="icon-down" v-else-if="folder.sub_folders?.length">
    mdi-menu-down
  </v-icon>
</template>
<script>
export default {
  props: {
    folderShowList: {
      type: [Object, null],
      default: () => null,
    },
    folder: {
      type: [Object, null],
      default: () => null,
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-up,
.icon-down {
  float: right;
  padding: 5px 0;
  // position: absolute;
}
</style>
