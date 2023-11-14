const sliders = document.querySelectorAll(".swiper");
const [casesSlider, blogSlider, workersSlider] = sliders;
const casesSwiperWrapper = casesSlider.querySelector(".swiper-wrapper");
const casesSwiperWrapperContent = casesSwiperWrapper.innerHTML;
const casesSlides = casesSlider.querySelectorAll(".swiper-slide");
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

// function mobileSlider() {
//   const isMobile = window.innerWidth <= 425;

//   if (isMobile && workersSlider.dataset.mobile === "false") {
//     initializeWorkersSlider();
//     workersSlider.dataset.mobile = "true";
//   }

//   if (!isMobile && workersSlider.dataset.mobile === "true") {
//     newWorkersSwiper.destroy();
//     workersSlider.dataset.mobile = "false";
//   }
// }

// window.addEventListener("resize", mobileSlider);

// mobileSlider();
