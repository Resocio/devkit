import path from "path";
import { cwd } from 'process'
import fs from 'fs/promises'
import os from 'os'
import { syncOnChange } from "./sync-on-change";
import supervisor from 'supervisor'
import clc from 'cli-color'
import { log, notice, warn } from "./log";
import { file as tmpFile } from 'tmp-promise';

export const viewTemplate = async (manifestPath: string) => {
  const viewerDir = path.normalize(`${__dirname}/../../viewer`);
  manifestPath = path.resolve(path.normalize(manifestPath));
  const manifestName = path.basename(manifestPath);
  const templateDir = path.dirname(manifestPath);
  const serverDir = await fs.mkdtemp(path.join(os.tmpdir(), 'resoc-view-server-'));

  const envFile = await tmpFile();
  await fs.writeFile(envFile.path, JSON.stringify({
    manifestPath,
    templateDir,
    manifestName
  }));

  syncOnChange(templateDir, serverDir, viewerDir, envFile.path);

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
