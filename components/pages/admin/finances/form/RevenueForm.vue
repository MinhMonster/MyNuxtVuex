<template>
  <client-only>
    <v-row class="bg-editor finance">
      <v-col cols="7" sm="7" md="7" class="name-finance">
        <v-text-field label="" type="text" v-model="nameRevenue"></v-text-field>
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
            {{ this.cashRevenueFormat }}
          </p>
        </div>
      </v-col>
      <v-col v-else cols="4" sm="4" md="4" @mouseleave="activeCash = true">
        <v-text-field
          label=""
          type="number"
          v-model="cashRevenue"
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

  components: {
  },
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
    revenue() {
      return this.getAction()({index: this.index, type: "revenue"});
    },
    nameRevenue: {
      get() {
        return _.cloneDeep(this.revenue.name);
      },
      set(val) {
        this.setAction({
          index: this.index,
          type: "revenue",
          value: { ...this.revenue, name: _.cloneDeep(val) },
        });
      },
    },
    cashRevenue: {
      get() {
        return _.cloneDeep(this.revenue.cash);
      },
      set(val) {
        this.setAction({
          index: this.index,
          type: "revenue",
          value: { ...this.revenue, cash: _.cloneDeep(val) },
        });
      },
    },
    cashRevenueFormat: {
      get() {
        return _.cloneDeep(this.format_number(this.revenue.cash));
      },
    },
    
  },
  methods: {
    ...mapGetters(["getAction"]),
    ...mapActions(["setAction", "removeAction"]),

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
          title: `Remove Revenue`,
          confirmButtonColor: "#F64E60",
          showCancelButton: true,
          confirmButtonText: "YES",
          cancelButtonText: "NO",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.removeAction({index: index, type: "revenue"});
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
#admin .bg-editor.finance{
  margin-bottom: -55px;
}
#admin .name-finance {
  margin-right: -0px;
}
</style>