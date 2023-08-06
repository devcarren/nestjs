import { CreateDateColumn, UpdateDateColumn, Column, VersionColumn } from 'typeorm';

export abstract class BaseAuditEntity {
  @CreateDateColumn({ type: 'timestamp', name: 'createdtime', default: () => 'CURRENT_TIMESTAMP' })
  createdTime: Date;

  @Column({ type: 'varchar', default: 'system', name: 'createdby' })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamp', name: 'modifiedtime' })
  modifiedTime: Date;

  @Column({ type: 'varchar', nullable: true, name: 'modifiedby' })
  modifiedBy: string;

  @VersionColumn()
  version: number;
}
