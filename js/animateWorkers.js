// const workers = document.querySelector('.workers__list');
// const widthScreen = document.documentElement.clientWidth;

// function shuffleArray(array) {
//     for (let i = array.length - 1; i >= 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }


// const cardArray = Array.from(workers.children);

// if (widthScreen > 425) {
//     setInterval(() => {
//         const shuffledCardArray = shuffleArray(cardArray);
//         workers.classList.add('fade-out');

//         setTimeout(() => {
//             while (workers.firstChild) {
//                 workers.removeChild(workers.firstChild);
//             }

//             shuffledCardArray.forEach(card => {
//                 workers.appendChild(card);
//             });

//             workers.classList.remove('fade-out');
//         }, 250);
//     }, 3000);
// }