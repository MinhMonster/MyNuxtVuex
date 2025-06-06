<template>
  <client-only>
    <div v-if="accountAvatar">
      <div class="title text-center">
        <h3>Thông tin chi tiết</h3>
      </div>

      <table class="table text-center">
        <tbody>
          <tr>
            <th class="info-nick">Đất</th>
            <td class="mua-nick">{{ accountAvatar.dat }}</td>
          </tr>
          <tr>
            <th class="info-nick">Gà</th>
            <td class="mua-nick">{{ accountAvatar.ga }}</td>
          </tr>
          <tr>
            <th class="info-nick">Cá</th>
            <td class="mua-nick">{{ accountAvatar.ca }}</td>
          </tr>
          <tr>
            <th class="info-nick detail">Chi tiết</th>
            <td class="mua-nick">
              <span v-html="accountAvatar.thongtin"></span>
            </td>
          </tr>
          <tr>
            <th class="info-nick">
              <div style="margin: 10px"></div>
              Giá Bán
              <template v-if="hasDiscount">
                <br />
                <p class="text-danger">
                  (Giảm giá: {{ accountAvatar.saleOff }}%)
                </p>
              </template>
            </th>
            <td class="mua-nick">
              <span>{{ format_number(accountAvatar.price) }} Card</span>
              <div class="divider"></div>
              <span :class="{ 'text-line-middel text-danger': hasDiscount }">
                {{ cash_atm(accountAvatar.price) }} ATM - MOMO
              </span>
              <template v-if="hasDiscount">
                <div class="divider"></div>
                <span>{{ cash_atm(discountedPrice) }} ATM - MOMO</span>
              </template>
            </td>
          </tr>
        </tbody>
      </table>

      <GroupBtnBuyAccount :account="accountAvatar" account-type="Avatar" />
    </div>
  </client-only>
</template>

<script>
import GroupBtnBuyAccount from "@/components/pages/client/game/GroupBtnBuyAccount";

export default {
  components: {
    GroupBtnBuyAccount,
  },
  props: {
    accountAvatar: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    hasDiscount() {
      return this.accountAvatar?.saleOff > 0;
    },
    discountedPrice() {
      if (!this.hasDiscount) return this.accountAvatar.price;
      return this.accountAvatar.price * (1 - this.accountAvatar.saleOff / 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  color: #1e5b7e;
  margin-bottom: 10px;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #a4a4a4;
  margin: 5px 0;
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
  padding: 6.5px;
  color: #663019;
  border: 1px solid #663019;
  background: #ffcf9c;
  border-radius: 3px !important;
  text-align: center;
}

.btn-buy-account-hover {
  color: #ffcf9c;
  background: #e28637;
  border: 1px solid #663019;
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
  }

  .custom-control-label::before {
    top: 0;
  }
  .custom-control-label::after {
    top: 0;
  }
}
</style>
