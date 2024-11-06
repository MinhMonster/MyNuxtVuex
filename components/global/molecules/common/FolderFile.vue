<template>
  <b-card
    class="border border-light shadow-none card-folder"
    :class="{ 'zoom-modal scroll-x': isZoom }"
  >
    <GroupBtnActions
      :isZoom="isZoom"
      @setShowFolder="showFolder = !showFolder"
      @browseFiles="browseFiles"
      @setIsShow="(value) => (isShow = value)"
      @setIsZoom="(value) => (isZoom = value)"
      @fetchFolders="fetchFolders"
    />
    <input
      ref="file"
      type="file"
      :multiple="multiple"
      class="d-none"
      @click="clearImgPath"
      @change="onFileChange"
    />
    <div class="flex-row folder-show" :class="{ show: showFolder }">
      <div v-if="folders.length" class="folderList scroll-y">
        <div
          class="pointer main-folder"
          :class="{ active: folder_active == null }"
        >
          <div @click="setPath(null)">
            <v-icon color="blue">mdi-folder-multiple</v-icon>
            Images
          </div>

          <!-- <v-icon class="btn-show" @click="showFolder = false"
            >mdi-dots-vertical</v-icon
          > -->
        </div>

        <div
          v-for="(folder, index) in folders"
          :key="index"
          class="pointer folder-item"
          :class="{ hidden: !showFolder }"
        >
          <div
            class="folder-item-body flex-row-space-between"
            :class="{ active: folder_active && folder_active.id == folder.id }"
          >
            <div class="body-folder" @click="setPath(folder)">
              <v-icon v-if="folder_path == folder.path" color="blue"
                >mdi-folder-multiple</v-icon
              >
              <v-icon v-else color="blue">mdi-folder</v-icon>

              {{ folder.name }}

              <v-icon
                class="icon-up"
                v-if="
                  folder_show_list &&
                  folder_show_list.id == folder.id &&
                  folder.sub_folders.length
                "
              >
                mdi-menu-up
              </v-icon>
              <v-icon class="icon-down" v-else-if="folder.sub_folders.length">
                mdi-menu-down
              </v-icon>
            </div>
            <div>
              <v-icon class="dots-vertical" @click="editFolder(folder)"
                >mdi-dots-vertical</v-icon
              >
            </div>
          </div>

          <template v-if="folder_show_list && folder_show_list.id == folder.id">
            <div
              v-for="(subFolder, index) in folder.sub_folders"
              :key="index"
              class="pointer sub-folder"
              :class="{ active: folder_active.id == subFolder.id }"
            >
              <div @click="setFolderUpload(subFolder)">
                <span class="folder-name">
                  <v-icon v-if="folder_active.id == subFolder.id" color="blue">
                    mdi-folder-multiple
                  </v-icon>
                  <v-icon v-else color="blue">mdi-folder</v-icon
                  >{{ subFolder.name }}
                  <v-icon class="dots-vertical" @click="editFolder(subFolder)"
                    >mdi-dots-vertical</v-icon
                  >
                </span>
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
                <i class="mdi mdi-close-thick text-white"></i>
              </b-button>
              <div class="fileIcon">
                <img v-if="file.url" :src="file.url" />
                <i v-else class="mdi mdi-file-document-outline"></i>
              </div>
              <!-- <div class="fileDescription">
              <div class="fileName line-clamp-2">{{ file.path }}</div> -->
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
            <div
              v-if="image && image.url"
              class="fileItemWrapper"
              :class="{
                active: is_selected(image),
                activated: is_activated(image),
              }"
            >
              <b-button
                variant="danger"
                size="sm"
                class="ml-2"
                pill
                @click="onDeleteFile(image)"
              >
                <i class="mdi mdi-close-thick text-white"></i>
              </b-button>
              <div class="fileIcon">
                <img
                  v-if="image && image.url"
                  :src="image.url"
                  :disabled="is_activated(image)"
                  @click="addImage(image)"
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

        <!-- <div v-for="i in maxFile" :key="maxFile + i" class="fileItem e"></div> -->
      </div>
    </div>

    <template v-if="!autoupload && preview.length" #footer>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red"
          variant="danger"
          class="text-white"
          @click="removeAll"
        >
          Clear
        </v-btn>
        <v-btn
          color="primary"
          variant="primary"
          class="text-white"
          @click="uploadFiles"
        >
          Upload
        </v-btn>
      </v-card-actions>
    </template>
    <EditFolderModal
      :isShow="isShowEdit"
      :folder="folder_active"
      @closeModal="isShowEdit = false"
      @change="newFolder"
      @editNameFolder="isEdit = true"
    ></EditFolderModal>

    <UpdateNameFolderModal
      v-if="isShow"
      :isShow="isShow"
      @closeModal="isShow = false"
      @change="newFolder"
    >
    </UpdateNameFolderModal>
    <UpdateNameFolderModal
      v-if="isEdit"
      :isShow="isEdit"
      :folder="folder_active"
      @closeModal="isEdit = false"
      @change="updateNameFolder"
    ></UpdateNameFolderModal>
  </b-card>
</template>

<script>
import { mapFields } from "vuex-map-fields";

import mixins from "@/mixins/index";
import { mapActions } from "vuex";
import GroupBtnActions from "@/components/Uploads/GroupBtnActions.vue";

import EditFolderModal from "@/components/global/molecules/common/EditFolderModal.vue";

import UpdateNameFolderModal from "@/components/global/molecules/common/upload/UpdateNameFolderModal";

let WidgetCount = 0;
export default {
  mixins: [mixins],
  components: {
    GroupBtnActions,
    UpdateNameFolderModal,
    EditFolderModal,
  },
  watch: {
    folder_active: {
      async handler(newValue, oldValue) {
        this.folder_path = this.folder_active
          ? this.folder_active.path
          : "/images/";
      },
    },
  },
  props: {
    activated: {
      type: Array,
      default: () => [],
    },
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
      images: [],
      files: [],
      preview: [],
      folder_active: null,
      folder_path: "/images/",
      folder_show_list: null,
      showFolder: true,
      isShow: false,
      isShowEdit: false,
      isZoom: false,
      isEdit: false,
    };
  },
  computed: {
    // ...mapState("admin/folders", ["folders", "deleteMedia"]),
    ...mapFields("global", ["selectedImages"]),
    selected: {
      get() {
        return _.cloneDeep(this.selectedImages);
      },
      set(value) {
        this.setSelectedImages(_.cloneDeep(value));
      },
    },
  },
  async mounted() {
    await this.fetchFolders(this.$route.path);
    await this.getFiles();
  },
  methods: {
    ...mapActions("global", [
      "fileUpload",
      "fetchFiles",
      "deleteFile",
      "setSelectedImages",
    ]),
    ...mapActions("admin/folders", [
      "fetchFolders",
      "deleteMedia",
      "createFolder",
      "editNameFolder",
    ]),
    is_selected(image) {
      return this.selectedImages.find((item) => item.url == image.url);
    },
    is_activated(image) {
      return image ? this.activated.find((item) => item == image.url) : false;
    },
    async editFolder(folder) {
      this.folder_active = folder;
      this.isShowEdit = true;
      // await this.getFiles();
    },
    getFolderPath(folder) {
      return folder ? folder.path : "/images/";
    },
    async setPath(folder = null) {
      if (
        this.getFolderPath(this.folder_show_list) != this.getFolderPath(folder)
      ) {
        this.folder_show_list = folder;
      } else {
        this.folder_show_list = null;
      }
      this.folder_active = folder;
      await this.getFiles();
    },
    async getFiles() {
      this.images = await this.fetchFiles({
        route_path: this.$route.path,
        folder: this.$route.path.includes("mimifood")
          ? this.folder_active
          : this.folder_path,
      });
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
            const result = await this.deleteFile({
              route_path: this.$route.path,
              file: image,
            });

            if (result.status === 200 || result.data.code === 200) {
              this.images = this.images.filter((item) => item.id != image.id);
            }
          }
        });
    },
    async setFolderUpload(folder) {
      this.folder_active = folder;
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

      const fileArray = Array.from(target.files);

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
          if (this.$route.path.includes("mimifood")) {
            data.append(`files[]`, file);
          } else {
            data.append(`file_${index}`, file);
          }
        });

        const result = await this.fileUpload({
          route_path: this.$route.path,
          path: this.pathUpload,
          folder: this.$route.path.includes("mimifood")
            ? this.folder_active
            : this.folder_path,
          data,
        });
        if (result.data.code && result.data.code === 200) {
          this.$toasted.success(result.data.message);
        }
        this.$emit("uploaded", _.get(result, "data.files", []));
        this.files = [];
        this.preview = [];
        this.$refs.file.value = null;
      } catch (error) {
        if (_.get(error, "response.status", 400) !== 401) {
          // const message = error.response.data.message;
          // this.$toasted.error(message);
        }
      }
      await this.getFiles();
    },
    newFolder(value) {
      const input = {
        parent_id: this.folder_active ? this.folder_active.id : null,
        path: this.folder_path,
        name: value,
        route_path: this.$route.path,
      };
      this.$emit("newFolder", input);
    },
    async updateNameFolder(value) {
      const input = {
        route_path: this.$route.path,
        name: value,
        folder: this.folder_active,
      };
      const result = await this.editNameFolder(input);
      if (result && result.data && result.data.code === 200) {
        this.$toasted.success(result.data.message);
      }
      await this.fetchFolders(this.$route.path);
    },
    addImage(image) {
      if (this.is_selected(image)) {
        this.selected = this.selected.filter((item) => item.url != image.url);
      } else {
        const list = [];
        list.push(image);
        this.selected = this.selected.concat(list);
      }
      this.$emit("selected", this.selected);
    },
  },
};
</script>

<style lang="scss" scoped>
[disabled] {
  pointer-events: none;
}

.body-folder {
  width: 90%;
}

.card-folder .card-body {
  padding: 0;
}

.folderList {
  width: 250px;
  padding: 0px;
  min-height: 50vh;
  max-height: calc(100vh - 130px);
  border-right: 1px solid #dee2e6;
  display: none;
  // background: #333;

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
    position: relative;

    .dots-vertical {
      float: right;
      padding: 5px 0;
      right: 0px !important;
      position: absolute;
    }
  }
}

@media (max-width: 675px) {
  .folderList {
    width: 250px;
  }
}

.fileList {
  padding-left: 10px;
  padding-top: 10px;

  width: 100%;
  min-height: 50vh;
  max-height: 50vh;
  // display: flex;
  flex-wrap: wrap;
  margin-top: 10px;

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
}

.bg-gray {
  background: #e1e1e1 !important;
}

.full-zone {
  width: 100% !important;
  height: 50vh !important;
}



.card-folder .theme--light.v-btn {
  // color: #fff !important;
}

.v-btn--is-elevated {
  box-shadow: none;
  border: 1px solid #dee2e6 !important;
}

.icon-up,
.icon-down {
  float: right;
  padding: 5px 0;
  // right: 20px;
}

.dots-vertical {
  // top: -50px;
  // float: right;
  // padding: 5px 0;
  // right: -25px;
}

.folderList .folder-item .active {
  margin-left: -35px;
  padding-left: 35px;
  border: 2px solid #2196f3 !important;

  .dots-vertical {
    top: 0px;
    right: -2px !important;
  }
}

.folderList .folder-item .sub-folder.active {
  margin-left: -35px;
  padding-left: 60px;
  border: 2px solid #2196f3 !important;
}

.folderList .main-folder {
  position: relative;
  padding: 10px;

  .btn-show {
    position: absolute;
    right: 0px;
    top: 12px;
  }
}

.folderList .main-folder.active {
  margin-left: 0px;
  padding-left: 10px;
  border: 2px solid #2196f3 !important;
}

.zoom-modal {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;

  .fileList {
    height: calc(100% - 120px);
    max-height: calc(100vh - 120px);

    @media (min-width: 400px) {
      .fileItem,
      .dropzone {
        width: 100% !important;
      }
    }

    @media (min-width: 675px) {
      .fileItem,
      .dropzone {
        width: 50% !important;
      }
    }

    @media (min-width: 960px) {
      .fileItem,
      .dropzone {
        width: 33.33% !important;
      }
    }

    @media (min-width: 1200px) {
      .fileItem,
      .dropzone {
        width: 25% !important;
      }
    }

    @media (min-width: 1500px) {
      .fileItem,
      .dropzone {
        width: 20% !important;
      }
    }
  }
}

.zoom-modal .folder-show {
  min-width: 675px;

  @media (max-width: 675px) {
    .fileItem,
    .dropzone {
      width: 50% !important;
    }
  }
}

.show {
  .folderList {
    display: block;
  }

  .fileList {
    width: calc(100% -250px);

    @media (max-width: 675px) {
      width: calc(100% - 170px);
    }
  }
}

.hidden {
  display: none;
}

.v-btn:not(.v-btn--round).v-size--default {
  height: 36px;
  min-width: 36px;
  padding: 0;
}
</style>
