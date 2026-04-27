const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Project = require('../models/Project');
const authMiddleware = require('../middleware/auth');

// GET all projects (public)
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category && category !== 'all') query.category = category;
    if (search) query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { techStack: { $in: [new RegExp(search, 'i')] } }
    ];
    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single project (public)
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create project (admin only)
router.post('/', authMiddleware, [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update project (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE project (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Seed sample projects (admin only)
router.post('/seed/data', authMiddleware, async (req, res) => {
  try {
    await Project.deleteMany({});
    const sampleProjects = [
      {
        title: 'Customer Churn Prediction',
        description: 'ML model to predict customer churn using telecom dataset with 95% accuracy.',
        problem: 'Telecom companies lose revenue due to customer churn. Need to identify at-risk customers.',
        dataset: 'IBM Telco Customer Churn Dataset (7,043 rows, 21 features)',
        approach: 'EDA → Feature Engineering → Random Forest + XGBoost → SHAP explanations',
        results: 'Achieved 95.2% accuracy, 0.94 AUC-ROC. Identified top 5 churn drivers.',
        techStack: ['Python', 'Scikit-learn', 'XGBoost', 'SHAP', 'Pandas', 'Matplotlib'],
        githubLink: 'https://github.com',
        liveLink: '',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        category: 'Machine Learning',
        featured: true
      },
      {
        title: 'Sales Analytics Dashboard',
        description: 'Interactive Power BI dashboard with Python backend showing real-time sales KPIs.',
        problem: 'Management needed real-time visibility into sales performance by region and product.',
        dataset: 'Superstore Dataset (9,994 orders, 21 columns)',
        approach: 'Data Cleaning → KPI Design → DAX Measures → Python API → Power BI Integration',
        results: 'Reduced reporting time by 80%. Dashboard used daily by 15 managers.',
        techStack: ['Python', 'Power BI', 'Pandas', 'SQL', 'DAX'],
        githubLink: 'https://github.com',
        liveLink: '',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        category: 'Visualization',
        featured: true
      },
      {
        title: 'Sentiment Analysis on Twitter',
        description: 'NLP model classifying tweet sentiment with BERT fine-tuning.',
        problem: 'Brand monitoring requires understanding public sentiment at scale.',
        dataset: 'Twitter Sentiment140 Dataset (1.6M tweets)',
        approach: 'Text Preprocessing → TF-IDF → BERT Fine-tuning → REST API deployment',
        results: '91% accuracy on test set. Processes 1000 tweets/second via API.',
        techStack: ['Python', 'BERT', 'HuggingFace', 'Flask', 'NLTK'],
        githubLink: 'https://github.com',
        liveLink: '',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800',
        category: 'NLP',
        featured: false
      },
      {
        title: 'COVID-19 Data Analysis',
        description: 'Comprehensive EDA and visualization of global COVID-19 trends.',
        problem: 'Understanding pandemic spread patterns for public health insights.',
        dataset: 'Our World in Data COVID-19 Dataset (200+ countries, 2 years)',
        approach: 'Data Wrangling → Time Series Analysis → Geographic Visualization → Forecasting',
        results: 'Published analysis used by 3 academic papers. 500+ GitHub stars.',
        techStack: ['Python', 'Plotly', 'Pandas', 'Prophet', 'GeoPandas'],
        githubLink: 'https://github.com',
        liveLink: '',
        image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=800',
        category: 'Data Analysis',
        featured: false
      }
    ];
    await Project.insertMany(sampleProjects);
    res.json({ success: true, message: `Seeded ${sampleProjects.length} projects` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
