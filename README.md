# FruityFix

Jeu de plateau sur la culture numérique, conçu pour tourner en local sur un **Raspberry Pi** sans connexion internet.

Les joueurs évoluent sur un plateau physique et scannent des QR codes qui déclenchent des défis interactifs sur leur téléphone. Un animateur gère la partie depuis l'interface admin.

---

## Stack

- [Next.js 15](https://nextjs.org) (App Router) + React 19
- Tailwind CSS v4
- Persistance JSON locale (pas de base de données)
- Docker — image publiée sur GHCR via GitHub Actions

## Lancer en développement

```bash
cd fruityfix
npm install
npm run dev
```

L'application est accessible sur [http://localhost:3000](http://localhost:3000).

## Build Docker

```bash
docker build -t fruityfix .
docker run -p 3000:3000 fruityfix
```

L'image est également buildée et publiée automatiquement sur GHCR à chaque push sur `main`.

## Déploiement sur Raspberry Pi

1. Configurer le Pi en point d'accès WiFi
2. Installer Docker sur le Pi
3. Puller et lancer l'image :

```bash
docker pull ghcr.io/<owner>/fruityfix:latest
docker run -d -p 80:3000 --restart unless-stopped ghcr.io/<owner>/fruityfix:latest
```

4. Les joueurs se connectent au WiFi du Pi et ouvrent le navigateur — aucune connexion internet requise.

## Structure

```
src/app/
├── page.js              → Accueil / sélection du joueur
├── game/                → Vue joueur (scores, état de partie)
├── defi/[slug]/         → Pages de défis (déclenchées par QR code)
├── admin/               → Interface admin (gestion joueurs & points)
└── api/                 → Routes API (état, scores, défis)

data/
├── game.json            → État de la partie en cours
└── defis/               → Fichiers de configuration des défis
```

## Avancement

Voir [ROADMAP.md](./ROADMAP.md).
