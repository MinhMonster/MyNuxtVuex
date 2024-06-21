<template>
  <client-only>
    <div id="menu-bottom">
      <ModalSupport />

      <ModalGame />

      <div class="sub-menu-buttom" @click="nextPath('/')">
        <div class="footer_icon home">
          <div class="circle-menu">
            <div class="icon-wrap">
              <BaseSvg
                id="btn-home"
                title="Trang Chủ"
                aria-label="Trang Chủ"
                name="home"
              />
            </div>
          </div>
        </div>
        <span class="title-menu-buttom">Trang chủ</span>
      </div>
      <div class="sub-menu-buttom" @click="isThemeDark = !isThemeDark">
        <div class="footer_icon theme">
          <BaseSvg
            class="icon-menu"
            id="theme-light-dark"
            title="Giao Diện"
            aria-label="Giao Diện"
            name="theme-light-dark"
          />
        </div>
        <span class="title-menu-buttom">Giao Diện</span>
      </div>
      <div class="sub-menu-buttom" @click="nextPath('/topics')">
        <div class="footer_icon service">
          <BaseSvg
            class="icon-menu"
            id="btn-topics"
            title="Bài Đăng"
            aria-label="Bài Đăng"
            name="book"
          />
        </div>
        <span class="title-menu-buttom">Bài Đăng</span>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import ModalGame from "@/components/pages/client/layout/ModalGame";
// import ModalSetting from "@/components/pages/client/layout/ModalSetting";
import ModalSupport from "@/components/pages/client/layout/ModalSupport";

export default {
  components: {
    ModalGame,
    // ModalSetting,
    ModalSupport
  },

  computed: {
    ...mapFields("global", {
      ready: "ready"
    })
  },
  methods: {
    // changeTheme() {
    //   this.isThemeDark = !this.isThemeDark;
    // },
    nextPath(path) {
      if (this.path === path) {
        this.reset();
      } else {
        this.$router.push(path);
      }
    },
    async reset() {
      this.ready = false;
      setTimeout(() => {
        this.ready = true;
      }, 200);
    }
  }
};
</script>
<style lang="scss" scoped></style>
