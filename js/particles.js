// Canvas Particle Background for bright brand-compliant background aesthetic

export function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);

  const particles = [];
  const particleCount = Math.min(60, Math.floor((width * height) / 20000));
  let mouse = { x: null, y: null, radius: 150 };

  class Particle {
    constructor() {
      this.reset();
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2 + 1.2; // Size of dust particle
      this.speedX = (Math.random() - 0.5) * 0.15; // Slow drift
      this.speedY = (Math.random() - 0.5) * 0.15; // Slow drift
      // Glow color: Progressive Blue (#00aad2) or Hyundai Blue (#002c5f)
      const isCyan = Math.random() > 0.4;
      this.color = isCyan ? "rgba(0, 170, 210," : "rgba(0, 44, 95,";
      this.alpha = Math.random() * 0.25 + 0.08;
      this.maxAlpha = this.alpha;
      this.alphaDir = Math.random() > 0.5 ? 0.003 : -0.003;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Handle borders
      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.reset();
        if (Math.random() > 0.5) this.x = this.speedX > 0 ? 0 : width;
        else this.y = this.speedY > 0 ? 0 : height;
      }

      // Glow pulse effect
      this.alpha += this.alphaDir;
      if (this.alpha <= 0.02 || this.alpha >= this.maxAlpha) {
        this.alphaDir = -this.alphaDir;
      }

      // Mouse interactive push
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.hypot(dx, dy);
        
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * force * 1.2;
          this.y += Math.sin(angle) * force * 1.2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ")";
      ctx.fill();

      // Draw outer glowing halo for some particles
      if (this.radius > 2.5) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color + (this.alpha * 0.12) + ")";
        ctx.fill();
      }
    }
  }

  function init() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Subtle light sand gradient background overlay
    const gradient = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, Math.max(width, height));
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.45)");
    gradient.addColorStop(1, "rgba(246, 243, 242, 0.75)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    init();
  });

  window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  init();
  animate();
}
