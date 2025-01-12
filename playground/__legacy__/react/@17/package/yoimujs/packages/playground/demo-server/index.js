const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

const sendRes =
	ctx =>
	({ statusCode = 200, message = '成功', data = null } = {}) => {
		setTimeout(() => {
			ctx.status = statusCode
			ctx.body = {
				success: statusCode === 200,
				message,
				data,
			}
		}, Math.random() * 1000 + 100)
	}

router.get('/', ctx => {
	ctx.body = 'hello api'
})

router.post('/api/login', ctx => {
	ctx.body = 'hello api'
})

router.post('/api/todo/list', ctx => {
	sendRes(ctx)({
		data: [
			{ id: 1, name: '吃飯', createTime: '2022-05-31 12:38' },
			{ id: 2, name: '睡覺', createTime: '2022-05-31 16:42' },
			{ id: 3, name: '運動', createTime: '2022-05-31 20:10' },
			{ id: 4, name: '學習', createTime: '2022-05-31 23:30' },
		],
	})
})

app.use(router.routes())
app.listen(9296)
console.log('http://localhost:9296')
