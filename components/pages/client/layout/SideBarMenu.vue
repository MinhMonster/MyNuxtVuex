<template>
  <client-only>
    <div class="rightbar-content">
      <div class="user-info-wrap">
        <div class="user-info">
          <v-btn icon v-if="!user">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
          <div v-else class="circle">
            <img v-if="user.avatar" :src="user.avatar" />
            <img
              v-else
              :src="`https://graph.facebook.com/${user.uid}/picture?type=normal`"
            />
          </div>
          <div class="member">
            {{ user ? user.name : "Member" }}
          </div>
        </div>
      </div>
      <div class="h-line"></div>
      <div class="member-nav">
        <div class="member-nav-list">
          <div class="member-nav-item">
            <nuxt-link to="/account/history">
              <v-btn icon>
                <v-icon>mdi-history</v-icon>
              </v-btn>
              <span class="member-nav-name">Lịch sử mua Nick</span>
            </nuxt-link>
          </div>
          <div class="member-nav-item">
            <v-btn icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
            <span class="member-nav-name">Lịch sử Nạp Tiền</span>
          </div>
          <div class="member-nav-item">
            <nuxt-link to="/account/history/change_money">
              <v-btn icon>
                <v-icon>mdi-history</v-icon>
              </v-btn>
              <span class="member-nav-name">Biến động Số dư</span>
            </nuxt-link>
          </div>
          <div class="member-nav-item">
            <v-btn icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
            <span class="member-nav-name">Lịch sử đặt cược</span>
          </div>
          <div class="member-nav-item">
            <v-btn icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
            <span class="member-nav-name">Lịch sử đặt cược</span>
          </div>
        </div>
        <div class="h-line"></div>
        <div v-if="token" class="sign-out">
          <v-btn class="bg-danger" @click="logoutUser()">
            <v-icon>mdi-power</v-icon> Đăng xuất
          </v-btn>
        </div>
      </div>
    </div>
  </client-only>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");
import FormValidator from "@/components/pages/admin/Shared/form/FormValidator";

export default {
  layout: "clientLayout",
  components: { FormValidator },
  computed: {
    ...mapState(["token", "user"]),
  },
  mounted() {},
  methods: {
    ...mapActions(["logout"]),
    async logoutUser() {
      await this.logout();
      this.$router.push("/login");
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
  // padding-top: 0.62rem;
  // background: url(https://www.gnbet.org/m/bk.9713599e.png) no-repeat;
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
  font-weight: 700;
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
</style>