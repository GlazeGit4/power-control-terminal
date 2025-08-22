// ┌────────────────────────────────────────┐
// │ Browser Terminal UI Core (terminal.js) │
// └────────────────────────────────────────┘

window.addEventListener("load", () => {
  const input = document.getElementById("input");
  const output = document.getElementById("output");

  if (!input || !output) {
    console.error("❌ Terminal elements not found.");
    return;
  }

  // Welcome message
  printToTerminal("💻 Browser Terminal v1.0.0v Initialized.");
  printToTerminal("Type *help* or *denoplease commands* to get started.");
  printToTerminal("----------------------------------------------");

  input.focus();

  // Blinking cursor effect (optional)
  setInterval(() => {
    input.classList.toggle("blink");
  }, 500);

  // Resize output box on window resize
  window.addEventListener("resize", () => {
    output.style.height = (window.innerHeight - 160) + "px";
  });

  // Custom header render (optional)
  printToTerminal("Welcome, Operator.");
  const savedUser = localStorage.getItem("roboxUser");
  if (savedUser) {
    printToTerminal(`📎 Loaded profile: ${savedUser}`);
  }

  // Easter egg loader (placeholder)
  if (window.injectLore) {
    window.injectLore(); // Define this in your lore.js
  }

  // Focus trap
  document.addEventListener("click", () => input.focus());

  // Scroll output to bottom on new entry
  const observer = new MutationObserver(() => {
    output.scrollTop = output.scrollHeight;
  });

  observer.observe(output, {
    childList: true,
    subtree: true,
  });

  // Clipboard input hook (optional)
  input.addEventListener("paste", (e) => {
    const text = e.clipboardData.getData("text");
    printToTerminal(`📋 Pasted content: ${text}`);
  });

  // Set default user if missing
  if (!localStorage.getItem("roboxUser")) {
    localStorage.setItem("roboxUser", "Guest");
  }

  // Inject dev notes (optional)
  if (window.devNotes) {
    window.devNotes.forEach(note => printToTerminal(note));
  }
});

// Global print function
window.printToTerminal = function (text) {
  const output = document.getElementById("output");
  const line = document.createElement("div");
  line.className = "terminal-line";
  line.textContent = text;
  output.appendChild(line);
};