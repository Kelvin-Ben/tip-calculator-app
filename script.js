const billInput = document.querySelector('.bill-input');
const tipButtons = document.querySelectorAll('.btn')
const customTip = document.querySelector('.custom')
const numberOfPeople = document.querySelector('.person-input')
const tipAmount = document.getElementById('tipAmountPerPerson')
const totalTipAmount = document.getElementById('totalTip')
const alert = document.querySelector('.alert')
const resetButton = document.querySelector('.reset')

let billValue = 0;
let tipValue = 0;
let peopleValue = 0;


// validate bill input
billInput.addEventListener('input', function () {
  billValue = parseFloat(billInput.value) || 0;
  calculateTip();
})

// handle tip button clicks
tipButtons.forEach(button => {
  button.addEventListener('click', function () {
    // remove active class from all buttons
    tipButtons.forEach(button => button.classList.remove('active'));

    // add active class to button clicked
    this.classList.add('active')
    // get tip value from the button clicked
    tipValue = parseInt(this.textContent);
    // clear custom tip if any
    customTip.value = ''
    calculateTip();
  })
})

// Handle custom tip input
customTip.addEventListener('input', function () {
  // remove active class from all buttons
  tipButtons.forEach(button => button.classList.remove('active'));
  tipValue = parseFloat(customTip.value) || 0;
  calculateTip()
})

// validate number of people
numberOfPeople.addEventListener('input', function () {
  peopleValue = parseInt(numberOfPeople.value) || 0;
  if (peopleValue === 0) {
    alert.style.display = 'inline'
    numberOfPeople.style.outline = '2px solid red';
  } else {
    alert.style.display = 'none'
    numberOfPeople.style.outline = 'none';
  }
  calculateTip()
})

// calculate tip and total
function calculateTip() {
  if (peopleValue === 0) return;

  const tipPerPerson = (billValue * (tipValue / 100) / peopleValue)
  const TipAmount = (billValue / peopleValue) + tipPerPerson
  tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`
  totalTipAmount.textContent = `$${TipAmount.toFixed(2)}`
  if (tipValue > 0 || billValue > 0 || peopleValue > 0) {
    resetButton.disabled = false;
  }
}

// reset button to clear the calculator
resetButton.addEventListener('click', function (){
  billInput.value = ''
  customTip.value = ''
  numberOfPeople.value = ''
  tipButtons.forEach(button => button.classList.remove('active'));
  tipAmount.textContent = '$0.00';
  totalTipAmount.textContent = '$0.00'
  resetButton.disabled = true
  alert.style.display = 'none'
  numberOfPeople.style.outline = 'none';
})