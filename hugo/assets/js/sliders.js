// const sliders = document.querySelectorAll('.swiper')
// const [casesSlider, blogSlider, testimonialsSlider] = sliders
// const casesSwiperWrapper = casesSlider.querySelector('.swiper-wrapper')
// const casesSwiperWrapperContent = casesSwiperWrapper.innerHTML
// const casesSlides = casesSlider.querySelectorAll('.swiper-slide')
// let newtestimonialsSwiper
// let newProjectSwiper
// let newBlogSlider

// newProjectSwiper = new Swiper(casesSlider, {
// 	slidesPerView: 'auto',
// 	spaceBetween: 28,
// 	loop: true,
// 	init: true,
// 	pagination: {
// 		el: casesSlider.querySelector('.swiper-pagination'),
// 		clickable: true,
// 	},

// 	breakpoints: {
// 		425: {
// 			slidesPerView: 'auto',
// 			spaceBetween: 8,
// 		},

// 		768: {
// 			slidesPerView: 'auto',
// 			spaceBetween: 10,
// 		},

// 		1440: {
// 			slidesPerView: 2,
// 			spaceBetween: 28,
// 		},
// 	},
// })

// newBlogSlider = new Swiper(blogSlider, {
// 	slidesPerView: 'auto',
// 	spaceBetween: 8,
// 	loop: true,
// 	init: true,
// 	pagination: {
// 		el: blogSlider.querySelector('.swiper-pagination'),
// 		clickable: true,
// 	},

// 	breakpoints: {
// 		425: {
// 			slidesPerView: 'auto',
// 			spaceBetween: 8,
// 		},

// 		768: {
// 			slidesPerView: 'auto',
// 			spaceBetween: 16,
// 		},

// 		1440: {
// 			slidesPerView: 3,
// 			spaceBetween: 28,
// 		},
// 	},
// })

// const initializetestimonialsSlider = () => {
// 	newtestimonialsSwiper = new Swiper(testimonialsSlider, {
// 		slidesPerView: 1,
// 		spaceBetween: 0,
// 		loop: true,
// 		init: true,
// 		pagination: {
// 			el: testimonialsSlider.querySelector('.swiper-pagination'),
// 			clickable: true,
// 		},
// 	})
// }

// function mobileSlider() {
// 	const isMobile = window.innerWidth <= 425

// 	if (isMobile && testimonialsSlider.dataset.mobile === 'false') {
// 		initializetestimonialsSlider()
// 		testimonialsSlider.dataset.mobile = 'true'
// 	}

// 	if (!isMobile && testimonialsSlider.dataset.mobile === 'true') {
// 		newtestimonialsSwiper.destroy()
// 		testimonialsSlider.dataset.mobile = 'false'
// 	}
// }

// window.addEventListener('resize', mobileSlider)

// mobileSlider()