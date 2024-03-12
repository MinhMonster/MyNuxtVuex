<template>
  <div class="sub-menu-buttom" @click="$refs.modal.show()">
    <div class="footer_icon Member">
      <BaseSvg
        id="btn-admin"
        class="icon-menu"
        title="Hỗ trợ"
        aria-label="Hỗ trợ"
        name="support"
      />
    </div>
    <span class="title-menu-buttom">Hỗ trợ</span>
    <ModalPayload ref="modal" :title="`Thông tin Admin`" size="md" hiddenFooter>
      <template #content>
        <div class="page-body">
          <div class="page-body no-border">
            <AdminInformations />
          </div>
          <div class="page-body no-border">
            <AccountNumbeAdmin />
          </div>
          <GroupBtnInbox />
        </div>
      </template>
    </ModalPayload>
  </div>
</template>
<script>
import ModalPayload from "@/components/common/ModalPayload";
import AccountNumbeAdmin from "@/components/common/AccountNumbeAdmin";
import AdminInformations from "@/components/common/AdminInformations";
import GroupBtnInbox from "@/components/common/client/button/GroupBtnInbox";
export default {
  components: {
    ModalPayload,
    AccountNumbeAdmin,
    AdminInformations,
    GroupBtnInbox,
  },
};
</script>
