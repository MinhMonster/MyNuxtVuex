<template>
  <client-only>
    <aside class="rightbar-content hide-scrollbar" aria-label="Menu người dùng">
      <div class="close-wrapper">
        <v-btn
          icon
          @click="$emit('close')"
          class="close-btn"
          aria-label="Đóng menu"
        >
          <v-icon color="grey lighten-1">mdi-close</v-icon>
        </v-btn>
      </div>

      <div class="user-header">
        <div class="avatar-container">
          <div class="avatar-glow"></div>
          <v-avatar size="85" class="premium-avatar">
            <v-img
              v-if="user && user.avatar"
              :src="user.avatar"
              alt="Avatar"
            ></v-img>
            <v-icon v-else size="50" color="white">mdi-account</v-icon>
          </v-avatar>
        </div>

        <div class="user-details mt-4 text-center">
          <div v-if="!isLogin" class="auth-group d-flex justify-center">
            <button
              class="btn-neon-purple h-32px w-100px"
              @click="nextLoginRegister('login')"
            >
              <span>Đăng nhập</span>
            </button>
            <button
              class="btn-gaming-unified w-100px h-32px"
              @click="nextLoginRegister('register')"
            >
              <span>Đăng ký</span>
            </button>
          </div>

          <template v-else>
            <h2 class="user-name-display">{{ user.name || "Thành viên" }}</h2>
            <div class="balance-badge mx-auto mt-2">
              <v-icon x-small color="amber lighten-2" class="mr-1"
                >mdi-wallet</v-icon
              >
              <span class="label">Số dư:</span>
              <span class="amount ml-1"
                >{{ format_number(user.cash) }}
                <sup class="currency">đ</sup></span
              >
            </div>
          </template>
        </div>
      </div>

      <div class="nav-divider"></div>

      <nav class="member-nav">
        <v-list nav dense flat class="transparent-list">
          <template v-if="isLogin">
            <v-list-item
              v-for="(item, i) in menuItems"
              :key="i"
              @click="handleAction(item)"
              class="nav-item-glass"
            >
              <v-list-item-icon class="mr-2">
                <v-icon size="22" color="white">{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="white--text font-weight-medium">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
              <v-icon small color="grey darken-2">mdi-chevron-right</v-icon>
            </v-list-item>
          </template>

          <v-list-item
            to="/dieu-khoan-va-chinh-sach"
            class="nav-item-glass mt-2"
          >
            <v-list-item-icon class="mr-2">
              <v-icon size="22" color="white">mdi-shield-check-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text font-weight-medium">
                Điều khoản & Chính sách
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-if="isAdmin"
            to="/admin/game/ninjas"
            class="nav-item-glass admin-highlight mt-2"
          >
            <v-list-item-icon class="mr-2">
              <v-icon size="22" color="amber">mdi-security</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="amber--text font-weight-bold"
                >Quản trị viên</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <div v-if="isLogin" class="logout-section">
          <button class="btn-logout-minimal" @click="logoutUser()">
            <v-icon left size="18" color="#ff5252">mdi-power</v-icon> Đăng xuất
          </button>
        </div>
      </nav>
    </aside>
  </client-only>
</template>

<script>
import { mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";

export default {
  computed: {
    ...mapFields("global", ["isNotification"]),
    // Đã fix: Đưa menu vào đúng computed để v-for có thể đọc được
    menuItems() {
      return [
        {
          title: "Thông tin cá nhân",
          icon: "mdi-account-circle-outline",
          method: "openProfileModal",
        },
        {
          title: "Nạp tiền tài khoản",
          icon: "mdi-plus-circle-outline",
          path: "/account/wallet/deposits/bank",
        },
        {
          title: "Lịch sử mua Nick",
          icon: "mdi-cart-outline",
          path: "/account/purchases",
        },
        {
          title: "Biến động số dư",
          icon: "mdi-history",
          path: "/account/wallet/transactions",
        },
      ];
    },
  },
  methods: {
    ...mapActions("home/users", ["logout"]),
    async logoutUser() {
      await this.logout();
    },
    nextLoginRegister(value) {
      if (this.isMobile) this.$emit("close");
      this.showModalLoginRegister(value);
    },
    handleAction(action) {
      if (action.path) {
        this.$router.push(`${action.path}`);
      } else if (action.method) {
        this[action.method]();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.rightbar-content {
  background-color: #0d0a16;
  height: 100vh;
  width: 100%;
  color: #fff;
  position: relative;
  overflow-y: auto;
  background-image: radial-gradient(
      circle at top left,
      rgba(189, 0, 255, 0.05),
      transparent 40%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(189, 0, 255, 0.08),
      transparent 40%
    );
}

.close-wrapper {
  display: flex;
  justify-content: flex-end;
  padding: 12px;
}

.user-header {
  padding: 10px 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .avatar-container {
    position: relative;
    .avatar-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 110%;
      height: 110%;
      background: rgba(189, 0, 255, 0.15);
      filter: blur(20px);
      border-radius: 50%;
    }
    .premium-avatar {
      border: 2px solid rgba(255, 255, 255, 0.1);
      background: #1a1528;
    }
  }

  .user-name-display {
    font-size: 1.25rem;
    font-weight: 700;
    color: #ffffff;
  }

  .balance-badge {
    display: inline-flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    padding: 6px 14px;
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    .label {
      color: #aaa;
      font-size: 0.8rem;
    }
    .amount {
      color: #00ffcc;
      font-weight: bold;
    }
  }
}

/* Nút Đăng nhập / Đăng ký nổi bật */
.auth-group {
  gap: 12px;
}

.nav-divider {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.08),
    transparent
  );
  margin: 0 24px 16px;
}

/* Tối ưu khoảng cách Icon và Text */
.member-nav {
  padding: 0 16px;

  .nav-item-glass {
    min-height: 48px !important;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 10px !important;
    margin-bottom: 8px;
    padding: 0 12px !important; /* Thu nhỏ padding ngang */

    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }
  }
}

/* Ghi đè CSS của Vuetify để Icon sát Text */
::v-deep .v-list-item__icon {
  margin-top: 12px !important;
}

.logout-section {
  padding: 30px 0;
  display: flex;
  justify-content: center;
  .btn-logout-minimal {
    background: transparent;
    color: #ff5252;
    border: 1px solid rgba(255, 82, 82, 0.2);
    padding: 6px 24px;
    border-radius: 20px;
    font-size: 0.85rem;
    &:hover {
      background: rgba(255, 82, 82, 0.05);
      border-color: #ff5252;
    }
  }
}
</style>
