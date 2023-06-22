const sliders = document.querySelectorAll('.swiper')

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

sliders.forEach(slider => {
	mobileSlider(slider)
	window.addEventListener('resize', () => {
		mobileSlider(slider)
	})
})
