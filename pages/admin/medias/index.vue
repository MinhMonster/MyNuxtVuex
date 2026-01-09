<template>
  <NavAdmin
    title="Medias"
    goBack
    new-page
    next-page
    reload
    @reload="$refs.table.fetchData()"
    @newPage="$refs.modal.show()"
  >
    <template #body>
      <AdminBaseTable
        ref="table"
        module="admin/folders/files"
        :store="{
          state: 'queryFiles',
          action: 'fetchMedias',
        }"
      >
        <template #fileName="{ row }">
          <div class="d-flex align-items-start" :title="row.fileName">
            <ViewImage
              :image="row.url"
              class="mr-2 border d-flex align-items-end justify-content-end"
            />
          </div>
        </template>

        <template #byteSize="{ row }">
          {{ fileSizeFilter(row.byteSize) }}
        </template>

        <template #action="{ row }">
          <v-btn light icon @click="dropImage(row)">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
      </AdminBaseTable>
      <UploadImageModal
        ref="modal"
        @onUploaded="$refs.table.fetchData()"
        :show-icon="false"
      ></UploadImageModal>
    </template>
  </NavAdmin>
</template>

<script>
import mixins from "@/mixins/index";
import MediaTableRow from "@/components/global/molecules/media/MediaTableRow.vue";
import UploadImageModal from "@/components/global/plugins/UploadImageModal.vue";
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import AdminBaseTable from "@/components/pages/admin/base/AdminBaseTable";
import ViewImage from "@/components/global/molecules/media/ViewImage";

export default {
  mixins: [mixins],
  layout: "adminDev",
  components: {
    NavAdmin,
    AdminBaseTable,
    MediaTableRow,
    UploadImageModal,
    ViewImage,
  },
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
  async mounted() {},
  computed: {},
  methods: {
    computedThumbnail(url) {
      return {
        backgroundImage: "url('" + url + "')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
        width: "50px",
        height: "50px",
        minWidth: "50px",
      };
    },
    async dropImage(image) {
      this.$swal
        .fire({
          title: `Delete Image ID: ${image.id}`,
          confirmButtonColor: "#F64E60",
          showCancelButton: true,
          confirmButtonText: "YES",
          cancelButtonText: "NO",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            // const result = await this.deleteMedia(image.id);
            // if (result.data.code === 200) {
            //   this.$toasted.success(result.data.message);
            //   await this.fetchMedia();
            // }
          }
        });
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
