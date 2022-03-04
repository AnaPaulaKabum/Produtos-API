import { Body, Controller, Delete, Get, Param,Post, Put } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProdutosServices } from "../../services/produtos.service";
import { ProdutoDto } from "../../shared/ProdutoDto";
import { ErrorResponse } from "../../errorResponse";
import { IdRequest } from "../Request/idRequest";

@Controller('produtos')
@ApiTags('produtos')
export class ProdutosController{

    constructor(private produtosServices: ProdutosServices){}

    @Get()
    @ApiOperation({ summary: 'Lista de todos os produtos' })
    async obterTodos(): Promise<Array<ProdutoDto>> { 
        return await this.produtosServices.obterTodos();
    }

    @Post()
    @ApiOperation({ summary: 'Cria um novo produto' })
    async criar(@Body() produto: ProdutoDto):Promise <ProdutoDto>{
         return await this.produtosServices.criar(produto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Recupera produto pelo ID' })
    @ApiResponse({status: 200,description: 'Produto encontrado',type: ProdutoDto})
    async obterUm(@Param('id') param: IdRequest):Promise<any>
    {
        return await this.produtosServices.obterUm(param.id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deletar um produto' })
    async apagar(@Param('id') id: number):Promise<any> {

       const produto = await this.produtosServices.obterUm(id);
        if (produto){
            await this.produtosServices.apagar(produto);
            return ;           
        }  
        
        return new ErrorResponse(101, `Nao foi encontrado o produto com codigo ${id}`);
    }

    @Put()
    @ApiOperation({ summary: 'Altera um produto' })
    async alterar(@Body() produto: ProdutoDto): Promise<ProdutoDto>{
        return this.produtosServices.alterar(produto);
    }
}