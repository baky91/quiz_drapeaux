document.addEventListener("DOMContentLoaded", () => {
  new FlagQuizGame();
});

// Elements

const continueButton = document.getElementById("continue-btn");
const replayButton = document.getElementById("replay-btn");
const listItems = document.querySelectorAll("ul > li");
const flagContainer = document.getElementById("flag-image");
const result = document.querySelector(".answer-check");
const score = document.querySelector(".score");
const gameEnd = document.querySelector(".game-end");
const roundCounter = document.getElementById("round-counter");
const popupEndGame = document.getElementById("popup-end-game");
const popupCloseEndGame = document.getElementById("popup-close-end-game");
const popupText = document.getElementById("popup-text");
const popupSettings = document.getElementById("popup-settings");
const popupCloseSettings = document.getElementById("popup-close-settings");
const popupCancelSettings = document.getElementById("popup-cancel-settings");
const select = document.getElementById("round-select");
const settingsButton = document.getElementById("settings-button");

class FlagQuizGame {
  constructor() {
    this.staticCountries = null;
    this.countries = null;

    fetch("countries.json")
      .then((response) => response.json())
      .then((data) => {
        this.staticCountries = data;
        // Charger les paramètre sur le nombre de manche
        const savedRounds = localStorage.getItem("rounds");

        if (savedRounds) {
          this.nbRounds =
            savedRounds === "all"
              ? this.staticCountries.length
              : parseInt(savedRounds);
        } else {
          this.nbRounds = 10; // Valeur par défaut
        }

        this.addListeners();

        this.initGame();
      })
      .catch((error) => {
        console.error("Erreur lors du chargement de la liste des pays:", error);
      });
  }

  initGame() {
    // Faire en sorte que countries prenne le contenu de staticCountries et non la référence vers le tableau
    this.countries = this.staticCountries.map((c) => ({ ...c }));
    this.currentRound = 0;
    this.correctAnswer = null;
    this.score = 0;

    gameEnd.textContent = "";

    // Initialiser la couleur de fond des proposition
    listItems.forEach((li) => {
      li.style.background = "#e0e7ff";
    });

    // Initialisation du compteur de manche et de points
    roundCounter.textContent = `Manche 1/${this.nbRounds}`;
    score.innerHTML = `Vous avez <strong>0</strong> point`;

    // Définir l'option "Tous les pays" comme étant la taille de countries
    document.querySelector(
      ".last-option"
    ).value = `${this.staticCountries.length}`;

    select.value = this.nbRounds.toString();

    this.playRound();
  }

  playRound() {
    this.currentRound++;

    // Mettre à jour le compteur de manches
    roundCounter.textContent = `Manche ${
      this.currentRound < this.nbRounds ? this.currentRound : this.nbRounds
    }/${this.nbRounds}`;

    const country = this.getRandomCountry();

    // retirer le drapeau de la partie
    let index = this.getIndexOfCountry(country);
    this.countries.splice(index, 1);

    this.correctAnswer = country.name;

    const flagUrl = this.getFlagURL(country.code);

    flagContainer.innerHTML = "";
    const img = document.createElement("img");
    img.src = flagUrl;

    result.textContent = "";

    flagContainer.appendChild(img);
    this.displayPropositions();
  }

  displayPropositions() {
    const incorrect = this.staticCountries
      .filter((c) => c.name !== this.correctAnswer)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((c) => c.name);

    const answers = [...incorrect, this.correctAnswer].sort(
      () => 0.5 - Math.random()
    );

    answers.forEach((name, index) => {
      const li = document.getElementById(`country-${index + 1}`);
      li.textContent = name;
      li.onclick = () => this.handleAnswer(li);
    });
  }

  handleAnswer(listItem) {
    // Indiquer si la réponse est correcte ou fausse
    if (listItem.textContent === this.correctAnswer) {
      this.score++;
      result.textContent = "Bonne réponse !";
      result.style.color = "green";
    } else {
      result.textContent = "Mauvaise réponse.";
      result.style.color = "red";
      listItem.style.background = "red";
    }

    // Afficher la réponse correcte
    this.getListItemOfCorrectAnswer().style.background = "green";

    // Mise à jour du compteur de points

    score.innerHTML = `Vous avez <strong>${this.score}</strong> point${
      this.score > 1 ? "s" : ""
    }.`;

    if (this.currentRound == this.nbRounds) {
      this.endGame();
    } else {
      //   continueButton.style.display = "initial";
      continueButton.classList.remove("hidden");
    }

    this.removeListItemsListeners();
  }

  addListeners() {
    // Bouton pour la manche suivante
    continueButton.addEventListener("click", () => this.continue());
    document.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !continueButton.classList.contains("hidden"))
        this.continue();
    });

    // Bouton pour rejouer

    replayButton.addEventListener("click", () => {
      this.initGame();
    });

    settingsButton.addEventListener("click", () => {
      this.showPopup("settings");
    });

    // Fermer la popup
    popupCloseEndGame.addEventListener("click", () => {
      popupEndGame.classList.add("hidden");
    });

    popupCloseSettings.addEventListener("click", () => {
      const newRoundCounter = select.value;

      // Sauvegarder les paramètres sur le nombre de manches
      if (newRoundCounter === `${this.staticCountries.length}`) {
        localStorage.setItem("rounds", "all");
      } else {
        localStorage.setItem("rounds", newRoundCounter);
      }

      this.nbRounds = parseInt(newRoundCounter);

      popupSettings.classList.add("hidden");

      this.initGame();
    });

    popupCancelSettings.addEventListener("click", () => {
      // Pour ne pas prendre en compte les changement non validés
      select.value = this.nbRounds.toString();
      popupSettings.classList.add("hidden");
    });
  }

  continue() {
    this.playRound();
    continueButton.classList.add("hidden");

    listItems.forEach((li) => {
      li.style.background = "#e0e7ff";
    });
  }

  endGame() {
    gameEnd.textContent = `Partie terminée ! Vous avez ${this.score} point${
      this.score > 1 ? "s" : ""
    }`;

    replayButton.style.display = "initial";
    this.showPopup("game-end");
  }

  showPopup(type) {
    if (type === "game-end") {
      popupEndGame.classList.remove("hidden");

      popupText.textContent = `Vous avez obtenu ${this.score} point${
        this.score > 1 ? "s" : ""
      } !`;
    } else if (type === "settings") {
      popupSettings.classList.remove("hidden");
    }
  }

  getRandomCountry() {
    const index = Math.floor(Math.random() * this.countries.length);
    return this.countries[index];
  }

  getFlagURL(code) {
    return `https://flagcdn.com/w320/${code}.png`;
  }

  getIndexOfCountry(country) {
    let index = -1;
    for (let i = 0; i < this.countries.length; i++) {
      if (this.countries[i].name === country.name) {
        index = i;
      }
    }
    return index;
  }

  getListItemOfCorrectAnswer() {
    let li = null;

    listItems.forEach((listItem) => {
      if (listItem.textContent === this.correctAnswer) {
        li = listItem;
      }
    });
    return li;
  }

  // Faire en sorte de ne pas pouvoir sélectionner une proposition après avoir répondu
  removeListItemsListeners() {
    listItems.forEach((li) => {
      li.onclick = null;
    });
  }
}
