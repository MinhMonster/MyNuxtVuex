<template>
  <client-only>
    <div>
      <v-card-title>Bài viết mới </v-card-title>
      <v-spacer/>
      <v-card-title
        >INCOME: {{ format_number(this.income) }}
      </v-card-title>
      <div id="body-admin">
        <form @submit.prevent="create()">
          <FinanceForm :year="year" :month="month" :day="null"></FinanceForm>
          <br />
          <br />
          <div class="text-right">
            <v-btn type="submit" color="" to="/admin/topics"> Trở Về </v-btn>
            <v-btn type="submit" color="primary"> Thêm mới </v-btn>
          </div>
        </form>
        <!-- <div v-if="actions">
          <div v-for="action, index in actions" :key="index">
            <div>{{ action.id }}</div>
          </div>
        </div> -->
        <!-- <AddActionBtnGroups></AddActionBtnGroups> -->
      </div>
    </div>
  </client-only>
</template>

<script>
import mixins from "@/mixins/index";
import { mapFields } from "vuex-map-fields";
import { mapActions, mapState } from "vuex";
import FinanceForm from "@/components/pages/admin/finances/form/FinanceForm.vue";
// import CodeForm from "@/components/pages/admin/finances/form/CodeForm.vue";

// import AddActionBtnGroups from "@/components/pages/admin/finances/AddActionBtnGroups.vue";

export default {
  mixins: [mixins],
  components: {
    FinanceForm,
    // AddActionBtnGroups,
    // CodeForm
  },
  layout: "adminDev",
  head() {
    return {
      title: "New finance",
      meta: [
        {
          hid: "New finance",
          name: "New finance",
          content: "New finance",
        },
      ],
    };
  },
  name: "Newfinance",
  data() {
    return {
      input: {},
    };
  },

  created() {},
  async mounted() {
    this.newFinance();

    // await this.get_finance({
    //   params: {
    //     id: this.paramId,
    //   },
    // });
  },
  computed: {
    ...mapFields("admin/finances/edit", ["finance", "income"]),

    year() {
      return this.$route.params.year;
    },
    month() {
      return this.$route.params.month;
    },
  },
  methods: {
    ...mapActions("admin/finances/edit", [
      "newFinance",
      "get_finance",
      "createFinance",
    ]),
    async create() {
      console.log(`new`);
      const res = await this.createFinance({
        year: this.year,
        month: this.month,
      });
      if (res.data.code === 200) {
        this.$toasted.success(res.data.message);
        this.$router.push(`/admin/finances/${this.year}`);
      }
    },
  },
};
</script>
