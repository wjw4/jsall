import moment from 'moment'

// formatToTime = 'YYYY-MM-DD HH:mm:ss'
// formatToMinute = 'YYYY-MM-DD HH:mm'
// formatToDate = 'YYYY-MM-DD'

const today = () => [moment().startOf('day'), moment().endOf('day')]

const yesterday = () => [
	moment().subtract(1, 'day').startOf('day'),
	moment().endOf('day'),
]

const thisWeek = () => [
	moment().isoWeekday(1).startOf('day'),
	moment().endOf('day'),
]

const pastWeek = () => [
	moment().isoWeekday(-6).startOf('day'),
	moment().isoWeekday(0).endOf('day'),
]

const thisMonth = () => [moment().date(1).startOf('day'), moment().endOf('day')]

const pastMonth = () => [
	moment()
		.month(moment().month() - 1)
		.date(1)
		.startOf('day'),
	moment()
		.month(moment().month() - 1)
		.endOf('month'),
]

// const msTranslate = (ms = 0) => {
// 	const sec = 1000
// 	const min = sec * 60
// 	// const hour = min * 60
// 	// const day = hour * 24
// 	// const cDay = Math.floor(ms / day)
// 	// const cHour = Math.floor((ms / hour) % 24)
// 	const cMin = Math.floor((ms / min) % 60)
// 	const cSec = Math.floor((ms / sec) % 60)
//
// 	// return `${cDay}天 ${cHour}時 ${cMin}分 ${cSec}秒`
// 	if (cMin > 0) {
// 		return `${cMin}${t('簡寫:分')} ${cSec}${t('簡寫:秒')}`
// 	} else {
// 		return `${cSec}${t('簡寫:秒')}`
// 	}
// }

export default {
	today,
	yesterday,
	thisWeek,
	pastWeek,
	thisMonth,
	pastMonth,
}
