import { Mapper } from "../../../core/base/mapper";
import { ProdutoDto } from "../../../shared/ProdutoDto";
import { ProdutoEntity } from "../entites/produto.entity";


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