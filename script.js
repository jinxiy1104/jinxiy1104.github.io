const canvas = document.querySelector("#signal-canvas");
const ctx = canvas.getContext("2d");

const state = {
  width: 0,
  height: 0,
  dpr: 1,
  nodes: [],
};

function resize() {
  state.dpr = Math.min(window.devicePixelRatio || 1, 2);
  state.width = window.innerWidth;
  state.height = window.innerHeight;
  canvas.width = Math.floor(state.width * state.dpr);
  canvas.height = Math.floor(state.height * state.dpr);
  canvas.style.width = `${state.width}px`;
  canvas.style.height = `${state.height}px`;
  ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

  const count = Math.max(34, Math.floor((state.width * state.height) / 28000));
  state.nodes = Array.from({ length: count }, () => ({
    x: Math.random() * state.width,
    y: Math.random() * state.height,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28,
    r: Math.random() * 1.6 + 0.6,
  }));
}

function draw() {
  ctx.clearRect(0, 0, state.width, state.height);

  for (const node of state.nodes) {
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < -20) node.x = state.width + 20;
    if (node.x > state.width + 20) node.x = -20;
    if (node.y < -20) node.y = state.height + 20;
    if (node.y > state.height + 20) node.y = -20;
  }

  for (let i = 0; i < state.nodes.length; i += 1) {
    const a = state.nodes[i];
    for (let j = i + 1; j < state.nodes.length; j += 1) {
      const b = state.nodes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 145) {
        const alpha = (1 - distance / 145) * 0.28;
        ctx.strokeStyle = `rgba(103, 232, 249, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  for (const node of state.nodes) {
    const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 6);
    gradient.addColorStop(0, "rgba(154, 230, 180, 0.8)");
    gradient.addColorStop(1, "rgba(154, 230, 180, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r * 6, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

resize();
draw();

window.addEventListener("resize", resize);
