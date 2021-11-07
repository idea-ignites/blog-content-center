import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { MarkdownService } from './markdown.service';
import { MarkdownData } from './types';

@Controller('markdown')
export class MarkdownController {
  constructor(private markdownService: MarkdownService) {}

  @Get(':markdownId')
  async getMarkdownData(@Param('markdownId') markdownId: string) {
    const formalMarkdownId = this._getRegularMarkdownId(markdownId) ?? '404.md';

    const markdownData: MarkdownData =
      await this.markdownService.getMarkdownData(formalMarkdownId);

    return markdownData;
  }

  private _getRegularMarkdownId(rawMarkdownId: string) {
    const markdownFileNameRegex = /([a-zA-Z0-9.\-]+)\.(md)/;
    const testResult = markdownFileNameRegex.exec(rawMarkdownId);
    if (!testResult) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    return testResult[0];
  }
}
