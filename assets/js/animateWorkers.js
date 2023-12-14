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
