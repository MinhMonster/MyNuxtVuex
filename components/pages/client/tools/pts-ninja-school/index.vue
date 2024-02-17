<template>
  <client-only>
    <!-- <HomePage
      title="Pts Ninja School"
      :loading="!ready"
      goBack
      reload
      @reload="reload()"
    >
      <template v-if="ready" #body>
        <div class="pts-ninja-school mt-4">
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
              </div>
            </div>
          </div>
          <div class="flex-wrap mb-2">
            <div class="flex flex-wrap gap-10">
              <div v-for="(item, index) in texts" :key="index">
                <PtsModal :data="item" />
              </div>
            </div>
          </div>

          <b-button
            class="primary-btn-2 text-14-500 text-uppercase"
            @click="
              downloadImage(
                'https://muabannick.pro/files/uploads/images/ninja_2/12646/Screenshot_2023-08-09-03-24-30-14-1691527833.png',
                texts,
                'create'
              )
            "
          >
            Xem trước
          </b-button>
          <b-button
            class="primary-btn-2 text-14-500 text-uppercase"
            @click="
              downloadImage(
                'https://muabannick.pro/files/uploads/images/ninja_2/12646/Screenshot_2023-08-09-03-24-30-14-1691527833.png',
                texts,
                'download'
              )
            "
          >
            Tải Xuống
          </b-button>
        </div>
      </template>
    </HomePage> -->
  </client-only>
</template>

<script>
// import { mapFields } from "vuex-map-fields";

// import { mapActions, mapState } from "vuex";

// import HomePage from "@/components/pages/home/HomePage";
// import PtsModal from "@/components/pages/client/tools/pts-ninja-school/PtsModal";

// let WidgetCount = 0;

// export default {
//   components: { HomePage, PtsModal },
//   layout: "clientLayout",
//   props: {},
//   data() {
//     return {
//       files: [],
//       preview: [],
//       texts: [
//         {
//           name: "Vũ Khí",
//           value: 1,
//           color: "#ffffff",
//           bgColor: "#a21d0a",
//           width: 426,
//           height: 80,
//           bgWidth: 414,
//           bgHeight: 56,
//         },
//         {
//           name: "Dây Chuyền",
//           value: 2,
//           color: "#ffffff",
//           bgColor: "#a21d0a",
//           width: 426,
//           height: 116,
//           bgWidth: 414,
//           bgHeight: 90,
//         },
//         {
//           name: "Nhẫn",
//           value: 3,
//           color: "#ffffff",
//           bgColor: "#a21d0a",
//           width: 426,
//           height: 148,
//           bgWidth: 414,
//           bgHeight: 124,
//         },
//         {
//           name: "Bội",
//           value: 4,
//           color: "#ffffff",
//           bgColor: "#a21d0a",
//           width: 426,
//           height: 182,
//           bgWidth: 414,
//           bgHeight: 158,
//         },
//         {
//           name: "Bùa",
//           value: 5,
//           color: "#ffffff",
//           bgColor: "#a21d0a",
//           width: 426,
//           height: 218,
//           bgWidth: 414,
//           bgHeight: 192,
//         },
//         {
//           name: "Nón",
//           value: 6,
//           color: "#ffffff",
//           bgColor: "#a21d0a",
//           width: 160,
//           height: 80,
//           bgWidth: 150,
//           bgHeight: 56,
//         },
//         {
//           name: "Áo",
//           value: 7,
//           color: "#ffffff",
//           bgColor: "#a21d0a",
//           width: 160,
//           height: 116,
//           bgWidth: 150,
//           bgHeight: 90,
//         },
//         {
//           name: "Găng Tay",
//           value: 8,
//           color: "#ffffff",
//           bgColor: "#a21d0a",
//           width: 160,
//           height: 148,
//           bgWidth: 150,
//           bgHeight: 124,
//         },
//         {
//           name: "Quần",
//           value: 9,
//           color: "#ffffff",
//           bgColor: "#a21d0a",
//           width: 160,
//           height: 182,
//           bgWidth: 150,
//           bgHeight: 158,
//         },
//         {
//           name: "Giày",
//           value: 9,
//           color: "#ffffff",
//           bgColor: "#a21d0a",
//           width: 160,
//           height: 218,
//           bgWidth: 150,
//           bgHeight: 192,
//         },
//         {
//           name: "Thú cưỡi/Khác",
//           value: "Sói 5sao 2cm, ftbs9999",
//           color: "#ffffff",
//           bgColor: "#a21d0a",
//           width: 160,
//           height: 290,
//           bgWidth: 400,
//           bgHeight: 266,
//           center: true,
//         },
//         {
//           name: "Giá",
//           value: "1.000.000đ",
//           color: "#ffffff",
//           bgColor: "#a21d0a",
//           width: 14,
//           height: 30,
//           bgWidth: 4,
//           bgHeight: 4,
//           cash: true,
//         },
//         {
//           name: "Tên Nhân Vật",
//           value: "minhmonster",
//           color: "#ffffff",
//           bgColor: "#a21d0a",
//           width: 20,
//           height: 30,
//           bgWidth: 4,
//           bgHeight: 4,
//           right: true,
//         },
//       ],
//     };
//   },
//   computed: {
//     ...mapFields("global", {
//       ready: "ready",
//     }),
//   },
//   async mounted() {
//     await this.reload();
//   },
//   methods: {
//     ...mapActions("home/topics", ["fetchTopic"]),
//     async reload() {
//       this.ready = false;
//       setTimeout(() => {
//         this.ready = true;
//       }, 200);
//     },
//     dragover(event) {
//       event.preventDefault();
//       event.currentTarget.classList.add("bg-gray");
//     },
//     dragleave(event) {
//       event.currentTarget.classList.remove("bg-gray");
//     },
//     drop(event) {
//       event.preventDefault();
//       this.onFileChange({ target: { files: event.dataTransfer.files } });
//       event.currentTarget.classList.remove("bg-gray");
//     },
//     browseFiles() {
//       this.$refs.file.click();
//     },
//     async onFileChange({ target }) {
//       console.log("target", target.files);
//       if (target.files.length === 0) return;

//       // if (this.autoupload) {
//       //   this.files = Array.from(target.files);
//       //   this.uploadFiles();
//       // } else {
//       this.files = Array.from(target.files);
//       this.previewFiles(Array.from(target.files));
//       // }
//     },
//     async uploadFiles() {
//       try {
//         if (this.files.length === 0) {
//           return;
//         }

//         const data = new FormData();
//         this.files.forEach((file, index) => {
//           data.append(`file_${index}`, file);
//         });

//         const result = await this.fileUpload({
//           path: this.pathUpload,
//           data,
//           // namespace: this.namespace,
//         });
//         if (result.data.code === 200) {
//           this.$toasted.success(result.data.message);
//         }
//         this.$emit("uploaded", _.get(result, "data.files", []));
//         this.files = [];
//         this.preview = [];
//         this.$refs.file.value = null;
//       } catch (error) {
//         if (_.get(error, "response.status", 400) !== 401) {
//           const message = error.response.data.message;
//           this.$toasted.error(message);
//         }
//       }
//     },
//     previewFiles(files) {
//       this.preview = [];
//       const listFiles = [];
//       files.forEach((file, index) => {
//         if (file.type.startsWith("image")) {
//           const reader = new FileReader();
//           reader.onload = (e) => {
//             this.preview.push({
//               byteSize: file.size,
//               fileName: file.name,
//               url: e.target.result,
//               type: file.type,
//               key: WidgetCount++,
//             });
//             this.preview = this.preview.filter(
//               (value, index, self) =>
//                 self.findIndex((item) => item.url === value.url) === index
//             );
//           };
//           reader.readAsDataURL(file);
//         } else {
//           this.preview.push({
//             byteSize: file.size,
//             fileName: file.name,
//             type: file.type,
//             key: WidgetCount++,
//           });
//           this.preview = this.preview.filter(
//             (value, index, self) =>
//               self.findIndex((item) => item.key === value.key) === index
//           );
//         }
//         console.log("preview", this.preview);
//       });
//     },

//     removeFile(index) {
//       this.files[index].destroyed = true;
//       this.files = this.files.filter((item) => !item.destroyed);
//       this.preview[index].destroyed = true;
//       this.preview = this.preview.filter((item) => !item.destroyed);
//     },
//     clearImgPath(event) {
//       event.target.value = "";
//     },
//     async getUrl() {
//       return this.preview[0].url;
//     },

//     async downloadImage(imageUrl, texts, action) {
//       const canvas = document.createElement("canvas");

//       const img = new Image();

//       img.src = await this.getUrl();

//       // const width = img.width;
//       // const height = img.height;
//       const width = 600;
//       const height = 300;
//       canvas.width = width;
//       canvas.height = height;

//       const ctx = canvas.getContext("2d");

//       // Load image from URL
//       // const img = new Image();

//       // img.src = await this.getUrl(imageUrl);

//       img.onload = function () {
//         ctx.drawImage(img, 0, 0, width, height);
//         for (const text of texts) {
//           if (text.value) {
//             ctx.fillStyle = text.bgColor;
//             const textLength = ctx.measureText(text.value).width;
//             if (text.center) {
//               ctx.fillRect(
//                 (600 - textLength - 20) / 2,
//                 text.bgHeight,
//                 textLength + 20,
//                 30,
//                 20
//               );
//             } else if (text.right) {
//               ctx.fillRect(
//                 600 - 20 - textLength,
//                 text.bgHeight,
//                 textLength + 20,
//                 30,
//                 20
//               );
//             } else if (textLength < 16) {
//               ctx.fillRect(text.bgWidth, text.bgHeight, 16 + 20, 30, 20);
//             } else {
//               ctx.fillRect(
//                 text.bgWidth,
//                 text.bgHeight,
//                 textLength + 20,
//                 30,
//                 20
//               );
//             }

//             ctx.fillStyle = text.color;
//             ctx.font = "26px sans-serif";
//             if (text.center) {
//               ctx.fillText(text.value, (600 - textLength) / 2, text.height);
//             } else if (text.right) {
//               ctx.fillText(text.value, 600 - textLength - 14, text.height);
//             } else {
//               ctx.fillText(text.value, text.width, text.height);
//             }
//           }
//         }
//         if (action === "create") {
//           const child = document.querySelector("canvas");

//           if (child) {
//             child.remove();
//           }
//           document.getElementById("myCanvas").appendChild(canvas);
//         } else {
//           const blob = canvas.toBlob(function (blob) {
//             const a = document.createElement("a");
//             a.href = window.URL.createObjectURL(blob);
//             a.download = "image.png";
//             a.click();
//           });
//         }
//       };
//     },
//   },
// };
</script>
<style lang="scss" scoped>
// #home-page {
//   max-width: 700px;
// }

// ::v-deep {
//   .topic {
//     p {
//       margin-bottom: 0px !important;
//     }
//     ul {
//       padding-left: 24px;
//       // li {
//       // }
//     }
//   }
//   canvas {
//     max-width: 100%;
//   }
// }
// .fileItemWrapper {
//   position: relative;
//   display: flex;
//   flex-flow: column;
//   border: 1px solid #eff2f7;
//   border-radius: 5px;
//   padding: 10px;
//   align-items: flex-start;
//   height: 100%;

//   button {
//     position: absolute;
//     right: -10px;
//     top: -10px;
//     width: 20px;
//     height: 20px;
//     font-size: 10px;
//     padding: 1px;
//   }
//   .fileIcon {
//     // width: 60px;
//     text-align: center;
//     margin-right: 10px;

//     img {
//       width: 100%;
//     }

//     .mdi {
//       font-size: 60px;
//       color: #74788d;
//       line-height: 1;
//     }
//   }

//   .fileDescription {
//     display: flex;
//     flex-flow: column;
//     flex: 1;

//     .fileName {
//       font-weight: bold;
//       margin-bottom: 5px;
//       word-break: break-all;
//     }

//     .fileSize,
//     .fileType {
//       font-style: italic;
//       color: gray;
//     }
//   }
// }
</style>
