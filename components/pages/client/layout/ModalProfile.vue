<template>
  <ModalPayload
    ref="modal"
    :title="`Thông tin Thành viên`"
    size="md"
    hiddenFooter
    @hide="isShowProfileModal = false"
  >
    <template #content>
      <div class="page-body">
        <table class="table text-center">
          <tbody>
            <tr>
              <th class="info-nick" style="width: 30%">ID</th>
              <td class="mua-nick">
                <span
                  ><strong>{{ format_number(userInfo.id) }}</strong></span
                >
              </td>
            </tr>
            <tr>
              <th class="info-nick" style="width: 30%">Tên</th>
              <td class="mua-nick">
                <span
                  ><strong>{{ userInfo.name }}</strong></span
                >
              </td>
            </tr>
            <tr>
              <th class="info-nick" style="width: 30%">Mật khẩu</th>
              <td class="mua-nick">
                <span><strong>*********</strong></span>
              </td>
            </tr>

            <tr>
              <th class="info-nick" style="">Số dư</th>
              <td class="mua-nick">
                <span
                  ><strong>{{ format_number(userInfo.cash) }} VNĐ</strong></span
                >
              </td>
            </tr>

            <tr>
              <th class="info-nick" style="">Số điện thoại</th>
              <td class="mua-nick">
                <span
                  ><strong
                    ><strong>{{ userInfo.phone }}</strong></strong
                  ></span
                >
              </td>
            </tr>

            <tr>
              <th class="info-nick" style="">Email</th>
              <td class="mua-nick break-all">
                <span
                  ><strong
                    ><strong>{{ userInfo.email }}</strong></strong
                  ></span
                >
              </td>
            </tr>
            <tr>
              <th class="info-nick" style="">Cấp bậc</th>
              <td class="mua-nick">
                <span
                  ><strong
                    ><strong>{{
                      userInfo.admin ? "Admin" : "Thành Viên"
                    }}</strong></strong
                  ></span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </ModalPayload>
</template>
<script>
import ModalPayload from "@/components/common/ModalPayload";

export default {
  name: "ModalProfile",
  components: {
    ModalPayload,
  },
  watch: {
    isShowProfileModal: {
      async handler(newValue, oldValue) {
        if (this.isShowProfileModal) {
          this.$refs.modal.show();
          this.getProfile();
        } else {
          this.$refs.modal.close();
        }
      },
    },
  },
};
</script>

