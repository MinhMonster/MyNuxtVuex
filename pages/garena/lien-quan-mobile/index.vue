<template>
  <client-only>
    <HomePage title="Nick Liên Quân Mobile" goBack reload>
      <template #body>
        <div class="coming-soon-wrapper">
          <div class="coming-soon-card">
            <h1 class="coming-soon-title">Dịch vụ sắp ra mắt</h1>
            <p class="coming-soon-desc">Vui lòng quay lại sau.</p>
          </div>
        </div>
      </template>
    </HomePage>
  </client-only>
</template>


<script>
import HomePage from "@/components/pages/home/HomePage";

export default {
  layout: "clientLayout",
  components: {
    HomePage,
  },
  methods: {},
  data() {
    return {
      title: "Nick Liên Quân Mobile",
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.title },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.title },
        { property: "og:image", content: `${process.env.NUXT_PUBLIC_ASSET_URL}` + "/images/banners/banner-lien-quan-300x224.jpg" },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
#home-page {
  max-width: 100%;
}

/* wrapper căn giữa */
.coming-soon-wrapper {
  min-height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* card giống khung trong ảnh */
.coming-soon-card {
  width: 100%;
  max-width: 680px;
  padding: 40px 20px;
  text-align: center;

  background: linear-gradient(
    180deg,
    rgba(25, 18, 45, 0.95),
    rgba(10, 8, 20, 0.95)
  );

  border-radius: 14px;
  border: 1px solid rgba(170, 90, 255, 0.45);

  box-shadow: 0 0 0 1px rgba(170, 90, 255, 0.2),
    0 0 25px rgba(140, 70, 255, 0.25);
}

/* title */
.coming-soon-title {
  margin-bottom: 12px;
  font-size: 22px;
  font-weight: 700;
  color: #ff5a5a; /* đỏ giống ảnh */
  text-shadow: 0 0 10px rgba(255, 90, 90, 0.6);
}

/* mô tả */
.coming-soon-desc {
  font-size: 14px;
  color: #cfc7ff;
  opacity: 0.9;
}

/* mobile */
@media (max-width: 768px) {
  .coming-soon-card {
    padding: 28px 16px;
  }

  .coming-soon-title {
    font-size: 18px;
  }
}
</style>
