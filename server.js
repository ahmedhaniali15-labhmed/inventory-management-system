const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/inventory_db')
  .then(() => console.log('✓ تم الاتصال بقاعدة البيانات بنجاح'))
  .catch(err => console.log('✗ خطأ في الاتصال:', err));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/products', require('./routes/products.routes'));
app.use('/api/prices', require('./routes/prices.routes'));
app.use('/api/supervisors', require('./routes/supervisors.routes'));

// Static Files
app.use(express.static('client/build'));

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'حدث خطأ في الخادم', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ الخادم يعمل على المنفذ ${PORT}`);
});

module.exports = app;
