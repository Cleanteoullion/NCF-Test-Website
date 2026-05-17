# NCF Icons · v2.0

Bibliothèque de **30 icônes SVG** pour les projets web NCF.
Style line-art moderne avec signature équerre.

---

## 📁 Structure du dossier

```
ncf-icons/
├── README.md                  ← Ce fichier
├── ICON_GUIDELINES.md         ← Règles complètes du système
├── icons.css                  ← Styles utilitaires prêts à l'emploi
├── icons-sprite.svg           ← Sprite SVG (toutes les icônes en un fichier)
├── preview.html               ← Page d'aperçu visuel (à ouvrir au navigateur)
└── svg/                       ← 30 icônes individuelles
    ├── ncf-icon-evaluation-balance.svg
    ├── ncf-icon-evaluation-document.svg
    └── ... (28 autres)
```

---

## 🚀 Démarrage rapide

### Option 1 — SVG inline (recommandé)

Copie le contenu d'un fichier `.svg` directement dans ton HTML.
C'est la méthode la plus simple et la plus flexible (animations, hover, etc.).

```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M 1 4 L 1 1 L 4 1" stroke-width="1"/>
  <path d="M 20 23 L 23 23 L 23 20" stroke-width="1"/>
  <line x1="12" y1="6" x2="12" y2="19"/>
  <!-- ... reste de l'icône -->
</svg>
```

### Option 2 — Balise `<img>`

Plus simple, mais pas d'animation possible et la couleur reste figée.

```html
<img src="ncf-icons/svg/ncf-icon-evaluation-balance.svg" width="24" height="24" alt="Balance">
```

### Option 3 — Background CSS

Pour les décors non-cliquables.

```css
.icon-balance {
  background-image: url('ncf-icons/svg/ncf-icon-evaluation-balance.svg');
  background-size: contain;
  width: 24px;
  height: 24px;
}
```

### Option 4 — Sprite SVG (performance optimale)

Le sprite charge toutes les icônes en une seule requête HTTP. Idéal en production.

```html
<svg width="24" height="24"><use href="ncf-icons/icons-sprite.svg#balance"/></svg>
```

---

## 🎨 Couleur des icônes

Toutes les icônes utilisent `stroke="currentColor"`. Tu contrôles leur couleur
via le CSS du parent :

```html
<span style="color: #050D1D">
  <!-- L'icône hérite du marine -->
</span>

<span style="color: #E8503F">
  <!-- L'icône passe en orange (état hover, par exemple) -->
</span>
```

Avec la feuille `icons.css` incluse :

```html
<i class="ncf-icon ncf-icon--marine">...</i>
<i class="ncf-icon ncf-icon--accent">...</i>
<i class="ncf-icon ncf-icon--paper">...</i>  <!-- sur fond sombre -->
```

---

## 📏 Tailles recommandées

| Contexte           | Taille | Classe utilitaire     |
|--------------------|--------|------------------------|
| Inline texte       | 20 px  | `.ncf-icon--xs`        |
| Bouton / nav       | 24 px  | `.ncf-icon--sm`        |
| Carte feature      | 32 px  | `.ncf-icon--md`        |
| Carte large        | 48 px  | `.ncf-icon--lg`        |
| Hero               | 64 px  | `.ncf-icon--xl`        |

⚠️ **Ne pas descendre sous 20 px** : les équerres deviennent illisibles.

---

## 📚 Inventaire des 36 icônes

### Évaluation & méthodes (8)
- `evaluation/balance` — Balance d'évaluation
- `evaluation/document` — Rapport / livrable
- `evaluation/methods` — Trois méthodes (DCF, multiples, ANC)
- `evaluation/chart` — Courbe d'analyse
- `evaluation/growth` — Croissance / tendance
- `evaluation/calculator` — Calcul
- `evaluation/data` — Base de données
- `evaluation/comparable` — Comparable sectoriel

### Cas d'usage (2)
- `evaluation/transmission` — Transmission entre dirigeants
- `evaluation/holding` — Structure holding

### Process & livraison (6)
- `process/clock` — Délai
- `process/pdf` — Téléchargement
- `process/signature` — Signature
- `process/steps` — Étapes
- `process/calendar` — Calendrier
- `process/timeline` — Timeline

### Valeur & garanties (5)
- `value/seal` — Opposable
- `value/lock` — Confidentiel
- `value/independence` — Indépendant
- `value/certification` — Certification
- `value/quality` — Qualité

### Équipe (8)
- `team/conversation` — Conseil
- `team/expert` — Expert
- `team/meeting` — Réunion
- `team/support` — Support
- `team/phone` — Téléphone
- `team/mail` — Email / message
- `team/family` — Famille / lignée (arbre généalogique)
- `team/staff` — Salariés / effectif

### Business (5)
- `business/company` — Entreprise
- `business/finance` — Finance (€)
- `business/contract` — Contrat
- `business/location` — Adresse / localisation
- `business/tower` — Autre entreprise / tour corporate

### Navigation (2)
- `nav/search` — Recherche
- `nav/arrow` — Flèche d'action

---

## ➕ Ajouter une nouvelle icône

1. Ouvre `ICON_GUIDELINES.md`
2. Copie le **prompt template** de la section 11
3. Remplace `{categorie}`, `{nom}` et `{concept}`
4. Colle-le dans Claude / Cursor / Copilot
5. Sauve le SVG retourné dans `svg/ncf-icon-{categorie}-{nom}.svg`
6. Ajoute l'icône à `icons-sprite.svg` (entoure-la d'une balise `<symbol id="...">`)
7. Vérifie la cohérence dans `preview.html`

---

## 🛠️ Intégration framework

### React / Next.js

```jsx
// Composant Icon réutilisable
export function Icon({ name, size = 24, className = '' }) {
  return (
    <svg width={size} height={size} className={className}>
      <use href={`/icons-sprite.svg#${name}`}/>
    </svg>
  );
}

// Usage
<Icon name="balance" size={32} className="text-marine"/>
```

### Vue / Nuxt

```vue
<template>
  <svg :width="size" :height="size">
    <use :href="`/icons-sprite.svg#${name}`"/>
  </svg>
</template>
```

### HTML / Vanilla

Voir Option 1 ci-dessus.

---

## 📐 Spécifications techniques

- **viewBox** : `0 0 24 24` (grille fixe)
- **Trait principal** : `stroke-width="1.5"`
- **Trait des équerres** : `stroke-width="1"`
- **Terminaisons** : `stroke-linecap="round"` + `stroke-linejoin="round"`
- **Couleur** : `stroke="currentColor"`
- **Remplissage** : `fill="none"` (sauf petits points internes)

---

## 📄 Licence

Bibliothèque créée pour NCF — Novances Évaluation.
Usage interne uniquement.

---

*Version 2.0 · 36 icônes · Mise à jour : 2026*
