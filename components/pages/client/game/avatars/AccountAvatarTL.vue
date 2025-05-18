<template>
  <client-only>
    <div
      v-if="image"
      class="image-avatar"
      :class="{ full: accountAvatar?.full, 'avatar-detail': isDetail }"
    >
      <img
        :src="image"
        alt="Image Account Avatar"
        title="Phóng to ảnh"
        class="image-account cursor-pointer"
        @click="$refs.modal.show()"
      />
      <ModalPayload
        classContent="modal-avatar"
        classDiglog="image-zoom"
        width="100%"
        :max-width="maxWidth + 'px'"
        ref="modal"
        title="Ảnh Nick Avatar"
        size="md"
        :isBtnClose="false"
        @hide="resetData()"
      >
        <template #content>
          <div class="scroll-x text-center">
            <img
              :src="image"
              alt="Image Account Avatar"
              class="image-account w-100"
              :class="{ full: accountAvatar?.full }"
              :style="{ width: percent + '%' }"
            />
          </div>
        </template>
        <template #footer-content>
          <div class="group-btn-zoom">
            <v-btn
              class="btn-zoom"
              icon
              @click="zoomInImage()"
              :disabled="!isZoomIn"
            >
              <v-icon>mdi-arrow-collapse-all</v-icon>
            </v-btn>
            <v-btn
              class="btn-zoom ml-10"
              icon
              @click="resetData()"
              :disabled="!isReset"
            >
              <v-icon>mdi-reload</v-icon>
            </v-btn>
            <v-btn
              class="btn-zoom ml-10"
              icon
              @click="zoomOutImage()"
              :disabled="!isZoomOut"
            >
              <v-icon>mdi-arrow-all</v-icon>
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
      maxWidth: 800,
    };
  },
  props: {
    accountAvatar: {
      type: Object,
      default: () => ({}),
    },
    isDetail: Boolean,
  },
  computed: {
    image() {
      const img = this.accountAvatar?.images?.[0];
      if (!img) return null;

      return img.includes("muabannick.pro")
        ? img
        : `https://muabannick.pro${img}`;
    },
    isZoomOut() {
      if (this.isMobile) {
        return this.percent < 300;
      }
      if (this.screenWidth <= 1500) {
        return this.maxWidth < this.screenWidth - 30;
      }
      return this.maxWidth < 1500;
    },
    isZoomIn() {
      if (this.isMobile) {
        return this.percent > 100;
      }
      return this.maxWidth > 400;
    },
    isReset() {
      if (this.isMobile) {
        return this.percent != 100;
      }
      return this.maxWidth != 800;
    },
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
          this.maxWidth += 100;
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
        if (this.maxWidth <= 1500 && this.maxWidth > 400) {
          this.maxWidth -= 100;
        } else {
          // this.maxWidth -= 100;
          this.maxWidth = 400;
        }
      }
    },
    resetData() {
      this.percent = 100;
      this.maxWidth = 800;
    },
  },
};
</script>

<style lang="scss" scoped>
.image-avatar {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  overflow: hidden;
  border-radius: 5px;
  padding: 6px;

  .image-account {
    width: 120%;
    margin-left: -10%;
    height: 270px;
    border-radius: 7px;
    border: 1px solid #a4a4a4;

    @media (min-width: 1500px), (max-width: 959px) {
      height: 400px;
    }

    @media (max-width: 599px) {
      height: 100%;
    }
  }

  &.full {
    .image-account {
      width: 100%;
      margin-left: 0;
    }
  }

  &.avatar-detail {
    padding: 0px;
    .image-account {
      height: 100% !important;
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
    height: 30px;
    width: 30px;
    background: radial-gradient(
      circle at 50% 100%,
      #e28637,
      #9f5424 58%,
      #561d00 127%
    );

    svg {
      height: 26px;
      width: 26px;

      path {
        height: 26px;
        width: 26px;
      }
    }
  }
}
</style>
