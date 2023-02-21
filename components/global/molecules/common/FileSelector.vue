<template>
  <b-card class="border border-light shadow-none">
    <v-row>
      <v-col cols="4" md="4" sm="4">
        <input
          ref="file"
          type="file"
          :multiple="true"
          class="d-none"
          @click="clearImgPath"
          @change="onFileChange"
          id="upload"
        />
      </v-col>
    </v-row>

    <div
      ref="upload"
      class="dropzone"
      @click="browseFiles"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <div class="dz-message">
        <div class="mb-3">
          <i class="display-4 text-muted mdi mdi-playlist-plus"></i>
        </div>

        <h4>{{ label }}</h4>
      </div>
    </div>

    <div v-if="preview.length" class="fileList">
      <v-row>
        <v-col
          v-for="(file, index) in preview"
          :key="index"
          class="fileItem"
          cols="12"
          md="4"
          sm="12"
        >
          <div class="fileItemWrapper">
            <div class="fileIcon">
              <img v-if="file.url" :src="file.url" />
              <i v-else class="mdi mdi-file-document-outline"></i>
            </div>
            <div class="fileDescription">
              <!-- <div class="fileName line-clamp-2">{{ file.fileName }}</div>
            <div class="fileType">{{ file.type }}</div>
            <div class="fileSize">{{ file.byteSize | fileSizeFilter }}</div> -->
            </div>
            <b-button
              variant="danger"
              size="sm"
              class="ml-2"
              pill
              @click="removeFile(index)"
            >
              <i class="mdi mdi-close-thick"></i>
            </b-button>
          </div>
        </v-col>
      </v-row>

      <div v-for="i in maxFile" :key="maxFile + i" class="fileItem e"></div>
    </div>

    <template v-if="!autoupload" #footer>
      <div class="text-right">
        <b-button variant="danger" @click="removeAll">
          <i class="mdi mdi-close-box-multiple"></i>
          Clear
        </b-button>
        <b-button variant="primary" @click="uploadFiles">
          <i class="mdi mdi-cloud-upload"></i>
          Upload
        </b-button>
      </div>
    </template>
  </b-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("global");
export default {
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
      default: "/uploads",
    },
    multiple: {
      type: Boolean,
      default: false,
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

      // if (target.files.length > this.maxFile) {
      //   return this.$toasted.error(
      //     "Too Many Files, Max File:" + `${this.maxFile}`
      //   );
      // }

      const fileArray = Array.from(target.files);
      console.log(`files`, target.files, fileArray);

      // if (fileArray.some((file) => !this.isFileTypeValid(file))) {
      //   return this.$toasted.error("Invalid file format exists.");
      // }
      // const videoType = "video/mp4";
      // const sizeInvalidCondition = fileArray.some((file) => {
      //   const maxSize =
      //     file.type === videoType ? this.maxVideoSizeMb : this.maxFileSizeMb;
      //   return file.size > maxSize * 1024 * 1024;
      // });
      // if (sizeInvalidCondition) {
      //   return fileArray.some((file) => {
      //     return this.$toasted.error(
      //       "File Size Too Large" +
      //         `${
      //           file.type === videoType
      //             ? this.maxVideoSizeMb
      //             : this.maxFileSizeMb
      //         }`
      //     );
      //   });
      // }

      // const totalSize = _.sumBy(fileArray, (file) => {
      //   return file.size;
      // });

      // if (totalSize + this.usedStorage > this.maxStorage) {
      //   return this.$toasted.error("Total Size Limit");
      // }

      // const injectResult = await this.inject(target.files);
      // if (injectResult === false) return;

      if (this.autoupload) {
        console.log(`path`, this.autoupload);
      this.files = Array.from(target.files);
      const res = await this.uploadFiles(fileArray);

      } else {
        console.log(`not path`);
        this.files = this.files.concat(Array.from(target.files));
        console.log(`this.files`, this.files);

      this.previewFiles();
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
    previewFiles(file) {
      console.log(`file pre`, file);
      
      this.preview.push({
       
        url: file.url,
        destroyed: file.destroyed
      });
      
    },
    removeFile(index) {
      // this.files[index].destroyed = true;
      // this.files = this.files.filter((item) => !item.destroyed);
      this.preview[index].destroyed = true;
      this.preview = this.preview.filter((item) => !item.destroyed);
    },
    removeAll() {
      this.files = [];
      this.preview = [];
      this.$refs.file.value = null;
    },
    async uploadFiles(files) {
      console.log(`uploadFiles 1`, files);
      try {
        // if (this.files.length === 0) {
        //   return;
        // }

        const formData = new FormData();
        formData.append("upload", files[0]);
        const input = {
          file: formData,
        };
        // console.log(input);
        // const formData = new FormData();
        // formData.append("file", file);
        // const input = {
        //   file: formData,
        // };
        // const res = await api_file.upload(input);
        // const data = new FormData();
        // this.files.forEach((file, index) => {
        // data.append(`file`, file);
        // });

        const res = await this.fileUpload(
          input
          // path: this.pathUpload,

          // namespace: this.namespace,
        );
        console.log(`2`, res);
        this.previewFiles(res.data);

        this.$emit("uploaded", res.data);
        // this.files = [];
        // this.preview = [];
        // this.$refs.file.value = null;
      } catch (error) {
        console.log(`error`, error);
        // if (_.get(error, "response.status", 400) !== 401) {
        //   const message = error.response.data.message;
        //   this.$toasted.error(message);
        // }
      }
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
    flex: 1;
    min-width: 33.33%;
    padding-right: 10px;
    padding-bottom: 10px;

    &:empty {
      padding-bottom: 0;
    }

    .fileItemWrapper {
      display: flex;
      border: 1px solid #eff2f7;
      border-radius: 5px;
      padding: 10px;
      align-items: flex-start;
      height: 100%;

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

.modal-upload .card-body{
  min-height: 60vh;
}
</style>
