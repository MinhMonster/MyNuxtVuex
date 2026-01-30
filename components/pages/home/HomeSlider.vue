<template>
  <div class="home-slider" style="margin: -3px">
    <v-carousel hide-delimiters cycle :interval="5000">
      <v-carousel-item v-for="(item, i) in items" :key="i" cover eager>
        <v-img
          :src="item.src"
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
            {
              src: this.isThemeRed
                ? this.isMobile
                  ? "/images/banners/banner-red.png"
                  : this.isShowNoti
                  ? "/images/banners/banner-red.png"
                  : "/images/banners/banner-red.png"
                : this.isMobile
                ? "https://muabannick.pro/images/banners/banner_600x220.gif"
                : this.isTablet
                ? "https://muabannick.pro/images/banners/banner_800x294.gif"
                : this.isShowNoti
                ? "https://muabannick.pro/images/banners/muabannick_banner_min.png"
                : "https://muabannick.pro/images/banners/banner_muabannick_14_mb.gif",
            },
            // {
            //   src: "https://muabannick.pro/images/banners/banner_ny_min.jpg",
            // },
            // {
            //   src: "https://muabannick.pro/images/banners/banner_ny_min.gif",
            // },
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
      if (item.endsWith(".gif")) {
        this.items = [
          {
            src: "https://muabannick.pro/images/banners/banner-800x294.jpg",
          },
        ];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home-slider {
  box-shadow: 0 0 12px rgba(189, 0, 255, 0.45) !important;
  ::v-deep {
    .v-carousel {
      height: auto !important;
      border-radius: 3px;

      .v-carousel__item {
        aspect-ratio: 600 / 220;
        width: 100%;
        height: auto !important;
        max-height: 300px !important;
      }
    }
  }
}
</style>
