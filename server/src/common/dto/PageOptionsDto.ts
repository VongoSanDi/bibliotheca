import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

enum Order {
  'ASC',
  'DESC'
}

/**
 * Pagination params send by the client
 */
export class PageOptionsDto {
  @ApiPropertyOptional({ default: 10, minimum: 1, maximum: 50 })
  readonly take!: number;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @ApiPropertyOptional({ default: 1, minimum: 1 })
  readonly page!: number;

  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  readonly order!: string;

  @ApiPropertyOptional({ default: 'id' })
  readonly orderBy!: string;
}

/**
 *  page = Current page
 *  take = limit - max number of entities that should be taken
 *  itemCount = total number of element
 *  pageCount = total page number
 *  hasPreviousPage & hasNextPage = tell us if there is other page or not
 *  isFirstPage & isLastPage = tell us if we are at the start or end of the page
 */
export class PageMetaDto {
  constructor(pageOptionsDto: PageOptionsDto, itemCount: number) {
    const { page, take } = pageOptionsDto
    this.page = page;
    this.take = take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(itemCount / take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
    this.isFirstPage = page === 1;
    this.isLastPage = page === this.pageCount;
  }
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  @ApiProperty()
  readonly isFirstPage: boolean;

  @ApiProperty()
  readonly isLastPage: boolean;
}
