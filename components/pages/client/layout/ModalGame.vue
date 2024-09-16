<template>
  <v-dialog v-model="dialog" scrollable max-width="500px" light>
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on" class="sub-menu-buttom">
        <div class="footer_icon Member">
          <v-btn icon class="icon-menu">
            <v-icon>mdi-controller</v-icon>
          </v-btn>
        </div>
        <span class="title-menu-buttom">Game</span>
      </div>
    </template>
    <v-card>
      <v-btn class="close" color="red" icon @click="dialog = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-title class="title-modal"> Menu Nick Game</v-card-title>
      <v-card-text style="height: 200px">
        <div class="base-diglog page-body">
          <div class="base-diglog-bg scroll-y">
            <ul class="base-diglog-list">
              <li
                v-for="(menu, index) in menuOptions"
                :key="index"
                @click="nextPath(menu.path)"
                class="base-diglog-item list-item-hot on"
              >
                <div class="base-diglog-icon">
                  <img :src="menu.image" alt="" />
                </div>
                <span class="base-diglog-name">{{ menu.title }}</span
                ><i class="menu-active"></i>
              </li>
            </ul>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
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
      this.dialog = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.v-card.v-sheet.theme--dark {
  border: 1px solid #a4a4a4;
}




.base-diglog {
   padding: 5px;


  .base-diglog-icon {
    img {
      border-radius: 50%;
      height: 35px;
      width: 35px;
      margin-right: 10px;
    }
  }

  
  .base-diglog-item {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    // justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    margin-bottom: 20px;
  }
}



</style>