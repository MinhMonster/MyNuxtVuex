<template>
  <client-only>
    <div class="rightbar-content scroll-y">
      <div class="user-info-wrap">
        <div class="user-info">
          <BaseSvg
            class="avatar circle"
            name="avatar"
            id="btn-avatar"
            title="Ảnh đại diện"
            aria-label="Ảnh đại diện"
          />

          <!-- <div v-else-if="user && token" class="circle">
            <img v-if="user.avatar" :src="user.avatar" />
            <img
              v-else
              :src="`https://graph.facebook.com/${user.uid}/picture?type=normal`"
            />
          </div> -->
          <div class="member">
            <div v-if="!user" class="mt-4">
              <div class="flex justify-center">
                <div
                  class="login-btn cursor-pointer mr-1"
                  @click="nextLoginRegister('login')"
                >
                  <span>Đăng nhập</span>
                </div>
                <div
                  class="register-btn cursor-pointer"
                  @click="nextLoginRegister('register')"
                >
                  <span>Đăng ký</span>
                </div>
              </div>

              <!-- <ButtonLoginFacebook /> -->
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
                  <BaseSvg name="user-card" />
                  <span class="member-nav-name">Thông tin Cá nhân</span>
                </nuxt-link>
              </div>
              <div class="h-line"></div>

              <div class="member-nav-item">
                <nuxt-link to="/account/wallet/deposit/card">
                  <BaseSvg name="card" />
                  <span class="member-nav-name">Nạp Thẻ Cào</span>
                </nuxt-link>
              </div>
              <div class="member-nav-item">
                <nuxt-link to="/account/wallet/deposit/vnd">
                  <BaseSvg name="bank" />
                  <span class="member-nav-name">Nạp Ví, ATM-MOMO</span>
                </nuxt-link>
              </div>
              <div class="h-line"></div>

              <div class="member-nav-item">
                <nuxt-link to="/account/history">
                  <BaseSvg name="history" />
                  <span class="member-nav-name">Lịch sử mua Nick</span>
                </nuxt-link>
              </div>
              <div class="member-nav-item">
                <nuxt-link to="/account/history/change_money">
                  <BaseSvg name="history" />
                  <span class="member-nav-name">Biến động Số dư</span>
                </nuxt-link>
              </div>
              <div class="h-line mt-4"></div>
            </template>
            <template>
              <div class="member-nav-item">
                <nuxt-link to="/dieu-khoan-va-chinh-sach">
                  <BaseSvg
                    name="book"
                    id="btn-book"
                    title="Điều khoản và Chính sách"
                    aria-label="Điều khoản và Chính sách"
                  />
                  <span class="member-nav-name">Điều khoản và Chính sách</span>
                </nuxt-link>
              </div>
            </template>
            <template v-if="token && user && user.admin">
              <div class="h-line"></div>
              <div class="member-nav-item">
                <nuxt-link to="/admin/game/ninjas">
                  <BaseSvg name="setting" />
                  <span class="member-nav-name">Quản lý: Admin</span>
                </nuxt-link>
              </div>
              <div>
                <span class="base-dialog-name text-main bold d-flex">
                  <span class="mr-1"> <BaseSvg name="bell-ring" /> </span
                  ><v-switch
                    :value="isNotification"
                    color="main"
                    hide-details
                    @click="setNotification(!isNotification)"
                  ></v-switch>
                  <span v-if="!isNotification" class="text-14-400"
                    >(Đã tắt trong 2 giờ)</span
                  ></span
                ><i class="menu-active"></i>
              </div>
            </template>
          </div>
          <template v-if="token && user">
            <div class="h-line mb-2"></div>
            <div class="sign-out">
              <BaseSvg
                name="power"
                button
                variant="danger"
                class="bg-danger text-not-shadow"
                content=" Đăng xuất"
                @click="logoutUser()"
              />
            </div>
          </template>
        </div>
      </template>
    </div>
  </client-only>
</template>

<script>
import { mapState, mapActions } from "vuex";

import { mapFields } from "vuex-map-fields";

// import ButtonLoginFacebook from "@/components/common/client/button/ButtonLoginFacebook";

export default {
  // components: { ButtonLoginFacebook },
  computed: {
    ...mapState("home/users", ["token", "user"]),
    ...mapFields("global", {
      isNotification: "isNotification",
    }),
  },
  methods: {
    ...mapActions("home/users", ["logout", "fetchUser", "loginFb"]),
    ...mapActions("global", ["setNotification", "getNotification"]),
    async logoutUser() {
      await this.logout();
    },
    nextLoginRegister(value) {
      if (this.isMobile) {
        this.$emit("close");
      }
      this.showModalLoginRegister(value);
    },
  },
};
</script>

<style lang="scss" scoped>
.rightbar-content .user-info-wrap {
  top: 0px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 200px;
  background: #e28637;
  background-size: 100% 100%;

  .base-svg {
    svg {
      height: 70px;
      width: 70px;
    }
  }

  .user-info {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button.v-btn .v-btn__content,
    .v-btn--icon.v-size--default {
      height: 70px !important;
      width: 70px !important;
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
  font-size: 20px;
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
