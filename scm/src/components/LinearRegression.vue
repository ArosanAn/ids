<template>
  <div>
    <v-container style="width: 500px">
      <v-row>
        <v-col cols="6">
          <v-text-field label="descriptiveFeature" v-model="descriptiveFeature" @keydown.enter="pushArray"></v-text-field>
        </v-col>
        <v-btn small @click="pushArray">Push to table</v-btn>
        <v-col cols="6">
          {{rowArray}}
        </v-col>
      </v-row>
      <v-row>
        Function MWD1:
        <v-col cols="3">
          <v-text-field label="w0;w1,..." v-model="input_mwd"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-btn small @click="calcPrediction">Calc prediction</v-btn>
        </v-col>
      </v-row>
      <br>
      <v-row>
        <v-simple-table dark>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Calories
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="(item, idx) in rowArray"
                :key="idx"
            >
              <td v-for="(v, i) in item" :key="i">{{ v }}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field label="targetFeature" v-model="targetFeature"></v-text-field>
        </v-col>
        <v-btn small @click="calcError">Calc error</v-btn>
        <v-col cols="6">
          {{inputTargetFeature}}
        </v-col>
      </v-row>
      <v-row>
        MWd: {{calculatedMwd}}
      </v-row>
      <v-row>
        Error: {{errorArray}}
      </v-row>
      <v-row>
        Error^2: {{errorSquare}}
      </v-row>
      <v-row>
        totalErrorSquare: {{totalErrorSquare}}
      </v-row>
      <v-row>
        L1: {{squareError}}
      </v-row>
      <v-row>
        <v-btn small @click="calcLogistic">Calc Logistic</v-btn>
      </v-row>
      <v-row>
        MwdLogistic: {{calculatedMwdLogistic}}
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {measSquaredError, mwd1, mwd2, mwd3} from "@/functions/function";

function logistic(pred) {
  return pred.map(val => (1/((1+Math.exp(-val)))).toFixed(4));
}

export default {
  name: "LinearRegression",
  data: () => ({
    descriptiveFeature: '',
    rowArray: [],
    prediction: '',
    input_mwd: '',
    calculatedMwd: [],
    targetFeature: '',
    squareError: 0,
    calculatedMwdLogistic: []
  }),
  computed: {
    inputR() {
      return this.descriptiveFeature.split(";")
    },
    // eslint-disable-next-line vue/return-in-computed-property
    inputMwd() {
      return this.input_mwd.split(";")
    },
    inputTargetFeature() {
      return this.targetFeature.split(";")
    },
    errorArray() {
      return this.inputTargetFeature.map((val, idx) => parseFloat(val)-parseFloat(this.calculatedMwd[idx]).toFixed(2));
    },
    errorSquare() {
      return this.errorArray.map(v=>Math.pow(v, 2).toFixed(2));
    },
    totalErrorSquare() {
      return this.errorSquare.reduce((acc, curr) => acc + parseFloat(curr), 0);
    }
  },
  methods: {
    pushArray() {
      if (this.rowArray.length === 0) {
        this.inputR.forEach((val) => {
          this.rowArray.push([val]);
          this.descriptiveFeature = ''
        });
      } else {
        this.inputR.forEach((value, idx) => {
          this.rowArray[idx].push(value);
          this.descriptiveFeature = '';
        });
      }
    },
    calcError() {
      this.squareError = measSquaredError(this.inputTargetFeature, this.calculatedMwd);
    },
    calcPrediction() {
      // const mwd = this.prediction.split(";");
      if(this.inputMwd.length === 2) {
        console.log('mwd1', mwd1(...this.inputMwd, this.rowArray[0]));
        this.calculatedMwd = mwd1(...this.inputMwd, this.rowArray[0])
      } else if(this.inputMwd.length === 3) {
        console.log('mwd2', mwd2(...this.inputMwd, this.rowArray[0], this.rowArray[1]));
        this.calculatedMwd = mwd2(...this.inputMwd, this.rowArray[0], this.rowArray[1])
      } else if (this.inputMwd.length === 4) {
        this.calculatedMwd = mwd3(...this.inputMwd, this.rowArray[0], this.rowArray[1], this.rowArray[2])
      }
    },
    calcLogistic() {
      this.calculatedMwdLogistic = logistic(this.calculatedMwd)
    }
  }
}
</script>

<style scoped>

</style>