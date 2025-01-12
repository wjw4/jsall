const start = state => callback => {
	function run() {
		callback()
		state.timer = requestAnimationFrame(run)
	}

	state.timer = requestAnimationFrame(run)
}

const stop = state => () => {
	cancelAnimationFrame(state.timer)
}

export const aniFrame = () => {
	let state = { timer: null }
	return {
		start: start(state),
		stop: stop(state),
	}
}
