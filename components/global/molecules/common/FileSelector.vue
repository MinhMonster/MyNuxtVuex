<template>
  <b-card class="border border-light shadow-none">
    <input
      ref="file"
      type="file"
      :multiple="multiple"
      class="d-none"
      @click="clearImgPath"
      @change="onFileChange"
    />

    <div class="fileList">
      <div
        v-if="preview.length == 0 || multiple"
        ref="upload"
        class="dropzone middle"
        :class="{ 'full-zone': preview.length == 0 }"
        @click="browseFiles"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
      >
        <div class="dz-message">
          <div class="">
            <i class="display-4 text-muted mdi mdi-playlist-plus"></i>
          </div>

          <!-- <h4>{{ label }}</h4> -->
        </div>
      </div>
      <div v-for="(file, index) in preview" :key="index" class="fileItem">
        <div class="fileItemWrapper">
          <b-button
            variant="danger"
            size="sm"
            class="ml-2"
            pill
            @click="removeFile(index)"
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
      <div v-for="i in maxFile" :key="maxFile + i" class="fileItem e"></div>
    </div>

    <template v-if="!autoupload" #footer>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" variant="danger" @click="removeAll"> Clear </v-btn>
        <v-btn color="primary" variant="primary" @click="uploadFiles">
          Upload
        </v-btn>
      </v-card-actions>
    </template>
  </b-card>
</template>

<script>
import mixins from "@/mixins/index";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("global");
let WidgetCount = 0;
export default {
  mixins: [mixins],
  props: {
    label: {
      type: String,
      default: "Select file",
    },
    maxFile: {
      type: Number,
      default: 10,
    },
    maxFileSizeMb: {
      type: Number,
      default: 10,
    },
    maxVideoSizeMb: {
      type: Number,
      default: 200,
    },
    fileTypes: {
      type: Array,
      default: () => ["*"],
    },
    pathUpload: {
      type: String,
      default: "/upload.php",
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: null,
    },
    dropPlaceholder: {
      type: String,
      default: "*",
    },
    autoupload: Boolean,
    inject: {
      type: Function,
      default: () => {},
    },
    namespace: {
      type: String,
      default: "console",
    },
  },
  data() {
    return {
      files: [],
      preview: [],
    };
  },
  computed: {
    ...mapState({
      // usedStorage: (state) => _.get(state.account, "usedStorage", 0),
      // maxStorage: (state) =>
      //   _.get(state.account, "maxStorage", 1024 * 1024 * 1000),
    }),
  },
  mounted() {},
  methods: {
    ...mapActions(["fileUpload"]),
    dragover(event) {
      event.preventDefault();
      event.currentTarget.classList.add("bg-gray");
    },
    dragleave(event) {
      event.currentTarget.classList.remove("bg-gray");
    },
    drop(event) {
      event.preventDefault();
      this.onFileChange({ target: { files: event.dataTransfer.files } });
      event.currentTarget.classList.remove("bg-gray");
    },
    browseFiles() {
      this.$refs.file.click();
    },
    clearImgPath(event) {
      event.target.value = "";
    },
    async onFileChange({ target }) {
      if (target.files.length === 0) return;

      if (this.autoupload) {
        this.files = Array.from(target.files);
        this.uploadFiles();
      } else {
        this.files = this.files.concat(Array.from(target.files));
        this.previewFiles(Array.from(target.files));
      }
    },
    isFileTypeValid(file) {
      if (this.fileTypes.includes("*")) {
        return true;
      }

      if (this.fileTypes.includes("image/*")) {
        return file.type.startsWith("image/");
      }

      return this.fileTypes.includes(file.type);
    },
    previewFiles(files) {
      const listFiles = [];
      files.forEach((file, index) => {
        if (file.type.startsWith("image")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.preview.push({
              byteSize: file.size,
              fileName: file.name,
              url: e.target.result,
              type: file.type,
              key: WidgetCount++,
            });
            this.preview = this.preview.filter(
              (value, index, self) =>
                self.findIndex((item) => item.url === value.url) === index
            );
          };
          reader.readAsDataURL(file);
        } else {
          this.preview.push({
            byteSize: file.size,
            fileName: file.name,
            type: file.type,
            key: WidgetCount++,
          });
          this.preview = this.preview.filter(
            (value, index, self) =>
              self.findIndex((item) => item.key === value.key) === index
          );
        }
      });
    },
    removeFile(index) {
      this.files[index].destroyed = true;
      this.files = this.files.filter((item) => !item.destroyed);
      this.preview[index].destroyed = true;
      this.preview = this.preview.filter((item) => !item.destroyed);
    },
    removeAll() {
      this.files = [];
      this.preview = [];
      this.$refs.file.value = null;
    },
    async uploadFiles() {
      try {
        if (this.files.length === 0) {
          return;
        }

        const data = new FormData();
        this.files.forEach((file, index) => {
          data.append(`file_${index}`, file);
        });

        const result = await this.fileUpload({
          path: this.pathUpload,
          data,
          // namespace: this.namespace,
        });
        if (result.data.code === 200) {
          this.$toasted.success(result.data.message);
        }
        this.$emit("uploaded", _.get(result, "data.files", []));
        this.files = [];
        this.preview = [];
        this.$refs.file.value = null;
      } catch (error) {
        if (_.get(error, "response.status", 400) !== 401) {
          const message = error.response.data.message;
          this.$toasted.error(message);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.group-button {
  display: flex;
  gap: 10px;
}
.fileList {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;

  .fileItem {
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
