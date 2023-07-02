<template>
  <client-only v-if="accountForm">
    <b-tabs class="tab-account">
      <b-tab title="Info Account" class="tab-scroll scroll-y">
        <v-row class="bg-editor bg-account row" justify="center">
          <v-col cols="6" sm="4" md="3" lg="3" class="code-title">
            <form-validator name="ID">
              <v-text-field
                label="Mã Số"
                v-model="accountForm.ID"
                :disabled="is_create"
                @change="updateAvatar()"
              ></v-text-field>
            </form-validator>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="3" class="code-title">
            <form-validator name="username">
              <v-text-field
                label="Tài Khoản"
                v-model="accountForm.username"
                @change="updateAvatar()"
              ></v-text-field>
            </form-validator>
          </v-col>
          <v-col
            v-if="activeCash && accountForm.giatien"
            cols="6"
            sm="4"
            md="3"
            lg="3"
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
            lg="3"
            @mouseleave="activeCash = true"
          >
            <form-validator name="giatien">
              <v-text-field
                label="Giá bán (card)"
                type="number"
                v-model="accountForm.giatien"
                @input="updateAvatar()"
              ></v-text-field>
            </form-validator>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="3" class="code-title">
            <v-text-field
              label="Giá nhập (ATM)"
              v-model="accountForm.gianhap"
              @change="updateAvatar()"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="3" class="code-title">
            <v-text-field
              label="Sim"
              v-model="accountForm.sim"
              @change="updateAvatar()"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="3" class="code-title">
            <form-validator name="dat">
              <v-text-field
                label="Đất"
                v-model="accountForm.dat"
                @change="updateAvatar()"
              ></v-text-field>
            </form-validator>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="3" class="code-title">
            <form-validator name="ga">
              <v-text-field
                label="Gà"
                v-model="accountForm.ga"
                @change="updateAvatar()"
              ></v-text-field>
            </form-validator>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="3" class="code-title">
            <form-validator name="ca">
              <v-text-field
                label="Cá"
                v-model="accountForm.ca"
                @change="updateAvatar()"
              ></v-text-field>
            </form-validator>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <b-form-group>
              <ContentEditer
                label="Chi tiết"
                v-model="accountForm.thongtin"
                @input="updateAvatar()"
              ></ContentEditer>
            </b-form-group>
          </v-col>
        </v-row>
      </b-tab>

      <b-tab title="Upload Images" class="tab-scroll scroll-y">
        <form-validator name="hinhanh">
          <v-col cols="6" sm="4" md="3" class="middle">
            <UploadImageModal
              @onUploaded="onUploaded"
              :activated="accountForm.hinhanh"
              :icon="'add-file'"
            ></UploadImageModal>
          </v-col>
          <draggable
            v-model="accountForm.hinhanh"
            ghost-class="ghost"
            @change="changeByDrag"
            handle=".handle"
            class="row"
            tag="div"
          >
            <v-col
              v-for="(image, index) in accountForm.hinhanh"
              :key="index"
              cols="6"
              sm="4"
              md="3"
              class="handle"
            >
              <div class="fileItemWrapper">
                <img :src="image" alt="" class="image-account" />
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
  name: "FormAccountAvatar",
  data() {
    return {
      activeCash: true,
    };
  },
  computed: {
    ...mapFields("admin/game/avatars", ["avatar"]),
    accountForm() {
      return _.cloneDeep(this.avatar);
    },
    cashFormat: {
      get() {
        return _.cloneDeep(this.format_number(this.accountForm.giatien));
      },
    },
    is_create() {
      const path = this.$route.path;
      return path.includes("/new");
    },
  },
  async mounted() {
    await this.newAccountAvatar();
  },
  methods: {
    ...mapActions("admin/game/avatars", ["newAccountAvatar", "setAccountAvatar"]),

    updateAvatar() {
      this.setAccountAvatar(this.accountForm);
    },

    onUploaded(files) {
      this.setImage(files);
      this.setAccountAvatar(this.accountForm);
    },

    setImage(data) {
      for (const option of data) {
        if (!this.accountForm.hinhanh.includes(option.url)) {
          this.accountForm.hinhanh.push(option.url);
        }
      }
    },

    removeImage(image) {
      this.accountForm.hinhanh = this.accountForm.hinhanh.filter(
        (item) => item != image
      );
      this.setAccountAvatar(this.accountForm);
    },

    changeByDrag(event) {
      this.setAccountAvatar(this.accountForm);
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

img.image-account {
  height: 100%;
  width: 100%;
}

.tab-scroll {
  height: calc(100vh - 294px);
}
.bg-account {
  margin: 0px;
}
</style>