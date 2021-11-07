import { Controller, Get, Query } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  getArticles(@Query('offset') offset: string, @Query('limit') limit: string) {
    let offsetNum = 0;
    if (offset && typeof parseInt(offset) === 'number') {
      offsetNum = parseInt(offset);
      if (offsetNum === NaN) {
        offsetNum = 0;
      }
    }

    let limitNum = 20;
    if (limit && typeof parseInt(limit) === 'number') {
      limitNum = parseInt(limit);
      if (limitNum === NaN) {
        limitNum = 20;
      }
    }

    return this.articleService.getArticles(offsetNum, limitNum);
  }
}
