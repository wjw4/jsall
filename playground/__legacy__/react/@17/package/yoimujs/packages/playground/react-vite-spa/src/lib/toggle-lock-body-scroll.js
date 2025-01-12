export const toggleLockBodyScroll = lock => {
	if (lock) {
		document.body.classList.add('overflow-y-hidden')
	} else {
		if (!document.body.classList.contains('overflow-y-hidden')) return
		document.body.classList.remove('overflow-y-hidden')
	}
}
