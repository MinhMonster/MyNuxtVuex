<template>
  <v-navigation-drawer
    style="
      top: 94px;
      min-height: calc(100% - 94px);
      height: calc(100% - 94px);
      width: 300px;
    "
    v-model="showMenuLeft"
    :mini-variant="miniVariant"
    :clipped="clipped"
    fixed
    app
  >
    <v-menu v-for="(text, index) in this.deverlopers" :key="index" offset-y>
      <template v-slot:activator="{ attrs }">
        <v-list class="" v-bind="attrs">
          <v-list-item
            :to="`/admin/deverlopers/${text.type}`"
            :class="[$route.path.includes(`${text.ID}`) ? 'v-btn--active' : '']"
          >
            <v-list-item-action>
              <v-icon> mdi-apps </v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                {{ text.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list v-if="text.active">
            <v-list-item
              v-for="item in text.sub_menu"
              :key="item.title"
              link
              :to="item.link"
              class="sub-menu"
              router
              exact
              :class="[
                $route.path.includes(`${item.ID}`) ? 'v-btn--active' : '',
              ]"
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-list>
      </template>
    </v-menu>
  </v-navigation-drawer>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("admin/deverlopers");

export default {
  name: "MenuLeft",
  components: {},
  props: {},
  watch: {},
  data() {
    return {
      clipped: true,
      fixed: false,
      miniVariant: false,
    };
  },
  async mounted() {
    await this.get_deverlopers();
  },
  destroyed() {},
  unMounted() {},
  computed: {
    ...mapFields("admin/layout", {
      showMenuLeft: "showMenuLeft",
    }),
    ...mapState(["deverlopers", "deverloper"]),
    menuLeft() {
      return _.cloneDeep(this.deverloper);
    },
  },
  methods: {
    ...mapActions(["get_deverlopers"]),
  },
};
</script>