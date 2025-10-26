<template>
  <client-only>
    <HomePage
      :title="title"
      :loading="!ready"
      goBack
      reload
      @reload="reload()"
      table
    >
      <template v-if="ready" #body>
        <form class="form">
          <div
            style="
              background-color: #fff3cd;
              border: 1px solid #ffeeba;
              padding: 10px 5px;
              border-radius: 6px;
              color: #856404;
              font-size: 14px;
            "
          >
            ⚠️ <b>Lưu ý quan trọng:</b><br />
            - <b>Admin tạm ngừng bán xu tự động</b>.<br />
            - Các bạn Thanh toán xong vui lòng liên hệ <b>Admin</b> kèm
            <b>Bill chuyển khoản</b> hoặc <b>GD Mua xu</b> để nhận xu.
          </div>
          <v-row>
            <v-col cols="12" sm="6" class="middle">
              <div class="field">
                <form-validator name="server">
                  <label for="server" class="form-label"
                    >Server
                    <small>(<span style="color: red">*</span>)</small></label
                  >
                  <select v-model="card.server" @change="onServerChange">
                    <option
                      v-for="(option, index) in serverOptions"
                      :key="index"
                      :value="option.value"
                    >
                      {{ option.text }}
                    </option>
                  </select>
                </form-validator>
              </div>
            </v-col>
            <v-col cols="12" sm="6" class="middle">
              <div class="field">
                <form-validator name="ingame">
                  <label class="form-label"
                    >Tên nhân vật
                    <small>(<span style="color: red">*</span>)</small></label
                  >
                  <input
                    v-model="card.ingame"
                    type="text"
                    placeholder="Nhập tên nhân vật nhận xu..."
                    class="v-input form-input"
                    @keyup.enter="submit()"
                  />
                </form-validator>
              </div>
            </v-col>
            <v-col cols="12" sm="6" class="middle">
              <div class="field">
                <form-validator name="amount">
                  <label for="amount" class="form-label"
                    >Số tiền
                    <small>(<span style="color: red">*</span>)</small></label
                  >
                  <BaseInputCash
                    v-model="card.amount"
                    placeholder="Nhập số tiền cần mua..."
                    @change="setMoneyOut"
                    class="v-input form-input"
                  />
                </form-validator>
              </div>
            </v-col>

            <v-col cols="12" sm="6" class="middle custom-field-input mb-2">
              <div class="field">
                <form-validator name="out">
                  <label for="out" class="form-label">Số xu sẽ nhận</label>
                  <input
                    :value="xuReceived"
                    disabled
                    type="text"
                    placeholder=" "
                    class="v-input form-input"
                  />
                </form-validator>
              </div>
            </v-col>

            <v-col cols="6">
              <div class="field submit mt-6">
                <v-btn size="sm" class="btn-login" @click="buyOffline()">
                  <span>Mua Offline </span>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="6">
              <div class="field submit mt-6">
                <v-btn size="sm" class="btn-login" @click="submit()">
                  <Loading v-if="isLoading" button></Loading>
                  <span v-else>Thanh toán </span>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </form>
      </template>

      <template #table>
        <XuPriceTable :cards="xuNinjaPrices" />
        <ModalBuyXuOffline
          ref="modalBuyOffline"
          :history="card"
          :selected="selected"
          :price="priceSelected"
          @submit="submit()"
        />
        <!-- histories -->
        <template v-if="isLogin">
          <HistoryBuyXuNinjaTable
            :histories="histories"
            @show="showModalDetail"
          />

          <ModalHistoryBuyXuNinja ref="modalDetail" :history="history" />
          <Pagination
            v-if="historyMeta && historyMeta.pages > 1"
            :meta="historyMeta"
            @change="onPageChange"
          >
          </Pagination>
        </template>
      </template>
    </HomePage>
  </client-only>
</template>


<script>
import Loading from "@/components/global/molecules/common/Loading";
import XuPriceTable from "@/components/pages/services/XuPriceTable";
import HomePage from "@/components/pages/home/HomePage";
import FormValidator from "@/components/global/form/FormValidator";
import BaseInputCash from "@/components/base/BaseInputCash";
import ModalBuyXuOffline from "@/components/pages/services/ModalBuyXuOffline";
import HistoryBuyXuNinjaTable from "@/components/pages/services/HistoryBuyXuNinjaTable";
import ModalHistoryBuyXuNinja from "@/components/pages/services/ModalHistoryBuyXuNinja";
import Pagination from "@/components/global/molecules/common/Pagination";
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import ninjas_mixins from "@/mixins/ninjas_mixins";

export default {
  mixins: [ninjas_mixins],
  layout: "clientLayout",
  components: {
    HomePage,
    Loading,
    XuPriceTable,
    FormValidator,
    BaseInputCash,
    ModalBuyXuOffline,
    HistoryBuyXuNinjaTable,
    ModalHistoryBuyXuNinja,
    Pagination,
  },
  watch: {
    isLogin: {
      async handler(newValue, oldValue) {
        this.reload();
      },
    },
  },
  data() {
    return {
      title: "Mua Bán Xu Ninja School",
      card: {
        server: null,
        ingame: null,
        amount: "",
      },
      history: {},
      selected: {},
      amountSelected: {},
      amountSelected: {},
      priceSelected: 0,
      isLoading: false,
      xuReceived: "Bạn chưa nhập số tiền",
      // serverOptions: [
      //   {
      //     text: "Bokken",
      //     value: 1,
      //   },
      //   {
      //     text: "Shuriken",
      //     value: 2,
      //   },
      //   {
      //     text: "Tessen",
      //     value: 3,
      //   },
      //   {
      //     text: "Kunai",
      //     value: 4,
      //   },
      //   {
      //     text: "Katana",
      //     value: 5,
      //   },
      //   {
      //     text: "Tone",
      //     value: 6,
      //   },
      //   {
      //     text: "Sanzu",
      //     value: 7,
      //   },
      //   {
      //     text: "Sensha",
      //     value: 8,
      //   },
      //   {
      //     text: "Fukiya",
      //     value: 9,
      //   },
      //   {
      //     text: "Tekkan",
      //     value: 10,
      //   },
      //   {
      //     text: "Daisho",
      //     value: 11,
      //   },
      // ],
      // amounts: [
      //   {
      //     server: 1,
      //     name: "Sv1",
      //     amount_10000: 85,
      //     amount_50000: 90,
      //     amount_200000: 91,
      //     amount_500000: 92,
      //     amount_1000000: 93,
      //   },
      //   {
      //     server: 2,
      //     name: "Sv23",
      //     amount_10000: 85,
      //     amount_50000: 90,
      //     amount_200000: 91,
      //     amount_500000: 92,
      //     amount_1000000: 93,
      //   },
      //   {
      //     server: 4,
      //     name: "Sv4",
      //     amount_10000: 85,
      //     amount_50000: 90,
      //     amount_200000: 91,
      //     amount_500000: 92,
      //     amount_1000000: 93,
      //   },
      //   {
      //     server: 5,
      //     name: "Sv5",
      //     amount_10000: 85,
      //     amount_50000: 90,
      //     amount_200000: 91,
      //     amount_500000: 92,
      //     amount_1000000: 93,
      //   },
      //   {
      //     server: 6,
      //     name: "Sv679",
      //     amount_10000: 85,
      //     amount_50000: 90,
      //     amount_200000: 91,
      //     amount_500000: 92,
      //     amount_1000000: 93,
      //   },
      // ],
    };
  },
  computed: {
    ...mapFields("global", { ready: "ready" }),
    ...mapFields("home/game/ninjas", { xuNinjaPrices: "xuNinjaPrices" }),
    ...mapFields("home/users", {
      histories: "historyBuyXuNinjas",
      historyMeta: "historyMeta",
      pageSave: "pageSave",
    }),
  },
  mounted() {
    this.reload();
  },
  methods: {
    ...mapActions("home/users", ["fetchUser", "buyXuNinja", "fetchHistoryBuyXuNinjas", "setQuery"]),
    ...mapActions("home/game/ninjas", [
      "fetchXuNinjaPrices",
    ]),
    async reload() {
      this.fetchXuNinjaPrices();
      if (this.isLogin) {
        this.onPageChange(this.pageSave);
      } else {
        this.ready = false;
        setTimeout(() => {
          this.ready = true;
        }, 500);
      }
    },
    buyOffline() {
      if (!this.checkValid()) {
        return;
      }
      this.$refs.modalBuyOffline.show();
    },
    checkValid() {
      console.log(this.card, this.card.amount);

      const validIngame =
        /^(?:[a-zA-Z0-9]{1,10}|[a-zA-Z0-9]{1,10}_[a-zA-Z0-9]{2})$/.test(
          this.card.ingame
        );
      const validations = [
        { condition: !this.card.server, message: "Bạn chưa chọn Server" },
        {
          condition: !this.card.ingame,
          message: "Bạn chưa nhập Tên nhân vật",
        },
        {
          condition: this.card.ingame && !validIngame,
          message: "Tên nhân vật nhận xu không hợp lệ!",
        },
        { condition: !this.card.amount, message: "Bạn chưa nhập số tiền" },
        {
          condition: this.card.amount < 10000,
          message: "Số tiền phải lớn hơn 10.000đ",
        },
        {
          condition: this.card.amount > 10000000,
          message: "Số tiền phải nhỏ hơn 10.000.000đ",
        },
      ];

      const invalid = validations.find((v) => v.condition);
      if (invalid) {
        this.showSwal({
          // title: "Có lỗi xảy ra!",
          html: invalid.message,
          icon: "error",
        });
        return false;
      } else {
        return true;
      }
    },
    async submit() {
      if (!this.isLogin) {
        this.showModalLoginRegister("login");
        return;
      }
      if (!this.checkValid()) {
        return;
      }
      this.isLoading = true;
      const res = await this.buyXuNinja({
        input: this.card,
      });
      this.isLoading = false;
      const history = res.data.data;
      if (history) {
        await this.showModalDetail(history);
        await this.resetInput();
        await this.setQuery({ page: 1 });
        await this.fetchHistoryBuyXuNinjas();
        this.fetchUser();
      }
    },
    showModalDetail(history) {
      this.history = history;
      setTimeout(() => {
        this.$refs.modalDetail.show();
      }, 200);
    },
    resetInput() {
      this.card = {
        server: null,
        ingame: null,
        amount: "",
      };
      this.xuReceived = "Bạn chưa nhập số tiền";
    },
    setMoneyOut() {
      if (!this.card.amount) {
        this.xuReceived = "Bạn chưa nhập số tiền";
      } else if (!this.card.server) {
        this.xuReceived = "Bạn chưa chọn Server";
      } else if (this.card.amount < 10000) {
        this.xuReceived = "Số tiền phải lớn hơn 10.000đ";
      } else if (this.card.amount > 10000000) {
        this.xuReceived = "Số tiền phải nhỏ hơn 10.000.000đ";
      } else {
        this.getPriceByAmount(this.amountSelected, this.card.amount);
        this.xuReceived =
          "x" +
          this.priceSelected +
          " = " +
          this.format_number(this.card.amount * this.priceSelected) +
          " Xu";
      }
    },
    onServerChange(event) {
      // 1️⃣ Giá trị được chọn (option.value)
      const selectedValue = event.target.value;

      // 2️⃣ Tìm thông tin option tương ứng
      this.amountSelected = this.xuNinjaPrices.find(
        (opt) => opt.server == selectedValue
      );
      this.setMoneyOut();
      // 3️⃣ Lưu lại hoặc xử lý logic
    },
    getPriceByAmount(serverOption, amount) {
      // 1️⃣ Lấy tất cả các khóa có dạng "amount_xxx"
      const keys = Object.keys(serverOption).filter((k) =>
        k.startsWith("amount_")
      );

      // 2️⃣ Chuyển thành mảng các { threshold, price }
      const prices = keys.map((k) => ({
        threshold: Number(k.replace("amount_", "")),
        price: serverOption[k],
      }));

      // 3️⃣ Sắp xếp tăng dần theo threshold
      prices.sort((a, b) => a.threshold - b.threshold);

      // 4️⃣ Tìm mức thấp nhất mà <= amount nhập vào
      let result = prices[0].price;
      for (const p of prices) {
        if (amount >= p.threshold) {
          result = p.price;
        } else {
          break;
        }
      }

      this.priceSelected = result;
      return;
    },

    async onPageChange(page) {
      this.ready = false;
      await this.setQuery({ page });
      await this.fetchHistoryBuyXuNinjas();
      page == 1 || !page
        ? this.$router.push(`/services/mua-ban-xu-ninja-school`)
        : this.$router.push(`/services/mua-ban-xu-ninja-school?page=${page}`);
      setTimeout(() => {
        this.ready = true;
      }, 400);
    },
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.title },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.title },
      ],
    };
  },
};
</script>
