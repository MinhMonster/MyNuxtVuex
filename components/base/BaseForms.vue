<template>
  <v-row>
    <v-col
      v-for="(form, index) in visibleForms"
      :key="form.name || index"
      v-bind="normalizeLayout(form)"
    >
      <!-- blank -->
      <div v-if="form.type === 'blank'"></div>

      <!-- group forms -->
      <v-row v-else-if="form.type === 'forms'">
        <v-col
          v-for="(subForm, subIndex) in visibleSubForms(form.forms)"
          :key="subForm.name || subIndex"
          v-bind="normalizeLayout(subForm)"
        >
          <FieldRenderer
            :form="subForm"
            :name="buildName(form.value, subIndex, subForm.name)"
            :dataForm="dataForm"
            @updated="onUpdated"
          />
        </v-col>
      </v-row>

      <!-- normal field -->
      <FieldRenderer
        v-else
        :form="form"
        :name="form.name"
        :dataForm="dataForm"
        @updated="onUpdated"
      />
    </v-col>
  </v-row>
</template>

<script>
import FieldRenderer from '@/components/base/form/FieldRenderer'
export default {
  name: 'BaseForms',

  components: { FieldRenderer },

  props: {
    forms: {
      type: Array,
      required: true,
      default: () => [],
    },
    dataForm: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },

  computed: {
    isTablet() {
      return this.$vuetify?.breakpoint?.smAndDown
    },

    visibleForms() {
      return this.forms.filter(f =>
        this.isTablet ? f.cols !== 0 : true
      )
    },
  },

  created() {
    this.initDefaultValues()
  },

  methods: {
    /* ---------- init ---------- */
    initDefaultValues() {
      const walk = (forms) => {
        forms.forEach(f => {
          if (f.type === 'forms' && Array.isArray(f.forms)) {
            walk(f.forms)
            return
          }

          if (!f.name) return

          if (this.dataForm[f.name] === undefined) {
            this.$set(
              this.dataForm,
              f.name,
              f.default ?? this.defaultByType(f.type)
            )
          }
        })
      }

      walk(this.forms)
    },

    defaultByType(type) {
      if (type === 'images') return []
      if (type === 'number' || type === 'cash') return 0
      return ''
    },

    /* ---------- helpers ---------- */
    normalizeLayout(form) {
      return {
        cols: form.cols ?? 12,
        md: form.md ?? 6,
        lg: form.lg ?? form.md ?? 6,
      }
    },

    visibleSubForms(forms = []) {
      return forms.filter(f =>
        this.isTablet ? f.cols !== 0 : true
      )
    },

    buildName(group, index, field) {
      if (!group) return field
      return `${group}.${index}.${field}`
    },

    /* ---------- emit ---------- */
    onUpdated(payload) {
      this.$emit('updated', payload)
      this.$emit('change', this.dataForm)
    },
  },
}
</script>
