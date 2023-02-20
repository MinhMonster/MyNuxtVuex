<template>
  <client-only v-if="finance">
    <div class="">
      <v-row align="center">
        <v-col>
          <v-card-title>Year: {{ this.finance.year }}</v-card-title>
        </v-col>
        <!-- <v-spacer /> -->
        <v-col
          ><v-btn
            class="right mgr-15px"
            color="primary"
            :to="`/admin/finances/${this.year}/new`"
            >Thêm mới
          </v-btn>
        </v-col>
      </v-row>

      <div id="body-admin">
        <div v-if="!finance" class="">
          <div class=""></div>
        </div>
        <v-simple-table class="table table-default text-center">
          <template v-slot:default>
            <thead>
              <tr class="w-100">
                <th class="w-10">Month</th>

                <th class="w-90 padding-none">
                  <v-simple-table>
                    <thead>
                      <tr class="w-100">
                        <th class="w-25">Day</th>
                        <th class="w-25">Revenue</th>
                        <th class="w-25">Expense</th>
                        <th class="w-25">Income</th>
                      </tr>
                    </thead>
                  </v-simple-table>
                </th>
              </tr>
            </thead>
            <draggable
              v-if="finance"
              v-model="listFinances"
              ghost-class="ghost"
              @change="changeFinances"
              class="sub-table"
              handle=".handle-items"
              tag="tbody"
            >
              <tr
                v-for="(item, index) in listFinances"
                :key="index"
                class="table-main"
              >
                <td class="handle-items">
                  <nuxt-link :to="`/admin/finances/${item.ID}/edit`">{{
                    item.title
                  }}</nuxt-link>
                  <br />
                  <v-btn
                    light
                    icon
                    :to="`/admin/finances/${item.year}/${item.month}/new`"
                  >
                    <v-icon>mdi-plus-box-multiple-outline</v-icon>
                  </v-btn>
                </td>
                <td class="text-left padding-none">
                  <v-simple-table class="table-hidden-boder">
                    <draggable
                      v-model="item.items"
                      @change="changeFinances"
                      handle=".handle-li"
                      tag="tbody"
                    >
                      <tr v-for="info in item.items" :key="info.ID">
                        <td class="w-25 handle-li">
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
                          {{ format_number(sumCashRevenues(item.items)) }}
                        </td>
                        <td class="finances-expenses">
                          {{ format_number(sumCashExpenses(item.items)) }}
                        </td>
                        <td :class="colorText(sumCashIncome(item.items))">
                          {{ format_number(sumCashIncome(item.items)) }}
                        </td>
                      </tr>
                      <tr>
                        <td class="bg-dark">Trung Bình</td>
                        <td>
                          {{ format_number(averageRevenues(item.items)) }}
                        </td>
                        <td>
                          {{ format_number(averageExpenses(item.items)) }}
                        </td>
                        <td>{{ format_number(averageIncome(item.items)) }}</td>
                      </tr>
                    </draggable>
                  </v-simple-table>
                  <FinanceChart :listData="item.items"></FinanceChart>
                  <FinanceBarChart :listData="item.items"></FinanceBarChart>
                  <FinancePieChart :listData="item.items"></FinancePieChart>

                </td>
              </tr>
            </draggable>
          </template>
        </v-simple-table>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import draggable from "vuedraggable";
import { mapActions, mapState } from "vuex";
import mixins from "@/mixins/index";
import FinanceChart from "@/components/pages/admin/finances/chart/FinanceChart.vue";
import FinanceBarChart from "@/components/pages/admin/finances/chart/FinanceBarChart.vue";
import FinancePieChart from "@/components/pages/admin/finances/chart/FinancePieChart.vue";

export default {
  mixins: [mixins],
  layout: "adminDev",
  components: {
    draggable,
    FinanceChart,
    FinanceBarChart,
    FinancePieChart
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
  name: "finances",
  data() {
    return {
      listFinances: [],
    };
  },
  async mounted() {
    await this.get_finance({
      params: {
        year: this.year,
      },
    });
    this.listFinances = _.cloneDeep(this.finance.items);
  },
  computed: {
    ...mapState("admin/finances/edit", ["finance"]),
    ...mapFields("admin/finances/edit", ["finances"]),

    year() {
      return this.$route.params.year;
    },
    // listFinances() {
    //   return _.cloneDeep(this.finance.items)
    // }
  },
  methods: {
    ...mapActions("admin/finances/edit", ["get_finance", "change_positions"]),

    changeFinances(event) {
      this.updatePositionFinances(event.moved.element.ID, event.moved.newIndex);
    },
    updatePositionFinances(id, newIndex) {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("newIndex", newIndex);
      this.change_positions(formData);
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
    // time_10(time) {
    //   return time < 10 ? "0" + time : time;
    // }
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
.theme--dark.v-data-table {
  background: none;
}

tr.table-main {
  border-bottom: 2px solid #333;
}

tr.table-main > td {
  border: 2px solid #333 !important;
}

/* .sub-table tr td:first-child{
  border-right: 2px solid #333 !important;;
} */

element.style {
}
#admin .table td {
  border: 1px solid var(--admin-table-border);
}
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

#admin .table .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 20px;
  font-size: 12.5px;
}

#admin .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  padding: 0 3px;
}
</style>