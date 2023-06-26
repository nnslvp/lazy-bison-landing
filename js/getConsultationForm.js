const popup = document.querySelector('.popup')
const popupContent = document.querySelector('.popup-content')
const form = popup.querySelector('.form')
const textarea = popup.querySelector('.textarea')
const errorIcon = form.querySelector('.error-icon')
const errorText = form.querySelector('.error-text')
const inputEmail = form.querySelector('.input-email')
const popupTittle = document.querySelector('.get-consultation__title')
const popupSubtitle = document.querySelector('.get-consultation__subtitle')
const status = document.getElementById("my-form-status");

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
		const data = new FormData(event.target);
		fetch(event.target.action, {
			method: form.method,
			body: data,
			headers: {
				'Accept': 'application/json'
			}
		}).then(response => {
			if (response.ok) {
				status.innerHTML = "Thanks for your submission!";
				form.reset()
			} else {
				response.json().then(data => {
					if (Object.hasOwn(data, 'errors')) {
						status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
					} else {
						status.innerHTML = "Oops! There was a problem submitting your form"
					}
				})
			}
		}).catch(error => {
			console.log("Form error:", error)
			status.innerHTML = "Oops! There was a problem submitting your form"
		});
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
