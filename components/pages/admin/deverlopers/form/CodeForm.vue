<template>
  <client-only>
    <v-row class="bg-editor">
      <v-col cols="12" sm="12" md="12">
        <b-form-group>
          <codemirror
            v-if="action.typeCode == `vue`"
            v-model="codeValue"
            :options="{
              // lineWrapping: true,
              mode: `text/x-vue`,
              viewportMargin: 15,
              // readOnly: false,
              theme: `base16-dark`,
            }"
          >
          </codemirror>
          <codemirror
            v-if="action.typeCode == `css`"
            v-model="codeValue"
            :options="{
              lineWrapping: true,
              mode: `text/css`,
              viewportMargin: 15,
              readOnly: false,
              theme: `vscode-dark`,
            }"
          >
          </codemirror>
          <codemirror
            v-if="action.typeCode == `javascipt`"
            v-model="codeValue"
            :options="{
              lineWrapping: true,
              mode: `text/x-java`,
              viewportMargin: 15,
              readOnly: false,
              theme: `vscode-dark`,
            }"
          >
          </codemirror>
        </b-form-group>
      </v-col>
    </v-row>
  </client-only>
</template>

<script>
import ContentEditer from "@/components/pages/admin/Shared/nuxt-editor/CkEditorNuxt.vue";
import { createNamespacedHelpers } from "vuex";

const { mapActions, mapGetters } = createNamespacedHelpers(
  "admin/deverlopers"
);
export default {
  components: {
    ContentEditer,
  },
  props: {
    index: {
      type: [String, Number],
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
  computed: {
    action() {
      return this.getAction()(this.index);
    },
    codeValue: {
      get() {
        return _.cloneDeep(this.action.code) ;
      },
        set(value) {
          this.setAction({
            index: this.index,
            value: { ...this.action, code: _.cloneDeep(value) },
          });
      },
    },
  },
  methods: {
    ...mapGetters(["getAction"]),
    ...mapActions(["setAction", "removeAction"]),

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
<style >
.CodeMirror-sizer {
  min-height: 500px;
}
</style>