import React from 'react';
import { motion } from 'framer-motion';

const AdvancedStats = ({ data }) => {
  const stats = {
    academicYear: '2024-2025',
    totalStudents: 1247,
    totalTeachers: 87,
    totalClasses: 42,
    averageClassSize: 29.7,
    teacherStudentRatio: '1:14',
    attendanceRate: 94.5,
    passRate: 87.3,
    disciplineIncidents: 12,
    activeProgressions: 156
  };

  const performanceByLevel = [
    { level: 'Premier Cycle', students: 720, passRate: 89.2, avgScore: 13.5, trend: 'up' },
    { level: 'Second Cycle', students: 527, passRate: 84.8, avgScore: 12.8, trend: 'stable' }
  ];

  const topPerformers = [
    { name: '3ème A', average: 14.8, capacity: 45, enrolled: 44 },
    { name: 'Terminale C', average: 14.2, capacity: 40, enrolled: 38 },
    { name: '1ère D', average: 13.9, capacity: 40, enrolled: 39 }
  ];

  const alerts = [
    { type: 'warning', message: 'Taux d\'absentéisme élevé en 4ème B', count: 8 },
    { type: 'info', message: 'Progressions en attente de validation', count: 5 },
    { type: 'success', message: 'Objectifs trimestriels atteints', count: 1 }
  ];

  const getTrendIcon = (trend) => {
    if (trend === 'up') return '📈';
    if (trend === 'down') return '📉';
    return '➡️';
  };

  const getAlertColor = (type) => {
    if (type === 'warning') return 'yellow';
    if (type === 'success') return 'emerald';
    return 'blue';
  };

  return (
    <div className="space-y-6">
      {/* KPIs Principaux */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[
          { label: 'Taux de Présence', value: `${stats.attendanceRate}%`, icon: '✅', color: 'emerald', target: '95%' },
          { label: 'Taux de Réussite', value: `${stats.passRate}%`, icon: '🎯', color: 'blue', target: '90%' },
          { label: 'Ratio Ens./Élève', value: stats.teacherStudentRatio, icon: '👥', color: 'purple' },
          { label: 'Effectif Moyen', value: stats.averageClassSize, icon: '📊', color: 'orange' },
          { label: 'Incidents', value: stats.disciplineIncidents, icon: '⚠️', color: 'red', status: stats.disciplineIncidents < 15 ? 'good' : 'bad' }
        ].map((kpi, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{kpi.icon}</span>
              {kpi.target && (
                <span className="text-xs text-gray-500">
                  Cible: {kpi.target}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-white mb-1">{kpi.value}</div>
            <div className="text-xs text-gray-400">{kpi.label}</div>
            {kpi.status && (
              <div className={`mt-2 h-1 rounded-full ${kpi.status === 'good' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Performance par cycle */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">📚</span>
          Performance par Cycle
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {performanceByLevel.map((level, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 rounded-xl p-4 border border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-white">{level.level}</h4>
                <span className="text-2xl">{getTrendIcon(level.trend)}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Effectif</span>
                  <span className="text-white font-semibold">{level.students} élèves</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Taux de réussite</span>
                  <span className="text-emerald-400 font-semibold">{level.passRate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Moyenne générale</span>
                  <span className="text-blue-400 font-semibold">{level.avgScore}/20</span>
                </div>
              </div>
              <div className="mt-3 w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full transition-all"
                  style={{ width: `${level.passRate}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">🏆</span>
          Meilleures Classes
        </h3>
        <div className="space-y-3">
          {topPerformers.map((classe, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                idx === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                idx === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500' :
                'bg-gradient-to-br from-orange-400 to-red-500'
              }`}>
                {idx + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white mb-1">{classe.name}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>Moyenne: <strong className="text-emerald-400">{classe.average}/20</strong></span>
                  <span>•</span>
                  <span>{classe.enrolled}/{classe.capacity} élèves</span>
                </div>
              </div>
              <div className="text-2xl">
                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Alertes et Notifications */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">🔔</span>
          Alertes et Notifications
        </h3>
        <div className="space-y-3">
          {alerts.map((alert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`flex items-center gap-4 p-4 bg-${getAlertColor(alert.type)}-500/10 border border-${getAlertColor(alert.type)}-500/30 rounded-xl`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${getAlertColor(alert.type)}-500/20`}>
                {alert.type === 'warning' && '⚠️'}
                {alert.type === 'success' && '✅'}
                {alert.type === 'info' && 'ℹ️'}
              </div>
              <div className="flex-1">
                <p className={`text-${getAlertColor(alert.type)}-400 font-medium`}>
                  {alert.message}
                </p>
              </div>
              <span className={`px-3 py-1 bg-${getAlertColor(alert.type)}-500/30 text-${getAlertColor(alert.type)}-300 rounded-full text-sm font-bold`}>
                {alert.count}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Comparaison Trimestrielle */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">📈</span>
          Évolution Trimestrielle
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { trimester: '1er Trimestre', avgScore: 12.3, passRate: 85.1, status: 'completed' },
            { trimester: '2ème Trimestre', avgScore: 13.1, passRate: 87.3, status: 'current' },
            { trimester: '3ème Trimestre', avgScore: '-', passRate: '-', status: 'upcoming' }
          ].map((trim, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border ${
                trim.status === 'current' 
                  ? 'bg-emerald-500/10 border-emerald-500/30' 
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-white">{trim.trimester}</h4>
                {trim.status === 'current' && (
                  <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded">
                    En cours
                  </span>
                )}
                {trim.status === 'completed' && (
                  <span className="text-emerald-400">✓</span>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Moyenne</span>
                  <span className="text-white font-semibold">{trim.avgScore}/20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Réussite</span>
                  <span className="text-white font-semibold">{trim.passRate}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedStats;
