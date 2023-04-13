<template>
  <client-only>
    <div>
      <v-row align="center" >
        <v-col >
          <v-card-title class="mgl--15px">Ninjas: <br/> {{ format_number(countNinjas) }} Account</v-card-title>
        </v-col>
        <v-col class="text-right" >
          <v-card-title class="right mgr--15px">
            Total: <br/>{{ format_number(sumPriceNinjas) }} Đ</v-card-title
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" sm="12">
          <v-card>
            <v-simple-table class="table mgb--10px">
              <template v-slot:default>
                <thead>
                  <tr class="w-100">
                    <th>ID</th>
                    <th>Account</th>
                    <th class="text-center">Price</th>
                    <th class="text-center">Class</th>
                    <th class="text-center">Level</th>
                    <th class="text-center">Server</th>
                    <th class="text-center">Type</th>
                    <th class="text-center" >Action</th>
                  </tr>
                </thead>
                <tbody>
                  <NinjaTableRow
                    v-for="ninja in ninjas"
                    :key="ninja.ID"
                    :ninja="ninja"
                    class="table-center text-middle"
                  ></NinjaTableRow>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import mixins from "@/mixins/index";
import NinjaTableRow from "@/components/pages/admin/game/ninjas/NinjaTableRow.vue";
import UploadImageModal from "@/components/global/plugins/UploadImageModal.vue";

export default {
  mixins: [mixins],
  layout: "adminDev",
  components: {
    NinjaTableRow,
    UploadImageModal,
  },
  head() {
    return {
      title: "Admin: Ninjas",
      meta: [
        {
          hid: "Admin: Ninjas",
          name: "Admin: Ninjas",
          content: "Admin: Ninjas",
        },
      ],
    };
  },
  name: "Ninjas",
  data() {
    return {};
  },
  async mounted() {
    await this.fetchNickNinjas();
  },
  computed: {
    ...mapFields("admin/game/ninjas", [
      "ninjas",
      "sumPriceNinjas",
      "countNinjas",
    ]),
  },
  methods: {
    ...mapActions("admin/game/ninjas", ["fetchNickNinjas"]),
  },
};
</script>
<style >
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

#admin
  .v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:nth-child(even)
  td {
  background: white !important;
}

#admin .v-data-table > .v-data-table__wrapper > table > tbody > tr td {
  border: none !important;
}
.theme--dark.v-data-table {
  background: white;
}

/* tr.table-main {
  border-bottom: 2px solid #333;
} */

/* tr.table-main > td {
  border: 2px solid #333 !important;
} */

/* .sub-table tr td:first-child{
  border-right: 2px solid #333 !important;;
} */

element.style {
}
/* #admin .table td {
  border: 1px solid var(--admin-table-border);
} */
#admin td.bg-dark {
  color: #333 !important;
  font-weight: 800;
  text-align: center;
}

.table.text-center tr,
.table.text-center th,
.table.text-center td {
  text-align: center !important;
}

#admin .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 25px;
  font-size: 13.5px;
}

#admin .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  padding: 0 4px;
}
</style>