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
	const width = getInitialWidth(line)
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

		animateElements(line, currentWidth)

		requestAnimationFrame(animateWidth)
	}

	animateWidth()
}

const getInitialWidth = line => {
	const computedStyle = getComputedStyle(line)
	return computedStyle.width
}

const animateElements = (line, currentWidth) => {
	if (line.classList.contains('testimonials__gray-line')) {
		animateTestimonialElements(currentWidth)
	}

	if (line.classList.contains('explore__gray-line')) {
		animateExploreElements(currentWidth)
	}
}

const animateTestimonialElements = currentWidth => {
	const elements = document.querySelectorAll(
		'.testimonials .vertical-gray-line'
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

const animateExploreElements = currentWidth => {
	const elements = document.querySelectorAll('.explore .vertical-gray-line')

	if (currentWidth >= 392) {
		elements[0].classList.add('animate')
	}

	if (currentWidth >= 886) {
		elements[1].classList.add('animate')
	}
}

function elementInViewport(el) {
	let bounds = el.getBoundingClientRect()
	return (
		bounds.top >= 0 &&
		bounds.top < window.innerHeight &&
		!el.classList.contains('is-visible')
	)
}

const line = document.querySelector('.lazy-bison .gray-line')

animateLine(line)

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

const buttons = document.querySelectorAll('.services-info__type-button')
const description = document.querySelector('.services-info__description-text')
const title = document.querySelector('.services-info__title')

buttons.forEach(button => {
	button.addEventListener('click', () => {
		const buttonText = button.innerText

		description.textContent = getDescriptionByButton(buttonText)
		title.textContent = getTitleByButton(buttonText)

		buttons.forEach(btn => {
			btn.classList.remove('active')
		})

		button.classList.add('active')
	})
})

function getDescriptionByButton(buttonText) {
	switch (buttonText) {
		case 'Web Development':
			return `Building and maintaining websites and web applications.
			Creating functional web experiences using HTML, CSS,
			JavaScript, and various web frameworks. It includes
			website design, front-end and back-end development,
			database integration, and maintenance and support.
			Technologies: Ruby on Rails, Hotwire, ReactJS, Angular,
			GoLang.`
		case 'MVP Development':
			return 'Description for MVP Development...'
		case 'Dedicated development team':
			return 'Description for Dedicated development team...'
		case 'UI/UX Design':
			return 'Description for UI/UX Design...'
		case 'Dedicated BA to each team for FREE':
			return 'Description for Dedicated BA...'
		case 'Mobile Development':
			return 'Description for Mobile Development...'
		default:
			return ''
	}
}

function getTitleByButton(buttonText) {
	switch (buttonText) {
		case 'Web Development':
			return 'Web Development Title'
		case 'MVP Development':
			return 'MVP Development Title'
		case 'Dedicated development team':
			return 'Dedicated Development Team Title'
		case 'UI/UX Design':
			return 'UI/UX Design Title'
		case 'Dedicated BA to each team for FREE':
			return 'Dedicated BA Title'
		case 'Mobile Development':
			return 'Mobile Development Title'
		default:
			return 'Default Title'
	}
}

const workers = document.querySelector('.workers')

setInterval(() => {
	const items = Array.from(workers.children)
	const shuffledItems = shuffleArray(items)

	workers.innerHTML = ''

	shuffledItems.forEach(item => {
		workers.appendChild(item)
	})
}, 3000)

function shuffleArray(array) {
	for (let i = array.length - 1; i >= 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}
