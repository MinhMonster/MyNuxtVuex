<template>
  <client-only>
    <div>
      <v-row align="center">
        <v-col>
          <v-card-title class="mgl--15px">Medias </v-card-title>
        </v-col>
        <v-col>
          <UploadImageModal @onUploaded="onUploaded"></UploadImageModal>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" sm="12">
          <v-card>
            <v-simple-table class="table text-center mgb--10px">
              <template v-slot:default>
                <thead>
                  <tr class="w-100">
                    <th>ID</th>
                    <th>Image</th>
                    <th>Size</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  <media-table-row
                    v-for="image in files"
                    :key="image.id"
                    :image="image"
                    class="table-center text-middle"
                  ></media-table-row>
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
import MediaTableRow from "@/components/global/molecules/media/MediaTableRow.vue";
import UploadImageModal from "@/components/global/plugins/UploadImageModal.vue";

export default {
  mixins: [mixins],
  layout: "adminDev",
  components: { MediaTableRow, UploadImageModal },
  head() {
    return {
      title: "Admin: Medias",
      meta: [
        {
          hid: "Admin: Medias",
          name: "Admin: Medias",
          content: "Admin: Medias",
        },
      ],
    };
  },
  name: "Medias",
  data() {
    return {};
  },
  async mounted() {
    await this.fetchMedia();
  },
  computed: {
    ...mapFields("admin/medias", ["medias"]),
    month() {
      return this.$route.params.month;
    },
    year() {
      return this.$route.params.year;
    },
    files() {
      return _.cloneDeep(this.medias);
    },
    // computedThumbnail() {
    //   const image = _.get(
    //     this.image,
    //     "options.video_preview_url",
    //     this.image.url
    //   );
    //   return {
    //     backgroundImage: "url('" + image + "')",
    //     backgroundRepeat: "no-repeat",
    //     backgroundPosition: "center",
    //     backgroundSize: "contain",
    //     width: "50px",
    //     height: "50px",
    //     minWidth: "50px",
    //   };
    // },
  },
  methods: {
    ...mapActions("admin/medias", ["fetchMedia"]),

    changeFinances(event) {
      this.updatePositionFinances(event.moved.element.ID, event.moved.newIndex);
    },
    async onUploaded() {
      await this.fetchMedia();
    },
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