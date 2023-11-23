// import './animateLines.js'
// import './animateWorkers.js'
// import './burgerMenu.js'
// import './dropdown.js'
// import './getConsultationForm.js'
// import './popups.js'
// import './sliders.js'

const sliderGallery = document.querySelector('.swiper')
console.log(sliderGallery)
let newWorkersSwiper
let newProjectSwiper
let newBlogSlider

newProjectSwiper = new Swiper(sliderGallery, {
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
