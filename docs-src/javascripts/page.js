import colorMixer from "../../color-mixer.js";

//////////////////////////////////////////
/// INIT
var one = document.querySelector(".one");
var two = document.querySelector(".two");
var pzt = document.querySelector(".percentage");
let c = 0;

function changeBg() {
  document.documentElement.style.background =
    "#" + colorMixer(one.value.slice(1), two.value.slice(1), Number(pzt.value));
}
function hsv2rgb(hsv) {
  var R, G, B, X, C;
  var h = (hsv.h % 360) / 60;

  C = hsv.v * hsv.s;
  X = C * (1 - Math.abs((h % 2) - 1));
  R = G = B = hsv.v - C;

  h = ~~h;
  R += [C, X, 0, 0, X, C][h];
  G += [X, C, C, X, 0, 0][h];
  B += [0, 0, X, C, C, X][h];

  var r = Math.floor(R * 255);
  var g = Math.floor(G * 255);
  var b = Math.floor(B * 255);
  return {
    r,
    g,
    b,
    hex: "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1)
  };
}

function initColors() {
  var hueOne = Math.floor(Math.random() * 360);
  // +120º difference on the color wheel
  var hueTwo = hueOne + (120 % 360);

  //apply values to the inputs
  one.value = hsv2rgb({ h: hueOne, s: 1, v: 1 }).hex;
  two.value = hsv2rgb({ h: hueTwo, s: 1, v: 1 }).hex;
}

let intervalId;
const start = () => {
  // create input event to trigg change range-input
  // var inputEvent = document.createEvent("Event");
  // inputEvent.initEvent("input");

  intervalId = setInterval(function() {
    c += 0.01;
    pzt.value = Math.cos(c) / 4 + 0.5;
    changeBg();
    // pzt.dispatchEvent(inputEvent);
  }, 5);
};

const stop = () => {
  clearInterval(intervalId);
};

//add event handlers
pzt.oninput = one.oninput = two.oninput = () => {
  changeBg();
  c = 2 / Math.PI / Number(pzt.value);
};
pzt.onmouseenter = stop;
pzt.onmouseout = start;

initColors();
start();
