import { ProdutoAlterarRequest } from "src/application/Request/produtoAlterarRequest";
import { ProdutoCriarRequest } from "src/application/Request/produtoCriarRequest";
import { ProdutoDto } from "../../shared/ProdutoDto";
import { ProdutoEntity } from "../remote/entity/produto.entity";

export const produtosLista: Array<ProdutoDto> =[
    { id:1, codigo:"LV001", nome: "Livro C#", preco: 15.90, qtde:100} as ProdutoDto ,
    { id:2, codigo:"LV002", nome: "Livro Python", preco: 25.90, qtde:100} as ProdutoDto ,
    { id:3, codigo:"LV003", nome: "Livro PHP", preco: 35.90, qtde:100} as ProdutoDto ,
    { id:4, codigo:"LV004", nome: "Livro JavaScript", preco: 40, qtde:100} as ProdutoDto 
  ]
  
  export const produtoNovo     =  {codigo:"LV005", nome: "Novo Produto", preco: 99.90, qtde:100} as ProdutoDto ;
  export const produtoAlterar  =  {id:1,codigo:"LV006", nome: "Alterar Produto", preco: 99.90, qtde:100} as ProdutoDto ;
  export const produtoApagar   =  {codigo:"LV007", nome: "Apagar Produto", preco: 99.90, qtde:100} as ProdutoDto ;


  export const produtosListaEntity: Array<ProdutoEntity> =[
    { id:1, codigo:"LV001", nome: "Livro C#", preco: 15.90, qtde:100} as ProdutoEntity ,
    { id:2, codigo:"LV002", nome: "Livro Python", preco: 25.90, qtde:100} as ProdutoEntity ,
    { id:3, codigo:"LV003", nome: "Livro PHP", preco: 35.90, qtde:100} as ProdutoEntity ,
    { id:4, codigo:"LV004", nome: "Livro JavaScript", preco: 40, qtde:100} as ProdutoEntity 
  ]

  export const produtoCadastrado = {id:1, codigo:"LV006", nome: "Alterar Produto", preco: 99.90, qtde:100} as ProdutoEntity;
  export const produtoCriado     = {id:5, codigo:"LV005", nome: "Produto Criado ", preco: 99.90, qtde:100} as ProdutoEntity ;

  export const produtoCriarRequest   = {codigo:"LV006", nome: "Alterar Produto", preco: 99.90, qtde:100} as ProdutoCriarRequest;
  export const produtoAlterarRequest = {id:5, codigo:"LV005", nome: "Produto Criado ", preco: 99.90, qtde:100} as ProdutoAlterarRequest ;