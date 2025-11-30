# 🚀 Guide de Démarrage Rapide - SGSI Cameroun

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║    ███████╗ ██████╗ ███████╗██╗                              ║
║    ██╔════╝██╔════╝ ██╔════╝██║                              ║
║    ███████╗██║  ███╗███████╗██║                              ║
║    ╚════██║██║   ██║╚════██║██║                              ║
║    ███████║╚██████╔╝███████║██║                              ║
║    ╚══════╝ ╚═════╝ ╚══════╝╚═╝                              ║
║                                                               ║
║         Système de Gestion Scolaire Intégré                  ║
║              🇨🇲 Cameroun v2.0 🇨🇲                             ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

## ⚡ Installation en 3 minutes

### Option 1 : Setup Automatique (Recommandé)
```bash
cd sgsi-frontend
chmod +x setup.sh
./setup.sh
```

### Option 2 : Installation Manuelle
```bash
# 1. Installer les dépendances
npm install

# 2. Copier la configuration
cp .env.example .env

# 3. Démarrer l'application
npm run dev
```

## 🎯 Accès Rapide

Une fois démarré, accédez à :
- **Frontend** : http://localhost:3000
- **API Backend** : http://172.80.6.5/api
- **API Docs** : http://172.80.6.5/api/docs

## 🔐 Identifiants de Test

Pour tester l'application, utilisez :
```
Email    : admin@sgsi.cm
Password : Admin123!
```

## 📱 Fonctionnalités Principales

### ✅ Modules Disponibles
- [x] Dashboard avec analytics
- [x] Gestion des élèves
- [x] Gestion des enseignants
- [x] Classes et matières
- [x] Progressions pédagogiques ⭐ NEW
- [x] Évaluations et notes
- [x] Bulletins et rapports
- [x] Signalement d'incidents ⭐ NEW
- [x] Communications multi-canal
- [x] Paramètres et configuration

### 🎨 Design Highlights
- ✨ Interface afro-moderne luxueuse
- 🎭 Animations fluides avec Framer Motion
- 📱 Responsive mobile-first
- 🌙 Mode sombre optimisé
- ⚡ Performance 90+ Lighthouse

## 🛠️ Commandes Utiles

```bash
# Développement
npm run dev          # Démarrer en mode développement

# Production
npm run build        # Build optimisé
npm run preview      # Prévisualiser le build

# Maintenance
npm install          # Réinstaller les dépendances
npm run lint         # Vérifier le code
```

## 📊 Structure des Données

### Format Matricule Élève (9 chiffres)
```
YY T RR NNNN
│  │ │  └─── Numéro séquentiel (0001-9999)
│  │ └────── Code région (01-10)
│  └──────── Type établissement (1-5)
└─────────── Année d'inscription (24 = 2024)

Exemple : 241050001
         ↓
         24 = 2024
         1  = Lycée Général
         05 = Région Littoral
         0001 = Premier élève
```

### Régions du Cameroun
```
01 - Adamaoua       06 - Nord
02 - Centre         07 - Nord-Ouest
03 - Est            08 - Ouest
04 - Extrême-Nord   09 - Sud
05 - Littoral       10 - Sud-Ouest
```

## 🎓 Cycles Scolaires

### Enseignement Général
```
Premier Cycle  : 6ème → 5ème → 4ème → 3ème (BEPC)
Second Cycle   : 2nde → 1ère → Terminale (Bac A, C, D)
```

### Enseignement Technique
```
Premier Cycle  : 1ère → 2ème → 3ème → 4ème Année (CAP)
Second Cycle   : 2nde → 1ère → Terminale (Bac Tech)
BTS           : 1ère → 2ème → 3ème → 4ème Année
```

## 🔧 Résolution de Problèmes

### Problème : Port 3000 occupé
```bash
# Changer le port
VITE_DEV_PORT=3001 npm run dev
```

### Problème : Erreur de connexion API
```bash
# Vérifier que l'API est accessible
curl http://172.80.6.5/api

# Vérifier les CORS dans l'API backend
```

### Problème : Build échoue
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run build
```

## 📚 Documentation Complète

Pour plus de détails, consultez :
- **README.md** - Documentation complète
- **ARCHITECTURE.md** - Architecture technique
- **API_INTEGRATION.md** - Guide d'intégration API

## 🎯 Prochaines Étapes

1. **Explorer le Dashboard**
   - Vue d'ensemble des statistiques
   - Graphiques interactifs
   - Activités récentes

2. **Ajouter des Élèves**
   - Aller dans "Gestion des Élèves"
   - Cliquer sur "Nouvel Élève"
   - Remplir le formulaire complet

3. **Gérer les Progressions** ⭐
   - Module innovant de suivi pédagogique
   - Fiches de progression par matière
   - Pointage des leçons en temps réel

4. **Signaler des Incidents** ⭐
   - Nouveau module pour le personnel
   - Justification des absences/retards
   - Upload de pièces justificatives

## 💡 Conseils Pro

### Performance
- Utilisez Chrome DevTools pour le debugging
- Activez le mode PWA pour l'offline
- Optimisez les images avant upload

### Design
- Respectez le système de couleurs défini
- Utilisez les composants Tailwind custom
- Suivez les guidelines du design system

### Sécurité
- Ne committez jamais le fichier .env
- Utilisez HTTPS en production
- Validez toutes les entrées utilisateur

## 📞 Support

**Email** : support@sgsi.cm
**Documentation** : https://docs.sgsi.cm
**Status** : https://status.sgsi.cm

---

## 🎉 C'est Parti !

```bash
npm run dev
```

Ouvrez http://localhost:3000 et découvrez le futur de la gestion scolaire au Cameroun ! 🚀

---

**Made with ❤️ for Cameroonian Education** 🇨🇲

Version 2.0.0 | Novembre 2025 | Confidentiel - MINESEC
