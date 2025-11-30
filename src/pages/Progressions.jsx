import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';

const Progressions = ({ user, onLogout }) => {
  const [progressions, setProgressions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('list');
  const [selectedProgression, setSelectedProgression] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchProgressions();
  }, []);

  const fetchProgressions = async () => {
    setLoading(true);
    setTimeout(() => {
      setProgressions([
        {
          id: 1,
          teacher: 'M. KAMGA Jean',
          subject: 'Mathématiques',
          class: 'Terminale C',
          year: '2024-2025',
          trimester: 1,
          status: 'validated',
          completedLessons: 24,
          totalLessons: 36,
          progress: 67,
          validatedBy: 'M. ATEBA (Censeur)',
          validatedAt: '2024-10-15',
          lessons: [
            { id: 1, title: 'Nombres complexes', duration: 4, completed: true, date: '2024-09-05' },
            { id: 2, title: 'Limites et continuité', duration: 6, completed: true, date: '2024-09-12' },
            { id: 3, title: 'Dérivabilité', duration: 8, completed: true, date: '2024-09-20' },
            { id: 4, title: 'Primitives', duration: 6, completed: true, date: '2024-10-01' },
            { id: 5, title: 'Intégrales', duration: 8, completed: false, date: null }
          ]
        },
        {
          id: 2,
          teacher: 'Mme NGONO Marie',
          subject: 'Français',
          class: '3ème A',
          year: '2024-2025',
          trimester: 1,
          status: 'pending',
          completedLessons: 20,
          totalLessons: 32,
          progress: 63,
          submittedAt: '2024-11-20',
          lessons: []
        },
        {
          id: 3,
          teacher: 'M. MBIDA Paul',
          subject: 'Physique-Chimie',
          class: 'Terminale D',
          year: '2024-2025',
          trimester: 1,
          status: 'rejected',
          completedLessons: 0,
          totalLessons: 28,
          progress: 0,
          rejectionReason: 'Programme non conforme au référentiel MINESEC. Veuillez revoir les chapitres 3 et 5.',
          rejectedBy: 'M. ATEBA (Censeur)',
          rejectedAt: '2024-11-22',
          lessons: []
        },
        {
          id: 4,
          teacher: 'M. ESSONO Thomas',
          subject: 'SVT',
          class: '1ère D',
          year: '2024-2025',
          trimester: 1,
          status: 'draft',
          completedLessons: 0,
          totalLessons: 30,
          progress: 0,
          lastModified: '2024-11-25',
          lessons: []
        },
        {
          id: 5,
          teacher: 'Mme FOTSO Claire',
          subject: 'Anglais',
          class: '2nde A',
          year: '2024-2025',
          trimester: 1,
          status: 'pending',
          completedLessons: 18,
          totalLessons: 30,
          progress: 60,
          submittedAt: '2024-11-23',
          lessons: []
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    const colors = {
      draft: 'gray',
      pending: 'yellow',
      validated: 'emerald',
      rejected: 'red'
    };
    return colors[status] || 'gray';
  };

  const getStatusLabel = (status) => {
    const labels = {
      draft: 'Brouillon',
      pending: 'En attente',
      validated: 'Validée',
      rejected: 'Rejetée'
    };
    return labels[status] || status;
  };

  const getStatusIcon = (status) => {
    const icons = {
      draft: '📝',
      pending: '⏳',
      validated: '✅',
      rejected: '❌'
    };
    return icons[status] || '📄';
  };

  const filteredProgressions = progressions.filter(prog => {
    const matchesSearch = 
      prog.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prog.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prog.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || prog.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: progressions.length,
    validated: progressions.filter(p => p.status === 'validated').length,
    pending: progressions.filter(p => p.status === 'pending').length,
    draft: progressions.filter(p => p.status === 'draft').length,
    rejected: progressions.filter(p => p.status === 'rejected').length,
    avgProgress: progressions.length > 0 
      ? Math.round(progressions.reduce((acc, p) => acc + p.progress, 0) / progressions.length)
      : 0
  };

  const handleViewDetails = (progression) => {
    setSelectedProgression(progression);
    setShowDetailModal(true);
  };

  const handleValidate = (id) => {
    setProgressions(progressions.map(p => 
      p.id === id ? { ...p, status: 'validated', validatedBy: 'M. ATEBA', validatedAt: new Date().toISOString().split('T')[0] } : p
    ));
    setShowDetailModal(false);
  };

  const handleReject = (id) => {
    const reason = prompt('Motif du rejet:');
    if (reason) {
      setProgressions(progressions.map(p => 
        p.id === id ? { ...p, status: 'rejected', rejectedBy: 'M. ATEBA', rejectedAt: new Date().toISOString().split('T')[0], rejectionReason: reason } : p
      ));
    }
    setShowDetailModal(false);
  };

  const tabs = [
    { id: 'list', label: 'Mes Progressions', icon: '📚' },
    { id: 'create', label: 'Créer', icon: '➕' },
    { id: 'validation', label: 'À Valider', icon: '✓', badge: stats.pending },
    { id: 'tracking', label: 'Pointage', icon: '📊' }
  ];

  return (
    <Layout user={user} onLogout={onLogout}>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-white mb-2">
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Progressions
            </span>{' '}
            Pédagogiques ⭐
          </h1>
          <p className="text-gray-400">Gestion et suivi innovant des enseignements conformes MINESEC</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Total', value: stats.total, icon: '📚', color: 'blue' },
            { label: 'Validées', value: stats.validated, icon: '✅', color: 'emerald' },
            { label: 'En Attente', value: stats.pending, icon: '⏳', color: 'yellow' },
            { label: 'Brouillons', value: stats.draft, icon: '📝', color: 'gray' },
            { label: 'Rejetées', value: stats.rejected, icon: '❌', color: 'red' },
            { label: 'Taux Moyen', value: `${stats.avgProgress}%`, icon: '📊', color: 'teal' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge > 0 && (
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-bold">{tab.badge}</span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'list' && (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher..."
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none"
                  >
                    <option value="all">Tous</option>
                    <option value="draft">Brouillons</option>
                    <option value="pending">En attente</option>
                    <option value="validated">Validées</option>
                    <option value="rejected">Rejetées</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredProgressions.map((prog, idx) => (
                  <motion.div
                    key={prog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleViewDetails(prog)}
                    className="bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 cursor-pointer"
                  >
                    <div className="flex justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{prog.subject}</h3>
                        <p className="text-gray-400">{prog.class}</p>
                      </div>
                      <span className={`px-3 py-1 bg-${getStatusColor(prog.status)}-500/20 text-${getStatusColor(prog.status)}-400 rounded-lg text-sm font-semibold`}>
                        {getStatusIcon(prog.status)} {getStatusLabel(prog.status)}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4">{prog.teacher}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Progression</span>
                        <span className="text-teal-400 font-semibold">
                          {prog.completedLessons}/{prog.totalLessons} leçons
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2 rounded-full"
                          style={{ width: `${prog.progress}%` }}
                        />
                      </div>
                      <div className="text-right text-xs text-gray-500">{prog.progress}%</div>
                    </div>
                    {prog.status === 'rejected' && prog.rejectionReason && (
                      <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="text-red-400 text-sm"><strong>Rejet:</strong> {prog.rejectionReason}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'create' && (
            <motion.div key="create" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 rounded-xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Créer une Progression</h2>
              <p className="text-gray-400">Fonctionnalité en développement...</p>
            </motion.div>
          )}

          {activeTab === 'validation' && (
            <motion.div key="validation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {progressions.filter(p => p.status === 'pending').map(prog => (
                <div key={prog.id} className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-2">{prog.subject} - {prog.class}</h3>
                  <p className="text-gray-400 mb-4">{prog.teacher}</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleValidate(prog.id)}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold"
                    >
                      ✓ Valider
                    </button>
                    <button 
                      onClick={() => handleReject(prog.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold"
                    >
                      ✕ Rejeter
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'tracking' && (
            <motion.div key="tracking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 rounded-xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Pointage des Leçons</h2>
              <p className="text-gray-400">Fonctionnalité en développement...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default Progressions;
