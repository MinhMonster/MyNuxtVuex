<template>
  <client-only>
    <v-row v-if="accountNinja.ID">
      <v-col cols="12" sm="12" md="8" lg="8">
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
        <AccountNinjaTL v-if="isMobile" :account-ninja="accountNinja" />
        <VueSlickCarousel
          v-else-if="accountNinja.hinhanh"
          :initialSlide="0"
          :slidesToShow="1"
          :arrows="true"
          :rows="1"
          :dots="true"
        >
          <!-- <AccountNinjaTL
            v-if="!accountNinja.full"
            :account-ninja="accountNinja"
          /> -->
          <div
            v-for="(image, index) in accountNinja.hinhanh"
            :key="index"
            :src="image"
            alt=""
          >
            <img
              v-if="image.includes('muabannick.pro')"
              :src="image"
              alt=""
              class="image-account"
              :class="{ full: index == 0 && accountNinja.full }"
            />
            <img
              v-else
              :src="`https://muabannick.pro${image}`"
              alt=""
              class="image-account"
              :class="{ full: index == 0 && accountNinja.full }"
            />
          </div>
        </VueSlickCarousel>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4">
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <AccountNinjaInfo :account-ninja="accountNinja"></AccountNinjaInfo>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="isMobile" cols="12">
        <div class="title">
          <center>Hình Ảnh Của Nick Ninja</center>
        </div>
        <v-row>
          <v-col
            v-for="(image, index) in accountNinja.hinhanh"
            :key="index"
            cols="12"
            sm="12"
            md="6"
            lg="4"
          >
            <div class="image-card">
              <img
                v-if="image.includes('muabannick.pro')"
                :src="image"
                alt=""
                class="image-ninja"
                :class="{ full: index == 0 && accountNinja.full }"
              />
              <img
                v-else
                :src="`https://muabannick.pro${image}`"
                alt=""
                class="image-ninja"
                :class="{ full: index == 0 && accountNinja.full }"
              />
            </div>
          </v-col>
        </v-row>
        <GroupBtnBuyAccount
          :account="accountNinja"
          account-type="Ninja School Online"
        />
      </v-col>
    </v-row>
  </client-only>
</template>

<script>
import AccountNinjaInfo from "@/components/pages/client/game/ninjas/AccountNinjaInfo";
import AccountNinjaTL from "@/components/pages/client/game/ninjas/AccountNinjaTL";
import GroupBtnBuyAccount from "@/components/pages/client/game/GroupBtnBuyAccount";

export default {
  components: { AccountNinjaInfo, AccountNinjaTL, GroupBtnBuyAccount },
  props: {
    accountNinja: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .slick-slide {
    overflow: hidden !important;
    .image-card {
      width: 101.5% !important;
      img {
        // width: 112% !important;
        margin-left: 0px;
        &.full {
          width: 101.5% !important;
        }
      }
    }
  }
}

.image-card {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  // height: 100%;
  overflow: hidden;
  // border-radius: 5px;

  img {
    width: 100%;
    // max-height: 200px;
    &.full {
      width: 100% !important;
    }
  }
}
.image-account {
  width: 100% !important;
  overflow: hidden;
  margin-left: 0px;
  &.full {
    width: 100% !important;
  }
}
.title {
  color: #1e5b7e;
  margin-bottom: 10px;
}
</style>
