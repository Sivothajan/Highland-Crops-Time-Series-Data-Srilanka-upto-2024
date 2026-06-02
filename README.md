# Highland Crops Time Series Data Sri Lanka (up to 2025)

This project is focused on collecting, processing, and analyzing time series data of highland crops in Sri Lanka up to the year 2025. The data is sourced from the Department of Census and Statistics, Sri Lanka.

## Project Structure

- [`fetchData.js`](./src/fetchData.js): Script to fetch data from the source website and save it as a JSON file.
- [`errorCorrection.js`](./src/errorCorrection.js): Script to fetch and correct data errors from the source website.
- [`makeXlsx.js`](./src/makeXlsx.js): Script to convert JSON data to an Excel file.

## Prerequisites

- Node.js or Bun installed on your machine.
- Internet connection to fetch data from the source website.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sivothajan/Highland-Crops-Time-Series-Data-Srilanka.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Highland-Crops-Time-Series-Data-Srilanka
   ```

3. Install the required dependencies:

   ```bash
   npm install

   # or using bun
   bun install
   ```

## Usage

1. Fetch data from the source website:

   ```bash
   npm run fetchData

   # or using bun
   bun run fetchData
   ```

2. Correct data errors:

   ```bash
   npm run errorCorrection

   # or using bun
   bun run errorCorrection
   ```

3. Convert JSON data to Excel:

   ```bash
   npm run makeXlsx

   # or using bun
   bun run makeXlsx
   ```

## Data Files

- [`researchData.json`](./data//researchData.json): Contains the fetched and corrected data.
- [`researchData.xlsx`](./data//researchData.xlsx): Contains the Excel version of the data.
- [`error.log`](./data//error.log): Contains logs of any errors encountered during data fetching.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Department of Census and Statistics, Sri Lanka for providing the data.
- [axios](https://github.com/axios/axios) for HTTP requests.
- [cheerio](https://github.com/cheeriojs/cheerio) for parsing HTML.
- [ExcelJS](https://github.com/exceljs/exceljs) for handling Excel files.
- [prettier](https://prettier.io/) for code formatting.
