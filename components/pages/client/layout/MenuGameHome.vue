<template>
  <div class="game-menu">
    <div class="game-menu-bg scroll-y">
      <ul class="game-menu-list">
        <li class="game-menu-item list-item-hot on">
          <div class="game-menu-icon">
            <v-btn icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </div>
          <span class="game-menu-name">Ninja School</span
          ><i class="menu-active"></i>
        </li>
        <li class="game-menu-item list-item-hot on">
          <div class="game-menu-icon">
            <v-btn icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </div>
          <span class="game-menu-name">Ngọc Rồng</span
          ><i class="menu-active"></i>
        </li>
        <li class="game-menu-item list-item-hot on">
          <div class="game-menu-icon">
            <v-btn icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </div>
          <span class="game-menu-name">Avatar</span><i class="menu-active"></i>
        </li>
        <li class="game-menu-item list-item-hot on">
          <div class="game-menu-icon">
            <v-btn icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </div>
          <span class="game-menu-name">Ninja School</span
          ><i class="menu-active"></i>
        </li>
        <li class="game-menu-item list-item-hot on">
          <div class="game-menu-icon">
            <v-btn icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </div>
          <span class="game-menu-name">Ninja School</span
          ><i class="menu-active"></i>
        </li>
        <li class="game-menu-item list-item-hot on">
          <div class="game-menu-icon">
            <v-btn icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </div>
          <span class="game-menu-name">Ninja School</span
          ><i class="menu-active"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
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
    .v-btn--icon.v-size--default i {
      height: 30px;
      width: 30px;
      line-height: 30px;
      font-size: 30px;
    }
  }
  .game-menu-name {
    font-size: 14px;
  }
  .game-menu-list {
    width: 100%;
    height: 100%;
    position: relative;
    margin-bottom: 70px;
  }
  .game-menu-item {
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