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
              <b-row>
                
                <b-col :cols="12" :sm="6" :md="2" :lg="2">
                  <i class="mdi mdi-google-circles-group"></i>: {{ format_number(history.moneyAmount) }} đ
                </b-col>
                <b-col :cols="12" :sm="6" :md="2" :lg="2">
                  <i class="mdi mdi-cart-plus"></i>: {{ format_number(history.moneyReceived) }} đ
                </b-col>
                <b-col :cols="12" :sm="6" :md="2" :lg="2">
                  <i class="mdi mdi-bank"></i>: {{ history.walletType }}
                </b-col>
                <b-col :cols="12" :sm="6" :md="2" :lg="2">
                  <i class="mdi mdi-account"></i>: {{ history.bankAccountName }}
                </b-col>
                <b-col :cols="12" :sm="6" :md="2" :lg="2">
                  <i class="mdi mdi-credit-card"></i>:
                  {{ history.bankAccountNumber }}
                </b-col>
                <b-col :cols="12" :sm="6" :md="2" :lg="2">
                  <b-badge
                    :variant="class_status(history.depositState)"
                    class="text-white pd-5px"
                    >{{ history.depositState }}</b-badge
                  >
                </b-col>
              </b-row>
            </td>
            <td class="text-middle">
              <b-badge
                variant="info"
                class="text-white pd-10px"
                :to="`/account/wallet/deposit/vnd/${history.ID}`"
                >Xem</b-badge
              >
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
import Loading from "@/components/global/molecules/common/Loading";
import ButtonCoppy from "@/components/common/ButtonCoppy";
import mixins from "@/mixins/index";
import ModalPayload from "@/components/common/ModalPayload";

import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");

export default {
  mixins: [mixins],
  layout: "clientLayout",
  components: {
    Loading,
    ButtonCoppy,
    ModalPayload,
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
  data() {
    return {
      isShow: false,
      isLoading: false,
      isCheck: false,
      moneyReceived: 0,
      isFailed: false,
    };
  },

  computed: {},
  mounted() {},
  methods: {},
};
</script>
