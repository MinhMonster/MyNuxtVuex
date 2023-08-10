<template>
  <client-only>
    <HomePage
      title="Pts Ninja School"
      :loading="!ready"
      goBack
      reload
      @reload="reload()"
    >
      <template v-if="ready" #body>
        <div class="pts-ninja-school mt-4">
          Pts Ninja School
          <input
            ref="file"
            type="file"
            multiple
            class="d-none"
            @click="clearImgPath"
            @change="onFileChange"
          />
          <div
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
          <div id="myCanvas"></div>
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
                <!-- <div class="fileType">{{ file.type }} - {{ fileSizeFilter(file.byteSize) }}</div> -->
              </div>
            </div>
          </div>
          <b-button
            class="primary-btn-2 text-14-500 text-uppercase"
            @click="
              downloadImage(
                'https://muabannick.pro/files/uploads/images/ninja_2/12646/Screenshot_2023-08-09-03-24-30-14-1691527833.png',
                texts
              )
            "
          >
            Download
          </b-button>
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";

import { mapActions, mapState } from "vuex";

import HomePage from "@/components/pages/home/HomePage";
let WidgetCount = 0;

export default {
  components: { HomePage },
  layout: "clientLayout",
  props: {},
  data() {
    return {
      files: [],
      preview: [],
      texts: [
        {
          title: 1,
          width: 426,
          height: 80,
          bgWidth: 414,
          bgHeight: 56,
        },
        {
          title: 2,
          width: 426,
          height: 116,
          bgWidth: 414,
          bgHeight: 90,
        },
        {
          title: 3,
          width: 426,
          height: 148,
          bgWidth: 414,
          bgHeight: 124,
        },
        {
          title: 4,
          width: 426,
          height: 182,
          bgWidth: 414,
          bgHeight: 158,
        },
        {
          title: 5,
          width: 426,
          height: 218,
          bgWidth: 414,
          bgHeight: 192,
        },
        {
          title: 6,
          width: 160,
          height: 80,
          bgWidth: 150,
          bgHeight: 56,
        },
        {
          title: 7,
          width: 160,
          height: 116,
          bgWidth: 150,
          bgHeight: 90,
        },
        {
          title: 8,
          width: 160,
          height: 148,
          bgWidth: 150,
          bgHeight: 124,
        },
        {
          title: 9,
          width: 160,
          height: 182,
          bgWidth: 150,
          bgHeight: 158,
        },
        {
          title: 9,
          width: 160,
          height: 218,
          bgWidth: 150,
          bgHeight: 192,
        },
        {
          name: "",
          title: "Sói 5sao 2cm, ftbs9999",
          width: 160,
          height: 290,
          bgWidth: 400,
          bgHeight: 266,
          center: true,
        },
        {
          name: "cash",
          title: "1.000.000đ",
          width: 14,
          height: 30,
          bgWidth: 4,
          bgHeight: 4,
          cash: true,
        },
        {
          name: "ig",
          title: "minhmonster",
          width: 20,
          height: 30,
          bgWidth: 4,
          bgHeight: 4,
          right: true,
        },
      ],
    };
  },
  computed: {
    ...mapFields("global", {
      ready: "ready",
    }),
  },
  async mounted() {
    await this.reload();
  },
  methods: {
    ...mapActions("home/topics", ["fetchTopic"]),
    async reload() {
      this.ready = false;
      setTimeout(() => {
        this.ready = true;
      }, 200);
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
    async onFileChange({ target }) {
      console.log("target", target.files);
      if (target.files.length === 0) return;

      // if (this.autoupload) {
      //   this.files = Array.from(target.files);
      //   this.uploadFiles();
      // } else {
        this.files = Array.from(target.files);
      this.previewFiles(Array.from(target.files));
      // }
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
        console.log("preview", this.preview);
      });
    },

    removeFile(index) {
      this.files[index].destroyed = true;
      this.files = this.files.filter((item) => !item.destroyed);
      this.preview[index].destroyed = true;
      this.preview = this.preview.filter((item) => !item.destroyed);
    },
    clearImgPath(event) {
      event.target.value = "";
    },
    async getUrl() {
      return this.preview[0].url;
    },

    async downloadImage(imageUrl, texts) {
      const canvas = document.createElement("canvas");
      

      const img = new Image();
      
      img.src = await this.getUrl(imageUrl);

      // const width = img.width;
      // const height = img.height;
      const width = 600;
      const height = 300;
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      
      
      // Load image from URL
      // const img = new Image();
      
      // img.src = await this.getUrl(imageUrl);

      img.onload = function () {
        ctx.drawImage(img, 0, 0, width, height);
        for (const text of texts) {
          if (text.title) {
            ctx.fillStyle = "#CC3300";
            const textLength = ctx.measureText(text.title).width;
            if (text.center) {
              ctx.fillRect(
                (600 - textLength -20) / 2,
                text.bgHeight,
                textLength + 20,
                32,
                20
              );
            } else if (text.right) {
              ctx.fillRect(
                600 - 24 - textLength,
                text.bgHeight,
                textLength + 20,
                32,
                20
              );
            } else if (textLength < 16) {
              ctx.fillRect(text.bgWidth, text.bgHeight, 16 + 20, 32, 20);
            } else {
              ctx.fillRect(
                text.bgWidth,
                text.bgHeight,
                textLength + 20,
                32,
                20
              );
            }

            ctx.fillStyle = "white";
            ctx.font = "26px sans-serif";
            if (text.center) {
              ctx.fillText(
                text.title,
                (600 - textLength) / 2,
                text.height
              );
            } else if (text.right) {
              ctx.fillText(text.title, 600 - textLength - 14, text.height);
            } else {
              ctx.fillText(text.title, text.width, text.height);
            }
          }
        }
        document.getElementById("myCanvas").appendChild(canvas);

        const blob = canvas.toBlob(function (blob) {
          const a = document.createElement("a");
          a.href = window.URL.createObjectURL(blob);
          a.download = "image.png";
          a.click();
        });
       
      };
    },
  },
};
</script>
<style lang="scss" scoped>
#home-page {
  max-width: 700px;
}
::v-deep {
  .topic {
    p {
      margin-bottom: 0px !important;
    }
    ul {
      padding-left: 24px;
      // li {
      // }
    }
  }
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
</style>
