# 🌍 REST Countries API with Color Theme Switcher

![Frontend Mentor Challenge](https://img.shields.io/badge/Frontend%20Mentor-Challenge-blue)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8)
![Vite](https://img.shields.io/badge/Vite-4.3.0-646cff)

A responsive web application that allows users to browse information about countries from around the world with a beautiful dark/light theme switcher. Built as a [Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca) challenge.

## ✨ Features

- 🔍 **Search Functionality** - Search for countries by name
- 🌍 **Filter by Region** - Browse countries by continent (Africa, Americas, Asia, Europe, Oceania)
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop
- 🌓 **Dark/Light Mode** - Toggle between themes with smooth transitions
- 🎨 **Modern UI** - Clean interface following Frontend Mentor design specifications
- ⚡ **Fast Performance** - Built with Vite for optimal loading speeds
- 🔗 **Detailed Country View** - See in-depth information including borders, currencies, and languages

## 🚀 Live Demo

Visit the live application: [View Demo](#)

## 🛠️ Technologies Used

### Core
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing

### Styling
- **Tailwind CSS v4** - Utility-first CSS framework with CSS-based configuration
- **Nunito Sans** - Google Font

### API & Data
- **REST Countries API v3.1** - Country data source
- **Axios** - HTTP client for API requests

### State Management
- **React Context API** - Global theme state management

## 🤖 GenAI-Assisted Development

This project was significantly enhanced using GenAI assistance (GitHub Copilot) to refactor and modernize the codebase. Below are the key improvements made:

### Major Refactoring (November 2025)

#### 1. **Complete UI Overhaul with Tailwind CSS v4**
- **Before**: Used SCSS modules for styling
- **After**: Migrated to Tailwind CSS v4 with CSS-based configuration
- **Changes**:
  - Removed all SCSS files and dependencies
  - Installed `@tailwindcss/postcss` v4
  - Created CSS-based theme configuration using `@theme` directive
  - Implemented utility-first approach for all components

#### 2. **Enhanced Dark Mode Implementation**
- **Accurate Color Palette**: Matched Frontend Mentor design specifications
  - Dark Mode Background: `hsl(207, 26%, 17%)`
  - Dark Mode Elements: `hsl(209, 23%, 22%)`
  - Light Mode Background: `hsl(0, 0%, 98%)`
  - Light Mode Elements: `hsl(0, 0%, 100%)`
  - Light Mode Text: `hsl(200, 15%, 8%)`
- **Smart Theme Toggle**: Class-based dark mode with React Context
- **Inline Styles**: Used for precise color control with Tailwind v4

#### 3. **Component Refactoring**

**Header Component**
- Responsive typography (text-sm to text-2xl)
- Shadow effects for depth
- Proper color transitions

**Home Page**
- Modern search input with icon
- Dropdown filter with custom styling
- Responsive grid layout (1-4 columns based on screen size)
- Improved placeholder styling

**Country Cards**
- Hover effects with scale transformation
- Proper image aspect ratio
- Consistent padding and spacing
- Shadow variations for light/dark modes

**Country Details Page**
- Two-column responsive layout
- Back button with navigation
- Border countries as interactive buttons
- Comprehensive country information display

#### 4. **Code Quality Improvements**
- Type safety enhancements
- Removed redundant code
- Improved component structure
- Better error handling
- Cleaner imports and exports

#### 5. **Performance Optimizations**
- Tailwind CSS v4 for smaller bundle size
- Proper image loading
- Efficient re-renders with React Context
- Optimized PostCSS configuration

### GenAI Contribution Summary
- ✅ Automated migration from SCSS to Tailwind CSS
- ✅ Implemented responsive design patterns
- ✅ Enhanced accessibility and UX
- ✅ Improved code organization and maintainability
- ✅ Added comprehensive type definitions
- ✅ Modernized build configuration

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/mileine/frontendmentor-rest-countries-api.git
cd frontendmentor-rest-countries-api
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 🗂️ Project Structure

```
webapp-countries/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, icons, SVGs
│   ├── components/     # Reusable components
│   │   ├── CountriesContainer/
│   │   ├── CountryCard/
│   │   ├── Header/
│   │   └── SwitchButton/
│   ├── context/        # React Context for state management
│   ├── data/           # Mock data
│   ├── pages/          # Route pages
│   │   ├── Home/
│   │   └── CountryDetails/
│   ├── services/       # API configuration
│   ├── styles/         # Global styles & Tailwind config
│   ├── utils/          # Helper functions
│   ├── App.tsx         # Root component
│   └── main.tsx        # Entry point
├── design/             # Design reference files
├── index.html
├── package.json
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## 🌐 API Reference

[REST COUNTRIES API](https://restcountries.com/#rest-countries)

### Endpoints Used:

**Country by code:**
```
https://restcountries.com/v3.1/alpha/{code}
```

**Country by name:**
```
https://restcountries.com/v3.1/name/{name}
```

**Countries by region:**
```
https://restcountries.com/v3.1/region/{region}
```

## 🎨 Design System

### Colors

**Dark Mode**
- Background: `hsl(207, 26%, 17%)`
- Elements: `hsl(209, 23%, 22%)`
- Text: `hsl(0, 0%, 100%)`

**Light Mode**
- Background: `hsl(0, 0%, 98%)`
- Elements: `hsl(0, 0%, 100%)`
- Text: `hsl(200, 15%, 8%)`
- Input: `hsl(0, 0%, 52%)`

### Typography
- Font Family: Nunito Sans
- Weights: 300 (Light), 600 (Semi-bold), 800 (Extra-bold)
- Homepage Font Size: 14px
- Detail Page Font Size: 16px

### Shadows
- Light Mode: `0 2px 9px rgba(0, 0, 0, 0.05)`
- Dark Mode: `0 2px 4px rgba(0, 0, 0, 0.15)`

## 🌐 Resources & References

### Frontend Mentor Challenge
- [Challenge Details](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca)

### Learning Resources
- [Consumindo uma API com React.JS e Axios](https://www.devmedia.com.br/consumindo-uma-api-com-react-js-e-axios/42900)
- [Using Axios to set request headers](https://blog.logrocket.com/using-axios-set-request-headers/)
- [A Complete Guide to React Router](https://ui.dev/react-router-tutorial)
- [How to Import SVGs in a React and Vite app](https://www.freecodecamp.org/news/how-to-import-svgs-in-react-and-vite/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)

## 👩‍💻 Author

**Mileine**
- GitHub: [@mileine](https://github.com/mileine)
- Frontend Mentor: [@mileine](https://www.frontendmentor.io/profile/mileine)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Frontend Mentor for the challenge and design
- REST Countries API for the comprehensive country data
- GitHub Copilot for AI-assisted development and refactoring
- The React and Tailwind CSS communities for excellent documentation

---

**Made with ❤️ using React, TypeScript, and Tailwind CSS**

**Enhanced with 🤖 GitHub Copilot**