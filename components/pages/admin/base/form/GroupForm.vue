<!-- <template>
  <form-validator v-if="getName" :name="getName">
    <BaseInput
      v-if="form.type === 'cash'"
      :name="getName"
      :label="form.title"
      :disabled="
        form.disabled || (is_create && (getName === 'ID' || getName === 'id'))
      "
      v-model="modelValue"
      @change="updateForm"
    />
    <BaseInput
      v-if="form.type === 'cash_sale_off'"
      :name="getName"
      :label="form.title"
      :disabled="true"
      :value="
        format_number(
          dataForm[`${getName}`] *
            (1 - (dataForm['active_discount'] || 0) / 100)
        )
      "
    />
    <BaseInput
      v-if="form.type === 'profit'"
      :name="getName"
      :label="form.title"
      :disabled="true"
      :value="profit_atm(dataForm)"
    />
    <v-text-field
      v-if="
        form.type === 'number' || form.type === 'text' || form.type === 'date'
      "
      :name="getName"
      v-model="modelValue"
      :type="form.type"
      :label="form.title"
      :disabled="
        form.disabled || (is_create && (getName === 'ID' || getName === 'id'))
      "
      @change="updateForm()"
    ></v-text-field>
    <v-select
      v-if="form.type === 'select-options'"
      v-model="modelValue"
      density="compact"
      :label="form.title"
      :placeholder="form.placeholder"
      :items="form.options"
      @change="updateForm()"
    ></v-select>
    <div v-if="form.type === 'content-editer'">
      <label for="" class="content-editer">{{ form.title }}</label>
      <ContentEditer
        v-model="modelValue"
        :name="getName"
        :label="form.title"
        :disabled="form.disabled"
        :height="form.height"
        :class="form.fullHeight ? 'full-height' : ''"
        @input="updateForm()"
      ></ContentEditer>
    </div>
    <div v-if="form.type === 'images'">
      <label for="" class="content-editer">{{ form.title }}</label>
      <ImageList
        v-model="modelValue"
        :name="getName"
        :md="6"
        @updated="onChangeImages"
        class="images"
      />
    </div>
  </form-validator>
</template>
<script>
import FormValidator from "@/components/pages/admin/Shared/form/FormValidator";
import ContentEditer from "@/components/pages/admin/Shared/nuxt-editor/CkEditorNuxt.vue";
import BaseInput from "@/components/pages/admin/base/BaseInput";
import ImageList from "@/components/global/molecules/common/ImageList";

export default {
  components: {
    FormValidator,
    ContentEditer,
    BaseInput,
    ImageList,
  },
  name: "BaseGroupForm",
  props: {
    dataForm: {
      type: Object,
      default: () => {
        return {};
      },
      require: true,
    },
    form: {
      type: Object,
      default: () => {
        return {};
      },
      require: true,
    },
    index: {
      type: [String, Number],
      default: null,
    },
    keyForm: {
      type: String,
      default: null,
    },
  },
  data() {
    return {};
  },
  computed: {
    is_create() {
      const path = this.$route.path;
      return path.includes("/new");
    },
    getName() {
      if (this.index != null && this.keyForm) {
        return `${this.keyForm}.${this.index}.${this.form.value}`;
      }
      return this.form.value || "";
    },
    modelValue: {
      get() {
        if (this.keyForm) {
          return (
            this.dataForm[this.keyForm][this.index]?.[this.form.value] ?? ""
          );
        }
        return (
          this.dataForm[this.getName] ?? (this.form.type === "images" ? [] : "")
        );
      },
      set(value) {
        if (this.keyForm) {
          // Nếu mảng chưa có phần tử tại index thì tạo mới
          if (!this.dataForm[this.keyForm]) {
            this.$set(this.dataForm, this.keyForm, []);
          }
          if (!this.dataForm[this.keyForm][this.index]) {
            this.$set(`${this.dataForm}.${this.keyForm}`, this.index, {});
          }

          this.$set(
            this.dataForm[this.keyForm][this.index],
            this.form.value,
            value
          );
        } else {
          this.$set(this.dataForm, this.getName, value);
        }
      },
    },
  },
  async mounted() {},
  methods: {
    updateForm() {
      this.$emit("updated", this.dataForm);
    },
    onChangeImages(name, value) {
      this.dataForm[name] = value || [];
      this.updateForm();
    },
  },
};
</script>
 -->
