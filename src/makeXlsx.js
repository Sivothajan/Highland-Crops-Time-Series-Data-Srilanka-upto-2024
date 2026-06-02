import ExcelJS from 'exceljs';
import fs from 'fs';

const makeXlsx = async () => {
  // If the "data" directory does not exist, this will create it
  if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
  }

  // Read the JSON file
  const jsonData = JSON.parse(
    fs.readFileSync('./data/researchData.json', 'utf8')
  );

  // Create a new workbook and add a worksheet
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Sivothayan Sivasiva';
  workbook.lastModifiedBy = 'Sivothayan Sivasiva';
  const worksheet = workbook.addWorksheet('Sheet1');

  // Add JSON data to worksheet
  worksheet.columns = Object.keys(jsonData[0]).map((key) => ({
    header: key,
    key: key,
  }));
  jsonData.forEach((data) => worksheet.addRow(data));

  // Write the workbook to a file
  await workbook.xlsx.writeFile('./data/researchData.xlsx');

  console.log('Excel file created successfully.');
};

makeXlsx();
