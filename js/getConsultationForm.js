const popup = document.querySelector('.popup')
const popupContent = document.querySelector('.popup-content')
const form = popup.querySelector('.form')
const textarea = popup.querySelector('.textarea')
const errorIcon = form.querySelector('.error-icon')
const errorText = form.querySelector('.error-text')
const inputEmail = form.querySelector('.input-email')
const popupTittle = document.querySelector('.get-consultation__title')
const popupSubtitle = document.querySelector('.get-consultation__subtitle')

function changeCountCharacterTextarea(e) {
	const characterCount = document.querySelector('.character-count')
	characterCount.textContent = `${e.target.value.length}/360`
}

function showSuccessSubmit() {
	popup.classList.add('submit-success')
	form.remove()
	popupTittle.textContent = 'Congratulations!'
	popupSubtitle.textContent = `
		Your request is sent successfully. 
		Our manager will contact you shortly.`
}

function handleSubmit(event) {
	event.preventDefault()
	const form = event.target
	showSuccessSubmit()
	if (form.checkValidity()) {
		console.log('Форма прошла валидацию')
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

form.addEventListener('submit', handleSubmit)
textarea.addEventListener('input', changeCountCharacterTextarea)
