
import sync from 'sync-directory'
import path from 'path'
import copy from 'copy';
import fs from 'fs/promises';

export const syncOnChange = async (watchedDir: string, destDir: string, clientDir: string, envFile: string) => {
  watchedDir = path.normalize(watchedDir);
  destDir = path.normalize(destDir);

  sync(watchedDir, destDir, {
    watch: true,
    type: 'hardlink',
    deleteOrphaned: true,
    afterSync: (event) => {
      sync(clientDir, destDir, { deleteOrphaned: false, afterSync: async () => {
        await fs.copyFile(envFile, `${destDir}/env.json`);
      }});
    },
    onError: (e) => {
      console.log(`Error while syncing: ${e}`);
    }
  });
};
