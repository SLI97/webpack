<template>
	<div>
		<h1 @click="haha">按我跳转</h1>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			
			}
		},
		created(){
		
		},
		methods:{
			haha(){
				this.$router.push({path:"/home"})
			}
		}
	}

</script>
