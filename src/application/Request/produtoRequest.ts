import { IsNotEmpty } from "class-validator";

export class ProdutoRequest {

    id?:number;

    @IsNotEmpty()
    codigo:string;

    @IsNotEmpty()
    nome:string;

    @IsNotEmpty()
    preco:number;
    
    @IsNotEmpty()
    qtde:number;
}
