<template>
  <form-validator name="hinhanh">
    <v-col v-if="!images.length" cols="12" sm="6" md="4" class="middle">
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
        class="handle"
      >
        <div class="fileItemWrapper">
          <img :src="image" alt="" class="image-ninja" />
          <b-button
            variant="danger"
            size="sm"
            class="ml-2"
            pill
            @click="removeImage(image)"
          >
            <i class="mdi mdi-close-thick text-white"></i>
          </b-button>
        </div>
      </v-col>
    </draggable>
  </form-validator>
</template>

<script>
import draggable from "vuedraggable";
import FormValidator from "@/components/pages/admin/Shared/form/FormValidator";
//
// import { mapFields } from "vuex-map-fields";
// import { mapActions } from "vuex";
import ContentEditer from "@/components/pages/admin/Shared/nuxt-editor/CkEditorNuxt.vue";
import UploadImageModal from "@/components/global/plugins/UploadImageModal.vue";

export default {
  components: {
    FormValidator,
    draggable,
    ContentEditer,
    UploadImageModal,
  },
  name: "FormAccountNinja",
  props: {
    imagesProps: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      activeCash: true,
      images: [],
    };
  },
  computed: {
    // ...mapFields("admin/game/ninjas", ["ninja"]),
    ninjaForm() {
      return _.cloneDeep(this.ninja);
    },
    cashFormat: {
      get() {
        return _.cloneDeep(this.format_number(this.ninjaForm.giatien));
      },
    },
    is_create() {
      const path = this.$route.path;
      return path.includes("/new");
    },
  },
  async mounted() {
    this.images = this.imagesProps;
  },
  methods: {
    // ...mapActions("admin/game/ninjas", ["newAccountNinja", "setAccountNinja"]),

    // updateNinja() {
    //   this.setAccountNinja(this.ninjaForm);
    // },

    onUploaded(files) {
      this.setImage(files);
      this.$emit("changeImage", this.images);
    },

    setImage(data) {
      for (const option of data) {
        if (!this.images.includes(option.url)) {
          this.images.push(option.url);
          console.log("images", this.images);
        }
      }
      this.$emit("changeImage", this.images);
    },

    removeImage(image) {
      this.images = this.images.filter((item) => item != image);
      this.$emit("changeImage", this.images);
    },

    changeByDrag(event) {
      this.$emit("changeImage", this.images);
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
    right: -10px;
    top: -10px;
    width: 20px;
    height: 20px;
    font-size: 10px;
    padding: 1px;
  }
}

.CodeMirror-sizer {
  min-height: 300px;
}

img.image-ninja {
  height: 100%;
  width: 100%;
}

.tab-scroll {
  height: calc(100vh - 294px);
}
.bg-ninja {
  margin: 0px;
}
</style>