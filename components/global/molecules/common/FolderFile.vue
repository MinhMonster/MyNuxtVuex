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
        <FolderImages :folder-active="folder_active" @setPath="setPath" />
        <div
          v-for="(folder, index) in folders"
          :key="index"
          class="pointer folder-item"
          :class="{ hidden: !showFolder }"
        >
          <FolderCard
            :folder="folder"
            :folder-active="folder_active"
            :folder-path="folder_path"
            @setPath="setPath"
            @editFolder="editFolder"
          >
            <template #btn-up-down>
              <BtnUpDown :folderShowList="folder_show_list" :folder="folder" />
            </template>
          </FolderCard>
          <SubFolderCards
            v-if="folder_show_list && folder_show_list.id == folder.id"
            :folders="folder.sub_folders"
            :folder-active="folder_active"
            @setPath="setPath"
            @editFolder="editFolder"
          />
        </div>
      </div>
      <div class="fileList scroll-y">
        <FilePrivewCards
          v-if="preview.length"
          :images="preview"
          @removeFile="removeFile"
        />
        <FileCards
          v-if="images.length"
          :images="images"
          :selectedImages="selectedImages"
          :activated="activated"
          @addImage="addImage"
          @onDeleteFile="onDeleteFile"
        />
      </div>
    </div>

    <template v-if="!autoupload && preview.length" #footer>
      <BtnActionUpload @removeAll="removeAll" @uploadFiles="uploadFiles" />
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
import FolderImages from "@/components/Uploads/Folder/FolderImages.vue";
import FolderCard from "@/components/Uploads/Folder/FolderCard.vue";
import SubFolderCards from "@/components/Uploads/Folder/SubFolderCards.vue";
import BtnUpDown from "@/components/Uploads/Folder/BtnUpDown.vue";
import FileCards from "@/components/Uploads/File/FileCards.vue";
import FilePrivewCards from "@/components/Uploads/File/FilePrivewCards.vue";
import EditFolderModal from "@/components/global/molecules/common/EditFolderModal.vue";
import UpdateNameFolderModal from "@/components/global/molecules/common/upload/UpdateNameFolderModal";
import BtnActionUpload from "@/components/Uploads/BtnActionUpload.vue";

let WidgetCount = 0;
export default {
  mixins: [mixins],
  components: {
    GroupBtnActions,
    FolderImages,
    FolderCard,
    SubFolderCards,
    BtnUpDown,
    FileCards,
    FilePrivewCards,
    UpdateNameFolderModal,
    EditFolderModal,
    BtnActionUpload,
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
    ...mapFields("admin/folders", ["isUploadMms"]),
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
    await this.fetchFolders();
    await this.getFiles();
  },
  methods: {
    ...mapActions("global", ["setSelectedImages"]),
    ...mapActions("admin/folders", [
      "fileUpload",
      "fetchFiles",
      "deleteFile",
      "fetchFolders",
      "deleteMedia",
      "createFolder",
      "editNameFolder",
    ]),

    async editFolder(folder) {
      this.folder_active = folder;
      this.isShowEdit = true;
      await this.getFiles();
    },
    getFolderPath(folder) {
      return folder ? folder.path : "/images/";
    },
    async setPath({ folder = null, isFolderPath = null }) {
      this.folder_active = folder;
      if (isFolderPath) {
        if (
          this.getFolderPath(this.folder_show_list) !=
          this.getFolderPath(folder)
        ) {
          this.folder_show_list = folder;
        } else {
          this.folder_show_list = null;
        }
      }
      this.folder_path = this.folder_active
        ? this.folder_active.path
        : "/images/";
      await this.getFiles();
    },
    async getFiles() {
      this.images = await this.fetchFiles({
        // route_path: this.$route.path,
        folder: this.isUploadMms ? this.folder_active : this.folder_path,
      });
    },
    async onDeleteFile(image) {
      const result = await this.showSwal({
        title: ` <img style="width: 100%; height: auto" src="${image.url}" /> <br/> Delete Image? `,
        showCancelButton: true,
        confirmButtonText: "YES",
        cancelButtonText: "NO",
      });
      if (result) {
        const res = await this.deleteFile({
          route_path: this.$route.path,
          file: image,
        });
        if (res.status === 200 || res.data.code === 200) {
          this.images = this.images.filter((item) => item.id != image.id);
        }
      }
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
          if (this.isUploadMms) {
            data.append(`files[]`, file);
          } else {
            data.append(`file_${index}`, file);
          }
        });

        const result = await this.fileUpload({
          route_path: this.$route.path,
          path: this.pathUpload,
          folder: this.isUploadMms ? this.folder_active : this.folder_path,
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
      await this.fetchFolders();
    },
    addImage(image) {
      if (this.isSelected(image, this.selectedImages)) {
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

.card-folder .card-body {
  padding: 0;
}

.folderList {
  width: 300px;
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
