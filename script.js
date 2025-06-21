document.addEventListener("DOMContentLoaded", () => {
  new FlagQuizGame(countries);
});

const countries = [
  { name: "France", code: "fr" },
  { name: "Belgique", code: "be" },
  { name: "Royaume-Uni", code: "gb" },
  { name: "Russie", code: "ru" },
  { name: "Japon", code: "jp" },
  { name: "Brésil", code: "br" },
  { name: "Canada", code: "ca" },
  { name: "Allemagne", code: "de" },
  { name: "Italie", code: "it" },
  { name: "Espagne", code: "es" },
  { name: "Portugal", code: "pt" },
  { name: "Pays-Bas", code: "nl" },
  { name: "Suisse", code: "ch" },
  { name: "Suède", code: "se" },
  { name: "Norvège", code: "no" },
  { name: "Danemark", code: "dk" },
  { name: "Finlande", code: "fi" },
  { name: "Pologne", code: "pl" },
  { name: "Autriche", code: "at" },
  { name: "Irlande", code: "ie" },
  { name: "Grèce", code: "gr" },
  { name: "Turquie", code: "tr" },
  { name: "Chine", code: "cn" },
  { name: "Corée du Sud", code: "kr" },
  { name: "Inde", code: "in" },
  { name: "Vietnam", code: "vn" },
  { name: "Thaïlande", code: "th" },
  { name: "Indonésie", code: "id" },
  { name: "Australie", code: "au" },
  { name: "Nouvelle-Zélande", code: "nz" },
  { name: "États-Unis", code: "us" },
  { name: "Mexique", code: "mx" },
  { name: "Argentine", code: "ar" },
  { name: "Chili", code: "cl" },
  { name: "Colombie", code: "co" },
  { name: "Pérou", code: "pe" },
  { name: "Égypte", code: "eg" },
  { name: "Afrique du Sud", code: "za" },
  { name: "Maroc", code: "ma" },
  { name: "Mali", code: "ml" },
  { name: "Nigéria", code: "ng" },
  { name: "Tunisie", code: "tn" },
  { name: "Algérie", code: "dz" },
  { name: "Kenya", code: "ke" },
  { name: "Éthiopie", code: "et" },
  { name: "Ukraine", code: "ua" },
  { name: "Roumanie", code: "ro" },
  { name: "Sénégal", code: "sn" },
  { name: "Bulgarie", code: "bg" },
  { name: "Hongrie", code: "hu" },
  { name: "Croatie", code: "hr" },
  { name: "Slovaquie", code: "sk" },
  { name: "Tchéquie", code: "cz" },
];

class FlagQuizGame {
  constructor(countriesList) {
    this.staticCountries = countriesList;
    this.countries = null;

    // Bouton pour la manche suivante
    const continueButton = document.getElementById("continue-btn");
    continueButton.addEventListener("click", () => {
      this.playRound();
      //   continueButton.style.display = "none";
      continueButton.classList.add("hidden");

      const listItems = document.querySelectorAll("ul > li");
      listItems.forEach((li) => {
        li.style.background = "#e0e7ff";
      });
    });

    // Bouton pour rejouer
    const replayButton = document.getElementById("replay-btn");
    replayButton.addEventListener("click", () => {
      this.initGame();
      //   replayButton.style.display = "none";
    });

    this.initGame();
  }

  initGame() {
    // Faire en sorte que countries prenne le contenu de staticCountries et non la référence vers le tableau
    this.countries = this.staticCountries.map((c) => ({ ...c }));
    this.nbRounds = 5;
    // Pour faire passer tous les pays
    // this.nbRounds = countries.length;
    this.currentRound = 1;
    this.correctAnswer = null;
    this.score = 0;

    // Initialiser la couleur de fond des proposition
    const listItems = document.querySelectorAll("ul > li");
    listItems.forEach((li) => {
      li.style.background = "#e0e7ff";
    });

    // Initialisation du compteur de manche et de points
    document.getElementById(
      "round-counter"
    ).textContent = `Manche 1/${this.nbRounds}`;
    document.querySelector(
      ".score"
    ).innerHTML = `Vous avez <strong>0</strong> point`;

    this.playRound();
  }

  playRound() {
    // console.log(this.countries);

    const country = this.getRandomCountry();

    // retirer le drapeau de la partie
    let index = this.getIndexOfCountry(country);
    // console.log(index);

    this.countries.splice(index, 1);

    this.correctAnswer = country.name;

    const flagContainer = document.getElementById("flag-image");
    const flagUrl = this.getFlagURL(country.code);

    flagContainer.innerHTML = "";
    const img = document.createElement("img");
    img.src = flagUrl;

    const result = document.querySelector(".answer-check");
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
    this.currentRound++;

    const continueButton = document.getElementById("continue-btn");

    // Indiquer si la réponse est correcte ou fausse
    const result = document.querySelector(".answer-check");
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

    // Mise à jour du compteur de manche et de points
    document.getElementById("round-counter").textContent = `Manche ${
      this.currentRound < this.nbRounds ? this.currentRound : this.nbRounds
    }/${this.nbRounds}`;
    document.querySelector(".score").innerHTML = `Vous avez <strong>${
      this.score
    }</strong> point${this.score > 1 ? "s" : ""}.`;

    if (this.currentRound == this.nbRounds + 1) {
      this.endGame();
    } else {
      //   continueButton.style.display = "initial";
      continueButton.classList.remove("hidden");
    }

    this.removeListItemsListeners();
  }

  endGame() {
    alert(`Partie terminée ! Vous avez ${this.score} points !`);
    const replayButton = document.getElementById("replay-btn");
    replayButton.style.display = "initial";
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
        // console.log(`${this.countries[i].name} - ${country.name}`);

        index = i;
      }
    }
    return index;
  }

  getListItemOfCorrectAnswer() {
    const listItems = document.querySelectorAll("ul > li");

    let li = null;

    listItems.forEach((listItem) => {
      if (listItem.textContent == this.correctAnswer) {
        li = listItem;
      }
    });
    return li;
  }

  // Faire en sorte de ne pas pouvoir sélectionner une proposition après avoir répondu
  removeListItemsListeners() {
    document.querySelectorAll("ul > li").forEach((li) => {
      li.onclick = null;
    });
  }
}
