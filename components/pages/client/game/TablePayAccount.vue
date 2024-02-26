<template>
  <table class="table">
    <tbody class="panel">
      <tr>
        <th class="info-nick">Mã Số:</th>
        <td class="mua-nick">
          <span>{{ format_number(account.ID) }}</span>
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
          <span>{{ game }}</span>
        </td>
      </tr>
      <tr>
        <th class="info-nick">Giá tiền:</th>
        <td class="mua-nick">
          <span>{{ format_number(price) }} Card</span>
        </td>
      </tr>
      <tr>
        <th class="info-nick">
          ATM-MOMO: <br v-if="account.saleOff" />
          {{ account.saleOff ? "(Giảm giá: " + account.saleOff + "%)" : "" }}
        </th>
        <td class="mua-nick">
          <span :class="{ 'text-line-middel': account.saleOff }"
            >{{ cash_atm(price) }} ATM - MOMO</span
          >
          <div
            v-if="account.saleOff"
            style="
              width: 100%;
              height: 1px;
              background-color: #a4a4a4;
              margin-top: 5px;
              margin-bottom: 5px;
            "
          ></div>
          <span v-if="account.saleOff"
            >{{ cash_atm(price * (1 - account.saleOff / 100)) }} ATM -
            MOMO</span
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  props: {
    account: {
      type: Object,
      default: () => {},
    },
    game: {
      type: String,
      default: "",
    },
  },
  computed: {
    price() {
      return this.account.giatien || this.account.price;
    },
  },
};
</script>