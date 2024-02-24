<template>
  <div>
    <v-row class="text-center account">
      <AccountNinjaCard
        v-for="(ninja, index) in accountNinjas"
        :key="index"
        :account-ninja="ninja"
      ></AccountNinjaCard>
    </v-row>
    <div v-if="isLoading" class="center mgt--50px mgb--50px">
      <Loading></Loading>
    </div>
    <div v-if="!accountNinjas.length" class="account-empty mt-4">
      <h1 class="text-center bold text-danger">
        Không tìm thấy Tài khoản nào!
      </h1>
    </div>
    <div class="btn-next-more">
      <BaseSvg
        v-if="isShowNext && accountNinjas.length && !isLoading"
        button
        name="skip"
        :content="` Xem Thêm Nick Ninja ${
          type == 'cheap' ? 'Giá Rẻ' : type ?? ''
        }`"
        variant="danger"
        class="flex mt-3 mb-1"
        @click="onChange()"
      />
    </div>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import AccountNinjaCard from "@/components/pages/client/game/ninjas/AccountNinjaCard";
import Loading from "@/components/global/molecules/common/Loading";
export default {
  components: { AccountNinjaCard, Loading },
  props: {
    type: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapFields("home/game/ninjas", {
      accountNinjas: "accountNinjas",
      page: "query.page",
      pages: "metaNinjas.pages",
    }),
    isShowNext() {
      return this.page < this.pages;
    },
  },
  methods: {
    ...mapActions("home/game/ninjas", [
      "fetchAccountNinjas",
      "setQuery",
      "resetQuery",
      "resetAccountNinjas",
    ]),
    async onChange() {
      this.isLoading = true;
      await this.setQuery({ page: this.page + 1 });
      await this.fetchAccountNinjas();
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.account {
  margin: -9px;
}
.btn-next-more {
  color: #ffffff;
  text-align: center;
  margin: 0 auto;
  button {
    background: #a21d0a !important;
  }
}
</style>
