<template>
  <client-only>
    <div class="table-responsive page-body">
      <div v-if="user" class="title">
        <i class="mdi mdi-history"></i>Lịch sử nạp thẻ của bạn
      </div>

      <small id="fileHelp" class="form-text text-muted"
        >Xem lại các Giao dịch gần nhất.</small
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
                    class="text-white pd-5px"
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
                class="text-white pd-10px"
                :to="`/account/wallet/deposit/card/${history.ID}`"
                >Xem
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
<style lang="scss" scoped>
#home-page table.table tbody tr td .col-sm-12,
#home-page table.table tbody tr td .col-md-6,
#home-page table.table tbody tr td .col-lg-3 {
  padding: 12px;
}
</style>
