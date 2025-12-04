require("dotenv").config();
const express = require("express");

const app = express();

// Log ALL incoming requests for debugging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    console.log('Headers:', req.headers);
    next();
});

// Parse JSON
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    console.log('✓ Health endpoint hit');
    res.json({ status: 'ok' });
});

// Webhook endpoint
app.post('/api/graph-webhook', (req, res) => {
    console.log('\n✓✓✓ WEBHOOK HIT! ✓✓✓');
    console.log('Body:', req.body);
    
    // Validation token
    if (req.query.validationToken) {
        console.log('Sending validation token');
        return res.status(200).send(req.query.validationToken);
    }
    
    // Process notifications
    if (req.body && req.body.value) {
        console.log('Processing notifications:', req.body.value);
    }
    
    res.status(202).send('Accepted');
});

// Catch-all to see what routes are being hit
app.use((req, res) => {
    console.log(`❌ No route found for: ${req.method} ${req.path}`);
    res.status(404).json({ 
        error: 'Not found',
        method: req.method,
        path: req.path,
        availableRoutes: [
            'GET /health',
            'POST /api/graph-webhook'
        ]
    });
});

const PORT = process.env.PORT || 3978;
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log('Routes:');
    console.log('  - GET  /health');
    console.log('  - POST /api/graph-webhook\n');
});