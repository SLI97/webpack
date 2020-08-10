// main.js
import Vue from 'vue'
import App from './app'
import router from './router'
import '@/assets/css/base.css'

new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
