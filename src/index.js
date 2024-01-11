import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import formatter from './formatters/index.js';
import buildDiff from './buildDiff.js';
import parseData from './parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getAbsolutePath = (fileName) => path
  .join(`${__dirname}`, '..', '__fixtures__', fileName);
const getFileData = (filepath) => readFileSync(filepath, 'utf-8');
const getExtension = (filepath) => path.extname(filepath).slice(1);

const gendiff = (filepath1, filepath2, formatType = 'stylish') => {
  const absPath1 = getAbsolutePath(filepath1);
  const absPath2 = getAbsolutePath(filepath2);
  const fileDataA = parseData(getFileData(absPath1), getExtension(absPath1));
  const fileDataB = parseData(getFileData(absPath2), getExtension(absPath2));
  const diffTree = buildDiff(fileDataA, fileDataB);
  const formatedDiff = formatter(diffTree, formatType);
  return formatedDiff;
};
export default gendiff;
