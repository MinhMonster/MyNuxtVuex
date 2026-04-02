<template>
  <table class="table text-center">
    <tbody>
      <tr v-if="!showMore">
        <td colspan="2" class="btn-next-more" @click="showMore = true">
          <BaseSvg
            button
            name="skip"
            content="Xem thêm Thông tin chi tiết"
            variant="danger"
          />
        </td>
      </tr>
      <tr
        v-for="(row, index) in accountInfos"
        :key="'row-' + index"
        v-show="showMore && !row.hidden"
      >
        <th class="info-nick">
          {{ row.label }}
        </th>
        <td class="mua-nick" :class="row.class">
          <Status v-if="row.type === 'status'" :value="row.value" />
          <template v-else-if="!row.html">
            {{ row.value }}
          </template>
          <span v-else v-html="row.value"></span>
          <ButtonCoppy v-if="row?.copy" :content="row.value" />
        </td>
      </tr>
      <slot>
        <PriceAccount v-if="!hiddenPrice" :account="account" />
      </slot>

      <!-- Payment Info (Refactored) -->
      <template v-if="paymentRows.length">
        <tr v-for="(row, i) in paymentRows" :key="'payment-' + i">
          <th class="info-nick">{{ row.label }}</th>
          <td class="mua-nick">
            <span :class="row.class">
              {{ row.value }}
              <template v-if="row.isMoney !== false"> Vnđ</template>
            </span>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
import PriceAccount from "@/components/common/client/table/PriceAccount";
import ButtonCoppy from "@/components/common/ButtonCoppy";
import Status from "@/components/global/molecules/common/Status";

export default {
  name: "AccountInfoTable",
  components: {
    PriceAccount,
    ButtonCoppy,
    Status,
  },

  props: {
    account: {
      type: Object,
      default: () => null,
    },
    accountInfos: {
      type: Array,
      required: true,
    },
    isShow: {
      type: Boolean,
      default: true,
    },
    purchaseType: {
      type: String,
      default: "normal", // normal | installments | deposit
    },
    hiddenPrice: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      showMore: true,
      now: new Date(),
      timer: null,
    };
  },
  watch: {
    isMobile: {
      async handler(newValue, oldValue) {
        this.handleShowMore();
      },
    },
  },
  created() {
    this.handleShowMore();
  },

  mounted() {
    this.timer = setInterval(() => {
      this.now = new Date();
    }, 60000);
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },

  computed: {
    deadline() {
      if (!this.account) return null;

      const baseTime = new Date();

      if (this.purchaseType === "deposit") {
        return new Date(baseTime.getTime() + 7 * 24 * 60 * 60 * 1000);
      }

      if (this.purchaseType === "installments") {
        const d = new Date(baseTime);
        const day = d.getDate();

        d.setMonth(d.getMonth() + 1);

        // fix overflow cuối tháng
        if (d.getDate() < day) {
          d.setDate(0);
        }

        return d;
      }

      return null;
    },

    paymentRows() {
      if (!this.account) return [];

      const price = this.account.price || 0;

      if (this.purchaseType === "deposit") {
        const deposit = this.account.deposit_price || 0;

        return [
          {
            label: "Số tiền đặt cọc",
            value: this.format_number(deposit),
            class: "text-warning",
          },
          {
            label: "Số tiền còn lại",
            value: this.format_number(price - deposit),
          },
          {
            label: "Hoàn tiền khi huỷ",
            value: this.format_number(deposit * 0.2),
          },
          {
            label: "Hạn thanh toán",
            value: this.formatDateTime(this.deadline),
            isMoney: false,
          },
        ];
      }

      if (this.purchaseType === "installments") {
        const paid = this.account.installments_price || 0;

        return [
          {
            label: "Thanh toán lần 1",
            value: this.format_number(paid),
            class: "text-warning",
          },
          {
            label: "Số tiền còn lại",
            value: this.format_number(price - paid),
          },
          {
            label: "Hoàn tiền khi huỷ",
            value: this.format_number(paid * 0.5),
          },
          {
            label: "Hạn thanh toán",
            value: this.formatDateTime(this.deadline),
            isMoney: false,
          },
        ];
      }

      return [];
    },
  },
  methods: {
    handleShowMore() {
      if (!this.isShow && this.isMobile) {
        this.showMore = false;
      } else {
        this.showMore = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
th.info-nick {
  vertical-align: middle;
  width: 50%;
  padding: 3px 7px;
  color: #ffcf9c;
  border: 1px solid #663019;
  background: #e28637;
}

td.mua-nick {
  padding: 6.5px;
  vertical-align: middle;
  color: #663019;
  border: 1px solid #663019;
  background: #ffcf9c;
  text-align: center;
}

.table td {
  padding: 5px;
  border: 1px solid #e28637;
}

.mua-nick span {
  font-size: 14px;
  color: #663019;
}
</style>
