import { Body, Controller, Delete, Get, Param,Post, Put } from "@nestjs/common";

@Controller('produtos')
export class ProdutosController{

    @Get()
    obterTodos():string{
        return `Lista todos os produtos`;
    }

    @Get(':id')
    obterUm(@Param() params):string
    {
        return `Retona os dados do produto ${params.id}`;
    }

    @Post()
    criar(@Body() produto){
        console.log(produto);
        return `Produto criado`
    }

    @Put()
    alterar(@Body() produto){
        console.log(produto);
        return `Produto atualizado`
    }

    @Delete(':id')
    apaga(@Param() params):string{
        return `Apaga o produto ${params.id}`
    }

}