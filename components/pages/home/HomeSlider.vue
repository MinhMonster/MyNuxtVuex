<template>
  <div class="home-slider">
    <v-carousel hide-delimiters cycle :interval="5000">
      <v-carousel-item v-for="(item, i) in items" :key="i" cover eager>
        <v-img
          :src="item.src"
          height="100%"
          @load="onLoadAvatar"
          @error="onErrorAvatar"
          eager
        />
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  data() {
    return {
      itemsData: null,
    };
  },
  computed: {
    ...mapFields("global", {
      isNotification: "isNotification",
      onNotification: "onNotification",
    }),
    isShowNoti() {
      return this.isNotification && this.onNotification;
    },
    items: {
      get() {
        if (!this.itemsData) {
          return [
            // {
            // src: this.isThemeRed
            //   ? (
            //     this.isMobile
            //       ? "/images/banners/banner-red.png"
            //       : this.isShowNoti
            //         ? "/images/banners/banner-red.png"
            //         : "/images/banners/banner-red.png"
            //   ) : this.isThemeBlue
            //   ? (
            //     this.isMobile
            //       ? "/images/banners/banner.png"
            //       : this.isShowNoti
            //         ? "/images/banners/banner.png"
            //         : "/images/banners/banner.png"
            //   ): (
            //     this.isMobile
            //       ? "https://muabannick.pro/images/banners/banner-mobile.jpg"
            //       : this.isShowNoti
            //         ? "https://muabannick.pro/images/banners/muabannick_banner_min.png"
            //         : "https://muabannick.pro/images/banners/banner_muabannick_14_mb.gif"
            //   )
            // },
            // {
            //   src: "https://muabannick.pro/images/banners/banner_ny_min.jpg",
            // },
            {
              src: "/images/banners/banner.png",
            },
          ];
        } else {
          return this.itemsData;
        }
      },
      set(newValue) {
        this.itemsData = newValue;
      },
    },
  },
  methods: {
    onLoadAvatar(item) {
      // if (item == "https://muabannick.pro/images/banners/banner_ny_min.gif") {
      //   this.items = [
      //     {
      //       src: "https://muabannick.pro/images/banners/banner_ny_min.gif",
      //     },
      //   ];
      // }
    },
    onErrorAvatar(item) {
      if (
        item ==
        "https://muabannick.pro/images/banners/banner_muabannick_14_mb.gif"
      ) {
        this.items = [
          {
            src: "https://muabannick.pro/images/banners/muabannick_banner_min.png",
          },
        ];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home-slider {
  ::v-deep {
    .v-carousel {
      height: auto !important;
      border-radius: 3px;

      .v-carousel__item {
        height: auto !important;
        min-height: 150px;
        max-height: 500px;
      }
    }
  }
}
</style>
