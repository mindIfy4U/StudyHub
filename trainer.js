/* ============================
   PREMIUM VERBTRAINER – trainer.js
   ============================ */

/* Globale Variablen */
let current = null;
let score = 0;
let total = 0;
let mode = "learn";

/* Elemente */
const modeSelect = document.getElementById("modeSelect");
const startBtn = document.getElementById("startExercise");
const checkBtn = document.getElementById("checkAnswer");
const answerInput = document.getElementById("answerInput");
const questionEl = document.getElementById("question");
const feedbackEl = document.getElementById("feedback");
const translationEl = document.getElementById("translation");
const scoreEl = document.getElementById("score");
const exerciseArea = document.getElementById("exerciseArea");

/* Modus ändern */
modeSelect.addEventListener("change", e => {
    mode = e.target.value;
});

/* Start */
startBtn.addEventListener("click", () => {
    score = 0;
    total = 0;
    scoreEl.textContent = "";
    startNewExercise();
});

/* Antwort prüfen */
checkBtn.addEventListener("click", () => {
    if (!current) return;

    const correct = current.verb.forms[current.tense][current.person];
    const user = answerInput.value.trim();

    if (user === correct) {
        feedbackEl.textContent = "✔️ Richtig!";
        if (mode === "test") {
            score++;
            updateScore();
        }
    } else {
        feedbackEl.textContent = `❌ Falsch. Richtig wäre: "${correct}"`;
    }

    setTimeout(startNewExercise, 1200);
});

/* Neue Aufgabe */
function startNewExercise() {
    const tenses = [...document.querySelectorAll(".tense:checked")].map(el => el.value);
    const persons = [...document.querySelectorAll(".person:checked")].map(el => el.value);
    const showTranslation = document.getElementById("showTranslation").checked;

    if (!tenses.length || !persons.length) {
        alert("Bitte mindestens eine Zeitform und eine Person wählen.");
        return;
    }

    /* Verb auswählen */
    const verb = VERBS[Math.floor(Math.random() * VERBS.length)];
    const tense = tenses[Math.floor(Math.random() * tenses.length)];
    const person = persons[Math.floor(Math.random() * persons.length)];

    /* Falls Verb diese Form nicht hat → neue Aufgabe */
    if (!verb.forms[tense] || !verb.forms[tense][person]) {
        return startNewExercise();
    }

    current = { verb, tense, person, showTranslation };

    exerciseArea.style.display = "block";
    feedbackEl.textContent = "";
    answerInput.value = "";

    const tenseLabel = {
        present: "Présent",
        imparfait: "Imparfait",
        pc: "Passé composé",
        futur: "Futur simple"
    }[tense];

    questionEl.textContent = `${person} – ${verb.infinitive} (${tenseLabel})`;

    translationEl.textContent = showTranslation ? `(${getTranslation(verb)})` : "";

    if (mode === "test") {
        total++;
        updateScore();
    }
}

/* Punkte aktualisieren */
function updateScore() {
    scoreEl.textContent = `Punkte: ${score} / ${total}`;
}
