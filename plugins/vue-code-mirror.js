

import Vue from "vue";
import VueCodemirror from "vue-codemirror";

// import "codemirror/lib/codemirror.css";
// import "codemirror/mode/css/css.js";
// import "codemirror/mode/xml/xml.js";
// import "codemirror/mode/htmlmixed/htmlmixed.js";
// import "codemirror/mode/javascript/javascript.js";
// import "codemirror/mode/ruby/ruby.js";
// import "codemirror/mode/php/php.js";
// import "codemirror/mode/clike/clike.js";

const cmOptions = {
  connect: "align",
  mode: "text/html",
  lineNumbers: true,
  line: true,
  collapseIdentical: false,
  highlightDifferences: true,
};
Vue.use(VueCodemirror, {
  options: cmOptions,
});