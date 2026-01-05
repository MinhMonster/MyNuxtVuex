<template>
  <client-only>
    <v-row v-if="account">
      <v-col cols="12" sm="12" md="8" lg="8">
        <div class="title">
          <center>
            <h3>
              Nick Ninja - Mã Số:
              <span
                ><strong>{{ format_number(account.code) }}</strong></span
              >
            </h3>
          </center>
        </div>
        <AccountNinjaTL v-if="isMobile" :account-ninja="account" />
        <VueSlickCarousel
          v-else-if="account.images"
          :initialSlide="0"
          :slidesToShow="1"
          :arrows="true"
          :rows="1"
        >
          <!-- <AccountNinjaTL
            v-if="!accountNinja.full"
            :account-ninja="accountNinja"
          /> -->
          <div
            v-for="(image, index) in account.images"
            :key="index"
            :src="image"
            alt=""
          >
            <ViewImage
              v-if="image.includes('muabannick.pro')"
              :image="image"
              :index="index"
              :images="account.images"
              class="image-ninja"
              :class="{ full: index == 0 && account.is_full_image }"
            />
            <ViewImage
              v-else
              :image="`https://muabannick.pro${image}`"
              :index="index"
              :images="account.images"
              class="image-ninja"
              :class="{ full: index == 0 && account.is_full_image }"
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
            <AccountDetailCard
              :account="account"
              :account-infos="accountInfos"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="isMobile" cols="12">
        <div class="title">
          <center>Hình Ảnh Của Nick Ninja</center>
          <div class="text-center text-danger bold mb-5">
            Nhấn vào ảnh để xem dạng phóng to
          </div>
        </div>
        <v-row>
          <v-col
            v-for="(image, index) in account.images"
            :key="index"
            cols="12"
            sm="12"
            md="6"
            lg="4"
          >
            <div class="image-card">
              <ViewImage
                v-if="image.includes('muabannick.pro')"
                :image="image"
                :index="index"
                :images="account.images"
                class="image-ninja"
                :class="{ full: index == 0 && account.is_full_image }"
              />
              <ViewImage
                v-else
                :image="`https://muabannick.pro${image}`"
                :index="index"
                :images="account.images"
                class="image-ninja"
                :class="{ full: index == 0 && account.is_full_image }"
              />
            </div>
          </v-col>
        </v-row>
        <GroupBtnBuyAccount :account="account" :account-infos="accountInfos" />
      </v-col>
    </v-row>
  </client-only>
</template>

<script>
import ViewImage from "@/components/global/molecules/media/ViewImage";
import AccountDetailCard from "@/components/common/client/account/AccountDetailCard";
import AccountNinjaTL from "@/components/pages/client/game/ninjas/AccountNinjaTL";
import GroupBtnBuyAccount from "@/components/pages/client/game/GroupBtnBuyAccount";

export default {
  components: {
    ViewImage,
    AccountDetailCard,
    AccountNinjaTL,
    GroupBtnBuyAccount,
  },
  props: {
    account: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    accountInfos() {
      return [
        {
          label: "Lớp",
          value: this.classNinja(this.account.class),
        },
        {
          label: "Cấp độ",
          value: this.account.level,
        },

        {
          label: "Máy chủ",
          value: this.serverNinja(this.account.server),
        },
        {
          label: "Gia tộc",
          value: this.account.is_family || false ? "Có" : "Không",
        },
        {
          label: "Mô tả",
          value: this.account.description,
          html: true,
        },
      ];
    },
  },
};
</script>
