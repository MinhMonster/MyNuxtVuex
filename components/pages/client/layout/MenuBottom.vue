<template>
  <client-only>
    <div id="menu-bottom">
      <nuxt-link to="/admin-information"
        ><div class="footer_icon service">
          <v-btn id="btn-admin" icon class="icon-menu" title="Admin" aria-label="Admin">
            <v-icon>mdi-shield-crown-outline</v-icon>
          </v-btn>
        </div>
        <span class="title-menu-buttom">Admin</span>
      </nuxt-link>

      <ModalGame />

      <div class="sub-menu-buttom" @click="nextPath('/')">
        <div class="footer_icon home">
          <div class="circle-menu">
            <div class="icon-wrap">
              <v-btn icon id="btn-home" title="Trang Chủ" aria-label="Trang Chủ">
                <v-icon>mdi-home</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
        <span class="title-menu-buttom">Trang chủ</span>
      </div>
      <!-- <ModalDeposit /> -->
      <ModalSetting/>
      <div class="sub-menu-buttom" @click="nextPath('/topics')">
        <div class="footer_icon service">
          <v-btn icon class="icon-menu" id="btn-topics" title="Bài Đăng" aria-label="Bài Đăng">
            <v-icon>mdi-book-open-variant</v-icon>
          </v-btn>
        </div>
        <span class="title-menu-buttom">Bài Đăng</span>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import ModalGame from "@/components/pages/client/layout/ModalGame";
import ModalDeposit from "@/components/pages/client/layout/ModalDeposit";
import ModalSetting from "@/components/pages/client/layout/ModalSetting";

export default {
  components: {
    ModalGame,
    ModalDeposit,
    ModalSetting
  },
  props: {},
  data() {
    return {
      showModalGame: false,
    };
  },
  computed: {
    ...mapFields("home/users", ["token", "user"]),
    ...mapFields("global", {
      ready: "ready",
    }),
    isHome() {
      return this.$route.path == "/";
    },
    isLogin() {
      const path = this.$route.path;
      return path.includes("login") || path.includes("register");
    },
  },
  methods: {
    nextProfile() {
      if (this.token) {
        this.$router.push("/account/profile");
      } else {
        this.disabledLogin();
      }
    },
    nextHistory() {
      if (this.token) {
        this.$router.push("/account/history");
      } else {
        this.disabledLogin();
      }
    },
    nextPath(path) {
      const routePath = this.$route.path;
      if (routePath === path) {
        this.reset();
      } else {
        this.$router.push(path);
      }
    },
    nextWalletDeposit() {
      if (this.token) {
        this.$router.push("/account/wallet/deposit/vnd");
      } else {
        this.disabledLogin();
      }
    },
    disabledLogin() {
      if (!this.isLogin) {
        this.$router.push("/login");
      } else {
        this.showSwal({
          title: "Bạn chưa đăng nhập",
          html: "Hãy đăng nhập hoặc đăng ký nếu chưa có tài khoản để sử dụng dịch vụ. <br/> Xin cảm ơn!"
        });
      }
    },

    nextHome() {
      if (this.isHome) {
        this.reset();
      } else {
        this.$router.push("/");
      }
    },
    async reset() {
      this.ready = false;
      setTimeout(() => {
        this.ready = true;
      }, 200);
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
