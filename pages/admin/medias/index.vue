<template>
  <NavAdmin
    title="Medias"
    goBack
    new-page
    next-page
    reload
    @reload="$refs.table.fetchDataIndex()"
    @newPage="$refs.modal.show()"
  >
    <template #body>
      <AdminBaseTable ref="table" module="admin/folders/files">
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
        @onUploaded="$refs.table.fetchDataIndex()"
        :show-icon="false"
      ></UploadImageModal>
    </template>
  </NavAdmin>
</template>

<script>
import MediaTableRow from "@/components/global/molecules/media/MediaTableRow.vue";
import UploadImageModal from "@/components/global/plugins/UploadImageModal.vue";
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import AdminBaseTable from "@/components/pages/admin/base/AdminBaseTable";
import ViewImage from "@/components/global/molecules/media/ViewImage";

export default {
  layout: "adminDev",
  name: "Medias",
  components: {
    NavAdmin,
    AdminBaseTable,
    MediaTableRow,
    UploadImageModal,
    ViewImage,
  },
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
            this.$refs.table.fetchDataIndex();
          }
        });
    },
  },
};
</script>
