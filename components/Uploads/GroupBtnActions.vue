<template>
  <div class="folder-plugin nowrap scroll-x">
    <v-btn color="white" @click="$emit('setShowFolder')">
      <v-icon>mdi-folder-move</v-icon>
    </v-btn>
    <v-btn color="white" @click="$emit('browseFiles')">
      <v-icon>mdi-upload</v-icon>
    </v-btn>
    <v-btn color="white" @click="$emit('setIsShow', true)">
      <v-icon>mdi-folder-plus</v-icon>
    </v-btn>
    <v-btn v-if="!isZoom" color="white" @click="$emit('setIsZoom', true)">
      <v-icon>mdi-arrow-expand-all</v-icon>
    </v-btn>
    <v-btn v-else color="white" @click="$emit('setIsZoom', false)">
      <v-icon>mdi-arrow-collapse-all</v-icon>
    </v-btn>
    <v-btn color="white" @click="$emit('fetchFolders')">
      <v-icon>mdi-reload</v-icon>
    </v-btn>
    <v-btn color="white">
      <BaseCheckBox
        :value="isUploadMms"
        @change="(value) => ((isUploadMms = value), $emit('fetchFolders'))"
      >
      </BaseCheckBox>
    </v-btn>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

import BaseCheckBox from "@/components/pages/admin/base/form/BaseCheckBox";
export default {
  components: { BaseCheckBox },
  computed: {
    ...mapFields("admin/folders", ["isUploadMms"]),
  },
  props: {
    isZoom: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.folder-plugin {
  width: 100%;
  min-width: 675px;
  color: #fafafa !important;
  height: 50px;
  padding: 7.5px;
  background: #fafafa;
  color: #495057 !important;
}
</style>
