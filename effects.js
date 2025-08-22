// Real-time clock updater
function updateLiveTime() {
  const timeElement = document.getElementById("liveTime");
  if (timeElement) {
    const now = new Date();
    const formatted = now.toLocaleString();
    timeElement.textContent = "🕒 " + formatted;
  }
}
setInterval(updateLiveTime, 1000); // Tick every second

// Typing animation for intro
const typingTarget = document.querySelector(".typing");
const typingText = "No tiers. No paywalls. Just respect and vibes.";
let i = 0;

function typeLine() {
  if (i < typingText.length) {
    typingTarget.textContent += typingText.charAt(i);
    i++;
    setTimeout(typeLine, 40); // Feel free to tweak speed here
  }
}
if (typingTarget) {
  typingTarget.textContent = ""; // Clear before typing
  typeLine();
}

// Optional glow effect on cash tag hover
const cashTag = document.querySelector(".cash-tag");
if (cashTag) {
  cashTag.addEventListener("mouseenter", () => {
    cashTag.style.textShadow = "0 0 15px #00ffb2";
  });
  cashTag.addEventListener("mouseleave", () => {
    cashTag.style.textShadow = "none";
  });
}
