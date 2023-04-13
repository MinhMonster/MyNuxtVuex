<template>
  <client-only>
    <v-row class="bg-editor form-code">
      <v-col cols="12" sm="12" md="12" class="code-title">
        <v-text-field label="Title" v-model="nameValue"></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="12" class="code-content">
        <v-text-field label="Content" v-model="contentValue"></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="12" class="code-value">
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
              theme: `base16-dark`,
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
              theme: `base16-dark`,
            }"
          >
          </codemirror>
          <v-row align="center" class="mgt--40px mgb-5px">
            <v-col class="center">
              <v-btn icon class="danger" @click="deleteAction(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
            <v-spacer />

            <v-col>
              <CodeModalAction :index="index"></CodeModalAction>
            </v-col>
          </v-row>
        </b-form-group>
      </v-col>
    </v-row>
  </client-only>
</template>

<script>
import ContentEditer from "@/components/pages/admin/Shared/nuxt-editor/CkEditorNuxt.vue";
import CodeModalAction from "@/components/pages/admin/deverlopers/form/CodeModalAction.vue";

import { createNamespacedHelpers } from "vuex";

const { mapActions, mapGetters } = createNamespacedHelpers("admin/deverlopers");
export default {
  components: {
    ContentEditer,
    CodeModalAction,
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
    nameValue: {
      get() {
        return _.cloneDeep(this.action.title);
      },
      set(value) {
        this.setAction({
          index: this.index,
          value: { ...this.action, title: _.cloneDeep(value) },
        });
      },
    },
    contentValue: {
      get() {
        return _.cloneDeep(this.action.content);
      },
      set(value) {
        this.setAction({
          index: this.index,
          value: { ...this.action, content: _.cloneDeep(value) },
        });
      },
    },
    codeValue: {
      get() {
        return _.cloneDeep(this.action.code);
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
    deleteAction(index) {
      this.$swal
        .fire({
          title: `Remove Action`,
          confirmButtonColor: "#F64E60",
          showCancelButton: true,
          confirmButtonText: "YES",
          cancelButtonText: "NO",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.removeAction(index);
          }
        });

      // this.$confirm({
      //   message: "Xóa Phần Tử",
      //   button: {
      //     no: "NO",
      //     yes: "YES",
      //   },
      //   callback: (confirm) => {
      //     if (confirm) {
      //       this.removeAction(index);
      //     }
      //   },
      // });
    },
  },
};
</script>
<style >
.CodeMirror-sizer {
  min-height: 500px;

}
.vue-codemirror {
  border: 1px solid #ccc;

}
.form-code .code-value .form-group {
  background: #333;
    border: 1px solid #fff;
    padding: 10px;
}

.form-code .v-input{
  margin-bottom: -20px;
  margin-top: -15px;

}

.form-code .code-content {
  margin-bottom: -5px;
}

.form-code .code-title{
  margin-top: 30px;
}
</style>