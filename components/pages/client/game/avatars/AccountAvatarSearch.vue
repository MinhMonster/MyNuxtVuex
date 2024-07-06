<template>
  <div class="form-search mb-3">
    <div class="page-body mb-2">
      <v-row>
        <v-col cols="12" sm="5" md="2">
          <div class="banner-avatar w-100">
            <img
              class="w-100"
              src="https://muabannick.pro/images/banners/banner-avatar-500x-277.jpg"
              alt="Nick Avatar Diệu Kỳ (2x) - TeaMobi"
            />
          </div>
        </v-col>
        <v-col cols="12" sm="7" md="10" >
          <div class="pd-10px">
            <div>
              ⭐ Group mới
              <template v-if="!isMobile"
                >, mọi người tham gia giao lưu, trao đổi kinh nghiệm
                nhé</template
              >:
              <span class="bold text-13-500"
                ><a
                  href="https://www.facebook.com/groups/avatar.dieuky.teamobi"
                  target="_blank"
                  title="Avatar Diệu Kỳ (2x) - TeaMobi"
                  class="link"
                  >Avatar Diệu Kỳ (2x) - TeaMobi</a
                >
              </span>
            </div>
            <div>
              <nuxt-link
                to="/topics/huong-dan-tai-game-avatar"
                class="bold text-danger"
              >
                ⭐ Hướng dẫn tải game Avatar, Mod (Hack)
                <template v-if="!isMobile"
                  >cho Android, Java và IOS. AE Xem hướng dẫn chi tiết nhé. Có
                  sẵn Phiên bản chăm farm.</template
                >
              </nuxt-link>
            </div>
            <div>
              ⭐ Sở hữu <span class="bold text-13-500">Nick Avatar</span> chỉ
              sau 30s-5p thanh toán. Tất cả đều có Sim đăng ký.
              <span class="bold pointer text-danger" @click="$refs.modal.show()"
                >Xem HD Chuyển Sim</span
              >
            </div>
            <div>
              ⭐ PR: Shop Mua Bán
              <span class="bold text-13-500"
                ><a
                  href="https://shopnick.online/teamobi/avatar"
                  target="_blank"
                  title="ShopNick.Online | Shop Nick Avatar DK (2x) của TeaMobi"
                  class="link"
                  >Nick Avatar</a
                > </span
              >,
              <span class="bold text-13-500">
                <a
                  target="_blank"
                  href="https://shopnick.online/teamobi/ninja-school"
                  title="ShopNick.Online | Shop Nick Ninja School của TeaMobi"
                  class="link"
                  >Nick Ninja</a
                >
              </span>
              Uy Tín của Admin Đỗ Minh tại
              <span class="bold text-13-500">
                <a
                  target="_blank"
                  href="https://shopnick.online"
                  title="ShopNick.Online | Shop Nick Avatar DK (2x), Ninja School của TeaMobi"
                  class="link"
                  >ShopNick.Online</a
                >.
              </span>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="page-body">
      <form @submit.prevent="search()">
        <v-row>
          <v-col cols="6" sm="3" md="2">
            <div class="field">
              <input
                v-model="queryForm.q.username"
                type="text"
                placeholder="Tìm tên Nick..."
                class="v-input form-input"
              />
            </div>
          </v-col>

          <v-col cols="6" sm="3" md="2">
            <div class="field">
              <input
                v-model="queryForm.q.id"
                type="number"
                placeholder="Nhập mã số nick..."
                class="v-input form-input"
              />
            </div>
          </v-col>
          <v-col cols="6" sm="3" md="2">
            <div class="field v-input form-input">
              <select v-model="queryForm.q.cash" class="">
                <option
                  v-for="(option, index) in cashOptions"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </div>
          </v-col>
          <GroupBtnSearch @search="search" @reset="reset" />
        </v-row>
      </form>
    </div>
    <v-col v-if="isQuery && !isLoadingSearch" cols="12">
      <div class="title text-center text-danger">Kết quả tìm kiếm...</div>
    </v-col>
    <ModalChangeAccountRegister ref="modal" />
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import GroupBtnSearch from "@/components/common/client/button/GroupBtnSearch";
import ModalChangeAccountRegister from "@/components/pages/client/game/ModalChangeAccountRegister";

export default {
  components: { GroupBtnSearch, ModalChangeAccountRegister },
  data() {
    return {
      cashOptions: [
        {
          text: "Chon Giá Tiền",
          value: null,
        },
        {
          text: "Dưới 100k",
          value: {
            min: 0,
            max: 100000,
          },
        },
        {
          text: "Giá 100k đến 300k",
          value: {
            min: 100000,
            max: 300000,
          },
        },
        {
          text: "Giá 300k đến 500k",
          value: {
            min: 300000,
            max: 500000,
          },
        },
        {
          text: "Giá 500k đến 1 Triệu",
          value: {
            min: 500000,
            max: 1000000,
          },
        },
        {
          text: "Giá 1Tr đến 3 Triệu",
          value: {
            min: 1000000,
            max: 3000000,
          },
        },
        {
          text: "Giá trên 3 Triệu",
          value: {
            min: 3000000,
          },
        },
      ],
    };
  },
  computed: {
    ...mapFields("home/game/avatars", {
      query: "query",
    }),
    ...mapFields("global", {
      isLoadingSearch: "isLoadingSearch",
    }),
    queryForm() {
      return _.cloneDeep(this.query);
    },
    isQuery() {
      return (
        this.queryForm.q.username ||
        this.queryForm.q.id ||
        this.queryForm.q.cash
      );
    },
  },
  methods: {
    ...mapActions("home/game/avatars", ["resetQuery", "setQuery"]),
    search() {
      this.setQueryForm();
      this.$emit("search");
    },
    async reset() {
      this.resetQuery();
      this.search();
    },
    setQueryForm() {
      this.queryForm.page = 1;
      this.setQuery(this.queryForm);
    },
  },
};
</script>
