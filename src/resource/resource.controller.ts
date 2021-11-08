import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { readFile } from 'fs/promises';
import { mimeMap } from './mime';
import { ResourceService } from './resource.service';

@Controller('resources')
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @Get()
  async getResourceById(
    @Query('id') resourceId: string,
    @Res() response: Response,
  ) {
    const resourceInfo =
      this.resourceService.getFullPathOfResourceId(resourceId);

    const suffix = resourceInfo.suffix.split('.')[1];

    response.setHeader('Content-Type', mimeMap[suffix]);

    const fileContent = await readFile(resourceInfo.fullPath);
    response.send(fileContent);
  }
}
