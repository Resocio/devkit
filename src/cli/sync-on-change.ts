
import sync from 'sync-directory'
import path from 'path'

export const syncOnChange = async (watchedDir: string, destDir: string, clientDir: string) => {
  watchedDir = path.normalize(watchedDir);
  destDir = path.normalize(destDir);

  sync(watchedDir, destDir, {
    watch: true,
    type: 'hardlink',
    deleteOrphaned: true,
    afterSync: (event) => {
      sync(clientDir, destDir, { deleteOrphaned: false });
    },
    onError: (e) => {
      console.log(`Error while syncing: ${e}`);
    }
  });
};
