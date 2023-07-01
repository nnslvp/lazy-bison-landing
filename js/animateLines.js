const grayLines = document.querySelectorAll('.gray-line')
const grayLine = document.querySelector('.testimonials__gray-line')
const grayVerticalLine = document.querySelector('.vertical-gray-line-1')
const widthScreen = document.documentElement.clientWidth
const testimonialsSectionVerticalLines = document.querySelectorAll(
	'.testimonials .vertical-gray-line'
)
const exploreSectionVerticalLines = document.querySelectorAll(
	'.explore .vertical-gray-line'
)

const animateLines = lines => {
	lines.forEach(line => {
		animateLineHeight(line)
	})
}

const animateVerticalLines = line => {
	if (line.classList.contains('testimonials__gray-line')) {
		animateLines(testimonialsSectionVerticalLines)
	}

	if (line.classList.contains('explore__gray-line')) {
		animateLines(exploreSectionVerticalLines)
	}
}

const getInitialWidth = line => {
	const computedStyle = getComputedStyle(line)
	return computedStyle.width
}

const getInitialHeight = line => {
	const computedStyle = getComputedStyle(line)
	return computedStyle.height
}

const animateLineWith = line => {
	const width = getInitialWidth(line)
	const targetWidth = parseInt(width)
	const animationDuration = 1000
	const animationStep = (targetWidth / animationDuration) * 10
	let currentWidth = 0
	line.style.opacity = 1
	const animateWidth = () => {
		if (currentWidth >= targetWidth) {
			line.style.maxWidth = width
			animateVerticalLines(line)
			return
		}

		currentWidth += animationStep
		line.style.maxWidth = currentWidth + 'px'

		requestAnimationFrame(animateWidth)
	}

	animateWidth()
}

const animateLineHeight = line => {
	const height = getInitialHeight(line)
	const targetHeight = parseInt(height)
	const animationDuration = 1000
	const animationStep = (targetHeight / animationDuration) * 10

	let currentHeight = 0
	line.style.opacity = 1

	const animateHeight = () => {
		if (currentHeight >= targetHeight) {
			line.style.maxHeight = height
			animateVerticalLines(line)
			return
		}

		currentHeight += animationStep
		line.style.maxHeight = currentHeight + 'px'

		if (currentHeight < targetHeight) {
			requestAnimationFrame(animateHeight)
		}
	}

	animateHeight()
}

function elementInViewport(el) {
	let bounds = el.getBoundingClientRect()
	return (
		bounds.top >= 0 &&
		bounds.top < window.innerHeight &&
		!el.classList.contains('is-visible')
	)
}

const sections = document.querySelectorAll(
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
				animateLineWith(line)
			})
		}
	})
}

const line = document.querySelector('.lazy-bison .gray-line')

animateLineWith(line)

if (widthScreen > 375) {
	window.addEventListener('scroll', handleScroll)
}
