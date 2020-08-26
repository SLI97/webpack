// main.js
import Vue from 'vue'
import App from './app'
import router from './router'
import '@/assets/css/base.css'

Vue.component("haha", {
	props: ["message"],
	template: "<div ><h1>组件定义之全局组件</h1><h4>{{message}}<slot></slot></h4></div>"
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

Vue.filter("devide",(value)=>{
	return value.split('').reverse().join('')
})

// const myVue = Vue.extend({
// 	mixins:[{
// 		created(){
// 			console.log("我是mixin的created")
// 		}
// 	}],
// 	data() {
// 		return {
// 			message: "nihao"
// 		}
// 	},
// 	// template: "<div id='app'><h1>我是继承vue构造函数myVue的实例模板</h1><h4 id='zzz'>{{message}}<slot></slot></h4></div>",
// 	render(h){
// 		return h("h1",{id:'h1',class:"h2"},"我是一段文本")
// 	},
// 	created(){
// 		console.log("我是自己的created")
// 	}
// })

// const instance = new myVue()
// const instance1 = new myVue()
// instance.$mount("#app")
// instance1.$mount("#zzz")

// // 注册一个全局自定义指令 v-focus
// Vue.directive('focus', {
// 	// 当绑定元素插入到 DOM 中。
// 	inserted: function (el) {
// 		// 聚焦元素
// 		el.focus()
// 	}
// })
