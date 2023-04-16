<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          icon
          class="primary"
          v-bind="attrs"
          v-on="on"
          @click="typeCode = ''"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="title-modal"> Select Code Form</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px">
          <v-radio-group v-model="typeCode" column>
            <v-radio
              v-for="(type, index) in typeOptions"
              :key="index"
              :label="type.name"
              :value="type"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="red" @click="dialog = false"> Close </v-btn>
          <v-btn
            v-if="typeCode"
            color="primary"
            @click="add(), (dialog = false)"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      dialogm1: "",
      dialog: false,
      typeCode: {},
      typeOptions: [
        {
          name: "Vue",
          type: "vue",
          mode: "text/x-vue",
        },
        {
          name: "Ruby",
          type: "ruby",
          mode: "text/x-ruby",
        },
        {
          name: "PHP",
          type: "php",
          mode: "application/x-httpd-php",
        },
        {
          name: "Javascipt",
          type: "javascipt",
          mode: "text/x-java",
        },
        {
          name: "Css",
          type: "css",
          mode: "text/css",
        },
        {
          name: "React",
          type: "react",
          mode: "text/jsx",
        },
      ],
    };
  },
  props: {
    index: {
      type: [String, Number],
      required: true,
    },
  },
  methods: {
    ...mapActions("admin/deverlopers", ["addActionIndex"]),
    add() {
      this.addActionIndex({ typeCode: this.typeCode, index: this.index });
    },
  },
};
</script>
<style scoped>
.v-card.v-sheet.theme--dark {
  border: 1px solid #a4a4a4;
  /* border: 1px solid rgba(255, 255, 255, 0.12); */
}

/* .v-card.v-sheet.theme--dark {
  background: #fff !important;
} */
.v-card__title.title-modal {
  color: #eee;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>