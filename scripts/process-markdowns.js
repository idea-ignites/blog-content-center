/* eslint-disable */

import { readdir } from 'fs/promises';
import path from 'path';
import { dirname } from 'path';
import { rename } from 'fs/promises';

async function main() {
  const publicDirNames = await readdir(path.resolve(dirname('.'), 'public'));

  for (const dirName of publicDirNames) {
    const fullDirName = path.resolve(dirname('.'), 'public', dirName);
    readdir(fullDirName)
      .then((subDirNames) =>
        subDirNames.map((subDirName) =>
          path.resolve(dirname('.'), 'public', dirName, subDirName),
        ),
      )
      .then((subDirFullNames) =>
        subDirFullNames.map((subDirFullName) => path.parse(subDirFullName)),
      )
      .then((pathObjs) => {
        let moved = 0;
        for (const pathObj of pathObjs) {
          const fromPath = path.resolve(pathObj.dir, pathObj.base);
          const toPath = path.resolve(
            dirname('.'),
            'markdowns',
            dirName,
            'figures',
            pathObj.base,
          );

          rename(fromPath, toPath).then(() => {
            moved = moved + 1;
            console.log({ fromPath, toPath, moved });
          });
        }
      });
  }
}

main();
