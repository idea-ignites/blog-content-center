import { Injectable } from '@nestjs/common';
import { resolve, parse } from 'path';
import * as markdownResourceIndex from 'src/data/markdowns.index.json';
import { ResourceInfo } from './types';

const markdownResourceBasePath = 'src/data/markdowns';

@Injectable()
export class ResourceService {
  getFullPathOfResourceId(resourceId: string): ResourceInfo {
    const fullPath = resolve(
      markdownResourceBasePath,
      markdownResourceIndex._idToFileName[resourceId],
    );
    const pathObject = parse(fullPath);
    const suffix = pathObject.ext;

    return { fullPath, suffix, resourceId };
  }
}
