import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseAuditEntity } from './baseaudit.entity';

@Entity('regions')
export class Region extends BaseAuditEntity {
  @PrimaryGeneratedColumn('increment')
  region_id: number;

  @Column({ type: 'varchar', length: 25 })
  region_name: string;
}
