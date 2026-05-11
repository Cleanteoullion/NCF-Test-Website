# Notes projet

## Domaine SEO canonique

Les balises SEO et le sitemap utilisent le domaine canonique :

```txt
https://novances-evaluation.fr
```

Si le domaine canonique change, remplacer cette URL dans :

- `sitemap.xml`
- `robots.txt`
- les balises `canonical`
- les balises Open Graph `og:url` / `og:image`
- les données structurées JSON-LD

Commande utile pour repérer les occurrences :

```txt
Select-String -Path *.html,*\index.html,ressources\*\index.html,robots.txt,sitemap.xml -Pattern "https://novances-evaluation.fr"
```

## Organisation

Les conventions de dossiers sont décrites dans `ARCHITECTURE.md`.
