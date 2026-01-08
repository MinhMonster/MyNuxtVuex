<template>
  <form-validator name="images">
    <div class="bg-images">
      <v-col cols="12" sm="6" md="4" class="middle">
        <UploadImageModal
          @onUploaded="onUploaded"
          :activated="images"
          :icon="'add-file'"
        ></UploadImageModal>
      </v-col>
      <draggable
        v-model="images"
        ghost-class="ghost"
        @change="changeByDrag"
        handle=".handle"
        class="row"
        tag="div"
      >
        <v-col
          v-for="(image, index) in images || []"
          :key="index"
          :cols="cols"
          :sm="sm"
          :md="md"
        >
          <div class="fileItemWrapper">
            <ViewImage
              v-if="image"
              :image="image"
              :index="index"
              class="w-100 h-100"
            />
            <b-button
              variant="danger"
              size="sm"
              class="ml-2 btn-close"
              pill
              @click="removeImage(image)"
            >
              <i class="mdi mdi-close-thick"></i>
            </b-button>
            <b-button variant="info" size="sm" class="ml-2 handle" pill>
              <i class="mdi mdi-cursor-move"></i>
            </b-button>
          </div>
        </v-col>
      </draggable>
    </div>
  </form-validator>
</template>
<script>
import mixins from "@/mixins/index";
import draggable from "vuedraggable";
import FormValidator from "@/components/pages/admin/Shared/form/FormValidator";
import UploadImageModal from "@/components/global/plugins/UploadImageModal.vue";
import ViewImage from "@/components/global/molecules/media/ViewImage";

export default {
  mixins: [mixins],

  components: {
    FormValidator,
    draggable,
    UploadImageModal,
    ViewImage,
  },
  name: "FormAccountNinja",
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      },
    },
    name: {
      type: [String, Number],
    },
    cols: {
      type: Number,
      default: 12,
    },
    md: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {};
  },
  computed: {
    images: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  async mounted() {},
  methods: {
    updated(value = null) {
      this.$emit("updated", this.name, value || this.images);
    },
    // 1
    onUploaded(files) {
      this.setImage(files);
      this.updated();
    },

    setImage(data) {
      for (const option of data) {
        if (!this.images.includes(option.url)) {
          this.images.push(option.url);
        }
      }
    },

    // 3
    removeImage(image) {
      const newImages = this.images.filter((item) => item != image);
      this.images = [...newImages];
      this.updated(newImages);
    },

    // 2
    changeByDrag(event) {
      this.updated();
    },
  },
};
</script>
<style lang="scss" scoped>
.fileItemWrapper {
  position: relative;
  display: flex;
  flex-flow: column;
  border: 1px solid #eff2f7;
  border-radius: 5px;
  // padding: 10px;
  align-items: flex-start;
  height: 100%;

  button {
    position: absolute;
    top: -10px;
    width: 20px;
    height: 20px;
    font-size: 10px;
    padding: 1px;
    &.btn-close {
      right: -10px;
      color: #fff;
    }
    &.handle {
      left: -15px;
    }
  }
}
</style>
