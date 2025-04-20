function downloadClicked() {
  alert("Download started!");
}

// ==== 3D Tilt + Parallax ====
const card = document.getElementById("card");
const layers = card.querySelectorAll(".layer");

let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;

document.addEventListener("mousemove", e => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const percentX = (e.clientX - centerX) / centerX;
  const percentY = (e.clientY - centerY) / centerY;

  targetX = percentX * 40; // More tilt
  targetY = percentY * 40;
});

function animateCard() {
  currentX += (targetX - currentX) * 0.1;
  currentY += (targetY - currentY) * 0.1;

  card.style.transform = `translate(-50%, -50%) rotateX(${-currentY}deg) rotateY(${currentX}deg)`;

  layers.forEach(layer => {
    const depth = layer.getAttribute("data-depth");
    const moveX = currentX * depth;
    const moveY = currentY * depth;
    layer.style.transform = `translateZ(20px) translateX(${moveX}px) translateY(${moveY}px)`;
  });

  requestAnimationFrame(animateCard);
}

animateCard();

// ==== Particle Background ====
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Initialize particles with random flicker effects
for (let i = 0; i < 150; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.6,
    dy: (Math.random() - 0.5) * 0.6,
    opacity: Math.random() * 0.5 + 0.5 // Random opacity between 0.5 and 1
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 215, 4, ${p.opacity})`; // Apply opacity
    ctx.fill();
  });

  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    // Flicker effect: Randomly change opacity for the flickering effect
    p.opacity = Math.random() * 0.5 + 0.5; // Random opacity
  });

  requestAnimationFrame(drawParticles);
}
drawParticles();

// ==== Music Toggle ====
const music = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");

musicToggle.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicToggle.textContent = "🎵";
  } else {
    music.pause();
    musicToggle.textContent = "🔇";
  }
});
