<template>
  <v-row class="right mgr-5px" :class="{ middle: icon == 'add-file' }">
    <v-dialog light v-model="dialog" persistent width="1250" class="modal">
      <template v-slot:activator="{ props }">
        <v-btn
          v-if="icon == 'btn-icon'"
          v-bind="props"
          icon
          class="right primary"
          @click="dialog = true"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <i
          v-if="icon == 'add-file'"
          class="display-4 text-muted mdi mdi-playlist-plus"
          @click="dialog = true"
        ></i>
      </template>
      <v-card class="modal-upload">
        <v-card-title>
        </v-card-title>
        <v-card-text>
          <v-container>
            <b-tabs>
              <b-tab title="Upload Images">
                <FileSelector @uploaded="uploaded"></FileSelector>
              </b-tab>
              <b-tab title="Manager Folder">
                <FolderFile
                  v-if="folders"
                  :folders="folders"
                  :selectedImages="selectedImages"
                  :activated="activated"
                  @newFolder="newFolder"
                  @selected="selected"
                ></FolderFile>
              </b-tab>
              <b-tab v-if="selectedImages.length" title="Selected Images">
                <FileSelected
                  :selectedImages="selectedImages"
                  @removeFile="removeFile"
                ></FileSelected>
              </b-tab>
            </b-tabs>
            <v-col cols="12" sm="12" md="12"> </v-col>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="saveSelected()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import FileSelector from "@/components/global/molecules/common/FileSelector.vue";
import FileSelected from "@/components/global/molecules/common/FileSelected.vue";
import FolderFile from "@/components/global/molecules/common/FolderFile.vue";

export default {
  components: {
    FileSelector,
    FileSelected,
    FolderFile,
  },
  props: {
    activated: {
      type: Array,
      default: () => [],
    },
    icon: {
      type: String,
      default: "btn-icon",
    },
  },
  data: () => ({
    dialog: false,
    image: {},
  }),
  computed: {
    ...mapFields("admin/folders", ["folders"]),
    ...mapFields("global", ["selectedImages"]),
  },
  methods: {
    ...mapActions("admin/folders", [
      "fetchFolders",
      "deleteMedia",
      "createFolder",
      "editNameFolder",
    ]),
    ...mapActions("global", ["setSelectedImages"]),

    uploaded(files) {
      this.dialog = false;
      this.$emit("onUploaded", files);
    },

    async newFolder(value) {
      const result = await this.createFolder(value);
      if (result.data.code === 200) {
        this.$toasted.success(result.data.message);
      }
      await this.fetchFolders();
    },

    selected(files) {
      console.log("selected", files);
      this.selectedImages = files;
      this.setSelectedImages(this.selectedImages);
    },

    removeFile(file) {
      this.selectedImages = this.selectedImages.filter((item) => item != file);
      this.setSelectedImages(this.selectedImages);
    },

    saveSelected() {
      this.dialog = false;
      this.$emit("onUploaded", this.selectedImages);
      this.setSelectedImages([]);
    },

  },
};
</script>
