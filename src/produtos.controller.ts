import { Body, Controller, Delete, Get, Param,Post, Put } from "@nestjs/common";
import { Produto } from "./produto.model";
import { ProdutosServices } from "./produtos.service";

@Controller('produtos')
export class ProdutosController{

    constructor(private produtosServices: ProdutosServices){      
    }

    @Get()
    obterTodos(): Array<Produto>{
        return this.produtosServices.obterTodos();
    }

    @Get(':id')
    obterUm(@Param() params):Produto
    {
        return this.produtosServices.obterUm(params.id);
    }

    @Post()
    criar(@Body() produto: Produto){
        produto.id = 100;
        this.produtosServices.criar(produto);
    }

    @Put()
    alterar(@Body() produto: Produto): Produto{
        return this.produtosServices.alterar(produto);
    }

    @Delete(':id')
    apagar(@Param() params){
       this.produtosServices.apagar(params.id);
    }
}