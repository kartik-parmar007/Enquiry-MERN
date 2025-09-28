# Enquiry Management System - Full Stack Application

A full-stack web application built with React (frontend) and Node.js serverless functions (backend) for managing user enquiries.

## 🚀 Live Demo

Deploy to Vercel: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/your-repo-name)

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Flowbite React
- **Backend**: Node.js Serverless Functions, MongoDB, Mongoose
- **Deployment**: Vercel
- **Database**: MongoDB Atlas

## 🌟 Features

- ✅ Create new enquiries with form validation
- ✅ View all enquiries in a responsive table
- ✅ Edit enquiries inline
- ✅ Delete enquiries with confirmation
- ✅ Real-time updates after operations
- ✅ Responsive design for all devices
- ✅ Error handling and loading states
- ✅ Serverless deployment ready

## 📦 Project Structure

```
project/
├── api/                    # Serverless API functions
│   ├── enquiries/
│   │   ├── index.js       # Main CRUD operations
│   │   └── [id].js        # Individual enquiry operations
│   ├── models/
│   │   └── enquiry.model.js
│   └── utils/
│       └── db.js          # Database connection
├── client/                # React frontend
│   ├── src/
│   │   ├── enquiryList/
│   │   ├── App.jsx
│   │   └── Enquiry.jsx
│   └── dist/              # Build output
├── vercel.json            # Vercel configuration
└── package.json           # Root package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier works)
- Vercel account (optional, for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd project
   ```

2. **Install dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Update with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/enquiry_db?retryWrites=true&w=majority
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`

## 🌐 Deployment to Vercel

### Method 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/your-repo-name)

### Method 2: Manual Deploy

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Project Settings → Environment Variables
   - Add: `MONGODB_URI` with your MongoDB connection string

4. **Deploy**
   - Vercel will automatically deploy your application
   - Your app will be live at `https://your-app-name.vercel.app`

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/enquiries` | Get all enquiries |
| POST | `/api/enquiries` | Create new enquiry |
| PUT | `/api/enquiries/[id]` | Update enquiry by ID |
| DELETE | `/api/enquiries/[id]` | Delete enquiry by ID |

## 📊 Database Schema

```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

## 🛡️ Features

- **CORS enabled** for cross-origin requests
- **Input validation** on both frontend and backend
- **Error handling** with user-friendly messages
- **Responsive design** works on all devices
- **Loading states** for better UX
- **Confirmation dialogs** for destructive actions

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Check your connection string format
   - Verify environment variables are set correctly

2. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Check for syntax errors in your code

3. **API Not Working**
   - Check Vercel function logs in dashboard
   - Ensure environment variables are set in Vercel
   - Verify API paths match your frontend calls

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or run into issues, please:
1. Check the troubleshooting section above
2. Create an issue in the GitHub repository
3. Contact the maintainers

---

**Happy coding! 🎉**