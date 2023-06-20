const slides = document.querySelectorAll('.project-slide')
const popup = document.querySelector('.popup')
const overlay = document.querySelector('.overlay')
const popupContent = document.querySelector('.popup-content')

function showPopup() {
	popup.style.display = 'block'
	overlay.style.display = 'block'
	document.body.style.overflow = 'hidden'
}

function hidePopup() {
	popup.style.display = 'none'
	overlay.style.display = 'none'
	document.body.style.overflow = 'auto'
}

slides.forEach((slide, index) => {
	slide.addEventListener('click', () => {
		showPopup()

		const description = getDescriptionByIndex(index)
		const title = getTitleByIndex(index)
		const imagePath = getImagePathByIndex(index)
		const typeApp = getTypeAppByIndex(index)

		popup.classList.add('.popup-project')

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
