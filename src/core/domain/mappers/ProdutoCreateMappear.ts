import { Mapper } from "src/core/base/mapper";
import { ProdutoCreateDto } from "src/shared/ProdutoCreateDto";
import { ProdutoEntity } from "../entites/produto.model";


export class ProdutoCreateMapper extends Mapper<ProdutoCreateDto, ProdutoEntity>{


    public mapFrom(data: ProdutoCreateDto): ProdutoEntity {

         const produto = new ProdutoEntity();
         
         produto.codigo = data.codigo;
         produto.nome = data.nome;
         produto.preco = data.preco;
         produto.qtde = data.qtde;
 
         return produto;
     }
 
     public mapTo(data: ProdutoEntity): ProdutoCreateDto {

         const produto = new ProdutoCreateDto();
 
         produto.codigo = data.codigo;
         produto.nome = data.nome;
         produto.preco = data.preco;
         produto.qtde = data.qtde;
 
         return produto;
     }
 }