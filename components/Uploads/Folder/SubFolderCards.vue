<template>
  <div class="sub-folders">
    <div
      v-for="(folder, index) in folders"
      :key="index"
      class="pointer sub-folder"
      :class="{ active: folderActive.id == folder.id }"
    >
      <FolderCard
        :folder="folder"
        :folder-active="folderActive"
        @setPath="(value) => $emit('setPath', value)"
        @editFolder="(value) => $emit('editFolder', value)"
      />
    </div>
  </div>
</template>
<script>
import FolderCard from "@/components/Uploads/Folder/FolderCard.vue";
export default {
  components: {
    FolderCard,
  },
  props: {
    folders: {
      type: Array,
      default: () => [],
    },
    folderActive: {
      type: [Object, null],
      default: () => null,
    },
  },
};
</script>

<style lang="scss" scoped>
.sub-folders {
  width: 100%;
  margin-left: 0;
}
.sub-folder {
  border-top: 1px solid #d7dcdf;
  padding-left: 25px;
  padding-top: 0;
  padding-bottom: 0;
  line-height: 43px;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 1px;
  position: relative;
  @media (max-width: 675px) {
    padding-left: 15px !important;
  }
  // // padding-left: 15px;
  &.active {
    margin-left: -35px;
    border: 2px solid #2196f3 !important;
    padding-left: 60px;
    @media (max-width: 675px) {
      padding-left: 35px !important;
    }
  }
}
</style>
