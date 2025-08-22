window.unsaveChat = function () {
  localStorage.removeItem("terminalHistory");
  printToTerminal("🧹 Saved chat removed.");
};