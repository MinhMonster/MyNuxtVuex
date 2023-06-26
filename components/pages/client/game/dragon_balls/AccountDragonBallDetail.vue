
<template>
  <client-only>
    <b-row v-if="account.ID">
      <b-col cols="12" sm="12" md="8" lg="8">
        <div class="title">
          <center>
            <h3>
              Nick Ngọc Rồng - Mã Số:
              <span
                ><strong>{{ format_number(account.ID) }}</strong></span
              >
            </h3>
          </center>
        </div>
        <AccountDragonBallTL v-if="isMobile" :account="account" />
        <VueSlickCarousel
          v-else-if="account.images"
          :initialSlide="0"
          :slidesToShow="1"
          :arrows="true"
          :dots="true"
        >
          <div
            v-for="(image, index) in account.images"
            :key="index"
            :src="image"
            alt=""
          >
            <img
              v-if="image.includes('muabannick.pro')"
              :src="image"
              alt=""
              class="image-account"
            />
            <img
              v-else
              :src="`https://muabannick.pro${image}`"
              alt=""
              class="image-account"
            />
          </div>
        </VueSlickCarousel>
      </b-col>
      <b-col cols="12" sm="12" md="4" lg="4">
        <b-row>
          <b-col cols="12" sm="12" md="12">
            <AccountDragonBallInfo :account="account" />
          </b-col>
        </b-row>
      </b-col>
      <b-col v-if="isMobile" cols="12">
        <div class="title">
          <center>Hình Ảnh Của Nick Ngọc Rồng</center>
        </div>
        <b-row>
          <b-col
            v-for="(image, index) in account.images"
            :key="index"
            cols="12"
            sm="12"
            md="6"
            lg="4"
          >
            <div class="fileItemWrapper">
              <img
                v-if="image.includes('muabannick.pro')"
                :src="image"
                alt=""
                class="image-ninja"
              />
              <img
                v-else
                :src="`https://muabannick.pro${image}`"
                alt=""
                class="image-ninja"
              />
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </client-only>
</template>
  
  <script>
import mixins from "@/mixins/index";
import AccountDragonBallInfo from "@/components/pages/client/game/dragon_balls/AccountDragonBallInfo";
import AccountDragonBallTL from "@/components/pages/client/game/dragon_balls/AccountDragonBallTL";

export default {
  name: "accountAvatarList",
  mixins: [mixins],

  components: { AccountDragonBallInfo, AccountDragonBallTL },
  props: {
    account: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isMobile: false,
    };
  },
  async mounted() {
    this.$nextTick(function () {
      this.onResize();
    });
    window.addEventListener("resize", this.onResize);
  },
  computed: {},
  methods: {
    onResize() {
      const screenWidth = document.querySelector("body").clientWidth;
      if (screenWidth < 600) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.fileItemWrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  // height: 100%;
  overflow: hidden;
  // border-radius: 5px;

  img {
    width: 100%;
  }
}
.account {
  margin: -9px;
}
.btn-next-more {
  color: #ffffff;
  background: #a21d0a !important;
  text-align: center;
  margin: 0 auto;
}
.image-account {
  width: 100% !important;
  overflow: hidden;
  margin-left: 0%;
}
.title {
  color: #1e5b7e;
  margin-bottom: 10px;
}
</style>
