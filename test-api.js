#!/usr/bin/env node

/**
 * Script de test API pour SGSI Cameroun
 * 
 * Usage:
 *   node test-api.js
 * 
 * Ce script teste la connectivité avec l'API backend
 * et vérifie les endpoints disponibles.
 */

const axios = require('axios');

// Configuration
const API_BASE_URL = process.env.API_URL || 'http://172.80.6.5/api';
const TEST_EMAIL = process.env.TEST_EMAIL || 'admin@sgsi.cm';
const TEST_PASSWORD = process.env.TEST_PASSWORD || 'Admin@2024!';

// Couleurs pour le terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.cyan}${msg}${colors.reset}\n${'='.repeat(60)}`)
};

// État du test
let token = null;
let results = {
  total: 0,
  passed: 0,
  failed: 0
};

// Fonction de test générique
async function testEndpoint(name, method, url, data = null, headers = {}) {
  results.total++;
  
  try {
    const config = {
      method,
      url: `${API_BASE_URL}${url}`,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    results.passed++;
    log.success(`${name} - Status: ${response.status}`);
    return { success: true, data: response.data };
  } catch (error) {
    results.failed++;
    if (error.response) {
      log.error(`${name} - Status: ${error.response.status} - ${error.response.data.message || 'Error'}`);
    } else {
      log.error(`${name} - ${error.message}`);
    }
    return { success: false, error };
  }
}

// Tests
async function runTests() {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║         SGSI Cameroun - Test de l'API Backend             ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
  
  log.info(`URL API: ${API_BASE_URL}`);
  log.info(`Email test: ${TEST_EMAIL}`);
  
  // Test 1: Santé de l'API
  log.section('1. Test de connectivité');
  
  const healthCheck = await testEndpoint(
    'Health Check',
    'GET',
    '/health'
  );
  
  if (!healthCheck.success) {
    // Essayer endpoint alternatif
    await testEndpoint(
      'Health Check (alt)',
      'GET',
      '/'
    );
  }
  
  // Test 2: Documentation
  log.section('2. Test de la documentation');
  
  await testEndpoint(
    'Documentation Swagger',
    'GET',
    '/docs'
  );
  
  // Test 3: Authentification
  log.section('3. Test d\'authentification');
  
  const loginResult = await testEndpoint(
    'Login',
    'POST',
    '/auth/login',
    { email: TEST_EMAIL, password: TEST_PASSWORD }
  );
  
  if (loginResult.success) {
    token = loginResult.data.token || loginResult.data.access_token;
    if (token) {
      log.success(`Token JWT reçu: ${token.substring(0, 20)}...`);
    } else {
      log.warning('Token non trouvé dans la réponse');
      console.log('Réponse:', JSON.stringify(loginResult.data, null, 2));
    }
  }
  
  if (!token) {
    log.error('Impossible de continuer sans token. Tests suivants ignorés.');
    printResults();
    return;
  }
  
  const authHeaders = {
    'Authorization': `Bearer ${token}`
  };
  
  // Test 4: Profil utilisateur
  log.section('4. Test du profil utilisateur');
  
  await testEndpoint(
    'Get Profile',
    'GET',
    '/auth/profile',
    null,
    authHeaders
  );
  
  // Test 5: Élèves
  log.section('5. Test du module Élèves');
  
  await testEndpoint(
    'Liste des élèves',
    'GET',
    '/students?page=1&per_page=10',
    null,
    authHeaders
  );
  
  await testEndpoint(
    'Statistiques élèves',
    'GET',
    '/students/stats',
    null,
    authHeaders
  );
  
  // Test 6: Enseignants
  log.section('6. Test du module Enseignants');
  
  await testEndpoint(
    'Liste des enseignants',
    'GET',
    '/teachers?page=1&per_page=10',
    null,
    authHeaders
  );
  
  await testEndpoint(
    'Statistiques enseignants',
    'GET',
    '/teachers/stats',
    null,
    authHeaders
  );
  
  // Test 7: Classes
  log.section('7. Test du module Classes');
  
  await testEndpoint(
    'Liste des classes',
    'GET',
    '/classes?page=1&per_page=10',
    null,
    authHeaders
  );
  
  // Test 8: Matières
  log.section('8. Test du module Matières');
  
  await testEndpoint(
    'Liste des matières',
    'GET',
    '/subjects?page=1&per_page=10',
    null,
    authHeaders
  );
  
  // Test 9: Progressions
  log.section('9. Test du module Progressions');
  
  await testEndpoint(
    'Liste des progressions',
    'GET',
    '/progressions?page=1&per_page=10',
    null,
    authHeaders
  );
  
  // Test 10: Dashboard
  log.section('10. Test du Dashboard');
  
  await testEndpoint(
    'Statistiques dashboard',
    'GET',
    '/dashboard/stats',
    null,
    authHeaders
  );
  
  await testEndpoint(
    'Données graphiques',
    'GET',
    '/dashboard/charts',
    null,
    authHeaders
  );
  
  // Test 11: Paramètres
  log.section('11. Test des Paramètres');
  
  await testEndpoint(
    'Paramètres système',
    'GET',
    '/settings',
    null,
    authHeaders
  );
  
  await testEndpoint(
    'Année scolaire active',
    'GET',
    '/settings/active-year',
    null,
    authHeaders
  );
  
  // Résultats
  printResults();
}

function printResults() {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                     RÉSULTATS DES TESTS                    ║
╚════════════════════════════════════════════════════════════╝
  `);
  
  const passRate = ((results.passed / results.total) * 100).toFixed(1);
  
  console.log(`Total tests   : ${results.total}`);
  console.log(`${colors.green}✓ Réussis${colors.reset}     : ${results.passed}`);
  console.log(`${colors.red}✗ Échoués${colors.reset}     : ${results.failed}`);
  console.log(`Taux de succès: ${passRate}%\n`);
  
  if (results.passed === results.total) {
    log.success('Tous les tests sont passés ! L\'API est prête. ✓');
  } else if (results.passed > results.total / 2) {
    log.warning('Certains tests ont échoué. Vérifiez les endpoints.');
  } else {
    log.error('La plupart des tests ont échoué. Vérifiez la configuration de l\'API.');
  }
  
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                   PROCHAINES ÉTAPES                        ║
╚════════════════════════════════════════════════════════════╝

1. Si des tests ont échoué:
   - Vérifiez que le backend est lancé
   - Vérifiez l'URL de l'API (${API_BASE_URL})
   - Vérifiez les credentials (${TEST_EMAIL})
   - Consultez les logs du backend

2. Si tous les tests sont passés:
   - Mettez à jour le fichier .env avec l'URL API
   - Lancez le frontend: npm run dev
   - Connectez-vous avec vos vraies credentials

3. Pour plus d'informations:
   - Consultez API_INTEGRATION_COMPLETE.md
   - Consultez la documentation Swagger: ${API_BASE_URL}/docs
  `);
}

// Lancer les tests
runTests().catch(error => {
  log.error(`Erreur fatale: ${error.message}`);
  process.exit(1);
});
