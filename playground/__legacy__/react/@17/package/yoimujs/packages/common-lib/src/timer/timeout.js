const start =
	state =>
	(callback, delay = 0) => {
		stop(state)()
		state.timer = setTimeout(() => callback(), delay)
	}

const startSync =
	state =>
	(promiseFun, delay = 0) => {
		return new Promise((resolve, reject) => {
			stop(state)()
			state.timer = setTimeout(async () => {
				try {
					const res = await promiseFun()
					state.timer = null
					resolve(res)
				} catch (err) {
					console.error(err)
					state.timer = null
					reject(err)
				}
			}, delay)
		})
	}

const stop = state => () => {
	if (state.timer != null) {
		clearTimeout(state.timer)
		state.timer = null
	}
}

export const timeout = () => {
	const state = { timer: null }
	return {
		start: start(state),
		startSync: startSync(state),
		stop: stop(state),
	}
}
