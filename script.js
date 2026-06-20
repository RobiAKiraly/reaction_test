/* ===========================
   30 SECOND CHALLENGE
=========================== */

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

    const x = Math.random() * (playArea.clientWidth - 60);
    const y = Math.random() * (playArea.clientHeight - 60);

    target.style.left = x + "px";
    target.style.top = y + "px";
    target.style.display = "block";
}

function updateStats() {

    const totalClicks = score + misses;

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

            target.style.display = "none";

            const totalClicks = score + misses;

            let accuracy = 100;

            if (totalClicks > 0) {
                accuracy = (score / totalClicks) * 100;
            }

            clickResult.textContent =
                `Finished! Hits: ${score} | Accuracy: ${accuracy.toFixed(1)}%`;
        }

    }, 1000);
});

target.addEventListener("click", function (e) {

    if (!gameRunning) return;

    e.stopPropagation();

    score++;

    updateStats();

    spawnTarget();
});

playArea.addEventListener("click", function (e) {

    if (!gameRunning) return;

    if (e.target !== target) {
        misses++;
        updateStats();
    }
});