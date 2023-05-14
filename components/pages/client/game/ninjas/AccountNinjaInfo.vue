
<template>
  <client-only>
    <div v-if="accountNinja">
      <div class="title">
        <center><h3>Thông tin chi tiết</h3></center>
      </div>

      <table class="table text-center">
        <tbody>
          <tr>
            <th class="info-nick">Class</th>
            <td class="mua-nick">
              <span>Kunai</span>
            </td>
          </tr>

          <tr>
            <th class="info-nick" style="">Level</th>
            <td class="mua-nick">
              <span> 77</span>
            </td>
          </tr>

          <tr>
            <th class="info-nick" style="">Vũ Khí</th>
            <td class="mua-nick">
              <span>10</span>
            </td>
          </tr>

          <tr>
            <th class="info-nick" style="">Đồ</th>
            <td class="mua-nick">
              <span>6đ10 2đ8</span>
            </td>
          </tr>

          <tr>
            <th class="info-nick" style="">Server</th>
            <td class="mua-nick">
              <span>Shuriken + Tessen</span>
            </td>
          </tr>
          <tr>
            <th class="info-nick" style="">Chi tiết</th>
            <td class="mua-nick">
              <span>vk10, 6đ10 2đ8, 15m.yên, 1 sách, sv23 </span>
            </td>
          </tr>
          <tr>
            <th class="info-nick" style="">
              <div style="margin: 10px"></div>

              Giá Bán
            </th>
            <td class="mua-nick">
              <span>120.000 Card </span>
              <div
                style="
                  width: 100%;
                  height: 1px;
                  background-color: #a4a4a4;
                  margin-top: 5px;
                  margin-bottom: 5px;
                "
              ></div>
              <span>100.000 ATM - MOMO</span>
            </td>
          </tr>
        </tbody>
      </table>
      <b-row>
        <b-col cols="6">
          <a
            class="c-font-uppercase btnCheckAccount ajax"
            href="/purchase/ninja/12155.html"
          >
            <div class="btn-buy-account">
              <div class="tom-mua-title">Mua ngay</div>
              <div class="tom-mua-giatien"></div>
            </div>
          </a>
        </b-col>

        <b-col cols="6">
          <a href="#" data-toggle="modal" data-target=".atm-momoo">
            <div class="btn-buy-account-hover">
              <div class="tom-mua-title">ATM MOMO</div>
              <div class="tom-mua-giatien"></div>
            </div>
          </a>
        </b-col>

        <b-col cols="6">
          <a href="#" data-toggle="modal" data-target=".tragop">
            <div class="btn-buy-account-hover">
              <div class="tom-mua-title">Mua Trả Góp</div>
              <div class="tom-mua-giatien"></div>
            </div>
          </a>
        </b-col>

        <b-col cols="6">
          <a href="https://zalo.me/0961646828">
            <div class="panel mua-nick">
              <div class="tom-mua-title">Inbox Admin</div>
              <div class="tom-mua-giatien"></div>
            </div>
          </a>
        </b-col>
      </b-row>
    </div>
  </client-only>
</template>
  
  <script>
import mixins from "@/mixins/index";
import AccountNinjaCard from "@/components/pages/client/game/ninjas/AccountNinjaCard";
import Loading from "@/components/global/molecules/common/Loading";
export default {
  name: "AccountNinjaList",
  mixins: [mixins],

  components: { AccountNinjaCard, Loading },
  props: {
    accountNinja: {
      type: Object,
      default: () => {},
    },
  },
  async mounted() {
    console.log(this.accountNinja);
  },
  computed: {},
  methods: {},
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
</style>
