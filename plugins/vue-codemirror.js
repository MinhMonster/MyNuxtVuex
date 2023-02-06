import Vue from "vue";
import VueCodemirror from "vue-codemirror";

import "codemirror/lib/codemirror.css";
import "/theme/codemirror/lesser-dark.css";
import "/theme/codemirror/base16-dark.css";
import "/theme/codemirror/material-darker.css";
import "/theme/codemirror/ayu-dark.css";
import "/theme/codemirror/pastel-on-dark.css";
import "/theme/codemirror/xq-dark.css";
import "/theme/codemirror/vscode-dark.css";


import "codemirror/mode/css/css.js";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/ruby/ruby.js";
import "codemirror/mode/php/php.js";
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/vue/vue.js";


const cmOptions = {
  connect: "align",
  mode: "text/html",
  lineNumbers: true,
  line: true,
  collapseIdentical: true,
  highlightDifferences: true,
};
Vue.use(VueCodemirror, {
  options: cmOptions,
});