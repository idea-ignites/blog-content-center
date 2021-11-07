import { readdir } from 'fs/promises';
import { resolve } from 'path';
import { Dir, Dirent } from 'fs';

const markdownsPath = resolve('src/data/markdowns');

readdir(markdownsPath, { withFileTypes: true }).then((markdownDirs) => {
  let unTraversed = [];
  for (const ent of markdownDirs) {
    unTraversed.push(ent);
  }

  unTraversed = unTraversed.slice().reverse();

  while (unTraversed.length) {
    const ent = unTraversed.pop() as Dirent;
    if (ent.isDirectory()) {
      console.log(`${ent.name} is a directory`);
    }

    if (ent.isFile()) {
      console.log(`${ent.name} is a file`);
    }
  }

  console.log({ unTraversed });
});
