const slides = document.querySelectorAll('.project-slide')
const getConsultationButtons = document.querySelectorAll(
	'.get-consultation-btn'
)
const popup = document.querySelector('.popup')
const overlay = document.querySelector('.overlay')
const popupContent = document.querySelector('.popup-content')

function showPopup() {
	popup.classList.add('open')
	document.body.style.overflow = 'hidden'
	const popupOpenedEvent = new Event('popupOpened')
	popup.dispatchEvent(popupOpenedEvent)
}

function hidePopup() {
	popup.classList.remove('open')
	document.body.style.overflow = 'auto'
	const popupClosedEvent = new Event('popupClosed')
	popup.dispatchEvent(popupClosedEvent)

	const classNames = Array.from(popup.classList)

	classNames.forEach(className => {
		if (className !== 'popup') {
			popup.classList.remove(className)
		}
	})
	popupContent.innerHTML = ''
}

slides.forEach((slide, index) => {
	slide.addEventListener('click', () => {
		popup.classList.add('popup-project')

		const description = getDescriptionByIndex(index)
		const title = getTitleByIndex(index)
		const imagePath = getImagePathByIndex(index)
		const typeApp = getTypeAppByIndex(index)

		popupContent.innerHTML = `	
		<div class="project__inner">
				<div class="project__info">
					<h3 class=" project__title heading--small"> ${title}</h3>
					<div class="project__description">
						<p class="project__description-text  text--medium">${description}</p>
					</div>
					<div class="name-app__inner">
						<h4 class='name-app__title'>${typeApp}</h4>
						<div class="arrow-img__container">
							<img src="./assets/icons/arrow-right-square.svg" alt="arrow">
						</div>
					</div>
				</div>
				<div class="project__img">
					<img class='project__img-img' src="${imagePath}" alt="project-img">
				</div>
			</div>`
		showPopup()
	})
})

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

getConsultationButtons.forEach(btn => {
	btn.addEventListener('click', () => {
		popup.classList.add('popup__get-consultation')
		popupContent.innerHTML = `
		<h2 class="get-consultation__title "> Get free consultation </h2>
		<p class="get-consultation__subtitle text--medium">
			Please, fill out the form
		</p>
		<form class="form" novalidate>
			<div class="form-group">
				<label class='text--small label-email' for="email">
					E-mail
					<div class="input-email__wrapper">
					<input class="input-email" placeholder='exapmle@gmail.com' type="email" id="email" name="email" required>
					<svg class="error-icon">
									<use xlink:href="./assets/icons/sprite.svg#error-circle"></use>
								</svg>			
					</div>	
					<span class='error-text'>Invalid e-mail</span>
				</label>
				<div class="textarea__container">
					<label class='text--small' for="comments">
						Your comments
						<textarea class="textarea" placeholder='Write your comments (optional)' id="comments" name="comments" maxlength="360"
							></textarea>
					</label>
					<div class="character-count text--small">0/360</div>
				</div>
				<label class='checkbox-label text--small' for="agree">
					<input type="checkbox" id="agree" name="agree" required>
					<span class='checkbox-custom'></span>
					Agree to process personal data
				</label>
			</div>
			<div class="form-actions">
				<button type="button" class="btn btn-cancel">Cancel</button>
				<button type="submit" class="btn btn-submit">Submit</button>
			</div>
		</form>`
		showPopup()
	})
})

function getDescriptionByIndex(index) {
	const descriptions = [
		`We developed a custom crowdfunding platform 
	with a user-friendly interface that made it easy 
	for entrepreneurs to create campaigns and for investors to find projects to fund. We integrated a secure payment system and an admin panel for managing campaigns 
	and funds. The platform allowed investors to select 
	a reward item offered by the entrepreneur, 
	and it displayed the progress towards the funding goal.`,
		'Описание второго слайда',
		'Описание третьего слайда',
	]

	if (index >= 0 && index < descriptions.length) {
		return descriptions[index]
	}

	return null
}

function getTypeAppByIndex(index) {
	const types = [
		'Crowdfunding web application',
		'type project 2  слайда',
		'type project 3 слайда',
	]

	if (index >= 0 && index < types.length) {
		return types[index]
	}
	return null
}

function getTitleByIndex(index) {
	const titles = ['Name of project', 'Заголовок 2 слайда', 'Заголовок 3 слайда']

	if (index >= 0 && index < titles.length) {
		return titles[index]
	}
	return null
}

function getImagePathByIndex(index) {
	const imagePaths = [
		'./assets/images/popup-project.jpeg',
		'./assets/images/projet-img-two.png',
		'./assets/images/projet-img-three.png',
	]
	if (index >= 0 && index < imagePaths.length) {
		return imagePaths[index]
	}
	return null
}

document
	.querySelector('.close-popup-button')
	.addEventListener('click', hidePopup)
