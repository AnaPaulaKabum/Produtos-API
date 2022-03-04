import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProdutoAlterarRequest {

    @IsNotEmpty()
    @IsNumber()
    id:number;

    @IsNotEmpty()
    @IsString()
    codigo:string;

    @IsNotEmpty()
    @IsString()
    nome:string;

    @IsNotEmpty()
    @IsNumber()
    preco:number;
    
    @IsNotEmpty()
    @IsNumber()
    qtde:number;
}
