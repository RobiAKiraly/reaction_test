function showGame(game) {
    document.getElementById("f1Game").classList.add("hidden");
    document.getElementById("clickGame").classList.add("hidden");

    if (game === "f1") {
        document.getElementById("f1Game").classList.remove("hidden");
    } else {
        document.getElementById("clickGame").classList.remove("hidden");
    }
}

/* ---------------- F1 GAME ---------------- */

const lights = document.querySelectorAll(".light");
const startF1 = document.getElementById("startF1");
const f1Result = document.getElementById("f1Result");

let startTime;
let canClick = false;

startF1.addEventListener("click", () => {

    lights.forEach(light => {
        light.classList.remove("active");
        light.classList.remove("green");
    });

    f1Result.textContent = "Wait for lights out...";
    canClick = false;

    let i = 0;

    let interval = setInterval(() => {

        lights[i].classList.add("active");
        i++;

        if (i === 5) {

            clearInterval(interval);

            let delay = Math.random() * 3000 + 1000;

            setTimeout(() => {

                lights.forEach(light => {
                    light.classList.remove("active");
                    light.classList.add("green");
                });

                startTime = Date.now();
                canClick = true;

            }, delay);
        }

    }, 1000);
});

document.addEventListener("keydown", e => {
    if (e.code === "Space" && canClick) {
        let reaction = Date.now() - startTime;
        f1Result.textContent = `Reaction Time: ${reaction} ms`;
        canClick = false;
    }
});

/* ---------------- TARGET GAME ---------------- */

const target = document.getElementById("target");
const playArea = document.getElementById("playArea");
const clickResult = document.getElementById("clickResult");
const startClick = document.getElementById("startClick");

let clickStart;

startClick.addEventListener("click", () => {

    clickResult.textContent = "Wait...";

    target.style.display = "none";

    let delay = Math.random() * 3000 + 1000;

    setTimeout(() => {

        let x = Math.random() * (playArea.clientWidth - 60);
        let y = Math.random() * (playArea.clientHeight - 60);

        target.style.left = x + "px";
        target.style.top = y + "px";
        target.style.display = "block";

        clickStart = Date.now();

    }, delay);
});

target.addEventListener("click", () => {

    let reaction = Date.now() - clickStart;

    clickResult.textContent =
        `Reaction Time: ${reaction} ms`;

    target.style.display = "none";
});