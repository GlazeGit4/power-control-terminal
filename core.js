document.getElementById("input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const cmd = this.value.trim();
    printToTerminal("> " + cmd);
    if (typeof window.executeCommand === "function") {
      window.executeCommand(cmd);
    } else {
      printToTerminal("Command handler missing.");
    }
    this.value = "";
  }
});

// Save button handler
document.getElementById("saveBtn").addEventListener("click", function () {
  if (typeof window.saveChat === "function") {
    window.saveChat();
  }
});

// Optional: Load saved chat on startup
window.addEventListener("load", () => {
  const saved = localStorage.getItem("terminalHistory");
  if (saved) {
    document.getElementById("output").innerText = saved;
    printToTerminal("📂 Loaded saved chat history.");
  }
});

function printToTerminal(text) {
  const output = document.getElementById("output");
  output.innerText += text + "\n";
}