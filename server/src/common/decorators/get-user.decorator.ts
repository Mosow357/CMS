import { createParamDecorator, InternalServerErrorException } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";


export const GetUser = createParamDecorator(
    (data:string,ctx) => {
        const req = ctx.switchToHttp().getRequest();
        const user = req.user as User
        
        if(!user) throw new InternalServerErrorException('User not found (req)')

        if(data){
            return user[data]
        }

        return (!data) ?
        user
        : user[data]
    }
)