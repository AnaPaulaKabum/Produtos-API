import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class ProdutoRequest {

    id?:number;

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
