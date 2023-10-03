const buttons = document.querySelectorAll(".services-info__type-button");
const descriptionsContent = document.querySelectorAll(".descriptions__content");
const descriptionsText = document.querySelectorAll(
  ".services-info__description-text"
);
const title = document.querySelector(".services-info__title");
const widthScreen = document.documentElement.clientWidth;

const addDescriptionsTextForSmallScreens = ()=>{
  buttons.forEach((button, index) => {
    const descriptionsTextElement = descriptionsText[index];
    const descriptionsTextClone = descriptionsTextElement.cloneNode(true);
    button.insertAdjacentElement("afterend", descriptionsTextClone);
 
  })
}


buttons.forEach(function (button, index) {
  button.addEventListener("click", (event) => {
    if (widthScreen <= 425) {
      descriptionsText.forEach((e) => {
        e.classList.remove("slide-in-height");
      });

      buttons.forEach((button) => {
        button.classList.remove("active");
      });
      event.currentTarget.classList.add("active");
      descriptionsText[index].classList.add("slide-in-height");
      return;
    }

    buttons.forEach((button) => {
      button.classList.remove("active");
    });
 
    descriptionsContent.forEach(function (content) {
      content.classList.remove("show");
    });
    event.currentTarget.classList.add("active");
  
    descriptionsContent[index].classList.add("show");
  });


});

let hasExecuted = false;

// Первоначальная проверка при загрузке страницы
if (widthScreen <= 425) {
  addDescriptionsTextForSmallScreens();
  hasExecuted = true;
}

window.addEventListener("resize", (e) => {
  const widthScreen = window.innerWidth;

  if (widthScreen <= 425 && !hasExecuted) {
    addDescriptionsTextForSmallScreens();
    hasExecuted = true;
  } 
});



