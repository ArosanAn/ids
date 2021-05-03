<template>
  <div>
    <v-container style="width: 500px">
      <v-row>
        <v-col cols="6">
          <v-text-field label="Gini" v-model="inputGini"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-btn @click="calcGini">Calc gini</v-btn>
      </v-row>
      <v-row>
        <v-col cols="6">
          CalculatedGini: {{calculatedGini.toFixed(4)}}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-col cols="6">
            <v-text-field label="Information gain" v-model="inputIG"></v-text-field>
          </v-col>
          <v-text-field label="GR" v-model="inputGR"></v-text-field>
        </v-col>
        <v-btn @click="calcGR">Calc Gr</v-btn>
      </v-row>

      <v-row>
        <v-col cols="6">
          CalculatedGR: {{calculatedGR.toFixed(4)}}
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {gini, entropy} from "@/functions/function";

export default {
  name: "Gini",
  data: () => ({
    inputGini: '',
    inputGR: '',
    inputIG: 0,
    calculatedGini: 0,
    calculatedGR: 0,
    attribute: {},

  }),
  computed: {
    inputGiniArray() {
      return this.inputGini.split(";");
    },
    inputGRArray() {
      return this.inputGR.split(";");
    }
  },
  methods: {
    calcGini() {
      this.calculatedGini = gini(this.inputGiniArray);
    },
    calcGR() {
      this.calculatedGR = parseFloat(this.inputIG)/entropy(this.inputGRArray);
    }
  }
}
</script>

<style scoped>

</style>