// select display box
let display = document.getElementById("display");

function press(value) {
  display.value = display.value + value;
}

// click = button  and answer calculate
function calculate() {
  display.value = eval(display.value);
}

// click C button clear
function clearDisplay() {
  display.value = "";
}