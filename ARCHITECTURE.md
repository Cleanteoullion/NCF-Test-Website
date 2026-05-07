# Architecture du site NCF

Le site reste statique : les URLs publiques sont portées par les dossiers de pages, tandis que les fichiers partagés vivent dans `assets/`.

```txt
/
  index.html
  transmission/index.html
  valorisation-minoritaires/index.html
  creation-holding/index.html
  equipe/index.html
  partenaires/index.html
  ressources/
  mentions-legales/
  confidentialite/

  assets/
    css/
      global.css
      pages/
    js/
      site.js
      pages/
    img/
      brand/
      clients/
      team/

  api/
    contact.js

  _work/
    docs/
    prompts/
    prototypes/
```

## Conventions

- Garder les pages publiques a leur emplacement actuel pour préserver les URLs propres et le SEO.
- Mettre les styles communs dans `assets/css/global.css`.
- Mettre les styles propres a une page dans `assets/css/pages/<page>.css`, charge apres `global.css`.
- Mettre le JavaScript commun dans `assets/js/site.js`.
- Mettre les scripts propres a une page dans `assets/js/pages/<page>.js`.
- Ranger les images publiques par usage : `brand`, `team`, `clients`.
- Ranger les briefs, prompts et prototypes dans `_work/`; ce dossier n'est pas deploye sur Vercel.

## Ajouter une page

1. Créer le dossier public avec son `index.html`.
2. Charger `global.css`, puis un CSS de page seulement si necessaire.
3. Charger `site.js` avant `</body>`.
4. Ajouter la page dans `sitemap.xml` si elle doit etre indexee.
5. Utiliser des chemins absolus pour les assets publics, par exemple `/assets/img/brand/logo-ncf-bl-marine.png`.
