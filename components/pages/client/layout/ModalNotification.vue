<template>
  <div class="sub-menu-buttom" @click="$refs.modal.show()">
    <ModalPayload ref="modal" :title="`Thông Báo`" size="md" @hide="close">
      <template #content>
        <div class="page-body">
          <div class="thongbao">
            <div v-html="notification"></div>
            <AdminInbox />
          </div>
        </div>
      </template>
      <template #footer-button>
        <v-btn
          size="sm"
          color="warning"
          id="btn-close-notification"
          title="Đóng Thông Báo Trong 2 Giờ"
          class="text-black mgr-5px"
          aria-label="Đóng Thông Báo Trong 2 Giờ"
          @click="setNotification(), $refs.modal.close()"
        >
          <span class="bold">Đóng 2 giờ</span>
        </v-btn>
      </template>
    </ModalPayload>
  </div>
</template>
<script>
import ModalPayload from "@/components/common/ModalPayload";
import AdminInbox from "@/components/common/client/AdminInbox";
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
export default {
  components: {
    ModalPayload,
    AdminInbox,
  },
  computed: {
    ...mapFields("global", {
      isNotification: "isNotification",
    }),
    ...mapFields("home/settings", {
      notification: "notification",
    }),
  },
  mounted() {
    this.show();
  },
  methods: {
    ...mapActions("global", ["setNotification"]),
    ...mapActions("home/settings", ["fetchNotification"]),
    async show() {
      if (this.isNotification) {
        await this.$refs.modal.show();
        await this.fetchNotification();
      } else {
        this.$emit("hide");
      }
    },
    close() {
      this.$emit("hide");
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .v-dialog:not(.v-dialog--fullscreen) {
    height: calc(100vh - 200px) !important;
  }
}
.thongbao {
  p {
    line-height: 35px;
    margin-bottom: 0 !important;
  }
  .change-theme {
    max-width: 260px;
    margin: 10px auto;
  }
}
::v-deep {
  .btn-buy-account-hover {
    padding: 0 !important;
  }
}
</style>
