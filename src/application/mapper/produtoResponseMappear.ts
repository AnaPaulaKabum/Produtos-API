
import { ProdutoDto } from "../../shared/ProdutoDto";
import { ProdutoAlterarRequest } from "../Request/produtoAlterarRequest";
import { ProdutoCriarRequest } from "../Request/produtoCriarRequest";

export class produtoResponseMappear{

    static mapCriarDTO(data: ProdutoCriarRequest): ProdutoDto {

         const produtoDTO = new ProdutoDto();

         produtoDTO.codigo = data.codigo;
         produtoDTO.nome = data.nome;
         produtoDTO.preco = data.preco;
         produtoDTO.qtde = data.qtde;
 
         return produtoDTO;
     }

    static mapAlterarDTO(data: ProdutoAlterarRequest): ProdutoDto {

        const produtoDTO = new ProdutoDto();
        
        produtoDTO.id = data.id;
        produtoDTO.codigo = data.codigo;
        produtoDTO.nome = data.nome;
        produtoDTO.preco = data.preco;
        produtoDTO.qtde = data.qtde;

        return produtoDTO;
    }
 }