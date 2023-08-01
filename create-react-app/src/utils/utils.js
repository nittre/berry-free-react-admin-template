export const pasteToClipboard = (value) => {
	try {
		const textarea = document.createElement('textarea')
		textarea.value = value
		document.body.appendChild(textarea)
		textarea.select()
		document.execCommand('copy')
		document.body.removeChild(textarea)
		return true
	} catch (e) {
		return false
	}
}