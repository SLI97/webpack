import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/views/home'

Vue.use(Router)
const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () =>
            import ('@/views/home'),
        // component: home,
    },
	{
		path: '/test',
		component: () =>
			import ('@/views/Test'),
		// component: home,
	},
]

export default new Router({
    base: '/',
    mode: 'history', // 后端支持可开
    // mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    routes
})
