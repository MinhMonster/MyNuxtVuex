<template>
  <client-only>
    <div class="table-responsive page-body">
      <label v-if="user" for=""
        ><i class="mdi mdi-history"></i> Lịch sử nạp ATM-MOMO của
        <font color="red">{{ user.name }}</font></label
      ><br />
      <small id="fileHelp" class="form-text text-muted"
        >Xem lại các Giao dịch gần nhất.</small
      >
      <table style="font-size: 14px" class="table table-striped table-border">
        <thead>
          <tr>
            <th class="trading-code">Mã GD</th>
            <th class="info-history">Mô Tả</th>
            <th class="holder-action">Chi tiết</th>
          </tr>
        </thead>
        <tbody v-if="histories.length">
          <tr v-for="(history, index) in histories" :key="index">
            <td class="text-middle">{{ history.ID }}</td>

            <td class="text-middle text-left">
              <v-row>
                <v-col :cols="12" :sm="6" :md="2" :lg="2">
                  <i class="mdi mdi-google-circles-group"></i>:
                  {{ format_number(history.moneyAmount) }} đ
                </v-col>
                <v-col :cols="12" :sm="6" :md="2" :lg="2">
                  <i class="mdi mdi-cart-plus"></i>:
                  {{ format_number(history.moneyReceived) }} đ
                </v-col>
                <v-col :cols="12" :sm="6" :md="2" :lg="2">
                  <i class="mdi mdi-bank"></i>: {{ history.walletType }}
                </v-col>
                <v-col :cols="12" :sm="6" :md="2" :lg="2">
                  <i class="mdi mdi-account"></i>: {{ history.bankAccountName }}
                </v-col>
                <v-col :cols="12" :sm="6" :md="2" :lg="2">
                  <i class="mdi mdi-credit-card"></i>:
                  {{ history.bankAccountNumber }}
                </v-col>
                <v-col :cols="12" :sm="6" :md="2" :lg="2">
                  <v-btn
                    :color="class_status(history.depositState)"
                    class="btn-sm pd-5px"
                  >
                    {{ history.depositState }}
                  </v-btn>
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

