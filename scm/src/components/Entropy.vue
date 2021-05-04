<template>
<div>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <v-row>
          <v-col cols="8" sm="4">
            <v-text-field label="Entropy" v-model="entropy"></v-text-field>
          </v-col>
          <v-col cols="4" sm="2">
            {{calculatedEntropy}} <br>
            <v-btn x-small @click="calcEntropy">Calc</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <template v-if="attributeArray.length > 0">
            <v-col cols="12" v-for="(l, idx) in attributeArray" :key="idx">
              E({{l}})={{entropyAttributArray[idx]}}
            </v-col>
            <v-col cols="12">
              Weighted Sum: {{weightedSum}}
            </v-col>
            <v-col cols="12">
              IG: {{informationGain}}
            </v-col>
          </template>
        </v-row>
      </v-col>
      <v-col cols="12" sm="6">
        <v-row>
          <v-col cols="8">
            <v-text-field label="Number Attributes" v-model="numberAttributes"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-btn x-small @click="createRows">add</v-btn>
            <v-btn x-small @click="resetRows">clear</v-btn>
          </v-col>
        </v-row>
        <template v-if="attributeArray.length > 0">
          <v-row v-for="(l, idx) in attributeArray" :key="idx">
            <v-col cols="8">
              <v-text-field :label="'Attribute '+ (idx+1)" v-model="attributeArray[idx]"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8">
              <v-btn block dark @click="calcArrayAttribute">Calc IG</v-btn>
            </v-col>
          </v-row>
        </template>
      </v-col>
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
    attributeArray: [],
    inputAttributeArray: [],
    entropyAttributArray: [],
    weightedSum: 0,
    tableElements: 0,
    informationGain: 0
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
    },
    createRows() {
      this.attributeArray = new Array(parseInt(this.numberAttributes));
      this.numberAttributes = 0;
    },
    calcArrayAttribute() {
      this.inputAttributeArray = this.attributeArray.map(val => val.split(";"));
      this.entropyAttributArray = this.inputAttributeArray.map(val => entropy(val).toFixed(4));
      this.tableElements = this.inputAttributeArray.reduce((acc, cur) => {
        return acc + cur.reduce((acc1, cur1) => acc1 + parseInt(cur1), 0)
      },0);

      this.entropyAttributArray.forEach((val, idx) => {
        const additiert = this.inputAttributeArray[idx].reduce((acc, cur) => acc+parseFloat(cur),0);
        console.log('additiert', additiert);
        const anteil = (parseFloat(additiert)/parseFloat(this.tableElements)) ;
        this.weightedSum = (parseFloat(this.weightedSum) + parseFloat(val)*parseFloat(anteil)).toFixed(4);
        console.log('anteil', anteil, "entropy", val, this.weightedSum);
      })
      this.informationGain = (this.calculatedEntropy - this.weightedSum).toFixed(4);
    },
    resetRows() {
      this.numberAttributes = 0;
      this.attributeArray = [];
      this.inputAttributeArray = [];
      this.entropyAttributArray= [];
      this.weightedSum= 0;
      this.tableElements= 0;
      this.informationGain= 0;
    }
  }
}
</script>

<style scoped>

</style>