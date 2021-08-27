import path from "path";
import { cwd } from 'process'
import fs from 'fs/promises'
import os from 'os'
import { syncOnChange } from "./sync-on-change";
import supervisor from 'supervisor'
import clc from 'cli-color'
import { log, notice, warn } from "./log";

export const viewTemplate = async (templateDir: string) => {
  const viewerDir = path.normalize(`${__dirname}/../../viewer`);
  templateDir = path.resolve(templateDir);
  const serverDir = await fs.mkdtemp(path.join(os.tmpdir(), 'resoc-view-server-'));

  syncOnChange(templateDir, serverDir, viewerDir);

  const runFile = path.join(os.tmpdir(), 'reload-' + Math.random().toString().slice(2))
  const serverFile = path.join(__dirname, '../../node_modules/reload/lib/reload-server.js')

  const launchBrowser = true;
  const verbose = false;
  const port = 8080;
  const args = [
    '-e', 'html|js|css|mustache|json|png|jpg|ico', '-w', serverDir, '-q', '--', serverFile, port, serverDir, launchBrowser, 'localhost',
    runFile, '/index.html', undefined, verbose
  ];
  supervisor.run(args)

  log('Server started: ' + warn(`http://localhost: ${port}`));
  log(`Edit your template files in ${templateDir} and see the changes in real time`);
};
