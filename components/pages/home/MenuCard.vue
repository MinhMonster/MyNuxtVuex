<template>
  <nav aria-label="Menu tài khoản nhanh" class="pa-0 py-6">
    <v-row no-gutters justify="center" style="margin: -12px">
      <v-col
        v-for="(item, index) in menuItems"
        :key="index"
        cols="6"
        sm="6"
        md="3"
        class="pa-2"
      >
        <v-card
          dark
          tag="a"
          :href="item.path"
          class="neon-horizontal-card d-flex align-center"
          ripple
          @click.prevent="handleAction(item)"
        >
          <div
            class="icon-section d-flex justify-center align-center"
            aria-hidden="true"
          >
            <v-icon size="28" class="neon-icon">{{ item.icon }}</v-icon>
          </div>

          <div class="text-section ml-3">
            <span class="sub-title text-uppercase">{{ item.category }}</span>
            <h3 class="main-title">{{ item.title }}</h3>
          </div>

          <div class="shimmer-effect"></div>
        </v-card>
      </v-col>
    </v-row>
  </nav>
</template>

<script>
export default {
  computed: {
    menuItems() {
      return [
        {
          title: this.isLogin ? "Tài Khoản" : "Đăng Nhập",
          category: "Thành viên",
          icon: "mdi-account",
          method: "openProfileModal",
        },
        {
          title: "Đã Mua",
          category: "Lịch sử",
          icon: "mdi-history",
          path: "/account/purchases",
        },
        {
          title: "Nạp Tiền",
          category: "Thanh toán",
          icon: "mdi-currency-usd",
          path: "/account/wallet/deposit/bank",
        },
        {
          title: "Nạp Thẻ",
          category: "Giao dịch",
          icon: "mdi-credit-card",
          method: "handleShowSwal",
        },
      ];
    },
  },
  methods: {
    handleAction(action) {
      if (!this.isLogin) {
        this.showModalLoginRegister("login");
      } else if (action.path) {
        this.$router.push(`${action.path}`);
      } else if (action.method) {
        this[action.method]();
      }
    },

    async handleShowSwal() {
      const result = await this.showSwal({
        title: "Bảo trì",
        showDenyButton: false,
        showCancelButton: true,
        html: "Nạp thẻ đang bảo trì!",
        cancelButtonText: "Bỏ qua",
        confirmButtonText: "Nạp tiền",
      });

      if (result?.isConfirmed) {
        this.$router.push("/account/wallet/deposit/bank");
      }
    },
  },
};
</script>

<style  lang="scss" scoped>
.neon-horizontal-card {
  text-decoration: none !important;
  padding: 14px;
  background: linear-gradient(135deg, #0a051a 0%, #120a2e 100%) !important;
  border: 1.5px solid #bd00ff !important;
  border-radius: 12px !important;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 12px rgba(189, 0, 255, 0.45) !important;
  transition: all 0.3s ease;
  cursor: pointer;
  @media (max-width: 768px) {
    border-radius: 6px !important;
    padding: 6px;
  }
}

.neon-horizontal-card:hover {
  transform: translateY(-3px) scale(1.03);
  border-color: #ff00ff !important;
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.6) !important;
  background: #0d001a !important;
}

.icon-section {
  width: 42px;
  height: 42px;
  background: rgba(189, 0, 255, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(189, 0, 255, 0.4);
  box-shadow: inset 0 0 8px rgba(189, 0, 255, 0.3);
  flex-shrink: 0;
  @media (max-width: 768px) {
    border-radius: 6px !important;
    width: 32px;
    height: 32px;
  }
}

.neon-icon {
  color: #ffffff !important;
  filter: drop-shadow(0 0 5px #bd00ff);
}

.text-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sub-title {
  display: block;
  font-size: 0.65rem !important;
  color: #ff70ff;
  font-weight: bold;
  letter-spacing: 1.2px;
}

.main-title {
  display: block;
  font-size: 1.05rem;
  color: #ffffff;
  font-weight: 900;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(189, 0, 255, 0.9);
  margin: 0 !important;
  line-height: 1.2;
}

.shimmer-effect {
  position: absolute;
  top: 0;
  left: -150%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(189, 0, 255, 0.15),
    transparent
  );
  transform: skewX(-20deg);
  animation: sweep 6s infinite;
  pointer-events: none;
}

@keyframes sweep {
  0% {
    left: -150%;
  }
  15% {
    left: 150%;
  }
  100% {
    left: 150%;
  }
}
</style>
