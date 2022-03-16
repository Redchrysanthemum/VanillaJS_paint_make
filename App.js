const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("colors");
const Brush = document.getElementById("Brush");
const Mode = document.getElementById("Mode");
const Save = document.getElementById("Save");

const InitialColor = "#2c2c2c";

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = InitialColor;
ctx.fillStyle = InitialColor;
ctx.lineWidth = 2.5;

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

let painting = false;
let FillorStroke = false;

const stopPainting = () => {
  painting = false;
};

const startPainting = () => {
  painting = true;
};

const onMouseMove = (e) => {
  const x = e.offsetX;
  const y = e.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

const changeColor = (e) => {
  const cc = e.target.style.backgroundColor;
  ctx.strokeStyle = cc;
  ctx.fillStyle = cc;
};

const BrushSizeChange = (e) => {
  const Size = e.target.value;
  ctx.lineWidth = Size;
};

const ModeChange = () => {
  if (FillorStroke === true) {
    FillorStroke = false;
    Mode.innerText = "채우기";
  } else {
    FillorStroke = true;
    Mode.innerText = "그리기";
  }
};

const fillPainting = () => {
  if (FillorStroke) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
};

const closeCM = (e) => {
  e.preventDefault();
};

const SaveImage = () => {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintVanillaJS";
  link.click();
};

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", fillPainting);
  canvas.addEventListener("contextmenu", closeCM); //우클릭 방지
}

Array.from(colors).forEach((This) =>
  This.addEventListener("click", changeColor)
);
//Array.from 메소드는 object 로 부터 array를 만든다

if (Brush) {
  Brush.addEventListener("input", BrushSizeChange);
}

if (Mode) {
  Mode.addEventListener("click", ModeChange);
}

if (Save) {
  Save.addEventListener("click", SaveImage);
}
