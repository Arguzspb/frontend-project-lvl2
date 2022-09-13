#!/usr/bin/env node

import { program } from 'commander';
import gendiff from '../src/index.js';

program
  .name('gendiff')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>', 'path to file1')
  .argument('<filepath>', 'path to file2')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2));
  });
program.parse(process.argv);
