<template>
  <client-only>
    <div class="page-body">
      <div class="page-info">
        <label
          ><i class="mdi mdi-table"></i> Bảng phí Giao dịch Trung gian </label
        ><br />
        <small id="fileHelp" class="form-text text-muted text-warning"
          >Phí GDTG sẽ phụ thuộc vào Giá trị và Thời gian giao dịch.</small
        >
        <div class="table-responsive">
          <table
            style="font-size: 14px"
            class="table table-striped table-border"
          >
            <thead>
              <tr>
                <th class="info-history">Giá trị</th>
                <th class="info-history">Phí GD</th>
                <th class="info-history">Phí GD sau 23h</th>
              </tr>
            </thead>
            <tbody v-if="histories.length">
              <tr v-for="(history, index) in histories" :key="index">
                <template v-if="history.type === 'other'">
                  <td class="text-middle">
                    {{ history.from }}
                  </td>
                  <td class="text-middle text-success">
                    {{ history.fee }}% Giá trị
                  </td>
                  <td class="text-middle text-warning">
                    {{ history.fee_2 }}% Giá trị
                  </td>
                </template>
                <template v-else>
                  <td class="text-middle">
                    {{ format_number(history.from) }} ->
                    {{ format_number(history.to) }} đ
                  </td>
                  <td class="text-middle text-success">
                    {{ format_number(history.fee) }} đ
                  </td>
                  <td class="text-middle text-warning">
                    {{ format_number(history.fee_2) }} đ
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
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
  },
};
</script>

