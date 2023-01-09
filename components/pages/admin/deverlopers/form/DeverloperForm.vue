<template>
  <client-only>
    <v-row class="bg-editor">
      <v-col cols="12" sm="6" md="6">
        <v-text-field label="Tiêu đề" v-model="deverloper.title"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field label="Đường link" v-model="deverloper.link"></v-text-field>
      </v-col>  
      <v-col cols="12" sm="12" md="12" >
        <!-- <VueEditor
          id="editor"
          useCustomImageHandler
          v-model="deverloper.info"
          @image-added="handleImageAdded"
        /> -->
        <ContentEditer  label="Info" v-model="deverloper.info"></ContentEditer>
      </v-col>
    </v-row>
  </client-only>
</template>

<script>
import ContentEditer from "@/components/pages/admin/Shared/nuxt-editor/CkEditorNuxt.vue";
export default {
  components:{
    ContentEditer
  },
  props: {
    deverloper: {
      type: Object,
      required: true,
    },
  },
  name: "FormDeverloper",
  methods:{
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const input = {
        file: formData,
      };
      const res = await api_file.upload(input);
      const url = res.data.file;
      Editor.insertEmbed(cursorLocation, "image", url);
      resetUploader();
    },
  }
};
</script>
