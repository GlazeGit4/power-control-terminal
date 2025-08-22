window.saveChat = function () {
  const chat = document.getElementById("output").innerText;
  localStorage.setItem("terminalHistory", chat);
  printToTerminal("✅ Chat saved.");
};