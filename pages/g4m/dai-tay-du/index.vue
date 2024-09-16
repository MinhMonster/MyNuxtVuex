<template #body>
  <HomePage
    title="Đại Tây Du - G4M"
    :loading="!ready"
    goBack
    reload
    full-screen
    goHome
    @reload="reload()"
  >
    <template #body>
      <div class="text-center mb-5">
        <h4 class="title">
          Shop đang phát triển. <br />
          Sẽ mở sớm hỗ trợ AE giao dịch
        </h4>
        <img
          src="https://muabannick.pro/images/banner/dai-tay-du-g4m.png"
          alt="Đại Tây Du - G4M"
          class="image-banner"
        />
      </div>
    </template>
  </HomePage>
</template>


</template>

<script>
import HomePage from "@/components/pages/home/HomePage";
import { mapFields } from "vuex-map-fields";

// import ninjas_mixins from "@/mixins/ninjas_mixins";

export default {
  layout: "clientLayout",
  // mixins: [ninjas_mixins],

  components: {
    HomePage,
  },
  computed: {
    ...mapFields("global", {
      ready: "ready",
    }),
  },
  async mounted() {
    this.reload();
  },
  methods: {
    async reload() {
      this.ready = false;
      setTimeout(() => {
        this.ready = true;
      }, 200);
    },
  },
  data() {
    return {
      title:
        "MuaBanNick.Pro - Shop Nick Đại Tây Du G4M Tự Động - Shop Mua Bán Nick Đại Tây Du G4M VIP Giá Rẻ, Uy Tín Nhất MXH",
      description:
        "WEB Mua Bán Nick Game, Tài Khoản Game, Dịch Vụ Game Online, Ninja School - Nso, Ngọc Rồng - Nro, Avatar SX Diệu Kỳ, Uy Tín - Giá rẻ",
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.description },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.title },
        {
          name: "keywords",
          content:
            "dai tay du g4m, acc dai day du g4m, nick dai tay du g4m, mua nick dai tay du g4m, ban nick dai tay du g4m, mua ban nick dai tay du",
        },
        {
          property: "og:image",
          content: "https://muabannick.pro/images/banner/dai-tay-du-g4m.png",
        },
        {
          property: "og:image:alt",
          content: "MuaBanNick.Pro - Shop Nick Tự Động",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
#home-page {
  max-width: 800px !important;
}
img.image-banner {
  width: 100%;
}
</style>