const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color-picker');
const brushSize = document.getElementById('brush-size');
const clearCanvasButton = document.getElementById('clear-canvas');

let isDrawing = false;

// Function to resize canvas dynamically
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.9; // 90% of screen width
  canvas.height = window.innerHeight * 0.7; // 70% of screen height
  ctx.lineCap = 'round';
  ctx.strokeStyle = colorPicker.value;
  ctx.lineWidth = brushSize.value;
}

// Resize canvas on load and window resize
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

// Event Listeners for mouse
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Event Listeners for touch
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

  // Handle touch or mouse coordinates
  const x = (e.clientX || e.touches[0].clientX) - canvas.getBoundingClientRect().left;
  const y = (e.clientY || e.touches[0].clientY) - canvas.getBoundingClientRect().top;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
}
