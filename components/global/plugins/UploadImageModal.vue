<template>
  <v-row class="right mgr-5px">
    <v-dialog light v-model="dialog" persistent width="1024" class="modal">
      <template v-slot:activator="{ props }" class="right">
        <v-btn v-bind="props" icon class="right primary" @click="dialog = true">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card class="modal-upload">
        <v-card-title>
          <span class="text-h5">Upload Image</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <FileSelector @uploaded="uploaded"></FileSelector>
              </v-col>
            </v-row>
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
import FileSelector from "@/components/global/molecules/common/FileSelector.vue";

export default {
  components: {
    FileSelector,
  },
  data: () => ({
    dialog: false,
    image: {},
  }),

  methods: {
    uploaded(files) {
      this.dialog = false;
      this.$emit("onUploaded", files);
    },
  },
};
</script>