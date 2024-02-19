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
        <th class="info-nick">Class:</th>
        <td class="mua-nick">
          <span>{{ classNinja(account.class) }}</span>
        </td>
      </tr>
      <tr>
        <th class="info-nick">Level:</th>
        <td class="mua-nick">
          <span>{{ account.level }}</span>
        </td>
      </tr>
      <tr>
        <th class="info-nick">Server:</th>
        <td class="mua-nick">
          <span>{{ serverNinja(account.server) }}</span>
        </td>
      </tr>
      <tr>
        <th class="info-nick">Chi tiết:</th>
        <td class="mua-nick">
          <span> {{ account.thongtin }} </span>
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