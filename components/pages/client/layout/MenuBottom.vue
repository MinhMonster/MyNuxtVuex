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
import ModalGame from "@/components/pages/client/layout/ModalGame";
import ModalSetting from "@/components/pages/client/layout/ModalSetting";
import ModalSupport from "@/components/pages/client/layout/ModalSupport";

export default {
  components: {
    ModalGame,
    ModalSetting,
    ModalSupport,
  },

  methods: {
    nextPath(path) {
      if (this.path !== path) {
        this.$router.push(path);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
