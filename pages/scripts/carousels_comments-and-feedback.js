const carouselCardsArrowLeft = document.querySelector(".left-arrow_cards");
carouselCardsArrowLeft.addEventListener("click", moveCardsCarouselLeft);
const carouselCardsArrowRight = document.querySelector(".right-arrow_cards");
carouselCardsArrowRight.addEventListener("click", moveCardsCarouselRight);

const carouselCardsContainer = document.querySelector(".carousel__wrapper_cards");

function moveCardsCarouselLeft() {
  carouselCardsArrowRight.classList.remove("right-arrow_opacity-half");
  let attrLeft = carouselCardsContainer.style.left;
  attrLeft = +attrLeft.slice(0, attrLeft.length - 2);
  if (attrLeft < -2000) return;
  carouselCardsContainer.style.left = attrLeft - 500 + "px";
  attrLeft = carouselCardsContainer.style.left;
  attrLeft = +attrLeft.slice(0, attrLeft.length - 2);
  if (attrLeft < -2000) {
    carouselCardsArrowLeft.classList.add("left-arrow_opacity-half");
    return;
  }
  carouselCardsArrowLeft.classList.remove("left-arrow_opacity-half");
}

function moveCardsCarouselRight() {
  carouselCardsArrowLeft.classList.remove("left-arrow_opacity-half");
  let attrLeft = carouselCardsContainer.style.left;
  attrLeft = +attrLeft.slice(0, attrLeft.length - 2);
  if (attrLeft > 200) return;
  carouselCardsContainer.style.left = attrLeft + 500 + "px";
  attrLeft = carouselCardsContainer.style.left;
  attrLeft = +attrLeft.slice(0, attrLeft.length - 2);
  if (attrLeft > 200) {
    carouselCardsArrowRight.classList.add("right-arrow_opacity-half");
    return;
  }
  carouselCardsArrowRight.classList.remove("right-arrow_opacity-half");
}

const carouselFeedbacksArrowLeft = document.querySelector(".left-arrow_feedback");
carouselFeedbacksArrowLeft.addEventListener("click", moveFeedbacksCarouselLeft);
const carouselFeedbacksArrowRight = document.querySelector(".right-arrow_feedback");
carouselFeedbacksArrowRight.addEventListener("click", moveFeedbacksCarouselRight);

const carouselFeedbacksContainer = document.querySelector(".feedbacks__wrapper_moves");
let timer15Carousel = "";
let timer45Carousel = "";
let timerEverySec = "";
function moveFeedbacksCarouselLeft() {
  if (arguments.length !== 0) {
    clearTimeout(timerEverySec);
    clearTimeout(timer15Carousel);
    clearTimeout(timer45Carousel);
    setIntervalToCarouselFeedback(45000);
  }
  let attrLeft = carouselFeedbacksContainer.style.left;
  attrLeft = +attrLeft.slice(0, attrLeft.length - 2);
  if (attrLeft < -2160) {
    carouselFeedbacksContainer.style.left = 17 + "px";
    return;
  }
  carouselFeedbacksContainer.style.left = attrLeft - 545 + "px";
}

function moveFeedbacksCarouselRight() {
  if (arguments.length !== 0) {
    clearTimeout(timerEverySec);
    clearTimeout(timer15Carousel);
    clearTimeout(timer45Carousel);
    setIntervalToCarouselFeedback(45000);
  }
  let attrLeft = carouselFeedbacksContainer.style.left;
  attrLeft = +attrLeft.slice(0, attrLeft.length - 2);
  if (attrLeft > 20) {
    carouselFeedbacksContainer.style.left = -2163 + "px";
    return;
  }
  carouselFeedbacksContainer.style.left = attrLeft + 545 + "px";
}

function setIntervalToCarouselFeedback(sec) {
  let seconds = "";
  seconds = sec === 0 ? 14 : 59;
  timerEverySec = setInterval(() => {
    console.log(seconds);
    seconds--;
    if (seconds < 0) seconds = 14;
  }, 1000);
  timer45Carousel = setTimeout(() => {
    timer15Carousel = setInterval(() => {
      moveFeedbacksCarouselLeft();
    }, 15000);
  }, sec);
}
setIntervalToCarouselFeedback(0);

const feedbackWrapper = document.querySelector(".feedbacks__wrapper_moves");
feedbackWrapper.addEventListener("click", stopFeedbackCarousel);
function stopFeedbackCarousel(e) {
  if (
    e.target.className === "user_feedback" ||
    e.target.className === "feedback__img" ||
    e.target.className === "feedback__span-adress" ||
    e.target.className === "feedback__p" ||
    e.target.className === "feedback__span-name"
  ) {
    clearTimeout(timerEverySec);
    clearTimeout(timer15Carousel);
    clearTimeout(timer45Carousel);
    setIntervalToCarouselFeedback(45000);
  } else return;
}
