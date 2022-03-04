import { HttpException, HttpStatus } from "@nestjs/common";

export class ErrorHttp {


    static recursoCadastrado(recurso:string, id:number){

        return new HttpException({
            status: HttpStatus.BAD_REQUEST,
            menssage: `${recurso} encontra-se no sistema com o id ${id}`,
            error: "Bad Request"
          }, HttpStatus.BAD_REQUEST);
    }
}