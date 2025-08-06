// Áudio: toca ao primeiro clique na página
const audio = document.getElementById('audio');
document.body.addEventListener('click', () => {
  audio.play();
}, { once: true });

const canvas = document.getElementById('animated-bg');
const ctx = canvas.getContext('2d');

// Ajusta o canvas para a tela inteira e responde a resize
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const maxParticles = 100;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 1; // tamanho dos flocos de neve
    this.speedY = Math.random() * 1 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.5 + 0.5;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;

    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }

    if (this.x > canvas.width) this.x = 0;
    else if (this.x < 0) this.x = canvas.width;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 5;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Cria as partículas iniciais
for (let i = 0; i < maxParticles; i++) {
  particles.push(new Particle());
}

// Função de animação (loop)
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let p of particles) {
    p.update();
    p.draw();
  }

  requestAnimationFrame(animate);
}

animate();
