const config = {
  openAIKey: process.env.OPENAI_API_KEY,
  openAIModelName: "gpt-3.5-turbo",

  // Microsoft Graph / Azure credentials
  tenantId: process.env.TENANT_ID,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
};

console.log("TENANT_ID:", config.tenantId); // should print your value
console.log("CLIENT_ID:", config.clientId);
console.log("CLIENT_SECRET:", config.clientSecret ? "******" : undefined);

module.exports = config;
