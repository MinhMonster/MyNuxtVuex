
<template>
  <client-only>
    <v-row v-if="account.ID">
      <v-col cols="12" sm="12" md="8" lg="8">
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
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4">
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <AccountDragonBallInfo :account="account" />
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="isMobile" cols="12">
        <div class="title">
          <center>Hình Ảnh Của Nick Ngọc Rồng</center>
        </div>
        <v-row>
          <v-col
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
          </v-col>
        </v-row>
        <GroupBtnBuyAccount :account="account" account-type="Ngọc Rồng Online" />
      </v-col>
    </v-row>
  </client-only>
</template>
  
  <script>
import mixins from "@/mixins/index";
import AccountDragonBallInfo from "@/components/pages/client/game/dragon_balls/AccountDragonBallInfo";
import AccountDragonBallTL from "@/components/pages/client/game/dragon_balls/AccountDragonBallTL";
import GroupBtnBuyAccount from "@/components/pages/client/game/GroupBtnBuyAccount";

export default {
  mixins: [mixins],

  components: {
    AccountDragonBallInfo,
    AccountDragonBallTL,
    GroupBtnBuyAccount,
  },
  props: {
    account: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  async mounted() {
    this.$nextTick(function () {
      this.onResize();
    });
    window.addEventListener("resize", this.onResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  computed: {},
  methods: {},
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
