
<template>
  <client-only>
    <b-row v-if="accountAvatar.ID">
      <b-col cols="12" sm="12" md="6" lg="8">
        <div class="title">
          <center>
            <h3>
              Nick Avatar - Mã Số:
              <span
                ><strong>{{ format_number(accountAvatar.ID) }}</strong></span
              >
            </h3>
          </center>
        </div>
        <AccountAvatarTL
          v-if="isMobile || accountAvatar.full"
          :account-avatar="accountAvatar"
        />
        <VueSlickCarousel
          v-else-if="accountAvatar.images"
          :initialSlide="0"
          :slidesToShow="1"
          :arrows="true"
          :dots="true"
        >
          <div
            v-for="(image, index) in accountAvatar.images"
            :key="index"
            :src="image"
            alt=""
          >
            <img
              v-if="image.includes('muabannick.pro')"
              :src="image"
              alt=""
              class="image-account"
            />
            <img
              v-else
              :src="`https://muabannick.pro${image}`"
              alt=""
              class="image-account"
            />
          </div>
        </VueSlickCarousel>
      </b-col>
      <b-col cols="12" sm="12" md="6" lg="4">
        <b-row>
          <b-col cols="12" sm="12" md="12">
            <AccountAvatarInfo
              :account-avatar="accountAvatar"
            ></AccountAvatarInfo>
          </b-col>
        </b-row>
      </b-col>
      <b-col v-if="isMobile" cols="12">
        <div class="title">
          <center>Hình Ảnh Của Nick Avatar</center>
        </div>
        <b-row>
          <b-col cols="12" sm="12" md="6" lg="4">
            <div class="fileItemWrapper">
              <img
                v-if="accountAvatar.images[0].includes('muabannick.pro')"
                :src="accountAvatar.images[0]"
                alt=""
                class="image-ninja"
                :class="{ full: accountAvatar.full }"
              />
              <img
                v-else
                :src="`https://muabannick.pro${accountAvatar.images[0]}`"
                alt=""
                class="image-ninja"
                :class="{ full: accountAvatar.full }"
              />
            </div>
          </b-col>
          <b-col
            v-for="(image, index) in images"
            :key="index"
            cols="12"
            sm="12"
            md="6"
            lg="4"
          >
            <div class="fileItemWrapper">
              <img
                v-if="image.includes('muabannick.pro')"
                :src="image"
                alt=""
                class="image-ninja"
              />
              <img
                v-else
                :src="`https://muabannick.pro${image}`"
                alt=""
                class="image-ninja"
              />
            </div>
          </b-col>
        </b-row>
        <GroupBtnBuyAccount :account="accountAvatar" account-type="Avatar" />
      </b-col>
    </b-row>
  </client-only>
</template>
  
  <script>
import mixins from "@/mixins/index";
import AccountAvatarInfo from "@/components/pages/client/game/avatars/AccountAvatarInfo";
import AccountAvatarTL from "@/components/pages/client/game/avatars/AccountAvatarTL";
import GroupBtnBuyAccount from "@/components/pages/client/game/GroupBtnBuyAccount";

export default {
  mixins: [mixins],

  components: { AccountAvatarInfo, AccountAvatarTL, GroupBtnBuyAccount },
  props: {
    accountAvatar: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  async mounted() {
    this.$nextTick(function () {
      this.onResize();
    });
    window.addEventListener("resize", this.onResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  computed: {
    images() {
      const images = this.accountAvatar.images.filter((image, index) => {
        return index != 0;
      });
      return images;
    },
  },
  methods: {},
};
</script>
  
  <style lang="scss" scoped>
::v-deep {
  .fileItemWrapper img.full {
    height: 100%;
  }
}
.fileItemWrapper {
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
    width: 120%;
    margin-left: -10%;
    height: 100%;
    &.full {
      width: 100%;
      margin-left: 0px;
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
  width: 120% !important;
  overflow: hidden;
  margin-left: 0%;
}
.title {
  color: #1e5b7e;
  margin-bottom: 10px;
}
</style>
