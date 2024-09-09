const XLSX = require('xlsx');

function exportToCSV(data, fileName) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const fs = require('fs');
    fs.writeFileSync(`${fileName}.csv`, csv);
}

function exportToTSV(data, fileName) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const tsv = XLSX.utils.sheet_to_csv(worksheet, { FS: '\t' });
    const fs = require('fs');
    fs.writeFileSync(`${fileName}.tsv`, tsv);
}

function exportToHTML(data, fileName) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const html = XLSX.utils.sheet_to_html(worksheet);
    const fs = require('fs');
    fs.writeFileSync(`${fileName}.html`, html);
}

function exportToExcel(data, fileName) {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

module.exports = {
    exportToCSV,
    exportToTSV,
    exportToHTML,
    exportToExcel
};