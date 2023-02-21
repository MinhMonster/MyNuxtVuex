<template>
  <client-only v-if="data">
    <div>
      <v-row align="center">
        <v-col>
          <v-card-title class="mgl--15px"
            >{{ this.month }}/{{ this.year }}
          </v-card-title>
        </v-col>
        <v-col>
          <PreNextMonthBtn></PreNextMonthBtn>
        </v-col>
        <v-col>
          <v-btn
            icon
            class="right primary"
            :to="`/admin/finances/${this.year}/${this.month}/new`"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <v-card>
            <v-simple-table class="table text-center mgb--10px">
              <template v-slot:default>
                <thead>
                  <tr class="w-100">
                    <th class="w-25">Day</th>
                    <th class="w-25">Revenue</th>
                    <th class="w-25">Expense</th>
                    <th class="w-25">Income</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(info, index) in data"
                    :key="index"
                    class="table-main"
                  >
                    <td class="w-25 handle-items">
                      <nuxt-link
                        :to="`/admin/finances/${info.year}/${time_10(
                          info.month
                        )}/${time_10(info.day)}`"
                        >{{
                          time_10(info.day) +
                          "/" +
                          time_10(info.month) +
                          "/" +
                          time_10(info.year)
                        }}</nuxt-link
                      >
                    </td>
                    <td class="w-25 middle">
                      {{ format_number(info.sum_cash_revenues) }}
                    </td>
                    <td class="w-25">
                      {{ format_number(info.sum_cash_expenses) }}
                    </td>
                    <td class="w-25" :class="colorText(info.income)">
                      {{ format_number(info.income) }}
                    </td>
                  </tr>
                  <tr>
                    <td class="bg-dark">Tổng</td>
                    <td class="finances-revenues">
                      {{ format_number(sumCashRevenues(data)) }}
                    </td>
                    <td class="finances-expenses">
                      {{ format_number(sumCashExpenses(data)) }}
                    </td>
                    <td :class="colorText(sumCashIncome(data))">
                      {{ format_number(sumCashIncome(data)) }}
                    </td>
                  </tr>
                  <tr>
                    <td class="bg-dark">Trung Bình</td>
                    <td>
                      {{ format_number(averageRevenues(data)) }}
                    </td>
                    <td>
                      {{ format_number(averageExpenses(data)) }}
                    </td>
                    <td>{{ format_number(averageIncome(data)) }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-card light class="mgb-15px">
            <FinanceChart :listData="data"></FinanceChart>
          </v-card>
          <v-card light class="mgb-15px">
            <FinanceBarChart :listData="data"></FinanceBarChart>
          </v-card>

          <FinancePieChart :listData="data"></FinancePieChart>
        </v-col>
      </v-row>
    </div>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import mixins from "@/mixins/index";
import FinanceChart from "@/components/pages/admin/finances/chart/FinanceMonthChart.vue";
import FinanceBarChart from "@/components/pages/admin/finances/chart/FinanceBarChart.vue";
import FinancePieChart from "@/components/pages/admin/finances/chart/FinancePieChart.vue";
import PreNextMonthBtn from "@/components/pages/admin/finances/btn/PreNextMonthBtn.vue";

export default {
  mixins: [mixins],
  layout: "adminDev",
  components: {
    FinanceChart,
    FinanceBarChart,
    FinancePieChart,
    PreNextMonthBtn,
  },
  head() {
    return {
      title: "Admin: finances",
      meta: [
        {
          hid: "Admin: finances",
          name: "Admin: finances",
          content: "Admin: finances",
        },
      ],
    };
  },
  name: "FinanceMonth",
  data() {
    return {
      data: _.cloneDeep(this.financeMonth),
    };
  },
  async mounted() {
    await this.fetFinanceMonth({
      params: {
        year: this.year,
        month: this.month,
      },
    });
    this.data = _.cloneDeep(this.financeMonth);
  },
  computed: {
    ...mapFields("admin/finances/edit", ["financeMonth"]),
    month() {
      return this.$route.params.month;
    },
    year() {
      return this.$route.params.year;
    },
  },
  methods: {
    ...mapActions("admin/finances/edit", ["fetFinanceMonth"]),

    changeFinances(event) {
      this.updatePositionFinances(event.moved.element.ID, event.moved.newIndex);
    },

    sumCashRevenues(items) {
      let sum = 0;
      for (let i = 0; i < items.length; i++) {
        sum += Number(items[i].sum_cash_revenues);
      }
      return sum;
    },

    sumCashExpenses(items) {
      let sum = 0;
      for (let i = 0; i < items.length; i++) {
        sum += Number(items[i].sum_cash_expenses);
      }
      return sum;
    },
    sumCashIncome(items) {
      let sum = 0;
      for (let i = 0; i < items.length; i++) {
        sum += Number(items[i].income);
      }
      return sum;
    },
    colorText(number) {
      let color = "";
      if (number < 0) {
        color = "text-danger";
      } else if (number > 0) {
        color = "text-primary";
      } else {
        color = "text-warning";
      }
      return color;
    },
    averageExpenses(items) {
      return (this.sumCashExpenses(items) / items.length).toFixed();
    },
    averageRevenues(items) {
      return (this.sumCashRevenues(items) / items.length).toFixed();
    },
    averageIncome(items) {
      return (this.sumCashIncome(items) / items.length).toFixed();
    },
  },
};
</script>
<style scoped>
#admin td ul li {
  padding: 10px 0;
}

.list-group-item,
.handle-items,
.handle-li {
  cursor: move;
}

/* .v-data-table > .v-data-table__wrapper > table > tbody > tr > td{
  padding: 0px;
} */

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td.padding-none,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th.padding-none {
  padding: 0px !important;
}

.hidden-border {
  border: none !important;
}

.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td.padding-none
  tr
  td:last-child {
  border-right: none !important;
}
.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td.padding-none
  tr
  td:first-child {
  border-left: none !important;
}

.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td.padding-none
  tr:last-child
  td {
  border-bottom: none !important;
}

.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td.padding-none
  tr:first-child
  td {
  border-top: none !important;
}

#admin
  .v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:nth-child(even)
  td {
  background: white !important;
}

#admin .v-data-table > .v-data-table__wrapper > table > tbody > tr td {
  border: none !important;
}
.theme--dark.v-data-table {
  background: white;
}

/* tr.table-main {
  border-bottom: 2px solid #333;
} */

/* tr.table-main > td {
  border: 2px solid #333 !important;
} */

/* .sub-table tr td:first-child{
  border-right: 2px solid #333 !important;;
} */

element.style {
}
/* #admin .table td {
  border: 1px solid var(--admin-table-border);
} */
#admin td.bg-dark {
  color: #333 !important;
  font-weight: 800;
  text-align: center;
}

.table.text-center tr,
.table.text-center th,
.table.text-center td {
  text-align: center !important;
}

#admin .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 25px;
  font-size: 13.5px;
}

#admin .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  padding: 0 4px;
}
</style>