import axios from 'axios';

// Configuration de base de l'API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://172.80.6.5/api';

// Créer une instance axios avec configuration de base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 secondes
});

// Intercepteur pour ajouter le token JWT à chaque requête
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erreur HTTP avec réponse du serveur
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Token expiré ou invalide - rediriger vers login
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
          window.location.href = '/login';
          break;
        case 403:
          // Accès interdit
          console.error('Accès refusé:', data.message);
          break;
        case 404:
          console.error('Ressource non trouvée:', data.message);
          break;
        case 422:
          // Erreur de validation
          console.error('Erreur de validation:', data.errors);
          break;
        case 500:
          console.error('Erreur serveur:', data.message);
          break;
        default:
          console.error('Erreur API:', data.message);
      }
      
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Requête envoyée mais pas de réponse
      console.error('Pas de réponse du serveur');
      return Promise.reject({ message: 'Impossible de contacter le serveur' });
    } else {
      // Erreur lors de la configuration de la requête
      console.error('Erreur de configuration:', error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

// ==================== AUTHENTIFICATION ====================

export const authAPI = {
  // Connexion
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    // Structure de réponse: { token, user: { id, email, nom, prenom, fullName, roles, etablissement } }
    return response.data;
  },
  
  // Déconnexion
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
  
  // Rafraîchir le token
  refreshToken: async () => {
    const response = await apiClient.post('/auth/refresh');
    return response.data;
  },
  
  // Profil utilisateur
  getProfile: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
  
  // Changer mot de passe
  changePassword: async (data) => {
    const response = await apiClient.put('/auth/change-password', data);
    return response.data;
  },
};

// ==================== ÉLÈVES ====================

export const elevesAPI = {
  // Lister avec filtres
  getAll: async (params = {}) => {
    const response = await apiClient.get('/eleves', { params });
    return response.data;
  },
  
  // Obtenir un élève par ID
  getById: async (id) => {
    const response = await apiClient.get(`/eleves/${id}`);
    return response.data;
  },
  
  // Créer un élève
  create: async (data) => {
    const response = await apiClient.post('/eleves', data);
    return response.data;
  },
  
  // Mettre à jour un élève
  update: async (id, data) => {
    const response = await apiClient.put(`/eleves/${id}`, data);
    return response.data;
  },
  
  // Supprimer un élève
  delete: async (id) => {
    const response = await apiClient.delete(`/eleves/${id}`);
    return response.data;
  },
  
  // Import Excel
  importExcel: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post('/eleves/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  
  // Export Excel
  exportExcel: async (params = {}) => {
    const response = await apiClient.get('/eleves/export', {
      params,
      responseType: 'blob'
    });
    return response.data;
  },
  
  // Statistiques
  getStats: async (params = {}) => {
    const response = await apiClient.get('/eleves/stats', { params });
    return response.data;
  },
};

// ==================== ENSEIGNANTS ====================

export const teachersAPI = {
  // Lister avec filtres
  getAll: async (params = {}) => {
    const response = await apiClient.get('/teachers', { params });
    return response.data;
  },
  
  // Obtenir un enseignant par ID
  getById: async (id) => {
    const response = await apiClient.get(`/teachers/${id}`);
    return response.data;
  },
  
  // Créer un enseignant
  create: async (data) => {
    const response = await apiClient.post('/teachers', data);
    return response.data;
  },
  
  // Mettre à jour un enseignant
  update: async (id, data) => {
    const response = await apiClient.put(`/teachers/${id}`, data);
    return response.data;
  },
  
  // Supprimer un enseignant
  delete: async (id) => {
    const response = await apiClient.delete(`/teachers/${id}`);
    return response.data;
  },
  
  // Import Excel
  importExcel: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post('/teachers/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  
  // Export Excel
  exportExcel: async (params = {}) => {
    const response = await apiClient.get('/teachers/export', {
      params,
      responseType: 'blob'
    });
    return response.data;
  },
  
  // Statistiques
  getStats: async () => {
    const response = await apiClient.get('/teachers/stats');
    return response.data;
  },
  
  // Emploi du temps
  getTimetable: async (teacherId, params = {}) => {
    const response = await apiClient.get(`/teachers/${teacherId}/timetable`, { params });
    return response.data;
  },
};

// ==================== CLASSES ====================

export const classesAPI = {
  // Lister avec filtres
  getAll: async (params = {}) => {
    const response = await apiClient.get('/classes', { params });
    return response.data;
  },
  
  // Obtenir une classe par ID
  getById: async (id) => {
    const response = await apiClient.get(`/classes/${id}`);
    return response.data;
  },
  
  // Créer une classe
  create: async (data) => {
    const response = await apiClient.post('/classes', data);
    return response.data;
  },
  
  // Mettre à jour une classe
  update: async (id, data) => {
    const response = await apiClient.put(`/classes/${id}`, data);
    return response.data;
  },
  
  // Supprimer une classe
  delete: async (id) => {
    const response = await apiClient.delete(`/classes/${id}`);
    return response.data;
  },
  
  // Élèves d'une classe
  geteleves: async (classId, params = {}) => {
    const response = await apiClient.get(`/classes/${classId}/eleves`, { params });
    return response.data;
  },
  
  // Emploi du temps
  getTimetable: async (classId, params = {}) => {
    const response = await apiClient.get(`/classes/${classId}/timetable`, { params });
    return response.data;
  },
  
  // Statistiques
  getStats: async (classId) => {
    const response = await apiClient.get(`/classes/${classId}/stats`);
    return response.data;
  },
};

// ==================== MATIÈRES ====================

export const subjectsAPI = {
  // Lister toutes les matières
  getAll: async (params = {}) => {
    const response = await apiClient.get('/subjects', { params });
    return response.data;
  },
  
  // Obtenir une matière par ID
  getById: async (id) => {
    const response = await apiClient.get(`/subjects/${id}`);
    return response.data;
  },
  
  // Créer une matière
  create: async (data) => {
    const response = await apiClient.post('/subjects', data);
    return response.data;
  },
  
  // Mettre à jour une matière
  update: async (id, data) => {
    const response = await apiClient.put(`/subjects/${id}`, data);
    return response.data;
  },
  
  // Supprimer une matière
  delete: async (id) => {
    const response = await apiClient.delete(`/subjects/${id}`);
    return response.data;
  },
};

// ==================== PROGRESSIONS ====================

export const progressionsAPI = {
  // Lister avec filtres
  getAll: async (params = {}) => {
    const response = await apiClient.get('/progressions', { params });
    return response.data;
  },
  
  // Obtenir une progression par ID
  getById: async (id) => {
    const response = await apiClient.get(`/progressions/${id}`);
    return response.data;
  },
  
  // Créer une progression
  create: async (data) => {
    const response = await apiClient.post('/progressions', data);
    return response.data;
  },
  
  // Mettre à jour une progression
  update: async (id, data) => {
    const response = await apiClient.put(`/progressions/${id}`, data);
    return response.data;
  },
  
  // Supprimer une progression
  delete: async (id) => {
    const response = await apiClient.delete(`/progressions/${id}`);
    return response.data;
  },
  
  // Valider une progression
  validate: async (id, data) => {
    const response = await apiClient.post(`/progressions/${id}/validate`, data);
    return response.data;
  },
  
  // Rejeter une progression
  reject: async (id, data) => {
    const response = await apiClient.post(`/progressions/${id}/reject`, data);
    return response.data;
  },
  
  // Pointage des leçons
  markLesson: async (progressionId, lessonId, data) => {
    const response = await apiClient.post(
      `/progressions/${progressionId}/lessons/${lessonId}/mark`,
      data
    );
    return response.data;
  },
  
  // Export PDF
  exportPDF: async (id) => {
    const response = await apiClient.get(`/progressions/${id}/export`, {
      responseType: 'blob'
    });
    return response.data;
  },
};

// ==================== ÉVALUATIONS ====================

export const evaluationsAPI = {
  // Lister avec filtres
  getAll: async (params = {}) => {
    const response = await apiClient.get('/evaluations', { params });
    return response.data;
  },
  
  // Obtenir une évaluation par ID
  getById: async (id) => {
    const response = await apiClient.get(`/evaluations/${id}`);
    return response.data;
  },
  
  // Créer une évaluation
  create: async (data) => {
    const response = await apiClient.post('/evaluations', data);
    return response.data;
  },
  
  // Mettre à jour une évaluation
  update: async (id, data) => {
    const response = await apiClient.put(`/evaluations/${id}`, data);
    return response.data;
  },
  
  // Supprimer une évaluation
  delete: async (id) => {
    const response = await apiClient.delete(`/evaluations/${id}`);
    return response.data;
  },
  
  // Saisir les notes
  enterGrades: async (evaluationId, data) => {
    const response = await apiClient.post(`/evaluations/${evaluationId}/grades`, data);
    return response.data;
  },
};

// ==================== NOTES ====================

export const gradesAPI = {
  // Lister avec filtres
  getAll: async (params = {}) => {
    const response = await apiClient.get('/grades', { params });
    return response.data;
  },
  
  // Notes d'un élève
  getByStudent: async (studentId, params = {}) => {
    const response = await apiClient.get(`/eleves/${studentId}/grades`, { params });
    return response.data;
  },
  
  // Notes d'une classe
  getByClass: async (classId, params = {}) => {
    const response = await apiClient.get(`/classes/${classId}/grades`, { params });
    return response.data;
  },
  
  // Créer/Mettre à jour une note
  upsert: async (data) => {
    const response = await apiClient.post('/grades', data);
    return response.data;
  },
  
  // Valider les notes
  validate: async (data) => {
    const response = await apiClient.post('/grades/validate', data);
    return response.data;
  },
  
  // Export Excel
  exportExcel: async (params = {}) => {
    const response = await apiClient.get('/grades/export', {
      params,
      responseType: 'blob'
    });
    return response.data;
  },
};

// ==================== BULLETINS ====================

export const reportsAPI = {
  // Générer un bulletin
  generate: async (studentId, params) => {
    const response = await apiClient.get(`/eleves/${studentId}/report`, {
      params,
      responseType: 'blob'
    });
    return response.data;
  },
  
  // Générer bulletins d'une classe
  generateBulk: async (classId, params) => {
    const response = await apiClient.get(`/classes/${classId}/reports`, {
      params,
      responseType: 'blob'
    });
    return response.data;
  },
  
  // Historique des bulletins
  getHistory: async (studentId) => {
    const response = await apiClient.get(`/eleves/${studentId}/reports/history`);
    return response.data;
  },
};

// ==================== DISCIPLINE & INCIDENTS ====================

export const disciplineAPI = {
  // Lister avec filtres
  getAll: async (params = {}) => {
    const response = await apiClient.get('/incidents', { params });
    return response.data;
  },
  
  // Obtenir un incident par ID
  getById: async (id) => {
    const response = await apiClient.get(`/incidents/${id}`);
    return response.data;
  },
  
  // Créer un incident
  create: async (data) => {
    const response = await apiClient.post('/incidents', data);
    return response.data;
  },
  
  // Mettre à jour un incident
  update: async (id, data) => {
    const response = await apiClient.put(`/incidents/${id}`, data);
    return response.data;
  },
  
  // Supprimer un incident
  delete: async (id) => {
    const response = await apiClient.delete(`/incidents/${id}`);
    return response.data;
  },
  
  // Statistiques
  getStats: async (params = {}) => {
    const response = await apiClient.get('/incidents/stats', { params });
    return response.data;
  },
};

// ==================== POINTAGE & PRÉSENCE ====================

export const attendanceAPI = {
  // Pointage du jour
  getDailyAttendance: async (params) => {
    const response = await apiClient.get('/attendance/daily', { params });
    return response.data;
  },
  
  // Enregistrer le pointage
  markAttendance: async (data) => {
    const response = await apiClient.post('/attendance', data);
    return response.data;
  },
  
  // Historique d'un élève
  getStudentHistory: async (studentId, params = {}) => {
    const response = await apiClient.get(`/eleves/${studentId}/attendance`, { params });
    return response.data;
  },
  
  // Statistiques
  getStats: async (params = {}) => {
    const response = await apiClient.get('/attendance/stats', { params });
    return response.data;
  },
  
  // Export
  exportExcel: async (params = {}) => {
    const response = await apiClient.get('/attendance/export', {
      params,
      responseType: 'blob'
    });
    return response.data;
  },
};

// ==================== DASHBOARD ====================

export const dashboardAPI = {
  // Statistiques générales
  getStats: async (params = {}) => {
    const response = await apiClient.get('/dashboard/stats', { params });
    return response.data;
  },
  
  // Graphiques
  getCharts: async (params = {}) => {
    const response = await apiClient.get('/dashboard/charts', { params });
    return response.data;
  },
  
  // Activités récentes
  getRecentActivities: async (params = {}) => {
    const response = await apiClient.get('/dashboard/activities', { params });
    return response.data;
  },
  
  // Alertes
  getAlerts: async () => {
    const response = await apiClient.get('/dashboard/alerts');
    return response.data;
  },
};

// ==================== COMMUNICATIONS ====================

export const communicationsAPI = {
  // Envoyer un message
  send: async (data) => {
    const response = await apiClient.post('/communications/send', data);
    return response.data;
  },
  
  // Historique
  getHistory: async (params = {}) => {
    const response = await apiClient.get('/communications/history', { params });
    return response.data;
  },
  
  // Templates
  getTemplates: async () => {
    const response = await apiClient.get('/communications/templates');
    return response.data;
  },
};

// ==================== PARAMÈTRES ====================

export const settingsAPI = {
  // Obtenir les paramètres
  get: async () => {
    const response = await apiClient.get('/settings');
    return response.data;
  },
  
  // Mettre à jour les paramètres
  update: async (data) => {
    const response = await apiClient.put('/settings', data);
    return response.data;
  },
  
  // Année scolaire active
  getActiveYear: async () => {
    const response = await apiClient.get('/settings/active-year');
    return response.data;
  },
};

export default apiClient;
