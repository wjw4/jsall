const start =
	state =>
	(callback, delay = 0) => {
		stop(state)()
		state.timer = setInterval(() => callback(), delay)
	}

const stop = state => () => {
	if (state.timer != null) {
		clearInterval(state.timer)
		state.timer = null
	}
}

export const interval = () => {
	const state = { timer: null }
	return {
		start: start(state),
		stop: stop(state),
	}
}
