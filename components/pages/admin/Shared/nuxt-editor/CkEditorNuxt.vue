<template>
  <client-only placeholder="loading...">
    <ckeditor-nuxt class="bg-view view_htm"
      :config="editorConfig"
      :value="value"
      :disabled="disabled"
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
          styles: [
            "full",
            "side",
            "alignLeft",
            "alignRight",
            "alignCenter",
          ],
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
            "Indent",
            "alignment",
            "HorizontalLine",
            "|",
            "Highlight",
            "fontColor",
            "fontBackgroundColor",
            
            "ImageInsert",
            "ImageResize",

          ],
        },
        
        simpleUpload: {
          uploadUrl: "https://quanlychiphidst.com/apis/files/upload.php",
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
<style >
.ck.ck-content{
  height: 450px;
}
</style>