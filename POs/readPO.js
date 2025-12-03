const graphClient = require("../src/graph/graphClient");

async function readPO() {
  try {
    const poFile = "PO153.xlsx";
    const userUPN = "FloranowAI@floranow.com"; // ← replace with actual owner email
    const range = await graphClient
      .api(`/users/${userUPN}/drive/root:/POs/${poFile}:/workbook/worksheets('Order Form')/range(address='A1:E100')`)
      .get();

    console.log("Excel Data:", range.values);
  } catch (err) {
    console.error("Error reading PO Excel:", err);
  }
}

readPO();
