import { firstValueFrom,  of } from "rxjs";
import { Entity } from "src/core/base/entity";
import { Repository } from "src/core/base/repository";

export class ProdutoRepositoryCacheMemory<TEntity extends Entity> implements Repository<TEntity>{

    protected items: TEntity[];

    constructor() {
        this.items = [];
    }

    async criar(data: TEntity): Promise<TEntity> {

        data.id = this.items.length > 0 ? this.items.slice(-1)[0].id + 1 : 1;

        const count = this.items.push(data);
        const novo = of(this.items[count - 1]);

        return await firstValueFrom(novo);
    }
    async alterar(data: TEntity): Promise<TEntity> {
        
        const id = data.id;
        this.items[id] = data;
        const novo = of(this.items[id]);

        return await firstValueFrom(novo);
    }

    async obterUm(id: number): Promise<TEntity> {

        const item = this.items.find(item => item.id == id);
        return await firstValueFrom(of(item));
    }
    async obterTodos(): Promise<TEntity[]> {

        return await firstValueFrom(of(this.items));
    }

    async apagar(id: number): Promise<void> {

        // id seria posicao.
        this.items = this.items.splice(id);
        return await firstValueFrom(of());
    }
}


