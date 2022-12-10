import { required, alpha } from "vee-validate/dist/rules";

import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "This field is required"
});

extend("alpha", {
  ...alpha,
  message: "This field must only contain alphabetic characters"
});
