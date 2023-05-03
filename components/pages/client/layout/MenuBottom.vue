<template>
  <div id="menu">
    <nuxt-link to="/"
      ><div class="footer_icon service">
        <v-btn icon class="icon-menu">
          <v-icon>mdi-shield-crown-outline</v-icon>
        </v-btn>
      </div>
      <span>Admin</span>
    </nuxt-link>
    <nuxt-link to="/"
      ><div class="footer_icon deposit">
        <v-btn icon class="icon-menu">
          <v-icon>mdi-bank</v-icon>
        </v-btn>
      </div>
      <span>Nạp tiền</span>
    </nuxt-link>
    <nuxt-link class="on" to="/"
      ><div class="footer_icon home">
        <div class="circle-menu">
          <div class="icon-wrap">
            <v-btn icon>
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
      <span>Trang chủ</span>
    </nuxt-link>
    <nuxt-link to="/"
      ><div class="footer_icon service">
        <v-btn icon class="icon-menu">
          <v-icon>mdi-history</v-icon>
        </v-btn>
      </div>
      <span>Lịch sử</span>
    </nuxt-link>
    <nuxt-link to="/"
      ><div class="footer_icon member">
        <v-btn icon class="icon-menu">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </div>
      <span>Thành viên</span>
    </nuxt-link>
  </div>
</template>

<script>
import mixins from "@/mixins/index";

export default {
  mixins: [mixins],

  props: {},
  computed: {},
  methods: {},
};
</script>
<style scoped>
#menu {
  width: 100%;
  bottom: 0;
  position: fixed;
  z-index: 10;
  display: flex;
  justify-content: space-evenly;
  /* height: 1.2rem; */
  height: 70px;
  /* background: linear-gradient(180deg, #3f058d, #30046b 12%, #200347); */
  background: linear-gradient(180deg, #e28637, #9f5424 12%, #561d00);
}

#menu a,
#menu a .footer_icon {
  display: flex;
  align-items: center;
}

#menu a {
  flex-direction: column;
  /* width: 1.1rem; */
  width: 20%;
  padding-top: 0.16rem;
  font-size: 24px;
  color: #ffcf9c;
  text-align: center;
}

#menu a .footer_icon {
  position: relative;
  width: 0.46rem;
  height: 0.46rem;
  justify-content: center;
}

#menu a,
#menu a .footer_icon {
  display: flex;
  align-items: center;
}

#menu a.on {
  color: #ffefa3;
}

#menu a .footer_icon button.icon-menu {
  margin-top: 20px;
  color: #ffcf9c;
}

icon-wrap #menu a.on .footer_icon svg {
  fill: #fefc7f;
}
#menu a .footer_icon svg {
  display: block;
  width: 100%;
  height: 100%;
  fill: #9891b2;
}

.am-icon {
  fill: currentColor;
  background-size: cover;
  width: 0.44rem;
  height: 0.44rem;
}
#menu .circle-menu .icon-wrap svg {
  width: 0.48rem;
  height: 0.42rem;
}

#menu a span {
  width: 100%;
  overflow: hidden;
  margin-top: 22px;
  font-size: 13px;
  font-weight: 500;
}

#menu .circle-menu {
  position: absolute;
  left: -21px;
  top: -20px;
  width: 50px;
  height: 50px;
  padding: 10px;
  border-radius: 50%;
  background-color: #9f5424;
}

#menu .circle-menu .icon-wrap {
  margin-top: -5px;
  margin-left: -5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  /* background: radial-gradient(circle at 50% 15%, #8a6ede, #2f215a 72%); */
  background: radial-gradient(circle at 50% 15%, #e28637, #9f5424 72%);
}

#menu .mdi.mdi-home {
  color: #ffefa3;
}

svg:not(:root) {
  overflow: hidden;
}
</style>