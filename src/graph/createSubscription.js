// src/graph/createSubscription.js
require('dotenv').config({ path: './.env' }); // adjust path if needed
const fetch = require('node-fetch');

const TENANT_ID = process.env.TENANT_ID;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const SITE_ID = process.env.SITE_ID;
const DRIVE_ID = process.env.DRIVE_ID;
const GRAPH_WEBHOOK_URL = process.env.GRAPH_WEBHOOK_URL;
const CLIENT_STATE = process.env.SUBSCRIPTION_CLIENT_STATE || 'FloraNowSecret123';
const ROOT_ITEM_ID = process.env.ROOT_ITEM_ID;


async function getAppToken() {
  const url = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;
  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    scope: 'https://graph.microsoft.com/.default',
    client_secret: CLIENT_SECRET,
    grant_type: 'client_credentials'
  });
  const r = await fetch(url, { method: 'POST', body });
  const json = await r.json();
  if (!json.access_token) throw new Error('Failed to get app token: ' + JSON.stringify(json));
  return json.access_token;
}

async function createSubscription() {
  const token = await getAppToken();
  const subscription = {
    // changeType: "updated",
    changeType: "updated",
    notificationUrl: `${GRAPH_WEBHOOK_URL}/api/graph-webhook`,
  //resource: `/sites/${SITE_ID}/drives/${DRIVE_ID}/items/${process.env.FOLDER_ID}/children`,
  resource: `/sites/${SITE_ID}/drives/${DRIVE_ID}/root`,  
  expirationDateTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
    clientState: CLIENT_STATE
  };
  //ROOT_ITEM_ID= 01UD6S4SF6Y2GOVW7725BZO354PWSELRRZ

  const res = await fetch('https://graph.microsoft.com/v1.0/subscriptions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subscription)
  });

  const data = await res.json();
  console.log('Create subscription response:', JSON.stringify(data, null, 2));
}

createSubscription().catch(err => {
  console.error('Error creating subscription:', err);
  process.exit(1);
});
