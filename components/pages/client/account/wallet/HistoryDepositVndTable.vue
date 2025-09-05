<template>
  <client-only>
    <div class="page-body">
      <label v-if="user" for=""
        ><i class="mdi mdi-history"></i> Lịch sử nạp ATM-MOMO của
        <font color="red">{{ user.name }}</font></label
      ><br />
      <small id="fileHelp" class="form-text text-muted"
        >Xem lại các Giao dịch gần nhất.</small
      >
      <div class="table-responsive">
        <table style="font-size: 14px" class="table table-striped table-border">
          <thead>
            <tr>
              <th class="trading-code">Mã GD</th>
              <th class="info-history">Tiền nạp</th>
              <th v-if="!isMobile" class="info-history">Thời gian</th>
              <th class="info-history">Trạng thái</th>
              <th class="holder-action">Chi tiết</th>
            </tr>
          </thead>
          <tbody v-if="histories.length">
            <tr v-for="(history, index) in histories" :key="index">
              <td class="text-middle">#{{ history.id }}</td>

              <td class="text-middle">
                {{ format_number(history.amount) }} đ
              </td>
              <td v-if="!isMobile" class="text-middle">
                {{ history.created_at }}
              </td>
              <td class="text-middle">
                <Status :value="history.status"></Status>
              </td>
              <td class="text-middle">
                <v-btn
                  color="info"
                  class="btn-sm pd-10px"
                  @click="$emit('show', history)"
                >
                  Xem
                </v-btn>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="!histories.length" class="text-center">
        <span>Bạn chưa có giao dịch nào!</span>
      </div>
    </div>
  </client-only>
</template>

<script>
import Status from "@/components/global/molecules/common/Status";
export default {
  components: {
    Status,
  },
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

