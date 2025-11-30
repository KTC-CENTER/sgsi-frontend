import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate, formatPhoneNumber, calculateAge } from '../utils/helpers';

const TeacherDetailModal = ({ teacher, isOpen, onClose, onEdit, onDelete }) => {
  if (!teacher) return null;

  const getStatusColor = (status) => {
    const colors = {
      permanent: 'emerald',
      contract: 'blue',
      temporary: 'yellow',
      on_leave: 'orange',
      suspended: 'red'
    };
    return colors[status] || 'gray';
  };

  const getStatusLabel = (status) => {
    const labels = {
      permanent: 'Permanent',
      contract: 'Contractuel',
      temporary: 'Temporaire',
      on_leave: 'En congé',
      suspended: 'Suspendu'
    };
    return labels[status] || status;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-slate-900 rounded-2xl border border-white/10 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
              {/* En-tête */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                    {teacher.firstName?.[0]}{teacher.lastName?.[0]}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-1">
                      {teacher.firstName} {teacher.lastName}
                    </h2>
                    <p className="text-gray-400">{teacher.qualification} • {teacher.specialization}</p>
                    <span className={`inline-block mt-2 px-3 py-1 bg-${getStatusColor(teacher.status)}-500/20 text-${getStatusColor(teacher.status)}-400 rounded-lg text-sm font-semibold`}>
                      {getStatusLabel(teacher.status)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Contenu principal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informations personnelles */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Informations Personnelles
                  </h3>
                  <div className="space-y-3">
                    <InfoRow label="Email" value={teacher.email} icon="✉️" />
                    <InfoRow label="Téléphone" value={formatPhoneNumber(teacher.phone)} icon="📱" />
                    <InfoRow label="Date de naissance" value={teacher.dateOfBirth ? formatDate(teacher.dateOfBirth) : 'N/A'} icon="🎂" />
                    {teacher.dateOfBirth && (
                      <InfoRow label="Âge" value={`${calculateAge(teacher.dateOfBirth)} ans`} icon="👤" />
                    )}
                    <InfoRow label="Lieu de naissance" value={teacher.placeOfBirth || 'N/A'} icon="📍" />
                    <InfoRow label="Sexe" value={teacher.gender === 'M' ? 'Masculin' : 'Féminin'} icon="👥" />
                    <InfoRow label="Adresse" value={teacher.address || 'N/A'} icon="🏠" />
                  </div>
                </div>

                {/* Informations professionnelles */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Informations Professionnelles
                  </h3>
                  <div className="space-y-3">
                    <InfoRow label="Qualification" value={teacher.qualification} icon="🎓" />
                    <InfoRow label="Spécialisation" value={teacher.specialization} icon="📚" />
                    <InfoRow label="Département" value={teacher.department} icon="🏛️" />
                    <InfoRow label="Grade" value={teacher.grade} icon="⭐" />
                    <InfoRow label="Date de prise de service" value={teacher.dateOfJoining ? formatDate(teacher.dateOfJoining) : 'N/A'} icon="📅" />
                  </div>
                </div>

                {/* Matières enseignées */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Matières Enseignées
                  </h3>
                  {teacher.subjects && teacher.subjects.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {teacher.subjects.map((subject, idx) => (
                        <span key={idx} className="px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-semibold">
                          {subject}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">Aucune matière assignée</p>
                  )}
                </div>

                {/* Classes assignées */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Classes Assignées
                  </h3>
                  {teacher.classes && teacher.classes.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {teacher.classes.map((classe, idx) => (
                        <span key={idx} className="px-3 py-2 bg-orange-500/20 text-orange-400 rounded-lg text-sm font-semibold">
                          {classe}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">Aucune classe assignée</p>
                  )}
                </div>
              </div>

              {/* Contact d'urgence */}
              {(teacher.emergencyContact || teacher.emergencyPhone) && (
                <div className="mt-6 bg-red-500/10 rounded-xl p-6 border border-red-500/30">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Contact d'Urgence
                  </h3>
                  <div className="space-y-2">
                    <InfoRow label="Nom" value={teacher.emergencyContact || 'N/A'} />
                    <InfoRow label="Téléphone" value={teacher.emergencyPhone ? formatPhoneNumber(teacher.emergencyPhone) : 'N/A'} />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => onEdit(teacher)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Modifier
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet enseignant ?')) {
                      onDelete(teacher.id);
                    }
                  }}
                  className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Supprimer
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold transition-all"
                >
                  Fermer
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const InfoRow = ({ label, value, icon }) => (
  <div className="flex items-start gap-3">
    {icon && <span className="text-lg mt-0.5">{icon}</span>}
    <div className="flex-1">
      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
      <p className="text-sm text-white font-medium">{value}</p>
    </div>
  </div>
);

export default TeacherDetailModal;
