// Utilitaires pour l'import/export de données

export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) {
    alert('Aucune donnée à exporter');
    return;
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Échapper les virgules et guillemets
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToExcel = (data, filename = 'export.xlsx') => {
  // Pour une vraie implémentation, utiliser une librairie comme xlsx
  // Pour l'instant, on exporte en CSV qui peut être ouvert dans Excel
  exportToCSV(data, filename.replace('.xlsx', '.csv'));
};

export const parseCSV = (csvText) => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',');
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = values[index]?.trim().replace(/^"|"$/g, '');
      });
      return obj;
    });
};

export const generateMatricule = (year, type, region, sequence) => {
  const yearStr = String(year).slice(-2);
  const typeStr = String(type);
  const regionStr = String(region).padStart(2, '0');
  const sequenceStr = String(sequence).padStart(4, '0');
  
  return `${yearStr}${typeStr}${regionStr}${sequenceStr}`;
};

export const validateMatricule = (matricule) => {
  // Format: YY-T-RR-NNNN (9 chiffres)
  const regex = /^\d{9}$/;
  return regex.test(matricule);
};

export const parseMatricule = (matricule) => {
  if (!validateMatricule(matricule)) {
    return null;
  }
  
  return {
    year: '20' + matricule.slice(0, 2),
    type: matricule.slice(2, 3),
    region: matricule.slice(3, 5),
    sequence: matricule.slice(5, 9)
  };
};

export const formatPhoneNumber = (phone) => {
  // Format camerounais: +237 6XX XX XX XX
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('237')) {
    const number = cleaned.slice(3);
    return `+237 ${number.slice(0, 3)} ${number.slice(3, 5)} ${number.slice(5, 7)} ${number.slice(7, 9)}`;
  }
  
  if (cleaned.startsWith('6')) {
    return `+237 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7, 9)}`;
  }
  
  return phone;
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

export const regionsCameroon = [
  { code: '01', name: 'Adamaoua', nameEn: 'Adamawa' },
  { code: '02', name: 'Centre', nameEn: 'Centre' },
  { code: '03', name: 'Est', nameEn: 'East' },
  { code: '04', name: 'Extrême-Nord', nameEn: 'Far North' },
  { code: '05', name: 'Littoral', nameEn: 'Littoral' },
  { code: '06', name: 'Nord', nameEn: 'North' },
  { code: '07', name: 'Nord-Ouest', nameEn: 'North-West' },
  { code: '08', name: 'Ouest', nameEn: 'West' },
  { code: '09', name: 'Sud', nameEn: 'South' },
  { code: '10', name: 'Sud-Ouest', nameEn: 'South-West' }
];

export const getRegionName = (code) => {
  const region = regionsCameroon.find(r => r.code === code);
  return region ? region.name : 'Inconnue';
};

export const etablissementTypes = [
  { code: '1', name: 'Lycée Général' },
  { code: '2', name: 'Lycée Technique' },
  { code: '3', name: 'CES' },
  { code: '4', name: 'CETIC' },
  { code: '5', name: 'ENIEG/ENIET' }
];

export const getEtablissementType = (code) => {
  const type = etablissementTypes.find(t => t.code === code);
  return type ? type.name : 'Inconnu';
};

// Fonction pour générer un PDF (placeholder)
export const generatePDF = async (data, template) => {
  // Cette fonction nécessiterait une librairie comme jsPDF ou pdfmake
  console.log('Génération PDF:', template, data);
  alert('Fonctionnalité de génération PDF à implémenter avec jsPDF');
};

// Fonction pour envoyer des notifications
export const sendNotification = async (type, recipients, message) => {
  // Cette fonction communiquerait avec l'API backend
  console.log('Notification:', type, recipients, message);
  return {
    success: true,
    message: 'Notification envoyée'
  };
};

export default {
  exportToCSV,
  exportToExcel,
  parseCSV,
  generateMatricule,
  validateMatricule,
  parseMatricule,
  formatPhoneNumber,
  validateEmail,
  formatDate,
  calculateAge,
  regionsCameroon,
  getRegionName,
  etablissementTypes,
  getEtablissementType,
  generatePDF,
  sendNotification
};
