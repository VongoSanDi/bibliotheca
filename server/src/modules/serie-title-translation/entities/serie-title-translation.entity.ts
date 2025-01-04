import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('SERIE_TITLE_TRANSLATION')
export class SerieTitleTranslation {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column()
  serie_id: number;

  @Column()
  translated_title: string;

  @Column()
  language_id: number;
}
