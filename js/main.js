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
const tabsTable = document.querySelectorAll('.table-th-tab')

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

if (blogSlider && workersSlider && casesSlider) {
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

	function mobileSlider() {
		const isMobile = window.innerWidth <= 425
		let newWorkersSwiper
		if (isMobile && workersSlider.dataset.mobile === 'false') {
			newWorkersSwiper = initSwiperSlider(workersSlider, {
				slidesPerView: 1,
				spaceBetween: 0,
			})
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
	initSwiperSlider(sliderGallery, {
		slidesPerView: 1,
		spaceBetween: 10,
		navigation: {
			nextEl: document.querySelector('.swiper-btn-next'),
			prevEl: document.querySelector('.swiper-btn-prev'),
		},
	})
}

if (tabsTable) {
	tabsTable.forEach(tab =>
		tab.addEventListener('click', e => {
			tabsTable.forEach(tab => tab.classList.remove('table-th-tab-active'))
			e.target.classList.toggle('table-th-tab-active')
		})
	)
}
