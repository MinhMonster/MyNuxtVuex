<template>
  <div class="account-wrap" @click.stop>
    <!-- BUTTON -->
    <div class="account-btn" @click="toggle">
      <v-icon small>mdi-account</v-icon>
      <span>{{ isLogin ? userInfo?.name : "Tài khoản" }}</span>
      <v-icon x-small>
        {{ open ? "mdi-chevron-up" : "mdi-chevron-down" }}
      </v-icon>
    </div>

    <!-- DROPDOWN -->
    <transition name="fade">
      <div v-if="open && !isMobile" class="account-dropdown">
        <!-- CHƯA LOGIN -->
        <template v-if="!isLogin">
          <div class="dropdown-item" @click="nextLoginRegister('login')">
            <v-icon small>mdi-login</v-icon>
            <span>Đăng nhập</span>
          </div>
          <div class="dropdown-item" @click="nextLoginRegister('register')">
            <v-icon small>mdi-account-plus</v-icon>
            <span>Đăng ký</span>
          </div>
        </template>

        <!-- ĐÃ LOGIN -->
        <template v-else>
          <div class="dropdown-item" @click="openProfileModal">
            <v-icon small>mdi-account-circle</v-icon>
            <span>Thông tin tài khoản</span>
          </div>
          <div class="dropdown-item danger" @click="handleLogout">
            <v-icon small>mdi-logout</v-icon>
            <span>Đăng xuất</span>
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "AccountMenu",

  data() {
    return {
      open: false,
    };
  },

  mounted() {
    document.addEventListener("click", this.close);
  },

  beforeDestroy() {
    document.removeEventListener("click", this.close);
  },

  methods: {
    toggle() {
      this.open = !this.open;
      if (this.isMobile || this.open) {
        this.isShowMenuRight = this.open;
      }
    },

    close() {
      this.open = false;
    },
    nextLoginRegister(value) {
      this.showModalLoginRegister(value);
      this.close();
    },
  },
};
</script>
<style scoped>
.account-wrap {
  position: relative;
}

/* ===== BUTTON ===== */
.account-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 10px;

  background: linear-gradient(
    180deg,
    rgba(189, 0, 255, 0.4),
    rgba(189, 0, 255, 0.1)
  );

  border: 1px solid rgba(189, 0, 255, 0.45);
  color: #f5e9ff;

  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s ease;
}

.account-btn:hover {
  box-shadow: 0 0 12px rgba(189, 0, 255, 0.45);
  background: linear-gradient(
    180deg,
    rgba(189, 0, 255, 0.6),
    rgba(189, 0, 255, 0.2)
  );
}

/* ===== DROPDOWN ===== */
.account-dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 10px);
  min-width: 200px;

  background: linear-gradient(180deg, #120016 0%, #08000c 100%);

  border: 1px solid rgba(189, 0, 255, 0.5);
  border-radius: 12px;
  padding: 6px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 18px rgba(189, 0, 255, 0.35);

  z-index: 1000;
}

/* Mũi nhọn */
.account-dropdown::before {
  content: "";
  position: absolute;
  top: -6px;
  right: 18px;
  width: 10px;
  height: 10px;
  background: #120016;
  border-left: 1px solid rgba(189, 0, 255, 0.5);
  border-top: 1px solid rgba(189, 0, 255, 0.5);
  transform: rotate(45deg);
}

/* ===== ITEM ===== */
.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 9px 12px;
  border-radius: 8px;

  font-size: 13px;
  font-weight: 500;
  color: #f1e6ff;
  cursor: pointer;
  transition: 0.2s;
}

.dropdown-item:hover {
  background: rgba(189, 0, 255, 0.18);
}

/* Logout */
.dropdown-item.danger {
  color: #fff;
}

.dropdown-item.danger:hover {
  background: rgba(255, 65, 65, 0.18);
}

/* ===== ANIMATION ===== */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.18s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
