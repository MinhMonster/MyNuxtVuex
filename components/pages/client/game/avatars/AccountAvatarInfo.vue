<template>
  <client-only>
    <div v-if="accountAvatar">
      <div class="title">
        <center>
          <h3>Thông tin chi tiết</h3>
        </center>
      </div>

      <table class="table text-center">
        <tbody>
          <tr>
            <th class="info-nick">Đất</th>
            <td class="mua-nick">
              <span>{{ accountAvatar.dat }}</span>
            </td>
          </tr>

          <tr>
            <th class="info-nick" style="">Gà</th>
            <td class="mua-nick">
              <span> {{ accountAvatar.ga }}</span>
            </td>
          </tr>

          <tr>
            <th class="info-nick" style="">Cá</th>
            <td class="mua-nick">
              <span>{{ accountAvatar.ca }}</span>
            </td>
          </tr>

          <tr>
            <th class="info-nick detail" style="">Chi tiết</th>
            <td class="mua-nick">
              <span v-html="accountAvatar.thongtin"> </span>
            </td>
          </tr>
          <tr>
            <th class="info-nick" style="">
              <div style="margin: 10px"></div>

              Giá Bán
            </th>
            <td class="mua-nick">
              <span>{{ format_number(accountAvatar.price) }} Card </span>
              <div
                style="
                  width: 100%;
                  height: 1px;
                  background-color: #a4a4a4;
                  margin-top: 5px;
                  margin-bottom: 5px;
                "
              ></div>
              <span>{{ cash_atm(accountAvatar.price) }} ATM - MOMO</span>
            </td>
          </tr>
        </tbody>
      </table>
      <GroupBtnBuyAccount :account="accountAvatar" account-type="Avatar" />
    </div>
  </client-only>
</template>
  
<script>
import mixins from "@/mixins/index";
import AccountAvatarCard from "@/components/pages/client/game/avatars/AccountAvatarCard";
import GroupBtnBuyAccount from "@/components/pages/client/game/GroupBtnBuyAccount";

export default {
  name: "accountAvatarList",
  mixins: [mixins],

  components: {
    AccountAvatarCard,
    GroupBtnBuyAccount,
  },
  props: {
    accountAvatar: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isBuy: "wallet",
      isShow: false,
    };
  },
  async mounted() {},
  computed: {},
  methods: {
    buyNow() {
      this.isShow = true;
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
  width: 40%;
  padding: 7px;
  color: #ffcf9c;
  border: 1px solid #663019;
  background: #e28637;
  &.detail {
    vertical-align: middle;
  }
}
.btn-buy-account,
.mua-nick {
  cursor: pointer;
  padding: 5px;
  color: #663019;
  border: 1px solid #663019;
  background: #ffcf9c;
}

.btn-buy-account-hover {
  color: #ffcf9c;
  border: 1px solid #663019;
  background: #e28637;
}
.btn-buy-account,
.btn-buy-account-hover,
.mua-nick {
  padding: 6.5px;
  border-radius: 3px !important;
  text-align: center;
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
  ::v-deep {
    p {
      margin-bottom: 8px;
    }
  }
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
