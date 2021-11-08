import { Module } from '@nestjs/common';
import { MarkdownController } from './markdown/markdown.controller';
import { PdfController } from './pdf/pdf.controller';
import { ArticleController } from './article/article.controller';
import { PdfService } from './pdf/pdf.service';
import { MarkdownService } from './markdown/markdown.service';
import { CardController } from './card/card.controller';
import { CardService } from './card/card.service';
import { ArticleService } from './article/article.service';

@Module({
  controllers: [
    MarkdownController,
    PdfController,
    ArticleController,
    CardController,
  ],
  providers: [ArticleService, PdfService, MarkdownService, CardService],
})
export class AppModule {}
