import React from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const Communications = ({ user, onLogout }) => {
  return (
    <Layout user={user} onLogout={onLogout}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Communications
          </h1>
          <p className="text-gray-400">Module Communications en cours de développement</p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-12 text-center">
          <svg className="w-24 h-24 mx-auto mb-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-white mb-4">Module Communications</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Cette section sera bientôt disponible avec toutes les fonctionnalités avancées du SGSI.
          </p>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Communications;
