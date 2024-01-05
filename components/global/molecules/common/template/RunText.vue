<template>
  <v-row style="max-width: 1156px; margin: 0 auto">
    <v-col cols="12" class="run-text">
      <marquee>
        <div>
          <span class="bold text-italic text-13-700">
            <nuxt-link to="/admin-information" class="text-success">
              <span class="text-danger">*</span> Giảm 20% tất cả Nick Trên Shop
              đến hết 11/01/2024
            </nuxt-link>
          </span>
          <span class="bold text-italic text-13-700 text-danger">
            <nuxt-link to="/account/wallet/deposit/card">
              - AE nhanh tay lựa chọn Nick Ngon bổ rẻ về chơi Sự kiện nhé.
              Thanks!
            </nuxt-link>
          </span>
        </div>
      </marquee>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
@media (max-width: 768px) {
  .run-text {
    margin-top: -12px;
    padding: 0px;
  }
}
</style>