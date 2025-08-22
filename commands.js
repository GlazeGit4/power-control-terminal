// ┌────────────────────────────────────────────┐
// │ Browser Terminal Command Handler — v1.0.0v │
// └────────────────────────────────────────────┘

let awaitingCloseConfirmation = false;
let awaitingClearConfirmation = false;

window.executeCommand = function (cmd) {
  // DENO tabopen
  if (cmd.startsWith("deno tabopen ")) {
    const url = cmd.slice(13).trim();
    if (url) {
      tabStore[url] = window.open(url, "_blank");
      printToTerminal(`🌐 Opened tab: ${url}`);
    } else {
      printToTerminal("❌ No URL provided.");
    }
  }

  // DENO tabclose
  else if (cmd.startsWith("deno tabclose ")) {
    const url = cmd.slice(14).trim();
    if (tabStore[url]) {
      tabStore[url].close();
      delete tabStore[url];
      printToTerminal(`🗂️ Closed tab: ${url}`);
    } else {
      printToTerminal(`❌ No tab found for: ${url}`);
    }
  }

  // WARNDENO windowclose
  else if (cmd === "warndeno windowclose") {
    printToTerminal("⚠️ Close this browser window? (Y/N)");
    awaitingCloseConfirmation = true;
  }

  // WARNDENO clearhis
  else if (cmd === "warndeno clearhis") {
    printToTerminal("⚠️ Clear terminal history and saved chat? (Y/N)");
    awaitingClearConfirmation = true;
  }

  // Confirmation: Y
  else if (cmd === "Y") {
    if (awaitingCloseConfirmation) {
      printToTerminal("🧨 Closing window...");
      awaitingCloseConfirmation = false;
      window.close();
    } else if (awaitingClearConfirmation) {
      document.getElementById("output").innerText = "";
      if (typeof window.unsaveChat === "function") {
        window.unsaveChat();
      }
      printToTerminal("🧹 Terminal history cleared.");
      awaitingClearConfirmation = false;
    } else {
      printToTerminal("⚠️ No pending action.");
    }
  }

  // Confirmation: N
  else if (cmd === "N") {
    if (awaitingCloseConfirmation || awaitingClearConfirmation) {
      printToTerminal("❎ Action canceled.");
      awaitingCloseConfirmation = false;
      awaitingClearConfirmation = false;
    } else {
      printToTerminal("⚠️ No pending action.");
    }
  }

  // POWERDENO user?
  else if (cmd === "powerdeno user?") {
    const username = localStorage.getItem("roboxUser") || "Unknown";
    printToTerminal(`👤 Active user: ${username}`);
  }

  // POWERDENO setuser <name>
  else if (cmd.startsWith("powerdeno setuser ")) {
    const name = cmd.slice(19).trim();
    if (name) {
      localStorage.setItem("roboxUser", name);
      printToTerminal(`✅ Username set to: ${name}`);
    } else {
      printToTerminal("❌ No username provided.");
    }
  }

  // POWERDENO browser?
  else if (cmd === "powerdeno browser?") {
    const agent = navigator.userAgent.toLowerCase();
    let browser = "Unknown";
    if (agent.includes("edg")) browser = "Microsoft Edge";
    else if (agent.includes("chrome")) browser = "Google Chrome";
    else if (agent.includes("firefox")) browser = "Mozilla Firefox";
    else if (agent.includes("safari")) browser = "Apple Safari";
    else if (agent.includes("opr") || agent.includes("opera")) browser = "Opera";
    printToTerminal(`🧠 Browser detected: ${browser}`);
  }

  // DENOBING search <query>
  else if (cmd.startsWith("denobing search ")) {
    const query = cmd.slice(16).trim();
    if (query.length === 0) {
      printToTerminal("❌ No search query provided.");
    } else {
      const encoded = encodeURIComponent(query);
      const link = `https://www.bing.com/search?q=${encoded}`;
      printToTerminal(`🔎 Bing search: ${link}`);
    }
  }

  // DENOPLEASE commands
  else if (cmd === "denoplease commands") {
    printToTerminal(`
📜 Full Command List:
- deno tabopen <url>
- deno tabclose <url>
- warndeno windowclose
- warndeno clearhis
- powerdeno user?
- powerdeno setuser <name>
- powerdeno browser?
- denobing search <query>
- rgbdeno R, G, B
- rgbdeno random
- denoplease commands
- Y / N (respond to prompts)
- help
- about
    `);
  }

  // RGBDENO random
  else if (cmd === "rgbdeno random") {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const hex = "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
    const name = getRGBName(r, g, b);
    printToTerminal(`🎲 Random RGB → (${r}, ${g}, ${b}) → ${hex} → ${name}`);
  }

  // RGBDENO R, G, B
  else if (cmd.startsWith("rgbdeno ")) {
    const raw = cmd.slice(8).trim();
    const parts = raw.split(",");
    if (parts.length !== 3) {
      printToTerminal("❌ Invalid format. Use: rgbdeno R, G, B");
    } else {
      const [r, g, b] = parts.map(x => parseInt(x.trim()));
      if (
        isNaN(r) || isNaN(g) || isNaN(b) ||
        r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255
      ) {
        printToTerminal("❌ RGB values must be numbers from 0 to 255.");
      } else {
        const hex = "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
        const name = getRGBName(r, g, b);
        printToTerminal(`🎨 RGB(${r}, ${g}, ${b}) → ${hex} → ${name}`);
      }
    }
  }

  // HELP
  else if (cmd === "help") {
    printToTerminal(`
📜 Command List:
Type 'denoplease commands' for full list.
- deno tabopen <url>
- deno tabclose <url>
- warndeno windowclose
- warndeno clearhis
- powerdeno user?
- denobing search <query>
- rgbdeno R, G, B
- rgbdeno random
- help
- about
    `);
  }

  // ABOUT
  else if (cmd === "about") {
    printToTerminal("Browser Terminal 1.0.0v — Not affiliated with Microsoft Corporation");
  }

  // Unknown
  else {
    printToTerminal("❓ Unknown command.");
  }
};

// ─────────────────────────────────────────────
// Helper: RGB Color Name Resolver
function getRGBName(r, g, b) {
  if (r === 255 && g === 0 && b === 0) return "Red";
  if (r === 0 && g === 255 && b === 0) return "Green";
  if (r === 0 && g === 0 && b === 255) return "Blue";
  if (r === 255 && g === 255 && b === 255) return "White";
  if (r === 0 && g === 0 && b === 0) return "Black";
  if (r === g && g === b) return "Gray";
  if (r === 255 && g === 255 && b === 0) return "Yellow";
  if (r === 255 && g === 0 && b === 255) return "Magenta";
  if (r === 0 && g === 255 && b === 255) return "Cyan";
  return "Unknown Color";
}

// ─────────────────────────────────────────────
// Prefix every terminal message
window.printToTerminal = function (text) {
  const output = document.getElementById("output");
  const line = document.createElement("div");
  line.className = "terminal-line";
  line.textContent = `PC B:/Browser/UndifinedUser> ${text}`;
  output.appendChild(line);
}
