import { Injectable } from '@nestjs/common';
import { articles } from '../data/articles';

@Injectable()
export class ArticleService {
  getArticles(offset: number, limit: number) {
    return articles.slice(offset, offset + limit);
  }
}
