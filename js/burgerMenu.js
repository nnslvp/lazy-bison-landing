const burgerButton = document.querySelector('.burger-menu-button')
const menu = document.querySelector('.header__main-nav')
const body = document.body
const navMenuLinks = document.querySelectorAll('.header__main-nav-link')

function closeMenu() {
	if (menu.classList.contains('menu-open')) {
		menu.classList.remove('menu-open')
		burgerButton.classList.remove('menu-open')
		body.classList.remove('hidden')
	}
}

function toggleMenu() {
	burgerButton.classList.toggle('menu-open')
	body.classList.toggle('hidden')
	menu.classList.toggle('menu-open')
}

navMenuLinks.forEach(link => {
	link.addEventListener('click', () => {
		if (menu.classList.contains('menu-open')) {
			closeMenu()
		}
	})
})
burgerButton.addEventListener('click', toggleMenu)
