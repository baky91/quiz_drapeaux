# quiz_drapeaux

Jeu web pour tester tes connaissances sur les drapeaux du monde!
Le joueur doit reconnaître le drapeau affiché parmi quatre propositions de pays.

## Fonctionnalités

- Affichage aléatoire d'un drapeau
- 4 choix de réponse
- Système de score et de manches
- Boutons permettant de continuer la partie et de rejouer
- Aucune dépendance externe

## Aperçu

![aperçu du jeu](https://github.com/user-attachments/assets/c91d5a50-e9f8-4263-8869-8411258e3053)

En cas de bonne réponse:

![bonne réponse](https://github.com/user-attachments/assets/383b3907-83f9-42c9-9f23-439b22ed6710)

En cas de mauvaise réponse:

![mauvaise réponse](https://github.com/user-attachments/assets/33a4c5dd-40ec-4530-96be-0d65c2156a9b)


## Lancer le jeu

### Cliquer sur ce lien

https://baky91.github.io/quiz_drapeaux

### Télécharger le code source

Ouvrir le fichier index.html dans un navigateur.

## Structure des données

### Liste des pays

Chaque pays est un objet avec deux clés :
- name : Nom du pays en français
- code : Code ISO 3166-1 alpha-2 du pays servant à récupérer l'image sur [flagcdn](https://flagcdn.com)
```javascript
getFlagURL(code) {
  return `https://flagcdn.com/w320/${code}.png`;
}
```

```javascript
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
```

### Définir le nombre de manches

Dans la méthode initGame de la classe FlagQuizGame, on peut définir le nombre de manches

```javascript
// Choisir le nombre de manches manuellement (ex: 10)
this.nbRounds = 10;
```
ou
```javascript
// Pour faire passer tous les pays
this.nbRounds = countries.length;
```
