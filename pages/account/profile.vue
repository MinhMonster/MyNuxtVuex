<template>
  <client-only>
    <div v-if="user" id="home-page">
      <div class="account-box">
        <div class="wrapper">
          <div class="title">Thông tin Cá nhân</div>
          <!--<div class="title">-->
          <!--<center><h3>Thông tin Cá nhân</h3></center>-->
          <!--</div>-->
          <div class="account-body">
            <table class="table text-center">
              <tbody>
                <tr>
                  <th class="info-nick" style="width: 30%">ID</th>
                  <td class="mua-nick">
                    <span
                      ><strong>{{ format_number(user.id) }}</strong></span
                    >
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="width: 30%">Tên</th>
                  <td class="mua-nick">
                    <span
                      ><strong>{{ user.name }}</strong></span
                    >
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="width: 30%">Tài khoản</th>
                  <td class="mua-nick">
                    <span
                      ><strong>{{ user.username }} </strong>
                    </span>
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="width: 30%">Mật khẩu</th>
                  <td class="mua-nick">
                    <span><strong>*********</strong></span>
                  </td>
                </tr>

                <tr>
                  <th class="info-nick" style="">Số dư</th>
                  <td class="mua-nick">
                    <span
                      ><strong>{{ format_number(user.cash) }} VNĐ</strong></span
                    >
                  </td>
                </tr>

                <tr>
                  <th class="info-nick" style="">Số dư (CTV/GDV)</th>
                  <td class="mua-nick">
                    <span><strong> VNĐ</strong></span>
                  </td>
                </tr>

                <tr>
                  <th class="info-nick" style="">Số điện thoại</th>
                  <td class="mua-nick">
                    <span
                      ><strong
                        ><strong>{{ user.phone }}</strong></strong
                      ></span
                    >
                  </td>
                </tr>

                <tr>
                  <th class="info-nick" style="">Email</th>
                  <td class="break-all">
                    <span
                      ><strong
                        ><strong>{{ user.email }}</strong></strong
                      ></span
                    >
                  </td>
                </tr>
                <tr>
                  <th class="info-nick" style="">Cấp bậc</th>
                  <td class="mua-nick">
                    <span
                      ><strong
                        ><strong>{{
                          user.admin ? "Admin" : "Thành Viên"
                        }}</strong></strong
                      ></span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div id="next-bottom"></div>
    </div>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("home/users");
import mixins from "@/mixins/index";

export default {
  layout: "clientLayout",
  mixins: [mixins],

  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapFields("global", {}),
    ...mapFields("home/game/ninjas", {}),
    ...mapState(["token", "user"]),
  },
  async mounted() {
    if (!this.token) {
      this.$router.push("/login");
    }
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
</style>