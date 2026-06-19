(function initializeTerminal() {
  var bootLines = [
    "[  OK  ] Started System Logging Service.",
    "[  OK  ] Reached target Local File Systems.",
    "[  OK  ] Started Network Name Resolution.",
    "[  OK  ] Started Authorization Manager.",
    "[  OK  ] Loaded Kernel Module: riscv_accel.",
    "[  OK  ] Mounted /home/madhav/workspace.",
    "[  OK  ] Started User Session for madhav.",
    "[  OK  ] Launching interactive portfolio shell..."
  ];

  var bootScreen = document.getElementById("boot-screen");
  var bootOutput = document.getElementById("boot-output");
  var bootAuth = document.getElementById("boot-auth");
  var bootAuthText = document.getElementById("boot-auth-text");
  var bootForm = document.getElementById("boot-form");
  var bootInput = document.getElementById("boot-input");
  var bootDisplayBefore = document.getElementById("boot-display-before");
  var bootDisplayCurrent = document.getElementById("boot-display-current");
  var bootDisplayAfter = document.getElementById("boot-display-after");

  var terminalScreen = document.getElementById("terminal-screen");
  var terminalOutput = document.getElementById("terminal-output");
  var promptForm = document.getElementById("prompt-form");
  var commandInput = document.getElementById("command-input");
  var commandDisplayBefore = document.getElementById("command-display-before");
  var commandDisplayCurrent = document.getElementById("command-display-current");
  var commandDisplayAfter = document.getElementById("command-display-after");
  var welcomeLine = document.getElementById("welcome-line");
  var promptLabel = document.querySelector("#prompt-form .prompt-label");
  var commandPills = document.querySelectorAll(".cmd-pill");

  var visitorName = "Visitor";

  var linkCommands = {
    "github.sh": "https://github.com/MadhavSharma-811",
    "./github.sh": "https://github.com/MadhavSharma-811",
    "linkedin.sh": "https://www.linkedin.com/in/madhav-sharma-785790371/",
    "./linkedin.sh": "https://www.linkedin.com/in/madhav-sharma-785790371/",
    "mail.sh": "mailto:madhav.sharma@iitg.ac.in",
    "./mail.sh": "mailto:madhav.sharma@iitg.ac.in",
    "virtual_physics.sh": "https://github.com/MadhavSharma-811/Virtual-Physics-Sandbox",
    "./virtual_physics.sh": "https://github.com/MadhavSharma-811/Virtual-Physics-Sandbox",
    "vortex_engine.sh": "https://github.com/MadhavSharma-811/Vortex",
    "./vortex_engine.sh": "https://github.com/MadhavSharma-811/Vortex",
    "lsm_engine.sh": "https://github.com/MadhavSharma-811/lsm-engine",
    "./lsm_engine.sh": "https://github.com/MadhavSharma-811/lsm-engine",
    "threadsafe_queue_lib.sh": "https://github.com/AyushGarg8646/ThreadSafeQueue",
    "./threadsafe_queue_lib.sh": "https://github.com/AyushGarg8646/ThreadSafeQueue",
    "velora.sh": "https://github.com/MadhavSharma-811/Velora-route-optimisation",
    "./velora.sh": "https://github.com/MadhavSharma-811/Velora-route-optimisation",
    "image_convolution_riscv.sh": "https://github.com/Keshav-goyal006/CS224-Project",
    "./image_convolution_riscv.sh": "https://github.com/Keshav-goyal006/CS224-Project",
    "codeforces.sh": "https://codeforces.com/profile/Madhav_18",
    "./codeforces.sh": "https://codeforces.com/profile/Madhav_18",
    "codechef.sh": "https://www.codechef.com/users/madhav_1801",
    "./codechef.sh": "https://www.codechef.com/users/madhav_1801"
  };

  var templateCommands = {
    help: "tmpl-help",
    whoami: "tmpl-whoami",
    "./skills.sh": "tmpl-skills"
  };

  var currentPath = [];

  var projectCatalog = {
    "virtual-physics-sandbox": {
      title: "Virtual Physics Sandbox (VIRTUAL-LAB)",
      context: "Coding Club, IIT Guwahati | July 2026",
      repoCommand: "virtual_physics.sh",
      bullets: [
        "Engineered a collaborative React 19 and TypeScript digital twin platform, integrating Matter.js to simulate high-fidelity 2D rigid body physics, dynamic spring constraints, and mechanical systems.",
        "Architected a Node.js and Socket.io backend, deploying high-frequency agent middleware to efficiently broadcast spatial deltas and synchronize collaborative states with strict sub-50ms network latency.",
        "Developed a real-time Recharts dashboard and a robust MongoDB persistence layer to deploy custom interactive physics templates, tracking granular simulation metrics and user-defined environment variables."
      ]
    },
    "vortex-engine": {
      title: "Vortex Engine: Distributed Telemetry Processing",
      context: "Self Project | June 2026",
      repoCommand: "vortex_engine.sh",
      bullets: [
        "Engineered a distributed C++20 telemetry ingestion engine utilizing Apache Kafka to achieve a peak aggregate throughput of 640,000+ msgs/sec across a horizontally scaled, Dockerized multi-node consumer fleet.",
        "Architected a rigorous zero-allocation data path leveraging cache-aligned, wait-free SPSC ring buffers to entirely eliminate OS kernel bottlenecks, delivering a verified 0 µs P99 latency with a <50 MB footprint.",
        "Integrated a dynamic shared-object plugin architecture employing AVX2 SIMD vector instructions to seamlessly hot-swap custom processing algorithms and massively accelerate real-time Z-score anomaly detection."
      ]
    },
    "lsm-engine": {
      title: "LSM-Engine: High-Performance Key-Value Store",
      context: "Self Project | May 2026",
      repoCommand: "lsm_engine.sh",
      bullets: [
        "Engineered a high-performance C++20 LSM-Tree storage engine achieving a verified 3.89M ops/sec read throughput by implementing zero-allocation skip lists to entirely bypass OS-level heap allocation bottlenecks.",
        "Architected a robust Multi-Version Concurrency Control (MVCC) system using append-only data structures and custom binary sequence comparators to guarantee snapshot isolation and highly concurrent lock-free reads.",
        "Optimized read-paths using Murmur3-hashed Bloom Filters to completely short-circuit disk I/O for missing keys, while deploying a background K-Way Min-Heap Compactor to aggressively merge overlapping SSTables."
      ]
    },
    "threadsafe-queue-lib": {
      title: "ThreadsafeQueueLib: High-performance Lock-Free and Wait-Free Queue Library",
      context: "Coding Club, IIT Guwahati | Feb 2026 - April 2026",
      repoCommand: "threadsafe_queue_lib.sh",
      bullets: [
        "Designing and implementing a C++ concurrency library providing wait-free SPSC and lock-free MPSC/MPMC queues using atomic memory ordering with std::atomic, specifically optimized for low-latency bursty traffic patterns.",
        "Implementing high-performance bounded ring-buffers and unbounded linked-node queues utilizing cache-line alignment to mitigate false sharing and maximize L1/L2 cache efficiency in high-contention scenarios.",
        "Architecting a robust multi-threaded benchmarking framework to perform rigorous stress-testing and measure core metrics including throughput, per-operation latency, and thread contention under varying workloads."
      ]
    },
    velora: {
      title: "Route Optimisation Engine (VELORA)",
      context: "Kriti '26, IIT Guwahati | February 2026",
      repoCommand: "velora.sh",
      bullets: [
        "Engineered an MD-VRPTW routing engine employing a Multi-Start Greedy VNS and stochastic micro-batching algorithm, successfully reducing aggregate operational costs by 79.17% and overall travel time by 73.1%.",
        "Formulated a rigorous Mixed-Integer Programming model enforcing strict lexicographic state acceptance to mathematically resolve complex NP-Hard constraints encompassing time windows and heterogeneous fleets.",
        "Designed a resilient, adaptive power-law scaling framework that strictly bounds the worst-case search space algorithm complexity to O(V * E log E), ensuring highly deterministic execution times during dense traffic spikes."
      ]
    },
    "image-convolution-accelerator-riscv": {
      title: "Image Convolution Accelerator using RISC-V",
      context: "Course Project CS224 (Prof. Lokesh Sidhu), IIT Guwahati | April 2026",
      repoCommand: "image_convolution_riscv.sh",
      bullets: [
        "Built a RISC-V SoC (RV32IM) in Verilog with a 3-stage pipelined CPU, register forwarding, dual reset (full + warm), and an SoC bus routing traffic to DMEM, accelerators, UART, and VRAM; deployed on Nexys A7 FPGA.",
        "Designed a streaming 5x5 convolution accelerator with 4 line buffers, 25-multiplier single-cycle MAC, 8 switch-selectable kernels, and hardware pixel clamping; achieved single-pixel-per-clock throughput via MMIO.",
        "Integrated UART TX/RX (115200 baud) for PC-to-FPGA image transfer and a 640x480 VGA display with dual-port VRAM, enabling real-time image ingestion, convolution, and live output on a monitor."
      ]
    }
  };

  var achievementFiles = {
    "jee.txt": [
      "JEE Advanced: AIR 584 (Top 0.4% of 1.5 lakh students).",
      "JEE Mains: AIR 881 (Top 0.06% of 15 lakh candidates)."
    ],
    "competitive-programming.txt": [
      "Codeforces (Expert): Max Rating 1731 | Handle: Madhav_18",
      "Codeforces Round 1101 (Div. 2): Ranked 464 globally out of 30,000+ participants.",
      "Codeforces Round 1093 (Div. 2): Ranked 968 globally out of 23,000+ participants.",
      "CodeChef (3 star): Max Rating 1752 | Handle: madhav_1801"
    ],
    "olympiad.txt": [
      "NSEP: Selected among top 305 students nationwide in the National Standard Examination in Physics.",
      "NSEC: Secured a position among the top 1% of all participating students in the Punjab state for NSEC."
    ]
  };

  function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  function syncCaretDisplay(inputElement, beforeElement, currentElement, afterElement) {
    var value = inputElement.value;
    var caretIndex = typeof inputElement.selectionStart === "number" ? inputElement.selectionStart : value.length;

    beforeElement.textContent = value.slice(0, caretIndex);

    if (caretIndex < value.length) {
      currentElement.textContent = value.charAt(caretIndex);
      afterElement.textContent = value.slice(caretIndex + 1);
    } else {
      currentElement.textContent = "\u00A0";
      afterElement.textContent = "";
    }
  }

  function syncBootDisplay() {
    syncCaretDisplay(bootInput, bootDisplayBefore, bootDisplayCurrent, bootDisplayAfter);
  }

  function syncPromptDisplay() {
    syncCaretDisplay(commandInput, commandDisplayBefore, commandDisplayCurrent, commandDisplayAfter);
  }

  function appendCommand(commandText, labelText) {
    var row = document.createElement("div");
    row.className = "command-entry";

    var label = document.createElement("span");
    label.className = "command-label";
    label.textContent = labelText || "madhav@iitg:~$";

    var cmd = document.createElement("span");
    cmd.textContent = commandText;

    row.appendChild(label);
    row.appendChild(cmd);
    terminalOutput.appendChild(row);
  }

  function appendTemplate(templateId) {
    var template = document.getElementById(templateId);
    if (!template) {
      return;
    }
    terminalOutput.appendChild(template.content.cloneNode(true));
  }

  function appendSystemLine(text) {
    var line = document.createElement("p");
    line.className = "system-line";
    line.textContent = text;
    terminalOutput.appendChild(line);
  }

  function createRunCommandLink(commandText) {
    var cmdLink = document.createElement("a");
    cmdLink.className = "run-link run-command";
    cmdLink.href = "#";
    cmdLink.setAttribute("data-command", commandText);
    cmdLink.textContent = "[RUN: " + commandText + "]";
    return cmdLink;
  }

  function appendActionHints() {
    var currentKey = getDirectoryKey(currentPath);
    var hints = [];

    if (currentKey === "root") {
      hints = ["ls", "cd projects", "cd links", "cd achievements"];
    } else if (currentKey === "projects") {
      hints = [
        "ls",
        "cd/projects/vortex-engine",
        "cd/projects/lsm-engine",
        "cd .."
      ];
    } else if (currentKey === "project-item") {
      hints = ["cat about.txt", "cat repo.sh", "cd .."];
    } else if (currentKey === "links") {
      hints = ["ls", "github.sh", "linkedin.sh", "cd .."];
    } else if (currentKey === "achievements") {
      hints = ["ls", "cat summary.log", "codeforces.sh", "cd .."];
    } else {
      hints = ["help", "cd ~"];
    }

    var line = document.createElement("p");
    line.className = "system-line";
    line.textContent = "Next: ";

    hints.forEach(function (hint, index) {
      if (index > 0) {
        line.appendChild(document.createTextNode("  "));
      }
      line.appendChild(createRunCommandLink(hint));
    });

    terminalOutput.appendChild(line);
  }

  function appendList(items) {
    var block = document.createElement("section");
    block.className = "print-block";

    var list = document.createElement("ul");
    items.forEach(function (item) {
      var li = document.createElement("li");

      if (typeof item === "string") {
        li.textContent = item;
        list.appendChild(li);
        return;
      }

      li.textContent = item.label || "";

      if (item.command) {
        li.appendChild(document.createTextNode(" "));
        var cmdLink = createRunCommandLink(item.command);
        li.appendChild(cmdLink);
      }

      list.appendChild(li);
    });

    block.appendChild(list);
    terminalOutput.appendChild(block);
  }

  function appendProjectDetails(projectKey) {
    var project = projectCatalog[projectKey];
    if (!project) {
      appendSystemLine("No project details found.");
      return;
    }

    var block = document.createElement("section");
    block.className = "print-block";

    var title = document.createElement("p");
    title.textContent = project.title;
    block.appendChild(title);

    var context = document.createElement("p");
    context.textContent = project.context;
    block.appendChild(context);

    var linkLine = document.createElement("p");
    linkLine.textContent = "Repo: ";
    var runLink = document.createElement("a");
    runLink.className = "run-link";
    runLink.href = linkCommands[project.repoCommand];
    runLink.target = "_blank";
    runLink.rel = "noreferrer";
    runLink.textContent = "[RUN: " + project.repoCommand + "]";
    linkLine.appendChild(runLink);
    block.appendChild(linkLine);

    var list = document.createElement("ul");
    project.bullets.forEach(function (line) {
      var li = document.createElement("li");
      li.textContent = line;
      list.appendChild(li);
    });

    block.appendChild(list);
    terminalOutput.appendChild(block);
  }

  function getPathText() {
    return currentPath.length ? "~/" + currentPath.join("/") : "~";
  }

  function getPromptLabel() {
    return "madhav@iitg:" + getPathText() + "$";
  }

  function updatePromptLabel() {
    if (promptLabel) {
      promptLabel.textContent = getPromptLabel();
    }
  }

  function getDirectoryKey(segments) {
    var joined = segments.join("/");
    if (!joined) {
      return "root";
    }
    if (joined === "projects" || joined === "links" || joined === "achievements") {
      return joined;
    }
    if (joined.indexOf("projects/") === 0 && projectCatalog[segments[1]]) {
      return "project-item";
    }
    return "invalid";
  }

  function resolvePath(input) {
    if (!input || input === ".") {
      return currentPath.slice();
    }

    var base = currentPath.slice();
    var raw = input;

    if (raw === "~") {
      return [];
    }

    if (raw.indexOf("~/") === 0) {
      base = [];
      raw = raw.slice(2);
    }

    if (raw.charAt(0) === "/") {
      base = [];
      raw = raw.slice(1);
    }

    raw.split("/").forEach(function (part) {
      if (!part || part === ".") {
        return;
      }

      if (part === "..") {
        if (base.length) {
          base.pop();
        }
        return;
      }

      base.push(part.toLowerCase());
    });

    return base;
  }

  function listDirectory(segments) {
    var key = getDirectoryKey(segments);
    if (key === "root") {
      appendList([
        { label: "education.txt", command: "cat education.txt" },
        { label: "courses.md", command: "cat courses.md" },
        { label: "extracurriculars.txt", command: "cat extracurriculars.txt" },
        { label: "skills.cfg", command: "cat skills.cfg" },
        { label: "projects/", command: "cd projects" },
        { label: "links/", command: "cd links" },
        { label: "achievements/", command: "cd achievements" }
      ]);
      return true;
    }

    if (key === "projects") {
      appendList([
        { label: "virtual-physics-sandbox/", command: "cd/projects/virtual-physics-sandbox" },
        { label: "vortex-engine/", command: "cd/projects/vortex-engine" },
        { label: "lsm-engine/", command: "cd/projects/lsm-engine" },
        { label: "threadsafe-queue-lib/", command: "cd/projects/threadsafe-queue-lib" },
        { label: "velora/", command: "cd/projects/velora" },
        { label: "image-convolution-accelerator-riscv/", command: "cd/projects/image-convolution-accelerator-riscv" }
      ]);
      return true;
    }

    if (key === "project-item") {
      appendList([
        { label: "about.txt", command: "cat about.txt" },
        { label: "repo.sh", command: "cat repo.sh" }
      ]);
      return true;
    }

    if (key === "links") {
      appendList([
        { label: "github.sh", command: "github.sh" },
        { label: "linkedin.sh", command: "linkedin.sh" },
        { label: "mail.sh", command: "mail.sh" }
      ]);
      return true;
    }

    if (key === "achievements") {
      appendList([
        { label: "summary.log", command: "cat summary.log" },
        { label: "jee.txt", command: "cat jee.txt" },
        { label: "competitive-programming.txt", command: "cat competitive-programming.txt" },
        { label: "olympiad.txt", command: "cat olympiad.txt" },
        { label: "codeforces.sh", command: "codeforces.sh" },
        { label: "codechef.sh", command: "codechef.sh" }
      ]);
      return true;
    }

    return false;
  }

  function handleCat(fileName) {
    var file = (fileName || "").trim().toLowerCase();
    var joined = currentPath.join("/");

    if (!file) {
      appendSystemLine("Usage: cat <filename>");
      return;
    }

    if (!joined) {
      if (file === "education.txt") {
        appendTemplate("tmpl-education");
        return;
      }

      if (file === "courses.md") {
        appendTemplate("tmpl-courses");
        return;
      }

      if (file === "extracurriculars.txt") {
        appendTemplate("tmpl-extracurriculars");
        return;
      }

      if (file === "skills.cfg") {
        appendTemplate("tmpl-skills");
        return;
      }

      if (file === "achievements.log") {
        appendTemplate("tmpl-achievements");
        return;
      }
    }

    if (joined.indexOf("projects/") === 0 && file === "about.txt") {
      appendProjectDetails(currentPath[1]);
      return;
    }

    if (joined.indexOf("projects/") === 0 && file === "repo.sh") {
      runLinkCommand(projectCatalog[currentPath[1]].repoCommand);
      return;
    }

    if (joined === "achievements") {
      if (file === "summary.log") {
        appendTemplate("tmpl-achievements");
        return;
      }

      if (Object.prototype.hasOwnProperty.call(achievementFiles, file)) {
        appendList(achievementFiles[file]);
        return;
      }
    }

    appendSystemLine("cat: " + fileName + ": No such file");
  }

  function runLinkCommand(commandKey) {
    var link = linkCommands[commandKey];
    if (!link) {
      return false;
    }

    window.open(link, "_blank", "noopener,noreferrer");
    appendSystemLine("Launching: " + link);
    return true;
  }

  function executeCommand(rawCommand) {
    var command = rawCommand.trim();
    if (!command) {
      return;
    }

    appendCommand(command, getPromptLabel());

    if (command === "clear") {
      terminalOutput.innerHTML = "";
      scrollToBottom();
      return;
    }

    var key = command.toLowerCase();

    if (key === "pwd") {
      appendSystemLine(getPathText());
      appendActionHints();
      scrollToBottom();
      return;
    }

    if (key.indexOf("cd") === 0) {
      var cdTarget = command.slice(2).trim() || "~";
      var nextPath = resolvePath(cdTarget);
      if (getDirectoryKey(nextPath) === "invalid") {
        appendSystemLine("bash: cd: " + cdTarget + ": No such file or directory");
      } else {
        currentPath = nextPath;
        updatePromptLabel();
      }
      appendActionHints();
      scrollToBottom();
      return;
    }

    if (key.indexOf("ls") === 0) {
      var lsTarget = command.slice(2).trim();
      if (lsTarget === "-l" || lsTarget === "-la" || lsTarget === "-al") {
        lsTarget = ".";
      } else if (lsTarget.indexOf("-l ") === 0 || lsTarget.indexOf("-la ") === 0 || lsTarget.indexOf("-al ") === 0) {
        lsTarget = lsTarget.split(/\s+/).slice(1).join(" ") || ".";
      }
      var lsPath = resolvePath(lsTarget || ".");
      if (!listDirectory(lsPath)) {
        appendSystemLine("ls: cannot access '" + (lsTarget || ".") + "': No such file or directory");
      }
      appendActionHints();
      scrollToBottom();
      return;
    }

    if (key.indexOf("cat ") === 0) {
      handleCat(command.slice(4));
      appendActionHints();
      scrollToBottom();
      return;
    }

    if (runLinkCommand(key)) {
      appendActionHints();
      scrollToBottom();
      return;
    }

    if (key === "links") {
      currentPath = ["links"];
      updatePromptLabel();
      listDirectory(currentPath);
    } else if (key === "achievements") {
      currentPath = ["achievements"];
      updatePromptLabel();
      listDirectory(currentPath);
    } else if (key === "projects") {
      currentPath = ["projects"];
      updatePromptLabel();
      listDirectory(currentPath);
    } else if (key === "ls ./projects" || key === "ls -l ./projects/") {
      listDirectory(["projects"]);
    } else if (Object.prototype.hasOwnProperty.call(templateCommands, key)) {
      appendTemplate(templateCommands[key]);
    } else {
      appendSystemLine("bash: " + command + ": command not found");
      appendSystemLine("Type 'help' to see available commands.");
    }

    appendActionHints();
    scrollToBottom();
  }

  function showBootAuthentication() {
    bootAuthText.textContent = "System initialized. Identify yourself (Enter your name):";
    bootAuth.classList.remove("hidden");
    bootInput.focus();
    scrollToBottom();
  }

  function transitionToMainTerminal() {
    bootScreen.classList.add("hidden");
    terminalScreen.classList.remove("hidden");
    welcomeLine.textContent = "Welcome, " + visitorName + ". Type 'help' to see available commands.";
    updatePromptLabel();
    commandInput.focus();
    syncPromptDisplay();
    scrollToBottom();
  }

  function processVisitorName(rawName) {
    var providedName = rawName.trim();
    if (!providedName) {
      bootAuthText.textContent = "Name required. Please enter your name to continue.";
      scrollToBottom();
      return;
    }

    visitorName = providedName;
    transitionToMainTerminal();
  }

  function startBoot() {
    var index = 0;
    var timer = setInterval(function () {
      if (index < bootLines.length) {
        bootOutput.textContent += bootLines[index] + "\n";
        index += 1;
        scrollToBottom();
        return;
      }

      clearInterval(timer);
      showBootAuthentication();
    }, 90);
  }

  promptForm.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  bootForm.addEventListener("submit", function (event) {
    event.preventDefault();
    processVisitorName(bootInput.value);
    bootInput.value = "";
    syncBootDisplay();
  });

  bootInput.addEventListener("input", syncBootDisplay);

  bootInput.addEventListener("keyup", syncBootDisplay);

  bootInput.addEventListener("select", syncBootDisplay);

  document.addEventListener("selectionchange", function () {
    if (document.activeElement === bootInput) {
      syncBootDisplay();
    }

    if (document.activeElement === commandInput) {
      syncPromptDisplay();
    }
  });

  bootInput.addEventListener("click", syncBootDisplay);

  bootInput.addEventListener("mouseup", function () {
    window.requestAnimationFrame(syncBootDisplay);
  });

  bootInput.addEventListener("keydown", function (event) {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    bootForm.requestSubmit();
  });

  commandInput.addEventListener("keydown", function (event) {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    executeCommand(commandInput.value);

    commandInput.value = "";
    syncPromptDisplay();
    commandInput.focus();
  });

  commandInput.addEventListener("input", syncPromptDisplay);

  commandInput.addEventListener("keyup", syncPromptDisplay);

  commandInput.addEventListener("select", syncPromptDisplay);

  commandInput.addEventListener("click", syncPromptDisplay);

  commandInput.addEventListener("mouseup", function () {
    window.requestAnimationFrame(syncPromptDisplay);
  });

  terminalScreen.addEventListener("click", function () {
    commandInput.focus();
  });

  terminalOutput.addEventListener("click", function (event) {
    var target = event.target;
    if (!target || !target.classList || !target.classList.contains("run-command")) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    var cmd = target.getAttribute("data-command") || "";
    if (!cmd) {
      return;
    }

    commandInput.value = cmd;
    syncPromptDisplay();
    executeCommand(cmd);
    commandInput.value = "";
    syncPromptDisplay();
    commandInput.focus();
  });

  commandPills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      var cmd = pill.getAttribute("data-command") || "";
      commandInput.value = cmd;
      syncPromptDisplay();
      executeCommand(cmd);
      commandInput.value = "";
      syncPromptDisplay();
      commandInput.focus();
    });
  });

  syncBootDisplay();
  syncPromptDisplay();
  startBoot();
})();