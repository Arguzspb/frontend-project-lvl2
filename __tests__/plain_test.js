import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const resultPlain = readFile('plainTestResult.txt');

test('plain json-format object', () => {
  expect(gendiff('file1.json', 'file2.json')).toEqual(resultPlain);
});

test('yaml-format test', () => {
  expect(gendiff('file1.yml', 'file2.yml')).toEqual(resultPlain);
});
