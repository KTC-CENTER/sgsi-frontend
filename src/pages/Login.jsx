import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://172.80.6.5/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.token, data.user);
      } else {
        setError(data.message || 'Échec de la connexion');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0a0f1c] via-[#1a1f35] to-[#0f1419]">
      {/* Motifs géométriques africains animés */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="africanPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <motion.path
                d="M 50,50 L 100,50 L 125,86.6 L 100,123.2 L 50,123.2 L 25,86.6 Z"
                fill="none"
                stroke="#00ff88"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.circle
                cx="100"
                cy="86.6"
                r="30"
                fill="none"
                stroke="#ffd700"
                strokeWidth="2"
                initial={{ scale: 0.8, opacity: 0.3 }}
                animate={{ scale: 1.2, opacity: 0.8 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#africanPattern)" />
        </svg>
      </div>

      {/* Particules flottantes */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Partie gauche - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-8 hidden lg:block"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/50 transform rotate-6">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 3.6v8.72c0 4.34-2.94 8.4-7 9.77-4.06-1.37-7-5.43-7-9.77V7.78l6-2.7V15h2V4.18z"/>
                  </svg>
                </div>
              </motion.div>

              <h1 className="text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  SGSI
                </span>
                <br />
                <span className="text-4xl text-gray-300 font-light">
                  Cameroun
                </span>
              </h1>

              <p className="text-xl text-gray-400 font-light max-w-md leading-relaxed">
                Système de Gestion Scolaire Intégré
                <span className="block mt-2 text-emerald-400 font-medium">
                  Une révolution numérique pour l'éducation
                </span>
              </p>
            </div>

            <div className="space-y-4 pt-8">
              {[
                { icon: '📊', text: 'Suivi pédagogique en temps réel' },
                { icon: '🎯', text: 'Gestion intelligente des progressions' },
                { icon: '🔒', text: 'Sécurité de niveau bancaire' },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="text-3xl group-hover:scale-125 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <span className="text-gray-300 text-lg">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 flex items-center gap-3 text-sm text-gray-500">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-red-500 border-2 border-white/20"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-green-500 border-2 border-white/20"></div>
              </div>
              <span>République du Cameroun</span>
              <span>•</span>
              <span>Paix - Travail - Patrie</span>
            </div>
          </motion.div>

          {/* Partie droite - Formulaire de connexion */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full"
          >
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-10 border border-white/10 shadow-2xl">
              {/* Header mobile */}
              <div className="lg:hidden mb-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-block mb-4"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    </svg>
                  </div>
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-2">SGSI Cameroun</h2>
                <p className="text-gray-400">Connexion à votre espace</p>
              </div>

              <h2 className="text-3xl font-bold text-white mb-2 hidden lg:block">
                Bienvenue
              </h2>
              <p className="text-gray-400 mb-8 hidden lg:block">
                Connectez-vous pour accéder à votre espace
              </p>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Adresse email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="relative w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-300"
                      placeholder="exemple@etablissement.cm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Mot de passe
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="relative w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-300"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-600 bg-white/5 text-emerald-500 focus:ring-emerald-500/50"
                    />
                    <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      Se souvenir de moi
                    </span>
                  </label>
                  <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                    Mot de passe oublié ?
                  </a>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full py-4 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white font-semibold rounded-xl overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Connexion...
                      </>
                    ) : (
                      <>
                        Se connecter
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </span>
                </motion.button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-center text-sm text-gray-500">
                  Besoin d'aide ?{' '}
                  <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                    Contactez le support
                  </a>
                </p>
              </div>
            </div>

            <p className="text-center text-xs text-gray-600 mt-6">
              Version 2.0 • Confidentiel • MINESEC Cameroun
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
