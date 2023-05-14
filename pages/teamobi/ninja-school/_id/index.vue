<template>
  <client-only>
    <div>
      <div id="home-page" class="account-detail">
        <AccountNinjaDetail :account-ninja="accountNinja"></AccountNinjaDetail>
      </div>
      <div id="account-slider">
        <div class="title-category">
          <div data-v-53350ac5="" class="title">
            <center data-v-53350ac5="">
              <h3 data-v-53350ac5="">Danh Sách Nick Gợi Ý</h3>
            </center>
          </div>
        </div>
        <VueSlickCarousel
          v-if="accountNinjas.length"
          :initialSlide="0"
          :slidesToShow="4"
          :arrows="true"
          :dots="false"
          :responsive="responsive"
        >
          <AccountNinjaCardInfo
            v-for="(ninja, index) in accountNinjas"
            :key="index"
            :account-ninja="ninja"
          ></AccountNinjaCardInfo>
        </VueSlickCarousel>
      </div>
      <div id="next-bottom"></div>
    </div>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import AccountNinjaDetail from "@/components/pages/client/game/ninjas/AccountNinjaDetail";
import AccountNinjaCardInfo from "@/components/pages/client/game/ninjas/AccountNinjaCardInfo";

export default {
  layout: "clientLayout",

  components: {
    AccountNinjaDetail,
    AccountNinjaCardInfo,
  },
  data() {
    return {
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  },
  computed: {
    ...mapFields("home/game/ninjas", {
      accountNinja: "accountNinja",
      accountNinjas: "accountNinjas",
    }),
    accountId() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.fetchAccountNinja({
      params: {
        id: this.accountId,
      },
    });
  },
  methods: {
    ...mapActions("home/game/ninjas", ["fetchAccountNinja"]),
  },
};
</script>
<style lang="scss" scoped>
.title-category {
  margin: 0 -6px;
  margin-top: -6px;
  margin-bottom: 6px;
  height: 30px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: radial-gradient(
    circle at 50% 100%,
    #e28637,
    #9f5424 58%,
    #561d00 127%
  );
  .title {
    color: #ffefa3;
  }
}
</style>