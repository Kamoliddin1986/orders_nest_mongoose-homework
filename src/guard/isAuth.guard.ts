import { JwtModule, JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AdminService } from '../admin/admin.service';
import { Observable } from 'rxjs';


@Injectable()
export class isAuthGuard implements CanActivate {
    constructor(private readonly jwtSarvice: JwtService,
        private readonly adminService: AdminService) {}

 async canActivate(context: ExecutionContext)/*: boolean | Promise<boolean> | Observable<boolean> */{
            const req = context.switchToHttp().getRequest();
            const CookierefreshToken = req.cookies['refresh_token'];

            if(!CookierefreshToken){
                throw new UnauthorizedException({
                    message: 'siz ruyxatdan utmagansiz'
                })
            }


            let adminDataFromToken: any;
            try {
                adminDataFromToken = await this.jwtSarvice.verify(CookierefreshToken, {secret: process.env.REFRESH_TOKEN_KEY})
                req.admin = adminDataFromToken
                console.log(adminDataFromToken);
                
            } catch (error) {
                throw new UnauthorizedException({
                    message: "token xato"
                }) 
            }

                                
            return true
        }
        
    }