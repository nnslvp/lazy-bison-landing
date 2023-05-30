const popup = document.querySelector('.popup')
const overlay = document.querySelector('.overlay')

function showPopup() {
	popup.style.display = 'block'
	overlay.style.display = 'block'
	document.body.style.overflow = 'hidden'
}

function hidePopup() {
	popup.style.display = 'none'
	overlay.style.display = 'none'
	document.body.style.overflow = 'auto'
}

document
	.querySelector('.open-popup-button')
	.addEventListener('click', showPopup)
document
	.querySelector('.close-popup-button')
	.addEventListener('click', hidePopup)
