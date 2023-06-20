const buttons = document.querySelectorAll('.services-info__type-button')
const description = document.querySelector('.services-info__description-text')
const title = document.querySelector('.services-info__title')
const widthScreen = document.documentElement.clientWidth

buttons.forEach(button => {
	button.addEventListener('click', () => {
		const buttonText = button.innerText

		if (widthScreen > 375) {
			description.textContent = getDescriptionByButton(buttonText)
			title.textContent = getTitleByButton(buttonText)
		} else {
			buttons.forEach(btn => {
				if (btn.classList.contains('active') && btn.nextElementSibling) {
					btn.nextElementSibling.remove()
				}
			})

			const descriptionText = document.createElement('p')
			descriptionText.classList.add('services-info__description-text')
			descriptionText.textContent = getDescriptionByButton(buttonText)
			button.insertAdjacentElement('afterend', descriptionText)
		}

		buttons.forEach(btn => {
			btn.classList.remove('active')
		})

		button.classList.add('active')
	})
})

function getDescriptionByButton(buttonText) {
	switch (buttonText) {
		case 'Web Development':
			return `Building and maintaining websites and web applications.
			Creating functional web experiences using HTML, CSS,
			JavaScript, and various web frameworks. It includes
			website design, front-end and back-end development,
			database integration, and maintenance and support.
			Technologies: Ruby on Rails, Hotwire, ReactJS, Angular,
			GoLang.`
		case 'MVP Development':
			return 'Description for MVP Development...'
		case 'Dedicated development team':
			return 'Description for Dedicated development team...'
		case 'UI/UX Design':
			return 'Description for UI/UX Design...'
		case 'Dedicated BA to each team for FREE':
			return 'Description for Dedicated BA...'
		case 'Mobile Development':
			return 'Description for Mobile Development...'
		default:
			return ''
	}
}

function getTitleByButton(buttonText) {
	switch (buttonText) {
		case 'Web Development':
			return 'Web Development Title'
		case 'MVP Development':
			return 'MVP Development Title'
		case 'Dedicated development team':
			return 'Dedicated Development Team Title'
		case 'UI/UX Design':
			return 'UI/UX Design Title'
		case 'Dedicated BA to each team for FREE':
			return 'Dedicated BA Title'
		case 'Mobile Development':
			return 'Mobile Development Title'
		default:
			return 'Default Title'
	}
}
