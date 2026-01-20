<template>
  <client-only>
    <div id="menu-bottom">
      <div
        class="sub-menu-buttom"
        :class="{ active: isActive('/') }"
        @click="nextPath('/')"
      >
        <div class="footer_icon">
          <BaseSvg
            class="icon-menu"
            id="btn-home"
            title="Trang Chủ"
            aria-label="Trang Chủ"
            name="home"
          />
        </div>
        <span class="title-menu-buttom">Trang chủ</span>
      </div>

      <div
        class="sub-menu-buttom"
        :class="{ active: isActive('/guides/huong-dan-mua-nick') }"
        @click="nextPath('/guides/huong-dan-mua-nick')"
      >
        <div class="footer_icon">
          <BaseSvg
            class="icon-menu"
            title="Hướng dẫn Mua Nick"
            aria-label="Hướng dẫn Mua Nick"
            name="gesture-tap-button"
          />
        </div>
        <span class="title-menu-buttom">H.D MUA</span>
      </div>

      <ModalGame />

      <ModalSupport />

      <div
        class="sub-menu-buttom"
        :class="{ active: isActive('/topics') }"
        @click="nextPath('/topics')"
      >
        <div class="footer_icon">
          <BaseSvg
            class="icon-menu"
            id="btn-topics"
            title="Bài Đăng"
            aria-label="Bài Đăng"
            name="book"
          />
        </div>
        <span class="title-menu-buttom">Bài đăng</span>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import ModalGame from "@/components/pages/client/layout/ModalGame";
import ModalSupport from "@/components/pages/client/layout/ModalSupport";

export default {
  name: "MenuBottom",

  components: {
    ModalGame,
    ModalSupport,
  },

  computed: {
    ...mapFields("global", {
      ready: "ready",
    }),
  },

  methods: {
    isActive(path) {
      return this.$route.path === path;
    },

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
    },
  },
};
</script>
<style lang="scss" scoped>

/* Icon */
.icon-menu {
  font-size: 22px;
  opacity: 0.85;
  transition: all 0.25s ease;
}

/* Text */
.title-menu-buttom {
  font-size: 10px;
  letter-spacing: 0.3px;
  color: #cbd5f5;
  transition: all 0.25s ease;
}

/* ACTIVE STATE */
.sub-menu-buttom.active {
  background: rgba(189, 0, 255, 0.12);
  border-top: 2px solid #bd00ff;
}

.sub-menu-buttom.active .icon-menu {
  color: #bd00ff;
  opacity: 1;
  filter: drop-shadow(0 0 6px rgba(189, 0, 255, 0.8));
}

.sub-menu-buttom.active .title-menu-buttom {
  color: #ffffff;
}

/* Hover (desktop only) */
@media (hover: hover) {
  .sub-menu-buttom:hover .icon-menu {
    opacity: 1;
    transform: translateY(-2px);
  }
}

/* Fix Vuetify icon button nếu có */
.v-btn.v-btn--icon.v-size--default {
  width: auto !important;
  height: auto !important;
}
</style>
