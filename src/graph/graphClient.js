require('dotenv').config(); // load .env first

const { Client } = require("@microsoft/microsoft-graph-client");
const { ClientSecretCredential } = require("@azure/identity");
const config = require("../config");

// Create a credential object
const credential = new ClientSecretCredential(
  config.tenantId,
  config.clientId,
  config.clientSecret
);

// Wrap it in an auth provider with getAccessToken method
const authProvider = {
  getAccessToken: async () => {
    const tokenResponse = await credential.getToken("https://graph.microsoft.com/.default");
    return tokenResponse.token;
  }
};

// Initialize Graph client
const client = Client.initWithMiddleware({
  authProvider
});

module.exports = client;
