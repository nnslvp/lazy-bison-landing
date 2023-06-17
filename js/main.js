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

document
	.querySelector('.open-popup-button')
	.addEventListener('click', showPopup)

document
	.querySelector('.close-popup-button')
	.addEventListener('click', hidePopup)
burgerButton.addEventListener('click', toggleMenu)

sliders.forEach(slider => {
	mobileSlider(slider)
	window.addEventListener('resize', () => {
		mobileSlider(slider)
	})
})

const grayLines = document.querySelectorAll('.gray-line')
const grayLine = document.querySelector('.testimonials__gray-line')
const grayVerticalLine = document.querySelector('.vertical-gray-line-1')

const animateLine = line => {
	const computedStyle = getComputedStyle(line)
	const width = computedStyle.width
	line.style.width = '0'

	const targetWidth = parseInt(width)

	const animationDuration = 4000
	const animationStep = (targetWidth / animationDuration) * 10

	let currentWidth = 0

	const animateWidth = () => {
		if (currentWidth >= targetWidth) {
			line.style.width = width
			return
		}

		currentWidth += animationStep
		line.style.width = currentWidth + 'px'

		if (line.classList.contains('testimonials__gray-line')) {
			const elements = document.querySelectorAll(
				'.vertical-gray-line-1, .vertical-gray-line-2, .vertical-gray-line-3, .vertical-gray-line-4'
			)

			if (currentWidth >= 109) {
				elements[0].classList.add('animate')
			}
			if (currentWidth >= 540) {
				elements[1].classList.add('animate')
			}
			if (currentWidth >= 974) {
				elements[2].classList.add('animate')
			}
			if (currentWidth >= 1170) {
				elements[3].classList.add('animate')
			}
		}

		if (line.classList.contains('explore__gray-line')) {
			const elements = document.querySelectorAll('.explore .vertical-gray-line')

			if (currentWidth >= 392) {
				elements[0].classList.add('animate')
			}

			if (currentWidth >= 886) {
				elements[1].classList.add('animate')
			}
		}

		requestAnimationFrame(animateWidth)
	}

	animateWidth()
}
const line = document.querySelector('.gray-line')

animateLine(line)

function elementInViewport(el) {
	let bounds = el.getBoundingClientRect()
	return (
		bounds.top >= 0 &&
		bounds.top < window.innerHeight &&
		!el.classList.contains('is-visible')
	)
}

let sections = document.querySelectorAll(
	'.explore, .services, .testimonials, .cases'
)

function handleScroll() {
	sections.forEach(function (block) {
		if (elementInViewport(block)) {
			block.classList.add('is-visible')
			const lines = document.querySelectorAll(
				`.${block.className.split(' ')[0]} .gray-line`
			)
			lines.forEach(line => {
				animateLine(line)
			})
		}
	})
}

window.addEventListener('scroll', handleScroll)
