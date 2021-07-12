const arrowStartHide = document.querySelector(".nav__arrows_top");
arrowStartHide.addEventListener("click", moveStartSideMenuToTheSide);
arrowStartHide.addEventListener("click", moveOpenSideMenuToTheSide);

const arrowOpenHide = document.querySelector(".nav__arrows_top-open");
arrowOpenHide.addEventListener("click", moveStartSideMenuToTheSide);
arrowOpenHide.addEventListener("click", moveOpenSideMenuToTheSide);

const asideStartSection = document.querySelector(".section__aside_wrapper");
function moveStartSideMenuToTheSide() {
  document.querySelector(".section__aside_wrapper").classList.toggle("move-aside-menu");
}
function moveOpenSideMenuToTheSide() {
  document.querySelector(".aside_open").classList.toggle("move-aside_open-menu");
}


const arrowMovesAnimalsInSidebarStart = document.querySelector(".aside__arrow_bottom");
arrowMovesAnimalsInSidebarStart.addEventListener("click", moveAnimals);
const arrowMovesAnimalsInSidebarOpen = document.querySelector(".aside__arrow_bottom-open");
arrowMovesAnimalsInSidebarOpen.addEventListener("click", moveAnimals);


function moveAnimals() {
  const sideMenu = document.querySelector(".section__aside_wrapper");
  const heightMenu = sideMenu.getBoundingClientRect().height;
  heightMenu === 582 ? moveAnimalsLowWidth() : moveAnimalsNormalWidth()
}

function moveAnimalsNormalWidth() {
  const wrapper = document.querySelector(".nav__li_div-carousel");
  const wrapperOpen = document.querySelector(".nav__li_div-carousel-open");
  let attrTopStart = wrapper.style.top;
  let attrTopOpen = wrapperOpen.style.top;
  attrTopStart = +attrTopStart.slice(0, attrTopStart.length - 2);
  attrTopOpen = +attrTopOpen.slice(0, attrTopOpen.length - 2);
  if (attrTopStart === -684) {
    return;
  }
  wrapper.style.top = attrTopStart - 171 + "px";
  wrapperOpen.style.top = attrTopStart - 171 + "px";
  attrTopStart = wrapper.style.top;
  attrTopStart = +attrTopStart.slice(0, attrTopStart.length - 2);
  if (attrTopStart === -684) {
    arrowMovesAnimalsInSidebarStart.classList.add("half-opacity");
    arrowMovesAnimalsInSidebarOpen.classList.add("half-opacity-open");
  }
}

function moveAnimalsLowWidth() {
  const wrapper = document.querySelector(".nav__li_div-carousel");
  const wrapperOpen = document.querySelector(".nav__li_div-carousel-open");
  let attrTopStart = wrapper.style.top;
  let attrTopOpen = wrapperOpen.style.top;
  attrTopStart = +attrTopStart.slice(0, attrTopStart.length - 2);
  attrTopOpen = +attrTopOpen.slice(0, attrTopOpen.length - 2);
  if (attrTopStart === -205) {
    return;
  }
  wrapper.style.top = attrTopStart - 52 + "px";
  wrapperOpen.style.top = attrTopStart - 52 + "px";
  attrTopStart = wrapper.style.top;
  attrTopStart = +attrTopStart.slice(0, attrTopStart.length - 2);
  if (attrTopStart === -208) {
    wrapper.style.top = -205 + "px";
    wrapperOpen.style.top = -205 + "px";
    arrowMovesAnimalsInSidebarStart.classList.add("half-opacity");
    arrowMovesAnimalsInSidebarOpen.classList.add("half-opacity-open");
  }
}

