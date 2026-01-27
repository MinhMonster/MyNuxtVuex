<template>
  <client-only>
    <div v-if="image" class="view-image">
      <!-- Thumbnail -->
      <img
        :src="image"
        alt="Image Account"
        title="Phóng to ảnh"
        class="image-account cursor-pointer"
        @click="$refs.modal.show()"
      />

      <!-- Modal -->
      <ModalPayload
        ref="modal"
        classContent="modal-zoom"
        classDiglog="image-zoom"
        width="100%"
        :max-width="maxWidth + 'px'"
        :title="modalTitle"
        size="md"
        :isBtnClose="false"
        @hide="resetData"
      >
        <!-- CONTENT -->
        <template #content>
          <div class="scroll-x text-center">
            <!-- Single view -->
            <img
              v-if="!isGridView"
              :src="currentImage"
              class="image-account w-100"
              :style="imageStyle"
            />

            <!-- Grid view -->
            <v-row v-else>
              <v-col
                v-for="(img, i) in images"
                :key="i"
                cols="12"
                :sm="lengthImages === 1 ? 12 : 6"
              >
                <img
                  :src="img"
                  class="image-account w-100"
                  :style="imageStyle"
                />
              </v-col>
            </v-row>
          </div>
        </template>

        <!-- FOOTER -->
        <template #footer-content>
          <div class="group-btn-zoom">
            <v-btn
              v-if="lengthImages > 1"
              icon
              class="btn-zoom ml-3"
              @click="prevImage"
              :disabled="isGridView"
            >
              <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>
            </v-btn>

            <v-btn
              icon
              class="btn-zoom ml-3"
              @click="zoomInImage"
              :disabled="!isZoomIn"
            >
              <v-icon>mdi-arrow-collapse-all</v-icon>
            </v-btn>

            <v-btn
              icon
              class="btn-zoom ml-3"
              @click="resetData"
              :disabled="!isReset"
            >
              <v-icon>mdi-reload</v-icon>
            </v-btn>

            <v-btn
              v-if="lengthImages > 1"
              icon
              class="btn-zoom ml-3"
              @click="toggleGrid"
            >
              <v-icon>{{ isGridView ? "mdi-grid-off" : "mdi-grid" }}</v-icon>
            </v-btn>

            <v-btn
              icon
              class="btn-zoom ml-3"
              @click="zoomOutImage"
              :disabled="!isZoomOut"
            >
              <v-icon>mdi-arrow-all</v-icon>
            </v-btn>

            <v-btn
              v-if="lengthImages > 1"
              icon
              class="btn-zoom ml-3"
              @click="nextImage"
              :disabled="isGridView"
            >
              <v-icon>mdi-arrow-right-bold-circle-outline</v-icon>
            </v-btn>
          </div>
        </template>
      </ModalPayload>
    </div>
  </client-only>
</template>

<script>
import ModalPayload from "@/components/common/ModalPayload";

export default {
  name: "ViewImage",
  components: { ModalPayload },

  props: {
    image: { type: String, default: "" },
    images: { type: Array, default: () => [] },
    index: { type: Number, default: 0 },
  },

  data() {
    return {
      percent: 100,
      maxWidth: 1200,
      indexImage: 0,
      isGridView: false,
    };
  },

  computed: {
    lengthImages() {
      return Array.isArray(this.images) ? this.images.length : 1;
    },

    currentImage() {
      return this.images[this.indexImage] || this.image;
    },

    modalTitle() {
      return this.isGridView
        ? "Xem ảnh dạng lưới"
        : `Xem ảnh (${this.indexImage + 1}/${this.lengthImages})`;
    },

    imageStyle() {
      return !this.isGridView || this.lengthImages === 1
        ? { width: this.percent + "%" }
        : null;
    },

    canZoom() {
      return !this.isGridView || this.lengthImages === 1;
    },

    isZoomOut() {
      if (!this.canZoom) return false;
      return this.isMobile
        ? this.percent < 300
        : this.maxWidth < 1500;
    },

    isZoomIn() {
      if (!this.canZoom) return false;
      return this.isMobile
        ? this.percent > 100
        : this.maxWidth > 450;
    },

    isReset() {
      return this.isMobile
        ? this.percent !== 100
        : this.maxWidth !== 1200;
    },
  },

  mounted() {
    this.indexImage = this.index;
    this.resetData();
  },

  methods: {
    applyZoom(delta) {
      if (this.isMobile) {
        this.percent = Math.min(300, Math.max(100, this.percent + delta));
      } else {
        this.maxWidth = Math.min(1500, Math.max(450, this.maxWidth + delta));
      }
    },

    zoomInImage() {
      this.applyZoom(this.isMobile ? -20 : -150);
    },

    zoomOutImage() {
      this.applyZoom(this.isMobile ? 20 : 150);
    },

    resetData() {
      this.percent = 100;
      this.maxWidth = 1200;
    },

    nextImage() {
      this.indexImage = (this.indexImage + 1) % this.lengthImages;
    },

    prevImage() {
      this.indexImage =
        (this.indexImage - 1 + this.lengthImages) % this.lengthImages;
    },
    toggleGrid() {
      this.isGridView = !this.isGridView;
    },
  },
};
</script>

<style lang="scss" scoped>
.view-image {
  display: flex;
  flex-direction: column;

  .image-account {
    width: 100%;
    border-radius: 7px;
    border: 1px solid #a4a4a4;
    cursor: pointer;
  }
}

.group-btn-zoom {
  width: 100%;
  text-align: center;

  .btn-zoom {
    background: radial-gradient(
      circle at 50% 100%,
      #e28637,
      #663019 58%,
      #663019 127%
    );
    border: 1px solid #663019;
    box-shadow: #e28637 0 0 1px inset, #663019 0 1px 2px;
  }
}
</style>
