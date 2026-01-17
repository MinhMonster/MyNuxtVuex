<template>
  <div class="sub-folders">
    <div v-for="folder in folders" :key="folder.id">
      <FolderCard
        :folder="folder"
        :folder-active="folderActive"
        class="pointer sub-folder"
        :class="{ active: folderActive && folderActive.id === folder.id }"
        :style="indentStyle"
        @setPath="$emit('setPath', $event)"
        @editFolder="$emit('editFolder', $event)"
      >
        <template #btn-up-down>
          <BtnUpDown :folderShowList="folder_show_list" :folder="folder" />
        </template>
      </FolderCard>

      <SubFolderCards
        v-if="folder.sub_folders && folder.sub_folders?.length"
        :folders="folder.sub_folders"
        :folder-active="folderActive"
        :level="level + 1"
        @setPath="$emit('setPath', $event)"
        @editFolder="$emit('editFolder', $event)"
      />
    </div>
  </div>
</template>

<script>
import FolderCard from "@/components/Uploads/Folder/FolderCard.vue";
import BtnUpDown from "@/components/Uploads/Folder/BtnUpDown.vue";

export default {
  name: "SubFolderCards",
  components: {
    FolderCard,
    SubFolderCards: () => import("./SubFolderCards.vue"),
    BtnUpDown,
  },
  props: {
    folders: { type: Array, default: () => [] },
    folderActive: { type: Object, default: null },
    level: { type: Number, default: 1 },
    folder_show_list: { type: Object, default: null },
  },
  computed: {
    indentStyle() {
      return {
        paddingLeft: `${60 + (this.level - 1) * 25}px`,
        marginLeft: "-35px",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.sub-folders {
  width: 100% !important;
  margin-left: 0;
}
.sub-folder {
  border-top: 1px solid #d7dcdf;
  line-height: 43px;
  position: relative;

  &.active {
    border: 2px solid #2196f3 !important;
    background: #e3f2fd;
  }
}
</style>
