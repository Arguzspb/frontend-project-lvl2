import fs from 'fs';
import path from 'path';
import formatter from './formatters/index.js';
import buildDiff from './buildDiff.js';
import parseData from './parser.js';

const getExtension = (filepath) => path.extname(filepath).slice(1);

const readFile = (filepath) => fs.readFileSync(path.resolve(filepath), { encoding: 'utf8', flag: 'r' });

const gendiff = (filepath1, filepath2, formatType = 'stylish') => {
  const fileDataA = parseData(readFile(filepath1), getExtension(filepath1));
  const fileDataB = parseData(readFile(filepath2), getExtension(filepath2));
  const diffTree = buildDiff(fileDataA, fileDataB);
  const formatedDiff = formatter(diffTree, formatType);
  return formatedDiff;
};
export default gendiff;
