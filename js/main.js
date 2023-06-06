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

// document
// 	.querySelector('.open-popup-button')
// 	.addEventListener('click', showPopup)

// document
// 	.querySelector('.close-popup-button')
// 	.addEventListener('click', hidePopup)
// burgerButton.addEventListener('click', toggleMenu)

const slider = document.querySelector('.slider-container')

// let mySwiper = new Swiper(slider, {
// 	slidesPerView: 3,
// 	spaceBetween: 10,
// 	loop: true,
// 	pagination: {
// 		el: '.swiper-pagination',
// 		clickable: true,
// 	},
// 	navigation: {
// 		nextEl: '.swiper-button-next',
// 		prevEl: '.swiper-button-prev',
// 	},
// })

let mySwiper

function mobileSlider() {
	if (window.innerWidth <= 600 && slider.dataset.mobile == 'false') {
		mySwiper = new Swiper(slider, {
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,
			slideClass: 'swiper-slide',
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		})
		slider.dataset.mobile = 'true'
	}

	if (window.innerWidth > 600) {
		slider.dataset.mobile = 'false'
		if (slider.classList.contains('swiper-container-initialized')) {
			mySwiper.destroy()
		}
	}
}

mobileSlider()

window.addEventListener('resize', () => {
	mobileSlider()
})
