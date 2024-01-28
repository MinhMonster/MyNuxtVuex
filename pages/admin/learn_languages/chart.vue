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
  data() {
    return {
      data: {
        labels: [1975, 1980, 1985],
        datasets: [
          {
            data: [70, 95, 100],
            label: "Doanh Thu",
            borderColor: "#3e95cd",
          },
          {
            data: [70, 80, 111],
            label: "Chi Tiêu",
            borderColor: "#8e5ea2",
          },
          {
            data: [70, 78, 128],
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
};
</script>

<style scoped>
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 400;
  font-size: 100px;
  color: #2e495e;
  letter-spacing: 1px;
  font-size: 6em;
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
