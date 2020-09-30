const Vue = require('vue')
const VueSsrRenderer = require('vue-server-renderer')
const fs = require("fs")
const path = require("path")

const vm = new Vue({
	data(){
		return{
			msg:"zxczxc"
		}
	},
	mounted(){
		const haha = (str)=> {
			console.log(str)
		}
		haha("haha")
	},
	methods:{
		qqq(){
			console.log("qqq")
		}
	},
	template: '<h1 @click="qqq">我是Vue!{{msg}}</h1>'
})

const renderer = VueSsrRenderer.createRenderer({
	template: `<!DOCTYPE>
						<html>
							<head>
							<title>vue ssr</title>
							{{title}}
							{{{meta}}}
							</head>
							<body>
								<h1>vue ssr~</h1>
							<!--vue-ssr-outlet-->
							</body>	
						</html>`
})

const context = {
	title: 'my vue ssr',
	meta: `<meta haha="123" />`
}

renderer.renderToString(vm, context).then(html => {
	fs.writeFileSync(path.resolve(__dirname,"../../public/test.html"),html,'utf-8')
	// console.log(html)
})
