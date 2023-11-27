// import './animateLines.js'
// import './animateWorkers.js'
// import './burgerMenu.js'
// import './dropdown.js'
// import './getConsultationForm.js'
// import './popups.js'
// import './sliders.js'

const casesSlider = document.querySelector('.cases-slider')
const blogSlider = document.querySelector('.blogs-slider')
const workersSlider = document.querySelector('.workers-swiper')
const sliderGallery = document.querySelector('.gallery-slider')
let newWorkersSwiper
let newProjectSwiper
let newBlogSlider
let newCasesSlider

if (blogSlider && workersSlider && casesSlider) {
	newCasesSlider = new Swiper(casesSlider, {
		slidesPerView: 'auto',
		spaceBetween: 28,
		loop: true,
		init: true,
		pagination: {
			el: casesSlider.querySelector('.cases-slider .swiper-pagination'),
			clickable: true,
		},

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

	newBlogSlider = new Swiper(blogSlider, {
		slidesPerView: 'auto',
		spaceBetween: 8,
		loop: true,
		init: true,
		pagination: {
			el: blogSlider.querySelector('.swiper-pagination'),
			clickable: true,
		},

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

	const initializeWorkersSlider = () => {
		newWorkersSwiper = new Swiper(workersSlider, {
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,
			init: true,
			pagination: {
				el: workersSlider.querySelector('.swiper-pagination'),
				clickable: true,
			},
		})
	}

	function mobileSlider() {
		const isMobile = window.innerWidth <= 425

		if (isMobile && workersSlider.dataset.mobile === 'false') {
			initializeWorkersSlider()
			workersSlider.dataset.mobile = 'true'
		}

		if (!isMobile && workersSlider.dataset.mobile === 'true') {
			newWorkersSwiper.destroy()
			workersSlider.dataset.mobile = 'false'
		}
	}

	window.addEventListener('resize', mobileSlider)

	mobileSlider()
}

if (sliderGallery) {
	newGallerySwiper = new Swiper(sliderGallery, {
		slidesPerView: 1,
		spaceBetween: 10,
		loop: true,
		init: true,
		pagination: {
			el: sliderGallery.querySelector('.swiper-pagination'),
			clickable: true,
		},
		navigation: {
			nextEl: document.querySelector('.swiper-btn-next'),
			prevEl: document.querySelector('.swiper-btn-prev'),
		},
	})

	const tabsTable = document.querySelectorAll('.table-th-tab')

	tabsTable.forEach(tab =>
		tab.addEventListener('click', e => {
			tabsTable.forEach(tab => tab.classList.remove('table-th-tab-active'))
			e.target.classList.toggle('table-th-tab-active')
		})
	)
}
