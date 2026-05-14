# FruityFix — Avancement du projet

## État actuel : Socle technique ✓

---

## Phase 1 — Socle technique
> Objectif : avoir une base solide pour construire dessus.

- [x] Projet Next.js 15 / React 19 / Tailwind CSS v4
- [x] `GameContext` — état global (joueurs, gameState)
- [x] API `GET /api/game` + `POST /api/game` (persistance JSON)
- [x] Dockerfile (Node 20, build standalone)
- [x] Pipeline GitHub Actions → build & push GHCR (multi-arch amd64/arm64/arm/v7)
- [x] `CLAUDE.md` — contexte projet pour l'IA

---

## Phase 2 — Gestion de partie (admin + joueurs)
> Objectif : pouvoir démarrer une vraie partie avec de vrais joueurs.

- [ ] Page d'accueil joueur — sélection d'identité (cookie/localStorage)
- [ ] Interface admin `/admin`
  - [ ] Créer / supprimer des joueurs
  - [ ] Attribuer / retirer des points manuellement
  - [ ] Contrôle de la partie (démarrer / pause / reset)
- [ ] Vue joueur `/game` — scores en temps réel, état de la partie
- [ ] Modèle de données étendu (`pendingValidations`)

---

## Phase 3 — Système de défis
> Objectif : les QR codes déclenchent des pages de défi interactives.

- [ ] Structure des fichiers de config (`data/defis/[slug].json`)
- [ ] Route dynamique `/defi/[slug]`
- [ ] Types de défis implémentés :
  - [ ] QCM
  - [ ] Vrai / Faux
  - [ ] Saisie libre
  - [ ] Défi physique (soumission + validation admin)
- [ ] API `/api/score` — mise à jour de score depuis un défi
- [ ] File d'attente de validations admin pour les défis physiques
- [ ] Génération / affichage des QR codes pour chaque défi

---

## Phase 4 — Contenu
> Objectif : remplir le jeu avec des défis sur les thématiques numériques.

- [ ] Définir les thématiques (ex. sécurité, email, réseaux sociaux, vie privée…)
- [ ] Écrire les premiers défis par thématique
- [ ] Lier les défis aux cases du plateau physique (plan QR codes)

---

## Phase 5 — Finitions & déploiement Pi
> Objectif : le jeu tourne sans accroc sur le Raspberry Pi en conditions réelles.

- [ ] Vérifier l'absence de ressources externes (offline first)
- [ ] Test complet sur Raspberry Pi (WiFi AP + Docker)
- [ ] Optimisation mobile (UI joueur pensée pour écran vertical)
- [ ] Documentation de déploiement Pi (README mise à jour)
