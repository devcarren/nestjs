import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, VersionColumn } from 'typeorm';
import { Region } from './region.entity';
import { BaseAuditEntity } from './baseaudit.entity';

@Entity('countries')
export class Country extends BaseAuditEntity {
  @PrimaryColumn({ type: 'char', length: 2 })
  country_id: string;

  @Column({ type: 'varchar', length: 40 })
  country_name: string;

  @ManyToOne(() => Region)
  @JoinColumn({ name: 'region_id' })
  region: Region;
}
