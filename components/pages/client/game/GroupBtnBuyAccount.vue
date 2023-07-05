<template>
  <b-row>
    <b-col cols="6">
      <div class="c-font-uppercase btnCheckAccount ajax" @click="showModal()">
        <div class="btn-buy-account">
          <v-btn icon class="text-main">
            <v-icon>mdi-arrow-right-bold-circle-outline</v-icon>Mua Ngay
          </v-btn>
        </div>
      </div>
    </b-col>
    <b-col cols="6">
      <div class="btn-buy-account-hover" @click="showBank()">
        <v-btn icon>
          <v-icon>mdi-arrow-right-bold-circle-outline</v-icon>ATM-MOMO
        </v-btn>
      </div>
    </b-col>

    <b-col cols="6">
      <a href="https://zalo.me/0961646828" target="_blank">
        <div class="btn-buy-account-hover">
          <v-btn icon>
            <v-icon>mdi-arrow-right-bold-circle-outline</v-icon>Inbox Zalo
          </v-btn>
        </div>
      </a>
    </b-col>
    <b-col cols="6">
      <div class="c-font-uppercase btnCheckAccount ajax">
        <a href="https://messenger.com/t/minh.docong.7" target="_blank">
          <div class="btn-buy-account">
            <v-btn icon class="text-main">
              <v-icon>mdi-arrow-right-bold-circle-outline</v-icon>Messenger
            </v-btn>
          </div>
        </a>
      </div>
    </b-col>
    <ModalBuyAccount
      v-if="accountType === 'Ninja'"
      ref="modal"
      :account-ninja="account"
    />
    <!-- <ModalBuyAccountNinja
      v-if="accountType === 'Ninja'"
      ref="modal"
      :account-ninja="account"
    ></ModalBuyAccountNinja> -->
    <ModalBuyAccountAvatar
      v-if="accountType === 'Avatar'"
      ref="modal"
      :account="account"
    ></ModalBuyAccountAvatar>
    <ModalBuyAccountDragonBall
      v-if="accountType === 'NRO'"
      ref="modal"
      :account="account"
    />
    <ModalBuyAccountBank
      ref="modalBuyAccountBank"
      :account="account"
      :account-type="accountType"
    />
  </b-row>
</template>



<script>
import ModalBuyAccount from "@/components/pages/client/game/ModalBuyAccount";

import ModalBuyAccountAvatar from "@/components/pages/client/game/avatars/ModalBuyAccountAvatar";
import ModalBuyAccountDragonBall from "@/components/pages/client/game/dragon_balls/ModalBuyAccountDragonBall";
import ModalBuyAccountBank from "@/components/pages/client/game/ninjas/ModalBuyAccountBank";

export default {
  name: "GroupBtnBuyAccount",

  components: {
    ModalBuyAccount,
    ModalBuyAccountAvatar,
    ModalBuyAccountDragonBall,
    ModalBuyAccountBank,
  },
  props: {
    account: {
      type: Object,
      default: () => {},
    },
    accountType: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isShow: false,
      isBank: false,
    };
  },
  async mounted() {},
  computed: {},
  methods: {
    showModal() {
      this.$refs.modal.show();
    },
    showBank() {
      this.$refs.modalBuyAccountBank.show();
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  color: #1e5b7e;
  margin-bottom: 10px;
}
table.table tbody {
  // border: 1px solid #663019;
}
th.info-nick {
  width: 50%;
  padding: 7px;
  color: #ffcf9c;
  border: 1px solid #663019;
  background: #e28637;
}

.table td {
  padding: 5px;
  vertical-align: top;
  border: 1px solid #e28637;
}
.mua-nick span {
  font-size: 14px;
  font-weight: 400;
  color: #663019;
}

::v-deep {
  .modal-header {
    border-left: 2px solid #663019;
    border-right: 2px solid #663019;
    background: #e28637 url(https://muabannick.pro/images/header/bg_top.png)
      repeat-x;
    border-bottom: none;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal-title {
      color: #561d00;
    }
    .close {
      display: flex !important;
      color: #663019;
      margin-top: -10px;
      margin-right: -10px;
      align-items: center !important;
      justify-content: center !important;
      -ms-flex-pack: center !important;
      text-decoration: none;
      border-radius: 50%;
      font-size: 20px;
      height: 20px;
      width: 20px;
      right: 0;
      top: 0;
      position: absolute;
      background: #ffcf9c;
      border: 2px solid #561d00;
      z-index: 2;
      opacity: 1 !important;
      padding: 12px;
    }
  }

  .modal-dialog-scrollable .modal-content {
    overflow: visible;
  }
  .modal-body {
    position: relative;
    border: 2px solid #561d00;
    background: #ffcf9c;
    padding: 10px;
    .modal-info {
      border-radius: 4px;
      position: relative;
      padding: 5px;
      color: #663019;
      border: 1px solid #663019;
      background: #ffefa3;
      .tab-content {
        padding: 5px;
      }
      .form-group {
        padding: 5px;
        margin-bottom: 0px;
      }
      .nav-tabs {
        .nav-item {
          width: 50%;
          .nav-link {
            border: none;
            color: #663019;
            text-align: center;

            &.active {
              font-weight: bold;
              border: none;
              border-bottom: 1px solid #663019;
              background-color: #ffefa3;
            }
          }
        }
      }
      .row {
        padding: 0;
        margin: 0px;
        .col-md-6 {
          margin: 0px;
          padding: 0px;
          .info-atm-momo {
            border: 1px solid #663019;
            background: #ffcf9c;
            margin: 5px;
            padding: 5px;
            line-height: 25px;
            font-size: 14px;
          }
        }
      }
    }
  }
  .modal-footer {
    border: 2px solid #663019;
    background: #e28637;
    border-top: none;
    // .btn-buy.btn-success {
    //   border: 1px solid #663019;
    //   background: #663019;
    // }
  }
  .custom-control-input:checked ~ .custom-control-label::before {
    color: #fff;
    border-color: #663019;
    background-color: #663019;
  }
  .custom-control-label::before {
    top: 0;
  }
  .custom-control-label::after {
    top: 0;
  }
}
</style>
