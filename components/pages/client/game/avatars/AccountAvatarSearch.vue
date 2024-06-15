<template>
  <div class="form-search mb-3">
    <div class="page-body mb-2">
      <div>
        <nuxt-link to="/topics/huong-dan-tai-game-avatar" class="bold text-danger">
          ⭐ Hướng dẫn tải game Avatar trên máy IOS và Phiên bản mod (hack) trên máy Android
        </nuxt-link>

      </div>
      <div>
        ⭐ Tất cả
        <span class="bold text-13-500">Nick Avatar</span> trên Website đều có
        Sim đăng ký. Khi các bạn mua thành công sẽ có hướng dẫn chuyển sim cụ
        thể từng tài khoản.
      </div>
      <div>
        ⭐ Sở hữu <span class="bold text-13-500">Nick Avatar</span> chỉ sau
        30s-5p thanh toán. Cam kết Acc sạch 100% và có xác nhận từ NPH TeaMobi
        gửi về.
      </div>
      <div>
        ⭐ PR: Shop Mua Bán
        <span class="bold text-13-500"><a href="https://shopnick.online/teamobi/avatar" target="_blank"
            title="ShopNick.Online | Shop Nick Avatar DK (2x) của TeaMobi" class="link">Shop Nick Avatar</a> </span>,
        <span class="bold text-13-500">
          <a target="_blank" href="https://shopnick.online/teamobi/ninja-school"
            title="ShopNick.Online | Shop Nick Ninja School của TeaMobi" class="link">Shop Nick Ninja</a>
        </span>
        Uy Tín, Giá Rẻ của Admin Đỗ Minh tại
        <span class="bold text-13-500">
          <a target="_blank" href="https://shopnick.online"
            title="ShopNick.Online | Shop Nick Avatar DK (2x), Ninja School của TeaMobi"
            class="link">ShopNick.Online</a>.
        </span>
      </div>
    </div>
    <div class="page-body">
      <form @submit.prevent="search()">
        <v-row>
          <v-col cols="6" sm="3" md="2">
            <div class="field">
              <input v-model="queryForm.q.username" type="text" placeholder="Tìm tên Nick..."
                class="v-input form-input" />
            </div>
          </v-col>

          <v-col cols="6" sm="3" md="2">
            <div class="field">
              <input v-model="queryForm.q.id" type="number" placeholder="Nhập mã số nick..."
                class="v-input form-input" />
            </div>
          </v-col>
          <v-col cols="6" sm="3" md="2">
            <div class="field v-input form-input">
              <select v-model="queryForm.q.cash" class="">
                <option v-for="(option, index) in cashOptions" :key="index" :value="option.value">
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
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import GroupBtnSearch from "@/components/common/client/button/GroupBtnSearch";

export default {
  components: { GroupBtnSearch },
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
  created() { },

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
