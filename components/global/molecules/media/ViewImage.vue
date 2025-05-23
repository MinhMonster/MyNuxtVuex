<template>
  <client-only>
    <div v-if="image" class="view-image">
      <img
        :src="image"
        alt="Image Account"
        title="Phóng to ảnh"
        class="image-account cursor-pointer"
        @click="$refs.modal.show()"
      />
      <ModalPayload
        classContent="modal-zoom"
        classDiglog="image-zoom"
        width="100%"
        :max-width="maxWidth + 'px'"
        ref="modal"
        :title="'Xem ảnh (' + (indexImage + 1) + '/' + lengthImages + ')'"
        size="md"
        :isBtnClose="false"
        @hide="resetData()"
      >
        <template #content>
          <div class="scroll-x text-center">
            <img
              :src="url"
              alt="Image Account"
              class="image-account w-100"
              :style="{ width: percent + '%' }"
            />
          </div>
        </template>
        <template #footer-content>
          <div class="group-btn-zoom">
            <v-btn
              v-if="lengthImages > 1"
              class="btn-zoom ml-5"
              icon
              @click="prevImage()"
            >
              <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>
            </v-btn>
            <v-btn
              class="btn-zoom ml-5"
              icon
              @click="zoomInImage()"
              :disabled="!isZoomIn"
            >
              <v-icon>mdi-arrow-collapse-all</v-icon>
            </v-btn>
            <v-btn
              class="btn-zoom ml-5"
              icon
              @click="resetData()"
              :disabled="!isReset"
            >
              <v-icon>mdi-reload</v-icon>
            </v-btn>
            <v-btn
              class="btn-zoom ml-5"
              icon
              @click="zoomOutImage()"
              :disabled="!isZoomOut"
            >
              <v-icon>mdi-arrow-all</v-icon>
            </v-btn>
            <v-btn
              v-if="lengthImages > 1"
              class="btn-zoom ml-5"
              icon
              @click="nextImage()"
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
  components: { ModalPayload },
  data() {
    return {
      percent: 100,
      maxWidth: 1200,
      url: null,
      indexImage: 0,
    };
  },
  props: {
    image: {
      type: String,
      default: () => "",
    },
    images: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Number,
      default: () => 0,
    },
    isDetail: Boolean,
  },
  computed: {
    isZoomOut() {
      if (this.isMobile) {
        return this.percent < 300;
      }
      return this.maxWidth < 1500;
    },
    isZoomIn() {
      if (this.isMobile) {
        return this.percent > 100;
      }
      return this.maxWidth > 450;
    },
    isReset() {
      if (this.isMobile) {
        return this.percent != 100;
      }
      return this.maxWidth != 1200;
    },
    lengthImages() {
      if (Array.isArray(this.images)) {
        return this.images.length;
      }
      return 1;
    },
  },
  mounted() {
    this.url = this.image;
    this.indexImage = this.index;
  },
  methods: {
    zoomOutImage() {
      if (this.isMobile) {
        if (this.percent <= 280) {
          this.percent += 20;
        } else {
          this.percent = 300;
        }
      } else {
        if (this.maxWidth <= 1400) {
          this.maxWidth += 150;
        } else {
          this.maxWidth = 1500;
        }
      }
    },
    zoomInImage() {
      if (this.isMobile) {
        if (this.percent > 100) {
          this.percent -= 20;
        } else {
          this.percent = 100;
        }
      } else {
        if (this.maxWidth <= 1600 && this.maxWidth > 450) {
          this.maxWidth -= 150;
        } else {
          // this.maxWidth -= 100;
          this.maxWidth = 450;
        }
      }
    },
    resetData() {
      this.percent = 100;
      this.maxWidth = 1200;
    },
    async nextImage() {
      if (this.indexImage < this.lengthImages - 1) {
        this.indexImage = this.indexImage + 1;
      } else {
        this.indexImage = 0;
      }
      this.url = this.images[this.indexImage] || this.image;
    },
    async prevImage() {
      if (this.indexImage > 0 && this.indexImage <= this.lengthImages) {
        this.indexImage = this.indexImage - 1;
      } else {
        this.indexImage = this.lengthImages - 1;
      }
      this.url = this.images[this.indexImage] || this.image;
    },
  },
};
</script>

<style lang="scss" scoped>
.view-image {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  overflow: hidden;
  border-radius: 5px;

  .image-account {
    width: 100%;
    // margin-left: -10%;
    // height: 270px;
    border-radius: 7px;
    border: 1px solid #a4a4a4;

    &.full {
      width: 100%;
      margin-left: 0;
    }

    &.avatar-detail {
      height: 100% !important;
    }

    // @media (min-width: 1500px), (max-width: 959px) {
    //   height: 400px;
    // }

    @media (max-width: 599px) {
      height: 100%;
    }
  }
}

.account-ingame,
.account-cash-atm {
  position: absolute;
  top: 4px;
  font-size: 13px;
  font-weight: 450;
  border-radius: 5px;
  padding: 0 5px;
  color: #fff;
  background: #a21d0a;
  text-align: center;

  &.account-ingame {
    right: 4px;
  }

  &.account-cash-atm {
    left: 4px;
    font-size: 11px;
    font-weight: 700;
  }

  .v-btn--icon.v-size--default {
    height: 20px;
    width: 20px;
    margin: 0 -5px;

    i {
      height: 15px;
      width: 15px;
      line-height: 15px;
      font-size: 14px;
    }
  }
}

.account-tl {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 6px;
  font-size: 13px;
  font-weight: 450;
  width: 5.5% !important;
  height: 10% !important;
  text-align: center;
  border-radius: 3px;
  padding: 0;
  color: #fff;
  background: #a21d0a;
}

.group-btn-zoom {
  width: 100%;
  margin: 0 auto;
  text-align: center;

  .btn-zoom {
    text-align: center;
    background: radial-gradient(
      circle at 50% 100%,
      #e28637,
      #663019 58%,
      #663019 127%
    );

    border: 1px solid #663019 !important;
    box-shadow: #e28637 0px 0px 1px inset, #663019 0px 1px 2px;
  }
}
</style>