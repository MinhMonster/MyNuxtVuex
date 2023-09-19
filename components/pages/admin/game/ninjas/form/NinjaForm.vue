<template>
  <client-only v-if="ninja">
    <b-tabs class="tab-account">
      <b-tab title="Info Account" class="tab-scroll scroll-y">
        <v-row class="bg-editor bg-ninja row" justify="center">
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <form-validator name="ID">
              <v-text-field
                label="Mã Số"
                v-model="ID"
                :disabled="is_create"
              ></v-text-field>
            </form-validator>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <form-validator name="taikhoan">
              <v-text-field label="Tài Khoản" v-model="taikhoan"></v-text-field>
            </form-validator>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <form-validator name="ingame">
              <v-text-field label="Nhân Vật" v-model="ingame"></v-text-field>
            </form-validator>
          </v-col>
          <v-col
            v-if="activeCash && giatien"
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
                v-model="giatien"
              ></v-text-field>
            </form-validator>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field
              label="Giá nhập (ATM)"
              v-model="gianhap"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field label="Sim" v-model="sim"></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <div class="outline-format">
              <form-validator name="loainick">
                <b-form-select v-model="loainick" :options="optionsNinjaType">
                </b-form-select>
              </form-validator>
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <div class="outline-format">
              <form-validator name="server">
                <b-form-select v-model="server" :options="optionsNinjaServer">
                </b-form-select>
              </form-validator>
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <div class="outline-format">
              <form-validator name="class">
                <b-form-select
                  v-model="ninjaClass"
                  :options="optionsNinjaClass"
                >
                </b-form-select>
              </form-validator>
            </div>
          </v-col>

          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <form-validator name="level">
              <v-text-field label="Level" v-model="level"></v-text-field>
            </form-validator>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <form-validator name="vukhi">
              <v-text-field label="Vũ khí" v-model="vukhi"></v-text-field>
            </form-validator>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <form-validator name="do">
              <v-text-field label="Set Đồ" v-model="setDo"></v-text-field>
            </form-validator>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <b-form-group>
              <ContentEditer
                label="Chi tiết"
                v-model="thongtin"
              ></ContentEditer>
            </b-form-group>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field label="Vũ khí" v-model="tl1"></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field label="Dây chuyền" v-model="tl2"></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field label="Nhẫn" v-model="tl3"></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field label="Bội" v-model="tl4"></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field label="Bùa" v-model="tl5"></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field label="Yoroy" v-model="tl11"></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field label="Trâm" v-model="tl6"></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field label="Áo" v-model="tl7"></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field label="Găng" v-model="tl8"></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field label="Quần" v-model="tl9"></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field label="Giày" v-model="tl10"></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field label="Mắt" v-model="eye"></v-text-field>
          </v-col>
          <v-col cols="6" sm="6" md="4" lg="4" class="code-title">
            <v-text-field label="Phân thân" v-model="clone"></v-text-field>
          </v-col>
          <v-col cols="6" sm="6" md="4" lg="4" class="code-title">
            <v-text-field label="Thú cưỡi" v-model="mounts"></v-text-field>
          </v-col>
          <v-col cols="6" sm="6" md="4" lg="4" class="code-title">
            <v-text-field label="cải trang" v-model="disguise"></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field label="Yên" v-model="yen"></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field label="Sách" v-model="book"></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2" class="code-title">
            <v-text-field label="Bánh" v-model="cake"></v-text-field>
          </v-col>
        </v-row>
      </b-tab>

      <b-tab title="Upload Images" class="tab-scroll scroll-y">
        <ImageList v-model="ninjaForm.hinhanh" @updated="updated" />
      </b-tab>
    </b-tabs>
  </client-only>
</template>

<script>
import mixins from "@/mixins/index";
import FormValidator from "@/components/pages/admin/Shared/form/FormValidator";

import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import ContentEditer from "@/components/pages/admin/Shared/nuxt-editor/CkEditorNuxt.vue";
import ImageList from "@/components/global/molecules/common/ImageList";

export default {
  mixins: [mixins],

  components: {
    FormValidator,
    ContentEditer,
    ImageList,
  },
  name: "FormAccountNinja",
  data() {
    return {
      activeCash: true,
    };
  },
  computed: {
    ...mapFields("admin/game/ninjas", {
      ninja: "ninja",
      hinhanh: "ninja.hinhanh",
      thongtin: "ninja.thongtin",
      loainick: "ninja.loainick",
      ID: "ninja.ID",
      taikhoan: "ninja.taikhoan",
      ingame: "ninja.ingame",
      giatien: "ninja.giatien",
      gianhap: "ninja.gianhap",
      sim: "ninja.sim",
      server: "ninja.server",
      ninjaClass: "ninja.class",
      level: "ninja.level",
      vukhi: "ninja.vukhi",
      setDo: "ninja.do",
      tl1: "ninja.tl1",
      tl2: "ninja.tl2",
      tl3: "ninja.tl3",
      tl4: "ninja.tl4",
      tl5: "ninja.tl5",
      tl6: "ninja.tl6",
      tl7: "ninja.tl7",
      tl8: "ninja.tl8",
      tl9: "ninja.tl9",
      tl10: "ninja.tl10",
      tl11: "ninja.tl11",
      tl12: "ninja.tl12",
      eye: "ninja.eye",
      clone: "ninja.clone",
      mounts: "ninja.mounts",
      disguise: "ninja.disguise",
      yen: "ninja.yen",
      book: "ninja.book",
      cake: "ninja.cake",
    }),
    ninjaForm() {
      return _.cloneDeep(this.ninja);
    },
    cashFormat: {
      get() {
        return _.cloneDeep(this.format_number(this.giatien));
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
    updated() {
      this.setAccountNinja(this.ninjaForm);
    },
  },
};
</script>
<style lang="scss" scoped>
.CodeMirror-sizer {
  min-height: 300px;
}

.tab-scroll {
  height: calc(100vh - 294px);
}
.bg-ninja {
  margin: 0px;
}
</style>