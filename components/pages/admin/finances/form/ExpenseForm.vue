<template>
  <client-only>
    <v-row class="bg-editor finance">
      <v-col cols="7" sm="7" md="7" class="name-finance">
        <v-text-field label="" type="text" v-model="nameExpense"></v-text-field>
      </v-col>
      <v-col
        v-if="activeCash"
        cols="4"
        sm="4"
        md="4"
        @click="activeCash = false"
        @mouseover="activeCash = false"
      >
        <div class="outline-format">
          <p class="value-format">
            {{ this.cashExpenseFormat }}
          </p>
        </div>
        <!-- <v-text-field label="" type="text" :value="cashExpenseFormat"></v-text-field> -->
      </v-col>
      <v-col v-else cols="4" sm="4" md="4" @mouseleave="activeCash = true">
        <v-text-field
          label=""
          type="number"
          v-model="cashExpense"
        ></v-text-field>
      </v-col>
      <v-col cols="1" sm="1" md="1">
        <v-btn icon class="danger btn-delete" @click="deleteAction(index)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </client-only>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapActions, mapGetters } = createNamespacedHelpers("admin/finances");
import mixins from "@/mixins/index";

export default {
  mixins: [mixins],

  components: {},
  props: {
    index: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      activeCash: true,
      editorOption: {
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
      },
    };
  },
  computed: {
    expense() {
      return this.getAction()({ index: this.index, type: "expense" });
    },
    nameExpense: {
      get() {
        return _.cloneDeep(this.expense.name);
      },
      set(val) {
        this.setAction({
          index: this.index,
          type: "expense",
          value: { ...this.expense, name: _.cloneDeep(val) },
        });
      },
    },
    cashExpense: {
      get() {
        return _.cloneDeep(this.expense.cash);
      },
      set(val) {
        this.setAction({
          index: this.index,
          type: "expense",
          value: { ...this.expense, cash: _.cloneDeep(val) },
        });
      },
    },
    cashExpenseFormat: {
      get() {
        return _.cloneDeep(this.format_number(this.expense.cash));
      },
    },
  },
  methods: {
    ...mapGetters(["getAction"]),
    ...mapActions(["setAction", "removeAction"]),
    // format() {
    //   this.cashExpense = this.format_number(this.cashExpense);
    //   this.setAction({
    //       index: this.index,
    //       type: "expense",
    //       value: { ...this.expense, cash: _.cloneDeep(this.cashExpense) },
    //   });
    // },
    un_format(number) {
      return Number(this.cashExpense);
    },

    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const input = {
        file: formData,
      };
      const res = await api_file.upload(input);
      const url = res.data.file;
      Editor.insertEmbed(cursorLocation, "image", url);
      resetUploader();
    },
    deleteAction(index) {
      this.$swal
        .fire({
          title: `Remove Expense`,
          confirmButtonColor: "#F64E60",
          showCancelButton: true,
          confirmButtonText: "YES",
          cancelButtonText: "NO",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.removeAction({index: index, type: "expense"});
          }
        });
    },
  },
};
</script>
<style >
.CodeMirror-sizer {
  min-height: 500px;
}
.btn-delete {
  margin-top: 25px;
  right: 15px;
}
</style>