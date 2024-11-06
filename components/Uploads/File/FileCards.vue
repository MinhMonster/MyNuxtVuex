<template>
  <div class="file-images">
    <div v-for="(image, index) in images" :key="index" class="fileItem">
      <div
        v-if="image && image.url"
        class="fileItemWrapper"
        :class="{
          active: isSelected(image, selectedImages),
          activated: isActivated(image),
        }"
      >
        <b-button
          variant="danger"
          size="sm"
          class="ml-2"
          pill
          @click="$emit('onDeleteFile', image)"
        >
          <i class="mdi mdi-close-thick text-white"></i>
        </b-button>
        <div class="fileIcon">
          <img
            v-if="image && image.url"
            :src="image.url"
            :disabled="isActivated(image)"
            @click="$emit('addImage', image)"
          />
          <i v-else class="mdi mdi-file-document-outline"></i>
          <div class="fileDescription">
            <div class="fileName break-line-1">{{ image.fileName }}</div>
            <div class="fileType">
              {{ image.type }} - {{ fileSizeFilter(image.byteSize) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    selectedImages: {
      type: Array,
      default: () => [],
    },
    activated: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    isActivated(image) {
      return image ? this.activated.find((item) => item == image.url) : false;
    },
  },
};
</script>

<style lang="scss" scoped>

.file-images,
  .file-preview {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    // align-items: baseline;
    align-content: flex-start;

    .fileItem {
      // flex: 1;
      // min-width: 33.33%;
      // min-width: 200px;
      height: auto;

      padding-right: 10px;
      padding-bottom: 10px;

      img {
        max-height: 200px;
      }

      &:empty {
        padding-bottom: 0;
      }

      .fileItemWrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: flex-start;

        border: 1px solid #eff2f7;
        border-radius: 5px;
        padding: 5px;
        height: 100%;
        // color: #fff;

        &.active {
          border: 2px solid #2196f3 !important;
        }

        &.activated,
        &.activated.active {
          border: 2px solid var(--danger) !important;

          .fileIcon {
            cursor: not-allowed;
          }
        }

        button {
          position: absolute;
          right: -10px;
          top: -10px;
          width: 20px;
          height: 20px;
          font-size: 10px;
          padding: 1px;
        }

        .fileIcon {
          // width: 60px;
          text-align: center;
          margin: 0 auto;
          cursor: pointer;

          img {
            max-width: 100%;
            max-height: 120px;
          }

          .mdi {
            font-size: 60px;
            color: #74788d;
            line-height: 1;
          }
        }

        .fileDescription {
          display: flex;
          flex-flow: column;
          flex: 1;
          justify-content: flex-end;
          text-align: left;

          .fileName {
            font-weight: bold;
            margin-bottom: 5px;
            word-break: break-all;
          }

          .fileSize,
          .fileType {
            font-style: italic;
            color: gray;
          }
        }
      }
    }

    @media (min-width: 400px) {
      .fileItem,
      .dropzone {
        width: 50%;
      }
    }

    @media (min-width: 675px) {
      .fileItem,
      .dropzone {
        width: 50%;
      }
    }

    @media (min-width: 960px) {
      .fileItem,
      .dropzone {
        width: 33.33%;
      }
    }
  }

</style>
