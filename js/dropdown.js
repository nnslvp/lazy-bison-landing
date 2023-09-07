const buttons = document.querySelectorAll(".services-info__type-button");
const descriptionsContent = document.querySelectorAll(".descriptions__content");
const descriptionsText = document.querySelectorAll(
  ".services-info__description-text"
);
const title = document.querySelector(".services-info__title");
const widthScreen = document.documentElement.clientWidth;



if (widthScreen <= 425) {
  buttons.forEach((button, index) => {
    const descriptionsTextElement = descriptionsText[index];
    button.insertAdjacentElement("afterend", descriptionsTextElement);
  });
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

window.addEventListener("resize", (e) => {});
