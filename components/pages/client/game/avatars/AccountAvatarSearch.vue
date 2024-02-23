<template>
  <div class="form-search mb-3">
    <div class="page-body">
      <form class="form">
        <v-row>
          <v-col cols="6" sm="4" md="3" lg="3">
            <v-select
              v-model="queryForm.q.cash"
              :items="cashOptions"
              @change="setQueryForm()"
              size="sm"
            ></v-select>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="3">
            <v-text-field
              v-model="queryForm.q.id"
              type="number"
              placeholder="Nhập ID nick..."
              @change="setQueryForm()"
              @keyup.enter="search()"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="2" md="3" lg="3">
            <v-btn
              type="submit"
              color="primary"
              class="btn btn-info btn-search text-not-shadow text-white w-100"
              @click="search()"
            >
              <i class="fa fa-search"></i> Tìm kiếm
            </v-btn>
          </v-col>
          <v-col cols="6" sm="2" md="3" lg="3">
            <v-btn
              type=""
              color="error"
              class="btn btn-danger btn-search text-not-shadow text-white w-100"
              @click="reset()"
              >Xóa
            </v-btn>
          </v-col>
        </v-row>
      </form>
    </div>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      cashOptions: [
        {
          text: "Chon Giá Tiền",
          value: null,
        },
        {
          text: "Dưới 50k",
          value: {
            min: 0,
            max: 49000,
          },
        },
        {
          text: "Giá 50k đến 100k",
          value: {
            min: 50000,
            max: 100000,
          },
        },
        {
          text: "Giá 100k đến 200k",
          value: {
            min: 100000,
            max: 200000,
          },
        },
        {
          text: "Giá 200k đến 300k",
          value: {
            min: 200000,
            max: 300000,
          },
        },
        {
          text: "Giá 300k đến 500k",
          value: {
            min: 300000,
            max: 500000,
          },
        },
        {
          text: "Giá 500k đến 700k",
          value: {
            min: 500000,
            max: 700000,
          },
        },
        {
          text: "Giá 700k đến 1 Triệu",
          value: {
            min: 700000,
            max: 1000000,
          },
        },
        {
          text: "Giá 1Tr đến 1,5 Triệu",
          value: {
            min: 1000000,
            max: 1500000,
          },
        },
        {
          text: "Giá 1,5Tr đến 3 Triệu",
          value: {
            min: 1500000,
            max: 3000000,
          },
        },
        {
          text: "Giá trên 3 Triệu",
          value: {
            min: 3000000,
          },
        },
      ],
    };
  },
  created() {},

  computed: {
    ...mapFields("home/game/avatars", {
      query: "query",
    }),
    queryForm() {
      return _.cloneDeep(this.query);
    },
  },
  methods: {
    ...mapActions("home/game/avatars", ["resetQuery", "setQuery"]),
    search() {
      this.setQueryForm();
      this.$emit("search");
    },
    async reset() {
      this.resetQuery();
      this.search();
    },
    setQueryForm() {
      this.queryForm.page = 1;
      this.setQuery(this.queryForm);
    },
  },
};
</script>
