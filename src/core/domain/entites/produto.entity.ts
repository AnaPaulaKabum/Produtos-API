import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table } from "sequelize-typescript";
import { Entity } from "../../base/entity";

@Table ({modelName:"Produto"})
export class ProdutoEntity extends Entity{

    @Column({type: DataType.STRING,allowNull:false})  
    codigo:string;

    @Column({type: DataType.STRING,allowNull:false})
    @ApiProperty({ example: "Livro NestJS"})
    nome:string;

    @Column({ type: DataType.DECIMAL,allowNull:false})
    @ApiProperty({ example: 19.99})
    preco:number;

    @Column({ type: DataType.INTEGER,allowNull:false})
    @ApiProperty({ example: 100})
    qtde:number;
}
