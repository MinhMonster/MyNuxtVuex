<template>
  <div class="mb-3">
    <div class="page-body mb-4 mgl--2px mgr--2px">
      <v-row>
        <v-col cols="12" sm="5" md="2">
          <img
            class="w-100"
            src="https://muabannick.pro/images/banners/banner-ninja-school.png"
            alt="Nick Ninja School Online - TeaMobi"
            loading="lazy"
          />
        </v-col>
        <v-col cols="12" sm="7" md="10">
          <div>
            ⭐ Sở hữu <span class="bold text-13-500">Nick Ninja</span> chỉ sau
            30s–5p thanh toán. Tất cả đều có Sim đăng ký.
            <span class="bold pointer text-danger" @click="$refs.modal.show()">
              Xem HD Chuyển Sim
            </span>
          </div>
          <div>
            ⭐ Hỗ trợ <span>trả góp lên đến 1 tháng</span>, tùy giá trị nick.
          </div>
          <div>
            ⭐ Xem
            <nuxt-link
              to="/guides/huong-dan-mua-nick"
              class="bold pointer text-danger"
            >
              Hướng Dẫn Mua Nick
            </nuxt-link>
            để mua nhanh chóng nhé.
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="mx-1">
      <FormSearch
        :type="type"
        @close="isShow = false"
        @search="$emit('search')"
        @reset="$emit('reset')"
      />
      <div v-if="showSearchResultTitle">
        <div class="title text-center text-danger">Kết quả tìm kiếm...</div>
      </div>
      <ModalChangeAccountRegister ref="modal" />
    </div>
  </div>
</template>

<script>
import ninjas_mixins from "@/mixins/ninjas_mixins";
import { mapFields } from "vuex-map-fields";
import FormSearch from "@/components/pages/client/game/ninjas/FormSearch";
import ModalChangeAccountRegister from "@/components/pages/client/game/ModalChangeAccountRegister";

export default {
  mixins: [ninjas_mixins],

  components: {
    FormSearch,
    ModalChangeAccountRegister,
  },
  props: {
    type: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapFields("global", {
      isLoadingSearch: "isLoadingSearch",
    }),

    showSearchResultTitle() {
      const { page, ...query } = this.$route.query;
      return !this.isLoadingSearch && !_.isEmpty(query);
    },
  },
};
</script>
