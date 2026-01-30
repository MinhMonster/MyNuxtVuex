<template>
  <section
    aria-labelledby="game-service-heading"
    class="pa-0"
    style="margin: -12px"
  >
    <v-row no-gutters>
      <v-col cols="12" class="text-center mb-2 mt-4">
        <h2 id="game-service-heading" class="neon-title">DỊCH VỤ GAME</h2>
      </v-col>

      <v-col
        v-for="(game, index) in gameServices"
        :key="index"
        cols="6"
        sm="4"
        md="3"
        class="pa-2"
      >
        <v-card
          dark
          class="game-card"
          ripple
          :aria-label="'Xem chi tiết dịch vụ ' + game.title"
          @click="handleAction(game.path)"
        >
          <v-img
            :src="game.image"
            :aspect-ratio="300 / 220"
            :alt="'Banner dịch vụ ' + game.title"
            class="align-end"
          >
            <v-chip
              v-if="game.isHot"
              color="red"
              x-small
              class="ma-2 font-weight-bold p-absolute-top"
              label
            >
              HOT
            </v-chip>
          </v-img>

          <v-card-text class="pa-2 text-center bg-dark-purple">
            <h3 class="game-title text-truncate">{{ game.title }}</h3>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  data: () => ({
    gameServices: [

      {
        title: "Nick Ninja VIP",
        image: "https://muabannick.pro/images/banners/banner_ninja_vip_min.jpg",
        path: "/teamobi/ninja-school/nick-vip",
      },
      {
        title: "Nick Ninja Giá Rẻ",
        image:
          "https://muabannick.pro/images/banners/banner_ninja_cheap_min.jpg",
        path: "/teamobi/ninja-school/nick-gia-re",
      },
      {
        title: "Avatar XS.DKý",
        image: "https://muabannick.pro/images/banners/banner_avatar_min.jpg",
        path: "/teamobi/avatar",
      },
      {
        title: "Liên Quân Mobile",
        image: "https://muabannick.pro/images/banners/banner-lien-quan-300x224.jpg",
        path: "/garena/lien-quan-mobile",
      },
      {
        title: "Ngọc Rồng Online",
        image: "https://muabannick.pro//images/banners/banner_nro_min.jpg",
        path: "/teamobi/ngoc-rong",
      },
      {
        title: "Nạp Lượng, Carrot",
        image: "https://muabannick.pro/images/banners/carot.png",
        path: "/services/nap-luong-carrot",
      },
      {
        title: "Bán Xu Ninja",
        image: "https://muabannick.pro/images/banners/xu-ninja.png",
        path: "/services/mua-ban-xu-ninja-school",
      },
      {
        title: "GD Trung Gian",
        image: "https://muabannick.pro/images/banners/gdtg.png",
        path: "/services/giao-dich-trung-gian",
      },
    ],
  }),
  methods: {
    handleAction(path) {
      this.$router.push(`${path}`);
    },
  },
};
</script>

<style scoped>

.game-card {
  background: #1a0033 !important;
  border: 1.5px solid #bd00ff !important;
  border-radius: 12px !important;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5) !important;
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 25px rgba(189, 0, 255, 0.7) !important;
  border-color: #ff00ff !important;
}

.bg-dark-purple {
  background: #0d001a;
}

/* Chỉnh lại style cho H3 để giữ nguyên thiết kế cũ nhưng tốt cho SEO */
.game-title {
  font-weight: 700;
  font-size: 0.85rem;
  color: #ffffff;
  text-transform: uppercase;
  margin: 0;
}

.p-absolute-top {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
}

.game-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.15),
    transparent
  );
  transform: skewX(-25deg);
  transition: 0.5s;
  z-index: 1;
}

.game-card:hover::before {
  left: 150%;
  transition: 0.8s;
}
</style>
