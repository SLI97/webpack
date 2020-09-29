import Vue from 'vue'
import Skeleton from './views/Skeleton'
console.log(999)
const mySkeleton =  new Vue({
	components: {
		Skeleton
	},
	template: '<Skeleton />'
	// template: "<div></div>"
})

export default mySkeleton
