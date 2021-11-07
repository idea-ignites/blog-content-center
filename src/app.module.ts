import { Module } from '@nestjs/common';
import { MarkdownController } from './markdown/markdown.controller';
import { PdfController } from './pdf/pdf.controller';
import { ArticleController } from './article/article.controller';
import { ArticleService } from './article/article.service';
import { PdfService } from './pdf/pdf.service';
import { MarkdownService } from './markdown/markdown.service';

@Module({
  controllers: [MarkdownController, PdfController, ArticleController],
  providers: [ArticleService, PdfService, MarkdownService],
})
export class AppModule {}
