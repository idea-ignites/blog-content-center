import { Injectable } from '@nestjs/common';
import { cards, ICard } from 'src/data/cards';

@Injectable()
export class CardService {
  getCards(offset: number, limit: number): ICard[] {
    return cards.slice(offset, offset + limit);
  }
}
