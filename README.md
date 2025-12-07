# OdonTools 🦷

**Specialized E-commerce for Dental Products**

A modern full-stack web application for selling dental products and tools. Complete e-commerce solution with user authentication, shopping cart, admin panel, order management, and automated email notifications.

![React](https://img.shields.io/badge/React-18+-blue.svg)
![Vite](https://img.shields.io/badge/Vite-4+-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 📋 Table of Contents

- [Features](#-features)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Main Components](#-main-components)
- [Functionalities](#-functionalities)
- [Email System](#-email-system)
- [Available Scripts](#-available-scripts)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### User Features

- 🛒 **Shopping Cart**: Complete cart management with persistence
- 👤 **Authentication**: JWT-based login and registration system
- 🔍 **Advanced Search**: Real-time product filtering and search
- 📱 **Responsive Design**: Fully optimized for mobile, tablet and desktop
- 🎯 **Product Details**: Dynamic product pages with full information
- 📦 **Order Tracking**: View order history and status in real-time
- 💳 **Multiple Payment Methods**: Cash on delivery and bank transfer
- 📧 **Email Notifications**: Automated emails for order updates
- 📍 **User Profile**: Manage personal information, address, and phone
- 🌐 **Smart Navigation**: Smooth scrolling and section navigation

### Admin Features

- 📊 **Dashboard**: Real-time statistics and metrics
- 🏪 **Product Management**: CRUD operations for products
- 👥 **User Management**: View and manage user accounts
- 📋 **Order Management**: Process orders with status updates
- 💰 **Sales Analytics**: Total sales and order tracking
- ⚠️ **Low Stock Alerts**: Automatic notifications for inventory
- 🎨 **Admin Interface**: Dedicated admin panel with protected routes

## 🛠 Technologies

### Frontend

- **React** ^19.1.0 - UI library with hooks
- **React Router DOM** ^7.7.1 - Client-side routing with dynamic routes
- **React Icons** ^5.5.0 - Icon library (Feather Icons)
- **React Scroll** ^1.9.3 - Smooth scroll navigation
- **Vite** ^7.0.4 - Fast build tool and dev server

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Nodemailer** - Email service
- **Bcrypt** - Password hashing

### Development Tools

- **ESLint** - Code linting and formatting
- **GitHub Pages** - Frontend deployment
- **Socket.io** - Real-time communication (future feature)

## 🚀 Installation

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Backend Setup

1. **Navigate to backend directory**

```bash
cd backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**
   Create a `.env` file in the backend root:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/odontools
JWT_SECRET=your-secret-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
WEBSITE_URL=http://localhost:5173
```

4. **Start the backend server**

```bash
npm start
# or for development
npm run dev
```

### Frontend Setup

1. **Navigate to frontend directory**

```bash
cd odoontools
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

1. **Browse Products**: Explore the catalog by categories or use search
2. **Product Details**: Click on any product card to view full details
3. **Shopping Cart**: Add products, adjust quantities, and proceed to checkout
4. **Register/Login**: Create an account for order tracking and profile management
5. **Checkout**: Enter shipping information and phone number (saved to profile)
6. **Track Orders**: View order history and real-time status in "Mis Pedidos"
7. **Profile**: Manage personal information through the user modal

### Administrator

1. **Access**: Navigate to `/admin` (requires admin account)
2. **Dashboard**:
   - View real-time sales metrics and total orders
   - Monitor low stock products (< 10 units)
   - See recent orders with color-coded statuses
3. **Products Management** (`/admin/products`):
   - View all products in expandable desktop table
   - Create, edit, and delete products
   - Manage stock, prices, and descriptions
   - Mobile-friendly card view
4. **Orders Management** (`/admin/orders`):
   - Process orders with status updates
   - Confirm bank transfer payments
   - Change status: pendiente → confirmado → enviado → entregado
   - View customer details including phone number
   - Filter by status and search by order ID
5. **Users Management** (`/admin/users`):
   - View all registered users
   - Edit user roles (admin/cliente)
   - Delete user accounts
   - View user statistics (orders, total spent)
   - Mobile card view with search by ID

## 📁 Project Structure

```
odoontools/
├── public/                 # Static files
├── src/
│   ├── assets/            # Images and resources
│   │   └── tools/         # Product images
│   ├── components/        # Reusable components
│   │   ├── About/         # About page
│   │   ├── AdminDashboard/ # Admin dashboard with real-time stats
│   │   ├── AdminLayout/   # Admin layout wrapper
│   │   ├── AdminNavBar/   # Admin navigation bar
│   │   ├── CartModal/     # Shopping cart modal
│   │   ├── Categories/    # Product categories section
│   │   ├── CheckoutModal/ # Checkout with phone & payment methods
│   │   ├── Contact/       # Contact page
│   │   ├── Footer/        # Footer component
│   │   ├── Header/        # Main header
│   │   ├── HomePage/      # Home page wrapper with scroll-to-section
│   │   ├── Main/          # Main landing section
│   │   ├── ModalWithForm/ # Generic modal component
│   │   ├── NavBar/        # Navigation bar with smart routing
│   │   ├── Notification/  # Toast notifications
│   │   ├── ProductModal/  # Admin product create/edit modal
│   │   ├── Products/      # Products grid/list
│   │   ├── ProductsCard/  # Product card with navigation
│   │   ├── ProtectedRoute/ # Route protection for admin
│   │   ├── SearchBar/     # Product search with navigation
│   │   ├── ScrollToTop/   # Auto scroll to top on route change
│   │   ├── UserEditModal/ # Admin user edit modal
│   │   └── UserModal/     # User profile modal with avatar initial
│   ├── data/              # Mock/initial data
│   │   ├── categoriesData.js # Categories
│   │   ├── clientsData.js    # Client data
│   │   ├── lowInventoryData.js # Low stock
│   │   ├── ordersData.js     # Orders
│   │   └── productsData.js   # Product catalog
│   ├── hooks/             # Custom React hooks
│   │   ├── UseCart.jsx    # Cart state management
│   │   ├── useNotification.js # Toast notifications
│   │   ├── useProducts.js # Products CRUD operations
│   │   ├── useSales.js    # Sales/orders operations
│   │   └── useUsers.js    # User management
│   ├── pages/             # Main pages
│   │   ├── AnalyticsPage.jsx   # Admin analytics
│   │   ├── CartPage.jsx        # Cart page
│   │   ├── DashboardProducts.jsx # Admin products management
│   │   ├── OrdersPage.jsx      # Admin orders management
│   │   ├── ProductDetailPage.jsx # Dynamic product detail page
│   │   ├── ProductsPage.jsx    # Products catalog page
│   │   ├── UserFavoritesPage.jsx # User favorites (future)
│   │   ├── UserOrdersPage.jsx  # User order history
│   │   ├── UserProfilePage.jsx # User profile editing
│   │   ├── UserSettingsPage.jsx # User settings
│   │   └── UsersPage.jsx       # Admin users management
│   ├── utils/             # Utility functions
│   │   ├── auth.js        # Authentication helpers
│   │   ├── permissions.js # Role-based permissions
│   │   ├── filterTypes/   # Filter utilities
│   │   └── sortTypes/     # Sort utilities
│   ├── App.jsx           # Main app component with routes
│   └── main.jsx          # Entry point
├── BACKEND_EMAIL_SETUP.md # Backend email configuration guide
├── EMAILS_SHIPPED_DELIVERED.md # Email templates for order status
├── package.json          # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

## 🧩 Main Components

### `NavBar`

Smart navigation bar with conditional behavior:

- Smooth scroll on home page using react-scroll
- Standard navigation with location state on other pages
- Shopping cart with item count badge
- User authentication and profile access
- Product search integration
- Mobile responsive hamburger menu

### `ProductsCard`

Modern product card with:

- Clean minimalist design with subtle shadows
- Clickable area navigates to product detail page
- Product image with zoom effect on hover
- Category badge and price display
- "Add to Cart" button with proper event handling
- Stock status and discount badges
- Responsive design (260px height, centered button)

### `ProductDetailPage`

Dynamic product detail page with:

- Fetches product data from backend by ID
- Breadcrumb navigation
- Large product image display
- Quantity selector with stock validation
- Add to cart with selected quantity
- Product description and category
- Loading and error states
- Responsive 2-column layout (desktop) / 1-column (mobile)

### `CheckoutModal`

Complete checkout flow:

- Order summary with subtotal and shipping
- Payment method selection (cash/transfer)
- Bank account information for transfers
- Shipping address and contact information
- Phone number field (auto-saved to user profile)
- Form validation
- Order confirmation screen
- Real-time total calculation
- Email confirmation notification

### `UserModal`

User profile modal featuring:

- Avatar with user's first initial (colored circle)
- User information (name, email, phone, address)
- Active status indicator
- Quick statistics (orders, spent, favorites)
- Navigation links to profile pages
- Order history access
- Settings and logout buttons
- Smooth slide-in animation from right

### `AdminDashboard`

Comprehensive admin dashboard with:

- Real-time metrics (sales, orders, products, low stock)
- Color-coded status badges for orders
- Recent orders list (last 5)
- Low stock products alert system
- Quick action buttons (add product, view products)
- Dynamic data from backend API
- Loading states and error handling
- Gradient cards with icons

## 🎯 Functionalities

### Product Management

- ✅ Complete catalog with MongoDB integration
- ✅ Categories (Brushes, Dental Floss, Mouthwash, etc.)
- ✅ Advanced filtering and real-time search
- ✅ Dynamic product detail pages with routing
- ✅ Stock and inventory tracking with alerts
- ✅ Image upload and management
- ✅ CRUD operations (Admin only)

### Shopping Cart

- ✅ Add/remove products with immediate feedback
- ✅ Quantity adjustment with stock validation
- ✅ Automatic total and shipping calculation
- ✅ LocalStorage persistence across sessions
- ✅ Cart modal with smooth animations
- ✅ Empty cart state handling

### Order System

- ✅ Complete checkout flow with validation
- ✅ Multiple payment methods (cash, transfer)
- ✅ Bank transfer with account details capture
- ✅ Order status workflow: pendiente → confirmado → enviado → entregado
- ✅ Real-time order tracking for users
- ✅ Admin order management with status updates
- ✅ Automated email notifications for status changes
- ✅ Order history with filtering and search

### User System

- ✅ JWT-based authentication
- ✅ Secure registration and login
- ✅ User profile with editable information
- ✅ Address and phone number management
- ✅ Order history and tracking
- ✅ Profile modal with avatar initial
- ✅ Role-based access (admin/cliente)
- ✅ Protected routes for admin features

### Admin Panel

- ✅ Dashboard with real-time metrics
- ✅ Product CRUD with modal interface
- ✅ User management (view, edit, delete)
- ✅ Order processing with status updates
- ✅ Low stock alerts (< 10 units)
- ✅ Sales analytics and reporting
- ✅ Mobile-responsive admin interface
- ✅ Color-coded status indicators

### Email Notifications

- ✅ New order confirmation (customer & admin)
- ✅ Order shipped notification
- ✅ Order delivered notification
- ✅ Professional HTML email templates
- ✅ Customer phone number in admin emails
- ✅ Automated sending via Nodemailer

## 📧 Email System

The application includes a comprehensive email notification system:

### Automated Emails

1. **New Order Confirmation**

   - Sent to customer and admin when order is created
   - Includes order details, products, and payment method
   - Customer receives order number and estimated delivery
   - Admin receives customer phone number and contact info

2. **Order Shipped**

   - Sent when admin changes status to "enviado"
   - Includes tracking information and delivery estimate
   - Beautiful gradient design with blue theme

3. **Order Delivered**
   - Sent when admin changes status to "entregado"
   - Thank you message and feedback request
   - Green gradient design celebrating delivery

### Email Templates

All emails feature:

- Professional HTML design with inline styles
- Responsive layout for mobile and desktop
- Product list with images and prices
- Order summary and total
- Call-to-action buttons
- Company branding and footer

### Configuration

See `BACKEND_EMAIL_SETUP.md` and `EMAILS_SHIPPED_DELIVERED.md` for:

- Backend setup instructions
- Email template code
- Nodemailer configuration
- Gmail app password setup

## 📜 Available Scripts

### Frontend (odoontools/)

```bash
# Development
npm run dev          # Start Vite dev server on port 5173

# Build
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint to check code quality

# Deployment
npm run predeploy    # Build before deployment
npm run deploy       # Deploy to GitHub Pages
```

### Backend

```bash
# Development
npm start            # Start server with node
npm run dev          # Start with nodemon (auto-restart)

# Database
npm run seed         # Seed database with initial data (if available)
```

## 🔐 Environment Variables

### Backend (.env)

```env
# Server
PORT=3001

# Database
MONGODB_URI=mongodb://localhost:27017/odontools
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/odontools

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this

# Email (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# Frontend URL
WEBSITE_URL=http://localhost:5173
```

### Frontend (optional)

```env
# API Base URL (if different from localhost:3001)
VITE_API_URL=http://localhost:3001
```

## 🎨 Customization

### Responsive Design

The application uses standardized breakpoints:

- **Desktop**: > 768px
- **Tablet/Mobile**: ≤ 768px
- **Small Mobile**: ≤ 480px

Mobile optimizations include:

- Card-based layouts for admin pages
- Hamburger menu navigation
- Touch-friendly buttons and inputs
- Optimized image sizes
- Collapsible sections

### Styles

- Modular CSS with component-specific files
- CSS variables for consistent theming
- Gradient designs for headers and buttons
- Smooth transitions and animations
- Modern shadows and border-radius
- Mobile-first responsive approach

### Color Scheme

- **Primary**: Purple gradient (#667eea → #764ba2)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Danger**: Red (#ef4444)
- **Info**: Blue (#3b82f6)

### Data Management

Backend integration with MongoDB:

- Real-time data fetching
- Optimistic UI updates
- Error handling and loading states
- Data persistence across sessions

## 🤝 Contributing

1. **Fork** the project
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Contributing Guidelines

- Follow existing code conventions and structure
- Write clear, descriptive commit messages
- Include tests for new features when applicable
- Update documentation for significant changes
- Ensure responsive design for all new UI components
- Test on multiple screen sizes (mobile, tablet, desktop)
- Follow the established color scheme and design patterns

## 🐛 Known Issues & Future Improvements

### Current Limitations

- Favorites system UI present but not fully integrated with backend
- Image upload limited to URLs (future: direct file upload)
- Payment processing is simulated (future: real payment gateway)

### Planned Features

- 🔄 Real-time inventory updates with WebSocket
- 📸 Direct image upload for products
- 💳 Payment gateway integration (Stripe/PayPal)
- ⭐ Product reviews and ratings system
- 📊 Advanced analytics dashboard
- 🔔 Push notifications for order updates
- 📱 Progressive Web App (PWA) support
- 🌐 Multi-language support
- 🎨 Admin theme customization

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Lenin Miranda** - _Full-Stack Development_ - [@Lenin-Miranda](https://github.com/Lenin-Miranda)

## 🙏 Acknowledgments

- React and Vite communities for excellent tools and documentation
- MongoDB for robust database solutions
- Nodemailer for reliable email services
- The open-source community for inspiration and libraries
- Dental professionals who inspired this specialized e-commerce platform

## 📞 Support

**Questions or Issues?**

- 📧 Email: support@odontools.com (if available)
- 🐛 [Open an issue](https://github.com/Lenin-Miranda/Odontools/issues)
- 💬 [Discussions](https://github.com/Lenin-Miranda/Odontools/discussions)

**Like the project?** Give it a ⭐ on GitHub!

---

Built with ❤️ for dental professionals and their patients
