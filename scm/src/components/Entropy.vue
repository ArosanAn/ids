<template>
<div>
  <v-container style="width: 300px">
    <v-row>
      <v-col cols="6">
        <v-text-field label="Entropy" v-model="entropy"></v-text-field>
      </v-col>
      <v-col cols="6">
        {{calculatedEntropy}}
      </v-col>
      <v-btn small @click="calcEntropy">Calc</v-btn>
      <br>
    </v-row>
    <v-row>
      E(1,2) = {{ defaultEntropy([1, 2])}}<br>
      E(3,2) = {{ defaultEntropy([3, 2])}}<br>
      E(1,4) = {{ defaultEntropy([1,4])}}<br>
      E(3,4) = {{ defaultEntropy([3, 4])}}
    </v-row>
  </v-container>
</div>
</template>

<script>
import {entropy} from '../functions/function'

export default {
  name: "Entropy",
  data: () => ({
    entropy: '',
    numberAttributes: 0,
    calculatedEntropy: 0,
    attribute: {},

  }),
  computed: {
    inputEntropy() {
      return this.entropy.split(";");
    }
  },
  methods: {
    calcEntropy() {
     this.calculatedEntropy = entropy(this.inputEntropy).toFixed(4);
    },
    defaultEntropy(x) {
      return entropy(x).toFixed(4);
    }
  }
}
</script>

<style scoped>

</style>