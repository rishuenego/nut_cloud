import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { configurePassport } from './config/passport.js';
import { pool } from './config/db.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import couponRoutes from './routes/coupons.js';
import contactRoutes from './routes/contact.js';
import adminRoutes from './routes/admin.js';
import paymentRoutes from './routes/payments.js';
import settingsRoutes from './routes/settings.js';
import { errorHandler } from './middleware/errorHandler.js';
import MySQLStoreFactory from 'express-mysql-session';
const app = express();
const PORT = process.env.PORT || 3001;
// Initialize session store
const MySQLStore = MySQLStoreFactory(session);
const sessionStore = new MySQLStore({}, pool);
// Middleware
const isProduction = process.env.NODE_ENV === 'production';
// Allowed origins for CORS
const allowedOrigins = [
    'https://nutbaba.in',
    'https://www.nutbaba.in',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
];
// Add custom FRONTEND_URL if provided
if (process.env.FRONTEND_URL && !allowedOrigins.includes(process.env.FRONTEND_URL)) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            console.log('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'nutbaba-secret-key-change-in-production',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    proxy: true, // Required for secure cookies behind proxy
    cookie: {
        secure: isProduction, // True for production with HTTPS
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: isProduction ? 'none' : 'lax', // 'none' for cross-domain cookies in production
    },
}));
console.log('Session Security:', {
    isProduction,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax'
});
// Passport initialization
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/coupons', couponRoutes);
app.use('/contact', contactRoutes);
app.use('/admin', adminRoutes);
app.use('/payments', paymentRoutes);
app.use('/settings', settingsRoutes);
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Nut Baba API is running' });
});
// Error handler
app.use(errorHandler);
// Start server
const startServer = async () => {
    try {
        // Test database connection
        await pool.query('SELECT 1');
        console.log('Database connected successfully');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
