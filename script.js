document.addEventListener("DOMContentLoaded", () => {
const openButton = document.getElementById("openButton");
const envelope = document.getElementById("envelope");
const intro = document.getElementById("intro");
const letter = document.getElementById("letter");

const secretButton = document.getElementById("secretButton");
const secretMessage = document.getElementById("secretMessage");

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicLabel = document.getElementById("musicLabel");
const musicIcon = document.getElementById("musicIcon");

const petalField = document.getElementById("petal-field");
const particleField = document.getElementById("particle-field");

let letterOpened = false;
let musicStarted = false;

// Ouvrir l'enveloppe et révéler la lettre.
openButton.addEventListener("click", () => {
    if (letterOpened) {
        letter.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
        return;
    }

    letterOpened = true;
    envelope.classList.add("opened");
    openButton.disabled = true;
    openButton.textContent = "Une lettre rien que pour toi ♡";

    // Laisse le temps à l'enveloppe de s'ouvrir.
    window.setTimeout(() => {
        intro.classList.add("hidden");
        letter.classList.remove("hidden");
        letter.setAttribute("aria-hidden", "false");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        createPetals(18);
    }, 950);

    // Essaie de lancer la musique après l'action de l'utilisateur.
    if (!musicStarted) {
        startMusic();
    }
});

// Révéler le message secret.
secretButton.addEventListener("click", () => {
    const isHidden = secretMessage.classList.contains("hidden");

    if (isHidden) {
        secretMessage.classList.remove("hidden");
        secretMessage.setAttribute("aria-hidden", "false");
        secretButton.setAttribute("aria-expanded", "true");
        secretButton.innerHTML = "Mon secret est révélé ♥";

        createPetals(24);

        window.setTimeout(() => {
            secretMessage.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 150);
    } else {
        secretMessage.classList.add("hidden");
        secretMessage.setAttribute("aria-hidden", "true");
        secretButton.setAttribute("aria-expanded", "false");
        secretButton.innerHTML =
            'Découvrir mon petit secret <span aria-hidden="true">♡</span>';
    }
});

// Contrôler la musique.
async function startMusic() {
    if (!music) return;

    try {
        await music.play();
        musicStarted = true;
        updateMusicButton(true);
    } catch (error) {
        // La musique peut nécessiter une nouvelle action de l'utilisateur.
        updateMusicButton(false);
    }
}

function updateMusicButton(isPlaying) {
    musicButton.setAttribute("aria-pressed", String(isPlaying));

    if (isPlaying) {
        musicIcon.textContent = "♫";
        musicLabel.textContent = "Mettre la musique en pause";
    } else {
        musicIcon.textContent = "♪";
        musicLabel.textContent = "Écouter notre ambiance";
    }
}

musicButton.addEventListener("click", async () => {
    if (music.paused) {
        await startMusic();
    } else {
        music.pause();
        updateMusicButton(false);
    }
});

music.addEventListener("ended", () => {
    updateMusicButton(false);
});

// Créer des pétales romantiques.
function createPetals(amount = 12) {
    if (!petalField) return;

    const symbols = ["♥", "♡", "✿", "❀"];

    for (let i = 0; i < amount; i++) {
        const petal = document.createElement("span");

        petal.className = "petal";
        petal.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.fontSize = `${12 + Math.random() * 15}px`;
        petal.style.animationDuration = `${5 + Math.random() * 6}s`;
        petal.style.animationDelay = `${Math.random() * 2}s`;
        petal.style.setProperty(
            "--drift",
            `${Math.random() * 160 - 80}px`
        );

        petalField.appendChild(petal);

        window.setTimeout(() => {
            petal.remove();
        }, 13000);
    }
}

// Petits points lumineux en arrière-plan.
function createParticles(amount = 22) {
    if (!particleField) return;

    for (let i = 0; i < amount; i++) {
        const particle = document.createElement("span");

        particle.className = "particle";
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${3 + Math.random() * 5}s`;

        particleField.appendChild(particle);
    }
}

createParticles();

// Quelques pétales discrets au début.
window.setTimeout(() => createPetals(8), 1200);

});