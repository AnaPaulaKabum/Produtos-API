
export class ProdutoDto {
    id?:number;
    codigo:string;
    nome:string;
    preco:number;
    qtde:number;

    constructor(id?:number,codigo?:string,nome?:string,preco?:number,qtde?:number){


        if (id){
           this.id = id;
       }
        this.codigo = codigo;
        this.qtde   = qtde;
        this.nome   = nome;
        this.preco  = preco;

    }

}
