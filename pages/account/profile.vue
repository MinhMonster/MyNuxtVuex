<template>
  <client-only>
    <HomePage
      :title="title"
      content="Cập nhật thông tin của bạn tại đây"
      full-screen
      :loading="!ready"
      goBack
      reload
      @reload="fetchAccount()"
    >
      <template v-if="token && user && ready" #body>
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
                <td class="mua-nick break-all">
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
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";

import Loading from "@/components/global/molecules/common/Loading";

import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");

export default {
  layout: "clientLayout",

  components: {
    Loading,
    HomePage,
  },
  computed: {
    ...mapFields("global", { ready: "ready" }),
    ...mapState(["token", "user"]),
  },
  async mounted() {
    if (!this.token) {
      await this.getToken();
      if (!this.token) {
        await this.logout();
        window.location.href = "/login";
      } else {
        window.location.href = "/account/profile";
      }
    } else {
      this.fetchAccount();
    }
  },
  methods: {
    ...mapActions(["logout", "fetchUser", "getToken"]),

    async fetchAccount() {
      this.ready = false;

      await this.fetchUser();

      this.ready = true;
    },
  },
  data() {
    return {
      title: "Thông tin Cá Nhân",
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.title },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.title },
        { property: 'og:image', content: '/banner.jpg' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#home-page {
  max-width: 800px;
}

.mua-nick {
  font-weight: 400;
  text-align: center;
  background: none;
}

.table {
  font-size: 15px;
}

.title {
  color: #561d00;
}

// .text-muted{
//    color: #663019 !important;
// }
.table th,
.table td {
  padding: 7px;
  vertical-align: middle;
}
</style>
