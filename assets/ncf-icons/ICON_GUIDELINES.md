# NCF — Guidelines Icônes · v2.0

> Système d'icônes line-art avec **signature équerre** pour le cabinet d'évaluation NCF.
> Objectif : créer et faire évoluer une bibliothèque d'icônes parfaitement
> cohérente entre elles, peu importe qui les dessine.
>
> **Changement majeur depuis v1.0** : style "Moderne" adopté comme base, avec
> ajout obligatoire de deux équerres de cadrage qui constituent la signature
> visuelle NCF.

---

## 1. Anatomie d'une icône NCF

### Grille de construction

- **Canvas** : 24 × 24 pixels
- **viewBox SVG** : toujours `viewBox="0 0 24 24"`
- **Zone des équerres signature** : coins extérieurs (voir section 2)
- **Zone utile pour le dessin** : 16 × 16 px centrée (4,4 → 20,20)

```
┌────────────────────────┐
│ ┐                      │ ← équerre haut-gauche (0,0)
│                        │
│      ZONE UTILE        │
│        16 × 16         │
│   (centrée verticale)  │
│                        │
│                      ┌ │ ← équerre bas-droite (24,24)
└────────────────────────┘
        24 × 24
```

### Style de base : Line-art Moderne

- **Trait** : `stroke-width: 1.5` partout sauf équerres
- **Couleur** : toujours `stroke="currentColor"`, jamais de couleur en dur
- **Terminaisons** : `stroke-linecap="round"` et `stroke-linejoin="round"`
- **Aucun remplissage** par défaut (`fill="none"`)
- **Géométrie** : strictement orthogonale, angles vifs à 0°/45°/90°
- **Pas d'ornement** ni de double trait : la signature équerre suffit à
  caractériser

---

## 2. LA SIGNATURE ÉQUERRE (obligatoire)

**Chaque icône NCF se reconnaît à ses deux équerres en angle opposé.**
C'est ce qui transforme une icône générique en icône NCF.

### Spécifications strictes

- **Position** : coin haut-gauche ET coin bas-droite
- **Trait** : `stroke-width: 1` (plus fin que le reste de l'icône)
- **Forme** : segment en L de 3 px de longueur sur chaque côté
- **Couleur** : `stroke="currentColor"` (suit la couleur de l'icône)

### Code des équerres (à copier-coller dans chaque icône)

```xml
<!-- Signature NCF : équerres aux coins opposés -->
<path d="M 1 4 L 1 1 L 4 1" stroke-width="1"/>
<path d="M 20 23 L 23 23 L 23 20" stroke-width="1"/>
```

Ces deux paths sont **non-négociables** dans toutes les icônes de la
bibliothèque. Toute icône produite sans ses équerres n'est pas une icône
NCF — c'est juste une icône.

### Variante autorisée : couleur or pour la signature

Pour des contextes premium (page d'accueil hero, livraisons spéciales), on
peut autoriser une seconde version où les équerres sont en `var(--gold)`
au lieu de `currentColor`. Cette variante est **rare** et nommée avec un
suffixe `-gold.svg`. Par défaut, on utilise la version `currentColor`.

---

## 3. Zone utile du dessin

À cause des équerres qui occupent les coins, le dessin de l'objet doit
respecter une zone utile **réduite** :

- **Largeur** : 16 px de large maximum (entre x=4 et x=20)
- **Hauteur** : 16 px de haut maximum (entre y=4 et y=20)
- **Idéalement centré** verticalement à 12, horizontalement à 12

L'objet ne doit jamais toucher ni chevaucher les équerres. Garder un
minimum de **1 px** de respiration entre le dessin et chaque équerre.

---

## 4. Charte appliquée

```css
:root {
  --marine: #050D1D;        /* couleur principale sur fond clair */
  --paper: #F7F4ED;         /* couleur sur fond marine */
  --accent: #E8503F;        /* orange hover / focus */
  --gold: #C9A961;          /* signature premium (cas particulier) */
  --ink-soft: #4A5470;      /* état désactivé / décoratif */
}
```

**Règle d'or** : on n'écrit JAMAIS `stroke="#050D1D"` dans le SVG. On
utilise toujours `stroke="currentColor"`. La couleur est imposée par le
CSS du parent.

---

## 5. Tailles standardisées

| Usage              | Taille | Équerres visibles ? |
|--------------------|--------|---------------------|
| Inline texte       | 20 px  | Oui, mais discrètes |
| Bouton / nav       | 24 px  | Oui, claires        |
| Carte feature      | 32 px  | Oui, parfaitement   |
| Carte large        | 48 px  | Oui, éclatantes     |
| Hero / décoratif   | 64 px  | Très lisibles       |

**Attention** : à cause des équerres, on ne descend **plus en dessous de
20 px**. À 16 px, les équerres deviennent illisibles et l'icône perd sa
signature — donc son identité NCF. Pour les contextes plus petits (inline
dans du texte 14 px par exemple), utiliser un autre composant graphique
(point, tiret) ou redessiner spécifiquement.

---

## 6. Règles géométriques

### Coordonnées autorisées

- Entiers (0, 1, 2, ... 24) en priorité
- Demi-pixels (0.5, 1.5, ...) si nécessaire pour le centrage
- **Interdits** : décimales arbitraires (5.847, 12.331)

### Angles autorisés

- **0°, 45°, 90°** principalement
- Arcs circulaires libres uniquement (cercles complets ou demi-cercles)
- **Interdit** : 37°, 53°, 71° et autres angles "naturalistes"

### Densité

- Une icône a entre **2 et 5 éléments graphiques** (sans compter les
  équerres signature)
- Une icône avec 7+ éléments est trop chargée
- Espacement minimal entre deux éléments parallèles : **2 pixels**

---

## 7. Métaphores : que représenter ?

### Vocabulaire NCF autorisé

Vocabulaire métier littéral du cabinet d'évaluation :

- **Documents** : feuille, dossier, rapport plié, sceau
- **Mesure** : balance, règle, jauge, courbe
- **Transmission** : flèche directionnelle, deux silhouettes
- **Confidentialité** : enveloppe scellée, cadenas, coffre
- **Conseil** : bulle de dialogue, silhouette d'expert
- **Méthode** : trois colonnes, pondération, formule stylisée
- **Temps** : horloge, calendrier, sablier

### Interdits

- Métaphores creuses : ampoule, fusée, cible, poignée de main
- Émoticônes et visages stylisés
- Logos d'entreprise
- Symboles politiques ou religieux
- Métaphores agressives

### Le test de Lyon

Imaginer l'icône dans le rapport remis à un dirigeant de PME lyonnaise
de 60 ans. Si ça paraît enfantin ou marketing : refaire.

---

## 8. Nommage et organisation

### Convention de fichier

```
ncf-icon-{categorie}-{nom}.svg
```

- Catégories : `evaluation`, `process`, `value`, `team`, `feature`, `nav`
- Nom : kebab-case anglais, court, descriptif

### Métadonnées internes

Chaque SVG commence par un commentaire :

```xml
<!-- NCF Icon · evaluation/balance · v2.0 · 24×24 · moderne + équerres -->
<svg viewBox="0 0 24 24" ...>
```

---

## 9. Structure type d'une icône (template)

Toute nouvelle icône doit respecter ce squelette :

```xml
<!-- NCF Icon · {categorie}/{nom} · v2.0 · 24×24 · moderne + équerres -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">

  <!-- 1. Signature NCF : équerres aux coins opposés -->
  <path d="M 1 4 L 1 1 L 4 1" stroke-width="1"/>
  <path d="M 20 23 L 23 23 L 23 20" stroke-width="1"/>

  <!-- 2. Dessin de l'objet, contenu dans la zone utile 16×16 (4,4 → 20,20) -->
  <!-- ... -->

</svg>
```

Les équerres viennent **toujours en premier**, le dessin de l'objet
ensuite. Cet ordre n'est pas anodin : il rappelle visuellement à quiconque
modifie l'icône que les équerres sont la signature à préserver.

---

## 10. Le test de cohérence visuelle

Avant d'ajouter une nouvelle icône à la bibliothèque :

1. **Les équerres sont-elles présentes et au bon endroit ?** (sinon : recommencer)
2. **L'objet reste-t-il dans sa zone utile ?** (16×16 entre 4 et 20)
3. **Le poids visuel est-il comparable aux autres ?**
4. **L'épaisseur principale est-elle bien à 1.5 ?**
5. **Les équerres sont-elles bien à 1 (plus fines) ?**
6. **À 24px, la signature reste-t-elle lisible ?**

Si l'une des 6 réponses est non, l'icône est rejetée.

---

## 11. Prompt template pour créer une nouvelle icône

À copier-coller dans Claude quand on veut produire une nouvelle icône :

```
Crée une icône SVG nommée "ncf-icon-{categorie}-{nom}" représentant {concept}.

Système NCF v2.0 — contraintes strictes :

STRUCTURE :
- viewBox="0 0 24 24", fill="none", stroke="currentColor"
- stroke-width="1.5" pour le dessin principal
- stroke-linecap="round" et stroke-linejoin="round"
- Aucune couleur en dur, jamais de fill (sauf petit disque de validation 1px max)

SIGNATURE OBLIGATOIRE (à inclure en premier dans le SVG) :
<path d="M 1 4 L 1 1 L 4 1" stroke-width="1"/>
<path d="M 20 23 L 23 23 L 23 20" stroke-width="1"/>

ZONE UTILE pour le dessin de l'objet :
- 16×16 pixels, entre x=4 et x=20, entre y=4 et y=20
- Ne JAMAIS toucher ou empiéter sur les équerres
- Garder au moins 1px de marge entre dessin et équerres

GÉOMÉTRIE :
- Coordonnées sur entiers ou demi-pixels uniquement
- Angles à 0°, 45°, 90° ou arcs circulaires libres
- Entre 2 et 5 éléments graphiques (sans compter les équerres)

MÉTAPHORE :
- Vocabulaire NCF : document, balance, sceau, méthode, conseil...
- Pas de cliché marketing (ampoule, fusée, cible, poignée de main)

COMMENTAIRE D'EN-TÊTE :
<!-- NCF Icon · {cat}/{nom} · v2.0 · 24×24 · moderne + équerres -->

Retourne uniquement le code SVG complet, prêt à coller dans un fichier .svg.
```

---

## 12. Anti-patterns à éviter

| Anti-pattern | Conséquence | À faire à la place |
|---|---|---|
| Oublier les équerres | Icône perd son identité NCF | Toujours commencer par les équerres |
| Équerres à la mauvaise taille | Cassent la cohérence | Strictement 3px de long, trait 1 |
| Dessin qui touche les équerres | Visuellement étouffé | Respecter la zone 16×16 |
| Trait principal à 2 ou plus | Trop épais, casse l'équilibre avec équerres | Strict 1.5 |
| Équerres aux 4 coins | Trop chargé, perd la subtilité | 2 équerres en angle opposé suffisent |
| Coordonnées à 3 décimales | Casse la grille | Snap sur entiers |
| Couleur en dur dans SVG | Impossible à thématiser | `stroke="currentColor"` |
| Plus de 5 éléments graphiques | Illisible à 24px | Simplifier la métaphore |
| Icône inférieure à 20px | Équerres perdent leur lisibilité | Utiliser un autre composant |

---

## 13. Évolution de la bibliothèque

Quand on étend la bibliothèque :

1. Toujours partir d'un besoin réel dans une page, pas d'un "il manquerait
   peut-être une icône pour X"
2. Refuser le doublon
3. Mettre à jour la démo HTML à chaque ajout
4. Versionner : si on modifie une icône existante, on incrémente la
   version dans le commentaire
5. Documenter la métaphore retenue pour chaque icône ajoutée

---

*Document v2.0 — système moderne + équerres signature*
*Tout changement majeur incrémente la version majeure (v3.0...)*
