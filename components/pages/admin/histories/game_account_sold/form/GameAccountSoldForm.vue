<template>
  <client-only v-if="gameAccountSold">
    <b-tabs class="tab-account">
      <b-tab title="Info Account" class="tab-scroll scroll-y">
        <v-row class="bg-editor bg-ninja row" justify="center">
          <v-col cols="12" sm="12" md="4" lg="4" class="code-title">
            <form-validator name="taikhoan">
              <v-text-field label="Tài Khoản" v-model="taikhoan"></v-text-field>
            </form-validator>
          </v-col>
          <v-col cols="12" sm="12" md="4" lg="4" class="code-title">
            <form-validator name="matkhau">
              <v-text-field label="Mật Khẩu" v-model="matkhau"></v-text-field>
            </form-validator>
          </v-col>
          <v-col cols="12" sm="12" md="4" lg="4" class="code-title">
            <form-validator name="mapin">
              <v-text-field label="Mã Pin" v-model="mapin"></v-text-field>
            </form-validator>
          </v-col>
        </v-row>
      </b-tab>

      <b-tab title="Detail" class="tab-scroll scroll-y">
      </b-tab>
    </b-tabs>
  </client-only>
</template>

<script>
import mixins from "@/mixins/index";
import FormValidator from "@/components/pages/admin/Shared/form/FormValidator";

import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";

export default {
  mixins: [mixins],

  components: {
    FormValidator,
  },
  name: "FormAccountNinja",
  data() {
    return {
      activeCash: true,
    };
  },
  computed: {
    ...mapFields("admin/histories/game_account_sold", {
      gameAccountSold: "gameAccountSold",
      taikhoan: "gameAccountSold.taikhoan",
      matkhau: "gameAccountSold.matkhau",
      mapin: "gameAccountSold.mapin",
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
    ...mapActions("admin/histories/game_account_sold", ["newAccountNinja", "setAccountNinja"]),
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