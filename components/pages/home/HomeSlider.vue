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
            {
              src: this.isMobile
                ? "https://muabannick.pro/images/banners/banner-mobile.jpg"
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
        max-height: 320px;
      }
    }
  }
}
</style>
