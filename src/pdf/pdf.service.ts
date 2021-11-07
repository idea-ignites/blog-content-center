import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

@Injectable()
export class PdfService {
  getPdfContent(pdfFileName: string): Promise<Buffer> {
    const pdfFullPath = resolve('src', 'data', 'pdfs', pdfFileName);
    return readFile(pdfFullPath);
  }
}
