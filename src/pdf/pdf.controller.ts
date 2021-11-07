import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private pdfService: PdfService) {}

  @Get(':pdfFileName')
  async getPdfContent(
    @Param('pdfFileName') pdfFileName: string,
    @Res() response: Response,
  ) {
    const pdfFileNameRegex = /([a-zA-Z0-9.\-]+)\.(pdf)/;
    const regularPdfFileName = pdfFileNameRegex.exec(pdfFileName);

    if (!regularPdfFileName) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    const pdfContent = await this.pdfService.getPdfContent(
      regularPdfFileName[0],
    );
    response.setHeader('Content-Type', 'application/pdf');
    response.send(pdfContent);
  }
}
