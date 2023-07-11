const sliders = document.querySelectorAll('.swiper')
const [projectSlider, workersSlider] = sliders
const projectSwiperWrapper = projectSlider.querySelector('.swiper-wrapper')
const projectSwiperWrapperContent = projectSwiperWrapper.innerHTML
const projectsSlides = projectSlider.querySelectorAll('.projects-slide__item')
let newWorkersSwiper
let newProjectSwiper

newProjectSwiper = new Swiper(projectSlider, {
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

	if (isMobile && projectSlider.dataset.mobile === 'false') {
		projectsSlides.forEach(el => {
			el.classList.remove(...el.classList)
			el.classList.add('swiper-slide')
		})
		projectSwiperWrapper.innerHTML = ''
		newProjectSwiper.appendSlide(projectsSlides)
		projectSlider.dataset.mobile = 'true'
	}

	if (!isMobile && projectSlider.dataset.mobile === 'true') {
		projectSwiperWrapper.innerHTML = projectSwiperWrapperContent
		projectSlider.dataset.mobile = 'false'
	}

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
