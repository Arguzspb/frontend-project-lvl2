#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format (default "stylish")')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2, program.opts().format));
  });
program.parse();
