<!-- <template>
  <client-only v-if="dataForm">
    <form @submit.prevent="onModify()">
      <b-tabs class="tab-account">
        <b-tab title="Infomations" class="tab-scroll scroll-y">
          <BaseGroupForm
            :data-form="dataForm"
            :forms="stateForms"
            @updated="updateForm()"
          />
          <slot></slot>
        </b-tab>

        <b-tab title="Upload Images" class="tab-scroll scroll-y">
          <b-form-checkbox
            v-if="dataForm.is_full_image"
            v-model="dataForm.is_full_image"
            name="check-button"
            value="1"
            unchecked-value="0"
            switch
            dark
            @input="updateForm()"
            >Show Full Avatar
          </b-form-checkbox>
          <ImageList
            v-if="multipleImages"
            v-model="dataForm[images]"
            @updated="updateForm"
          />
          <UploadImage
            v-else
            @changeImage="changeImage"
            :images-props="dataForm.image ? [dataForm.image ?? ''] : []"
          />
        </b-tab>
      </b-tabs>
      <div class="d-flex mt-3">
        <v-btn v-if="isDelete" @click="onDelete()" color="red"> Delete</v-btn>
        <v-btn v-if="isUnDelete" @click="unDelete()" color="red">
          Un Delete
        </v-btn>
        <v-spacer />
        <div class="text-right">
          <v-btn type="submit" color="primary"> Submit </v-btn>
        </div>
      </div>
    </form>
  </client-only>
</template>

<script>
import UploadImage from "@/components/pages/admin/topics/form/UploadImage";
import ImageList from "@/components/global/molecules/common/ImageList";
import BaseGroupForm from "@/components/pages/admin/base/BaseGroupForm.vue";
import adminCrud from "@/mixins/adminCrud";

export default {
  mixins: [adminCrud],
  components: {
    BaseGroupForm,
    UploadImage,
    ImageList,
  },
  name: "AdminBaseForm",
  async mounted() {
    await this.resetForm();
    if (this.itemId) {
      await this.fetchData();
    }
  },
};
</script>
<style lang="scss" scoped>
.fileItemWrapper {
  position: relative;
  display: flex;
  flex-flow: column;
  border: 1px solid #eff2f7;
  border-radius: 5px;
  padding: 10px;
  align-items: flex-start;
  height: 100%;

  button {
    position: absolute;
    right: -10px;
    top: -10px;
    width: 20px;
    height: 20px;
    font-size: 10px;
    padding: 1px;
  }
}

.CodeMirror-sizer {
  min-height: 500px;
}

img.image-account {
  height: 100%;
  width: 100%;
}

.tab-scroll {
  height: calc(100vh - 315px);
}

.bg-account {
  margin: 0px;
}
</style> -->
