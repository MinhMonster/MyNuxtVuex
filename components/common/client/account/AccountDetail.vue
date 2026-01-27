<template>
  <div v-if="!ready" class="h-400px mb-8">
    <Loading></Loading>
  </div>
  <div v-else>
    <v-row v-if="account?.code">
      <v-col cols="12" sm="12" md="8" lg="8">
        <div class="title mb-2">
          <center>
            <h3>{{ title }} - Mã Số: {{ format_number(account.code) }}</h3>
          </center>
        </div>
        <AccountImage v-if="isMobile" :account="account" />
        <VueSlickCarousel
          v-else-if="accountImages"
          :initialSlide="0"
          :slidesToShow="1"
          :arrows="true"
          :rows="1"
        >
          <div
            v-for="(image, index) in accountImages"
            :key="index"
            :src="image"
          >
            <ViewImage
              :image="image"
              :index="index"
              :images="accountImages"
              class="image-ninja"
              :class="{ full: index === 0 && account.is_full_image }"
            />
          </div>
        </VueSlickCarousel>
        <div v-if="!isMobile" class="text-center text-danger bold mb-5">
          Nhấn vào ảnh để xem dạng phóng to
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4">
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <div v-if="account">
              <div v-if="isMobile" class="text-center text-danger bold">
                <BaseSvg name="next-bottom" />
                Xem thêm ảnh nick chi tiết ở bên dưới
                <BaseSvg name="next-bottom" />
              </div>
              <div class="title mb-3">
                <center>
                  <h3>Thông tin chi tiết</h3>
                </center>
              </div>

              <AccountInfoTable
                :account="account"
                :account-infos="accountInfos"
                :isShow="false"
              />
              <GroupBtnBuyAccount
                :account="account"
                :account-infos="accountInfos"
              />
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="isMobile" cols="12">
        <div class="title">
          <center>Hình Ảnh Của Nick</center>
          <div class="text-center text-danger bold mb-5">
            Nhấn vào ảnh để xem dạng phóng to
          </div>
        </div>
        <v-row>
          <v-col v-for="(image, index) in accountImages" :key="index" cols="12">
            <div class="image-card">
              <ViewImage
                :image="image"
                :index="index"
                :images="accountImages"
                class="image-ninja"
                :class="{ full: index === 0 && account.is_full_image }"
              />
            </div>
          </v-col>
        </v-row>
        <GroupBtnBuyAccount :account="account" :account-infos="accountInfos" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ViewImage from "@/components/global/molecules/media/ViewImage";
import AccountImage from "@/components/common/client/account/AccountImage";
import AccountInfoTable from "@/components/common/client/table/AccountInfoTable.vue";
import GroupBtnBuyAccount from "@/components/pages/client/game/GroupBtnBuyAccount";
import Loading from "@/components/global/molecules/common/Loading";

import clientCrud from "@/mixins/clientCrud";

export default {
  mixins: [clientCrud],
  components: {
    ViewImage,
    Loading,
    AccountInfoTable,
    GroupBtnBuyAccount,
    AccountImage
  },
  props: {
    title: {
      type: String,
      default: "Chi Tiết Nick"
    },
    account: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    accountImages() {
      return (this.account?.images || []).map(this.normalizeImage);
    },
    accountInfos() {
      return this.storeGetter("getTableInfos")(this.account);
    }
  },
  methods: {
    normalizeImage(image) {
      if (!image) return "";
      return image.includes("muabannick.pro")
        ? image
        : `https://muabannick.pro${image}`;
    }
  }
};
</script>
