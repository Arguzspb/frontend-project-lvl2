import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const stylish = readFile('stylishResult.txt');
const plain = readFile('plainResult.txt');

describe('testing all formates', () => {
  test('stylish format, json files', () => {
    expect(gendiff('file1.json', 'file2.json')).toEqual(stylish);
  });
  test('stylish format, yaml files', () => {
    expect(gendiff('file1.yml', 'file2.yml')).toEqual(stylish);
  });
  test('plain format, json files', () => {
    expect(gendiff('file1.json', 'file2.json', 'plain')).toEqual(plain);
  });
  test('plain format, yaml files', () => {
    expect(gendiff('file1.yml', 'file2.yml', 'plain')).toEqual(plain);
  });
});
