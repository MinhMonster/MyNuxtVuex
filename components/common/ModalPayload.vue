<template>
  <v-dialog
    v-if="dialog"
    v-model="dialog"
    :id="`${isThemeDark ? 'theme-dark' : isThemeRed ? 'theme-red' : 'alb'}`"
    persistent
    scrollable
    :width="width"
    :max-width="maxWidth"
    :content-class="`gaming-modal-container ${classDiglog}`"
  >
    <v-card class="gaming-modal-card">
      <div class="close-handler">
        <BaseSvg
          :disabled="disabledClose"
          class="close-btn-neon"
          color="white"
          id="btn-close-modal-header"
          title="Đóng"
          aria-label="Đóng"
          @click="close()"
          name="close"
        />
      </div>

      <v-card-title class="gaming-modal-header d-flex justify-center">
        <span class="gradient-text">{{ title }}</span>
      </v-card-title>

      <v-card-text
        class="modal-body-gaming"
        :class="classContent"
        :style="{ height: height, maxHeight: maxHeight }"
      >
        <div class="base-dialog">
          <div class="inner-content-wrapper">
            <slot name="content"></slot>
          </div>
        </div>
      </v-card-text>

      <v-card-actions v-if="!hiddenFooter" class="gaming-modal-footer">
        <div class="w-100">
          <div class="flex-columns">
            <slot name="footer-content"></slot>
            <div class="d-flex justify-end gap-10 mt-1">
              <slot name="footer-button"></slot>
              <v-btn
                v-if="isBtnClose"
                :disabled="disabledClose"
                class="btn-close-sharp"
                @click="close()"
              >
                {{ textClose }}
              </v-btn>
            </div>
          </div>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ModalPayload",
  data() {
    return {
      dialog: false,
    };
  },
  props: {
    title: { type: String, default: "" },
    textClose: { type: String, default: "Đóng" },
    size: { type: String, default: "lg" },
    height: { type: String, default: "auto" },
    maxHeight: { type: String, default: "90vh !important" },
    width: { type: String, default: "500px" },
    maxWidth: { type: String, default: "500px" },
    classContent: { type: String, default: "" },
    classDiglog: { type: String, default: "" },
    hiddenFooter: Boolean,
    disabledClose: Boolean,
    isBtnClose: { type: Boolean, default: true },
  },
  methods: {
    show() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$emit("hide");
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .gaming-modal-container {
  box-shadow: #0f0f0f 0px 0px 1px inset, #ac3be4 0px 2px 5px;
  border-radius: 8px !important;
  overflow: visible !important;
}

.gaming-modal-card {
  background-color: #1b1b1c !important;
  border: 1px solid rgba(189, 0, 255, 0.6) !important;
  color: #ffffff;
  overflow: hidden;
}

.gaming-modal-header {
  background: linear-gradient(
    180deg,
    rgba(189, 0, 255, 0.15) 0%,
    rgba(0, 0, 0, 0) 100%
  ) !important;
  border-bottom: 2px solid rgba(189, 0, 255, 0.6) !important; // Đường kẻ chân header rõ nét
  padding: 18px 0 !important;
  position: relative;

  .gradient-text {
    color: #ffffff !important;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 1.15rem;
    text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.8), 0 0 10px rgba(189, 0, 255, 0.8);
  }
}

.close-handler {
  position: absolute;
  right: 12px;
  top: 12px;
  z-index: 20;
}
.close-btn-neon {
  cursor: pointer;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
  transition: transform 0.2s ease;
  &:hover {
    transform: rotate(90deg) scale(1.1);
  }
}

.modal-body-gaming {
  padding: 20px !important;
  background: #1b1b1c !important;

  .inner-content-wrapper {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    overflow: hidden;
  }

  /* Định dạng table: Kết hợp sắc nét và khoảng cách hàng */
  ::v-deep table {
    width: 100%;
    // QUAN TRỌNG: Đổi thành separate để dùng được border-spacing
    border-collapse: separate !important;
    border-spacing: 0 6px !important; // Tạo khoảng cách 6px giữa các hàng

    tr {
      // Vì dùng separate nên không dùng border-bottom cho tr được,
      // ta sẽ đổ nền cho td để tạo cảm giác hàng tách biệt

      background: rgba(255, 255, 255, 0.03);
      transition: transform 0.2s ease;

      &:hover {
        background: rgba(189, 0, 255, 0.08);
        transform: translateX(
          4px
        ); // Hiệu ứng nhích nhẹ khi hover cho sinh động
      }
    }
    th {
      vertical-align: middle;
      // Bo góc và xử lý viền cho cột đầu tiên của hàng
      &:first-child {
        border-radius: 4px 0 0 4px !important;
      }

      // Bo góc cho cột cuối cùng của hàng
      &:last-child {
        border-radius: 0 4px 4px 0 !important;
      }
    }

    td {
      padding: 3px 7px;
      vertical-align: middle;
      font-size: 0.9rem;
      color: #e0e0e0;
      // Thêm border cho từng cell để giữ độ sắc nét khi đứng tách rời
      border-top: 1px solid rgba(255, 255, 255, 0.05) !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;

      // Bo góc và xử lý viền cho cột đầu tiên của hàng
      &:first-child {
        background: rgba(0, 0, 0, 0.2);
        color: #94a3b8;
        font-weight: 600;
        width: 35%;
        border-left: 1px solid rgba(189, 0, 255, 0.3) !important; // Viền tím nhấn ở đầu hàng
        border-radius: 4px 0 0 4px !important;
      }

      // Bo góc cho cột cuối cùng của hàng
      &:last-child {
        text-align: center;
        font-weight: 500;
        border-right: 1px solid rgba(255, 255, 255, 0.05) !important;
        border-radius: 0 4px 4px 0 !important;
      }
    }
  }
}

.gaming-modal-footer {
  background: rgba(0, 0, 0, 0.2) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
  padding: 12px 20px !important;
}

.btn-close-sharp {
  background-color: #ff5252 !important;
  color: white !important;
  font-weight: 700 !important;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 1px;
  border-radius: 4px;
  height: 32px !important;
  box-shadow: 0 0 10px rgba(255, 82, 82, 0.2);
  &:hover {
    background-color: #ff1744 !important;
    box-shadow: 0 0 15px rgba(255, 82, 82, 0.4);
  }
}

.gap-10 {
  gap: 10px;
}
</style>
