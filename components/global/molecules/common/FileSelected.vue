<template>
  <b-card class="border border-light shadow-none">
    <div class="fileList">
      <div
        v-if="preview.length == 0"
        ref="upload"
        class="dropzone middle"
        :class="{ 'full-zone': preview.length == 0 }"
      >
        <div class="dz-message">
          <div class="">
            <i class="display-4 text-muted mdi mdi-playlist-plus"></i>
          </div>
        </div>
      </div>
      <div v-for="(file, index) in preview" :key="index" class="fileItem">
        <div class="fileItemWrapper">
          <b-button
            variant="danger"
            size="sm"
            class="ml-2"
            pill
            @click="removeFile(file)"
          >
            <i class="mdi mdi-close-thick"></i>
          </b-button>
          <div class="fileIcon">
            <img v-if="file.url" :src="file.url" />
            <i v-else class="mdi mdi-file-document-outline"></i>
          </div>
          <div class="fileDescription">
            <div class="fileName line-clamp-2">{{ file.fileName }}</div>
            <div class="fileType">
              {{ file.type }} - {{ fileSizeFilter(file.byteSize) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="text-right">
        <b-button variant="danger" @click="removeAll">
          <i class="mdi mdi-close-box-multiple"></i>
          Clear
        </b-button>
      </div>
    </template>
  </b-card>
</template>

<script>
import mixins from "@/mixins/index";
export default {
  mixins: [mixins],
  props: {
    selectedImages: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      files: [],
    };
  },
  computed: {
    preview() {
      return this.selectedImages;
    },
  },
  mounted() {},
  methods: {
    removeFile(file) {
      this.$emit("removeFile", file);
    },
    removeAll() {
      this.files = [];
      this.preview = [];
      this.$refs.file.value = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.fileList {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;

  .fileItem {
    // flex: 1;
    min-width: 33.33%;
    min-width: 200px;
    padding-right: 10px;
    padding-bottom: 10px;

    &:empty {
      padding-bottom: 0;
    }

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
      .fileIcon {
        // width: 60px;
        text-align: center;
        margin-right: 10px;

        img {
          width: 100%;
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
}
.bg-gray {
  background: #e1e1e1 !important;
}

.modal-upload .card-body {
  min-height: 50vh;
}

.full-zone {
  width: 100% !important;
  height: 50vh !important;
}

@media (min-width: 400px) {
  .fileItem,
  .dropzone {
    width: 100%;
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
</style>
