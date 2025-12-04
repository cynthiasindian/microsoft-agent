const express = require('express');
const router = express.Router();

// Endpoint to receive Microsoft Graph notifications
router.post('/graph-webhook', async (req, res) => {
    console.log('=== WEBHOOK RECEIVED ===');
    console.log('Headers:', req.headers);
    console.log('Query:', req.query);
    console.log('Body:', req.body);
    console.log('======================');

    try {
        // Microsoft Graph sends a validation request when subscription is created
        if (req.query && req.query.validationToken) {
            console.log('Validation token received:', req.query.validationToken);
            return res.status(200).send(req.query.validationToken);
        }

        // Notifications come in req.body.value as an array
        if (req.body && req.body.value) {
            for (const notification of req.body.value) {
                console.log('Processing notification:', notification);
                // TODO: Here we will process Excel mentions later
            }
        }

        res.status(202).send('Accepted');
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add a GET endpoint for testing
router.get('/graph-webhook', (req, res) => {
    res.json({ status: 'Webhook endpoint is active' });
});

module.exports = router;