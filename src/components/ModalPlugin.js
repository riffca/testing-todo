const Plugin = {
	install (Vue) {
		if (this.installed) {
			return
		}

		this.installed = true
		this.event = new Vue()
		Vue.prototype.$modal = {
			show (name, closeAction) {
				if (typeof name === 'string') {
					Plugin.event.$emit('toggle', name, true, closeAction)
				} else {
					console.warn('provide modal name')
				}
			},
			hide (name) {
				if (typeof name === 'string') {
					Plugin.event.$emit('toggle', name, false)
				} else {
					console.warn('provide modal name')
				}
			},
		}
	}
}

export default Plugin