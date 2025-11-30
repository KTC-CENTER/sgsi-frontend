import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const GlobalSearch = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm.length < 2) {
      setResults([]);
      return;
    }

    const searchTimeout = setTimeout(() => {
      performSearch(searchTerm);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchTerm]);

  const performSearch = async (query) => {
    setLoading(true);
    
    // Simulation de recherche - À remplacer par un vrai appel API
    const mockResults = [
      // Élèves
      { type: 'student', id: 1, name: 'Jean KAMGA', class: 'Terminale C', matricule: '241050001', avatar: 'JK' },
      { type: 'student', id: 2, name: 'Marie NGONO', class: '3ème A', matricule: '241050012', avatar: 'MN' },
      
      // Enseignants
      { type: 'teacher', id: 1, name: 'M. MBIDA Paul', subject: 'Physique-Chimie', department: 'Sciences', avatar: 'MP' },
      { type: 'teacher', id: 2, name: 'Mme FOTSO Claire', subject: 'Comptabilité', department: 'Commerce', avatar: 'CF' },
      
      // Classes
      { type: 'class', id: 1, name: '6ème A', level: 'Premier Cycle', students: 48, capacity: 50 },
      { type: 'class', id: 2, name: 'Terminale D', level: 'Second Cycle', students: 38, capacity: 40 },
      
      // Matières
      { type: 'subject', id: 1, name: 'Mathématiques', code: 'MATH', coefficient: 4, teachers: 3 },
      { type: 'subject', id: 2, name: 'Français', code: 'FR', coefficient: 4, teachers: 2 },
      
      // Documents
      { type: 'document', id: 1, name: 'Programme Mathématiques Terminale C', category: 'Programme', date: '2024-09-01' },
      { type: 'document', id: 2, name: 'Emploi du temps 1er Trimestre', category: 'EDT', date: '2024-09-15' }
    ];

    const filtered = mockResults.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      (item.class && item.class.toLowerCase().includes(query.toLowerCase())) ||
      (item.matricule && item.matricule.includes(query)) ||
      (item.subject && item.subject.toLowerCase().includes(query.toLowerCase()))
    );

    setTimeout(() => {
      setResults(filtered);
      setLoading(false);
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelectResult(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSelectResult = (result) => {
    switch (result.type) {
      case 'student':
        navigate('/students');
        break;
      case 'teacher':
        navigate('/teachers');
        break;
      case 'class':
        navigate('/classes');
        break;
      case 'subject':
        navigate('/classes');
        break;
      default:
        break;
    }
    onClose();
    setSearchTerm('');
  };

  const getTypeIcon = (type) => {
    const icons = {
      student: '👤',
      teacher: '👨‍🏫',
      class: '🏛️',
      subject: '📚',
      document: '📄'
    };
    return icons[type] || '📌';
  };

  const getTypeLabel = (type) => {
    const labels = {
      student: 'Élève',
      teacher: 'Enseignant',
      class: 'Classe',
      subject: 'Matière',
      document: 'Document'
    };
    return labels[type] || type;
  };

  const getTypeColor = (type) => {
    const colors = {
      student: 'blue',
      teacher: 'purple',
      class: 'orange',
      subject: 'emerald',
      document: 'pink'
    };
    return colors[type] || 'gray';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-3xl z-[9999] px-4"
      >
        <div className="bg-slate-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Barre de recherche */}
          <div className="p-6 border-b border-white/10">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Rechercher élèves, enseignants, classes, matières..."
                className="w-full pl-14 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
              {loading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white/5 rounded">↑↓</kbd> Navigation
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white/5 rounded">Enter</kbd> Sélectionner
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white/5 rounded">Esc</kbd> Fermer
              </span>
            </div>
          </div>

          {/* Résultats */}
          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
            {searchTerm.length < 2 ? (
              <div className="p-12 text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-gray-400">Commencez à taper pour rechercher...</p>
              </div>
            ) : results.length === 0 && !loading ? (
              <div className="p-12 text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-400">Aucun résultat trouvé pour "{searchTerm}"</p>
              </div>
            ) : (
              <div className="p-2">
                {results.map((result, idx) => (
                  <motion.div
                    key={`${result.type}-${result.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleSelectResult(result)}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      selectedIndex === idx
                        ? 'bg-emerald-500/20 border border-emerald-500/50'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar/Icon */}
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${getTypeColor(result.type)}-500 to-${getTypeColor(result.type)}-600 flex items-center justify-center text-white font-bold shadow-lg`}>
                        {result.avatar || <span className="text-xl">{getTypeIcon(result.type)}</span>}
                      </div>

                      {/* Contenu */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-white truncate">{result.name}</h4>
                          <span className={`px-2 py-0.5 bg-${getTypeColor(result.type)}-500/20 text-${getTypeColor(result.type)}-400 rounded text-xs font-semibold`}>
                            {getTypeLabel(result.type)}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          {result.class && <span>📚 {result.class}</span>}
                          {result.matricule && <span>🆔 {result.matricule}</span>}
                          {result.subject && <span>📖 {result.subject}</span>}
                          {result.department && <span>🏛️ {result.department}</span>}
                          {result.level && <span>📊 {result.level}</span>}
                          {result.students !== undefined && <span>👥 {result.students}/{result.capacity}</span>}
                        </div>
                      </div>

                      {/* Flèche */}
                      <svg className={`w-5 h-5 text-gray-600 ${selectedIndex === idx ? 'text-emerald-400' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GlobalSearch;
