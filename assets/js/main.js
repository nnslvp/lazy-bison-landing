const casesSlider = document.querySelector('.cases-slider')
const blogSlider = document.querySelector('.blogs-slider')
const testimonialsSlider = document.querySelector('.testimonials-swiper')
const sliderGallery = document.querySelector('.gallery-slider')
const tabsTable = document.querySelectorAll('.table-th-tab')
const homePageWrapper = document.querySelector('.home-page__wrapper')
const caseStudyPageWrapper = document.querySelector('.case-study-page__wrapper')
const blogPageWrapper = document.querySelector('.blog-page__wrapper')

//sliders
const initSwiperSlider = (slider, settings) => {
	return new Swiper(slider, {
		...settings,
		loop: true,
		init: true,
		pagination: {
			el: slider.querySelector('.swiper-pagination'),
			clickable: true,
		},
	})
}

let newTestimonialsSwiper

function mobileSliderTestimonials() {
	const isMobile = document.documentElement.clientWidth <= 425
	if (isMobile && testimonialsSlider.dataset.mobile === 'false') {
		newTestimonialsSwiper = initSwiperSlider(testimonialsSlider, {
			slidesPerView: 1,
			spaceBetween: 0,
		})
		testimonialsSlider.dataset.mobile = 'true'
	}

	if (!isMobile && testimonialsSlider.dataset.mobile === 'true') {
		newTestimonialsSwiper.destroy()
		testimonialsSlider.dataset.mobile = 'false'
	}
}

const animateLines = () => {
	const grayLines = document.querySelectorAll('.gray-line')
	const verticalGrayLines = document.querySelectorAll('.vertical-gray-line ')
	const widthScreen = document.documentElement.clientWidth

	const testimonialsSectionVerticalLines = document.querySelectorAll(
		'.testimonials .vertical-gray-line'
	)
	const exploreSectionVerticalLines = document.querySelectorAll(
		'.explore .vertical-gray-line'
	)
	const rootFontSize = parseFloat(
		getComputedStyle(document.documentElement).fontSize
	)

	const animationDuration = 1000

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
		const targetWidth = parseFloat(width) / rootFontSize
		const animationStep = (targetWidth / animationDuration) * 10
		let currentWidth = 0
		line.style.opacity = 1
		const animateWidth = () => {
			if (currentWidth >= targetWidth) {
				line.style.maxWidth = 100 + '%'
				animateVerticalLines(line)
				return
			}
			currentWidth += animationStep
			line.style.maxWidth = currentWidth + 'rem'
			requestAnimationFrame(animateWidth)
		}

		animateWidth()
	}

	const animateLineHeight = line => {
		const height = getInitialHeight(line)
		const targetHeight = parseFloat(height) / rootFontSize
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
			line.style.maxHeight = currentHeight + 'rem'

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

	if (widthScreen > 425) {
		document.addEventListener('scroll', handleScroll)
	}

	function handleResize() {
		const widthScreen = document.documentElement.clientWidth

		if (widthScreen <= 768) {
			grayLines.forEach(line => {
				line.style = null
			})
			verticalGrayLines.forEach(line => (line.style = null))
		}

		if (widthScreen <= 425) {
			grayLines.forEach(line => {
				line.style.opacity = 1
			})
			verticalGrayLines.forEach(line => (line.style.opacity = 0))
		} else {
			grayLines.forEach(line => (line.style.opacity = 1))
			verticalGrayLines.forEach(line => (line.style.opacity = 1))
		}
	}

	window.addEventListener('resize', handleResize)
}

const animateTestimonials = () => {
	const testimonials = document.querySelector('.testimonials__list')
	const widthScreen = document.documentElement.clientWidth

	function shuffleArray(array) {
		for (let i = array.length - 1; i >= 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	const cardArray = Array.from(testimonials.children)

	if (widthScreen > 425) {
		setInterval(() => {
			const shuffledCardArray = shuffleArray(cardArray)
			testimonials.classList.add('fade-out')

			setTimeout(() => {
				while (testimonials.firstChild) {
					testimonials.removeChild(testimonials.firstChild)
				}

				shuffledCardArray.forEach(card => {
					testimonials.appendChild(card)
				})

				testimonials.classList.remove('fade-out')
			}, 250)
		}, 3000)
	}
}

const dropdown = () => {
	const buttons = document.querySelectorAll('.services-info__type-button')
	const descriptionsContent = document.querySelectorAll(
		'.descriptions__content'
	)
	const descriptionsText = document.querySelectorAll(
		'.services-info__description-text'
	)
	const title = document.querySelector('.services-info__title')
	const widthScreen = document.documentElement.clientWidth

	const addDescriptionsTextForSmallScreens = () => {
		buttons.forEach((button, index) => {
			const descriptionsTextElement = descriptionsText[index]
			const descriptionsTextClone = descriptionsTextElement.cloneNode(true)
			button.insertAdjacentElement('afterend', descriptionsTextClone)
		})
	}

	const handlerClickButtonsDropdownOnSmallScreen = index => {
		const descriptionTextElements = Array.from(
			document.querySelectorAll('.services-info__description-text')
		).filter(element => {
			return (
				window.getComputedStyle(element).getPropertyValue('display') !== 'none'
			)
		})
		descriptionTextElements.forEach(e => {
			e.classList.remove('slide-in-height')
		})
		descriptionTextElements[index].classList.add('slide-in-height')
		return
	}

	buttons.forEach(function (button, index) {
		button.addEventListener('click', event => {
			handlerClickButtonsDropdownOnSmallScreen(index)
			buttons.forEach(button => {
				button.classList.remove('active')
			})

			descriptionsContent.forEach(function (content) {
				content.classList.remove('show')
			})
			event.currentTarget.classList.add('active')
			descriptionsContent[index].classList.add('show')
		})
	})

	let hasExecuted = false

	if (widthScreen <= 425) {
		addDescriptionsTextForSmallScreens()
		hasExecuted = true
	}

	window.addEventListener('resize', e => {
		const widthScreen = document.documentElement.clientWidth

		if (widthScreen <= 425 && !hasExecuted) {
			addDescriptionsTextForSmallScreens()
			hasExecuted = true
		}
	})
}

const popup = () => {
	const getConsultationButtons = document.querySelectorAll(
		'.get-consultation-btn'
	)

	const buttonsPopupClose = document.querySelectorAll('.close-popup-button')
	const popup = document.querySelector('.popup')
	const overlay = document.querySelector('.overlay')
	const cancelBtnForm = document.querySelector('#get-consultation .btn-cancel')

	const openPopup = popupId => {
		const popup = document.getElementById(popupId)
		popup.classList.remove('close')
		document.body.style.overflow = 'hidden'
		popup.classList.add('open')
	}

	const hidePopup = () => {
		if (popup.classList.contains('open')) {
			document.body.style.overflow = 'auto'
			popup.classList.add('close')
			setTimeout(() => {
				popup.className = popup.className.split(' ').splice(0, 2).join(' ')
			}, 300)
		}
	}

	getConsultationButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			openPopup('get-consultation')
		})
	})

	buttonsPopupClose.forEach(btn => {
		btn.addEventListener('click', hidePopup)
	})

	overlay.addEventListener('click', hidePopup)
	cancelBtnForm.addEventListener('click', hidePopup)
}

const getConsultationForm = () => {
	const form = document.querySelector('.form')
	const textarea = form.querySelector('.textarea')
	const errorIcon = form.querySelector('.error-icon')
	const errorText = form.querySelector('.error-text')
	const inputEmail = form.querySelector('.input-email')
	const checkboxCustom = form.querySelector('.checkbox-custom')
	const checkbox = form.querySelector('.checkbox')
	const submitButton = document.querySelector('.btn-submit')
	const popup = document.querySelector('.popup')

	function changeCountCharacterTextarea() {
		const characterCount = form.querySelector('.character-count')
		characterCount.textContent = `${textarea.value.length}/360`
	}

	function validateEmail(email) {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailPattern.test(email)
	}

	function serializeForm(formNode) {
		const formData = new FormData(formNode)
		const data = {}
		for (let [name, value] of formData) {
			data[name] = value
		}
		return data
	}

	function removeInputsEventListeners() {
		inputEmail.removeEventListener('input', validateForm)
		checkbox.removeEventListener('input', validateForm)
	}

	function addInputsEventListeners() {
		inputEmail.addEventListener('input', validateForm)
		checkbox.addEventListener('input', validateForm)
	}

	function validateForm() {
		const data = serializeForm(form)
		const { email, agree } = data

		const isEmailValid = validateEmail(email)
		const isCheckboxValid = agree

		errorIcon.classList.toggle('error', !isEmailValid)
		errorText.classList.toggle('error', !isEmailValid)
		checkboxCustom.classList.toggle('error', !isCheckboxValid)
		form.classList.toggle('invalid', !isEmailValid || !isCheckboxValid)
		submitButton.disabled = !isEmailValid || !isCheckboxValid

		if (isEmailValid && isCheckboxValid) {
			return true
		} else {
			return false
		}
	}

	function handleFormSubmit(event) {
		event.preventDefault()
		const data = new FormData(event.target)
		const isValid = validateForm()

		if (isValid) {
			fetch(event.target.action, {
				method: form.method,
				body: data,
				headers: {
					Accept: 'application/json',
				},
			})
				.then(response => {
					if (response.ok) {
						form.reset()
						popup.classList.add('submit-success')
						removeInputsEventListeners()
					} else {
						response.json().then(data => {
							if (Object.hasOwn(data, 'errors')) {
								const errorMessages = data['errors']
									.map(error => error['message'])
									.join(', ')
								console.log(errorMessages)
							} else {
								console.log('Oops! There was a problem submitting your form')
							}
						})
					}
				})
				.catch(error => {
					console.log('Form error:', error)
					console.log('Oops! There was a problem submitting your form')
				})
			return
		}

		addInputsEventListeners()
	}

	form.addEventListener('submit', handleFormSubmit)
	textarea.addEventListener('input', changeCountCharacterTextarea)
}

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

if (homePageWrapper) {
	animateLines()
	animateTestimonials()
	dropdown()
}

popup()
getConsultationForm()

if (blogSlider && testimonialsSlider && casesSlider) {
	initSwiperSlider(casesSlider, {
		slidesPerView: 'auto',
		spaceBetween: 28,
		breakpoints: {
			425: {
				slidesPerView: 'auto',
				spaceBetween: 8,
			},

			768: {
				slidesPerView: 'auto',
				spaceBetween: 10,
			},

			1440: {
				slidesPerView: 2,
				spaceBetween: 28,
			},
		},
	})

	initSwiperSlider(blogSlider, {
		slidesPerView: 'auto',
		spaceBetween: 8,
		breakpoints: {
			425: {
				slidesPerView: 'auto',
				spaceBetween: 8,
			},

			768: {
				slidesPerView: 'auto',
				spaceBetween: 16,
			},

			1440: {
				slidesPerView: 3,
				spaceBetween: 28,
			},
		},
	})

	initSwiperSlider(blogSlider, {
		slidesPerView: 'auto',
		spaceBetween: 8,
		breakpoints: {
			425: {
				slidesPerView: 'auto',
				spaceBetween: 8,
			},

			768: {
				slidesPerView: 'auto',
				spaceBetween: 16,
			},

			1440: {
				slidesPerView: 3,
				spaceBetween: 28,
			},
		},
	})

	mobileSliderTestimonials()
	window.addEventListener('resize', mobileSliderTestimonials)
}

if (sliderGallery) {
	initSwiperSlider(sliderGallery, {
		slidesPerView: 1,
		spaceBetween: 10,
		navigation: {
			nextEl: document.querySelector('.swiper-btn-next'),
			prevEl: document.querySelector('.swiper-btn-prev'),
		},
	})
}

if (tabsTable && tabsTable.length >= 3) {
	tabsTable.forEach((tab, index) => {
		if (index === 0) {
			return
		}
		tab.addEventListener('click', e => {
			tabsTable.forEach(tab => tab.classList.remove('table-th-tab-active'))
			e.target.classList.toggle('table-th-tab-active')
		})
	})
}

if (blogPageWrapper) {
	const highlightDivElements = document.querySelectorAll('div.highlight')

	highlightDivElements.forEach(el => {
		el.classList.add('code-wrapper')
		el.insertAdjacentHTML(
			'afterbegin',
			`
        <button class="button copy-button">
            <i class="icon icon-copy"></i>
            Copy
        </button>
    `
		)
	})

	const copyButtons = document.querySelectorAll('.copy-button')

	copyButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			const copyText = btn
				.closest('.code-wrapper')
				.querySelector('code').textContent
			navigator.clipboard.writeText(copyText)
		})
	})
}
