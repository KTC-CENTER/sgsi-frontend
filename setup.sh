#!/bin/bash

echo "🎓 SGSI Cameroun - Setup Script v2.0"
echo "===================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Vérifier Node.js
echo -e "${BLUE}📦 Vérification de Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé. Veuillez l'installer depuis https://nodejs.org${NC}"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js ${NODE_VERSION} détecté${NC}"
echo ""

# Vérifier npm
echo -e "${BLUE}📦 Vérification de npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm n'est pas installé${NC}"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✅ npm ${NPM_VERSION} détecté${NC}"
echo ""

# Créer le fichier .env s'il n'existe pas
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚙️  Création du fichier .env...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ Fichier .env créé${NC}"
else
    echo -e "${GREEN}✅ Fichier .env existe déjà${NC}"
fi
echo ""

# Installer les dépendances
echo -e "${BLUE}📥 Installation des dépendances...${NC}"
echo "Cela peut prendre quelques minutes..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dépendances installées avec succès${NC}"
else
    echo -e "${RED}❌ Erreur lors de l'installation des dépendances${NC}"
    exit 1
fi
echo ""

# Vérifier la connexion à l'API
echo -e "${BLUE}🔌 Vérification de la connexion à l'API...${NC}"
API_URL="http://172.80.6.5/api"

if curl -s --head --request GET "$API_URL" | grep "200\|301\|302" > /dev/null; then 
    echo -e "${GREEN}✅ API accessible à ${API_URL}${NC}"
else
    echo -e "${YELLOW}⚠️  L'API ne semble pas accessible. Vérifiez que le backend est démarré.${NC}"
fi
echo ""

# Instructions finales
echo -e "${GREEN}🎉 Setup terminé avec succès !${NC}"
echo ""
echo -e "${BLUE}📝 Prochaines étapes :${NC}"
echo ""
echo "1. Démarrer le serveur de développement :"
echo -e "   ${YELLOW}npm run dev${NC}"
echo ""
echo "2. Ouvrir votre navigateur à :"
echo -e "   ${YELLOW}http://localhost:3000${NC}"
echo ""
echo "3. Build pour la production :"
echo -e "   ${YELLOW}npm run build${NC}"
echo ""
echo -e "${BLUE}📚 Documentation complète : README.md${NC}"
echo -e "${BLUE}🌐 API Documentation : http://172.80.6.5/api/docs${NC}"
echo ""
echo -e "${GREEN}Bon développement ! 🚀${NC}"
