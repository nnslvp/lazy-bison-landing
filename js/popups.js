const slides = document.querySelectorAll('.project-slide')
const getConsultationButtons = document.querySelectorAll(
	'.get-consultation-btn'
)
const btnsPopupClose = document.querySelectorAll('.close-popup-button')
const popups = document.querySelectorAll('.popup')
const popup = document.querySelector('.popup')
const projectTitle = document.querySelector('.project__title')
const projectType = document.querySelector('.name-app__title')
const projectImg = document.querySelector('.project__img-img')
const projectDescription = document.querySelector('.project__description-text')
const form = document.querySelector('.form')
const errorIcon = form.querySelector('.error-icon')
const errorText = form.querySelector('.error-text')
const inputEmail = form.querySelector('.input-email')
const overlay = document.querySelector('.overlay')

const openPopup = popupId => {
	const popup = document.getElementById(popupId)
	popup.classList.remove('close')
	document.body.style.overflow = 'hidden'
	popup.classList.add('open')
}

function hidePopup() {
	popups.forEach(p => {
		if (p.classList.contains('open')) {
			document.body.style.overflow = 'auto'
			p.classList.add('close')
			setTimeout(() => {
				p.classList.remove('open')
			}, 300)
		}
	})
}

function handleClickSlideProject(index) {
	openPopup('popup-project')
	const title = getTitleByIndex(index)
	const description = getDescriptionByIndex(index)
	const imagePath = getImagePathByIndex(index)
	const type = getTypeAppByIndex(index)

	projectTitle.textContent = title
	projectType.textContent = type
	projectImg.src = imagePath
	projectDescription.textContent = description
}

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

	return types[index]
}

function getTitleByIndex(index) {
	const titles = ['Name of project', 'Заголовок 2 слайда', 'Заголовок 3 слайда']

	return titles[index]
}

function getImagePathByIndex(index) {
	const imagePaths = [
		'./assets/images/popup-project.jpeg',
		'./assets/images/projet-img-two.png',
		'./assets/images/projet-img-three.png',
	]

	return imagePaths[index]
}

slides.forEach((slide, index) => {
	slide.addEventListener('click', () => {
		handleClickSlideProject(index)
	})
})

getConsultationButtons.forEach(btn => {
	btn.addEventListener('click', () => {
		openPopup('get-consultation')
	})
})

btnsPopupClose.forEach(btn => {
	btn.addEventListener('click', hidePopup)
})

overlay.addEventListener('click', hidePopup)
