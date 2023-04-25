<template>
  <client-only>
    <v-row class="bg-editor bg-view-code">
      <v-col cols="12" sm="12" md="12">
        <b-form-group>
          <h1 class="bold">{{ action.title }}</h1>
          <p>{{ action.content }}</p>
          <div v-if="action.typeCode == `editor`" v-html="action.code"></div>
          <codemirror
            v-if="action.typeCode == `vue`"
            :value="action.code"
            :options="{
              lineWrapping: true,
              mode: `text/x-vue`,
              viewportMargin: 15,
              readOnly: true,
              theme: `base16-dark`,
            }"
          >
          </codemirror>
          <codemirror
            v-if="action.typeCode == `css`"
            :value="action.code"
            :options="{
              lineWrapping: true,
              mode: `text/css`,
              viewportMargin: 15,
              readOnly: true,
              theme: `base16-dark`,
            }"
          >
          </codemirror>
          <codemirror
            v-if="action.typeCode == `javascipt`"
            :value="action.code"
            :options="{
              lineWrapping: true,
              mode: `text/x-java`,
              viewportMargin: 15,
              readOnly: true,
              theme: `base16-dark`,
            }"
          >
          </codemirror>
          <codemirror
            v-if="action.typeCode == `ruby`"
            :value="action.code"
            :options="{
              lineWrapping: true,
              mode: `text/x-ruby`,
              viewportMargin: 15,
              readOnly: true,
              theme: `base16-dark`,
            }"
          >
          </codemirror>
          <codemirror
            v-if="action.typeCode == `php`"
            :value="action.code"
            :options="{
              lineWrapping: true,
              mode: `application/x-httpd-php`,
              viewportMargin: 15,
              readOnly: true,
              theme: `base16-dark`,
            }"
          >
          </codemirror>
          <codemirror
            v-if="action.typeCode == `react`"
            :value="action.code"
            :options="{
              lineWrapping: true,
              mode: `text/jsx`,
              viewportMargin: 15,
              readOnly: true,
              theme: `base16-dark`,
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

const { mapActions, mapGetters } = createNamespacedHelpers("admin/deverlopers");
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
    // codeValue: {
    //   get() {
    //     return _.cloneDeep(this.action.code);
    //   },
    //   set(value) {
    //     this.setAction({
    //       index: this.index,
    //       value: { ...this.action, code: _.cloneDeep(value) },
    //     });
    //   },
    // },
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
<style>
.bg-view-code .CodeMirror {
  height: auto !important;
}
</style>