import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import
MediaplayerComponent
from 'zjj-components'
import "zjj-components/lib/my-components.css"

Vue.use(MediaplayerComponent)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')