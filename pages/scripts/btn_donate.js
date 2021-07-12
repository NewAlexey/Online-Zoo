const donateInput = document.querySelector(".input__donate");
donateInput.addEventListener("input", checkDonateInput);

function checkDonateInput() {
  const inputValue = donateInput.value;
  if (inputValue.length > 4) {
    donateInput.value = inputValue.slice(0, inputValue.length - 1);
  }
}