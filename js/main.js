const popup = document.querySelector('.popup')
const overlay = document.querySelector('.overlay')
const burgerButton = document.querySelector('.burger-menu-button')
const menu = document.querySelector('.header__main-nav')
const sliders = document.querySelectorAll('.swiper')
const widthScreen = document.documentElement.clientWidth
const body = document.body

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
	burgerButton.classList.toggle('menu-open')
	body.classList.toggle('menu-open')
	menu.classList.toggle('menu-open')
}

const slides = document.querySelectorAll('.project-slide')

slides.forEach((slide, index) => {
	slide.addEventListener('click', () => {
		showPopup()

		const description = getDescriptionByIndex(index)
		const title = getTitleByIndex(index)
		const imagePath = getImagePathByIndex(index)
		const typeApp = getTypeAppByIndex(index)

		const popup = document
			.querySelector('.popup')
			.classList.add('.popup-project')

		const popupContent = (document.querySelector('.popup-content').innerHTML = `
		
		<div class="project__inner">
				<div class="project__info">
					<h3 class=" project__title heading--small"> ${title}</h3>
					<div class="project__description">
						<p class="project__description-text  text--medium">${description}</p>
					</div>
					<div class="name-app__inner">
						<h4 class='name-app__title'>${typeApp}</h4>
						<div class="arrow-img__container">
							<img src="./assets/icons/arrow-right-square.svg" alt="arrow">
						</div>
					</div>
				</div>
				<div class="project__img">
					<img class='project__img-img' src="${imagePath}" alt="project-img">
				</div>
			</div>
		
		`)
	})
})

function getDescriptionByIndex(index) {
	const descriptions = [
		`We developed a custom crowdfunding platform 
	with a user-friendly interface that made it easy 
	for entrepreneurs to create campaigns and for investors to find projects to fund. We integrated a secure payment system and an admin panel for managing campaigns 
	and funds. The platform allowed investors to select 
	a reward item offered by the entrepreneur, 
	and it displayed the progress towards the funding goal.`,
		'Описание второго слайда',
		'Описание третьего слайда',
	]

	if (index >= 0 && index < descriptions.length) {
		return descriptions[index]
	}

	return null
}

function getTypeAppByIndex(index) {
	const types = [
		'Crowdfunding web application',
		'type project 2  слайда',
		'type project 3 слайда',
	]

	if (index >= 0 && index < types.length) {
		return types[index]
	}
	return null
}

function getTitleByIndex(index) {
	const titles = ['Name of project', 'Заголовок 2 слайда', 'Заголовок 3 слайда']

	if (index >= 0 && index < titles.length) {
		return titles[index]
	}
	return null
}

function getImagePathByIndex(index) {
	const imagePaths = [
		'./assets/images/popup-project.jpeg',
		'./assets/images/projet-img-two.png',
		'./assets/images/projet-img-three.png',
	]
	if (index >= 0 && index < imagePaths.length) {
		return imagePaths[index]
	}
	return null
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
	let thresholds
	if (widthScreen <= 768) {
		thresholds = [109, 281, 442, 653]
	} else {
		thresholds = [109, 540, 974, 1170]
	}

	thresholds.forEach((threshold, index) => {
		if (currentWidth >= threshold) {
			elements[index].classList.add('animate')
		}
	})
}

const animateExploreElements = currentWidth => {
	const elements = document.querySelectorAll('.explore .vertical-gray-line')

	let thresholds
	if (widthScreen <= 768) {
		thresholds = [219, 494]
	} else {
		thresholds = [392, 886]
	}

	thresholds.forEach((threshold, index) => {
		if (currentWidth >= threshold) {
			elements[index].classList.add('animate')
		}
	})
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

const buttons = document.querySelectorAll('.services-info__type-button')
const description = document.querySelector('.services-info__description-text')
const title = document.querySelector('.services-info__title')

buttons.forEach(button => {
	button.addEventListener('click', () => {
		const buttonText = button.innerText

		if (widthScreen > 375) {
			description.textContent = getDescriptionByButton(buttonText)
			title.textContent = getTitleByButton(buttonText)
		} else {
			buttons.forEach(btn => {
				if (btn.classList.contains('active') && btn.nextElementSibling) {
					btn.nextElementSibling.remove()
				}
			})

			const descriptionText = document.createElement('p')
			descriptionText.classList.add('services-info__description-text')
			descriptionText.textContent = getDescriptionByButton(buttonText)
			button.insertAdjacentElement('afterend', descriptionText)
		}

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
if (widthScreen > 375) {
	window.addEventListener('scroll', handleScroll)

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
}
