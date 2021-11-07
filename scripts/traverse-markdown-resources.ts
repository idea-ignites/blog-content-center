import { readdir } from 'fs/promises';
import { resolve } from 'path';
import { Dirent } from 'fs';

type EntryType =
  | 'file'
  | 'directory'
  | 'character'
  | 'block'
  | 'fifo'
  | 'socket'
  | 'symbolicLink'
  | 'unknown';

type AnnotatedEntry = {
  entry: Dirent;
  type: EntryType;
  fullPath: string;
};

// type PathSegment = string;
// type PathSegments = Array<PathSegment>;
// type NavigationHistory = Array<PathSegments>;

// class DirectoryExploreContext {
//   public readonly root!: PathSegment;
//   private _currentLocation!: PathSegments;
//   private _navigationHistory!: NavigationHistory;

//   public get currentLocation(): PathSegments {
//     return this._currentLocation;
//   }

//   public get history(): NavigationHistory {
//     return this._navigationHistory;
//   }

//   constructor(root: PathSegment) {
//     this.root = root;
//     this._currentLocation = [root];
//     this._navigationHistory = new Array<PathSegments>();
//   }

//   public enter(pathSegment: PathSegment): void {
//     console.log({ enter: pathSegment });
//     this._navigationHistory.push(this._currentLocation);
//     this._currentLocation = [...this._currentLocation, pathSegment];
//   }

//   public leave(): void {
//     console.log({ leave: this._currentLocation });
//     if (this._navigationHistory.length) {
//       this._currentLocation = this._navigationHistory.pop() as PathSegments;
//       return;
//     }

//     throw new RangeError();
//   }
// }

function getEntryType(entry: Dirent): EntryType {
  if (entry.isBlockDevice()) {
    return 'block';
  } else if (entry.isCharacterDevice()) {
    return 'character';
  } else if (entry.isDirectory()) {
    return 'directory';
  } else if (entry.isFIFO()) {
    return 'fifo';
  } else if (entry.isFile()) {
    return 'file';
  } else if (entry.isSocket()) {
    return 'socket';
  } else if (entry.isSymbolicLink()) {
    return 'symbolicLink';
  } else {
    return 'unknown';
  }
}

const markdownsPath = resolve('src/data/markdowns');

async function main() {
  const subEntries = await readdir(markdownsPath, { withFileTypes: true });
  const unTraversedEntries = new Array<AnnotatedEntry>();
  while (subEntries.length) {
    const entry = subEntries.pop() as Dirent;
    const annotatedEntry: AnnotatedEntry = {
      entry: entry,
      type: getEntryType(entry),
      fullPath: resolve(markdownsPath, entry.name),
    };
    unTraversedEntries.push(annotatedEntry);
  }

  while (unTraversedEntries.length) {
    const ent = unTraversedEntries.pop() as AnnotatedEntry;

    if (ent.entry.isDirectory()) {
      console.log(`${ent.fullPath} is directory`);

      const subEntries = await readdir(ent.fullPath, {
        withFileTypes: true,
      });

      while (subEntries.length) {
        const subEnt = subEntries.pop() as Dirent;
        unTraversedEntries.push({
          entry: subEnt,
          type: getEntryType(subEnt),
          fullPath: resolve(ent.fullPath, subEnt.name),
        });
      }
    }

    if (ent.entry.isFile()) {
      console.log(`${ent.fullPath} is file`);
    }
  }
}

main();
