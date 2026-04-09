/* AUTOMATISCHE SPRACHE DES NUTZERS */
const USER_LANG = navigator.language.slice(0, 2) || "de";

/* PREMIUM VERB-DATENBANK */
const VERBS = [

    /* -------------------------
       BEISPIEL 1: parler (regelmässig -er)
    -------------------------- */
    {
        infinitive: "parler",
        group: "er",
        translation: {
            de: "sprechen",
            en: "to speak",
            fr: "parler",
            it: "parlare",
            es: "hablar"
        },
        forms: {
            present: { je: "parle", tu: "parles", il: "parle", nous: "parlons", vous: "parlez", ils: "parlent" },
            imparfait: { je: "parlais", tu: "parlais", il: "parlait", nous: "parlions", vous: "parliez", ils: "parlaient" },
            pc: { je: "ai parlé" },
            futur: { je: "parlerai", tu: "parleras", il: "parlera", nous: "parlerons", vous: "parlerez", ils: "parleront" }
        }
    },

    /* -------------------------
       BEISPIEL 2: finir (regelmässig -ir)
    -------------------------- */
    {
        infinitive: "finir",
        group: "ir",
        translation: {
            de: "beenden",
            en: "to finish",
            fr: "finir",
            it: "finire",
            es: "terminar"
        },
        forms: {
            present: { je: "finis", tu: "finis", il: "finit", nous: "finissons", vous: "finissez", ils: "finissent" },
            imparfait: { je: "finissais", tu: "finissais", il: "finissait", nous: "finissions", vous: "finissiez", ils: "finissaient" },
            pc: { je: "ai fini" },
            futur: { je: "finirai", tu: "finiras", il: "finira", nous: "finirons", vous: "finirez", ils: "finiront" }
        }
    },

    /* -------------------------
       BEISPIEL 3: attendre (regelmässig -re)
    -------------------------- */
    {
        infinitive: "attendre",
        group: "re",
        translation: {
            de: "warten",
            en: "to wait",
            fr: "attendre",
            it: "attendere",
            es: "esperar"
        },
        forms: {
            present: { je: "attends", tu: "attends", il: "attend", nous: "attendons", vous: "attendez", ils: "attendent" },
            imparfait: { je: "attendais", tu: "attendais", il: "attendait", nous: "attendions", vous: "attendiez", ils: "attendaient" },
            pc: { je: "ai attendu" },
            futur: { je: "attendrai", tu: "attendras", il: "attendra", nous: "attendrons", vous: "attendrez", ils: "attendront" }
        }
    },

    /* -------------------------
       BEISPIEL 4: être (unregelmässig)
    -------------------------- */
    {
        infinitive: "être",
        group: "irregular",
        translation: {
            de: "sein",
            en: "to be",
            fr: "être",
            it: "essere",
            es: "ser"
        },
        forms: {
            present: { je: "suis", tu: "es", il: "est", nous: "sommes", vous: "êtes", ils: "sont" },
            imparfait: { je: "étais", tu: "étais", il: "était", nous: "étions", vous: "étiez", ils: "étaient" },
            pc: { je: "ai été" },
            futur: { je: "serai", tu: "seras", il: "sera", nous: "serons", vous: "serez", ils: "seront" }
        }
    },

    /* -------------------------
       BEISPIEL 5: avoir (unregelmässig)
    -------------------------- */
    {
        infinitive: "avoir",
        group: "irregular",
        translation: {
            de: "haben",
            en: "to have",
            fr: "avoir",
            it: "avere",
            es: "tener"
        },
        forms: {
            present: { je: "ai", tu: "as", il: "a", nous: "avons", vous: "avez", ils: "ont" },
            imparfait: { je: "avais", tu: "avais", il: "avait", nous: "avions", vous: "aviez", ils: "avaient" },
            pc: { je: "ai eu" },
            futur: { je: "aurai", tu: "auras", il: "aura", nous: "aurons", vous: "aurez", ils: "auront" }
        }
    },

    /* -------------------------
       BEISPIEL 6: aller (unregelmässig)
    -------------------------- */
    {
        infinitive: "aller",
        group: "irregular",
        translation: {
            de: "gehen",
            en: "to go",
            fr: "aller",
            it: "andare",
            es: "ir"
        },
        forms: {
            present: { je: "vais", tu: "vas", il: "va", nous: "allons", vous: "allez", ils: "vont" },
            imparfait: { je: "allais", tu: "allais", il: "allait", nous: "allions", vous: "alliez", ils: "allaient" },
            pc: { je: "suis allé(e)" },
            futur: { je: "irai", tu: "iras", il: "ira", nous: "irons", vous: "irez", ils: "iront" }
        }
    },

    /* -------------------------
       BEISPIEL 7: faire (unregelmässig)
    -------------------------- */
    {
        infinitive: "faire",
        group: "irregular",
        translation: {
            de: "machen",
            en: "to do",
            fr: "faire",
            it: "fare",
            es: "hacer"
        },
        forms: {
            present: { je: "fais", tu: "fais", il: "fait", nous: "faisons", vous: "faites", ils: "font" },
            imparfait: { je: "faisais", tu: "faisais", il: "faisait", nous: "faisions", vous: "faisiez", ils: "faisaient" },
            pc: { je: "ai fait" },
            futur: { je: "ferai", tu: "feras", il: "fera", nous: "ferons", vous: "ferez", ils: "feront" }
        }
    }

];

/* Übersetzung holen */
function getTranslation(verbObj) {
    return verbObj.translation[USER_LANG] || verbObj.translation["de"];
}
