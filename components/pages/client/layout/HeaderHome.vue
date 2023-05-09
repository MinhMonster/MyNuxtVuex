<template>
  <client-only>
    <div class="home-header">
      <div class="header-content">
        <div class="header-user">
          <div class="header-logo">
            <nuxt-link to="/">
              <img
                src="https://muabannick.pro/images/logo/lg-muabannick.png"
                alt=""
              />
            </nuxt-link>
          </div>
          <div class="header-nav">
            <div v-if="!token" class="flex">
              <nuxt-link to="/login">
                <div class="login-btn"><span>Đăng nhập</span></div>
              </nuxt-link>
              <nuxt-link to="/register">
                <div class="register-btn"><span>Đăng ký</span></div>
              </nuxt-link>
            </div>
            <div v-else>
              <span class="user-name"> {{ user.name }}</span>
            </div>

            <SideBarHome></SideBarHome>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import SideBarHome from "@/components/pages/client/layout/SideBarHome";
import mixins from "@/mixins/index";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");

export default {
  mixins: [mixins],
  components: {
    SideBarHome,
  },
  props: {},
  computed: {
    ...mapState(["token", "user"]),
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
// ::v-deep {
//   .icon-account.v-btn--icon.v-size--default .v-icon {
//     height: 20px;
//     font-size: 20px;
//     width: 20px;
//   }
// }
.home-header {
  height: 50px;
  flex-shrink: 0;
}
.home-header .header-content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 0.22rem;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  /* background: radial-gradient(
    circle at 50% 100%,
    #7515f7,
    #3d058a 58%,
    #2a0062 127%
  ); */
  background: radial-gradient(
    circle at 50% 100%,
    #e28637,
    #9f5424 58%,
    #561d00 127%
  );
}
.home-header .header-user {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.home-header .header-logo img {
  height: 35px;
}
.home-header img {
  display: block;
}

.home-header .header-nav {
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 700;
}

.home-header .header-user .login-btn,
.home-header .header-user .withdraw-btn {
  font-weight: 500;
  color: #fff;
  margin-right: 0.2rem;
  box-shadow: 0 0.05rem 0.2rem 0 rgb(0 0 0 / 50%);
  /* background-image: linear-gradient(180deg,#8872c7,#6142bf 9%,#271170 58%,#4e23af); */
  background-image: linear-gradient(
    180deg,
    #e28637,
    #9f5424 9%,
    #561d00 58%,
    #9f5424
  );
}
.home-header .header-user .deposit-btn,
.home-header .header-user .register-btn {
  box-shadow: 0 0.05rem 0.2rem 0 rgb(0 0 0 / 49%);
  border: 1px solid #ffeb00;
  font-weight: 700;
  color: #000;
  /* background-image: linear-gradient(180deg,#fdffdb,#d9e254); */
  background-image: linear-gradient(180deg, #fdffdb, #ffcf9c);
}

.home-header .header-user .deposit-btn,
.home-header .header-user .login-btn,
.home-header .header-user .register-btn,
.home-header .header-user .withdraw-btn {
  position: relative;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.235rem;
  border-radius: 0.32rem;
  font-size: 12px;
}
.home-header .header-menu {
  width: 35px;
  height: 35px;
  margin-left: 0px;
}
.home-header .header-menu svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
