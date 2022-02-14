import { Body, Controller, Delete, Get, Param,Post, Put } from "@nestjs/common";
import {Produto} from './produto.model';

@Controller('produtos')
export class ProdutosController{

    produtos : Array<Produto> = [
        new Produto("LIV001","Livro TDD e BDD na prática",29.90),
        new Produto("LIV002","Livro Iniciando com Flutter",39.90),
        new Produto("LIV003","Inteligencia artificial na pratica",29.90)
    ]

    @Get()
    obterTodos(): Array<Produto>{
        return this.produtos;
    }

    @Get(':id')
    obterUm(@Param() params):Produto
    {
        return this.produtos[0];
    }

    @Post()
    criar(@Body() produto: Produto){
        console.log(produto);
        produto.id = 100;
        this.produtos.push(produto);
    }

    @Put()
    alterar(@Body() produto: Produto): Produto{
        return produto;
    }

    @Delete(':id')
    apaga(@Param() params){
       this.produtos.pop();
    }

}