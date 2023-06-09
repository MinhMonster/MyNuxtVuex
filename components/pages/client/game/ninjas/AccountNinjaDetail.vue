
<template>
  <client-only>
    <b-row v-if="accountNinja.ID">
      <b-col cols="12" sm="12" md="8" lg="8">
        <div class="title">
          <center>
            <h3>
              Nick Ninja - Mã Số:
              <span
                ><strong>{{ format_number(accountNinja.ID) }}</strong></span
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
          />
        </VueSlickCarousel>
      </b-col>
      <b-col cols="12" sm="12" md="4" lg="4">
        <b-row>
          <b-col cols="12" sm="12" md="12">
            <AccountNinjaInfo :account-ninja="accountNinja"></AccountNinjaInfo>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </client-only>
</template>
  
  <script>
import mixins from "@/mixins/index";
import AccountNinjaInfo from "@/components/pages/client/game/ninjas/AccountNinjaInfo";
export default {
  name: "AccountNinjaList",
  mixins: [mixins],

  components: { AccountNinjaInfo },
  props: {
    accountNinja: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
    };
  },
  async mounted() {
  },
  computed: {
  },
  methods: {
  },
};
</script>
  
  <style lang="scss" scoped>
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
  width: 112% !important;
  overflow: hidden;
  margin-left: -6px;
}
.title {
  color: #1e5b7e;
  margin-bottom: 10px;
}
</style>
