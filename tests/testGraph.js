require('dotenv').config(); // loads .env.local from root
const graphClient = require("../src/graph/graphClient");

async function testGraph() {
  try {
    const users = await graphClient.api("/users").get();
console.log(users); // array of users

  } catch (err) {
    console.error("Graph ERROR:", err);
  }
}

testGraph();
