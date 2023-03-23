import { Admin } from './../admin/schemas/admin.schema';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { triggerAsyncId } from 'async_hooks';

import { Observable } from 'rxjs';



export class isCreatorGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService){}

    canActivate(
        context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
            const req = context.switchToHttp().getRequest();
            console.log(req.admin);
            
           if(!req.admin.is_creator){
            throw new ForbiddenException({
                message: "siz creatormassiz!"
            })
           }
            return true
        }
}