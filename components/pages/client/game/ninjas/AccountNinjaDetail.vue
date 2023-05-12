
<template>
  <client-only>
    <div v-if="accountNinja">
      <b-row>
        <b-col cols="12" sm="12" md="8" lg="8">
          <div class="title">
            <center>
              <h3>
                Nick Ninja - Mã Số:
                <span
                  ><strong>{{ accountNinja.ID }}</strong></span
                >
              </h3>
            </center>
          </div>
          <VueSlickCarousel
            v-if="accountNinja.hinhanh"
            :initialSlide="0"
            :slidesToShow="1"
            :arrows="true"
            :dots="true"
          >
            <img
              v-for="(image, index) in accountNinja.hinhanh"
              :key="index"
              :src="image"
              alt=""
              class="image-account"
              style="width: 110% !important"
            />
          </VueSlickCarousel>
        </b-col>
        <b-col cols="12" sm="12" md="4" lg="4">
          <b-row>
            <b-col cols="12" sm="12" md="12">
              <AccountNinjaInfo
                :account-ninja="accountNinja"
              ></AccountNinjaInfo>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
  </client-only>
</template>
  
  <script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import mixins from "@/mixins/index";
import AccountNinjaInfo from "@/components/pages/client/game/ninjas/AccountNinjaInfo";
import Loading from "@/components/global/molecules/common/Loading";
export default {
  name: "AccountNinjaList",
  mixins: [mixins],

  components: { AccountNinjaInfo, Loading },
  props: {
    accountNinja: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isShowNext: true,
      isLoading: false,
    };
  },
  async mounted() {
    console.log(this.accountNinja);
  },
  computed: {
    ...mapFields("home/game/ninjas", {
      accountNinjas: "accountNinjas",
    }),
  },
  methods: {
    ...mapActions("home/game/ninjas", ["fetchAccountNinjas"]),
    async onChange() {
      this.isLoading = true;
      await this.setQuery({ page: this.page + 1 });
      await this.fetchAccountNinjas();
      if (this.page >= this.pages) {
        this.isShowNext = false;
        await this.resetQuery();
      }
      this.isLoading = false;
    },
  },
};
</script>
  
  <style lang="scss" scoped>
::v-deep {
  .slick-dots {
    bottom: 10px;
  }
  .slick-slide {
    // border: 1px solid #663019;
    // height: calc(100% - 10px) !important;
    // border-radius: 3px !important;

  }
  .slick-arrow,
  .slick-arrow:hover {
    z-index: 2;
    &.slick-next {
      right: 15px;
    }
    &.slick-prev {
      left: 15px;
    }

    &.slick-next,
    &.slick-prev,
    &.slick-prev::before,
    &.slick-next::before {
      color: #fff;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: radial-gradient(
        circle at 50% 100%,
        #e28637,
        #9f5424 58%,
        #561d00 127%
      );
    }
  }
}
.account {
  margin: -9px;
}
.btn-next-more {
  color: #ffffff;
  background: #a21d0a !important;
  text-align: center;
  margin: 0 auto;
}
.image-account {
  width: 110% !important;
  overflow: hidden;
}
.title {
  color: #1e5b7e;
  margin-bottom: 10px;
}
</style>
