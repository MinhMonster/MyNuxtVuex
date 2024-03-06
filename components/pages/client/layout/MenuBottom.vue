<template>
  <client-only>
    <div id="menu-bottom">
      <nuxt-link to="/admin-information"
        ><div class="footer_icon service">
          <BaseSvg
            id="btn-admin"
            class="icon-menu"
            title="Hỗ trợ"
            aria-label="Hỗ trợ"
            name="support"
          />
        </div>
        <span class="title-menu-buttom">Hỗ trợ</span>
      </nuxt-link>

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
      <ModalSetting />
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
import ModalSetting from "@/components/pages/client/layout/ModalSetting";

export default {
  components: {
    ModalGame,
    ModalSetting,
  },

  computed: {
    ...mapFields("global", {
      ready: "ready",
    }),
  },
  methods: {
    nextPath(path) {
      const routePath = this.$route.path;
      if (routePath === path) {
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
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
