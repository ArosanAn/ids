<template>
  <div>
    <v-container style="width: 500px">
      <v-row>
        <v-col cols="6">
          <v-text-field label="variance" v-model="inputArray"></v-text-field>
        </v-col>
        <v-btn @click="calcAll">CalcAll</v-btn>
      </v-row>
      <v-row>
        <v-col cols="6">
          Mean: {{meanValue}}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          Variance: {{varianceValue}}
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {mean, variance} from '../functions/function';
export default {
  name: "Variance",
  data: () => ({
    inputArray: '',
    meanValue: 0,
    varianceValue: 0,
    attribute: {},

  }),
  computed: {
    inputVariance() {
      return this.inputArray.split(";");
    }
  },
  methods: {
    calcEntropy() {
      this.meanValue = mean(this.inputVariance).toFixed(2);
    },
    calcVariance() {
      this.varianceValue = variance(this.inputVariance, this.meanValue).toFixed(4);
    },
    calcAll() {
      this.calcEntropy();
      this.calcVariance();
    }
  }
}
</script>

<style scoped>

</style>