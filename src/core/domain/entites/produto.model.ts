import { ApiProperty } from "@nestjs/swagger";
import { Entity } from "src/core/base/entity";

//@Table
export class ProdutoEntity extends Entity{

    codigo:string;

    //@Column({type: DataType.STRING, allowNull:false})
    @ApiProperty({ example: "Livro NestJS"})
    nome:string;

    //@Column({ type: DataType.DECIMAL, allowNull:false})
    @ApiProperty({ example: 19.99})
    preco:number;

    //@Column({ type: DataType.INTEGER, allowNull:false})
    @ApiProperty({ example: 100})
    qtde:number;

    constructor (codigo?:string,nome?:string,preco?:number,qtde?:number){
        super();
        this.codigo=codigo;
        this.nome= nome;
        this.preco = preco;
        this.qtde = qtde;
    }

}
