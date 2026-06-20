/* ========================================================
   GLOBAL NAVIGATION (Kept at top to ensure availability)
======================================================== */
function showGame(game) {
    const f1 = document.getElementById("f1Game");
    const click = document.getElementById("clickGame");

    if (!f1 || !click) return; // Guard clause to prevent errors

    if (game === "f1") {
        f1.classList.remove("hidden");
        click.classList.add("hidden");
    } else if (game === "click") {
        click.classList.remove("hidden");
        f1.classList.add("hidden");
    }
}

/* ========================================================
   30 SECOND CHALLENGE
======================================================== */
const target = document.getElementById("target");
const playArea = document.getElementById("playArea");
const clickResult = document.getElementById("clickResult");
const startClick = document.getElementById("startClick");

let score = 0;
let misses = 0;
let gameRunning = false;
let timeLeft = 30;
let timer;

function spawnTarget() {
    if (!playArea || !target) return;
    
    const x = Math.random() * (playArea.clientWidth - 60);
    const y = Math.random() * (playArea.clientHeight - 60);

    target.style.left = x + "px";
    target.style.top = y + "px";
    target.style.display = "block";
}

function updateStats() {
    if (!clickResult) return;
    
    const totalClicks = score + misses;
    let accuracy = 100;

    if (totalClicks > 0) {
        accuracy = (score / totalClicks) * 100;
    }

    clickResult.textContent =
        `Time: ${timeLeft}s | Hits: ${score} | Accuracy: ${accuracy.toFixed(1)}%`;
}

// Event Listeners wrapped with safety checks
if (startClick) {
    startClick.addEventListener("click", () => {
        if (gameRunning) return;

        score = 0;
        misses = 0;
        timeLeft = 30;
        gameRunning = true;

        updateStats();
        spawnTarget();

        timer = setInterval(() => {
            timeLeft--;
            updateStats();

            if (timeLeft <= 0) {
                clearInterval(timer);
                gameRunning = false;

                if (target) target.style.display = "none";

                const totalClicks = score + misses;
                let accuracy = 100;

                if (totalClicks > 0) {
                    accuracy = (score / totalClicks) * 100;
                }

                if (clickResult) {
                    clickResult.textContent =
                        `Finished! Hits: ${score} | Accuracy: ${accuracy.toFixed(1)}%`;
                }
            }
        }, 1000);
    });
}

if (target) {
    target.addEventListener("click", function (e) {
        if (!gameRunning) return;

        e.stopPropagation();
        score++;
        updateStats();
        spawnTarget();
    });
}

if (playArea) {
    playArea.addEventListener("click", function (e) {
        if (!gameRunning) return;

        if (e.target !== target) {
            misses++;
            updateStats();
        }
    });
}