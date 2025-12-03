const client = require("./graphClient");

async function listPOFiles() {
    const folderPath = "/POs";
    const files = await client.api(`/me/drive/root:${folderPath}:/children`).get();
    console.log("PO Files:", files.value.map(f => f.name));
}

listPOFiles();
