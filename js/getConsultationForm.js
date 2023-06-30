const form = document.querySelector('.form')
const textarea = form.querySelector('.textarea')
const errorIcon = form.querySelector('.error-icon')
const errorText = form.querySelector('.error-text')
const inputEmail = form.querySelector('.input-email')
const checkboxCustom = form.querySelector('.checkbox-custom')
const checkbox = form.querySelector('.checkbox')
const submitButton = document.querySelector('.btn-submit')
const popup = document.querySelector('.popup')
const popupTittle = document.querySelector('.get-consultation__title')
const popupSubtitle = document.querySelector('.get-consultation__subtitle')

function changeCountCharacterTextarea() {
	const characterCount = form.querySelector('.character-count')
	characterCount.textContent = `${textarea.value.length}/360`
}

function validateEmail(email) {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailPattern.test(email)
}

function showSuccessSubmit() {
	popup.classList.add('submit-success')
}

function serializeForm(formNode) {
	const formData = new FormData(formNode)
	const data = {}
	for (let [name, value] of formData) {
		data[name] = value
	}
	return data
}

function removeInputsEventListeners() {
	inputEmail.removeEventListener('input', validateForm)
	checkbox.removeEventListener('input', validateForm)
}

function addInputsEventListeners() {
	inputEmail.addEventListener('input', validateForm)
	checkbox.addEventListener('input', validateForm)
}

function validateForm() {
	const data = serializeForm(form)
	const { email, agree } = data

	const isEmailValid = validateEmail(email)
	const isCheckboxValid = agree

	errorIcon.classList.toggle('error', !isEmailValid)
	errorText.classList.toggle('error', !isEmailValid)
	checkboxCustom.classList.toggle('error', !isCheckboxValid)

	return isEmailValid && !!isCheckboxValid
}

function handleFormSubmit(event) {
	event.preventDefault()
	const data = new FormData(event.target)
	const isValid = validateForm()

	if (isValid) {
		fetch(event.target.action, {
			method: form.method,
			body: data,
			headers: {
				Accept: 'application/json',
			},
		})
			.then(response => {
				if (response.ok) {
					form.reset()
					showSuccessSubmit()
					removeInputsEventListeners()
				} else {
					response.json().then(data => {
						if (Object.hasOwn(data, 'errors')) {
							const errorMessages = data['errors']
								.map(error => error['message'])
								.join(', ')
							console.log(errorMessages)
						} else {
							console.log('Oops! There was a problem submitting your form')
						}
					})
				}
			})
			.catch(error => {
				console.log('Form error:', error)
				console.log('Oops! There was a problem submitting your form')
			})
		return
	}

	addInputsEventListeners()
}

form.addEventListener('submit', handleFormSubmit)
textarea.addEventListener('input', changeCountCharacterTextarea)
