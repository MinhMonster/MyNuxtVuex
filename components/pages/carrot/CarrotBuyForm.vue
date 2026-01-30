<template>
  <div>
    <form class="form" @submit.prevent="submit()">
      <div
        style="
          background-color: #fff3cd;
          border: 1px solid #ffeeba;
          padding: 12px 15px;
          border-radius: 6px;
          color: #856404;
          font-size: 14px;
        "
      >
        ⚠️ <b>Lưu ý quan trọng:</b><br />
        - <b>Tài khoản game</b> là <b>Tài khoản dùng để Đăng nhập game</b> chứ
        không phải <b>Tên nhân vật</b>.<br />
        - Vui lòng kiểm tra kỹ <b>Server</b> và <b>Tài khoản game</b> trước khi
        nạp.<br />
        - Nếu sai <b>Server</b> hoặc <b>Tài khoản game</b>, Admin sẽ
        <u>không hỗ trợ Hoàn tiền hoặc Nạp lại</u>.
      </div>
      <v-row>
        <v-col cols="12" sm="3" class="middle">
          <div class="field">
            <form-validator name="game_type">
              <label for="game_type" class="form-label"
                >Loại Game
                <small>(<span style="color: red">*</span>)</small></label
              >
              <select v-model="card.game_type">
                <option
                  v-for="(option, index) in gameOptions"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </form-validator>
          </div>
        </v-col>
        <v-col cols="12" sm="3" class="middle">
          <div class="field">
            <form-validator name="server">
              <label for="server" class="form-label"
                >Server
                <small>(<span style="color: red">*</span>)</small></label
              >
              <select v-model="card.server" :disabled="!card.game_type">
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
            <form-validator name="username">
              <label class="form-label"
                >Tài khoản Game
                <small>(<span style="color: red">*</span>)</small></label
              >
              <input
                v-model="card.username"
                type="text"
                placeholder=" "
                class="v-input form-input"
                @keyup.enter.prevent="submit"
              />
            </form-validator>
          </div>
        </v-col>
        <v-col cols="12" sm="6" class="middle">
          <div class="field">
            <form-validator name="amount">
              <label for="amount" class="form-label"
                >Chọn Mệnh giá Carot
                <small>(<span style="color: red">*</span>)</small></label
              >
              <select v-model="card.amount" @change="setMoneyOut">
                <option
                  v-for="(option, index) in carrotOptions"
                  :key="index"
                  :value="option.amount"
                >
                  Carot: {{ option.label }}
                </option>
              </select>
            </form-validator>
          </div>
        </v-col>

        <v-col cols="12" sm="6" class="middle custom-field-input mb-2">
          <div class="field">
            <form-validator name="out">
              <label for="out" class="form-label">Giá</label>
              <input
                :value="moneyReceived"
                disabled
                type="text"
                placeholder=" "
                class="v-input form-input"
              />
            </form-validator>
          </div>
        </v-col>

        <v-col cols="6">
          <div class="field mt-6">
            <v-btn
              size="sm"
              class="btn-neon-purple w-100"
              @click="buyOffline()"
            >
              <span>Nạp Offline </span>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="field mt-6">
            <v-btn type="submit" size="sm" class="btn-neon-purple w-100">
              <Loading v-if="isLoading" button></Loading>
              <span v-else>Thanh toán </span>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </form>
    <ModalBuyCarrotOffline
      ref="modalBuyOffline"
      :history="card"
      :selected="selected"
    />
  </div>
</template>

<script>
import Loading from "@/components/global/molecules/common/Loading";
import FormValidator from "@/components/global/form/FormValidator";
import ModalBuyCarrotOffline from "@/components/pages/services/ModalBuyCarrotOffline";

import {
  gameOptions,
  serverNinjaOptions,
  serverAvatarOptions,
  carrotOptions,
} from "@/utils/carrotOptions";

const defaultCard = () => ({
  game_type: null,
  server: null,
  username: null,
  amount: null,
});

export default {
  components: { Loading, FormValidator, ModalBuyCarrotOffline },
  data() {
    return {
      isLoading: false,
      selected: {
        card: {},
        game: {},
        server: {},
      },
      card: defaultCard(),
      moneyReceived: "Bạn chưa chọn mệnh giá",
      serverOptions: [],
      gameOptions,
      carrotOptions,
      serverNinjaOptions,
      serverAvatarOptions,
    };
  },
  watch: {
    "card.game_type": "changeGameType",
    "card.server": "changeServer",
    "card.amount": "setMoneyOut",
  },
  methods: {
    async submit() {
      if (!this.isLogin) {
        this.showModalLoginRegister("login");
        return;
      }

      if (!this.checkValid()) return;

      this.isLoading = true;
      try {
        const res = await this.$repositories.clientCarrots.create({
          input: this.card,
        });
        const history = res.data.response;
        this.resetInput();
        this.$emit("submit", history);
      } catch (e) {
      } finally {
        this.isLoading = false;
      }
    },
    buyOffline() {
      if (!this.checkValid()) {
        return;
      }
      this.$refs.modalBuyOffline.show();
    },
    checkValid() {
      const validations = [
        { condition: !this.card.game_type, message: "Bạn chưa chọn Loại Game" },
        { condition: !this.card.server, message: "Bạn chưa chọn Server" },
        {
          condition: !this.card.username,
          message: "Bạn chưa nhập Tài khoản game",
        },
        {
          condition:
            this.card.username && !/^[a-zA-Z0-9]+$/.test(this.card.username),
          message: "Tài khoản chưa đúng định dạng, <br/> chỉ được chữ và số!",
        },
        { condition: !this.card.amount, message: "Bạn chưa chọn Mệnh giá" },
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
    setMoneyOut() {
      if (!this.card.amount) {
        this.moneyReceived = "Bạn chưa chọn mệnh giá";
      } else {
        this.selected.card = this.carrotOptions.find(
          (item) => item.amount === this.card.amount
        );

        this.moneyReceived =
          this.format_number(this.selected.card.price) + " đ";
      }
    },
    changeGameType() {
      if (this.card.game_type === "ninja") {
        this.serverOptions = this.serverNinjaOptions;
        this.card.server = null;
      } else if (this.card.game_type === "avatar") {
        this.serverOptions = this.serverAvatarOptions;
        this.card.server = 1;
      } else {
        this.serverOptions = [];
        this.card.server = null;
      }
      this.selected.game = this.gameOptions.find(
        (item) => item.value === this.card.game_type
      );
    },
    changeServer() {
      this.selected.server = this.serverOptions.find(
        (item) => item.value === this.card.server
      );
    },
    resetInput() {
      this.card = defaultCard();
      this.moneyReceived = "Bạn chưa chọn mệnh giá";
    },
  },
};
</script>

