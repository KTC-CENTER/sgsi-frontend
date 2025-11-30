import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Timetable = ({ classId, className }) => {
  const [selectedDay, setSelectedDay] = useState('monday');

  const days = [
    { id: 'monday', label: 'Lundi', short: 'LUN' },
    { id: 'tuesday', label: 'Mardi', short: 'MAR' },
    { id: 'wednesday', label: 'Mercredi', short: 'MER' },
    { id: 'thursday', label: 'Jeudi', short: 'JEU' },
    { id: 'friday', label: 'Vendredi', short: 'VEN' },
    { id: 'saturday', label: 'Samedi', short: 'SAM' }
  ];

  const timeSlots = [
    { id: 1, start: '07:30', end: '08:30' },
    { id: 2, start: '08:30', end: '09:30' },
    { id: 3, start: '09:30', end: '10:30' },
    { id: 4, start: '10:30', end: '11:00', isBreak: true, label: 'Récréation' },
    { id: 5, start: '11:00', end: '12:00' },
    { id: 6, start: '12:00', end: '13:00' },
    { id: 7, start: '13:00', end: '14:00', isBreak: true, label: 'Pause Déjeuner' },
    { id: 8, start: '14:00', end: '15:00' },
    { id: 9, start: '15:00', end: '16:00' }
  ];

  // Exemple de données d'emploi du temps
  const schedule = {
    monday: [
      { slotId: 1, subject: 'Mathématiques', teacher: 'M. KAMGA', room: '101', color: 'blue' },
      { slotId: 2, subject: 'Mathématiques', teacher: 'M. KAMGA', room: '101', color: 'blue' },
      { slotId: 3, subject: 'Français', teacher: 'Mme NGONO', room: '203', color: 'purple' },
      { slotId: 5, subject: 'Physique', teacher: 'M. MBIDA', room: '305', color: 'emerald' },
      { slotId: 6, subject: 'Anglais', teacher: 'Mme FOTSO', room: '204', color: 'pink' },
      { slotId: 8, subject: 'SVT', teacher: 'M. ESSONO', room: '401', color: 'teal' },
      { slotId: 9, subject: 'Histoire-Géo', teacher: 'Mme BIYA', room: '302', color: 'orange' }
    ],
    tuesday: [
      { slotId: 1, subject: 'Anglais', teacher: 'Mme FOTSO', room: '204', color: 'pink' },
      { slotId: 2, subject: 'Mathématiques', teacher: 'M. KAMGA', room: '101', color: 'blue' },
      { slotId: 3, subject: 'EPS', teacher: 'M. NJOYA', room: 'Terrain', color: 'red' },
      { slotId: 5, subject: 'Français', teacher: 'Mme NGONO', room: '203', color: 'purple' },
      { slotId: 6, subject: 'Chimie', teacher: 'M. MBIDA', room: '305', color: 'emerald' }
    ],
    wednesday: [
      { slotId: 1, subject: 'Philosophie', teacher: 'M. ATEBA', room: '501', color: 'indigo' },
      { slotId: 2, subject: 'Mathématiques', teacher: 'M. KAMGA', room: '101', color: 'blue' },
      { slotId: 3, subject: 'Physique', teacher: 'M. MBIDA', room: '305', color: 'emerald' }
    ],
    thursday: [
      { slotId: 1, subject: 'SVT', teacher: 'M. ESSONO', room: '401', color: 'teal' },
      { slotId: 2, subject: 'Français', teacher: 'Mme NGONO', room: '203', color: 'purple' },
      { slotId: 3, subject: 'Anglais', teacher: 'Mme FOTSO', room: '204', color: 'pink' },
      { slotId: 5, subject: 'Mathématiques', teacher: 'M. KAMGA', room: '101', color: 'blue' },
      { slotId: 6, subject: 'Histoire-Géo', teacher: 'Mme BIYA', room: '302', color: 'orange' }
    ],
    friday: [
      { slotId: 1, subject: 'Chimie', teacher: 'M. MBIDA', room: '305', color: 'emerald' },
      { slotId: 2, subject: 'Physique', teacher: 'M. MBIDA', room: '305', color: 'emerald' },
      { slotId: 3, subject: 'Mathématiques', teacher: 'M. KAMGA', room: '101', color: 'blue' },
      { slotId: 5, subject: 'Anglais', teacher: 'Mme FOTSO', room: '204', color: 'pink' },
      { slotId: 6, subject: 'Français', teacher: 'Mme NGONO', room: '203', color: 'purple' }
    ],
    saturday: [
      { slotId: 1, subject: 'SVT', teacher: 'M. ESSONO', room: '401', color: 'teal' },
      { slotId: 2, subject: 'EPS', teacher: 'M. NJOYA', room: 'Terrain', color: 'red' },
      { slotId: 3, subject: 'Philosophie', teacher: 'M. ATEBA', room: '501', color: 'indigo' }
    ]
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500/20 border-blue-500/50 text-blue-400 hover:bg-blue-500/30',
      purple: 'bg-purple-500/20 border-purple-500/50 text-purple-400 hover:bg-purple-500/30',
      emerald: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/30',
      pink: 'bg-pink-500/20 border-pink-500/50 text-pink-400 hover:bg-pink-500/30',
      teal: 'bg-teal-500/20 border-teal-500/50 text-teal-400 hover:bg-teal-500/30',
      orange: 'bg-orange-500/20 border-orange-500/50 text-orange-400 hover:bg-orange-500/30',
      red: 'bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30',
      indigo: 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/30'
    };
    return colors[color] || colors.blue;
  };

  const currentSchedule = schedule[selectedDay] || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Emploi du Temps - {className}
        </h2>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Exporter PDF
        </button>
      </div>

      {/* Sélecteur de jour */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {days.map((day) => (
          <button
            key={day.id}
            onClick={() => setSelectedDay(day.id)}
            className={`p-4 rounded-xl font-semibold transition-all ${
              selectedDay === day.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="text-lg">{day.short}</div>
            <div className="text-xs mt-1 hidden md:block">{day.label}</div>
          </button>
        ))}
      </div>

      {/* Emploi du temps */}
      <motion.div
        key={selectedDay}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
      >
        <div className="space-y-2">
          {timeSlots.map((slot) => {
            const course = currentSchedule.find(c => c.slotId === slot.id);
            
            if (slot.isBreak) {
              return (
                <div key={slot.id} className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-yellow-400 font-semibold">{slot.label}</span>
                    <span className="text-yellow-400/60 text-sm">({slot.start} - {slot.end})</span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={slot.id}
                className={`rounded-xl p-4 border transition-all ${
                  course 
                    ? `${getColorClasses(course.color)} cursor-pointer` 
                    : 'bg-white/5 border-white/10 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold opacity-60">
                        {slot.start} - {slot.end}
                      </span>
                      {course && (
                        <span className="px-2 py-0.5 bg-white/20 rounded text-xs font-bold">
                          1h
                        </span>
                      )}
                    </div>
                    {course ? (
                      <>
                        <h4 className="font-bold text-lg mb-1">{course.subject}</h4>
                        <div className="flex items-center gap-3 text-sm opacity-80">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {course.teacher}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Salle {course.room}
                          </span>
                        </div>
                      </>
                    ) : (
                      <p className="text-gray-500 text-sm">Pas de cours</p>
                    )}
                  </div>
                  {course && (
                    <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Statistiques du jour */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-3xl font-bold text-white mb-1">{currentSchedule.length}</div>
          <div className="text-sm text-gray-400">Cours</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-3xl font-bold text-white mb-1">
            {currentSchedule.length > 0 ? `${currentSchedule.length}h` : '0h'}
          </div>
          <div className="text-sm text-gray-400">Volume horaire</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-3xl font-bold text-white mb-1">
            {new Set(currentSchedule.map(c => c.teacher)).size}
          </div>
          <div className="text-sm text-gray-400">Enseignants</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-3xl font-bold text-white mb-1">
            {new Set(currentSchedule.map(c => c.subject)).size}
          </div>
          <div className="text-sm text-gray-400">Matières</div>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
