import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getAbsolutePath = (fileName) => path
  .join(`${__dirname}`, '..', '__fixtures__', fileName);
const getFileData = (filepath) => readFileSync(filepath, 'utf-8');
const toParseData = (data) => JSON.parse(data);

const gendiff = (filepath1, filepath2) => {
  const absPath1 = getAbsolutePath(filepath1);
  const absPath2 = getAbsolutePath(filepath2);
  const fileDataA = toParseData(getFileData(absPath1));
  const fileDataB = toParseData(getFileData(absPath2));
  const keysA = _.keys(fileDataA);
  const keysB = _.keys(fileDataB);
  const allKeys = _.union(keysA, keysB).sort();
  let result = '';
  const operatorsMap = {
    unchanged: ' ',
    added: '+',
    changed: '-',
    deleted: '-',
  };
  const indent = '  ';

  allKeys.forEach((key) => {
    if (fileDataA[key] === fileDataB[key]) {
      result += `${indent}${operatorsMap.unchanged} ${key}: ${fileDataA[key]}\n`;
    } else if (!_.has(fileDataA, key)) {
      result += `${indent}${operatorsMap.added} ${key}: ${fileDataB[key]}\n`;
    } else if (!_.has(fileDataB, key)) {
      result += `${indent}${operatorsMap.deleted} ${key}: ${fileDataA[key]}\n`;
    } else if (fileDataA[key] !== fileDataB[key]) {
      result += `${indent}${operatorsMap.changed} ${key}: ${fileDataA[key]}\n`;
      result += `${indent}${operatorsMap.added} ${key}: ${fileDataB[key]}\n`;
    }
  });
  return `{\n${result}}`;
};
export default gendiff;
