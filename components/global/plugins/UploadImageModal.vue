<template>
  <v-row class="right mgr-5px">
    <v-dialog light v-model="dialog" persistent width="1250" class="modal">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon class="right primary" @click="dialog = true">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card class="modal-upload">
        <v-card-title>
          <!-- <span class="text-h5">Upload Image</span> -->
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
                  @newFolder="newFolder"
                ></FolderFile>
              </b-tab>
            </b-tabs>
            <v-col cols="12" sm="12" md="12"> </v-col>
          </v-container>
          <!-- <small>*indicates required field</small> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
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
import FolderFile from "@/components/global/molecules/common/FolderFile.vue";

export default {
  components: {
    FileSelector,
    FolderFile,
  },
  data: () => ({
    dialog: false,
    image: {},
  }),
  computed: {
    ...mapFields("admin/folders", ["folders"]),
  },
  methods: {
    ...mapActions("admin/folders", [
      "fetchFolders",
      "deleteMedia",
      "createFolder",
      "editNameFolder",
    ]),
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
  },
};
</script>
