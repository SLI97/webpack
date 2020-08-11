<template>
  <div>
    {{msg}}
    <span class="container">home!!</span>
    <img src="../assets/images/aaa.png" style="width:100px;height:100px;" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "this is my webpack home!",
    };
  },
  created() {
    // console.lo(123)
    // fetch('/api').then(res=>res.json()).then(res=>console.log(res))
  },
};
</script>

<style scoped lang="stylus">
.container {
  font-size: 134px;
  color: red;
  background: yellowgreen;
}
</style>

<!--<style>-->
	<!--.container{-->
		<!--color:red;-->
		<!--font-size :144px;-->
		<!--background: yellowgreen;-->
	<!--}-->
<!--</style>-->

