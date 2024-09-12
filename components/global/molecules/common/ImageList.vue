<template>
  <form-validator name="hinhanh">
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
        v-for="(image, index) in images"
        :key="index"
        cols="12"
        sm="6"
        md="4"
      >
        <div class="fileItemWrapper">
          <img :src="image" alt="" class="image-ninja" />
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
  </form-validator>
</template>
<script>
import mixins from "@/mixins/index";
import draggable from "vuedraggable";
import FormValidator from "@/components/pages/admin/Shared/form/FormValidator";
import UploadImageModal from "@/components/global/plugins/UploadImageModal.vue";

export default {
  mixins: [mixins],

  components: {
    FormValidator,
    draggable,
    UploadImageModal,
  },
  name: "FormAccountNinja",
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      },
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
    updated() {
      this.$emit("updated", this.images);
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
      this.images = this.images.filter((item) => item != image);
      this.updated();
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
  padding: 10px;
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
    }
    &.handle {
      left: -15px;
    }
  }
}
img.image-ninja {
  height: 100%;
  width: 100%;
}
</style>