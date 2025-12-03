const graphClient = require("../src/graph/graphClient");

async function listPOFiles() {
  try {
    const folderPath = "/POs";
   // replace 'user@example.com' with the actual email of the OneDrive user
const files = await graphClient
  .api(`/users/FloranowAI@floranow.com/drive/root:${folderPath}:/children`)
  .get();

    console.log("PO Files:", files.value.map(f => f.name));
  } catch (err) {
    console.error("Error listing PO files:", err);
  }
}

listPOFiles();
