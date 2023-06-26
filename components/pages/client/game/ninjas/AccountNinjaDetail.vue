
<template>
  <client-only>
    <b-row v-if="accountNinja.ID">
      <b-col cols="12" sm="12" md="8" lg="8">
        <div class="title">
          <center>
            <h3>
              Nick Ninja - Mã Số:
              <span
                ><strong>{{ format_number(accountNinja.ID) }}</strong></span
              >
            </h3>
          </center>
        </div>
        <AccountNinjaTL v-if="isMobile" :account-ninja="accountNinja" />
        <VueSlickCarousel
          v-else-if="accountNinja.hinhanh"
          :initialSlide="0"
          :slidesToShow="1"
          :arrows="true"
          :dots="true"
        >
          <div
            v-for="(image, index) in accountNinja.hinhanh"
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
            <AccountNinjaInfo :account-ninja="accountNinja"></AccountNinjaInfo>
          </b-col>
        </b-row>
      </b-col>
      <b-col v-if="isMobile" cols="12">
        <div class="title">
          <center>Hình Ảnh Của Nick Ninja</center>
        </div>
        <b-row>
          <b-col
            v-for="(image, index) in accountNinja.hinhanh"
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
import AccountNinjaInfo from "@/components/pages/client/game/ninjas/AccountNinjaInfo";
import AccountNinjaTL from "@/components/pages/client/game/ninjas/AccountNinjaTL";

export default {
  name: "AccountNinjaList",
  mixins: [mixins],

  components: { AccountNinjaInfo, AccountNinjaTL },
  props: {
    accountNinja: {
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
    width: 108%;
    // max-height: 200px;
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
  width: 112% !important;
  overflow: hidden;
  margin-left: -6px;
}
.title {
  color: #1e5b7e;
  margin-bottom: 10px;
}
</style>
