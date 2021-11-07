import { readdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { Dirent } from 'fs';
import { v4 as uuidv4 } from 'uuid';

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
  relativePathSegments: string[];
};

export class FileNameIndex {
  private _fileNameToId!: Record<string, string>;
  private _idToFileName!: Record<string, string>;

  constructor(
    _fileNameToId?: Record<string, string>,
    _idToFileName?: Record<string, string>,
  ) {
    this._fileNameToId = {};
    this._idToFileName = {};

    if (_fileNameToId) {
      this._fileNameToId = _fileNameToId;
    }

    if (_idToFileName) {
      this._idToFileName = _idToFileName;
    }
  }

  public add(path: string, id: string): void {
    this._fileNameToId[path] = id;
    this._addReverse(id, path);
  }

  private _addReverse(id: string, path: string) {
    this._idToFileName[id] = path;
  }

  public toJson(): string {
    const _fileNameToId = this._fileNameToId;
    const _idToFileName = this._idToFileName;
    const json = JSON.stringify({ _fileNameToId, _idToFileName });
    return json;
  }

  public static fromJson(json: string): FileNameIndex {
    const data = JSON.parse(json);
    const requireFields = ['_fileNameToId', '_idToFileName'];
    for (const field of requireFields) {
      if (!data[field]) {
        throw new Error();
      }
    }

    return new FileNameIndex(...(data as any));
  }
}

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

const markdownPathName = 'markdowns';
const dataPath = 'src/data';
const markdownsPath = resolve(dataPath, markdownPathName);

async function main() {
  const subEntries = await readdir(markdownsPath, { withFileTypes: true });
  const unTraversedEntries = new Array<AnnotatedEntry>();
  while (subEntries.length) {
    const entry = subEntries.pop() as Dirent;
    const annotatedEntry: AnnotatedEntry = {
      entry: entry,
      type: getEntryType(entry),
      relativePathSegments: [entry.name],
    };
    unTraversedEntries.push(annotatedEntry);
  }

  const fileNameIndex = new FileNameIndex();

  while (unTraversedEntries.length) {
    const ent = unTraversedEntries.pop() as AnnotatedEntry;

    if (ent.entry.isDirectory()) {
      // console.log(`${ent.fullPath} is directory`);

      const fullPathSegments = [markdownsPath, ...ent.relativePathSegments];
      const fullPath = resolve(...fullPathSegments);
      const subEntries = await readdir(fullPath, { withFileTypes: true });

      while (subEntries.length) {
        const subEnt = subEntries.pop() as Dirent;
        unTraversedEntries.push({
          entry: subEnt,
          type: getEntryType(subEnt),
          relativePathSegments: [...ent.relativePathSegments, subEnt.name],
        });
      }
    }

    if (ent.entry.isFile()) {
      const path = ent.relativePathSegments.join('/');
      const id = uuidv4();
      fileNameIndex.add(path, id);
    }
  }

  const markdownDataIndexPath = resolve(
    dataPath,
    markdownPathName + '.index.json',
  );
  const markdownDataIndex = fileNameIndex.toJson();
  await writeFile(markdownDataIndexPath, markdownDataIndex);
}

main();
