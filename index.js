// Date
document.getElementById("today").textContent =
  "◷ " + new Date().toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });

// Dark mode
const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("devopshub-theme") === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const dark = document.body.classList.contains("dark");

  localStorage.setItem("devopshub-theme", dark ? "dark" : "light");
  themeBtn.textContent = dark ? "☀" : "☾";
});

// Search
document.getElementById("search").addEventListener("input", function () {
  const query = this.value.trim().toLowerCase();

  document.querySelectorAll(".searchable").forEach(item => {
    item.style.display =
      item.textContent.toLowerCase().includes(query) ? "" : "none";
  });
});

// Toast notification (global, used by inline onclick in the HTML)
function showToast(message) {
  let toast = document.getElementById("toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";

    Object.assign(toast.style, {
      position: "fixed",
      bottom: "22px",
      right: "22px",
      padding: "15px 20px",
      background: "#3d2c5c",
      color: "white",
      borderRadius: "12px",
      fontSize: "12px",
      zIndex: "1000",
      boxShadow: "0 8px 25px #0002"
    });

    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.display = "block";

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

// Demo pipeline animation only
const runBtn = document.getElementById("runPipeline");
const logLines = document.getElementById("logLines");
const steps = [...document.querySelectorAll(".step-icon")];

let running = false;

runBtn.addEventListener("click", async () => {
  if (running) return;

  running = true;
  runBtn.textContent = "Running…";
  logLines.innerHTML = "";

  const stages = [
    "Code checkout — GitHub",
    "Build and test — Jenkins",
    "Build container image — Docker",
    "Deploy application — EC2",
    "Demo pipeline complete — AWS"
  ];

  steps.forEach(step => step.textContent = "·");

  for (let i = 0; i < stages.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 600));

    const line = document.createElement("div");
    const time = new Date().toLocaleTimeString();

    line.innerHTML = `<span>${time}</span> [DEMO] ${stages[i]}`;

    logLines.appendChild(line);
    steps[i].textContent = "✓";
  }

  runBtn.textContent = "↻ Run demo";
  running = false;

  showToast(
    "Demo finished! No real Jenkins job or AWS deployment was triggered."
  );
});

// Clear logs
document.getElementById("clearLogs").addEventListener("click", () => {
  logLines.innerHTML =
    "<div>Logs cleared. Click Run demo to replay.</div>";
});