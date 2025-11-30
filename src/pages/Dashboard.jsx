import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = ({ user, onLogout }) => {
  const [stats, setStats] = useState({
    students: 1247,
    teachers: 87,
    classes: 42,
    subjects: 156
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'student', action: 'Nouveau élève inscrit', name: 'Marie KAMGA', time: 'Il y a 5 min', color: 'from-blue-500 to-indigo-500' },
    { id: 2, type: 'grade', action: 'Notes saisies', name: 'Mathématiques 3ème A', time: 'Il y a 12 min', color: 'from-emerald-500 to-cyan-500' },
    { id: 3, type: 'progression', action: 'Progression validée', name: 'Physique Terminale D', time: 'Il y a 23 min', color: 'from-purple-500 to-pink-500' },
    { id: 4, type: 'incident', action: 'Incident signalé', name: 'Retard enseignant', time: 'Il y a 1h', color: 'from-red-500 to-orange-500' },
  ]);

  // Données pour le graphique de tendance des inscriptions
  const enrollmentData = {
    labels: ['Sept', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév'],
    datasets: [
      {
        label: 'Inscriptions',
        data: [120, 145, 132, 168, 187, 203],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Données pour la répartition par classe
  const classDistribution = {
    labels: ['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Tle'],
    datasets: [
      {
        label: 'Effectif',
        data: [180, 175, 182, 168, 195, 187, 160],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(34, 211, 238, 0.8)',
        ],
      },
    ],
  };

  // Données pour le taux de réussite
  const successRate = {
    labels: ['Excellent', 'Bien', 'Passable', 'Échec'],
    datasets: [
      {
        data: [25, 45, 22, 8],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgb(156, 163, 175)',
          font: {
            family: "'Inter', sans-serif",
          }
        }
      },
    },
    scales: {
      y: {
        ticks: { color: 'rgb(156, 163, 175)' },
        grid: { color: 'rgba(255, 255, 255, 0.05)' }
      },
      x: {
        ticks: { color: 'rgb(156, 163, 175)' },
        grid: { color: 'rgba(255, 255, 255, 0.05)' }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgb(156, 163, 175)',
          font: {
            family: "'Inter', sans-serif",
          },
          padding: 20,
        }
      },
    },
  };

  return (
    <Layout user={user} onLogout={onLogout}>
      <div className="space-y-8">
        {/* En-tête avec salutation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Bonjour, <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">{user?.name || 'Administrateur'}</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Vue d'ensemble de l'établissement - Année scolaire 2024-2025
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl text-white font-semibold shadow-lg shadow-emerald-500/30 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Actions Rapides
          </motion.div>
        </motion.div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: 'Élèves Inscrits',
              value: stats.students,
              change: '+12%',
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ),
              gradient: 'from-blue-500 to-indigo-500',
              bgGradient: 'from-blue-500/10 to-indigo-500/10'
            },
            {
              label: 'Enseignants',
              value: stats.teachers,
              change: '+3',
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
              gradient: 'from-emerald-500 to-cyan-500',
              bgGradient: 'from-emerald-500/10 to-cyan-500/10'
            },
            {
              label: 'Classes',
              value: stats.classes,
              change: '+2',
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              ),
              gradient: 'from-purple-500 to-pink-500',
              bgGradient: 'from-purple-500/10 to-pink-500/10'
            },
            {
              label: 'Matières',
              value: stats.subjects,
              change: '+8',
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              ),
              gradient: 'from-orange-500 to-red-500',
              bgGradient: 'from-orange-500/10 to-red-500/10'
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.bgGradient} backdrop-blur-xl border border-white/10 p-6 group cursor-pointer`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 rounded-full -mr-16 -mt-16 blur-2xl transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-xl text-white shadow-lg`}>
                    {stat.icon}
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold">
                    {stat.change}
                  </span>
                </div>
                
                <p className="text-3xl font-bold text-white mb-1">
                  {stat.value.toLocaleString()}
                </p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tendance des inscriptions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-full"></div>
              Tendance des Inscriptions
            </h3>
            <div className="h-64">
              <Line data={enrollmentData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Taux de réussite */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></div>
              Taux de Réussite
            </h3>
            <div className="h-64">
              <Doughnut data={successRate} options={doughnutOptions} />
            </div>
          </motion.div>
        </div>

        {/* Répartition par classe et Activités récentes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Répartition par classe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></div>
              Répartition par Classe
            </h3>
            <div className="h-64">
              <Bar data={classDistribution} options={chartOptions} />
            </div>
          </motion.div>

          {/* Activités récentes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-400 to-red-400 rounded-full"></div>
              Activités Récentes
            </h3>
            <div className="space-y-4 max-h-64 overflow-y-auto custom-scrollbar">
              {recentActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                >
                  <div className={`p-2 bg-gradient-to-br ${activity.color} rounded-lg shrink-0 group-hover:scale-110 transition-transform`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white mb-1">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-400 truncate">
                      {activity.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Actions rapides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Actions Rapides</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Nouvel Élève', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', color: 'from-blue-500 to-indigo-500' },
              { label: 'Saisir Notes', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', color: 'from-emerald-500 to-cyan-500' },
              { label: 'Générer Bulletin', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'from-purple-500 to-pink-500' },
              { label: 'Voir Rapports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', color: 'from-orange-500 to-red-500' },
            ].map((action, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`p-6 bg-gradient-to-br ${action.color} rounded-xl text-white shadow-lg hover:shadow-2xl transition-all duration-300 group`}
              >
                <svg className="w-8 h-8 mb-3 mx-auto group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                </svg>
                <p className="text-sm font-semibold">{action.label}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgb(16, 185, 129), rgb(6, 182, 212));
          border-radius: 10px;
        }
      `}</style>
    </Layout>
  );
};

export default Dashboard;
