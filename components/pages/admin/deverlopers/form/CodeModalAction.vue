<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="300px"
    >
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
        <v-card-title>
            Select Code Action</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-radio-group
            v-model="typeCode"
            column
          >
            <v-radio
              label="Vue"
              value="vue"
            ></v-radio>
            <v-radio
              label="Javascript"
              value="javascipt"
            ></v-radio>
            <v-radio
              label="HTML"
              value="html"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="red"
            
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn v-if="typeCode"
            color="primary"
            
            @click="add(), dialog = false"
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
    data () {
      return {
        dialogm1: '',
        dialog: false,
        typeCode: ''
      }
    },
    props: {
    index: {
      type: [String, Number],
      required: true,
    },
  },
    methods: {
      ...mapActions("admin/deverlopers", [
      "addActionIndex"
    ]),
      add() {
        console.log(this.typeCode);
        console.log(this.index);
        this.addActionIndex({typeCode: this.typeCode, index: this.index });
      }
    }
  }
</script>
<style scoped>
.v-card.v-sheet.theme--dark {
  border: 1px solid #a4a4a4;
  /* border: 1px solid rgba(255, 255, 255, 0.12); */

}

/* .v-card.v-sheet.theme--dark {
  background: #fff !important;
} */
</style>