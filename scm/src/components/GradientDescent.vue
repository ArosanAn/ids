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
        <v-col cols="6">
          <v-text-field label="targetFeature" v-model="targetFeature"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field label="prediction" v-model="prediction"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field label="error" v-model="error"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field label="learning rate" v-model="learningRate"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <v-text-field label="w0;w1,..." v-model="input_mwd"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-btn small @click="updateWeights">Calc prediction</v-btn>
        </v-col>
      </v-row>
      <v-row>
        error delta: {{errorDelta}}
      </v-row>
      <v-row>
        Updated weights: {{updatedWeights}}
      </v-row>
      <br>
    </v-container>
  </div>
</template>

<script>

export default {
  name: "GradientDescent",
  data: () => ({
    rowArray: [],
    targetFeature: '',
    error: '',
    prediction: '',
    calculatedMwd: [],
    learningRate: 0,
    descriptiveFeature: '',
    input_mwd: '',
    updatedWeights: [],
    errorDelta: []
  }),
  computed: {
    inputR() {
      return this.descriptiveFeature.split(";")
    },
    inputTargetFeature() {
      return this.targetFeature.split(";")
    },
    inputError() {
      return this.error.split(";")
    },
    inputPrediction() {
      return this.prediction.split(";")
    },
    inputMwd() {
      return this.input_mwd.split(";")
    },
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
    updateWeights() {

      this.rowArray = [['3.2','4.4','6.2'],["50.4","56.7", "63.4"]];
      this.rowArray.unshift(Array(this.rowArray[0].length).fill(1));
      this.inputMwd.forEach((val, index) => {
        let calcValue = 0;
        this.inputTargetFeature.forEach((value, idx) => {
          calcValue +=(( parseFloat(value) - parseFloat(this.inputPrediction[idx]))*parseFloat(this.rowArray[index][idx]))
        })
        this.errorDelta.push(calcValue.toFixed(2));
      });


     this.updatedWeights = this.errorDelta.map((value, idx)=>{
        const test1 = parseFloat(this.inputMwd[idx]);
        const test2 = (parseFloat(this.learningRate)*(parseFloat(value))).toFixed(2);
        const test3 = parseFloat(test1)+parseFloat(test2);
        return test3
      });
    }
  }
}
</script>

<style scoped>

</style>