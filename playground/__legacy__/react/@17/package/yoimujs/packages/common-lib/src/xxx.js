// routeHistory

// doingTime
const doingTime = (doingMs = 0) => {
	const sec = 1000
	const min = sec * 60
	const hour = min * 60
	const day = hour * 24
	const days = Math.floor(doingMs / day)
	const strDays = String(days).padStart(2, '0')
	const hours = String(Math.floor((doingMs / hour) % 24)).padStart(2, '0')
	const mins = String(Math.floor((doingMs / min) % 60)).padStart(2, '0')
	const secs = String(Math.floor((doingMs / sec) % 60)).padStart(2, '0')
	if (days > 0) {
		return `${strDays} : ${hours} : ${mins} : ${secs}`
	} else {
		return `${hours} : ${mins} : ${secs}`
	}
}
