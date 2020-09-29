<template>
	<div>
		{{msg}}
		<router-link to="/test">跳转</router-link>
		<!--<span class="container">home!!123</span>-->
		<!--<img src="../assets/images/aaa.png" class="img"/>-->
		<!--<haha :message="'我是信息!'">-->
			<!--<div class="slot">{{'ZXC123' | devide}}</div>-->
		<!--</haha>-->
		<!--<div>{{123123 | qqq}}</div>-->
		<!--<div @click="qwe">按我发送信息</div>-->
		<!--<div v-focus v-if="showOrNot">我是自定义指令</div>-->
		<!--<div @click="count++">{{count}}</div>-->
		<!--<div @click="showOrNot = true">绑定</div>-->
		<!--<div @click="showOrNot = false">解绑</div>-->
	</div>
</template>

<script>
	export default {
		// 这些代码会转成网页的meta标签里的内容
		metaInfo: {
			title: '标题',
			meta: [
				{name: 'keywords', content: '关键字'},
				{name: 'description', content: '网页描述'}
			]
		},
		data() {
			return {
				msg: "this is my webpack home!1!!1",
				mySocket: null,
				count: 0,
				showOrNot: true,
			};
		},
		directives: {
			focus: {
				bind(el, binding, vnode, oldVnode) {
					// console.log(el.parentNode)
					console.log("bind")
					console.log(binding)
					el.style.background = "red"
				},
				inserted(el, binding, vnode, oldVnode) {
					// console.log(el.parentNode)
					console.log("inserted")
					el.focus()
				},
				update(el, binding, vnode, oldVnode) {
					console.log("update")
					el.focus()
				},
				componentUpdated(el, binding, vnode, oldVnode) {
					console.log("componentUpdated")
					el.focus()
				},
				unbind(el, binding, vnode, oldVnode) {
					console.log("unbind")
					el.focus()
				}
			}
		},
		filters: {
			qqq(val) {
				return val / 100
			}
		},
		created() {
			// if ("WebSocket" in window) {
			// 	// alert("您的浏览器支持 WebSocket!");
			//
			// 	// 打开一个 web socket
			// 	var ws = this.mySocket = new WebSocket("ws://localhost:3000");
			//
			// 	ws.onopen = function () {
			// 		// Web Socket 已连接上，使用 send() 方法发送数据
			// 		ws.send("发送数据");
			// 		// alert("数据发送中...");
			// 	};
			//
			// 	ws.onmessage = function (evt) {
			// 		var received_msg = evt.data;
			// 		// alert("数据已接收...");
			// 	};
			//
			// 	ws.onclose = function () {
			// 		// 关闭 websocket
			// 		// alert("连接已关闭...");
			// 	};
			// }
			//
			// else {
			// 	// 浏览器不支持 WebSocket
			// 	// alert("您的浏览器不支持 WebSocket!");
			// }
		},
		methods: {
			haha() {
				this.$router.push({path: "/test"})
				// history.pushState(null, null, '/test');
			},
			qwe() {
				this.mySocket.send("是我是我~")
			}
		}
	};
</script>

<style scoped lang="stylus">
	.container {
		font-size: 134px;
		color: red;
		background: yellowgreen;
	}
	
	.img {
		width: 100px;
		height: 100px;
		transform: rotate(45deg);
	}
</style>

<!--<style>-->
<!--.container{-->
<!--color:red;-->
<!--font-size :144px;-->
<!--background: yellowgreen;-->
<!--}-->
<!--</style>-->

