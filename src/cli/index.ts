#!/usr/bin/env node

import program from 'commander'
import { copyTemplate } from './create-template';
import { log, logDone, newLine, notice, success, warn } from './log';
import { viewTemplate } from './view-template';
import { compileTemplate } from 'create-img'

const runCommand = async () => {
  program
    .name('itdk')
    .version(require('../../package.json').version);

  program
    .command('init [template-dir]')
    .description('Create a new image template')
    .action(async (templateDir, args) => {
      const dir = templateDir || '.';
      const dirCaption = templateDir || 'the current directory';
      const dirOption = templateDir ? ` -d ${templateDir}` : '';
      log(warn(`Creating a new image template in ${dirCaption}`));

      await copyTemplate(dir);

      logDone();
      newLine();
      log("What to do next:");
      newLine();
      log("  -> View your template and see your changes in real time:");
      log(warn(`     npx itdk view${dirOption}`));
      newLine();
      log(`  -> Edit your template files in ${dirCaption}`);
      newLine();
      log("  -> Generate an image based on your template:");
      log(warn(`     npx itdk generate${dirOption}`));
      newLine();
    });

  program
    .command('view [template-dir]')
    .description('Display an image template in your browser, and refresh as you edit it')
    .action(async (templateDir, args) => {
      const dir = templateDir || '.';
      await viewTemplate(dir);
    });

  program
    .command('create [template-manifest-path]')
    .description('Create and image base on an image template')
    .option('-p, --params <parameters...>', 'Parameter values, with <name>=<value> format')
    .option('-o, --output <imagePath>', 'Output image file', './output.png')
    .action(async (manifestPath, options) => {
      log(warn(`Creating image ${options.output} based on template ${manifestPath}`));
      await compileTemplate(manifestPath, options.params, options.output);
      logDone();
    });

  log(notice('Resoc Image Template Development Kit'));
  newLine();

  program.parse(process.argv);
}

runCommand();
