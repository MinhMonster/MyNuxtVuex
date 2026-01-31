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
              padding: 12px 15px;
              border-radius: 6px;
              color: #856404;
              font-size: 14px;
            "
          >
            ⚠️ <b>Lưu ý quan trọng:</b><br />
            - <b>Tài khoản game</b> là
            <b>Tài khoản dùng để Đăng nhập game</b> chứ không phải
            <b>Tên nhân vật</b>.<br />
            - Vui lòng kiểm tra kỹ <b>Server</b> và <b>Tài khoản game</b> trước
            khi nạp.<br />
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
                    @keyup.enter="submit()"
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
                      v-for="(option, index) in cards"
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
              <div class="field submit mt-6">
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
              <div class="field submit mt-6">
                <v-btn
                  size="sm"
                  class="btn-neon-purple w-100"
                  @click="submit()"
                >
                  <Loading v-if="isLoading" button></Loading>
                  <span v-else>Thanh toán </span>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </form>
      </template>

      <template #table>
        <CarotTable :cards="cards" />
        <ModalBuyCarrotOffline
          ref="modalBuyOffline"
          :history="card"
          :selected="selected"
        />
        <!-- histories -->
        <BaseTableSearch
          v-if="isLogin"
          is-table-modal
          title-modal="Chi tiết Giao dịch"
          module="client/carrots"
          ref="table"
        >
          <template #table-modal="{ row }">
            <tr v-if="row.status === 'pending'">
              <td class="mua-nick text-left instruction" colspan="2">
                <div class="pd-5px text-white">
                  <img src="/icon/icon-next-right.gif" /> Sau 30s-5p Admin sẽ
                  nạp Lượng, Carot cho bạn.
                  <br />
                  <img src="/icon/icon-next-right.gif" /> Sau 5p khi bạn đã
                  Thanh toán thành công nhưng vẫn chưa được xử lý thì hãy liên
                  hệ cho Admin để được hỗ trợ:
                  <GroupBtnInbox />
                </div>
              </td>
            </tr>
          </template>
        </BaseTableSearch>
      </template>
    </HomePage>
  </client-only>
</template>


<script>
import Loading from "@/components/global/molecules/common/Loading";
import CarotTable from "@/components/pages/services/CarotTable";
import HomePage from "@/components/pages/home/HomePage";
import FormValidator from "@/components/global/form/FormValidator";
import ModalBuyCarrotOffline from "@/components/pages/services/ModalBuyCarrotOffline";
import GroupBtnInbox from "@/components/common/client/button/GroupBtnInbox";
import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("home/users");

export default {
  layout: "clientLayout",
  components: {
    HomePage,
    Loading,
    CarotTable,
    FormValidator,
    ModalBuyCarrotOffline,
    GroupBtnInbox,
  },
  watch: {
    isLogin: {
      async handler(newValue, oldValue) {
        this.reload();
      },
    },
    "card.game_type": {
      async handler(newValue, oldValue) {
        this.changeGameType();
      },
    },
    "card.server": {
      async handler(newValue, oldValue) {
        this.changeServer();
      },
    },
  },
  data() {
    return {
      title: "Nạp Lượng, Carot",
      card: {
        game_type: null,
        server: null,
        username: null,
        amount: null,
      },
      history: {},
      selected: {
        card: {},
        game: {},
        server: {},
      },
      isLoading: false,
      moneyReceived: "Bạn chưa chọn mệnh giá",
      gameOptions: [
        {
          text: "Ninja School",
          value: "ninja",
          subtext: " Ninja ",
        },
        {
          text: "Avatar DK",
          value: "avatar",
          subtext: " Avatar DK",
        },
      ],
      serverNinjaOptions: [
        {
          text: "Sv1 - Bokken",
          value: 1,
          subtext: "Sv1",
        },
        {
          text: "Sv2 - Shuriken",
          value: 2,
          subtext: "Sv2",
        },
        {
          text: "Sv3 - Tessen",
          value: 3,
          subtext: "Sv3",
        },
        {
          text: "Sv4 - Kunai",
          value: 4,
          subtext: "Sv4",
        },
        {
          text: "Sv5 - Katana",
          value: 5,
          subtext: "Sv5",
        },
        {
          text: "Sv6 - Tone",
          value: 6,
          subtext: "Sv6",
        },
        {
          text: "Sv7 - Sanzu",
          value: 7,
          subtext: "Sv7",
        },
        {
          text: "Sv8 - Sensha",
          value: 8,
          subtext: "Sv8",
        },
        {
          text: "Sv9 - Fukiya",
          value: 9,
          subtext: "Sv9",
        },
        {
          text: "Sv10 - Tekkan",
          value: 10,
          subtext: "Sv10",
        },
        {
          text: "Sv11 - Daisho",
          value: 11,
          subtext: "Sv11",
        },
      ],
      serverAvatarOptions: [
        {
          text: "T.P Diệu Kỳ",
          value: 1,
          subtext: "",
        },
      ],
      serverOptions: [],
      cards: [
        {
          label: "50K",
          price_label: "40K",
          amount: 50000,
          price: "40000",
          nomal: "91",
          promotion_gold: "161",
          promotion_x2: "141",
          promotion_x3: "235",
          promotion_diamond: "273",
        },
        {
          label: "100K",
          price_label: "80K",
          amount: 100000,
          price: "80000",
          nomal: "195",
          promotion_gold: "345",
          promotion_x2: "295",
          promotion_x3: "495",
          promotion_diamond: "585",
        },
        {
          label: "200K",
          price_label: "160K",
          amount: 200000,
          price: "160000",
          nomal: "455",
          promotion_gold: "855",
          promotion_x2: "805",
          promotion_x3: "1155",
          promotion_diamond: "1275",
        },
        {
          label: "500K",
          price_label: "400K",
          amount: 500000,
          price: "400000",
          nomal: "1430",
          promotion_gold: "2680",
          promotion_x2: "2530",
          promotion_x3: "3630",
          promotion_diamond: "4290",
        },
        {
          label: "1 Triệu",
          price_label: "800K",
          amount: 1000000,
          price: 800000,
          nomal: "3250",
          promotion_gold: "6250",
          promotion_x2: "5750",
          promotion_x3: "8250",
          promotion_diamond: "9750",
        },
      ],
    };
  },
  computed: {
    ...mapFields("global", { ready: "ready" }),
  },
  mounted() {
    this.reload();
  },
  methods: {
    ...mapActions(["buyCarot"]),
    reload() {
      this.ready = false;
      setTimeout(() => {
        this.ready = true;
      }, 500);
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
      try {
        const res = await this.buyCarot({
          input: this.card,
        });
        this.isLoading = false;
        const history = res?.data?.data;
        if (history) {
          await this.$refs.table.showTableModal(history);
          await this.resetInput();
          this.$refs.table.fetchDataIndex();
        }
      } catch (e) {}
    },
    resetInput() {
      this.card = {
        server: null,
        username: null,
        amount: null,
      };
      this.moneyReceived = "Bạn chưa chọn mệnh giá";
    },
    setMoneyOut() {
      if (!this.card.amount) {
        this.moneyReceived = "Bạn chưa chọn mệnh giá";
      } else {
        this.selected.card = this.cards.find(
          (item) => item.amount === this.card.amount
        );

        this.moneyReceived = this.format_number(this.card.amount * 0.8) + " đ";
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
