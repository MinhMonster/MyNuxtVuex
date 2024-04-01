<template>
  <client-only>
    <div class="table-responsive page-body">
      <div v-if="user" class="title">
        <i class="mdi mdi-history"></i>Lịch sử nạp thẻ của bạn
      </div>

      <h4 id="fileHelp" class="form-text text-muted"
        >Xem lại các Giao dịch gần nhất.</h4
      >
      <table style="font-size: 14px" class="table table-striped table-border">
        <thead>
          <tr>
            <th class="info-history text-middle">Mô Tả</th>
            <th class="holder-action">Chi tiết</th>
          </tr>
        </thead>
        <tbody v-if="histories.length">
          <tr v-for="(history, index) in histories" :key="index">
            <td class="text-middle text-left">
              <v-row>
                <v-col :cols="12" :sm="6" :md="4" :lg="2">
                  {{ history.telco }}
                </v-col>
                <v-col :cols="12" :sm="6" :md="4" :lg="2">
                  {{ format_number(history.amount) }} đ
                </v-col>
                <v-col :cols="12" :sm="6" :md="4" :lg="2">
                  Mã: {{ history.code }}
                </v-col>
                <v-col :cols="12" :sm="6" :md="4" :lg="2">
                  Serial: {{ history.serial }}
                </v-col>

                <v-col :cols="12" :sm="6" :md="4" :lg="2">
                  <v-btn
                    :color="history.status.value"
                    size="sm"
                    class="btn-sm pd-5px"
                    >{{ history.status.text }}
                  </v-btn>
                </v-col>
                <v-col :cols="12" :sm="6" :md="4" :lg="2">
                  {{ history.createAt }}
                </v-col>
              </v-row>
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
<style lang="scss" scoped>
#home-page table.table tbody tr td .col-sm-12,
#home-page table.table tbody tr td .col-md-6,
#home-page table.table tbody tr td .col-lg-3 {
  padding: 12px;
}
</style>
