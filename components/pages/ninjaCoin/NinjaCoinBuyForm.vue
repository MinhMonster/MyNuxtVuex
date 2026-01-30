<template>
  <div>
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
            <form-validator name="character_name">
              <label class="form-label"
                >Tên nhân vật
                <small>(<span style="color: red">*</span>)</small></label
              >
              <input
                v-model="card.character_name"
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
            <v-btn
              size="sm"
              class="btn-neon-purple w-100"
              @click="buyOffline()"
            >
              <span>Mua Offline </span>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="field submit mt-6">
            <v-btn size="sm" class="btn-neon-purple w-100" @click="submit()">
              <Loading v-if="isLoading" button></Loading>
              <span v-else>Thanh toán </span>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </form>
    <ModalBuyXuOffline
      ref="modalBuyOffline"
      :history="card"
      :selected="selected"
      :price="priceSelected"
    />
  </div>
</template>

<script>
import Loading from "@/components/global/molecules/common/Loading";
import FormValidator from "@/components/global/form/FormValidator";
import ModalBuyXuOffline from "@/components/pages/services/ModalBuyXuOffline";
import BaseInputCash from "@/components/base/BaseInputCash";
import { serverOptions } from "@/utils/queryNinjaOptions";

import { mapFields } from "vuex-map-fields";

const defaultCard = () => ({
  server: null,
  character_name: null,
  amount: "",
});

export default {
  components: { Loading, FormValidator, ModalBuyXuOffline, BaseInputCash },
  data() {
    return {
      serverOptions,
      card: defaultCard(),
      history: {},
      selected: {},
      amountSelected: {},
      amountSelected: {},
      priceSelected: 0,
      isLoading: false,
      xuReceived: "Bạn chưa nhập số tiền",
    };
  },
  computed: {
    ...mapFields("client/ninjaCoins", {
      ninjaCoinPrices: "ninjaCoinPrices",
    }),
  },
  methods: {
    buyOffline() {
      if (!this.checkValid()) {
        return;
      }
      this.$refs.modalBuyOffline.show();
    },
    checkValid() {
      const validCharacterName =
        /^(?:[a-zA-Z0-9]{1,10}|[a-zA-Z0-9]{1,10}_[a-z]{2,3})$/.test(
          this.card.character_name
        );
      const validations = [
        { condition: !this.card.server, message: "Bạn chưa chọn Server" },
        {
          condition: !this.card.character_name,
          message: "Bạn chưa nhập Tên nhân vật",
        },
        {
          condition: this.card.character_name && !validCharacterName,
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
      try {
        const res = await this.$repositories.clientNinjaCoins.buyXuNinja(
          this.card
        );
        this.isLoading = false;
        const history = res.data.response;
        this.resetInput();
        this.$emit("submit", history);
      } catch (e) {
      } finally {
        this.isLoading = false;
      }
    },
    resetInput() {
      this.card = defaultCard();
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
      this.amountSelected = this.ninjaCoinPrices.find(
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
  },
};
</script>

