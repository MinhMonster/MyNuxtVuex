
<template>
  <b-modal
    ref="modal"
    title="XÁC NHẬN MUA TÀI KHOẢN"
    scrollable
    size="lg"
    @hide="close()"
  >
    <div class="modal-info">
      <b-tabs>
        <b-tab title="Thanh Toán">
          <table class="table">
            <tbody class="panel">
              <tr>
                <th class="info-nick">Mã Số:</th>
                <td class="mua-nick">
                  <span>{{ format_number(accountNinja.ID) }}</span>
                </td>
              </tr>
              <tr>
                <th class="info-nick">Nhà phát hành:</th>
                <td class="mua-nick">
                  <span>TeaMobi</span>
                </td>
              </tr>
              <tr>
                <th class="info-nick">Tên game:</th>
                <td class="mua-nick">
                  <span>Ninja School Online</span>
                </td>
              </tr>
              <tr>
                <th class="info-nick">Giá tiền:</th>
                <td class="mua-nick">
                  <span>{{ format_number(accountNinja.giatien) }} đ</span>
                </td>
              </tr>
              <tr>
                <th class="info-nick">ATM-MOMO:</th>
                <td class="mua-nick">
                  <span> {{ cash_atm(accountNinja.giatien) }} đ</span>
                </td>
              </tr>
            </tbody>
          </table>
        </b-tab>
        <b-tab title="Tài Khoản">
          <table class="table">
            <tbody class="panel">
              <tr>
                <th class="info-nick">Mã Số:</th>
                <td class="mua-nick">
                  <span>{{ format_number(accountNinja.ID) }}</span>
                </td>
              </tr>
              <tr>
                <th class="info-nick">Class:</th>
                <td class="mua-nick">
                  <span>{{ classNinja(accountNinja.class) }}</span>
                </td>
              </tr>
              <tr>
                <th class="info-nick">Level:</th>
                <td class="mua-nick">
                  <span>{{ accountNinja.level }}</span>
                </td>
              </tr>
              <tr>
                <th class="info-nick">Server:</th>
                <td class="mua-nick">
                  <span>{{ serverNinja(accountNinja.server) }}</span>
                </td>
              </tr>
              <tr>
                <th class="info-nick">Chi tiết:</th>
                <td class="mua-nick">
                  <span> {{ accountNinja.thongtin }} </span>
                </td>
              </tr>
            </tbody>
          </table>
        </b-tab>
      </b-tabs>
      <!-- </div>
        <div class="modal-info mgt-10px"> -->
      <b-form-group v-slot="{ ariaDescribedby }">
        <b-form-radio
          v-model="isBuy"
          :aria-describedby="ariaDescribedby"
          name="some-radios"
          value="wallet"
          >Thanh toán bằng số dư</b-form-radio
        >
        <b-form-radio
          v-model="isBuy"
          :aria-describedby="ariaDescribedby"
          name="some-radios"
          value="atm-momo"
          >Thanh toán bằng Atm - Momo</b-form-radio
        >
      </b-form-group>
      <b-row v-if="isBuy == 'atm-momo'">
        <b-col sm="12" md="6">
          <div class="info-atm-momo">
            <h5 style="text-align: center">
              <b>Tài khoản Thanh Toán của Admin:</b>
            </h5>

            Chủ tài khoản: Đỗ Công Minh<br />

            <img src="/images/icon.gif" /> Momo: 0961646828<br />

            <img src="/images/icon.gif" /> MB Bank: 8330105578888<br />

            <img src="/images/icon.gif" /> Vietinbank: 107006711803<br />

            <img src="/images/icon.gif" /> Vietcombank: 0541000311219<br />
          </div>
        </b-col>

        <b-col sm="12" md="6">
          <div class="info-atm-momo">
            <h5 style="text-align: center">
              <b>HD Mua Nick = ATM - MOMO</b>
            </h5>
            <img src="/images/icon.gif" /> Bạn Chuyển tiền cho Admin:<br />
            <img src="/images/icon.gif" /> Số Tiền:
            {{ cash_atm(accountNinja.giatien) }} VNĐ<br />
            <img src="/images/icon.gif" /> ND: Mua Nick Ninja
            {{ format_number(accountNinja.ID) }} &amp; SĐT<br />
            <img src="/images/icon.gif" /> Chuyển xong nhắn tin cho Admin nhận
            nick
            <!--(Kèm hình ảnh chuyển tiền)-->
            <br />

            <img src="/images/icon.gif" />
            <img src="/images/icon.gif" />
            <img src="/images/icon.gif" />
            <a href="https://zalo.me/0961646828"> Sđt, Zalo: 0961.646.828</a>
          </div>
        </b-col>
      </b-row>
    </div>
    <template #modal-footer="{ hide }">
      <b-button size="sm" variant="success" class="btn-buy" @click="buyNow()">
        <Loading v-if="isLoading" button></Loading>
        <span v-else> Thanh Toán </span>
      </b-button>
      <b-button size="sm" variant="danger" @click="hide()"> Hủy </b-button>
    </template>
  </b-modal>
</template>
  
  <script>
import mixins from "@/mixins/index";
import Loading from "@/components/global/molecules/common/Loading";
export default {
  name: "AccountNinjaList",
  mixins: [mixins],

  components: { Loading },
  props: {
    accountNinja: {
      type: Object,
      default: () => {},
    },
    showModal: Boolean,
  },
  data() {
    return {
      isBuy: "wallet",
      isLoading: false,
    };
  },
  async mounted() {
    console.log(this.accountNinja);
    // if(this.showModal){
    this.$refs.modal.show();
    // }
  },
  computed: {},
  methods: {
    buyNow() {
      this.isLoading = true;
      console.log("buy");
      this.$swal.fire("test", "", "success");
      // this.$refs.modal.hide();
    },
    close() {
      console.log("close");
      this.$emit("hide");
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
