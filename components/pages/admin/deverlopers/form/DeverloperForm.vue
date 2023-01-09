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
        <b-form-group>
        <b-tabs>
          <b-tab title="Thông Tin">
            <ContentEditer  label="Info" v-model="deverloper.info"></ContentEditer>
            
          </b-tab>
          <b-tab title="Code">
            <codemirror
              v-model="deverloper.content"
              :options="{
                // lineWrapping: true,
                mode: `text/x-vue`,
                viewportMargin: 15,
                // readOnly: false,
                theme: `vscode-dark`,
              }"
            >
            </codemirror>
          </b-tab>
          <b-tab title="HTML">
            <codemirror
              v-model="deverloper.html_code"
              :options="{
                lineWrapping: true,
                mode: `text/x-vue`,
                viewportMargin: 15,
                readOnly: false,
                theme: `vscode-dark`,
              }"
            >
            </codemirror>
          </b-tab>
          <b-tab title="CSS">
            <codemirror
              v-model="deverloper.css_code"
              :options="{
                lineWrapping: true,
                mode: `text/css`,
                viewportMargin: 15,
                readOnly: false,
                theme: `vscode-dark`,
              }"
            >
            </codemirror>
          </b-tab>
          <b-tab title="Javascript">
            <codemirror
              v-model="deverloper.javascript_code"
              :options="{
                lineWrapping: true,
                mode: `text/x-java`,
                viewportMargin: 15,
                readOnly: false,
                theme: `vscode-dark`,
              }"
            >
            </codemirror>
          </b-tab>
        </b-tabs>
      </b-form-group>
        
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
  data() {
    return {
      editorOption: {
        tabSize: 2,
        mode: "text/javascript",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
      },
    }
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
<style >
</style>