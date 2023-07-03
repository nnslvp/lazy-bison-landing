// const workers = document.querySelector('.workers')
// const widthScreen = document.documentElement.clientWidth

// function shuffleArray(array) {
// 	for (let i = array.length - 1; i >= 0; i--) {
// 		const j = Math.floor(Math.random() * (i + 1))
// 		;[array[i], array[j]] = [array[j], array[i]]
// 	}
// 	return array
// }

// if (widthScreen > 375) {
// 	setInterval(() => {
// 		const items = Array.from(workers.children)
// 		const shuffledItems = shuffleArray(items)

// 		workers.classList.add('fade-out')

// 		setTimeout(() => {
// 			workers.innerHTML = ''

// 			shuffledItems.forEach(item => {
// 				workers.appendChild(item)
// 			})

// 			workers.classList.remove('fade-out')
// 		}, 250)
// 	}, 3000)
// }
