<template>
  <client-only>
    <div>
      <div v-b-toggle.sidebar-right class="header-menu">
        <div class="login-btn">
          <span @click="openMenu()"
            >{{ user && token ? user.name : "Tài khoản" }}
          </span>
          <v-icon v-if="!isShow">mdi-menu-down</v-icon>
          <v-icon v-else>mdi-menu-up</v-icon>
        </div>
      </div>
      <b-sidebar
        v-model="isShow"
        id="sidebar-right"
        class="bg-sidebar"
        right
        shadow
        backdrop
      >
        <SideBarMenu @close="isShow = false"></SideBarMenu>
      </b-sidebar>
    </div>
  </client-only>
</template>
<script>
import mixins from "@/mixins/index";
import SideBarMenu from "@/components/pages/client/layout/SideBarMenu";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");
export default {
  mixins: [mixins],
  components: {
    SideBarMenu,
  },
  props: {},
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    ...mapState(["token", "user"]),
  },
  mounted() {},
  methods: {
    ...mapActions(["fetchUser"]),
    openMenu() {
      if (this.token && !this.isShow) {
        this.fetchUser();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.login-btn span {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 15ch;
}
::v-deep {
  .b-sidebar-backdrop {
    top: 50px;
  }
  .b-sidebar {
    width: 250px;
  }
  .b-sidebar > .b-sidebar-header {
    padding: 0;

    display: block;
  }
  .close {
    display: none;
    color: #663019 !important;
    // margin-top: 5px;
    margin-right: 5px;
    align-items: center !important;
    justify-content: center !important;
    -ms-flex-pack: center !important;
    text-decoration: none;
    border-radius: 50%;
    font-size: 16px;
    height: 30px;
    width: 30px;
    right: 5px;
    top: 5px;
    font-weight: 800;
    position: absolute;
    z-index: 2;
  }
  .close {
    background-image: linear-gradient(180deg, #fdffdb, #ffcf9c);
    border: 2px solid #561d00;
  }
  .bg-sidebar .b-sidebar {
    top: 50px;
    color: #fff !important;
    background: radial-gradient(
      circle at 50% 100%,
      #e28637,
      #9f5424 58%,
      #561d00 127%
    );
    height: calc(100vh - 50px);
  }
}
</style>