// main.js
import Vue from 'vue'
import App from './app'
import router from './router'

new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
// console.log(999)
