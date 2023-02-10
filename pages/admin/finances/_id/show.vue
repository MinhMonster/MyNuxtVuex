<template>
  <client-only v-if="finance">
    <div class="">
      <v-row align="center">
        <v-col>
          <v-card-title>Finance | Year: {{ this.finance.title }}</v-card-title>
        </v-col>
        <v-spacer />
        <v-col
          ><v-btn
            class="right mgr-15px"
            color="primary"
            :to="`/admin/finances/${this.routeId}/new`"
            >Thêm mới
          </v-btn>
        </v-col>
      </v-row>

      <div id="body-admin">
        <div v-if="!finance" class="">
          <div class=""></div>
        </div>
        <v-simple-table class="table table-default">
          <template v-slot:default>
            <thead>
              <tr class="w-100">
                <th class="w-10 text-center">Month</th>

                <th class="w-90 text-center padding-none">
                  <v-simple-table>
                    <thead>
                      <tr class="w-100">
                        <th class="w-25 text-center">Day</th>
                        <th class="w-25 text-center">Revenue</th>
                        <th class="w-25 text-center">Expense</th>
                        <th class="w-25 text-center">Income</th>
                      </tr>
                    </thead>
                  </v-simple-table>
                </th>
              </tr>
            </thead>
            <draggable
              v-if="finance"
              v-model="listFinances"
              ghost-class="ghost"
              @change="changeFinances"
              handle=".handle-items"
              tag="tbody"
            >
              <tr
                v-for="(item, index) in listFinances"
                :key="index"
                class="handle-items text-center"
              >
                <td>
                  <nuxt-link :to="`/admin/finances/${item.ID}/edit`">{{
                    item.title
                  }}</nuxt-link>
                  <br/>
                  <v-btn light icon :to="`/admin/finances/${item.ID}/new`">
                    <v-icon>mdi-plus-box-multiple-outline</v-icon>
                  </v-btn>
                </td>
                <td class="text-left padding-none">
                  <v-simple-table class="table-hidden-boder">
                    <draggable
                      v-model="item.items"
                      @change="changeFinances"
                      handle=".handle-li"
                      tag="tbody"
                    >
                      <tr
                        v-for="info in item.items"
                        :key="info.ID"
                        class="handle-li"
                      >
                        <td class="w-25 text-center">
                          <nuxt-link :to="`/admin/finances/${info.ID}/edit`">{{
                            info.title
                          }}</nuxt-link>
                        </td>
                        <td class="w-25 text-center middle">
                          {{ format_number(info.sum_cash_revenues) }}
                        </td>
                        <td class="w-25 text-center">
                          {{ format_number(info.sum_cash_expenses) }}
                        </td>
                        <td class="w-25 text-center">
                          {{ format_number(info.income) }}
                        </td>
                      </tr>
                    </draggable>
                  </v-simple-table>
                </td>
              </tr>
            </draggable>
          </template>
        </v-simple-table>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import draggable from "vuedraggable";
import { mapActions, mapState } from "vuex";
import mixins from "@/mixins/index";

export default {
  mixins: [mixins],
  layout: "adminDev",
  components: {
    draggable,
  },
  head() {
    return {
      title: "Admin: finances",
      meta: [
        {
          hid: "Admin: finances",
          name: "Admin: finances",
          content: "Admin: finances",
        },
      ],
    };
  },
  name: "finances",
  data() {
    return {
      listFinances: [],
    };
  },
  async mounted() {
    await this.get_finance({
      params: {
        id: this.routeId,
      },
    });
    this.listFinances = _.cloneDeep(this.finance.items);
  },
  computed: {
    ...mapState("admin/finances", ["finance"]),
    ...mapFields("admin/finances", ["finances"]),

    routeId() {
      return this.$route.params.id;
    },
    // listFinances() {
    //   return _.cloneDeep(this.finance.items)
    // }
  },
  methods: {
    ...mapActions("admin/finances", ["get_finance", "change_positions"]),

    changeFinances(event) {
      this.updatePositionFinances(event.moved.element.ID, event.moved.newIndex);
    },
    updatePositionFinances(id, newIndex) {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("newIndex", newIndex);
      this.change_positions(formData);
    },
  },
};
</script>
<style scoped>
#admin td ul li {
  padding: 10px 0;
}

.list-group-item,
.handle-items,
.handle-li {
  cursor: move;
}

/* .v-data-table > .v-data-table__wrapper > table > tbody > tr > td{
  padding: 0px;
} */

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td.padding-none,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th.padding-none {
  padding: 0px !important;
}

.hidden-border {
  border: none !important;
}

.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td.padding-none
  tr
  td:last-child {
  border-right: none !important;
}
.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td.padding-none
  tr
  td:first-child {
  border-left: none !important;
}

.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td.padding-none
  tr:last-child
  td {
  border-bottom: none !important;
}

.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td.padding-none
  tr:first-child
  td {
  border-top: none !important;
}
.theme--dark.v-data-table {
  background: none;
}
</style>