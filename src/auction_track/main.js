import Vue from 'vue';
import App from './main.vue';

Vue.config.devtools = process.env.APP_MODE == 'development';

new Vue({
  name: 'app',
  el: '#app',
  render: h => h(App)
});