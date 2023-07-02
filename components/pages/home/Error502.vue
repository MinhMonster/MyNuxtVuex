<template>
  <HomePage title="Errors" full-screen goBack goHome :path-go-back="`/`">
    <template #body>
      <div class="text-center mb-5">
        <h1 class="display-2 font-weight-medium">
          5<i class="mdi mdi-lifebuoy mdi-spin text-primary display-2"></i>2
        </h1>
        <h4 class="text-uppercase">
          Xin lỗi! Đã có lỗi xảy ra...<br />
          Hãy kiểm tra lại mạng và tải lại trang. <br />
          Xin cảm ơn!
        </h4>
      </div>

      <div class="row justify-content-center">
        <div>
          <img src="/images/error-img.png" alt class="img-fluid" />
        </div>
      </div>
    </template>
  </HomePage>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";

export default {
  components: {
    HomePage,
  },
};
</script>

<style lang="scss" scoped>
#home-page {
  max-width: 800px !important;
}
</style>