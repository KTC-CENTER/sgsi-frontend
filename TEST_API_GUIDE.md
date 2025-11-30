# 🧪 Guide de Test de l'API SGSI Cameroun

## 📋 Prérequis

1. Node.js installé (v16+)
2. Backend SGSI lancé
3. Credentials de test valides

## 🚀 Utilisation du Script de Test

### Méthode 1 : Avec configuration par défaut

```bash
# Dans le dossier sgsi-frontend
node test-api.js
```

Par défaut, le script teste :
- URL: `http://localhost:8000/api`
- Email: `admin@sgsi.cm`
- Password: `password`

### Méthode 2 : Avec variables d'environnement

```bash
# Configuration personnalisée
API_URL=http://172.80.6.5/api \
TEST_EMAIL=votre.email@sgsi.cm \
TEST_PASSWORD=votre_mot_de_passe \
node test-api.js
```

### Méthode 3 : Créer un fichier .env.test

```bash
# Créer .env.test
cat > .env.test << EOF
API_URL=http://localhost:8000/api
TEST_EMAIL=admin@sgsi.cm
TEST_PASSWORD=votre_mot_de_passe
EOF

# Utiliser avec dotenv
node -r dotenv/config test-api.js dotenv_config_path=.env.test
```

## 📊 Que teste le script ?

Le script teste **11 modules** de l'API :

1. ✅ **Connectivité** - Health check
2. ✅ **Documentation** - Swagger accessible
3. ✅ **Authentification** - Login + Token JWT
4. ✅ **Profil** - Récupération profil utilisateur
5. ✅ **Élèves** - Liste + Statistiques
6. ✅ **Enseignants** - Liste + Statistiques
7. ✅ **Classes** - Liste
8. ✅ **Matières** - Liste
9. ✅ **Progressions** - Liste
10. ✅ **Dashboard** - Stats + Charts
11. ✅ **Paramètres** - Settings + Année active

## 📝 Exemple de sortie

```
╔════════════════════════════════════════════════════════════╗
║         SGSI Cameroun - Test de l'API Backend             ║
╚════════════════════════════════════════════════════════════╝

ℹ URL API: http://localhost:8000/api
ℹ Email test: admin@sgsi.cm

1. Test de connectivité
============================================================
✓ Health Check - Status: 200

2. Test de la documentation
============================================================
✓ Documentation Swagger - Status: 200

3. Test d'authentification
============================================================
✓ Login - Status: 200
✓ Token JWT reçu: eyJhbGciOiJIUzI1NiIs...

4. Test du profil utilisateur
============================================================
✓ Get Profile - Status: 200

...

╔════════════════════════════════════════════════════════════╗
║                     RÉSULTATS DES TESTS                    ║
╚════════════════════════════════════════════════════════════╝

Total tests   : 15
✓ Réussis     : 15
✗ Échoués     : 0
Taux de succès: 100.0%

✓ Tous les tests sont passés ! L'API est prête. ✓
```

## 🔍 Interprétation des résultats

### ✅ Tous les tests passés (100%)
- L'API fonctionne parfaitement
- Vous pouvez lancer le frontend
- Les endpoints sont compatibles

### ⚠️ 50-99% de réussite
- Certains modules ne sont pas implémentés
- Vérifiez les endpoints qui ont échoué
- Adaptez le service API si nécessaire

### ❌ Moins de 50% de réussite
- Problème de connexion au backend
- Vérifiez que le backend est lancé
- Vérifiez l'URL et les credentials
- Consultez les logs du backend

## 🛠️ Dépannage

### Erreur: "ECONNREFUSED"
```
✗ Health Check - connect ECONNREFUSED 127.0.0.1:8000
```

**Solution:**
- Vérifiez que le backend est lancé
- Vérifiez le port (8000 par défaut)
- Essayez une autre URL

### Erreur: 401 Unauthorized
```
✗ Login - Status: 401 - Invalid credentials
```

**Solution:**
- Vérifiez l'email et le mot de passe
- Créez un compte de test dans le backend
- Vérifiez que l'authentification fonctionne

### Erreur: 404 Not Found
```
✗ Liste des élèves - Status: 404 - Not found
```

**Solution:**
- L'endpoint n'existe pas ou a un nom différent
- Vérifiez la documentation Swagger
- Adaptez les endpoints dans `src/services/api.js`

## 📚 Après les tests

### Si tous les tests passent:

1. **Mettez à jour .env**
   ```bash
   VITE_API_URL=http://localhost:8000/api
   ```

2. **Lancez le frontend**
   ```bash
   npm run dev
   ```

3. **Connectez-vous**
   - Ouvrez http://localhost:3000
   - Utilisez vos credentials
   - Le token sera stocké automatiquement

### Si certains tests échouent:

1. **Identifiez les endpoints problématiques**
   - Notez les endpoints qui retournent 404
   - Consultez la documentation Swagger

2. **Adaptez le service API**
   - Ouvrez `src/services/api.js`
   - Modifiez les URLs des endpoints
   - Exemple: `/students` → `/api/v1/eleves`

3. **Retestez**
   ```bash
   node test-api.js
   ```

## 🔧 Personnalisation du script

Pour tester d'autres endpoints, modifiez `test-api.js` :

```javascript
// Ajouter un test personnalisé
log.section('12. Test personnalisé');

await testEndpoint(
  'Mon endpoint',
  'GET',
  '/mon-endpoint',
  null,
  authHeaders
);
```

## 📞 Support

Si vous rencontrez des problèmes:

1. Vérifiez les logs du backend
2. Consultez `API_INTEGRATION_COMPLETE.md`
3. Vérifiez la documentation Swagger
4. Contactez l'équipe backend

## ✅ Checklist

- [ ] Backend lancé
- [ ] Credentials de test créés
- [ ] Script de test exécuté
- [ ] Résultats analysés
- [ ] .env mis à jour
- [ ] Frontend testé
- [ ] Connexion réussie

---

**Bon test ! 🚀**
