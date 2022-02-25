import { ApiProperty } from "@nestjs/swagger";
import { Entity as EntityClass } from "../../../core/base/entity";
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:"produto"})
export class ProdutoEntity extends EntityClass{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})  
    codigo:string;

    @Column({nullable:false})
    @ApiProperty({ example: "Livro NestJS"})
    nome:string;

    @Column({nullable:false})  
    @ApiProperty({ example: 19.99})
    preco:number;

    @Column({nullable:false})  
    @ApiProperty({ example: 100})
    qtde:number;
}
