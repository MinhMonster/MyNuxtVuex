<template>
  <div class="sub-menu-buttom" @click="$refs.modal.show()">
    <ModalPayload ref="modal" :title="`HD Chuyển Sim Đăng Ký`" size="md">
      <template #content>
        <div class="page-body">
          <div class="text-center text-uppercase bold">Lấy mã số chuyển sim</div>
          - Dùng sim đăng ký soạn:<br />
          <img src="/icon/icon-next-right.gif" />
          <span class="bold text-danger">GO SIMCU TK MK</span> gửi
          <span class="bold text-danger">+6020</span> <br />
          - Sau khi gửi tin nhắn lấy mã số chuyển sim hệ thống sẽ gửi về hướng
          dẫn chuyển sim, ta sẽ làm theo hướng dẫn.<br /><br />

          <div class="text-center text-uppercase bold">Chuyển sim đăng ký</div>
          - Dùng sim Đăng ký mới soạn: <br />
          <img src="/icon/icon-next-right.gif" />
          <span class="bold text-danger">GO SIMMOI TK XXXX</span> gửi
          <span class="bold text-danger">+6020</span> <br />
          - Sau khi gửi tin nhắn chuyển sim hệ thống sẽ gửi về thông báo chuyển sim thành công nếu như bạn thao tác đúng và mã chuyển sim còn hạn sử dụng.<br /><br />

          + <span class="bold text-danger">XXXX</span> là mã PIN 4 số mà hệ
          thống gửi về. <br />
          + Mã <span class="bold text-danger">XXXX</span> có thời hạn sử dụng
          trong 48h.<br />
          + Phải dùng đúng sim đăng ký mới lấy dược mã số chuyển sim đăng ký.
          <br />
          + <span class="bold text-danger">SIMCU</span> và
          <span class="bold text-danger">SIMMOI</span> là chữ không phải sđt
          nhiều bạn nhầm...^_^<br />
          + Phí gửi đến +6020 là 1.000đ tài khoản gốc.
        </div>
      </template>
    </ModalPayload>
  </div>
</template>
<script>
import ModalPayload from "@/components/common/ModalPayload.vue";
export default {
  components: {
    ModalPayload,
  },
  methods: {
    show() {
      this.$refs.modal.show();
    },
  },
};
</script>
<style lang="scss" scoped></style>
