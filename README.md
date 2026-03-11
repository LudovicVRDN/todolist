[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![LocalStorage](https://img.shields.io/badge/LocalStorage-Persistence-4B5563?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

Application **To-Do List** en **TypeScript vanilla** (ES6+ modules), implémentant **POO stricte** (classes `Task` et `TodoManager`, principes SOLID). Persistance localStorage, CRUD complet, responsive CSS/Tailwind, switch Dark Mode Light Mode.

**Auteur** : Ludovic Vourdon - Développeur Full Stack Junior en formation.

[![Demo](https://img.shields.io/badge/Demo-Live-green?style=for-the-badge&logo=netlify)](https://willowy-frangipane-fc6eb5.netlify.app)

## 📋 Sommaire
- [Fonctionnalités](#fonctionnalités)
- [Démarrage](#démarrage)
- [Structure](#structure)
- [Technologies](#technologies)
- [Développement](#développement)
- [Licence](#licence)

## ✨ Fonctionnalités
- ✅ **CRUD** : Ajout, lecture, update, suppression tâches
- 💾 **Persistance** : localStorage automatique
- ✅ **Validation** : TypeScript strict (titre requis)
- 📱 **Responsive** : Mobile-first (Flexbox/Grid)
- 👥 **POO complète** : `class Task`, `Form`, `ToDoList`, `ToDoStorage` + interfaces ITask/IStorage (SOLID)

## 🚀 Démarrage
1. Clone : `git clone https://github.com/LudovicVRDN/todolist.git`
2. VSCode : Ouvrir dossier > **Live Server** sur `index.html`

**Demo** : localhost:5500 – Modifs TS auto-reload avec `tsc --watch`.

## 📁 Structure
```
todolist/
├── dist/                    # Fichiers compilés (généré automatiquement)
├── src/
│   ├── script.ts            # Point d'entrée TypeScript
│   └── input.css            # Styles Tailwind (directives @tailwind)         
├── node_modules/            # Dépendances npm (ne pas commiter)
├── index.html               # Page HTML principale    
├── tailwind.config.js       # Configuration Tailwind
├── tsconfig.json            # Configuration TypeScript
├── tsconfig.tsbuildinfo     # Cache de compilation TypeScript (généré)
├── package.json
└── package-lock.json
```

## 🛠️ Technologies
| Frontend | Outils | Build |
|----------|--------|-------|
| TypeScript 5.4 | VSCode Live Server | tsc | 
| HTML5/CSS3/Tailwind | POO SOLID | localStorage |

## 🔧 Développement
```
npm i -D typescript @types/node
npm run dev # tsc --watch + Live Server
npm run build # tsc → JS dist/
```

**Ajouts suggérés** : Priorités enum.


**Portfolio** : [github.com/LudovicVRDN](https://github.com/LudovicVRDN) | 