<template>
  <table class="table">
    <tbody class="panel">
      <tr>
        <th class="info-nick">Mã Số</th>
        <td class="mua-nick">
          <span>{{ format_number(account.ID) }}</span>
        </td>
      </tr>
      <tr>
        <th class="info-nick">Sức mạnh</th>
        <td class="mua-nick">
          <span>{{ account.power }}</span>
        </td>
      </tr>
      <tr>
        <th class="info-nick">Đệ tử</th>
        <td class="mua-nick">
          <span>{{ account.practitioners }}</span>
        </td>
      </tr>
      <tr>
        <th class="info-nick">Server</th>
        <td class="mua-nick">
          <span>{{ account.server }} Sao</span>
        </td>
      </tr>
      <tr>
        <th class="info-nick">Hành tinh</th>
        <td class="mua-nick">
          <span> {{ account.planet }} </span>
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