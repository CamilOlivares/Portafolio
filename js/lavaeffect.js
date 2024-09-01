const canvas = document.getElementById('lavaCanvas');
const ctx = canvas.getContext('2d');

let width, height, particles;

function initCanvas() {
    width = window.innerWidth;
    height = document.querySelector('header').offsetHeight;
    canvas.width = width;
    canvas.height = height;
}

function Particle() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 3 + 1;
    this.dx = Math.random() - 0.5;
    this.dy = Math.random() - 0.5;
}

Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 69, 0, 0.7)';
    ctx.fill();
};

Particle.prototype.update = function() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x < 0 || this.x > width) this.dx *= -1;
    if (this.y < 0 || this.y > height) this.dy *= -1;

    this.draw();
};

function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
    }
    requestAnimationFrame(animate);
}

function createParticles() {
    particles = [];
    for (let i = 0; i < 200; i++) {
        particles.push(new Particle());
    }
}

window.addEventListener('resize', initCanvas);
window.addEventListener('load', () => {
    initCanvas();
    createParticles();
    animate();
});
