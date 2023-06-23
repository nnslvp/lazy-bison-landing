const grayLines = document.querySelectorAll('.gray-line')
const grayLine = document.querySelector('.testimonials__gray-line')
const grayVerticalLine = document.querySelector('.vertical-gray-line-1')
const widthScreen = document.documentElement.clientWidth

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

const getInitialWidth = line => {
	const computedStyle = getComputedStyle(line)
	return computedStyle.width
}

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

const line = document.querySelector('.lazy-bison .gray-line')

animateLine(line)

if (widthScreen > 375) {
	window.addEventListener('scroll', handleScroll)
}
