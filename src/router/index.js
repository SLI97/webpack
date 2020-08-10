import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routes = [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/home',
		component: () => import('@/views/home'),
	},
]

export default new Router({
	base: '/',
	// mode: 'history', // 后端支持可开
	mode: 'hash', // 后端支持可开
	scrollBehavior: () => ({y: 0}),
	routes
})


