<template>
	<div class="haha">{{msg}}
		<span class="zzz">12312321</span>
		<img src="../assets/images/aaa.png" style="width:100px;height:100px;">
	</div>
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


<style scoped lang="stylus">
	.container
		color:red
		background: yellowgreen
	
</style>


<!--<style>-->
	<!--span{-->
		<!--color:red;-->
		<!--font-size: 50px;-->
		<!--background: yellowgreen;-->
	<!--}-->

<!--</style>-->
