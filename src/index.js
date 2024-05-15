import fs from 'fs';
import path from 'path';
import formatter from './formatters/index.js';
import buildDiff from './buildDiff.js';
import parseData from './parser.js';

const getExtension = (filepath) => path.extname(filepath).slice(1);

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/', filepath));

const gendiff = (filepath1, filepath2, formatType = 'stylish') => {
  const fileDataOne = parseData(readFile(filepath1), getExtension(filepath1));
  const fileDataTwo = parseData(readFile(filepath2), getExtension(filepath2));
  const diffTree = buildDiff(fileDataOne, fileDataTwo);
  return formatter(diffTree, formatType);
};
export default gendiff;
