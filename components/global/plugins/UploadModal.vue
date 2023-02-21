<template>
  <b-modal
    ref="modal"
    title="upload_media"
    hide-footer
    scrollable
    size="lg"
    @ok="hide"
  >
    <b-alert variant="warning" show>
      <ul class="mb-0">
        <li>
          extension
        </li>
        <li>
          size.image
        </li>
        <li>
          size.video
        </li>
        <li>
          max_size
        </li>
        <li>
          too_many_files
        </li>
      </ul>
    </b-alert>
    <!-- <form-validator alert class="mb-0" name="attachment"> -->
      <file-selector
      ></file-selector>
      <!-- <file-selector
        :label="$i18n('misc.console.page.common.select_or_drag_file')"
        :file-types="['image/jpg', 'image/jpeg', 'image/png', 'video/mp4']"
        :namespace="namespace"
        path-upload="/console/uploads"
        multiple
        @uploaded="uploaded"
      ></file-selector> -->
    <!-- </form-validator> -->
  </b-modal>
</template>

<script>
import FileSelector from "@/components/global/molecules/common/FileSelector.vue";
// import FormValidator from "@/components/console/molecules/form/FormValidator";
import { createNamespacedHelpers } from "vuex";
const globalMapper = createNamespacedHelpers("console/global");

export default {
  components: {
    FileSelector,
    // FormValidator,
  },
  props: {
    namespace: {
      type: String,
      default: "console",
    },
  },
  computed: {
    ...globalMapper.mapGetters(["usedStorageGb", "maxStorageGb"]),
  },
  methods: {
    show() {
      this.$refs.modal.show();
    },
    hide() {
      this.$refs.modal.isVisible = false;
    },
    // uploaded(files) {
    //   this.hide();
    //   this.$emit("uploaded", files);
    // },
  },
};
</script>
