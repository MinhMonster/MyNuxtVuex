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
      <v-col cols="12" sm="12" md="12">
        <b-form-group>
          <ContentEditer
            label="Info"
            v-model="financeForm.info"
            @input="updateFinance()"
          ></ContentEditer>
        </b-form-group>
      </v-col>
    </v-row>
  </client-only>
</template>

<script>
import mixins from "@/mixins/index";

import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import ContentEditer from "@/components/pages/admin/Shared/nuxt-editor/CkEditorNuxt.vue";

export default {
  mixins: [mixins],

  components: {
    ContentEditer,
  },
  props: {
    
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
    ninjaForm() {
      return _.cloneDeep(this.acclunt);
    },
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