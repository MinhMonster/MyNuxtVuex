<template>
  <div class="rightbar-content">
    <div class="user-info-wrap">
      <div class="user-info">
        <v-btn icon>
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
        <div class="member">Member</div>
      </div>
    </div>
    <div class="h-line"></div>

    <div class="member-nav">
      <div class="member-nav-list">
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
        <div class="member-nav-item">
          <v-btn icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
          <span class="member-nav-name">Lịch sử đặt cược</span>
        </div>
      </div>
      <div class="h-line"></div>
    </div>
  </div>
</template>
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
    text-align: center;
    margin-top: 40px;

    button.v-btn .v-btn__content i.v-icon {
      height: 70px;
      width: 70px;
      font-size: 70px;
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
</style>