<template>
  <client-only v-if="ninjaForm">
    <b-tabs class="tab-account">
      <b-tab title="Info Account" class="tab-scroll scroll-y">
        <v-row class="bg-editor bg-ninja row" justify="center">
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <form-validator name="ID">
              <v-text-field
                label="Mã Số"
                v-model="ninjaForm.ID"
                :disabled="is_create"
                @change="updateNinja()"
              ></v-text-field>
            </form-validator>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <form-validator name="taikhoan">
              <v-text-field
                label="Tài Khoản"
                v-model="ninjaForm.taikhoan"
                @change="updateNinja()"
              ></v-text-field>
            </form-validator>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <form-validator name="ingame">
              <v-text-field
                label="Nhân Vật"
                v-model="ninjaForm.ingame"
                @change="updateNinja()"
              ></v-text-field>
            </form-validator>
          </v-col>
          <v-col
            v-if="activeCash && ninjaForm.giatien"
            cols="6"
            sm="4"
            md="3"
            lg="2"
            class="code-title"
            @click="activeCash = false"
            @mouseover="activeCash = false"
          >
            <form-validator name="giatien">
              <v-text-field
                label="Giá bán (card)"
                :value="cashFormat"
              ></v-text-field>
            </form-validator>
          </v-col>
          <v-col
            v-else
            cols="6"
            sm="4"
            md="3"
            lg="2"
            @mouseleave="activeCash = true"
          >
            <form-validator name="giatien">
              <v-text-field
                label="Giá bán (card)"
                type="number"
                v-model="ninjaForm.giatien"
                @input="updateNinja()"
              ></v-text-field>
            </form-validator>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field
              label="Giá nhập (ATM)"
              v-model="ninjaForm.gianhap"
              @change="updateNinja()"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field
              label="Sim"
              v-model="ninjaForm.sim"
              @change="updateNinja()"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <div class="outline-format">
              <form-validator name="loainick">
                <b-form-select
                  v-model="ninjaForm.loainick"
                  :options="optionsNinjaType"
                  @change="updateNinja()"
                >
                </b-form-select>
              </form-validator>
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <div class="outline-format">
              <form-validator name="server">
                <b-form-select
                  v-model="ninjaForm.server"
                  :options="optionsNinjaServer"
                  @change="updateNinja()"
                >
                </b-form-select>
              </form-validator>
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <div class="outline-format">
              <form-validator name="class">
                <b-form-select
                  v-model="ninjaForm.class"
                  :options="optionsNinjaClass"
                  @change="updateNinja()"
                >
                </b-form-select>
              </form-validator>
            </div>
          </v-col>

          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <form-validator name="level">
              <v-text-field
                label="Level"
                v-model="ninjaForm.level"
                @change="updateNinja()"
              ></v-text-field>
            </form-validator>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <form-validator name="vukhi">
              <v-text-field
                label="Vũ khí"
                v-model="ninjaForm.vukhi"
                @change="updateNinja()"
              ></v-text-field>
            </form-validator>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <form-validator name="do">
              <v-text-field
                label="Set Đồ"
                v-model="ninjaForm.do"
                @change="updateNinja()"
              ></v-text-field>
            </form-validator>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <b-form-group>
              <ContentEditer
                label="Chi tiết"
                v-model="ninjaForm.thongtin"
                @input="updateNinja()"
              ></ContentEditer>
            </b-form-group>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field
              label="Vũ khí"
              v-model="ninjaForm.tl1"
              @change="updateNinja()"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field
              label="Dây chuyền"
              v-model="ninjaForm.tl2"
              @change="updateNinja()"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field
              label="Nhẫn"
              v-model="ninjaForm.tl3"
              @change="updateNinja()"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field
              label="Bội"
              v-model="ninjaForm.tl4"
              @change="updateNinja()"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field
              label="Bùa"
              v-model="ninjaForm.tl5"
              @change="updateNinja()"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field
              label="Yoroy"
              v-model="ninjaForm.tl11"
              @change="updateNinja()"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field
              label="Trâm"
              v-model="ninjaForm.tl6"
              @change="updateNinja()"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field
              label="Áo"
              v-model="ninjaForm.tl7"
              @change="updateNinja()"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field
              label="Găng"
              v-model="ninjaForm.tl8"
              @change="updateNinja()"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field
              label="Quần"
              v-model="ninjaForm.tl9"
              @change="updateNinja()"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field
              label="Giày"
              v-model="ninjaForm.tl10"
              @change="updateNinja()"
            ></v-text-field>
          </v-col>
        </v-row>
      </b-tab>

      <b-tab title="Upload Images" class="tab-scroll scroll-y">
        <form-validator name="hinhanh">
          <v-col cols="6" sm="4" md="3" class="middle">
            <UploadImageModal
              @onUploaded="onUploaded"
              :activated="ninjaForm.hinhanh"
              :icon="'add-file'"
            ></UploadImageModal>
          </v-col>
          <draggable
            v-model="ninjaForm.hinhanh"
            ghost-class="ghost"
            @change="changeByDrag"
            handle=".handle"
            class="row"
            tag="div"
          >
            <v-col
              v-for="(image, index) in ninjaForm.hinhanh"
              :key="index"
              cols="6"
              sm="4"
              md="3"
              class="handle"
            >
              <div class="fileItemWrapper">
                <img :src="image" alt="" class="image-ninja" />
                <b-button
                  variant="danger"
                  size="sm"
                  class="ml-2"
                  pill
                  @click="removeImage(image)"
                >
                  <i class="mdi mdi-close-thick"></i>
                </b-button>
              </div>
            </v-col>
          </draggable>
        </form-validator>
      </b-tab>
    </b-tabs>
  </client-only>
</template>

<script>
import mixins from "@/mixins/index";
import draggable from "vuedraggable";
import FormValidator from "@/components/pages/admin/Shared/form/FormValidator";

import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import ContentEditer from "@/components/pages/admin/Shared/nuxt-editor/CkEditorNuxt.vue";
import UploadImageModal from "@/components/global/plugins/UploadImageModal.vue";

export default {
  mixins: [mixins],

  components: {
    FormValidator,
    draggable,
    ContentEditer,
    UploadImageModal,
  },
  name: "FormAccountNinja",
  data() {
    return {
      activeCash: true,
    };
  },
  computed: {
    ...mapFields("admin/game/ninjas", ["ninja"]),
    ninjaForm() {
      return _.cloneDeep(this.ninja);
    },
    cashFormat: {
      get() {
        return _.cloneDeep(this.format_number(this.ninjaForm.giatien));
      },
    },
    is_create() {
      const path = this.$route.path;
      return path.includes("/new");
    },
  },
  async mounted() {
    await this.newAccountNinja();
  },
  methods: {
    ...mapActions("admin/game/ninjas", ["newAccountNinja", "setAccountNinja"]),

    updateNinja() {
      this.setAccountNinja(this.ninjaForm);
    },

    onUploaded(files) {
      this.setImage(files);
      this.setAccountNinja(this.ninjaForm);
    },

    setImage(data) {
      for (const option of data) {
        if (!this.ninjaForm.hinhanh.includes(option.url)) {
          this.ninjaForm.hinhanh.push(option.url);
        }
      }
    },

    removeImage(image) {
      this.ninjaForm.hinhanh = this.ninjaForm.hinhanh.filter(
        (item) => item != image
      );
      this.setAccountNinja(this.ninjaForm);
    },

    changeByDrag(event) {
      this.setAccountNinja(this.ninjaForm);
    },
  },
};
</script>
<style lang="scss" scoped>
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
}

.CodeMirror-sizer {
  min-height: 500px;
}

img.image-ninja {
  height: 100%;
  width: 100%;
}

.tab-scroll {
  height: calc(100vh - 294px);
}
.bg-ninja {
  margin: 0px;
}
</style>