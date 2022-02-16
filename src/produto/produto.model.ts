import { ApiProperty } from "@nestjs/swagger";
import { Table,Model,Column, DataType } from "sequelize-typescript";

@Table
export class Produto extends Model{

    @Column({type:DataType.STRING(60), allowNull:false})
    @ApiProperty({ example: "LIV001"})
    codigo:string;

    @Column({type: DataType.STRING, allowNull:false})
    @ApiProperty({ example: "Livro NestJS"})
    nome:string;

    @Column({ type: DataType.DECIMAL, allowNull:false})
    @ApiProperty({ example: 19.99})
    preco:number;

    @Column({ type: DataType.INTEGER, allowNull:false})
    @ApiProperty({ example: 100})
    qtde:number;
}
