import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PageOptionsDto {
  @ApiPropertyOptional()
  readonly take: number = 10;

  @ApiPropertyOptional()
  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @ApiPropertyOptional()
  readonly page: number = 1;

  @ApiPropertyOptional()
  readonly order: string = 'ASC';

  @ApiPropertyOptional()
  readonly orderBy: string = 'id';
}

/**
 *  page = Current page
 *  take = element count per page
 *  itemCount = total number of element
 *  pageCount = total page number
 *  hasPreviousPage & hasNextPage = tell us if there is other page or not
 */
export class PageMetaDto {
  constructor(pageOptionsDto: PageOptionsDto, itemCount: number) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(itemCount / pageOptionsDto.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
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
}
