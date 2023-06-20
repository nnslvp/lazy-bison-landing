const burgerButton = document.querySelector('.burger-menu-button')
const menu = document.querySelector('.header__main-nav')

function toggleMenu() {
	burgerButton.classList.toggle('menu-open')
	body.classList.toggle('menu-open')
	menu.classList.toggle('menu-open')
}

burgerButton.addEventListener('click', toggleMenu)
