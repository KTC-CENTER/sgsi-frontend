import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      ...notification
    };

    setNotifications(prev => [...prev, newNotification]);

    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const success = useCallback((message, options = {}) => {
    return addNotification({ ...options, type: 'success', message });
  }, [addNotification]);

  const error = useCallback((message, options = {}) => {
    return addNotification({ ...options, type: 'error', message });
  }, [addNotification]);

  const warning = useCallback((message, options = {}) => {
    return addNotification({ ...options, type: 'warning', message });
  }, [addNotification]);

  const info = useCallback((message, options = {}) => {
    return addNotification({ ...options, type: 'info', message });
  }, [addNotification]);

  return (
    <NotificationContext.Provider value={{ success, error, warning, info, addNotification, removeNotification }}>
      {children}
      <NotificationContainer notifications={notifications} onRemove={removeNotification} />
    </NotificationContext.Provider>
  );
};

const NotificationContainer = ({ notifications, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map(notification => (
          <NotificationToast
            key={notification.id}
            notification={notification}
            onRemove={() => onRemove(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const NotificationToast = ({ notification, onRemove }) => {
  const { type, message, title } = notification;

  const config = {
    success: {
      icon: '✅',
      bg: 'bg-emerald-500/90',
      border: 'border-emerald-400',
      iconBg: 'bg-emerald-400/20'
    },
    error: {
      icon: '❌',
      bg: 'bg-red-500/90',
      border: 'border-red-400',
      iconBg: 'bg-red-400/20'
    },
    warning: {
      icon: '⚠️',
      bg: 'bg-yellow-500/90',
      border: 'border-yellow-400',
      iconBg: 'bg-yellow-400/20'
    },
    info: {
      icon: 'ℹ️',
      bg: 'bg-blue-500/90',
      border: 'border-blue-400',
      iconBg: 'bg-blue-400/20'
    }
  };

  const style = config[type] || config.info;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      className="pointer-events-auto"
    >
      <div className={`${style.bg} backdrop-blur-xl border ${style.border} rounded-xl p-4 shadow-2xl min-w-[300px] max-w-md`}>
        <div className="flex items-start gap-3">
          <div className={`${style.iconBg} w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0`}>
            {style.icon}
          </div>
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className="font-bold text-white mb-1">{title}</h4>
            )}
            <p className="text-sm text-white/90">{message}</p>
          </div>
          <button
            onClick={onRemove}
            className="text-white/60 hover:text-white transition-colors shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationProvider;
