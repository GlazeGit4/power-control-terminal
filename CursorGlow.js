// Create green glow cursor effect
document.addEventListener("mousemove", (e) => {
  const glow = document.createElement("div");
  glow.classList.add("cursor-glow");
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
  document.body.appendChild(glow);

  // Animate and clean up after 300ms
  setTimeout(() => glow.remove(), 300);
});
