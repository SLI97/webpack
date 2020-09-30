// skeleton.js
const fs = require('fs')
const { resolve } = require('path')
const { createBundleRenderer } = require('vue-server-renderer')

function createRenderer(bundle, options) {
	return createBundleRenderer(bundle, Object.assign(options, {
		// recommended for performance
		// runInNewContext: false
	}))
}

const bundle = require('./dist/skeleton.json')
const template = fs.readFileSync(resolve('./public/template.html'), 'utf-8')
// console.log(template)
const renderer = createRenderer(bundle, {
	template
})

/**
 * 说明：
 * 默认的index.html中包含<%= BASE_URL %>的插值语法
 * 我们不在生成骨架屏这一步改变模板中的这个插值
 * 因为这个插值会在项目构建时完成
 * 但是如果模板中有这个插值语法，而我们在vue-server-renderder中使用这个模板，而不传值的话，是会报错的
 * 所以，我们去掉模板中的插值，而使用这个传参的方式，再将这两个插值原模原样返回到模板中
 *
 * 文档： https://cli.vuejs.org/zh/guide/html-and-static-assets.html#%E6%8F%92%E5%80%BC
 */
const context = {
	title: 'vue skeleton',  // default title
	meta:`<meta haha="123" />`
}

renderer.renderToString(context, (err, html) => {
	if(err) {
		console.error(err.stack)
		return
	}
	console.log(html)
	fs.writeFileSync(resolve(__dirname, './public/index.html'), html, 'utf-8')
})
