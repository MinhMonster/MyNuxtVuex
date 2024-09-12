<template>
  <v-app-bar :clipped-left="clipped" :clipped-right="clipped" fixed app>
    <v-app-bar-nav-icon @click.stop="showMenuLeft = !showMenuLeft" />
    <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
        </v-btn> -->

    <!-- <v-btn icon @click.stop="clipped = !clipped">
          <v-icon>mdi-application</v-icon>
        </v-btn> -->
    <v-btn icon @click.stop="fixed = !fixed">
      <v-icon>mdi-minus</v-icon>
    </v-btn>

    <!-- <v-toolbar-title>
          {{ title }}
          
        </v-toolbar-title> -->
    <v-spacer />
    <v-btn v-if="showMenuRight" icon> <v-icon>mdi-cursor-move</v-icon>: </v-btn
    ><br />
    <b-form-checkbox
      v-if="showMenuRight"
      v-model="checkedMove"
      name="check-button"
      switch
    >
    </b-form-checkbox>
    <v-btn v-if="showMenuRight" icon>
      <v-icon>mdi-pencil-box-multiple-outline</v-icon>:
    </v-btn>
    <b-form-checkbox
      v-if="showMenuRight"
      v-model="checkedEdit"
      name="check-button"
      switch
    >
    </b-form-checkbox>
    <v-btn color="red" icon @click="onLogout">
      <v-icon>mdi-power</v-icon>
    </v-btn>
    <v-btn v-if="deverloper" icon @click.stop="showMenuRight = !showMenuRight">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("admin/auth");
const dev = createNamespacedHelpers("admin/deverlopers");

export default {
  name: "AppBar",
  data() {
    return {
      clipped: true,
      miniVariant: false,
    };
  },
  computed: {
    ...mapFields("admin/layout", {
      showMenuLeft: "showMenuLeft",
      showMenuRight: "showMenuRight",
      checkedEdit: "checkedEdit",
      checkedMove: "checkedMove",
      fixed: "fixed",
    }),
    ...dev.mapState(["deverloper"]),
  },
  methods: {
    ...mapActions(["logout"]),
    async onLogout() {
      await this.logout();
      this.$router.push("/admin/login");
    },
  },
};
</script>