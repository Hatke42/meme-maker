const canvas = document.querySelector("canvas");
const line_width = document.getElementById("line-width");
const color_change = document.querySelector("#pick_color");
const color_options = document.querySelectorAll(".color-options");

const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = line_width.value;

let isPainting = false;

function handleMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}
function endPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  ctx.strokeStyle = event.target.dataset.color;
  ctx.fillStyle = event.target.dataset.color;
}

canvas.addEventListener("mousemove", handleMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", endPainting);
canvas.addEventListener("mouseleave", endPainting); //to resolve a bug

line_width.addEventListener("change", onWidthChange);
color_change.addEventListener("change", onColorChange);

color_options.forEach((color) => color.addEventListener("click", onColorClick));
