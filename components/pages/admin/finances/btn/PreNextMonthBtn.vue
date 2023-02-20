<template>
  <client-only v-if="financeForm">
    <v-row class="bg-editor bg-finance text-center">
      <v-col  cols="6" sm="6" md="6">
        <v-btn
          :disabled="!preMonth"
          icon
          class="dark btn-middle"
          color="dark"
          @click="onPreMonth()"
        >
          <v-icon>mdi mdi-arrow-left-bold-circle</v-icon></v-btn
        >
      </v-col>

      <v-col  cols="6" sm="6" md="6" class="text-center">
        <v-btn
          :disabled="!nextMonth"
          icon
          class="dark btn-middle"
          color="dark"
          @click="onNexMonth()"
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

  name: "PreNextMonthBtn",
  computed: {
    ...mapFields("admin/finances/edit", [
      "finance",
      "income",
      "nextMonth",
      "preMonth",
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
      console.log("form", this.financeForm);
    },
    onNexMonth() {
      if (this.nextMonth) {
        this.$router.push(
          `/admin/finances/${this.nextMonth.year}/${this.time_10(
            this.nextMonth.month
          )}/`
        );
      }
    },
    onPreMonth() {
      if (this.preMonth) {
        this.$router.push(
          `/admin/finances/${this.preMonth.year}/${this.time_10(
            this.preMonth.month
          )}`
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