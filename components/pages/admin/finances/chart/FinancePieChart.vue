<template>
  <section>
    <v-row>
      <v-col cols="12" md="4" sm="4">
        <v-card light>
          <PieChart :data="data_1" :options="options_1" />
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <v-card light>
          <PieChart :data="data_2" :options="options_2" />
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <v-card light>
          <PieChart :data="data_3" :options="options_3" />
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import PieChart from "@/components/pages/admin/finances/chart/PieChart.vue";

export default {
  components: { PieChart },

  props: {
    listData: {
      type: Array,
      required: [],
    },
  },
  data() {
    return {
      data_1: {
        labels: this.listData.map((e) => Number(e.day)),
        datasets: [
          {
            data: this.listData.map((e) => Number(e.sum_cash_revenues)),
            label: "Doanh Thu",
            backgroundColor: [
              "red",
              "yellow",
              "#00D8FF",
              "black",
              "blue",
              "violet",
              "white",
              "#785643",
              "#998833",
              "#797979",
              "#kkllaa",
            ],
          },
        ],
      },
      data_2: {
        labels: this.listData.map((e) => Number(e.day)),
        datasets: [
          {
            data: this.listData.map((e) => Number(e.sum_cash_expenses)),
            label: "Chi Tiêu",
            backgroundColor: [
              "red",
              "yellow",
              "#00D8FF",
              "black",
              "blue",
              "violet",
              "white",
              "#785643",
              "#998833",
              "#797979",
              "#kkllaa",
            ],
          },
        ],
      },
      data_3: {
        labels: this.listData.map((e) => Number(e.day)),
        datasets: [
          {
            data: this.listData.map((e) => Number(e.income)),
            label: "Lợi nhuận",
            backgroundColor: [
              "red",
              "yellow",
              "#00D8FF",
              "black",
              "blue",
              "violet",
              "white",
              "#785643",
              "#998833",
              "#797979",
              "#kkllaa",
            ],
          },
        ],
      },
      options_1: {
        title: {
          display: true,
          text: "Doanh Thu",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      options_2: {
        title: {
          display: true,
          text: "Chi Tiêu",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      options_3: {
        title: {
          display: true,
          text: "Lợi Nhuận",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  computed: {},
};
</script>

<style scoped>
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 400;
  font-size: 30px;
  color: #2e495e;
  letter-spacing: 1px;
  font-size: 2em;
}
.green {
  color: #00c48d;
}

.subtitle {
  font-weight: 300;
  font-size: 1em;
  color: #2e495e;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
