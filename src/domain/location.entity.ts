import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, VersionColumn } from 'typeorm';
import { Country } from './country.entity';
import { BaseAuditEntity } from './baseaudit.entity';

@Entity('locations')
export class Location extends BaseAuditEntity {
  @PrimaryGeneratedColumn('increment')
  location_id: number;

  @Column({ type: 'varchar', length: 40, nullable: true })
  street_address: string;

  @Column({ type: 'varchar', length: 12, nullable: true })
  postal_code: string;

  @Column({ type: 'varchar', length: 30 })
  city: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  state_province: string;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country_id' })
  country: Country;
}
