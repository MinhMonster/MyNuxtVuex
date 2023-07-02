<template>
  <client-only>
    <div v-if="avatars">
      <div class="d-flex" align="center">
        <div>
          <v-card-title class="mgl--15px">Account Avatars </v-card-title>
        </div>
        <v-spacer />
        <div class=" right middle">
          <v-btn icon class="primary right" to="/admin/game/avatars/new">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="d-flex" align="center">
        <div>
          <v-card-title class="mgl--15px"
            >Account: {{ format_number(countAvatars) }}
          </v-card-title>
        </div>
        <v-spacer />
        <div class="mgr--15px right middle">
          <v-card-title
            >Total: {{ format_number(sumPriceAvatars) }} Đ
          </v-card-title>
        </div>
      </div>
      <!-- <v-row align="center">
        <v-col>
          <v-card-title class="mgl--15px"
            >Avatars: {{ format_number(countAvatars) }} Account</v-card-title
          >
          <v-card-title class="mgl--15px">
            Total: {{ format_number(sumPriceAvatars) }} Đ</v-card-title
          >
        </v-col>
        <v-col class="text-right"> </v-col>
      </v-row> -->
      <v-row>
        <v-col cols="12" md="12" sm="12">
          <v-card>
            <v-simple-table class="table mgb--10px">
              <template v-slot:default>
                <thead>
                  <tr class="w-100">
                    <th class="text-left w-10">ID</th>
                    <th class="text-left w-35">Account</th>
                    <th class="text-center w-15">Giá</th>
                    <th class="text-center w-10">Đất</th>
                    <th class="text-center w-10">Gà</th>
                    <th class="text-center w-10">Cá</th>
                    <th class="text-center w-10">Sửa</th>
                  </tr>
                </thead>
                <tbody>
                  <AvatarTableRow
                    v-for="account in avatars"
                    :key="account.ID"
                    :account="account"
                    class="table-center text-middle"
                  ></AvatarTableRow>
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
import AvatarTableRow from "@/components/pages/admin/game/avatars/AvatarTableRow.vue";
import UploadImageModal from "@/components/global/plugins/UploadImageModal.vue";

export default {
  mixins: [mixins],
  layout: "adminDev",
  components: {
    AvatarTableRow,
    UploadImageModal,
  },
  head() {
    return {
      title: "Admin: Avatars",
      meta: [
        {
          hid: "Admin: Avatars",
          name: "Admin: Avatars",
          content: "Admin: Avatars",
        },
      ],
    };
  },
  name: "Avatars",
  data() {
    return {};
  },
  async mounted() {
    await this.fetchAccountAvatars();
  },
  computed: {
    ...mapFields("admin/game/avatars", [
      "avatars",
      "sumPriceAvatars",
      "countAvatars",
    ]),
  },
  methods: {
    ...mapActions("admin/game/avatars", ["fetchAccountAvatars"]),
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