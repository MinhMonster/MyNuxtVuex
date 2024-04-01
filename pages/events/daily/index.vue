<template>
  <client-only>
    <HomePage
      :title="title"
      goBack
      reload
      @reload="reload()"
      table
    >
      <template #body>
        <form class="form daily-event">
          <div class="content-main text-center mb-2">
            Đoạn đúng chắc chắc có thưởng!
          </div>
          <div class="btn-show-more">
            <v-btn @click="showModal()" variant="danger" class="flex mt-3 mb-1">
              Xem Hướng Dẫn Tham Gia
            </v-btn>
          </div>
          <v-row>
            <v-col v-if="!votedDaylyEvent" cols="12" class="middle">
              <div class="field center">
                <form-validator name="phone">
                  <input
                    v-model="phone"
                    type="text"
                    maxlength="10"
                    placeholder="Số điện thoại"
                    class="v-input form-input phone"
                  />
                </form-validator>
              </div>
            </v-col>
            <v-col cols="12" class="middle">
              <div class="field center">
                <form-validator name="number">
                  <label v-if="votedDaylyEvent" for="amount" class="form-label"
                    >Số tham gia Hôm nay của bạn:
                    <small>(<span style="color: red">*</span>)</small></label
                  >
                  <input
                    v-model="number"
                    type="text"
                    placeholder="??"
                    maxlength="2"
                    disabled
                    class="v-input form-input number"
                  />
                </form-validator>
              </div>
            </v-col>

            <v-col v-if="!votedDaylyEvent" cols="12" sm="12" class="middle">
              <ModalChoseNumberEvent
                :value="number"
                @change="change"
                @submit="submit"
              >
                <template #button>
                  <v-btn class="btn-main ml-2" @click="submit">
                    <Loading v-if="isLoading" button></Loading>
                    <span v-else> Tham Gia </span>
                  </v-btn>
                </template>
              </ModalChoseNumberEvent>
            </v-col>
          </v-row>
        </form>
        <ModalPayload
          ref="modal"
          size="md"
          title="Hướng dẫn tham gia Sự kiện"
          hiddenFooter
        >
          <template #content>
            <v-row>
              <v-col cols="12" class="size">
                <div class="page-body">
                  Thời gian Sự kiện diễn ra: 0h -> 18h (hằng ngày)<br /><br />
                  <b>Giải thưởng:</b><br />
                  - Ngày thường: 20k (Không giới hạn số người trúng).<br />
                  - T7, CN: Bạn đoán trúng đầu tiên: 50k. Những bạn đoán trúng
                  sau đó: 20k (Không giới hạn).<br />
                  - Nếu bạn trúng giải hãy liên hệ với Admin để nhận giải.<br />
                  - Giải thưởng: ATM-MOMO, Card, Xu, Nick (Tùy bạn chọn)<br /><br />
                  <b>Thể lệ:</b><br />
                  - Chọn 1 số từ 00->99 (Bấm
                  <span style="color: red">Chọn Số</span> để chọn ->
                  <span style="color: red">Lưu</span>)<br />
                  - Bấm <span style="color: red">Tham Gia</span> (Số bạn đã chọn
                  sẽ được lưu lại bên dưới).<br />
                  - Số trúng giải dựa vào kết quả
                  <span style="color: red">XSMB</span> của ngày hôm đó.<br />
                  - Sẽ lấy 2 số cuối của giải Đặc biệt
                  <span style="color: red">XSMB</span><br />

                  <b>Ví dụ:</b><br />
                  - Kết quả giải Đặc biệt
                  <span style="color: red">XSMB</span> là:
                  <span style="color: red">56789</span><br />
                  - Thì số trúng giải sẽ là 2 số cuối:
                  <span style="color: red">89</span><br /><br />

                  <b>Điều kiện tham gia:</b><br />
                  - Trước hết bạn cần
                  <span style="color: red">Đăng nhập</span> trên website<br />
                  - Mỗi tài khoản chỉ được tham gia:
                  <span style="color: red">1 Lần/Ngày</span><br />
                  - Mỗi Số điện thoại chỉ được tham gia:
                  <span style="color: red">1 Lần/Ngày</span><br /><br />

                  <b>Lưu ý:</b><br />
                  - Nếu ghi sai SĐT =>
                  <span style="color: red">Không thể nhận giải</span><br />
                  => Hãy đăng ký tài khoản khác và tham gia lại với số điện
                  thoại đúng.<br /><br />

                  <b>Chúc các bạn may mắn! Thanks!</b><br />
                </div>
              </v-col>
            </v-row>
          </template>
        </ModalPayload>
      </template>
      <template #table>
        <HistoryDailyEventTable :histories="histories" :user="user" />
        <Pagination
          v-if="historyMeta && historyMeta.pages > 1"
          :meta="historyMeta"
          @change="onPageChange"
        ></Pagination>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import Loading from "@/components/global/molecules/common/Loading";
import FormValidator from "@/components/global/form/FormValidator";
import AccountNumbeAdmin from "@/components/common/AccountNumbeAdmin";
import ModalPayload from "@/components/common/ModalPayload";
import HistoryDailyEventTable from "@/components/pages/events/daily/HistoryDailyEventTable";

import Pagination from "@/components/global/molecules/common/Pagination";
import HomePage from "@/components/pages/home/HomePage";

import ModalChoseNumberEvent from "@/components/pages/events/daily/ModalChoseNumberEvent";

import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";

const { mapActions } = createNamespacedHelpers("home/events/daily");
const global = createNamespacedHelpers("global");

export default {
  layout: "clientLayout",
  components: {
    HomePage,
    Loading,
    FormValidator,
    AccountNumbeAdmin,
    ModalPayload,
    HistoryDailyEventTable,
    Pagination,
    ModalChoseNumberEvent,
  },
  data() {
    return {
      number: null,
      phone: null,
      isLoading: false,
      title: "Sự kiện Hằng Ngày",
    };
  },

  computed: {
    ...mapFields("home/users", {
      user: "user",
      token: "token",
    }),
    ...mapFields("home/events/daily", {
      votedDaylyEvent: "votedDaylyEvent",
      histories: "historyVotedDailyEvents",
      historyMeta: "historyMeta",
      pageSave: "pageSave",
    }),
    ...mapFields("home/game/ninjas", {}),
    queryPage() {
      return this.$route.query.page || 1;
    },
  },
  mounted() {
    this.reload();
  },
  methods: {
    ...mapActions([
      "voted",
      "setQuery",
      "resetQuery",
      "fetchVotedDailyEventHistories",
    ]),
    ...global.mapActions(["nextOldPath"]),
    change(value) {
      this.number = this.formatTwoNumber(value);
    },
    async submit() {
      if (!this.token) {
        this.showSwal({
          title: "Bạn chưa đăng nhập",
          html: "Hãy đăng nhập để tham gia Sự kiện này. <br/> Xin cảm ơn!",
        });
      } else if (this.number == null || this.number > 99 || this.number < 0) {
        this.showSwal({
          title: "Bạn chưa chọn số",
          text: "Hãy chọn số để tham gia Sự kiện này!",
        });
      } else {
        this.isLoading = true;
        const res = await this.voted({
          input: {
            number: this.number,
            phone: this.phone,
          },
        });
        this.isLoading = false;
        if (res.data.code == 200) {
          this.onPageChange(this.pageSave);
        }
      }
    },
    async onPageChange(page) {
      if (this.token) {
        await this.setQuery({ page });
        await this.fetchVotedDailyEventHistories();
        if (this.votedDaylyEvent) {
          this.number = this.votedDaylyEvent.number;
        } else {
          this.number = null;
          this.phone = null;
        }
        page == 1 || !page
          ? this.$router.push(`/events/daily`)
          : this.$router.push(`/events/daily?page=${page}`);
      }
    },
    reload() {
      this.onPageChange(this.pageSave);
    },
    showModal() {
      this.$refs.modal.show();
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
<style lang="scss" scoped>
form.daily-event {
  height: auto;
  min-height: 200px;
  &.form {
    .field {
      input.v-input {
        margin: 0 auto;
        text-align: center;
        width: 250px !important;
        font-size: 30px;
        background: #f1f1f1;
        opacity: 1;
        &[disabled] {
          background: #f1f1f1;
          opacity: 1;
        }
        &.number {
          height: 80px !important;
          text-shadow: 2px 2px 2px #e28637;
          ::v-deep {
            + .validation {
              margin-top: 20px;
            }
          }
        }
        &.phone {
          height: 40px;
          ::v-deep {
            + .validation {
              margin-top: 5px;
            }
          }
        }
      }
    }
  }
}
::v-depp {
  .has-error .validation {
    margin-top: 15px !important;
  }
  .page-body {
    color: #000000;
    border: 1px solid #663019;
    background: #ffefa3;
    padding: 9px;
    border-radius: 4px;
  }
}
.account-box {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0px;
}
// .wrapper {
//   border-radius: 15px;
//   box-shadow: 0px 15px 20px rgb(0 0 0 / 10%);
//   user-select: none;
//   .title {
//     font-size: 30px;
//     font-weight: 600;
//     text-align: center;
//     line-height: 40px;
//     color: #ffcf9c;
//     user-select: none;
//     border-radius: 15px 15px 0 0;
//     background: linear-gradient(-135deg, #e28637, #561d00);
//   }
form {
  // padding: 10px 30px 30px;
  // background: #ffefa3;
  // border: 1px solid #663019;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;

  .field {
    height: 40px;
    width: 100%;
    margin-top: 15px;
    position: relative;
    &.submit {
      margin-top: 0px;
    }
    // input:valid ~ label {
    //   top: 0%;
    //   font-size: 16px;
    //   color: #4158d0;
    //   background: none;
    //   transform: translateY(-50%);
    // }
    input {
      height: 100%;
      width: 100%;
      outline: none;
      font-size: 17px;
      padding-left: 5px;
      border: 1px solid lightgrey;
      border-radius: 4px;
      transition: all 0.3s ease;
      background: #fff;
      &.v-input {
        z-index: 999999999;
        height: 35px;
        border: 1px solid #e28637;
        color: #663019 !important;
        &.text-danger {
          color: red !important;
          font-size: 15px;
        }
      }
    }
    select {
      height: 100%;
      width: 100%;
      outline: none;
      font-size: 17px;
      padding-left: 5px;
      border: 1px solid #e28637 !important;
      border-radius: 4px;
      transition: all 0.3s ease;
      // background: #fff;
      .custom-select {
        z-index: 999999999;
        height: 35px;
        border: 1px solid #e28637 !important;
        color: #663019 !important;
      }
    }
    // label {
    //   position: absolute;
    //   top: 50%;
    //   left: 20px;
    //   color: #999999;
    //   font-weight: 400;
    //   font-size: 17px;
    //   pointer-events: none;
    //   transform: translateY(-50%);
    //   transition: all 0.3s ease;
    // }
    // input[type="submit"],
    // .btn-login {
    //   width: 100%;
    //   border-radius: 20px;
    //   color: #ffcf9c !important;
    //   border: none;
    //   padding-left: 0;
    //   // font-size: 20px;
    //   font-weight: 500;
    //   cursor: pointer;
    //   background: linear-gradient(-135deg, #e28637, #561d00);
    //   transition: all 0.3s ease;
    //   span {
    //     color: #ffcf9c !important;
    //   }
    // }
  }
  .signin {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    color: #663019;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    font-size: 16px;
    align-items: center;
    justify-content: space-around;
    input {
      width: 15px;
      height: 15px;
      background: red;
    }
    span {
      white-space: nowrap;
      color: #4158d0 !important;
      cursor: pointer;
    }
  }
}
// }
// .checkbox {
//   position: relative;
//   display: block;
//   margin-top: 10px;
//   margin-bottom: 10px;
//   float: left;
//   // width: 100% !important;
//   user-select: none;
//   white-space: nowrap;
//   padding-top: 10px;
//   input[type="checkbox"] {
//     position: absolute;
//     opacity: 0;
//     z-index: -1;
//     margin: 0;
//   }
//   label {
//     display: inline-block;
//     color: #e28637;
//     font-size: 16px;
//     max-width: 100%;
//     position: relative;
//     padding-left: 35px;
//     height: 2em;
//     min-height: 20px;
//     padding-left: 20px;
//     margin-bottom: 0;
//     font-weight: 400;
//     cursor: pointer;
//   }

//   label:before,
//   label:after {
//     top: 2px;
//     width: 17px !important;
//     height: 17px !important;
//   }
// }
// .checkbox input[type="checkbox"] + label::before {
//   content: " ";
//   position: absolute;
//   border: 1px solid #e28637;
//   top: 2px;
//   left: 0;
//   width: 17px !important;
//   height: 17px !important;
//   border-radius: 2px;
// }
// .checkbox input[type="checkbox"]:checked + label::before {
//   content: " ";
//   background: linear-gradient(#e28637, #663019);
// }
// input[type="checkbox"]:checked + label::after {
//   content: "\2714";
//   top: -0.5px;
//   left: 0;
//   position: absolute;
//   z-index: 2;
//   transition: 0.25s all ease;

//   width: 17px !important;
//   height: 17px !important;

//   line-height: 1.5;
//   text-align: center;
//   color: #fff;
// }

form {
  padding: 10px;
  // border: 1px solid #333;
  // background: #ffffff;
}

// .form-field {
//  margin: 20px;
// }

// .form-input {
//   border: 1px solid #333;
//   width: 100%;
//   height: 50px;
//   padding: 0 0px;
//   transform: 0.25s ease;
// }

.form-input:focus {
  border-color: blue;
}

// .form-field {
//  position: relative;
// }

.form-label {
  // color: #a4a4a4;
  // position: absolute;
  // top: 20px;
  // //  top: 35%;
  // font-size: 14px;
  // transform: translateY(-50%);
  // left: 21px;
  // user-select: none;
  // pointer-events: none;
  // transition: 0.25s ease;
  // z-index: 1;
  // background: #000;
}
</style>