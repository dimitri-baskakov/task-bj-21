import App from "./App.vue";
import Vue from "vue";
import router from "./router";
import store from "./store";

import "./boot/filters.js";
import "./css/app.sass";
import i18n from "./boot/i18n";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
