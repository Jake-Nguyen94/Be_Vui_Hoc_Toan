/**
 * Lightweight Canvas Confetti Generator for Kids Celebration
 */
class ConfettiEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationId = null;
    this.initCanvas();
  }

  initCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'confetti-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  fire(durationMs = 2500) {
    this.resize();
    const colors = ['#F43F5E', '#EC4899', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#FDE047'];
    const particleCount = 120;
    this.particles = [];

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: window.innerWidth * 0.5 + (Math.random() - 0.5) * 200,
        y: window.innerHeight * 0.4 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 14 - 4,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 15,
        opacity: 1,
        isStar: Math.random() > 0.6
      });
    }

    const startTime = performance.now();
    if (this.animationId) cancelAnimationFrame(this.animationId);

    const animate = (now) => {
      const elapsed = now - startTime;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // trọng lực
        p.vx *= 0.98; // ma sát không khí
        p.rotation += p.rSpeed;
        if (elapsed > durationMs * 0.6) {
          p.opacity -= 0.02;
        }

        if (p.opacity > 0) {
          this.ctx.save();
          this.ctx.translate(p.x, p.y);
          this.ctx.rotate((p.rotation * Math.PI) / 180);
          this.ctx.globalAlpha = Math.max(0, p.opacity);
          this.ctx.fillStyle = p.color;

          if (p.isStar) {
            // Vẽ ngôi sao nhỏ
            this.ctx.beginPath();
            for (let s = 0; s < 5; s++) {
              this.ctx.lineTo(Math.cos((18 + s * 72) * Math.PI / 180) * p.size, -Math.sin((18 + s * 72) * Math.PI / 180) * p.size);
              this.ctx.lineTo(Math.cos((54 + s * 72) * Math.PI / 180) * (p.size / 2), -Math.sin((54 + s * 72) * Math.PI / 180) * (p.size / 2));
            }
            this.ctx.closePath();
            this.ctx.fill();
          } else {
            // Ruy băng chữ nhật
            this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
          }
          this.ctx.restore();
        }
      });

      if (elapsed < durationMs && this.particles.some(p => p.opacity > 0)) {
        this.animationId = requestAnimationFrame(animate);
      } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    };

    this.animationId = requestAnimationFrame(animate);
  }
}

function initConfetti() {
  if (!window.confetti && document.body) {
    window.confetti = new ConfettiEngine();
  }
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initConfetti);
} else {
  initConfetti();
}
