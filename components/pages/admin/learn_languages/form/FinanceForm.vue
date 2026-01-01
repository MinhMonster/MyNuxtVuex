<template>
  <client-only v-if="financeForm">
    <v-row class="bg-editor bg-finance" justify="center">
      <v-col cols="4" sm="4" md="4">
        <div class="outline-format">
          <b-form-select
            v-model="financeForm.day"
            :options="days"
            @change="updateFinance()"
          >
          </b-form-select>
        </div>
      </v-col>
      <v-col cols="4" sm="4" md="4">
        <div class="outline-format">
          <b-form-select
            v-model="financeForm.month"
            :options="months"
            @change="updateFinance()"
          >
          </b-form-select>
        </div>
      </v-col>
      <v-col cols="4" sm="4" md="4">
        <div class="outline-format">
          <b-form-select
            v-model="financeForm.year"
            :options="years"
            @change="updateFinance()"
          >
          </b-form-select>
        </div>
      </v-col>
      <!-- <v-col cols="1" sm="1" md="1">
        <v-btn
          :disabled="!nextDay"
          icon
          class="dark"
          color="dark"
          @click="onNextDay()"
        >
          <v-icon>mdi mdi-arrow-right-bold-circle</v-icon></v-btn
        >
      </v-col> -->
      <v-col :md="12" :sm="12" cols="12">
        <PreNextDayBtn></PreNextDayBtn>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <b-form-group>
          <ContentEditer
            label="Info"
            v-model="financeForm.info"
            @input="updateFinance()"
          ></ContentEditer>
        </b-form-group>
      </v-col>

      <v-col :md="6" :sm="12" cols="12">
        <div v-if="revenues">
          <h1 class="big">
            REVENUE ({{ format_number(this.sumCashRevenues) }})
          </h1>
          <div v-for="(revenue, index) in revenues" :key="index">
            <RevenueForm :index="index"></RevenueForm>
          </div>
        </div>
      </v-col>
      <v-col :md="6" :sm="12" cols="12">
        <div v-if="expenses">
          <h1 class="big">
            EXPENSE ({{ format_number(this.sumCashExpenses) }})
          </h1>
          <div v-for="(expense, index) in expenses" :key="index">
            <ExpenseForm :index="index"></ExpenseForm>
          </div>
        </div>
      </v-col>
      <br />
      <v-col :md="12" :sm="12" cols="12">
        <AddRevenueBtn></AddRevenueBtn>
      </v-col>
    </v-row>
  </client-only>
</template>

<script>
import mixins from "@/mixins/index";

import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import ContentEditer from "@/components/pages/admin/Shared/nuxt-editor/CkEditorNuxt.vue";
import RevenueForm from "@/components/pages/admin/finances/form/RevenueForm.vue";
import ExpenseForm from "@/components/pages/admin/finances/form/ExpenseForm.vue";
import AddRevenueBtn from "@/components/pages/admin/finances/btn/AddRevenueBtn.vue";
import PreNextDayBtn from "@/components/pages/admin/finances/btn/PreNextDayBtn.vue";

export default {
  mixins: [mixins],

  components: {
    ContentEditer,
    RevenueForm,
    ExpenseForm,
    AddRevenueBtn,
    PreNextDayBtn,
  },
  props: {
    year: {
      type: [Number, String],
      default: null,
    },
    month: {
      type: [Number, String],
      default: null,
    },
    day: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    return {
      editorOption: {
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
      },
    };
  },
  name: "Formfinance",
  computed: {
    ...mapFields("admin/finances/edit", [
      "finance",
      "revenues",
      "expenses",
      "sumCashRevenues",
      "sumCashExpenses",
      "income",
      "nextDay",
      "preDay",
    ]),
    financeForm() {
      return _.cloneDeep(this.finance);
    },
  },
  mounted() {
    this.financeForm.year = this.financeForm.year | this.year;
    this.financeForm.month = this.financeForm.month | this.month;
    this.financeForm.day = this.financeForm.day || this.day;
  },
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
.CodeMirror-sizer {
  min-height: 500px;
}
.bg-finance .ck.ck-content.ck-editor__editable.ck-rounded-corners {
  max-height: 150px !important;
}

/* #admin .bg-editor label.label-middle {
  position:absolute;
  margin-top: 5px;
  text-align: left;
  z-index: -1;
} */
</style>