require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');

const dataRoutes = require('./routes/dataRoutes');
const contactRoutes = require('./routes/contactRoutes');
const teamRoutes = require('./routes/teamRoutes');
const Candidate = require('./models/Candidate');
const { storage } = require('./utils/cloudinary');
const upload = multer({ storage });

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

// --- Candidate / Registration API ---
app.post('/api/candidates', async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    await candidate.save();
    res.status(201).json({ message: 'Application submitted successfully', candidate });
  } catch (err) {
    console.error('Error saving candidate:', err);
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/candidates', async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ submittedAt: -1 });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.patch('/api/candidates/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Reviewed', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json(updatedCandidate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// --- Vercel Cron Job Endpoint ---
app.get('/api/cron/sync', async (req, res) => {
  console.log('Running Excel to MongoDB sync...');

  try {
    const workbook = xlsx.readFile('data.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    const Data = require('./models/Data'); // Assuming Data model exists
    await Data.deleteMany({});
    await Data.insertMany(jsonData);

    console.log('Excel data synced to MongoDB successfully.');
    res.status(200).json({ message: 'Sync successful' });
  } catch (err) {
    console.error('Error syncing Excel to MongoDB:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
if (require.main === module || !process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;