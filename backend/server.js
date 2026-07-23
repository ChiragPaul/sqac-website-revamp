require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const cron = require('node-cron');
const xlsx = require('xlsx');

const dataRoutes = require('./routes/dataRoutes');
const contactRoutes = require('./routes/contactRoutes');
const teamRoutes = require('./routes/teamRoutes');

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));
} else {
  console.warn('⚠️ MONGO_URI is undefined! Skipping MongoDB connection. (Data and Contact routes will fail)');
}

// Routes
app.use('/api', dataRoutes);
app.use('/api', contactRoutes);
app.use('/api', teamRoutes);

app.get('/api/health', (req, res) => {
  res.send('Backend is running');
});

cron.schedule('0 * * * *', async () => {
  console.log('Running Excel to MongoDB sync...');

  try {
    const workbook = xlsx.readFile('data.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    await Data.deleteMany({});
    await Data.insertMany(jsonData);

    console.log('Excel data synced to MongoDB successfully.');
  } catch (err) {
    console.log('Error syncing Excel to MongoDB:', err);
  }
});
setInterval(() => {
  fetch('https://sqac-website-k0bp.onrender.com/api/health')
    .then(res => console.log(`Self-ping status: ${res.status}`))
    .catch(err => console.error('Self-ping failed:', err));
}, 14 * 60 * 1000);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));