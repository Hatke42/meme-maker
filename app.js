const canvas = document.querySelector("canvas");
const line_width = document.getElementById("line-width");
const color_change = document.querySelector("#pick_color");
const color_options = document.querySelectorAll(".color-options");
const fill_btn = document.getElementById("mode-btn");
const destroy_btn = document.getElementById("destroy-btn");
const erase_btn = document.getElementById("erase-btn");
const input_file = document.querySelector("#inputfile");
const input_text = document.querySelector("#inputtext");
const download_btn = document.querySelector("#download-btn");

const ctx = canvas.getContext("2d");

const CANVAS_HEIGHT = 700;
const CANVAS_WIDTH = 700;
canvas.width = 700;
canvas.height = 700;
ctx.lineCap = "round";
ctx.lineWidth = line_width.value;

let isPainting = false;
let isFilling = false;

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
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color_change.value = colorValue;
}

function onFillBtnClick() {
  if (isFilling) {
    isFilling = false;
    fill_btn.innerText = "Fill";
  } else {
    isFilling = true;
    fill_btn.innerText = "Draw";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraseBtnClick() {
  const temp_color = "#FFFFFF";
  isFilling = false;
  fill_btn.innerText = "Fill";
  ctx.strokeStyle = temp_color;
  color_change.value = temp_color;
}

function onFileChange(event) {
  const url = URL.createObjectURL(event.target.files[0]);
  const img = new Image();
  img.src = url;
  img.onload = function () {
    ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
    input_file.value = null;
  };
}

function onDoubleClick(event) {
  const text = input_text.value;
  if (text !== "") {
    ctx.lineWidth = 10;
    ctx.font = "30px sans-serif";
    ctx.fillText(text, event.offsetX, event.offsetY);
  }
}

function onDownlodbtnClick(event) {
  const name = input_text.value;
  if (name !== "") {
    const url = canvas.toDataURL("image/jpeg");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${input_text.value}`;
    a.click();
  } else {
    alert("please input name of image in text");
  }
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("mousemove", handleMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", endPainting);
canvas.addEventListener("mouseleave", endPainting); //to resolve a bug

line_width.addEventListener("change", onWidthChange);
color_change.addEventListener("change", onColorChange);

color_options.forEach((color) => color.addEventListener("click", onColorClick));
fill_btn.addEventListener("click", onFillBtnClick);
destroy_btn.addEventListener("click", onDestroyClick);
erase_btn.addEventListener("click", onEraseBtnClick);
input_file.addEventListener("change", onFileChange);
download_btn.addEventListener("click", onDownlodbtnClick);
