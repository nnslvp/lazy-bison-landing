export const dropdown = () => {
	const buttons = document.querySelectorAll('.services-info__type-button')
	const descriptionsContent = document.querySelectorAll(
		'.descriptions__content'
	)
	const descriptionsText = document.querySelectorAll(
		'.services-info__description-text'
	)
	const title = document.querySelector('.services-info__title')
	const widthScreen = document.documentElement.clientWidth

	const addDescriptionsTextForSmallScreens = () => {
		buttons.forEach((button, index) => {
			const descriptionsTextElement = descriptionsText[index]
			const descriptionsTextClone = descriptionsTextElement.cloneNode(true)
			button.insertAdjacentElement('afterend', descriptionsTextClone)
		})
	}

	const handlerClickButtonsDropdownOnSmallScreen = index => {
		const descriptionTextElements = Array.from(
			document.querySelectorAll('.services-info__description-text')
		).filter(element => {
			return (
				window.getComputedStyle(element).getPropertyValue('display') !== 'none'
			)
		})
		descriptionTextElements.forEach(e => {
			e.classList.remove('slide-in-height')
		})
		descriptionTextElements[index].classList.add('slide-in-height')
		return
	}

	buttons.forEach(function (button, index) {
		button.addEventListener('click', event => {
			handlerClickButtonsDropdownOnSmallScreen(index)
			buttons.forEach(button => {
				button.classList.remove('active')
			})

			descriptionsContent.forEach(function (content) {
				content.classList.remove('show')
			})
			event.currentTarget.classList.add('active')
			descriptionsContent[index].classList.add('show')
		})
	})

	let hasExecuted = false

	if (widthScreen <= 425) {
		addDescriptionsTextForSmallScreens()
		hasExecuted = true
	}

	window.addEventListener('resize', e => {
		const widthScreen = window.innerWidth

		if (widthScreen <= 425 && !hasExecuted) {
			addDescriptionsTextForSmallScreens()
			hasExecuted = true
		}
	})
}
