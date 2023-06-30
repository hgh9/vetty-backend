import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  species: string;
  
  @Column()
  petName: string;
  
  @Column()
  birth: string;
  
  @Column()
  weight: string;
  
  @Column()
  kind: string;
  
  @Column()
  sex: string;
  
  @Column()
  allergy: string;
  
  @Column()
  neutered: boolean;
  
  @Column()
  illness: string;
  
  @Column()
  userId: number;
}
