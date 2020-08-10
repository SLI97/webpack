<template>
	<div>{{msg}}</div>
</template>
<script>
	export default {
		data() {
			return {
				msg: "this is my webpack home!",
			};
		},
		created(){
			fetch('/api').then(res=>res.json()).then(res=>console.log(res))
		}
	};
</script>
<style lang='less'>
</style>
