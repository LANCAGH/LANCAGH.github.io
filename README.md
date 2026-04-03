# lancagh.github.io

Portfolio personnel de Hugo Lancagh — Data Engineer Junior / Analytics Engineer Junior.

## Structure

```
lancagh.github.io/
├── index.html       # structure HTML
├── style.css        # design system (CSS variables, responsive)
├── script.js        # données + génération DOM + interactions
├── assets/
│   ├── profile.jpg  # photo de profil (à ajouter manuellement)
│   └── cv.pdf       # CV téléchargeable (à ajouter manuellement)
└── README.md
```

## Personnalisation

### Ajouter / modifier des projets

Dans `script.js`, éditer le tableau `projects` :

```js
{
  title: "Nom du projet",
  description: "Description courte.",
  tags: ["Python", "AWS"],
  link: "https://github.com/LANCAGH/...",  // laisser "" si pas de lien
  highlight: true                           // met en avant le projet (bordure teal)
}
```

### Ajouter / modifier les expériences

Dans `script.js`, éditer le tableau `experiences`.

### Ajouter la photo et le CV

Déposer les fichiers dans `assets/` :
- `assets/profile.jpg` — photo de profil carrée recommandée (min 400×400px)
- `assets/cv.pdf` — CV au format PDF

### Changer l'accent couleur

Dans `style.css`, modifier les variables :
```css
--accent: #0F766E;
--accent-hover: #0D5F58;
```

## Stack

Vanilla HTML / CSS / JavaScript — aucun framework, aucun build system.
Compatible GitHub Pages (fichiers statiques uniquement).
