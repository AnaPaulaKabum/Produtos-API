
import { Entity } from "src/core/base/entity";
import { Repository } from "src/core/base/repository";


export class RepositoryRemote<T extends Entity> extends Repository<T>{
    
    constructor(private repository : any){
        super();
    }

    async obterTodos():Promise<T[]>{

        return  this.repository.findAll();
    }

    async obterUm(id:number):Promise<T>{

        return this.repository.findByPk(id);
    }

    async criar(produto: T):Promise<T>{

        return this.repository.create(produto);        
    }

    async alterar(item: T): Promise<T>{

        const resultado = await this.repository.update(item,{
                        where: {
                                id: item.id
                               } 
        });

        if (resultado[0] > 0){ 
            return resultado[1][0];
        }

        return await this.criar(item);
    }

    apagar(id: number): Promise<void> {
        this.repository.destroy({where: { id: id } });
        return ;
    }
}
