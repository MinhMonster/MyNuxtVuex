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
// import mixins from "@/mixins/index";
export default {
  data() {
    return {
      items: [
        {
          src: this.isMobile ?  "https://muabannick.pro/images/banners/banner_mobile.png":  "https://muabannick.pro/images/banners/muabannick_banner_min.png",
        },
        // {
        //   src: "https://muabannick.pro/images/banners/banner_ny_min.jpg",
        // },
        // {
        //   src: "https://muabannick.pro/images/banners/banner_ny_min.gif",
        // },
      ],
    };
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
      // if (item == "https://muabannick.pro/images/banners/banner_ny_min.gif") {
      //   this.items = [
      //     {
      //       src: "https://muabannick.pro/images/banners/banner_ny_min.jpg",
      //     },
      //   ];
      // }
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
        min-height: 146.33px;
        max-height: 300px;
      }
    }
  }
}
</style>
