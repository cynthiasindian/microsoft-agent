const graphClient = require("../src/graph/graphClient");

async function updatePO() {
  try {
    const poFile = "PO153.xlsx";
    const cellAddress = "B2"; // change the cell you want
    const newValue = "update cynthia - yasser 12/3/2025";
    const userUPN = "FloranowAI@floranow.com"; 
    await graphClient
      .api(`/users/${userUPN}/drive/root:/POs/${poFile}:/workbook/worksheets('Order Form')/range(address='${cellAddress}')`)
      .patch({
        values: [[newValue]]
      });

    console.log(`Cell ${cellAddress} updated successfully.`);
  } catch (err) {
    console.error("Error updating PO Excel:", err);
  }
}

updatePO();
