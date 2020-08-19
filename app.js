const canvas = document.querySelector(".js-canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("js-color");
const range = document.querySelector(".js-range");
const mode = document.querySelector(".js-mode");
const save = document.querySelector(".js-save");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const xPos = event.offsetX;
  const yPos = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(xPos, yPos);
  } else {
    ctx.lineTo(xPos, yPos);
    ctx.stroke();
  }
}

function handleCanvansClick() {
  if (filling === true) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function handleCM(event) {
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvansClick);
  canvas.addEventListener("contextmenu", handleCM);
}

if (colors) {
  Array.from(colors).forEach((color) =>
    color.addEventListener("click", (event) => {
      const color = event.target.style.backgroundColor;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
    })
  );
}

if (range) {
  range.addEventListener("input", (event) => {
    ctx.lineWidth = event.target.value;
  });
}

if (mode) {
  mode.addEventListener("click", () => {
    if (filling === true) {
      filling = false;
      mode.innerText = "Fill";
    } else {
      filling = true;
      mode.innerText = "Paint";
    }
  });
}

if (save) {
  save.addEventListener("click", () => {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();
  });
}
