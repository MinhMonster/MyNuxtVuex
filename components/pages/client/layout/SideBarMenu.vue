<template>
  <client-only>
    <div class="rightbar-content">
      <div class="user-info-wrap">
        <div class="user-info">
          <v-btn icon v-if="!user && !token">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
          <div v-else-if="user && token" class="circle">
            <img v-if="user.avatar" :src="user.avatar" />
            <img
              v-else
              :src="`https://graph.facebook.com/${user.uid}/picture?type=normal`"
            />
          </div>
          <div class="member">
            <div v-if="!user" class="mt-4">
              <div class="flex justify-center">
                <div class="login-btn cursor-pointer" @click="nextLogin()">
                  <span>Đăng nhập</span>
                </div>
                <div
                  class="register-btn cursor-pointer"
                  @click="nextRegister()"
                >
                  <span>Đăng ký</span>
                </div>
              </div>

              <ButtonLoginFacebook />
            </div>
            <template v-else>
              {{ user.name }}
              <p class="text-main">
                Số dư:
                <span class="text-blue bold">
                  {{ format_number(user.cash) }}
                  <sup class="text-sup">vnđ</sup></span
                >
              </p>
            </template>
          </div>
        </div>
      </div>
      <template>
        <template> </template>
        <div class="h-line"></div>
        <div class="member-nav">
          <div class="member-nav-list">
            <template v-if="token && user">
              <div class="member-nav-item">
                <nuxt-link to="/account/profile">
                  <v-btn icon>
                    <v-icon>mdi-account</v-icon>
                  </v-btn>
                  <span class="member-nav-name">Thông tin Cá nhân</span>
                </nuxt-link>
              </div>
              <div class="h-line"></div>

              <div class="member-nav-item">
                <nuxt-link to="/account/wallet/deposit/card">
                  <v-btn icon>
                    <v-icon>mdi-card</v-icon>
                  </v-btn>
                  <span class="member-nav-name">Nạp Thẻ Cào</span>
                </nuxt-link>
              </div>
              <div class="member-nav-item">
                <nuxt-link to="/account/wallet/deposit/vnd">
                  <v-btn icon>
                    <v-icon>mdi-bank</v-icon>
                  </v-btn>
                  <span class="member-nav-name">Nạp Ví, ATM-MOMO</span>
                </nuxt-link>
              </div>
              <div class="h-line"></div>

              <div class="member-nav-item">
                <nuxt-link to="/account/history">
                  <v-btn icon>
                    <v-icon>mdi-history</v-icon>
                  </v-btn>
                  <span class="member-nav-name">Lịch sử mua Nick</span>
                </nuxt-link>
              </div>
              <div class="member-nav-item">
                <nuxt-link to="/account/history/change_money">
                  <v-btn icon>
                    <v-icon>mdi-history</v-icon>
                  </v-btn>
                  <span class="member-nav-name">Biến động Số dư</span>
                </nuxt-link>
              </div>
              <div class="h-line mt-4"></div>
            </template>
            <template>
              <div class="member-nav-item">
                <nuxt-link to="/dieu-khoan-va-chinh-sach">
                  <v-btn icon>
                    <v-icon>mdi-book-open-variant</v-icon>
                  </v-btn>
                  <span class="member-nav-name">Điều khoản và Chính sách</span>
                </nuxt-link>
              </div>
            </template>
            <template v-if="token && user && user.admin">
              <div class="h-line"></div>
              <div class="member-nav-item">
                <a href="/admin/login">
                  <v-btn icon>
                    <v-icon>mdi-cog-outline</v-icon>
                  </v-btn>
                  <span class="member-nav-name">Quản lý: Admin</span>
                </a>
              </div>
            </template>
          </div>
          <template v-if="token && user">
            <div class="h-line mb-2"></div>
            <div class="sign-out">
              <v-btn class="bg-danger" @click="logoutUser()">
                <v-icon>mdi-power</v-icon> Đăng xuất
              </v-btn>
            </div>
          </template>
        </div>
      </template>
    </div>
  </client-only>
</template>
<script>
import mixins from "@/mixins/index";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");
import FormValidator from "@/components/pages/admin/Shared/form/FormValidator";
import ButtonLoginFacebook from "@/components/common/client/button/ButtonLoginFacebook";

export default {
  mixins: [mixins],

  layout: "clientLayout",
  components: { FormValidator, ButtonLoginFacebook },
  computed: {
    ...mapState(["token", "user"]),
  },
  mounted() {},
  methods: {
    ...mapActions(["logout", "fetchUser", "loginFb"]),
    async logoutUser() {
      await this.logout();
      this.$router.push("/login");
    },
    nextLogin() {
      this.$router.push("/login");
      this.$emit("close");
    },
    nextRegister() {
      this.$router.push("/register");
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped>
.rightbar-content {
  margin-top: 0px;
}
.rightbar-content .user-info-wrap {
  top: 0px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 200px;
  border: 2px solid #561d00;
  background: #e28637;
  background-size: 100% 100%;

  .user-info {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button.v-btn .v-btn__content i.v-icon,
    .v-btn--icon.v-size--default {
      height: 70px;
      width: 70px;
      font-size: 70px;
    }
    img {
      height: 80px;
      width: 80px;
      border-radius: 50%;
    }
  }
}
.rightbar-content .user-info-wrap .user-info .member {
  font-size: 30px;
  // font-weight: 700;
  color: #fff;
  text-align: center;
}

.rightbar-content .member-nav {
  padding: 0 0.36rem;
}
.rightbar-content .member-nav .h-line {
  width: 100%;
  height: 1px;
  background-color: #561d00;
}
.rightbar-content .member-nav .member-nav-list {
  padding-top: 0.2rem;
}
.rightbar-content .member-nav .member-nav-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding-left: 0.08rem;
}
.rightbar-content .member-nav .member-nav-name {
  margin-left: 0.2rem;
  font-size: 15px;
  color: #fff;
}
.sign-out {
  display: flex;
  justify-content: center;
  padding: 20px;
  .bg-danger {
    color: #ffffff;
    background: #a21d0a !important;
  }
}
.register-btn {
  box-shadow: 0 0.05rem 0.2rem 0 rgb(0 0 0 / 49%);
  border: 1px solid #ffeb00;
  font-weight: 700;
  color: #000;
  /* background-image: linear-gradient(180deg,#fdffdb,#d9e254); */
  background-image: linear-gradient(180deg, #fdffdb, #ffcf9c);
}
.register-btn {
  position: relative;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.235rem;
  border-radius: 0.32rem;
  font-size: 12px;
}
</style>