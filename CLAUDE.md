# FruityFix — Contexte projet

## Vision

Jeu de plateau physique sur la culture numérique, destiné à apprendre aux joueurs à utiliser le numérique via des défis interactifs.
Les joueurs évoluent sur un plateau physique et scannent des QR codes qui déclenchent des **pages web de défi** sur leur téléphone.

## Infrastructure cible

- Tourne sur un **Raspberry Pi** configuré en point d'accès WiFi local.
- Servi via un **container Docker** (image publiée sur GHCR via GitHub Actions).
- **Zéro connexion internet requise** — tout le trafic reste sur le réseau local du Raspberry Pi.
- Les joueurs se connectent au WiFi du Pi, ouvrent leur navigateur et accèdent à l'application.

## Stack technique

- **Next.js 15** (App Router) + **React 19**
- **Tailwind CSS v4**
- Persistance : fichier JSON (`data/game.json`) — suffisant pour un usage local mono-session
- Pas de base de données externe, pas d'authentification

## Architecture des routes

```
/                        → Page d'accueil / sélection du joueur
/game                    → Vue principale du joueur (scores, état)
/defi/[slug]             → Page de défi déclenchée par QR code
/admin                   → Interface admin (sans protection — réseau local fermé)
/api/game                → GET/POST état global de la partie
/api/defi/[slug]         → GET définition d'un défi
/api/score               → POST mise à jour du score d'un joueur
```

## Flux joueur

1. Le joueur se connecte au WiFi du Pi et ouvre le navigateur.
2. Il s'identifie sur la page d'accueil (sélection dans la liste des joueurs créés par l'admin).
3. Son identité est stockée localement (cookie ou localStorage).
4. Il scanne un QR code sur le plateau → atterrit sur `/defi/[slug]`.
5. Il réalise le défi sur son téléphone.
6. Le résultat est envoyé : auto-validé pour QCM/V-F/texte, ou mis en attente de validation admin pour les défis physiques.

## Types de défis

Chaque défi est une **page web interactive** construite sur mesure. Quatre grandes familles :

| Type | Validation | Exemples |
|---|---|---|
| **QCM** | Automatique | "Lequel de ces mots de passe est sécurisé ?" |
| **Vrai / Faux** | Automatique | "Un email peut contenir un virus — Vrai ou Faux ?" |
| **Saisie libre** | Automatique ou admin | Répondre à une question ouverte |
| **Défi physique** | Admin valide manuellement | Envoyer un vrai email, scanner un QR code, retrouver un paramètre dans les réglages de son téléphone |

Les défis sont définis dans des fichiers de configuration (ex. `data/defis/`) et chaque fichier correspond à un slug/QR code unique.

## Interface admin (`/admin`)

Pas de protection (réseau local fermé). L'admin peut :

- Créer / supprimer des joueurs
- Attribuer ou retirer des points manuellement à n'importe quel joueur
- Valider les défis physiques en attente
- Voir l'état de la partie (idle / playing / paused / over)
- Démarrer, mettre en pause, réinitialiser la partie

## Modèle de données (game.json)

```json
{
  "gameState": "idle",
  "players": [
    { "id": "uuid", "name": "Alice", "score": 0 }
  ],
  "pendingValidations": [
    { "id": "uuid", "playerId": "uuid", "defiSlug": "envoyer-un-mail", "submittedAt": "ISO8601" }
  ]
}
```

## Conventions de code

- App Router Next.js : toujours utiliser les Server Components par défaut, `"use client"` uniquement si nécessaire.
- Pas de bibliothèque de gestion d'état externe (pas de Redux, Zustand) — `GameContext` suffit pour l'état global.
- Tailwind CSS uniquement pour le style — pas de CSS-in-JS, pas de modules CSS.
- Les défis sont dans `src/app/defi/[slug]/page.js` ; chaque slug correspond à un fichier de config dans `data/defis/[slug].json`.
- Pas de commentaires inutiles dans le code.

## Contraintes importantes

- **Offline first** : aucune ressource externe (CDN, Google Fonts, etc.). Tout doit être bundlé.
- **Mobile first** : les pages joueur sont conçues pour un écran de téléphone vertical.
- **Robustesse** : le JSON doit rester valide même si le serveur redémarre en cours de partie.
- **Simplicité** : pas de sur-ingénierie. Un fichier JSON suffit, pas besoin de SQLite ou autre.
