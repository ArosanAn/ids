import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from './router/router';

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  Vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
