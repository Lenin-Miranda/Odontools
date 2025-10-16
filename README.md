# OdonTools 🦷

**Specialized E-commerce for Dental Products**

A modern web application developed in React for selling dental products and tools. Designed for dental professionals and general public seeking quality products for dental care.

![React](https://img.shields.io/badge/React-18+-blue.svg)
![Vite](https://img.shields.io/badge/Vite-4+-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 📋 Table of Contents

- [Features](#-features)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Main Components](#-main-components)
- [Functionalities](#-functionalities)
- [Available Scripts](#-available-scripts)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- 🛒 **Shopping Cart**: Complete cart management system
- 👤 **Authentication**: User login and registration system
- 🔍 **Advanced Search**: Product filtering and search
- 📱 **Responsive Design**: Optimized for mobile and desktop
- ⭐ **Favorites System**: Save favorite products
- 📊 **Admin Panel**: Dashboard for product management
- 🎨 **Modern Interface**: Clean and professional design
- 🚀 **SPA Navigation**: Smooth experience with React Router

## 🛠 Technologies

### Frontend

- **React** ^19.1.0 - Main library
- **React Router DOM** ^7.7.1 - Routing
- **React Icons** ^5.5.0 - Icons
- **React Scroll** ^1.9.3 - Smooth navigation
- **Vite** ^7.0.4 - Build tool and dev server

### Development Tools

- **ESLint** - Code linting
- **GitHub Pages** - Automatic deployment
- **Socket.io** - Real-time communication

## 🚀 Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/Lenin-Miranda/Odontools.git
cd Odontools/odoontools
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open in browser**

```
http://localhost:5173
```

## 💻 Usage

### End User

1. **Navigation**: Explore product categories
2. **Search**: Use the search bar to find specific products
3. **Cart**: Add products to cart and manage quantities
4. **Account**: Register or login for a personalized experience
5. **Favorites**: Mark products as favorites to find them easily

### Administrator

1. **Access**: Navigate to `/admin` to access the admin panel
2. **Dashboard**: Overview of statistics and management
3. **Products**: Manage product catalog
4. **Users**: Manage user accounts

## 📁 Project Structure

```
odoontools/
├── public/                 # Static files
├── src/
│   ├── assets/            # Images and resources
│   │   └── tools/         # Product images
│   ├── components/        # Reusable components
│   │   ├── About/         # About page
│   │   ├── AdminDashboard/ # Admin panel
│   │   ├── AdminLayout/   # Admin layout
│   │   ├── AdminNavBar/   # Admin navigation
│   │   ├── CartModal/     # Cart modal
│   │   ├── Categories/    # Product categories
│   │   ├── Contact/       # Contact page
│   │   ├── Footer/        # Footer
│   │   ├── Header/        # Header
│   │   ├── Main/          # Main page
│   │   ├── ModalWithForm/ # Reusable modal
│   │   ├── NavBar/        # Navigation bar
│   │   ├── Products/      # Products list
│   │   ├── ProductsCard/  # Product card
│   │   ├── SearchBar/     # Search bar
│   │   └── UserModal/     # User modal
│   ├── data/              # Application data
│   │   ├── categoriesData.js # Categories
│   │   ├── clientsData.js    # Client data
│   │   └── productsData.js   # Product catalog
│   ├── hooks/             # Custom hooks
│   │   └── UseCart.jsx    # Cart hook
│   ├── pages/             # Main pages
│   │   ├── CartPage.jsx   # Cart page
│   │   └── ProductsPage.jsx # Products page
│   ├── utils/             # Utilities
│   │   ├── filterTypes/   # Filter types
│   │   └── sortTypes/     # Sort types
│   ├── App.jsx           # Main component
│   └── main.jsx          # Entry point
├── package.json          # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # Documentation
```

## 🧩 Main Components

### `NavBar`

Main navigation bar with:

- Section links
- Shopping cart
- User authentication
- Product search

### `ProductsCard`

Product card that includes:

- Product image
- Basic information (name, price)
- Action buttons (add to cart, favorites)
- Rating system

### `CartModal`

Cart modal with:

- List of added products
- Quantity management
- Total calculation
- Checkout process

### `AdminDashboard`

Admin panel with:

- General statistics
- Product management
- User control
- System configurations

## 🎯 Functionalities

### Product Management

- ✅ Complete catalog of dental products
- ✅ Categorization (Brushes, Dental Floss, Mouthwash, etc.)
- ✅ Filter and search system
- ✅ Detailed information for each product
- ✅ Stock and inventory management

### Shopping Cart

- ✅ Add/remove products
- ✅ Modify quantities
- ✅ Automatic total calculation
- ✅ Session persistence
- ✅ Intuitive and responsive interface

### User System

- ✅ New user registration
- ✅ User login
- ✅ User profile
- ✅ Favorites system
- ✅ Purchase history

### Admin Panel

- ✅ Dashboard with metrics
- ✅ Product management
- ✅ User control
- ✅ Specific admin navigation

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Build
npm run build        # Build application for production
npm run preview      # Preview production build

# Code
npm run lint         # Run ESLint to check code

# Deployment
npm run predeploy    # Prepare application for deployment
npm run deploy       # Deploy to GitHub Pages
```

## 🎨 Customization

### Styles

Each component has its own CSS file:

- Modular and organized styles
- CSS variables for consistency
- Mobile-first responsive design
- Customizable themes

### Data

Data is managed through JavaScript files:

- `productsData.js` - Product catalog
- `categoriesData.js` - Available categories
- `clientsData.js` - User information

## 🤝 Contributing

1. **Fork** the project
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Contributing Guidelines

- Follow existing code conventions
- Include tests for new features
- Update documentation when necessary
- Use descriptive and clear commits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Lenin Miranda** - _Main Development_ - [@Lenin-Miranda](https://github.com/Lenin-Miranda)

## 🙏 Acknowledgments

- To the React community for excellent tools
- To the contributors of the libraries used
- To dental professionals who inspired this project

---

**Have questions?** Don't hesitate to [open an issue](https://github.com/Lenin-Miranda/Odontools/issues) or contact us.

**Like the project?** Give it a ⭐ on GitHub!
