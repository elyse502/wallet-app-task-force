# Personal Finance Tracker

A comprehensive web application for managing multiple financial accounts, tracking expenses, and monitoring budgets across different payment methods (bank accounts, mobile money, cash, etc.). Built with React.js, Node.js, Express, and MongoDB.

## 🌐 Live Demo

[View Live Demo](https://wallet-app-task-force-frontend.vercel.app/login)

<br /><hr /><br />

## 📝 Use Case

Meet Eric, an employee who struggles with managing transactions across multiple payment methods:
- Multiple bank accounts
- Mobile money accounts
- Cash transactions

This application helps Eric by:
- Tracking all transactions across different accounts
- Generating time-based reports
- Setting and monitoring budgets with notifications
- Organizing expenses with categories and subcategories
- Visualizing financial data for better understanding

<br /><hr /><br />

## ✨ Features

### User Management
- Secure user registration and login
- JWT-based authentication
- Profile management with budget settings

### Account Management
- Manage multiple account types:
  - Bank accounts
  - Mobile money accounts
  - Cash accounts
- Real-time balance tracking
- Transaction history per account

### Transaction Management
- Add income and expense transactions
- Organize transactions with categories and subcategories
- Recurring transactions support
- Filter and search functionality
- Detailed transaction history

### Budget Management
- Set monthly budget limits
- Category-specific budget limits
- Visual budget progress tracking
- Real-time budget notifications when limits are exceeded
- Real-time spending notifications

### Categories
- Create and manage transaction categories
- Add and organize subcategories
- Category-wise expense tracking
- Category budget limits
- Spending analysis by category

### Reports & Analytics
- Generate reports for custom time periods
- Category distribution charts
- Multi-account transaction summary
- Visual representation of financial data
- Export transactions in multiple formats:
  - CSV export
  - Excel export
  - PDF reports

<br /><hr /><br />

## 🛠 Tech Stack

### Frontend
- React.js
- TailwindCSS for styling
- Chart.js for data visualization
- React Router for navigation
- Axios for API requests
- React-Toastify for notifications

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

<br /><hr /><br />

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
```console
git clone https://github.com/elyse502/wallet-app-task-force.git
cd wallet-app
```

2. **Backend Setup**
```console
cd wallet-app-backend
npm install

# Create .env file with:
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:5173
```

3. **Frontend Setup**
```console
cd ../wallet-app-clientside
npm install

# Create .env file with:
VITE_API_URL="http://localhost:5000/api"
```

4. **Start Development Servers**

Backend:
```console
cd wallet-app-backend
npm run dev
```

Frontend:
```console
cd wallet-app-clientside
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

<br /><hr /><br />

## 📱 Application Structure

### Frontend Structure
```groovy
src/
├── components/
│   ├── Auth/          # Authentication components
│   ├── Dashboard/     # Dashboard and overview
│   ├── Transactions/  # Transaction management
│   ├── Budget/        # Budget tracking
│   ├── Reports/       # Reports and analytics
│   └── UI/           # Reusable UI components
├── context/          # React context providers
├── services/         # API service layer
├── utils/           # Utility functions
└── routes/          # Route definitions
```

### Backend Structure
```groovy
src/
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── utils/          # Helper functions
└── app.js         # Main application file
```

<br /><hr /><br />

## 🔒 Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation
- Error handling
- CORS configuration

<br /><hr /><br />

## 🌟 Key Features in Detail

### Transaction Management
- Add, edit, and delete transactions
- Categorize transactions
- Filter by date range, category, and type
- Search transactions
- Recurring transaction support

### Budget Tracking
- Set monthly budget limits
- Track category-specific budgets
- Visual progress bars
- Alert system for budget thresholds
- Real-time updates

### Reporting
- Export transactions to CSV, Excel, and PDF
- Monthly spending analysis
- Category-wise breakdowns
- Interactive charts and graphs

<br /><hr /><br />

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<br /><hr /><br />

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/elyse502/wallet-app-task-force/blob/main/LICENSE) file for details.

<br /><hr /><br />

## 👤 Author

- [**NIYIBIZI Elysée**](https://linktr.ee/niyibizi_elysee)  | [Github](https://github.com/elyse502) | [Linkedin](https://www.linkedin.com/in/niyibizi-elys%C3%A9e/) | [Twitter](https://twitter.com/Niyibizi_Elyse).
- **Email**: <elyseniyibizi502@gmail.com>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/niyibizi-elys%C3%A9e/) [![@phenrysay](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/Niyibizi_Elyse) [![pH-7](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/elyse502)

<br /><hr /><br />

## 🌟 Acknowledgments

- [React.js](https://reactjs.org/) - UI library
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Chart.js](https://www.chartjs.org/) - Charts
- [Express.js](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database

<br /><hr /><br />

## 📸 Screenshots

![screencapture-localhost-5173-2025-01-17-11_09_00](https://github.com/user-attachments/assets/af394c2b-b58c-4517-b680-3fa21b82330f)






