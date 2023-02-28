<template>
  <b-card class="border border-light shadow-none card-folder">
    <div class="folder-plugin">
      <v-btn color="white" @click="browseFiles">
        <v-icon>mdi-upload</v-icon>
        Upload
      </v-btn>
      <v-btn color="white" @click="isShow = true">
        <v-icon>mdi-folder-plus</v-icon>
        Folder
      </v-btn>
    </div>
    <input
      ref="file"
      type="file"
      :multiple="multiple"
      class="d-none"
      @click="clearImgPath"
      @change="onFileChange"
    />
    <div class="flex-row">
      <div v-if="folders.length" class="folderList scroll-y">
        <div
          @click="setPath('/images/')"
          class="pointer main-folder"
          :class="{ active: folderUpload == '/images/' }"
        >
          <v-icon color="blue">mdi-folder-multiple</v-icon> Images
        </div>

        <div
          v-for="(folder, index) in folders"
          :key="index"
          class="pointer folder-item"
        >
          <div
            @click="setPath(folder.folderPath)"
            :class="{ active: folderUpload == folder.folderPath }"
          >
            <v-icon v-if="path == folder.folderPath" color="blue"
              >mdi-folder-multiple</v-icon
            >
            <v-icon v-else color="blue">mdi-folder</v-icon>

            {{ folder.folderName }}
            <v-icon
              class="icon-down"
              v-if="
                folderUpload != folder.folderPath && folder.subFolders.length
              "
              >mdi-menu-down</v-icon
            >
            <v-icon
              class="icon-up"
              v-if="
                folderUpload == folder.folderPath && folder.subFolders.length
              "
              >mdi-menu-up</v-icon
            >
          </div>
          <template v-if="pathActive == folder.folderPath">
            <div
              v-for="(subFolder, index) in folder.subFolders"
              :key="index"
              class="pointer sub-folder"
              :class="{ active: folderUpload == subFolder.folderPath }"
            >
              <div @click="setFolderUpload(subFolder.folderPath)">
                <v-icon v-if="folderUpload == subFolder.folderPath" color="blue"
                  >mdi-folder-multiple</v-icon
                >
                <v-icon v-else color="blue">mdi-folder</v-icon>
                {{ subFolder.folderName }}
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="fileList scroll-y">
        <div v-if="preview.length" class="file-preview">
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
              <!-- <div class="fileDescription">
              <div class="fileName line-clamp-2">{{ file.folderPath }}</div> -->
              <!-- <div class="fileType">
              {{ file.type }} - {{ fileSizeFilter(file.byteSize) }}
            </div> -->
              <!-- </div> -->
            </div>
          </div>
          <!-- <div v-for="i in maxFile" :key="maxFile + i" class="fileItem e"></div> -->
        </div>
        <div v-if="images.length" class="file-images">
          <div v-for="(image, index) in images" :key="index" class="fileItem">
            <div class="fileItemWrapper">
              <b-button
                variant="danger"
                size="sm"
                class="ml-2"
                pill
                @click="onDeleteFile(image)"
              >
                <i class="mdi mdi-close-thick"></i>
              </b-button>
              <div class="fileIcon">
                <img v-if="image.url" :src="image.url" />
                <i v-else class="mdi mdi-file-document-outline"></i>
              </div>
              <!-- <div class="fileDescription">
              <div class="fileName line-clamp-2">{{ file.folderPath }}</div> -->
              <!-- <div class="fileType">
              {{ file.type }} - {{ fileSizeFilter(file.byteSize) }}
            </div> -->
              <!-- </div> -->
            </div>
          </div>
        </div>

        <!-- <div v-for="i in maxFile" :key="maxFile + i" class="fileItem e"></div> -->
      </div>
    </div>

    <template v-if="!autoupload && preview.length" #footer>
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

    <NewFolderModal
      v-if="isShow"
      :isShow="isShow"
      :label="`New Folder`"
      @closeModal="isShow = false"
      @change="newFolder"
    ></NewFolderModal>
  </b-card>
</template>

<script>
import mixins from "@/mixins/index";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("global");
import NewFolderModal from "@/components/global/molecules/common/NewFolderModal.vue";

let WidgetCount = 0;
export default {
  mixins: [mixins],
  components: {
    NewFolderModal,
  },
  props: {
    folders: {
      type: Array,
      default: () => [],
    },
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
      path: "/images/",
      folderUpload: "/images/",
      pathActive: "/images/",
      images: [],
      files: [],
      preview: [],
      isShow: false,
    };
  },
  computed: {
    // ...mapState("admin/folders", ["folders", "deleteMedia"]),
  },
  async mounted() {
    console.log(this.path);
    this.getFiles();
  },
  methods: {
    ...mapActions(["fileUpload", "fetchFiles", "deleteFile"]),
    async setPath(value) {
      console.log(this.path);
      if (this.pathActive !== value) {
        this.pathActive = value;
      } else {
        this.pathActive = "/images/";
      }
      this.path = value;
      this.folderUpload = value;
      await this.getFiles();
    },
    async getFiles() {
      const res = await this.fetchFiles(this.folderUpload);
      this.images = res.data.files;
    },
    async onDeleteFile(image) {
      this.$swal
        .fire({
          title: ` <img style="width: 100%; height: auto" src="${image.url}" /> <br/> Delete Image? `,
          confirmButtonColor: "#F64E60",
          showCancelButton: true,
          confirmButtonText: "YES",
          cancelButtonText: "NO",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const result = await this.deleteFile(image);
            if (result.data.code === 200) {
              this.$toasted.success(result.data.message);
              this.images = this.images.filter((item) => item.id != image.id);
            }
          }
        });
    },
    async setFolderUpload(value) {
      this.folderUpload = value;
      console.log(this.folderUpload);
      await this.getFiles();
    },
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

      // if (this.autoupload) {
      //   console.log(`path`, this.autoupload);
      // this.files = Array.from(target.files);
      // const res = await this.uploadFiles(fileArray);

      // } else {
      //   console.log(`not path`);
      //   this.files = this.files.concat(Array.from(target.files));
      //   console.log(`this.files`, this.files);

      // this.previewFiles();
      // }
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
      console.log(`previewFiles filés`, files);
      const listFiles = [];
      files.forEach((file, index) => {
        if (file.type.startsWith("image")) {
          console.log(`previewFiles if`);
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
            console.log(this.preview);
          };
          reader.readAsDataURL(file);
        } else {
          console.log(`previewFiles else`);

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

      // console.log(`file pre`, file);

      // this.preview.push({

      //   url: file.url,
      //   destroyed: file.destroyed
      // });
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
          folder: this.folderUpload,
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
      await this.getFiles();
    },
    //   async uploadFiles(files) {
    //     console.log(`uploadFiles 1`, files);
    //     try {
    //       if (this.files.length === 0) {
    //         return;
    //       }

    //       const formData = new FormData();
    //       formData.append("upload", files[0]);
    //       const input = {
    //         file: formData,
    //       };
    //       // console.log(input);
    //       // const formData = new FormData();
    //       // formData.append("file", file);
    //       // const input = {
    //       //   file: formData,
    //       // };
    //       // const res = await api_file.upload(input);
    //       // const data = new FormData();
    //       // this.files.forEach((file, index) => {
    //       // data.append(`file`, file);
    //       // });

    //       const res = await this.fileUpload(
    //         input
    //         // path: this.pathUpload,

    //         // namespace: this.namespace,
    //       );
    //       console.log(`2`, res);
    //       this.previewFiles(res.data);

    //       this.$emit("uploaded", res.data);
    //       // this.files = [];
    //       // this.preview = [];
    //       // this.$refs.file.value = null;
    //     } catch (error) {
    //       console.log(`error`, error);
    //       // if (_.get(error, "response.status", 400) !== 401) {
    //       //   const message = error.response.data.message;
    //       //   this.$toasted.error(message);
    //       // }
    //     }
    //   },
    newFolder(value) {
      const input = {
        path: this.path,
        folder: value,
      };
      console.log(input);
      this.$emit("newFolder", input);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-folder .card-body {
  padding: 0;
}
.folderList {
  width: 250px;
  padding: 0px;
  min-height: 50vh;
  max-height: 50vh;
  border-right: 1px solid #dee2e6;
  .folder-item {
    border-top: 1px solid #d7dcdf;
    padding-left: 35px;
    padding-top: 0;
    padding-bottom: 0;
    line-height: 43px;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 1px;
  }
  .sub-folder {
    border-top: 1px solid #d7dcdf;
    padding-left: 25px;
    padding-top: 0;
    padding-bottom: 0;
    line-height: 43px;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 1px;
  }
}
.fileList {
  padding-left: 10px;
  padding-top: 10px;

  width: calc(100% - 250px);
  min-height: 50vh;
  max-height: 50vh;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  .file-preview {
    border-bottom: 2px solid #2196f3;
    margin-bottom: 10px;
  }

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
      min-width: 33.33%;
      // min-width: 200px;
      height: auto;
      max-height: 120px;
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
        padding: 5px;
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
.folder-plugin {
  color: #fafafa !important;
  height: 50px;
  padding: 7.5px;
  background: #fafafa;
}
.card-folder .theme--light.v-btn {
  color: #495057 !important;
}

.v-btn--is-elevated {
  box-shadow: none;
  border: 1px solid #dee2e6 !important;
}

.icon-up,
.icon-down {
  float: right;
  padding: 5px 0;
  // right: -5px;
}

.folderList .folder-item .active {
  margin-left: -35px;
  padding-left: 35px;
  border: 2px solid #2196f3 !important;
}
.folderList .folder-item .sub-folder.active {
  margin-left: -35px;
  padding-left: 60px;
  border: 2px solid #2196f3 !important;
}

.folderList .main-folder {
  padding: 10px;
}
.folderList .main-folder.active {
  margin-left: 0px;
  padding-left: 10px;
  border: 2px solid #2196f3 !important;
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
