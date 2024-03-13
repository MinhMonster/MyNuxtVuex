<template>
  <client-only>
    <div class="table-responsive page-body">
      <label v-if="user">
        <i class="mdi mdi-history"></i> Lịch sử tham gia Sự kiện Hằng ngày của
        bạn:
      </label>
      <label v-else class="text-danger">
        Hãy đăng nhập để xem lịch sử tham gia Sự kiện của bạn
      </label>
      <br />
      <table style="font-size: 14px" class="table table-striped table-border">
        <thead>
          <tr>
            <th class="trading-code">Số đã chọn</th>
            <th class="trading-code">Số điện thoại</th>
            <th class="info-history">Ngày tham gia</th>
          </tr>
        </thead>
        <tbody v-if="histories.length">
          <tr v-for="(history, index) in histories" :key="index">
            <td class="text-middle">{{ history.number }}</td>
            <td class="text-middle">{{ history.phone }}</td>
            <td class="text-middle">{{ history.time }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="!histories.length" class="text-center">
        <span>Bạn chưa có giao dịch nào!</span>
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  props: {
    histories: {
      type: Array,
      default: () => [],
    },
    user: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
