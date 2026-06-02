import axios from 'axios';
import fs from 'fs';
import * as cheerio from 'cheerio';

// Import the finalData.json
const data = JSON.parse(fs.readFileSync('./json/dataFilter.json', 'utf8'));

// Crop category names mapping
const cropCategories = JSON.parse(
  fs.readFileSync('./json/cropCategories.json', 'utf8')
);

// Import the (dC mapping) errorCorrection JSON file
const dcMapping = JSON.parse(
  fs.readFileSync('./json/dCMappingErrorCorrection.json', 'utf8')
);

const baseUrl =
  'https://www.statistics.gov.lk/HIES/HIES2006_07Website/HighlandCrops.asp?getcode=Table&dL=011112132122233132334142434445515253616271728182919299&P=1&E=1';

async function fetchData() {
  const allTableData = [];
  const errorLog = [];

  // Loop through each mapping in dcMapping
  for (const mapping of dcMapping) {
    const cropCatNumber = mapping.C;
    const correctedDC = mapping.dC;

    // Find the corresponding years (F and T) in data.C
    const cropCat = data.C.find((cat) => cat[cropCatNumber]);
    if (!cropCat) {
      console.error(`No data found for crop category ${cropCatNumber}`);
      continue;
    }

    const years = cropCat[cropCatNumber];
    let url = `${baseUrl}&C=${cropCatNumber}&dC=${correctedDC}&F=${years.F}&T=${years.T}`;

    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      // Extracting the table data
      const tableData = [];
      const yearsRow = [];
      const districts = [];

      $('table tr').each((index, row) => {
        const cells = $(row).find('td');

        if (index === 0) {
          // Extract year names
          cells.each((i, cell) => {
            if (i > 0) {
              yearsRow.push($(cell).text().trim());
            }
          });
          return;
        }

        if (index >= 3) {
          // Extract district names and data rows
          const district = $(cells[0]).text().trim();
          districts.push(district);

          const rowData = [];
          cells.each((i, cell) => {
            if (i > 0) {
              rowData.push($(cell).text().trim());
            }
          });

          if (rowData.length > 0) {
            for (let i = 0; i < rowData.length; i += 6) {
              const year = yearsRow[i / 6];
              const extentYala = rowData[i];
              const extentMaha = rowData[i + 1];
              const extentTotal = rowData[i + 2];
              const productionYala = rowData[i + 3];
              const productionMaha = rowData[i + 4];
              const productionTotal = rowData[i + 5];

              let cropName = '';
              let cropCategory = '';

              for (const [category, crops] of Object.entries(cropCategories)) {
                if (crops[cropCatNumber]) {
                  cropName = crops[cropCatNumber];
                  cropCategory = category;
                  break;
                }
              }

              tableData.push({
                District: district,
                Season: 'Yala',
                CropCategory: cropCategory,
                Crop: cropName,
                Year: year,
                Extent: extentYala,
                Production: productionYala,
              });

              tableData.push({
                District: district,
                Season: 'Maha',
                CropCategory: cropCategory,
                Crop: cropName,
                Year: year,
                Extent: extentMaha,
                Production: productionMaha,
              });

              tableData.push({
                District: district,
                Season: 'Total',
                CropCategory: cropCategory,
                Crop: cropName,
                Year: year,
                Extent: extentTotal,
                Production: productionTotal,
              });
            }
          }
        }
      });

      allTableData.push(...tableData);
      console.log(
        `Data for crop category ${cropCatNumber} with corrected dC saved.`
      );
    } catch (error) {
      console.error(
        `Error fetching data for crop category ${cropCatNumber} with corrected dC:`,
        error
      );
      errorLog.push({
        cropCatNumber: cropCatNumber,
        url: url,
        error: error.message,
      });
    }
  }

  // Read existing data from researchData.json if it exists
  let existingData = [];
  if (fs.existsSync('./data/researchData.json')) {
    existingData = JSON.parse(
      fs.readFileSync('./data/researchData.json', 'utf8')
    );
  }

  // Merge existing data with new data
  const mergedData = [...existingData, ...allTableData];

  // Save all table data as a single JSON file
  try {
    // If the "data" directory does not exist, this will create it
    if (!fs.existsSync('./data')) {
      fs.mkdirSync('./data');
    }
    fs.writeFileSync(
      './data/researchData.json',
      JSON.stringify(mergedData, null, 2)
    );
    console.log('All data saved to researchData.json');
  } catch (err) {
    console.error(err);
  } finally {
    fs.writeFileSync('./data/error.log', JSON.stringify(errorLog, null, 2));
    console.log('All errors saved to error.log');
  }
}

fetchData();
