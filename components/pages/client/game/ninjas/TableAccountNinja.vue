<template>
  <table class="table">
    <tbody class="panel">
      <tr>
        <th class="info-nick w-50">Mã Số:</th>
        <td class="mua-nick w-50">
          <span>{{ format_number(account.code) }}</span>
        </td>
      </tr>
      <tr>
        <th class="info-nick">Lớp:</th>
        <td class="mua-nick">
          <span>{{ classNinja(account.class) }}</span>
        </td>
      </tr>
      <tr>
        <th class="info-nick">Cấp độ:</th>
        <td class="mua-nick">
          <span>{{ account.level }}</span>
        </td>
      </tr>
      <tr>
        <th class="info-nick">Máy chủ:</th>
        <td class="mua-nick">
          <span>{{ serverNinja(account.server) }}</span>
        </td>
      </tr>
      <tr>
        <th class="info-nick">Chi tiết:</th>
        <td class="mua-nick">
          <span v-html="account.description"></span>
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
