const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color-picker');
const brushSize = document.getElementById('brush-size');
const clearCanvasButton = document.getElementById('clear-canvas');

let isDrawing = false;

// Set initial styles
ctx.strokeStyle = colorPicker.value;
ctx.lineWidth = brushSize.value;
ctx.lineCap = 'round';

// Event Listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

colorPicker.addEventListener('input', () => {
  ctx.strokeStyle = colorPicker.value;
});

brushSize.addEventListener('input', () => {
  ctx.lineWidth = brushSize.value;
});

clearCanvasButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Functions
function startDrawing(e) {
  isDrawing = true;
  draw(e);
}

function draw(e) {
  if (!isDrawing) return;

  // Get mouse or touch position
  const x = e.clientX || e.touches[0].clientX;
  const y = e.clientY || e.touches[0].clientY;

  // Adjust for canvas offset
  const rect = canvas.getBoundingClientRect();
  const offsetX = x - rect.left;
  const offsetY = y - rect.top;

  ctx.lineTo(offsetX, offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(offsetX, offsetY);
}

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
}