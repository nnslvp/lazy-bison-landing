const popup = document.querySelector('.popup')

function handleSubmit(event) {
	event.preventDefault()
	const form = event.target
	const errorIcon = form.querySelector('.error-icon')
	const errorText = form.querySelector('.error-text')
	const inputEmail = form.querySelector('.input-email')
	if (form.checkValidity()) {
		console.log('Форма прошла валидацию')

		form.reset()
	} else {
		if (!inputEmail.validity.valid) {
			errorIcon.style.visibility = 'visible'
			errorText.style.visibility = 'visible'
		} else {
			errorIcon.style.visibility = 'hidden'
			errorText.style.visibility = 'hidden'
		}
	}
}

function changeCountCharacterTextarea(e) {
	const characterCount = document.querySelector('.character-count')
	characterCount.textContent = `${e.target.value.length}/360`
}

function addEventListenerElementsForm(params) {
	const form = popup.querySelector('.form')
	const textarea = popup.querySelector('.textarea')
	if (form) {
		form.addEventListener('submit', handleSubmit)
		textarea.addEventListener('input', changeCountCharacterTextarea)
	}
}

popup.addEventListener('popupOpened', () => {
	addEventListenerElementsForm()
})
