const popup = document.querySelector('.popup')
const overlay = document.querySelector('.overlay')
const burgerButton = document.querySelector('.burger-menu-button')
const menu = document.querySelector('.header__main-nav')
const sliders = document.querySelectorAll('.swiper')

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

function mobileSlider(slider) {
	let mySwiper
	if (window.innerWidth <= 600 && slider.dataset.mobile == 'false') {
		mySwiper = new Swiper(slider, {
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,
			pagination: {
				el: slider.querySelector('.swiper-pagination'),
				clickable: true,
			},
		})
		slider.dataset.mobile = 'true'
	}

	if (window.innerWidth > 375) {
		slider.dataset.mobile = 'false'
		if (slider.classList.contains('swiper-container-initialized')) {
			mySwiper.destroy()
		}
	}
}

// document
// 	.querySelector('.open-popup-button')
// 	.addEventListener('click', showPopup)

// document
// 	.querySelector('.close-popup-button')
// 	.addEventListener('click', hidePopup)
// burgerButton.addEventListener('click', toggleMenu)

sliders.forEach(slider => {
	mobileSlider(slider)
	window.addEventListener('resize', () => {
		mobileSlider(slider)
	})
})
