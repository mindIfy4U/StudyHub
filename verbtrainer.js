/* ============================
   PREMIUM VERBTRAINER – KOMBI VERSION
   (verb.js + trainer.js in einer Datei)
   ============================ */

/* AUTOMATISCHE SPRACHE DES NUTZERS */
const USER_LANG = navigator.language.slice(0, 2) || "de";

/* PREMIUM VERB-DATENBANK */
const VERBS = [

    {
        infinitive: "parler",
        group: "er",
        translation: { de: "sprechen", en: "to speak", fr: "parler", it: "parlare", es: "hablar" },
        forms: {
            present: { je: "parle", tu: "parles", il: "parle", nous: "parlons", vous: "parlez", ils: "parlent" },
            imparfait: { je: "parlais", tu: "parlais", il: "parlait", nous: "parlions", vous: "parliez", ils: "parlaient" },
            pc: { je: "ai parlé" },
            futur: { je: "parlerai", tu: "parleras", il: "parlera", nous: "parlerons", vous: "parlerez", ils: "parleront" }
        }
    },

    {
        infinitive: "finir",
        group: "ir",
        translation: { de: "beenden", en: "to finish", fr: "finir", it: "finire", es: "terminar" },
        forms: {
            present: { je: "finis", tu: "finis", il: "finit", nous: "finissons", vous: "finissez", ils: "finissent" },
            imparfait: { je: "finissais", tu: "finissais", il: "finissait", nous: "finissions", vous: "finissiez", ils: "finissaient" },
            pc: { je: "ai fini" },
            futur: { je: "finirai", tu: "finiras", il: "finira", nous: "finirons", vous: "finirez", ils: "finiront" }
        }
    },

    {
        infinitive: "attendre",
        group: "re",
        translation: { de: "warten", en: "to wait", fr: "attendre", it: "attendere", es: "esperar" },
        forms: {
            present: { je: "attends", tu: "attends", il: "attend", nous: "attendons", vous: "attendez", ils: "attendent" },
            imparfait: { je: "attendais", tu: "attendais", il: "attendait", nous: "attendions", vous: "attendiez", ils: "attendaient" },
            pc: { je: "ai attendu" },
            futur: { je: "attendrai", tu: "attendras", il: "attendra", nous: "attendrons", vous: "attendrez", ils: "attendront" }
        }
    },

    {
        infinitive: "être",
        group: "irregular",
        translation: { de: "sein", en: "to be", fr: "être", it: "essere", es: "ser" },
        forms: {
            present: { je: "suis", tu: "es", il: "est", nous: "sommes", vous: "êtes", ils: "sont" },
            imparfait: { je: "étais", tu: "étais", il: "était", nous: "étions", vous: "étiez", ils: "étaient" },
            pc: { je: "ai été" },
            futur: { je: "serai", tu: "seras", il: "sera", nous: "serons", vous: "serez", ils: "seront" }
        }
    },

    {
        infinitive: "avoir",
        group: "irregular",
        translation: { de: "haben", en: "to have", fr: "avoir", it: "avere", es: "tener" },
        forms: {
            present: { je: "ai", tu: "as", il: "a", nous: "avons", vous: "avez", ils: "ont" },
            imparfait: { je: "avais", tu: "avais", il: "avait", nous: "avions", vous: "aviez", ils: "avaient" },
            pc: { je: "ai eu" },
            futur: { je: "aurai", tu: "auras", il: "aura", nous: "aurons", vous: "aurez", ils: "auront" }
        }
    },

    {
        infinitive: "aller",
        group: "irregular",
        translation: { de: "gehen", en: "to go", fr: "aller", it: "andare", es: "ir" },
        forms: {
            present: { je: "vais", tu: "vas", il: "va", nous: "allons", vous: "allez", ils: "vont" },
            imparfait: { je: "allais", tu: "allais", il: "allait", nous: "allions", vous: "alliez", ils: "allaient" },
            pc: { je: "suis allé(e)" },
            futur: { je: "irai", tu: "iras", il: "ira", nous: "irons", vous: "irez", ils: "iront" }
        }
    },

    {
        infinitive: "faire",
        group: "irregular",
        translation: { de: "machen", en: "to do", fr: "faire", it: "fare", es: "hacer" },
        forms: {
            present: { je: "fais", tu: "fais", il: "fait", nous: "faisons", vous: "faites", ils: "font" },
            imparfait: { je: "faisais", tu: "faisais", il: "faisait", nous: "faisions", vous: "faisiez", ils: "faisaient" },
            pc: { je: "ai fait" },
            futur: { je: "ferai", tu: "feras", il: "fera", nous: "ferons", vous: "ferez", ils: "ferez" }
        }
    }

];

/* Übersetzung holen */
function getTranslation(verbObj) {
    return verbObj.translation[USER_LANG] || verbObj.translation["de"];
}

/* ============================
   TRAINER LOGIK
   ============================ */

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

    const verb = VERBS[Math.floor(Math.random() * VERBS.length)];
    const tense = tenses[Math.floor(Math.random() * tenses.length)];
    const person = persons[Math.floor(Math.random() * persons.length)];

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
