import { Controller, Get, Query } from '@nestjs/common';
import { CardService } from './card.service';

@Controller('card')
export class CardController {
  constructor(private cardService: CardService) {}

  @Get()
  getCards(@Query('offset') offset?: string, @Query('limit') limit?: string) {
    if (offset === undefined) {
      offset = '0';
    }

    if (limit === undefined) {
      limit = '20';
    }

    const offsetNum = parseInt(offset);
    const limitNum = parseInt(limit);

    return this.cardService.getCards(offsetNum, limitNum);
  }
}
