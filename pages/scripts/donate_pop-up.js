let donation;
const buttons = [".footer__btn", ".pay-and-feed__button", ".zoo__button"];
buttons.forEach((el) => {
  if (document.querySelector(`${el}`)) {
    document.querySelector(`${el}`).addEventListener("click", showPopUpStart);
  }
});

if (document.querySelector(".donate__btn"))
  document.querySelector(".donate__btn").addEventListener("click", showPopUpStep1);

if (document.querySelector(".input__donate")) {
  const donateInput = document.querySelector(".input__donate");
  donateInput.addEventListener("input", checkDonateInput);
}

function checkDonateInput() {
  const donateInput = document.querySelector(".input__donate");
  const inputValue = donateInput.value;
  if (inputValue.length > 4) {
    donateInput.value = inputValue.slice(0, inputValue.length - 1);
  }
}

const popUpInfoStep1 = {
  10: false,
  20: false,
  30: false,
  50: false,
  80: false,
  100: false,
  checkbox: "",
  amounthOther: "",
  selectedPet: "",
};

const popUpInfoStep1Functions = {
  10: setCheckedDonation10,
  20: setCheckedDonation20,
  30: setCheckedDonation30,
  50: setCheckedDonation50,
  80: setCheckedDonation80,
  100: setCheckedDonation100,
  checkbox: setCheckedCheckbox,
  amounthOther: setAmounthOther,
  selectedPet: setSelectedPet,
};

const popUpInfoStep2 = {
  name: "",
  email: "",
};

const popUpInfoStep2Functions = {
  name: setNameInInput,
  email: setEmailInInput,
};

const popUpInfoStep3 = {
  creditCard: "",
  cvv: "",
  month: "",
  year: "",
};

const popUpInfoStep3Functions = {
  creditCard: setCreditCardNumberInInput,
  cvv: setCVVInInput,
  month: setMonthInInput,
  year: setYearInInput,
};

function createDiv(clss) {
  const div = document.createElement("div");
  div.classList.add(clss);
  return div;
}

function createPopUpBackground() {
  const popUpBackground = createDiv("pop-up_background");
  popUpBackground.addEventListener("click", destroyPopUp);
  document.querySelector("body").append(popUpBackground);
  window.addEventListener("scroll", cancelScroll);
}

function showPopUpStart() {
  createPopUpBackground();
  const popUpContainer = createDiv("pop-up_container");
  popUpContainer.innerHTML = popUpStart;
  document.querySelector("body").append(popUpContainer);
  setCoords(".pop-up_start");
  document.querySelector(".pop-up_donations-container").addEventListener("click", showPopUpStep1);
}

function setCoords(elem) {
  const popUpWindow = document.querySelector(elem);
  const height = document.documentElement.clientHeight;
  const width = document.documentElement.clientWidth;
  const popUpHeight = popUpWindow.getBoundingClientRect().height;
  const popUpWidth = popUpWindow.getBoundingClientRect().width;
  popUpWindow.style.top = Math.abs(height - popUpHeight) / 2 + "px";
  popUpWindow.style.left = Math.abs(width - popUpWidth) / 2 + "px";
}

function cancelScroll(e) {
  // const y = window.scrollY;
  window.onscroll = () => {
    // window.scrollTo(0, y);
    return false;
  };
}

function destroyPopUp() {
  document.querySelector(".pop-up_background").remove();
  document.querySelector(".pop-up_container").remove();
  window.removeEventListener("scroll", cancelScroll);
  updateToFalsePopUpObject(popUpInfoStep1);
  updateToFalsePopUpObject(popUpInfoStep2);
  updateToFalsePopUpObject(popUpInfoStep3);
}

function showPopUpStep1(e) {
  if (
    e.target.className !== "pop-up_donation" &&
    e.target.className !== "donate__btn" &&
    e.target.className !== "donate__btn_arrow" &&
    e.target.className !== "step-2_btn-back"
  ) {
    return;
  }
  if (e.target.className === "pop-up_donation") donation = e.target.innerHTML;
  else if (e.target.className === "donate__btn" || e.target.className === "donate__btn_arrow") {
    donation = document.querySelector(".input__donate").value;
  }
  createPopUpStep1();
  setCoords(".pop-up__step-1");
  addListenersToElemStep1();
}

function createPopUpStep1() {
  if (document.querySelector(".pop-up_start")) {
    document.querySelector(".pop-up_start").remove();
    const popUpContainer = document.querySelector(".pop-up_container");
    popUpContainer.innerHTML = popUpStep1;
    highlightDonation();
  } else if (document.querySelector(".pop-up__step-2")) {
    updateObjectStep2Info();
    document.querySelector(".pop-up__step-2").remove();
    const popUpContainer = document.querySelector(".pop-up_container");
    popUpContainer.innerHTML = popUpStep1;
    updateStepInfo(popUpInfoStep1, popUpInfoStep1Functions);
  } else {
    createPopUpBackground();
    const popUpContainer = createDiv("pop-up_container");
    popUpContainer.innerHTML = popUpStep1;
    document.querySelector("body").append(popUpContainer);
    if (donation) {
      document.querySelector(".pop-up__step-1_input").value = donation;
      document.querySelector(".pop-up__step-1_divs").classList.add("opacity-full");
    } else {
      document.querySelector(".pop-up__step-1_donation").classList.add("opacity-full");
    }
  }
}

function addListenersToElemStep1() {
  document.querySelector(".pop-up__step-1_donations-container").addEventListener("click", donationBtnClick);
  document.querySelector(".pop-up__step-1_input").addEventListener("input", donateInputChange);
  document.querySelector(".pop-up__step-1_checkbox").addEventListener("click", clickCheckBoxStep1);
  document.querySelector("#selected-animal").addEventListener("change", highlightSpecialPet);
  document.querySelector(".step-1_btn-next").addEventListener("click", showPopUpStep2);
}

function donateInputChange() {
  checkDonateInputPopUp();
  const donationsBtnArr = document.querySelectorAll(".pop-up__step-1_donation");
  donationsBtnArr.forEach((el) => {
    el.classList.remove("opacity-full");
  });
  const donationAmounth = document.querySelector(".pop-up__step-1_divs");
  donationAmounth.classList.add("opacity-full");
}

function checkDonateInputPopUp() {
  const donationInput = document.querySelector(".pop-up__step-1_input");
  const inputValue = donationInput.value;
  if (inputValue.length > 4) {
    donationInput.value = inputValue.slice(0, inputValue.length - 1);
  }
}

function donationBtnClick(e) {
  if (e.target.className !== "pop-up__step-1_donation") return;
  const donationsBtnArr = document.querySelectorAll(".pop-up__step-1_donation");
  donationsBtnArr.forEach((el) => {
    el.classList.remove("opacity-full");
  });
  e.target.classList.add("opacity-full");
  document.querySelector(".pop-up__step-1_input").value = "";
  document.querySelector(".pop-up__step-1_divs").classList.remove("opacity-full");
}

function highlightSpecialPet() {
  const divSpecialPet = document.querySelector("#div-special-pet");
  const selectSpecialPet = document.querySelector("#selected-animal");
  selectSpecialPet.value !== "Choose your favourite"
    ? divSpecialPet.classList.add("opacity-full")
    : divSpecialPet.classList.remove("opacity-full");
}

function highlightDonation() {
  const donationArr = document.querySelectorAll(".pop-up__step-1_donation");
  for (let i = 0; i < donationArr.length; i++) {
    if (donationArr[i].innerHTML === donation) {
      donationArr[i].classList.add("opacity-full");
      document.querySelector(".pop-up__step-1_input").blur();
      return;
    } else {
      document.querySelector(".pop-up__step-1_input").focus();
    }
  }
}

function clickCheckBoxStep1() {
  const checkBoxStep1 = document.querySelector(".pop-up__step-1_checkbox");
  checkBoxStep1.classList.toggle("checkbox-click");
}

function showPopUpStep2() {
  if (document.querySelector(".pop-up__step-1")) {
    updateToFalsePopUpObject(popUpInfoStep1);
    updateObjectStep1Info();
  } else updateObjectStep3Info();
  createPopUpStep2();
  setCoords(".pop-up__step-2");
  document.querySelector(".step-2_btn-back").addEventListener("click", showPopUpStep1);
  updateStepInfo(popUpInfoStep2, popUpInfoStep2Functions);
}

function createPopUpStep2() {
  if (document.querySelector(".pop-up__step-1")) document.querySelector(".pop-up__step-1").remove();
  else document.querySelector(".pop-up__step-3").remove();
  const popUpContainer = document.querySelector(".pop-up_container");
  popUpContainer.innerHTML = popUpStep2;
}

function showPopUpStep3() {
  updateObjectStep2Info();
  createPopUpStep3();
  setCoords(".pop-up__step-3");
  addListenersToElemStep3();
  updateStepInfo(popUpInfoStep3, popUpInfoStep3Functions);
  checkValidInputs();
}

function createPopUpStep3() {
  document.querySelector(".pop-up__step-2").remove();
  const popUpContainer = document.querySelector(".pop-up_container");
  popUpContainer.innerHTML = popUpStep3;
}

function addListenersToElemStep3() {
  document.querySelector(".step-3_btn-back").addEventListener("click", showPopUpStep2);
  document.querySelector("#pop-up__step-3_card").addEventListener("input", checkLengthCardInput);
  document.querySelector("#pop-up__step-3_cvv").addEventListener("input", checkLengthCVVInput);
  document.querySelector("#pop-up__step-3_card").addEventListener("input", checkValidInputs);
  document.querySelector("#pop-up__step-3_cvv").addEventListener("input", checkValidInputs);
  document.querySelector("#selected-month").addEventListener("input", checkValidInputs);
  document.querySelector("#selected-year").addEventListener("input", checkValidInputs);
}

function checkValidInputs() {
  const valueInputMonth = document.querySelector("#selected-month").value;
  const valueInputYear = document.querySelector("#selected-year").value;
  const valueInputCardNumber = document.querySelector("#pop-up__step-3_card").value;
  const valueInputCVV = document.querySelector("#pop-up__step-3_cvv").value;
  if (valueInputMonth === "Month") {
    document.querySelector(".step-3_btn-complete").classList.add("hide");
    return;
  }
  if (valueInputYear === "Year") {
    document.querySelector(".step-3_btn-complete").classList.add("hide");
    return;
  }
  if (!Number.isNaN(valueInputCVV) && valueInputCVV.length !== 3) {
    document.querySelector(".step-3_btn-complete").classList.add("hide");
    return;
  }
  if (!Number.isNaN(valueInputCardNumber) && valueInputCardNumber.length !== 16) {
    document.querySelector(".step-3_btn-complete").classList.add("hide");
    return;
  }
  document.querySelector(".step-3_btn-complete").classList.remove("hide");
}

function checkLengthCardInput() {
  const cardInput = document.querySelector("#pop-up__step-3_card");
  const inputValue = cardInput.value;
  if (inputValue.length > 16) {
    cardInput.value = inputValue.slice(0, inputValue.length - 1);
  }
}

function checkLengthCVVInput() {
  const cvvInput = document.querySelector("#pop-up__step-3_cvv");
  const inputValue = cvvInput.value;
  if (inputValue.length > 3) {
    cvvInput.value = inputValue.slice(0, inputValue.length - 1);
  }
}

function updateToFalsePopUpObject(obj) {
  for (let key in obj) {
    obj[key] = false;
  }
}

function updateStepInfo(objWithData, objWithFunc) {
  for (let key in objWithData) {
    if (objWithData[key]) objWithFunc[key]();
  }
}

function updateObjectStep1Info() {
  const checkbox = document.querySelector(".pop-up__step-1_checkbox");
  if (checkbox.classList.contains("checkbox-click")) popUpInfoStep1["checkbox"] = true;
  const selectedPet = document.querySelector("#selected-animal");
  if (selectedPet.value !== "Choose your favourite") popUpInfoStep1["selectedPet"] = selectedPet.value;
  const inputPopUpStep1 = document.querySelector(".pop-up__step-1_input");
  if (inputPopUpStep1.value) {
    popUpInfoStep1["amounthOther"] = inputPopUpStep1.value;
    return;
  }
  const donationArr = document.querySelectorAll(".pop-up__step-1_donation");
  donationArr.forEach((el) => {
    if (el.classList.contains("opacity-full")) {
      const value = el.innerHTML.slice(1);
      popUpInfoStep1[value] = true;
    }
  });
}

function updateObjectStep2Info() {
  popUpInfoStep2["name"] = document.querySelector("#pop-up__step-2_name").value;
  popUpInfoStep2["email"] = document.querySelector("#pop-up__step-2_email").value;
}

function updateObjectStep3Info() {
  popUpInfoStep3["creditCard"] = document.querySelector("#pop-up__step-3_card").value;
  popUpInfoStep3["cvv"] = document.querySelector("#pop-up__step-3_cvv").value;
  popUpInfoStep3["month"] = document.querySelector("#selected-month").value;
  popUpInfoStep3["year"] = document.querySelector("#selected-year").value;
}

function sendSubmit() {
  alert("Thank you for your donation");
  destroyPopUp();
}

function setCheckedDonation10() {
  const donationsArr = document.querySelectorAll(".pop-up__step-1_donation");
  donationsArr.forEach((el) => {
    if (el.innerHTML === "$10") el.classList.add("opacity-full");
  });
}
function setCheckedDonation20() {
  const donationsArr = document.querySelectorAll(".pop-up__step-1_donation");
  donationsArr.forEach((el) => {
    if (el.innerHTML === "$20") el.classList.add("opacity-full");
  });
}
function setCheckedDonation30() {
  const donationsArr = document.querySelectorAll(".pop-up__step-1_donation");
  donationsArr.forEach((el) => {
    if (el.innerHTML === "$30") el.classList.add("opacity-full");
  });
}
function setCheckedDonation50() {
  const donationsArr = document.querySelectorAll(".pop-up__step-1_donation");
  donationsArr.forEach((el) => {
    if (el.innerHTML === "$50") el.classList.add("opacity-full");
  });
}
function setCheckedDonation80() {
  const donationsArr = document.querySelectorAll(".pop-up__step-1_donation");
  donationsArr.forEach((el) => {
    if (el.innerHTML === "$80") el.classList.add("opacity-full");
  });
}
function setCheckedDonation100() {
  const donationsArr = document.querySelectorAll(".pop-up__step-1_donation");
  donationsArr.forEach((el) => {
    if (el.innerHTML === "$100") el.classList.add("opacity-full");
  });
}

function setAmounthOther() {
  document.querySelector(".pop-up__step-1_input").value = popUpInfoStep1["amounthOther"];
  document.querySelector(".pop-up__step-1_divs").classList.add("opacity-full");
}

function setSelectedPet() {
  document.querySelector("#selected-animal").value = popUpInfoStep1["selectedPet"];
  document.querySelector("#div-special-pet").classList.add("opacity-full");
}

function setCheckedCheckbox() {
  document.querySelector(".pop-up__step-1_checkbox").classList.add("checkbox-click");
}

function setNameInInput() {
  document.querySelector("#pop-up__step-2_name").value = popUpInfoStep2["name"];
}

function setEmailInInput() {
  document.querySelector("#pop-up__step-2_email").value = popUpInfoStep2["email"];
}

function setCreditCardNumberInInput() {
  document.querySelector("#pop-up__step-3_card").value = popUpInfoStep3["creditCard"];
}

function setCVVInInput() {
  document.querySelector("#pop-up__step-3_cvv").value = popUpInfoStep3["cvv"];
}

function setMonthInInput() {
  document.querySelector("#selected-month").value = popUpInfoStep3["month"];
}

function setYearInInput() {
  document.querySelector("#selected-year").value = popUpInfoStep3["year"];
}

const popUpStart = `<div class="pop-up_start">
<section class="pop-up_image-container">
  <div class="pop-up_img"></div>
  <div class="pop-up_union" onclick="destroyPopUp()"></div>
</section>
<section class="pop-up_info">
  <h2 class="pop-up_h2">together we care, save and protect!</h2>
  <p class="pop-up_text">
    Your most generous gift not only cares for countless animals, but it also offers hope and a vital lifeline to
    the world’s most endangered wildlife relying on us to survive.
  </p>
  <section class="pop-up_donations-container">
    <div class="pop-up_donation">$20</div>
    <div class="pop-up_donation">$30</div>
    <div class="pop-up_donation">$50</div>
    <div class="pop-up_donation">$80</div>
    <div class="pop-up_donation">$100</div>
    <div class="pop-up_donation">other amount</div>
  </section>
</section>
</div>"`;

const popUpStep1 = `<div class="pop-up__step-1">
<section class="pop-up__steps">
  <h2 class="pop-up__steps-h2">make your donation</h2>
</section>
<section class="pop-up__step-1_body">
  <section>
    <div class="pop-up__step-1_container">
      <span class="pop-up__step-1_header-donation">Donation Information:</span>
    </div>
  </section>
  <div class="pop-up__step-1_line"></div>
  <section>
    <div class="pop-up__step-1_container">
      <p class="pop-up__step-1_p"><span>*</span> Choose your donation amount:</p>
      <section class="pop-up__step-1_donations-container">
        <div class="pop-up__step-1_donation">$10</div>
        <div class="pop-up__step-1_donation">$20</div>
        <div class="pop-up__step-1_donation">$30</div>
        <div class="pop-up__step-1_donation">$50</div>
        <div class="pop-up__step-1_donation">$80</div>
        <div class="pop-up__step-1_donation">$100</div>
      </section>
      <section class="pop-up__step-1_donation-other">
        <div class="pop-up__step-1_divs"><span>other amount</span></div>
        <input type="number" class="pop-up__step-1_input" />
      </section>
      <section class="pop-up__step-1_special-pet">
        <div id="div-special-pet" class="pop-up__step-1_divs"><span>for special pet</span></div>
        <select name="animal" id="selected-animal" class="pop-up__step-1_select">
          <option selected>Choose your favourite</option>
          <option value="Lukas the Panda">Lukas the Panda</option>
          <option value="Andy the Lemur">Andy the Lemur</option>
          <option value="Glen the Gorilla">Glen the Gorilla</option>
          <option value="Sam & Lora the eagles family">Sam & Lora the eagles family</option>
        </select>
      </section>
      <section class="pop-up__step-1_gift">
        <div class="pop-up__step-1_checkbox"></div>
        <span class="pop-up__step-1_span">Make this a monthly recurring gift</span>
      </section>
      <section class="pop-up__step-1_buttons">
        <section class="step-1_steps">
          <div class="step active"></div>
          <div class="step"></div>
          <div class="step"></div>
        </section>
        <div class="step-1_btn-back hide">
          <span class="step-1_back">Back</span>
          <div class="step-1_arrow"></div>
        </div>
        <button class="step-1_btn-next">
          <span class="step-1_next">Next</span>
          <div class="step-1_arrow"></div>
        </button>
      </section>
    </div>
  </section>
</section>
</div>`;

const popUpStep2 = `<div class="pop-up__step-2">
<section class="pop-up__steps">
  <h2 class="pop-up__steps-h2">make your donation</h2>
</section>
<section class="pop-up__step-2_body">
  <section>
    <div class="pop-up__step-2_container">
      <span class="pop-up__step-2_header-donation">Billing Information:</span>
    </div>
  </section>
  <div class="pop-up__step-2_line"></div>
  <section>
    <div class="pop-up__step-2_container">
      <form onsubmit="showPopUpStep3(); return false">
        <p class="pop-up__step-2_p-name"><span>*</span> Your Name</p>
        <input
          id="pop-up__step-2_name"
          type="text"
          placeholder="First and last name"
          class="pop-up__step-2_input"
          minlength="3"
          required
        />
        <p class="pop-up__step-2_p-email"><span>*</span> Your Email Address</p>
        <input
          id="pop-up__step-2_email"
          type="email"
          placeholder="Enter your email"
          class="pop-up__step-2_input"
          required
        />
        <p class="pop-up__step-2_p-info">
          You will receive emails from the Online Zoo, including updates and news on the latest discoveries and
          translations. You can unsubscribe at any time.
        </p>
        <section class="pop-up__step-2_buttons">
          <section class="step-2_steps">
            <div class="step active"></div>
            <div class="step active"></div>
            <div class="step"></div>
          </section>
          <div class="step-2_btn-back">Back</div>
          <button class="step-2_btn-next">
            <span class="step-2_next"> Next </span>
            <div class="step-2_arrow"></div>
          </button>
        </section>
      </form>
    </div>
  </section>
</section>
</div>`;

const popUpStep3 = `<div class="pop-up__step-3">
<section class="pop-up__steps">
  <h2 class="pop-up__steps-h2">make your donation</h2>
</section>
<section class="pop-up__step-3_body">
  <section>
    <div class="pop-up__step-3_container">
      <span class="pop-up__step-3_header-donation">Payment Information:</span>
    </div>
  </section>
  <div class="pop-up__step-3_line"></div>
  <section>
    <div class="pop-up__step-3_container">
      <form onsubmit="sendSubmit(); return false">
        <section class="pop-up__step-3_section">
          <div>
            <p class="pop-up__step-3_p"><span>*</span> Credit Card Number</p>
            <input
              id="pop-up__step-3_card"
              type="text"
              placeholder="Credit Card Number"
              class="pop-up__step-3_input"
              pattern="[0-9]{16,16}"
              minlength="16"
              required
            />
          </div>
          <div>
            <p class="pop-up__step-3_p"><span>*</span> CVV Number</p>
            <input
              id="pop-up__step-3_cvv"
              placeholder="CVV"
              type="text"
              class="pop-up__step-3_input input-cvv"
              pattern="[0-9]{3,3}"
              minlength="3"
              required
            />
          </div>
        </section>
        <section>
          <p class="pop-up__step-3_p pop-up__step-3_p-paddings"><span>*</span> Expiration Date</p>
          <div class="pop-up__step-3_div-select">
            <select name="month" id="selected-month" class="pop-up__step-3_select" required>
              <option selected>Month</option>
              <option value="1">01</option>
              <option value="2">02</option>
              <option value="3">03</option>
              <option value="4">04</option>
              <option value="5">05</option>
              <option value="6">06</option>
              <option value="7">07</option>
              <option value="8">08</option>
              <option value="9">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <select name="year" id="selected-year" required class="pop-up__step-3_select" required>
              <option selected>Year</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
            </select>
          </div>
        </section>
        <section class="pop-up__step-3_buttons">
          <section class="step-3_steps">
            <div class="step active"></div>
            <div class="step active"></div>
            <div class="step active"></div>
          </section>
          <div class="step-3_btn-back">Back</div>
          <button class="step-3_btn-complete hide">
            <span class="step-3_complete"> Complete donation </span>
            <div class="step-3_arrow"></div>
          </button>
        </section>
      </form>
    </div>
  </section>
</section>
</div>`;
