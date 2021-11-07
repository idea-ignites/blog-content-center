import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MarkdownData } from './types';
import { resolve } from 'path';
import { readFile } from 'fs/promises';

@Injectable()
export class MarkdownService {
  async getMarkdownData(markdownId: string): Promise<MarkdownData> {
    const markdownName = this._getMarkdownName(markdownId);
    const markdownBase = 'src/data/markdowns/' + markdownName;
    const markdownRawPath = resolve(markdownBase, markdownName + '.md');
    const markdownFrontMatterPath = resolve(
      markdownBase,
      markdownName + '.frontmatter.json',
    );
    const markdownSyntaxTreePath = resolve(
      markdownBase,
      markdownName + '.syntaxtree.json',
    );

    const markdownData: MarkdownData = {
      markdownId: markdownId,
      rawContent: '',
    };

    try {
      const markdownRawContent = await readFile(markdownRawPath, {
        encoding: 'utf-8',
      });
      markdownData.rawContent = markdownRawContent;
    } catch (error) {
      throw error;
    }

    try {
      const frontmatterJson = await readFile(markdownFrontMatterPath, {
        encoding: 'utf-8',
      });
      markdownData.frontmatter = JSON.parse(frontmatterJson);
    } catch (error) {
      console.error(error);
    }

    try {
      markdownData.syntaxTreeJson = await readFile(markdownSyntaxTreePath, {
        encoding: 'utf-8',
      });
    } catch (error) {
      console.error(error);
    }

    return markdownData;
  }

  private _getMarkdownName(markdownId: string): string {
    const markdownIdRegex = /([\d\w\-]+)\.(md)/;
    const regexMatchResult = markdownId.match(markdownIdRegex);
    if (!regexMatchResult) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    const prefixName = regexMatchResult[1];
    const suffixName = regexMatchResult[2];
    if (!prefixName) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    if (suffixName !== 'md') {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    // console.log({ prefixName, suffixName });

    return prefixName;
  }
}
