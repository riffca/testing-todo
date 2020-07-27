import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'


import modalPlugin from './components/ModalPlugin'

Vue.config.productionTip = false

Vue.use(modalPlugin)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
