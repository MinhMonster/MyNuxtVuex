<template>
  <client-only placeholder="loading...">
    <ckeditor-nuxt
      class="bg-view view_htm"
      :config="editorConfig"
      :value="value"
      :disabled="disabled"
      :style="{ height: height }"
      @input="(event) => $emit('input', event)"
    />
  </client-only>
</template>
<script>
export default {
  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "300px",
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    readonly: Boolean,
  },
  data() {
    return {
      editorConfig: {
        height: "800px",

        // plugins: [
        //   'Bold',
        //   'Link',
        //   'List',
        //   'FontSize',
        // ],
        image: {
          styles: ["full", "side", "alignLeft", "alignRight", "alignCenter"],
          toolbar: [
            "imageStyle:full",
            "imageStyle:side",
            "imageStyle:alignLeft",
            "imageStyle:alignCenter",
            "imageStyle:alignRight",
            "|",
            "imageTextAlternative",
            "insertImage",
          ],
        },
        toolbar: {
          items: [
            "heading",
            "|",
            "numberedList",
            "bulletedList",
            // "Subscript",
            // "Superscript",
            // "RemoveFormat",
            "|",
            "Indent",
            "alignment",
            "HorizontalLine",
            "|",
            "Link",
            "bold",
            "italic",
            "strikethrough",
            "underline",
            "blockQuote",
            "|",
            "Code",
            "CodeBlock",
            "|",
            "fontfamily",
            "fontsize",

            "|",
            "Highlight",
            "fontColor",
            "fontBackgroundColor",

            "ImageInsert",
            "ImageResize",
          ],
        },

        simpleUpload: {
          uploadUrl: "https://muabannick.pro/apis/files/uploadSingleFile.php",
          headers: {
            authorization: `Bearer `,
          },
        },
        removePlugins: ["Title"],
      },
    };
  },
};
</script>
<style lang="scss">
.ck.ck-content {
  height: 450px;
}
.ck.ck-toolbar-dropdown {
  .ck-dropdown__panel {
    max-width: 710px !important;
    @media (max-width: 800px) {
      max-width: 53.6vw !important;
    }

  }
}
</style>
