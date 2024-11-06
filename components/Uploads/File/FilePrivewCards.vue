<template>
  <div class="file-preview">
    <div v-for="(image, index) in images" :key="index" class="fileItem">
      <div class="fileItemWrapper">
        <b-button
          variant="danger"
          size="sm"
          class="ml-2"
          pill
          @click="$emit('removeFile', index)"
        >
          <i class="mdi mdi-close-thick text-white"></i>
        </b-button>
        <div class="fileIcon">
          <img v-if="image.url" :src="image.url" />
          <i v-else class="mdi mdi-file-document-outline"></i>
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
  },
};
</script>

<style lang="scss" scoped>
.file-preview {
  width: 100%;
  border-bottom: 2px solid #2196f3;
  margin-bottom: 10px;
}
.file-images,
.file-preview {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;

  .fileItem {
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
