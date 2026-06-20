function showGame(game) {
    document.getElementById("f1Game").classList.add("hidden");
    document.getElementById("clickGame").classList.add("hidden");

    if (game === "f1") {
        document.getElementById("f1Game").classList.remove("hidden");
    } else {
        document.getElementById("clickGame").classList.remove("hidden");
    }
}

/* ===========================
   F1 REACTION TEST
=========================== */

const lights = document.querySelectorAll(".light");
const startF1 = document.getElementById("startF1");
const f1Result = document.getElementById("f1Result");

let startTime;
let canStop = false;
let running = false;

startF1.addEventListener("click", () => {

    if (!running) {

        running = true;
        canStop = false;

        startF1.textContent = "STOP";

        lights.forEach(light => {
            light.classList.remove("active");
            light.classList.remove("green");
        });

        f1Result.textContent = "Wait for lights out...";

        let i = 0;

        const interval = setInterval(() => {

            lights[i].classList.add("active");
            i++;

            if (i === 5) {

                clearInterval(interval);

                const delay = Math.random() * 3000 + 1000;

                setTimeout(() => {

                    lights.forEach(light => {
                        light.classList.remove("active");
                        light.classList.add("green");
                    });

                    startTime = Date.now();
                    canStop = true;

                }, delay);

            }

        }, 1000);

    } else {

        if (canStop) {

            const reaction = Date.now() - startTime;

            f1Result.textContent =
                `Reaction Time: ${reaction} ms`;

        } else {

            f1Result.textContent = "Jump Start!";

        }

        running = false;
        canStop = false;

        startF1.textContent = "START";

        lights.forEach(light => {
            light.classList.remove("active");
            light.classList.remove("green");
        });
    }
});

/* ===========================
   30 SECOND CHALLENGE
=========================== */

const target = document.getElementById("target");
const playArea = document.getElementById("playArea");
const clickResult = document.getElementById("clickResult");
const startClick = document.getElementById("startClick");

let score = 0;
let totalClicks = 0;
let gameRunning = false;
let timeLeft = 30;
let timer;

function spawnTarget() {

    const x =
        Math.random() * (playArea.clientWidth - 60);

    const y =
        Math.random() * (playArea.clientHeight - 60);

    target.style.left = x + "px";
    target.style.top = y + "px";

    target.style.display = "block";
}

function updateStats() {

    let accuracy = 100;

    if (totalClicks > 0) {
        accuracy = (score / totalClicks) * 100;
    }

    clickResult.textContent =
        `Time: ${timeLeft}s | Hits: ${score} | Accuracy: ${accuracy.toFixed(1)}%`;
}

startClick.addEventListener("click", () => {

    if (gameRunning) return;

    score = 0;
    totalClicks = 0;
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

            target.style.display = "none";

            const accuracy =
                totalClicks > 0
                    ? ((score / totalClicks) * 100).toFixed(1)
                    : 100;

            clickResult.textContent =
                `Finished! Hits: ${score} | Accuracy: ${accuracy}%`;
        }

    }, 1000);
});

target.addEventListener("click", (e) => {

    if (!gameRunning) return;

    e.stopPropagation();

    score++;
    totalClicks++;

    updateStats();

    spawnTarget();
});

playArea.addEventListener("click", () => {

    if (!gameRunning) return;

    totalClicks++;

    updateStats();
});