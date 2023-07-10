const sliders = document.querySelectorAll('.swiper')
const [projectSlider, workersSlider] = sliders
const projectSwiperWrapper = projectSlider.querySelector('.swiper-wrapper')
const projectSwiperWrapperContent = projectSwiperWrapper.innerHTML

console.log(projectSwiperWrapperContent)

const projectSliderSwiper = new Swiper(projectSlider, {
	slidesPerView: 1,
	spaceBetween: 0,
	loop: true,
	init: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
})

function initializeWorkersSlider() {
	const workersSwiper = new Swiper(workersSlider, {
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
	if (window.innerWidth <= 425 && projectSlider.dataset.mobile === 'true') {
		const slides = projectSlider.querySelectorAll('.project-slide__item')

		slides.forEach(el => {
			el.classList.remove(...el.classList)
			el.classList.add('swiper-slide')
		})

		projectSwiperWrapper.innerHTML = ''

		projectSliderSwiper.appendSlide(slides)
	} else if (
		window.innerWidth > 425 &&
		projectSlider.dataset.mobile === 'false'
	) {
		projectSwiperWrapper.insertAdjacentHTML(
			'beforeend',
			projectSwiperWrapperContent
		)
	}
	// if (window.innerWidth <= 425 && workersSlider.dataset.mobile === 'false') {
	// 	const newWorkersSwiper = new Swiper(workersSlider, {
	// 		slidesPerView: 1,
	// 		spaceBetween: 0,
	// 		loop: true,
	// 		init: true,
	// 		pagination: {
	// 			el: workersSlider.querySelector('.swiper-pagination'),
	// 			clickable: true,
	// 		},
	// 	})

	// 	projectSlider.dataset.mobile = 'true'
	// 	workersSlider.dataset.mobile = 'true'
	// } else {
	// 	projectSlider.dataset.mobile = 'false'
	// 	workersSlider.dataset.mobile = 'false'
	// 	if (window.innerWidth >= 425 && workersSlider.dataset.mobile === 'true') {
	// 		workersSlider.destroy()
	// 	}
	// }
}

window.addEventListener('resize', mobileSlider)

mobileSlider()
