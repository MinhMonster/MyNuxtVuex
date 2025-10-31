<template>
  <table class="table">
    <tbody class="panel">
      <tr>
        <th class="info-nick w-50">Mã Số</th>
        <td class="mua-nick w-50">
          <span>{{ format_number(account.ID) }}</span>
        </td>
      </tr>
      <tr>
        <th class="info-nick">Đất</th>
        <td class="mua-nick">
          <span>{{ account.dat }}</span>
        </td>
      </tr>
      <tr>
        <th class="info-nick">Gà</th>
        <td class="mua-nick">
          <span>{{ account.ga }}</span>
        </td>
      </tr>
      <tr>
        <th class="info-nick">Cá</th>
        <td class="mua-nick">
          <span>{{ account.ca }}</span>
        </td>
      </tr>
      <tr>
        <th class="info-nick">Chi tiết</th>
        <td class="mua-nick">
          <div v-html="account.thongtin"></div>
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
  },
};
</script>
