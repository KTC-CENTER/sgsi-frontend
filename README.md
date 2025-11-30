# 🎓 SGSI Cameroun - Frontend

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2-61dafb.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)
![License](https://img.shields.io/badge/license-Proprietary-red.svg)

**Système de Gestion Scolaire Intégré - Interface Utilisateur Moderne**

Une interface révolutionnaire pour la gestion scolaire au Cameroun, combinant design afro-moderne, performance et ergonomie exceptionnelle.

---

## ✨ Caractéristiques

### 🎨 Design Révolutionnaire
- **Afro-Modernisme Luxe** : Design inspiré des motifs géométriques africains modernisés
- **Animations Fluides** : Transitions et micro-interactions avec Framer Motion
- **Glass Morphism** : Effets de verre dépoli et backdrop blur
- **Responsive Total** : Adapté mobile, tablette et desktop
- **Mode Sombre** : Interface optimisée pour réduire la fatigue visuelle

### 🚀 Technologies de Pointe
- **React 18** avec hooks modernes
- **Tailwind CSS 3.4** avec configuration custom
- **Vite** pour un build ultra-rapide
- **Chart.js** pour les visualisations de données
- **Framer Motion** pour les animations
- **React Router v6** pour la navigation

### 🎯 Modules Inclus
1. **Dashboard** - Vue d'ensemble avec analytics en temps réel
2. **Gestion des Élèves** - CRUD complet avec recherche avancée
3. **Gestion des Enseignants** - Profils et affectations
4. **Classes & Matières** - Organisation pédagogique
5. **Progressions** ⭐ - Suivi pédagogique innovant
6. **Évaluations** - Gestion des examens et devoirs
7. **Notes** - Saisie et validation des notes
8. **Rapports** - Bulletins et documents officiels
9. **Incidents** ⭐ - Signalement et justification
10. **Communications** - Multi-canal (SMS, Email, WhatsApp)
11. **Paramètres** - Configuration système

---

## 📋 Prérequis

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 ou **yarn** >= 1.22.0
- **Navigateur moderne** (Chrome, Firefox, Safari, Edge)

---

## 🚀 Installation

### 1. Cloner le projet
```bash
cd sgsi-frontend
```

### 2. Installer les dépendances
```bash
npm install
# ou
yarn install
```

### 3. Configuration de l'API
Créer un fichier `.env` à la racine :
```env
VITE_API_URL=http://172.80.6.5/api
VITE_APP_NAME=SGSI Cameroun
VITE_APP_VERSION=2.0.0
```

### 4. Lancer le serveur de développement
```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible sur : **http://localhost:3000**

---

## 🏗️ Structure du Projet

```
sgsi-frontend/
├── public/              # Fichiers statiques
├── src/
│   ├── components/      # Composants réutilisables
│   │   └── Layout.jsx   # Layout principal avec sidebar
│   ├── pages/           # Pages de l'application
│   │   ├── Login.jsx    # Page de connexion
│   │   ├── Dashboard.jsx # Tableau de bord
│   │   ├── Students.jsx # Gestion élèves
│   │   └── ...
│   ├── App.jsx          # Composant racine
│   ├── main.jsx         # Point d'entrée
│   └── index.css        # Styles globaux
├── index.html           # Template HTML
├── package.json         # Dépendances
├── vite.config.js       # Configuration Vite
├── tailwind.config.js   # Configuration Tailwind
└── postcss.config.js    # Configuration PostCSS
```

---

## 🎨 Système de Design

### Couleurs Principales
- **Emerald** : `#10b981` - Actions positives
- **Cyan** : `#06b6d4` - Informations
- **Blue** : `#3b82f6` - Navigation
- **Indigo** : `#6366f1` - Accentuation
- **Purple** : `#a855f7` - Spécial
- **Pink** : `#ec4899` - Alertes importantes

### Typographie
- **Titre** : Poppins (700-900)
- **Texte** : Poppins (300-600)
- **Display** : Playfair Display (pour accents)

### Espacements
- Base : 4px (Tailwind par défaut)
- Container : max-width responsive
- Padding section : 6-8 (24-32px)

---

## 📱 Pages Principales

### 1. Login (`/login`)
- Design révolutionnaire avec motifs africains
- Authentification sécurisée
- Animation de particules flottantes

### 2. Dashboard (`/dashboard`)
- Statistiques en temps réel
- Graphiques interactifs (Line, Bar, Doughnut)
- Activités récentes
- Actions rapides

### 3. Students (`/students`)
- Liste avec recherche et filtres
- Modal d'ajout avec formulaire complet
- Cartes élèves avec avatars générés
- Actions CRUD complètes

### 4. Autres modules
Tous les modules suivent le même pattern de design pour une cohérence totale.

---

## 🔧 Commandes Disponibles

```bash
# Développement
npm run dev              # Lancer le serveur de dev

# Production
npm run build            # Build pour production
npm run preview          # Prévisualiser le build

# Qualité du code
npm run lint             # Vérifier le code
```

---

## 🌐 API Integration

L'application communique avec l'API backend via :

**Base URL** : `http://172.80.6.5/api`
**Documentation** : `http://172.80.6.5/api/docs`

### Endpoints Principaux
- `POST /auth/login` - Authentification
- `GET /students` - Liste des élèves
- `POST /students` - Créer un élève
- `GET /teachers` - Liste des enseignants
- `GET /dashboard/stats` - Statistiques dashboard

### Authentification
Utilise JWT Bearer Token stocké dans `localStorage` :
```javascript
headers: {
  'Authorization': `Bearer ${token}`
}
```

---

## 🎭 Fonctionnalités Avancées

### Mode Hors Ligne
- PWA ready (Progressive Web App)
- Cache des données essentielles
- Synchronisation automatique au retour du réseau

### Animations
- Transitions de page fluides
- Micro-interactions sur les boutons
- Loading states élégants
- Hover effects sophistiqués

### Responsive Design
- **Mobile** : < 640px
- **Tablet** : 640px - 1024px
- **Desktop** : > 1024px
- **Large** : > 1536px

---

## 🔒 Sécurité

- Protection CSRF
- Sanitization des inputs
- Validation côté client et serveur
- Headers de sécurité (CSP, CORS)
- JWT avec expiration
- HTTPS obligatoire en production

---

## 📦 Build & Déploiement

### Build de production
```bash
npm run build
```
Les fichiers optimisés seront dans le dossier `dist/`

### Déploiement
Compatible avec :
- **Vercel** (recommandé)
- **Netlify**
- **AWS S3 + CloudFront**
- **Nginx** (serveur statique)
- **Docker**

### Docker
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🐛 Dépannage

### Problème : Port 3000 déjà utilisé
```bash
# Changer le port dans vite.config.js
server: { port: 3001 }
```

### Problème : Erreur de connexion API
Vérifier que l'API backend est accessible et que les CORS sont configurés.

### Problème : Build échoue
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📄 License

**Propriétaire** - MINESEC Cameroun © 2025

Ce logiciel est la propriété du Ministère des Enseignements Secondaires du Cameroun. Toute utilisation, reproduction ou distribution non autorisée est strictement interdite.

---

## 👥 Équipe

**Développement** : Équipe Technique SGSI
**Design** : Studio Afro-Modern Design
**Product Owner** : MINESEC Cameroun

---

## 📞 Support

Pour toute question ou problème :
- **Email** : support@sgsi.cm
- **Documentation** : https://docs.sgsi.cm
- **Status** : https://status.sgsi.cm

---

## 🎉 Changelog

### Version 2.0.0 (Novembre 2025)
- ✨ Nouveau design afro-moderne révolutionnaire
- 🚀 Migration vers React 18 et Vite
- 📊 Dashboard avec analytics avancés
- 🎨 Animations Framer Motion
- 📱 Full responsive mobile-first
- ⚡ Performance optimisée (90+ Lighthouse)
- 🔒 Sécurité renforcée

### Version 1.0.0
- 🎯 Version initiale

---

**Made with ❤️ for Cameroonian Education** 🇨🇲
