const express = require('express')
const app = express()
const path = require('path')
const router = require('./src/mock/router')
const fs = require("fs")


app.get('/*.js', (req, res) => {
	console.log(decodeURIComponent(req.url.slice(1)))
	const data = fs.readFileSync(path.join(__dirname,"./dist",decodeURIComponent(req.url)))
	setTimeout(()=>{
		res.write(data)
		res.end()
	},3000)
})

// app.use("/api", router)
app.use(express.static(path.resolve(__dirname, './dist')))


app.listen(3000, () => {
	console.log('App  is now running on port 3000!')
})
