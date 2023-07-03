const sliders = document.querySelectorAll('.swiper')
let mySwipers = []

function mobileSlider(slider) {
	if (window.innerWidth <= 425 && slider.dataset.mobile === 'false') {
		const newSwiper = new Swiper(slider, {
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,
			init: true,
			pagination: {
				el: slider.querySelector('.swiper-pagination'),
				clickable: true,
			},
		})
		mySwipers.push(newSwiper)
		slider.dataset.mobile = 'true'
	} else {
		slider.dataset.mobile = 'false'
		mySwipers.forEach(swiper => swiper.destroy())
	}
}

sliders.forEach(slider => {
	window.addEventListener('resize', () => {
		mobileSlider(slider)
	})
	mobileSlider(slider)
})
