import { Admin } from './../admin/schemas/admin.schema';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Observable } from 'rxjs';



export class isActiveGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService){}

    canActivate(
        context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
            const req = context.switchToHttp().getRequest();

            
           if(!req.admin.is_active){
            throw new ForbiddenException({
                message: "siz active emassiz!"
            })
           }
            return true
        }
}