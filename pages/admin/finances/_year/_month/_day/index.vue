<template>
  <client-only>
    <div>
      <div id="body-admin">
        <v-row align="center">
          <v-col cols="12" md="12">
            <form @submit.prevent="edit()">
              <FinanceForm></FinanceForm>
              <br />
              <v-row align="center">
                <v-col>
                  <v-btn @click="onDelete()" color="red"> Xóa</v-btn>
                </v-col>
                <v-spacer />
                <v-col>
                  <div class="text-right">
                    <v-btn type="submit" color="" to="/admin/finances">
                      Trở Về
                    </v-btn>
                    <v-btn type="submit" color="primary"> Sửa </v-btn>
                  </div>
                </v-col>
              </v-row>
            </form>
          </v-col>
        </v-row>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapActions } from "vuex";
import FinanceForm from "@/components/pages/admin/finances/form/FinanceForm.vue";
import { mapFields } from "vuex-map-fields";
import mixins from "@/mixins/index";

export default {
  mixins: [mixins],
  components: {
    FinanceForm,
  },
  layout: "adminDev",
  head() {
    return {
      title: this.titel,
      meta: [
        {
          hid: this.titel,
          name: this.titel,
          content: this.titel,
        },
      ],
    };
  },
  name: "Editfinance",
  props: {},
  data() {
    return {
      ID: "",
      titel: "Admin: Edit finance - ",
    };
  },
  async mounted() {
    this.newFinance();

    await this.get_finance_day({
      params: {
        year: this.year,
        month: this.month,
        day: this.day,
      },
    });
    // console.log(this.listDay, this.next, this.pre);
  },
  computed: {
    ...mapFields("admin/finances/edit", [
      "finance",
    ]),

    year() {
      return this.$route.params.year;
    },
    month() {
      return this.$route.params.month;
    },
    day() {
      return this.$route.params.day;
    },
    financeForm() {
      return _.cloneDeep(this.finance);
    },
    // listDay() {
    //   // const x = _.filter(this.listday, (item, i) => {
    //   //     item.year === this.year && item.month === this.month && item.day === this.day;
    //   //     return i
    //   // });

    //   for(let i = 0; i < this.listday.length; i++) {
    //     if( Number(this.listday[i].year) == Number(this.year)
    //       && Number(this.listday[i].month) == Number(this.month)
    //       && Number(this.listday[i].day) == Number(this.day)) {
    //       return i
    //     }
    //   }
    // },
    // next(){
    //   // for(let i = 0; i < this.listday.length; i++) {
    //   //   if( i = this.listDay + 1) {
    //   //     return this.listday[i];
    //   //   }
    //   // }
    //   const xxx = this.listday.filter(
    //     (item, i) => i === this.listDay + 1
    //   );
    //   return xxx
    // },
    // pre(){
    //   // for(let i = 0; i < this.listday.length; i++) {
    //   //   if( i = this.listDay - 1) {
    //   //     return this.listday[i];
    //   //   }
    //   // }
    //   const xxx = this.listday.filter(
    //     (item, i) => i === this.listDay -1
    //   );
    //   return xxx
    // },

    // checkMax() {
    //   if (( this.listDay + 1) == this.listday.length) return true;
    //   return false
    // },

    // checkMin() {
    //   if (( this.listDay) == 0) return true;
    //   return false
    // }
  },
  methods: {
    ...mapActions("admin/finances/edit", [
      "updateFinance",
      "get_finance_day",
      "newFinance",
    ]),
    async edit() {
      console.log(`edit`);
      const res = await this.updateFinance();
      if (res.data.code === 200) {
        this.$toasted.success(res.data.message);
      }
    },

    async onDelete() {
      this.$swal
        .fire({
          title: `Delete data on <br />Day: ${this.time_10(
            this.finance.day
          )}/${this.time_10(this.finance.month)}/${this.finance.year} ?`,
          text: "",
          icon: "question",
          type: "warning",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Xóa",
          cancelButtonText: "Hủy",
          timer: 5000,
          // closeOnConfirm: false,
          // closeOnCancel: false
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const formData = new FormData();
            formData.append("id", this.finance.ID);
            try {
              const res = await this.$repositories.adminFinances.delete({
                params: {
                  id: this.finance.id,
                },
              });
              if (res.data.code === 200) {
                this.$toasted.success(res.data.message);

                this.$router.push(`/admin/finances/${this.finance.year}`);
              }
            } catch (e) {
              console.log(e);
            }
          }
        });
    },
  },
};
</script>
<style >
.CodeMirror {
  height: 500px;
  resize: horizontal;
}
.CodeMirror-wrap pre {
  word-break: break-word;
}
</style>
