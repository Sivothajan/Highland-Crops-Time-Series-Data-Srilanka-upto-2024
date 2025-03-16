# Highland Crops Time Series Data Sri Lanka (up to 2024)

This project is focused on collecting, processing, and analyzing time series data of highland crops in Sri Lanka up to the year 2024. The data is sourced from the Department of Census and Statistics, Sri Lanka.

## Project Structure

- `makeXlsx.js`: Script to convert JSON data to an Excel file.
- `errorCorrection.js`: Script to fetch and correct data errors from the source website.
- `fetchData.js`: Script to fetch data from the source website and save it as a JSON file.

## Prerequisites

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/sivothajan/Highland-Crops-Time-Series-Data-Srilanka-upto-2024.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Highland-Crops-Time-Series-Data-Srilanka-upto-2024
    ```
3. Install the required dependencies:
    ```bash
    npm install
    ```

## Usage

1. Fetch data from the source website:
    ```bash
    node fetchData.js
    ```
    or
    ```bash
    npm run fetchData
    ```

2. Correct data errors:
    ```bash
    node errorCorrection.js
    ```
    or
    ```bash
    npm run errorCorrection
    ```

3. Convert JSON data to Excel:
    ```bash
    node makeXlsx.js
    ```
    or
    ```bash
    npm run makeXlsx
    ```

## Data Files

- `./data/researchData.json`: Contains the fetched and corrected data.
- `./data/researchData.xlsx`: Contains the Excel version of the data.
- `./data/error.log`: Contains logs of any errors encountered during data fetching.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Department of Census and Statistics, Sri Lanka for providing the data.
- [axios](https://github.com/axios/axios) for HTTP requests.
- [cheerio](https://github.com/cheeriojs/cheerio) for parsing HTML.
- [ExcelJS](https://github.com/exceljs/exceljs) for handling Excel files.