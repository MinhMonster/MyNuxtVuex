
import TextField from "@/components/fields/TextField.vue";
import SelectField from "@/components/fields/SelectField.vue";
import CashField from "@/components/fields//CashField.vue";

export const fieldRegistry = {
  text: TextField,
  select: SelectField,
  cash: CashField,
};

/**
 * Resolve component theo config form
 */
export function resolveFieldComponent(form) {
  if (form.component) return form.component;
  return fieldRegistry[form.type] || TextField;
}
