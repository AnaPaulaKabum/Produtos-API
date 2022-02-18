import { Mapper } from "src/core/base/mapper";
import { ProdutoDto } from "src/shared/ProdutoDto";
import { ProdutoEntity } from "../entites/produto.model";


export class ProdutoMapper extends Mapper<ProdutoDto, ProdutoEntity>{


    public mapFrom(data: ProdutoDto): ProdutoEntity {

         const produto = new ProdutoEntity();
         
         if (data.id){
             produto.id = data.id;
         }

         produto.codigo = data.codigo;
         produto.nome = data.nome;
         produto.preco = data.preco;
         produto.qtde = data.qtde;
 
         return produto;
     }
 
     public mapTo(data: ProdutoEntity): ProdutoDto {

         const produto = new ProdutoDto();

         if (data.id){
            produto.id = data.id;
        }
         produto.codigo = data.codigo;
         produto.nome = data.nome;
         produto.preco = data.preco;
         produto.qtde = data.qtde;
 
         return produto;
     }
 }