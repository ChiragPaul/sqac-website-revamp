const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  rollNumber: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: String, required: true },
  github: { type: String, required: true },
  portfolio: { type: String },
  linkedin: { type: String },
  domain: { type: String, required: true },
  specializations: [{ type: String }],
  mission: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Reviewed', 'Rejected'], default: 'Pending' },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Candidate', CandidateSchema);
