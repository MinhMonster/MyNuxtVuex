<template>
  <client-only>
    <v-row class="bg-editor bg-finance">
      <v-col cols="12" sm="6" md="6">
        <v-text-field label="Ngày" v-model="finance.title"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field label="Đường link" v-model="finance.link"></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <b-form-group>
          <ContentEditer style="height:200px" label="Info" v-model="finance.info"></ContentEditer>
        </b-form-group>
      </v-col>
    </v-row>
  </client-only>
</template>

<script>
import ContentEditer from "@/components/pages/admin/Shared/nuxt-editor/CkEditorNuxt.vue";
export default {
  components: {
    ContentEditer,
  },
  props: {
    finance: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editorOption: {
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
      },
    };
  },
  name: "Formfinance",
  methods: {
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
  },
};
</script>
<style>
.CodeMirror-sizer {
  min-height: 500px;
}
.bg-finance .ck.ck-content.ck-editor__editable.ck-rounded-corners{
  max-height:150px !important
}
</style>