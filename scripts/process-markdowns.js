/* eslint-disable */

import { readdir } from 'fs/promises';
import path from 'path';
import { dirname } from 'path';
import { mkdir } from 'fs/promises';

async function main() {
  const dirNames = await readdir(path.resolve(dirname('.'), 'markdowns'));
  const markdownSet = new Set(dirNames); 
  const publicDirNames = await readdir(path.resolve(dirname('.'), 'public'));
  const publicSet = new Set(publicDirNames);

  for (const element of markdownSet) {
    if (!publicSet.has(element)) {
      console.log({ left: element, right: '' });
    }
  }

  for (const element of publicSet) {
    if (!markdownSet.has(element)) {
      console.log({ left: '', right: element });
    }
  }
}

main();
