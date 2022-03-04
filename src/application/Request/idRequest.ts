import { IsNotEmpty } from "class-validator";

export class IdRequest {

    @IsNotEmpty()
    id:number;
}
