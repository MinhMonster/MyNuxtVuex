<template>
  <p class="text-center bold mt-3 text-16-700 mb-0">
    <a href="https://messenger.com/t/minh.docong.7" target="_blank">
      <span class="flex-center">
        <BaseSvg
          name="facebook"
          id="btn-facebook"
          title="Facebook Admin"
          aria-label="Facebook Admin"
          class="bg-svg-white"
        />
        <span class="mgt-1px">Admin: Đỗ Minh</span>
      </span>
    </a>
    -
    <a href="https://zalo.me/0961646828" target="_blank"
      ><span class="text-primary"
        ><BaseSvg
          name="zalo"
          id="btn-zalo"
          title="Zalo Admin"
          aria-label="Zalo Admin"
          class="bg-svg-white"
        />
        Admin: Đỗ Minh</span
      ></a
    >
  </p>
</template> 
<style lang="scss" scoped>
.bg-svg-white {
  background: #fff;
  height: 18px;
  width: 18px;
  // margin-left: 1px;
  margin-top: 0px;
  border-radius: 3px;
}
::v-deep {
  .base-svg svg {
    filter: none !important;
    box-shadow: none;
  }
}
</style>
