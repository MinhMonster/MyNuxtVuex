<template>
  <client-only>
    <div>
      <v-card-title>Day: {{ this.finance_edit.title }} : {{ format_number(this.income) }} </v-card-title>
      <div id="body-admin">
        <form @submit.prevent="edit()">
          <FinanceForm
            v-if="finance_item"
            :finance="finance_item"
          ></FinanceForm>
          <div class="d-flex">
            <div v-if="revenues" style="width: 49%">
              <h1 class=" big">REVENUE ({{ format_number(this.sumCashRevenues) }})</h1>
              <div v-for="(revenue, index) in revenues" :key="index">
                <RevenueForm :index="index"></RevenueForm>
              </div>
            </div>
            <v-spacer/>

            <div v-if="expenses" style="width: 49%">
              <h1 class=" big">EXPENSE ({{ format_number(this.sumCashExpenses) }})</h1>
              <div v-for="(expense, index) in expenses" :key="index">
                <ExpenseForm :index="index"></ExpenseForm>
              </div>
            </div>
          </div>
          <br />
          <AddRevenueBtn></AddRevenueBtn>
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
      </div>
    </div>
  </client-only>
</template>

<script>
import API from "@/apis/modules/admin/topics";
import api_file from "@/apis/modules/admin/files";
import { mapActions, mapState } from "vuex";
import FinanceForm from "@/components/pages/admin/finances/form/FinanceForm.vue";
import RevenueForm from "@/components/pages/admin/finances/form/RevenueForm.vue";
import ExpenseForm from "@/components/pages/admin/finances/form/ExpenseForm.vue";
import AddRevenueBtn from "@/components/pages/admin/finances/btn/AddRevenueBtn.vue";

import { mapFields } from "vuex-map-fields";
import { cloneDeep } from "lodash";
import mixins from "@/mixins/index"

export default {
  mixins:[mixins],
  components: {
    FinanceForm,
    RevenueForm,
    ExpenseForm,
    AddRevenueBtn,
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
    await this.get_finance_edit({
      params: {
        id: this.routeId,
      },
    });
  },
  computed: {
    ...mapFields("admin/finances", [
      "finance",
      "finance_edit",
      "revenues",
      "expenses",
      "sumCashRevenues",
      "sumCashExpenses",
      "income",
    ]),

    routeId() {
      return this.$route.params.id;
    },
    // queryType() {
    //   return this.$route.query.type;
    // },
    finance_item() {
      if (this.finance_edit) {
        return cloneDeep(this.finance_edit);
      } else {
        this.$router.push("/admin/finances");
      }
    },
  },
  methods: {
    ...mapActions("admin/finances", ["get_finance_edit", "removeAction"]),
    async show(ID) {
      const res = await API.showEdit({
        params: {
          id: ID,
        },
      });
      this.topic = res.data.topic;
    },
    async edit() {
      const formData = new FormData();
      formData.append("id", this.finance_item.ID);
      formData.append("title", this.finance_item.title);
      formData.append("link", this.finance_item.link);
      formData.append("info", this.finance_item.info);
      formData.append("content", this.finance_item.content);

      const revenues = JSON.stringify(this.revenues);
      const expenses = JSON.stringify(this.expenses);

      formData.append("revenues", revenues);
      formData.append("expenses", expenses);

      formData.append("sumCashRevenues", this.sumCashRevenues);
      formData.append("sumCashExpenses", this.sumCashExpenses);
      formData.append("income", this.income);


      try {
        const res = await this.$repositories.adminFinances.edit(formData);
        if (res.data.code === 200) {
          this.$toasted.success(res.data.message);
        }
      } catch (e) {
        console.log(e);
      }
    },

    async onDelete() {
      this.$swal
        .fire({
          title: `Bạn muốn xóa ID: ${this.routeId} <br/> Title: ${this.finance_item.title}?`,
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
            formData.append("id", this.routeId);
            try {
              const res = await this.$repositories.adminFinances.delete({
                params: {
                  id: this.routeId,
                },
              });
              if (res.data.code === 200) {
                this.$toasted.success(res.data.message);

                if (this.routeId === this.finance.ID) {
                  this.$router.push(`/admin/finances`);
                } else {
                  this.$router.push(`/admin/finances/${this.finance.ID}/show`);
                }
              }
            } catch (e) {
              console.log(e);
            }
          }
        });
    },
    deleteAction(index) {
      this.$swal
        .fire({
          title: `Remove Action`,
          confirmButtonColor: "#F64E60",
          showCancelButton: true,
          confirmButtonText: "YES",
          cancelButtonText: "NO",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.removeAction(index);
          }
        });

      // this.$confirm({
      //   message: "Xóa Phần Tử",
      //   button: {
      //     no: "NO",
      //     yes: "YES",
      //   },
      //   callback: (confirm) => {
      //     if (confirm) {
      //       this.removeAction(index);
      //     }
      //   },
      // });
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
