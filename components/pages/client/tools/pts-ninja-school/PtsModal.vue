<template>
  <div></div>
  <!-- <v-dialog v-model="dialog" scrollable max-width="600px" light>
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <v-btn color="primary"> {{ data.name }} </v-btn>
      </div>
    </template>

    <v-card>
      <v-card-title class="title-modal">
        {{ data.name }}
      </v-card-title>
      <v-card-text style="height: 300px">
        <div class="page-body">
          <div class="scroll-y">
            <form>
              <div class="flex-wrap gap-15">
                <div class="field flex gap-5 text-center">
                  <form-validator name="id">
                    <label for="name" class="form-label">(+)</label>
                    <v-text-field
                      v-model="data.value"
                      :style="styleBtn"
                      class="v-input form-input input-btn"
                    ></v-text-field>
                  </form-validator>
                  <form-validator name="id">
                    <label for="name" class="form-label">Màu</label>
                    <v-text-field
                      v-model="data.color"
                      type="color"
                      class="v-input form-input input-btn btn-color"
                    ></v-text-field>
                  </form-validator>
                  <form-validator name="id">
                    <label for="name" class="form-label">Nền</label>
                    <v-text-field
                      v-model="data.bgColor"
                      type="color"
                      class="v-input form-input input-btn btn-color"
                    ></v-text-field>
                  </form-validator>

                  <v-btn
                    class="mt-6 danger v-btn text-14-500"
                    @click="preData()"
                    >-</v-btn
                  >

                  <v-btn class="mt-6 primary v-btn" @click="nextData()"
                    >+</v-btn
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="text-right right">
        <v-btn color="red" class="text-white" @click="dialog = false">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog> -->
</template>
<script>
// import { mapFields } from "vuex-map-fields";
// import FormValidator from "@/components/global/form/FormValidator";

// export default {
//   components: {
//     FormValidator,
//   },
//   props: {
//     data: {
//       type: Object,
//       default: () => {
//         return {};
//       },
//       require: true,
//     },
//   },
//   data() {
//     return {
//       dialog: false,
//       // data: {
//       //   value: 0,
//       //   tl: 0,
//       //   color: "#ffffff",
//       //   bgColor: "#a21d0a",
//       // },
//     };
//   },
//   computed: {
//     ...mapFields("home/users", ["token", "user"]),

//     isLogin() {
//       const path = this.$route.path;
//       return path.includes("login") || path.includes("register");
//     },
//     styleBtn() {
//       return {
//         color: this.data.color + "!important",
//         backgroundColor: this.data.bgColor + "!important",
//         border: "1px solid" + this.data.bgColor + "!important",
//       };
//     },
//   },
//   methods: {
//     nextData() {
//       if (this.data.value == 16) return;
//       this.data.value += 1;
//     },
//     preData() {
//       if (this.data.value == 0) return;
//       this.data.value -= 1;
//     },
//     nextPath(path) {
//       this.$router.push(`${path}`);
//       this.dialog = false;
//     },
//     nextWalletDeposit() {
//       if (this.token) {
//         this.$router.push("/account/wallet/deposit/vnd");
//       } else {
//         this.disabledLogin();
//       }
//     },
//     disabledLogin() {
//       if (!this.isLogin) {
//         this.$router.push("/login");
//       } else {
//         this.showSwal({
//           title: "Bạn chưa đăng nhập",
//           html: "Hãy đăng nhập hoặc đăng ký nếu chưa có tài khoản để sử dụng dịch vụ. <br/> Xin cảm ơn!",
//         });
//       }
//     },
//   },
// };
</script>
<style lang="scss" scoped>
// .v-card.v-sheet.theme--dark {
//   border: 1px solid #a4a4a4;
//   /* border: 1px solid rgba(255, 255, 255, 0.12); */
// }

// /* .v-card.v-sheet.theme--dark {
//   background: #fff !important;
// } */
// .v-card__title.title-modal {
//   color: #663019;
//   border-left: 2px solid #663019;
//   border-right: 2px solid #663019;
//   background: #e28637 url(https://muabannick.pro/images/header/bg_top.png)
//     repeat-x;
//   border-bottom: none;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }
// .v-dialog--scrollable > .v-card > .v-card__text {
//   position: relative;
//   border: 2px solid #561d00;
//   background: #ffcf9c;
//   padding: 10px;
// }
// .v-dialog > .v-card > .v-card__actions {
//   border: 2px solid #663019;
//   background: #e28637;
//   border-top: none;
//   display: flex;
//   flex-direction: row;
//   justify-content: right;
//   justify-content: end;
//   align-content: flex-end;
// }

// form {
//   background: #ffefa3;
//   border-bottom-right-radius: 10px;
//   border-bottom-left-radius: 10px;
//   border: none;
//   padding: 0px !important;

//   .field {
//     width: auto;
//     position: relative;
//     &.submit {
//       margin-top: 0px;
//     }
//     button.btn {
//       height: 35px;
//       width: 35px;
//     }
//     input {
//       height: 100%;
//       width: 100%;
//       outline: none;
//       font-size: 17px;
//       padding-left: 5px;
//       border: 1px solid lightgrey;
//       border-radius: 4px;
//       transition: all 0.3s ease;
//       background: #fff;
//       &.v-input {
//         z-index: 999999999;
//         height: 35px;
//         border: 1px solid #e28637;
//         color: #663019 !important;
//         &.text-danger {
//           color: red !important;
//           font-size: 15px;
//         }
//       }
//       &.input-btn {
//         width: 40px;
//         padding: 10px;
//         text-align: center;
//         &.btn-color {
//           padding: 0px;
//         }
//       }
//     }
//     select {
//       height: 100%;
//       width: 100%;
//       outline: none;
//       font-size: 17px;
//       padding-left: 5px;
//       border: 1px solid #e28637 !important;
//       border-radius: 4px;
//       transition: all 0.3s ease;
//       // background: #fff;
//       .custom-select {
//         z-index: 999999999;
//         height: 35px;
//         border: 1px solid #e28637 !important;
//         color: #663019 !important;
//       }
//     }
//     input[type="submit"],
//     .btn-login {
//       width: 100%;
//       border-radius: 20px;
//       color: #ffcf9c !important;
//       border: none;
//       padding-left: 0;
//       // font-size: 20px;
//       font-weight: 500;
//       cursor: pointer;
//       background: linear-gradient(-135deg, #e28637, #561d00);
//       transition: all 0.3s ease;
//       span {
//         color: #ffcf9c !important;
//       }
//     }
//   }
// }

// form {
//   padding: 10px;
// }

// .form-input {
//   border: 1px solid #333;
//   width: 100%;
//   height: 50px;
//   padding: 0 0px;
//   transform: 0.25s ease;
//   margin-bottom: 10px;
// }

// .form-input:focus {
//   border-color: blue;
// }
// .flex-wrap {
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap !important;
// }
</style>