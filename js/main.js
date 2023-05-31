const popup = document.querySelector('.popup')
const overlay = document.querySelector('.overlay')
const burgerButton = document.querySelector('.burger-menu-button')
const menu = document.querySelector('.header__main-nav')

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

function toggleMenu() {
	burgerButton.classList.toggle('open')
	menu.classList.toggle('open')
}

document
	.querySelector('.open-popup-button')
	.addEventListener('click', showPopup)
document
	.querySelector('.close-popup-button')
	.addEventListener('click', hidePopup)
burgerButton.addEventListener('click', toggleMenu)
