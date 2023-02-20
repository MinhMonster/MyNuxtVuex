<template>
  <section>
    <chart :data="data" :options="options" />
  </section>
</template>

<script>
import chart from "@/components/pages/admin/finances/chart/LineChart.vue";
// import { Line } from "vue-chartjs";

export default {
  components: { chart },

  // extends: Line,
  props: {
    listData: {
      type: Array,
      required: [],
    },
  },
  data() {
    return {
      data: {
        labels: this.listData.map((e) => Number(e.day)),
        datasets: [
          {
            data: this.listData.map((e) => Number(e.sum_cash_revenues)),
            label: "Doanh Thu",
            borderColor: "#3e95cd",
          },
          {
            data: this.listData.map((e) => Number(e.sum_cash_expenses)),
            label: "Chi Tiêu",
            borderColor: "#8e5ea2",
          },
          {
            data: this.listData.map((e) => Number(e.income)),
            label: "Lợi nhuận",
            borderColor: "#3cba9f",
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Biểu đồ biến động Thu Nhập - Chi Tiêu và Lợi nhuận",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted(){
    console.log(this.data);
    this.data.labels = this.listData.map((e) => Number(e.day));
    this.data.datasets[0].data  = this.listData.map((e) => Number(e.income));
    this.data.datasets[1].data  = this.listData.map((e) => Number(e.sum_cash_revenues));
    this.data.datasets[2].data  = this.listData.map((e) => Number(e.sum_cash_expenses));
  },
  computed: {
    dataRevenues() {
      return this.listData.map((e) => Number(e.sum_cash_revenues));
    }
  }
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
