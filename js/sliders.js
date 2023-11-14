const sliders = document.querySelectorAll(".swiper");
const [casesSlider, blogSlider, workersSlider] = sliders;

let newWorkersSwiper;
let newProjectSwiper;
let newBlogSlider;

newProjectSwiper = new Swiper(casesSlider, {
  slidesPerView: "auto",
  spaceBetween: 28,
  loop: true,
  init: true,
  pagination: {
    el: casesSlider.querySelector(".swiper-pagination"),
    clickable: true,
  },

  breakpoints: {
    425: {
      slidesPerView: "auto",
      spaceBetween: 8,
    },

    768: {
      slidesPerView: "auto",
      spaceBetween: 10,
    },

    1440: {
      slidesPerView: 2,
      spaceBetween: 28,
    },
  },
});

newBlogSlider = new Swiper(blogSlider, {
  slidesPerView: "auto",
  spaceBetween: 8,
  loop: true,
  init: true,
  pagination: {
    el: blogSlider.querySelector(".swiper-pagination"),
    clickable: true,
  },

  breakpoints: {
    425: {
      slidesPerView: "auto",
      spaceBetween: 8,
    },

    768: {
      slidesPerView: "auto",
      spaceBetween: 16,
    },

    1440: {
      slidesPerView: 3,
      spaceBetween: 28,
    },
  },
});

function initializeWorkersSlider() {
  newWorkersSwiper = new Swiper(workersSlider, {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    init: true,
    pagination: {
      el: workersSlider.querySelector(".swiper-pagination"),
      clickable: true,
    },
  });
}
