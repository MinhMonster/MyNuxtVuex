<template>
  <client-only v-if="financeForm">
    <v-row class="bg-editor bg-finance text-center">
      <v-col cols="8" sm="8" md="8">
        <v-card-title>INCOME: {{ format_number(this.income) }} </v-card-title>
      </v-col>
      <v-col  cols="2" sm="2" md="2">
        <v-btn
          :disabled="!preDay"
          icon
          class="dark btn-middle"
          color="dark"
          @click="onPreDay()"
        >
          <v-icon>mdi mdi-arrow-left-bold-circle</v-icon></v-btn
        >
      </v-col>

      <v-col  cols="2" sm="2" md="2" class="text-center">
        <v-btn
          :disabled="!nextDay"
          icon
          class="dark btn-middle"
          color="dark"
          @click="onNextDay()"
        >
          <v-icon>mdi mdi-arrow-right-bold-circle</v-icon></v-btn
        >
      </v-col>
    </v-row>
  </client-only>
</template>

<script>
import mixins from "@/mixins/index";

import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
export default {
  mixins: [mixins],

  components: {},
  // props: {
  //   year: {
  //     type: [Number, String],
  //     default: null,
  //   },
  //   month: {
  //     type: [Number, String],
  //     default: null,
  //   },
  //   day: {
  //     type: [Number, String],
  //     default: null,
  //   },
  // },

  name: "PreNextDayBtn",
  computed: {
    ...mapFields("admin/finances/edit", [
      "finance",
      "income",
      "nextDay",
      "preDay",
    ]),
    financeForm() {
      return _.cloneDeep(this.finance);
    },
  },
  mounted() {},
  methods: {
    ...mapActions("admin/finances/edit", [
      "newFinance",
      "setAction",
      "setFinance",
      "removeAction",
    ]),

    updateFinance() {
      this.setFinance(this.financeForm);
    },
    onNextDay() {
      if (this.nextDay) {
        this.$router.push(
          `/admin/finances/${this.nextDay.year}/${this.time_10(
            this.nextDay.month
          )}/${this.time_10(this.nextDay.day)}`
        );
      }
    },
    onPreDay() {
      if (this.preDay) {
        this.$router.push(
          `/admin/finances/${this.preDay.year}/${this.time_10(
            this.preDay.month
          )}/${this.time_10(this.preDay.day)}`
        );
      }
    },
  },
};
</script>

<style>
.btn-middle {
  margin: 14px 0;
  text-align: center;
}
</style>