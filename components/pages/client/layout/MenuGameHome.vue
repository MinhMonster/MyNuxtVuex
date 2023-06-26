<template>
  <div class="game-menu">
    <div class="game-menu-bg scroll-y">
      <ul class="game-menu-list">
        <li
          v-for="(menu, index) in menuOptions"
          :key="index"
          class="game-menu-item list-item-hot on"
        >
          <div class="game-menu-icon" @click="nextPath(menu.path)">
            <img :src="menu.image" alt="" />
          </div>
          <span class="game-menu-name">{{ menu.title }}</span
          ><i class="menu-active"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      menuOptions: [
        {
          title: "Ninja School",
          path: "/teamobi/ninja-school",
          image: "/icon/nj.webp",
        },
        {
          title: "Avatar",
          path: "/teamobi/avatar",
          image: "/icon/avatar.jpeg",
        },
        {
          title: "Ngọc Rồng",
          path: "/teamobi/ngoc-rong",
          image: "/icon/nro.png",
        },
      ],
    };
  },
  methods: {
    nextPath(path) {
      this.$router.push(`${path}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.game-menu {
  position: fixed;
  top: 50px;
  left: 0;
  width: 50px;
  z-index: 10;
  height: 100%;

  min-height: calc(100% - 120px);

  overflow: hidden;
  padding: 5px;
  overflow-y: auto;
  overflow-x: hidden;
  // background: linear-gradient(180deg, #e28637, #9f5424 12%, #561d00);
  background: #9f5424;

  .game-menu-icon {
    img {
      border-radius: 50%;
      height: 35px;
      width: 35px;
    }

    .v-btn--icon.v-size--default i {
      height: 30px;
      width: 30px;
      line-height: 30px;
      font-size: 30px;
    }
  }
  .game-menu-name {
    font-size: 14px;
    color: #fff;
  }
  .game-menu-list {
    width: 100%;
    height: 100%;
    position: relative;
    margin-bottom: 70px;
  }
  .game-menu-item {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    margin-bottom: 20px;
  }
}
.game-menu .game-menu-bg {
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  text-align: center;
}

.game-menu .game-menu-bg::-webkit-scrollbar-thumb {
  background: #999999 !important;
  border-radius: 10px !important;
}
.game-menu .game-menu-bg::-webkit-scrollbar-track {
  background: #555555;
  border-radius: 10px;
}
.game-menu .game-menu-bg::-webkit-scrollbar {
  width: 0px;
  direction: ltr;
}
@media (min-width: 400px) {
  .game-menu {
    width: 60px;
    // transition: margin-left 0.5s;
  }
}
@media (min-width: 450px) {
  .game-menu {
    width: 70px;
  }
}
</style>