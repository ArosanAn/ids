<template>
  <div id="app">
<!--  <Entropy></Entropy>-->
    <!--     <Variance></Variance>-->
<!--       <Gini></Gini>-->
<!--    <LinearRegression></LinearRegression>-->
    <GradientDescent />
  </div>
</template>

<script>
// import Entropy from './components/Entropy'
// import Variance from './components/Variance'
// import Gini from "@/components/Gini";
//import LinearRegression from "@/components/LinearRegression";
import GradientDescent from "@/components/GradientDescent";

export default {
  name: 'App',
  components: {
    // Entropy,
    // Variance,
    // Gini,
    //  LinearRegression,
    GradientDescent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
