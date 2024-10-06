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
export default {
  computed: {
    items() {
      if (this.isDark) {
        return [
          {
            src: this.isMobile
              ? "/banner.jpg"
              : "/banner.jpg",
          },
          {
            src: this.isMobile
              ? "/banner-2.jpg"
              : "/banner-2.jpg",
          }
        ];
      } else {
        return [
          {
            src: this.isMobile
              ? "/banner.jpg"
              : "/banner.jpg",
          },
          {
            src: this.isMobile
              ? "/banner-2.jpg"
              : "/banner-2.jpg",
          }
        ];
      }
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
        min-height: 150px;
        max-height: 500px;
      }
    }
  }
}
</style>
