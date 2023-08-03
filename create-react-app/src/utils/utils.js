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

export const formatAddress = (address, maxStrNum=12) => {
	return address.slice(0, (maxStrNum/2)+1) + '.....' + address.slice(address.length-(maxStrNum/2), address.length)
} 