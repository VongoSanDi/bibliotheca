import { Tracability } from 'src/common/entities/base.tracability';
import { Entity } from 'typeorm';

@Entity('CURRENCY')
export class Currency extends Tracability {
  currency_id: number;

  currency_name: string;

  currency_symbol: string;

  iso_code: string;
}
