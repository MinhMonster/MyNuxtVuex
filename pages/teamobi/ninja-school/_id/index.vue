<template>
  <client-only>
    <div id="home-page">
      <div v-if="accountNinja.ID" >
        <div class="page-body">
          <AccountNinjaDetail
            :account-ninja="accountNinja"
          ></AccountNinjaDetail>
        </div>
        <div id="account-slider">
          <div class="title-category">
            <div data-v-53350ac5="" class="title">
              <center data-v-53350ac5="">
                <h3 data-v-53350ac5="">Danh Sách Nick Gợi Ý</h3>
              </center>
            </div>
          </div>
          <AccountNinjaList></AccountNinjaList>
          <!-- <div v-if="!screenMobile">
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
        <div v-else>
          <b-row class="text-center account">
            <AccountNinjaCard
              v-for="(ninja, index) in accountNinjas"
              :key="index"
              :account-ninja="ninja"
            ></AccountNinjaCard>
          </b-row>
        </div> -->
        </div>
      </div>

      <div id="next-bottom"></div>
    </div>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import AccountNinjaDetail from "@/components/pages/client/game/ninjas/AccountNinjaDetail";
// import AccountNinjaCard from "@/components/pages/client/game/ninjas/AccountNinjaCard";

// import AccountNinjaCardInfo from "@/components/pages/client/game/ninjas/AccountNinjaCardInfo";
import AccountNinjaList from "@/components/pages/client/game/ninjas/AccountNinjaList";

export default {
  layout: "clientLayout",

  components: {
    AccountNinjaDetail,
    // AccountNinjaCard,
    // AccountNinjaCardInfo,
    AccountNinjaList,
  },
  data() {
    return {
      // responsive: [
      //   {
      //     breakpoint: 1264,
      //     settings: {
      //       slidesToShow: 3,
      //       slidesToScroll: 3,
      //       infinite: true,
      //       dots: true,
      //     },
      //   },
      //   {
      //     breakpoint: 960,
      //     settings: {
      //       slidesToShow: 2,
      //       slidesToScroll: 2,
      //       initialSlide: 2,
      //     },
      //   },
      //   {
      //     breakpoint: 480,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1,
      //     },
      //   },
      // ],
    };
  },
  computed: {
    ...mapFields("global", {
      screenMobile: "screenMobile",
    }),
    ...mapFields("home/game/ninjas", {
      accountNinja: "accountNinja",
      accountNinjas: "accountNinjas",
    }),
    accountId() {
      return this.$route.params.id;
    },
  },
  async mounted() {
    await this.fetchAccountNinja({
      params: {
        id: this.accountId,
      },
    });
    await this.nextTop();

    await this.resetQuery();
    await this.resetAccountNinjas();
    await this.setQuery({
      perPage: 8,
      q: {
        giatien: this.accountNinja.giatien,
      },
    });
    await this.fetchAccountNinjas();
  },
  methods: {
    ...mapActions("home/game/ninjas", [
      "fetchAccountNinja",
      "resetQuery",
      "setQuery",
      "resetAccountNinjas",
      "fetchAccountNinjas",
    ]),
    nextTop() {
      const element = document.getElementById("home-page");
      element.scrollIntoView();
    },
  },
};
</script>
<style lang="scss" scoped>
.title-category {
  margin: 0 -12px;
  margin-top: -12px;
  margin-bottom: 12px;
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