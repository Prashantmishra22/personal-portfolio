const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  problem: { type: String, default: '' },
  dataset: { type: String, default: '' },
  approach: { type: String, default: '' },
  results: { type: String, default: '' },
  techStack: { type: [String], default: [] },
  githubLink: { type: String, default: '' },
  liveLink: { type: String, default: '' },
  image: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  category: {
    type: String,
    enum: ['Machine Learning', 'Data Analysis', 'Visualization', 'NLP', 'Computer Vision', 'Other'],
    default: 'Other'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
