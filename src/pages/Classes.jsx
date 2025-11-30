import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';

const Classes = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('classes'); // 'classes', 'subjects', 'assignments'
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  
  const [classFormData, setClassFormData] = useState({
    name: '',
    level: 'premier_cycle',
    cycle: 'general',
    capacity: 50,
    mainTeacher: '',
    room: ''
  });

  const [subjectFormData, setSubjectFormData] = useState({
    name: '',
    code: '',
    coefficient: 1,
    category: 'core',
    level: '',
    hoursPerWeek: 2
  });

  const levels = {
    premier_cycle: ['6ème', '5ème', '4ème', '3ème'],
    second_cycle: ['2nde', '1ère', 'Terminale'],
    technique: ['1ère Année', '2ème Année', '3ème Année', '4ème Année']
  };

  const cycles = [
    { value: 'general', label: 'Enseignement Général' },
    { value: 'technique', label: 'Enseignement Technique' },
    { value: 'normal', label: 'Enseignement Normal' }
  ];

  const subjectCategories = [
    { value: 'core', label: 'Matière Principale', color: 'emerald' },
    { value: 'science', label: 'Sciences', color: 'blue' },
    { value: 'language', label: 'Langues', color: 'purple' },
    { value: 'arts', label: 'Arts & Sports', color: 'pink' },
    { value: 'technical', label: 'Technique', color: 'orange' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Simulation de données
      setClasses([
        {
          id: 1,
          name: '6ème A',
          level: 'premier_cycle',
          cycle: 'general',
          capacity: 50,
          enrolled: 48,
          mainTeacher: 'M. KAMGA Jean',
          room: 'Salle 101',
          subjects: ['Mathématiques', 'Français', 'Anglais', 'SVT', 'Histoire-Géo'],
          timetable: 'Lundi-Vendredi 7h30-15h30'
        },
        {
          id: 2,
          name: '3ème C',
          level: 'premier_cycle',
          cycle: 'general',
          capacity: 45,
          enrolled: 42,
          mainTeacher: 'Mme NGONO Marie',
          room: 'Salle 203',
          subjects: ['Mathématiques', 'Français', 'Anglais', 'Physique-Chimie', 'SVT'],
          timetable: 'Lundi-Vendredi 7h30-15h30'
        },
        {
          id: 3,
          name: 'Terminale D',
          level: 'second_cycle',
          cycle: 'general',
          capacity: 40,
          enrolled: 38,
          mainTeacher: 'M. MBIDA Paul',
          room: 'Salle 305',
          subjects: ['Mathématiques', 'Physique', 'Chimie', 'SVT', 'Philosophie'],
          timetable: 'Lundi-Samedi 7h30-15h30'
        },
        {
          id: 4,
          name: '2ème Année STT',
          level: 'technique',
          cycle: 'technique',
          capacity: 35,
          enrolled: 32,
          mainTeacher: 'Mme FOTSO Claire',
          room: 'Atelier 1',
          subjects: ['Comptabilité', 'Économie', 'Droit', 'Informatique'],
          timetable: 'Lundi-Samedi 7h30-16h00'
        }
      ]);

      setSubjects([
        { id: 1, name: 'Mathématiques', code: 'MATH', coefficient: 4, category: 'core', hoursPerWeek: 5, levels: ['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale'] },
        { id: 2, name: 'Français', code: 'FR', coefficient: 4, category: 'language', hoursPerWeek: 5, levels: ['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale'] },
        { id: 3, name: 'Anglais', code: 'ANG', coefficient: 3, category: 'language', hoursPerWeek: 4, levels: ['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale'] },
        { id: 4, name: 'Physique-Chimie', code: 'PC', coefficient: 4, category: 'science', hoursPerWeek: 4, levels: ['3ème', '2nde', '1ère', 'Terminale'] },
        { id: 5, name: 'SVT', code: 'SVT', coefficient: 3, category: 'science', hoursPerWeek: 3, levels: ['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale'] },
        { id: 6, name: 'Histoire-Géographie', code: 'HG', coefficient: 3, category: 'core', hoursPerWeek: 3, levels: ['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale'] },
        { id: 7, name: 'EPS', code: 'EPS', coefficient: 1, category: 'arts', hoursPerWeek: 2, levels: ['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale'] },
        { id: 8, name: 'Comptabilité', code: 'COMPTA', coefficient: 5, category: 'technical', hoursPerWeek: 6, levels: ['1ère Année', '2ème Année', '3ème Année', '4ème Année'] }
      ]);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClass = async (e) => {
    e.preventDefault();
    // Logique d'ajout de classe
    setShowAddClassModal(false);
    setClassFormData({
      name: '',
      level: 'premier_cycle',
      cycle: 'general',
      capacity: 50,
      mainTeacher: '',
      room: ''
    });
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    // Logique d'ajout de matière
    setShowAddSubjectModal(false);
    setSubjectFormData({
      name: '',
      code: '',
      coefficient: 1,
      category: 'core',
      level: '',
      hoursPerWeek: 2
    });
  };

  const getCategoryColor = (category) => {
    const cat = subjectCategories.find(c => c.value === category);
    return cat?.color || 'gray';
  };

  return (
    <Layout user={user} onLogout={onLogout}>
      <div className="space-y-6">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Classes</span> & Matières
            </h1>
            <p className="text-gray-400">
              Gestion de la structure pédagogique
            </p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-2"
        >
          <div className="flex gap-2">
            {[
              { id: 'classes', label: 'Classes', icon: '🏛️', count: classes.length },
              { id: 'subjects', label: 'Matières', icon: '📚', count: subjects.length },
              { id: 'assignments', label: 'Affectations', icon: '👨‍🏫', count: 0 }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <span className="text-2xl">{tab.icon}</span>
                <span>{tab.label}</span>
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs">{tab.count}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Contenu selon le tab actif */}
        <AnimatePresence mode="wait">
          {activeTab === 'classes' && (
            <motion.div
              key="classes"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Stats classes */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Classes', value: classes.length, icon: '🏛️', color: 'from-orange-500 to-red-500' },
                  { label: 'Élèves Total', value: classes.reduce((sum, c) => sum + c.enrolled, 0), icon: '👥', color: 'from-blue-500 to-indigo-500' },
                  { label: 'Taux Remplissage', value: '92%', icon: '📊', color: 'from-emerald-500 to-cyan-500' },
                  { label: 'Salles Utilisées', value: new Set(classes.map(c => c.room)).size, icon: '🚪', color: 'from-purple-500 to-pink-500' }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{stat.icon}</span>
                      <div className={`px-3 py-1 bg-gradient-to-r ${stat.color} rounded-lg text-white text-xs font-bold`}>
                        Actif
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Bouton ajouter classe */}
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddClassModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-orange-500/50 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nouvelle Classe
                </motion.button>
              </div>

              {/* Liste des classes */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {classes.map((classe, idx) => (
                  <motion.div
                    key={classe.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{classe.name}</h3>
                        <p className="text-gray-400 text-sm">{cycles.find(c => c.value === classe.cycle)?.label}</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white text-xl">
                        🎓
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="text-gray-300">{classe.enrolled} / {classe.capacity} élèves</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all"
                          style={{ width: `${(classe.enrolled / classe.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{classe.mainTeacher}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span>{classe.room}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs text-gray-500 mb-2">Matières ({classe.subjects.length})</p>
                      <div className="flex flex-wrap gap-1">
                        {classe.subjects.slice(0, 3).map((subject, i) => (
                          <span key={i} className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs">
                            {subject}
                          </span>
                        ))}
                        {classe.subjects.length > 3 && (
                          <span className="px-2 py-1 bg-white/10 text-gray-400 rounded text-xs">
                            +{classe.subjects.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'subjects' && (
            <motion.div
              key="subjects"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Bouton ajouter matière */}
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddSubjectModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-orange-500/50 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nouvelle Matière
                </motion.button>
              </div>

              {/* Liste des matières */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {subjects.map((subject, idx) => (
                  <motion.div
                    key={subject.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">{subject.name}</h3>
                        <p className="text-gray-400 text-sm">Code: {subject.code}</p>
                      </div>
                      <span className={`px-3 py-1 bg-${getCategoryColor(subject.category)}-500/20 text-${getCategoryColor(subject.category)}-400 rounded-lg text-xs font-semibold`}>
                        Coef. {subject.coefficient}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{subject.hoursPerWeek}h / semaine</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span>{subject.levels.length} niveaux</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs text-gray-500 mb-2">Niveaux</p>
                      <div className="flex flex-wrap gap-1">
                        {subject.levels.slice(0, 4).map((level, i) => (
                          <span key={i} className="px-2 py-1 bg-white/10 text-gray-300 rounded text-xs">
                            {level}
                          </span>
                        ))}
                        {subject.levels.length > 4 && (
                          <span className="px-2 py-1 bg-white/10 text-gray-400 rounded text-xs">
                            +{subject.levels.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'assignments' && (
            <motion.div
              key="assignments"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-12 text-center"
            >
              <svg className="w-24 h-24 mx-auto mb-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-white mb-4">Affectations Enseignants</h2>
              <p className="text-gray-400 max-w-md mx-auto">
                Module d'affectation des enseignants aux classes et matières - En cours de développement
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal ajout classe */}
      <AnimatePresence>
        {showAddClassModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddClassModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-slate-900 rounded-2xl border border-white/10 p-8 max-w-2xl w-full">
                <h2 className="text-2xl font-bold text-white mb-6">Nouvelle Classe</h2>
                <form onSubmit={handleAddClass} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Nom de la classe *</label>
                      <input
                        type="text"
                        required
                        value={classFormData.name}
                        onChange={(e) => setClassFormData({...classFormData, name: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                        placeholder="Ex: 6ème A"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Cycle *</label>
                      <select
                        value={classFormData.cycle}
                        onChange={(e) => setClassFormData({...classFormData, cycle: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                      >
                        {cycles.map(cycle => (
                          <option key={cycle.value} value={cycle.value}>{cycle.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Capacité *</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={classFormData.capacity}
                        onChange={(e) => setClassFormData({...classFormData, capacity: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Salle</label>
                      <input
                        type="text"
                        value={classFormData.room}
                        onChange={(e) => setClassFormData({...classFormData, room: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                        placeholder="Ex: Salle 101"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddClassModal(false)}
                      className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold"
                    >
                      Créer
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Classes;
