import csv from 'csv-parser';
import xlsx from 'xlsx';
import { Readable } from 'stream';

export const processExamFile = (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    const results = [];
    
    try {
      if (fileName.endsWith('.csv')) {
        // Process CSV file
        const stream = Readable.from(fileBuffer);
        stream
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', () => resolve(results))
          .on('error', reject);
      } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        // Process Excel file
        const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);
        resolve(jsonData);
      } else {
        reject(new Error('Unsupported file format'));
      }
    } catch (error) {
      reject(error);
    }
  });
};