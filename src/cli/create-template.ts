import fs from 'fs/promises'
import copy from 'copy'

export const copyTemplate = async (dir: string): Promise<void> => {
  await fs.mkdir(dir, { recursive: true });

  const templateDir = `${__dirname}/../../starter-templates/basic`;

  return new Promise((accept, reject) => {
    copy(`${templateDir}/*`, dir, (err) => {
      if (err) {
        reject(err);
      }
      accept();
    });
  });
};

export const createTemplate = async (dir: string): Promise<void> => {
  await copyTemplate(dir);

  // TODO: Print a message to indicate what's next
};
